/* ==========================================================================
   Gampi – Vorher/Nachher-Karussell
   Prüft, welche Bilder aus slides.js vorhanden sind, und zeigt sie mit
   Pfeilen, Punkten und Beschriftung an. Ohne Bilder: Demo-Szene.
   ========================================================================== */
window.Gampi = window.Gampi || {};

window.Gampi.Carousel = (function () {
  const { i18n, filter } = window.Gampi;

  const escapeHtml = text => String(text).replace(/[&<>"]/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function imageExists(src) {
    return new Promise(resolve => {
      if (!src) return resolve(false);
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  /** Nur Einträge mit vorhandenem Vorher-Bild und Nachher-Bild oder Preset. */
  async function available(slides) {
    const checked = await Promise.all(slides.map(async slide => ({
      slide,
      hasBefore: await imageExists(slide.before),
      hasAfter: await imageExists(slide.after)
    })));
    return checked.filter(c => c.hasBefore && (c.hasAfter || c.slide.preset));
  }

  async function init(root, slides, demoSlide) {
    const compare = root.querySelector(".compare");
    const beforeImage = root.querySelector(".compare__before");
    const afterImage = root.querySelector(".compare__after");
    const caption = root.querySelector(".carousel__caption");
    const dots = root.querySelector(".carousel__dots");
    const prev = root.querySelector(".carousel__nav--prev");
    const next = root.querySelector(".carousel__nav--next");
    const slider = window.Gampi.CompareSlider(compare);

    let items = await available(slides);
    if (items.length === 0) items = [{ slide: demoSlide, hasBefore: true, hasAfter: false }];
    let current = 0;

    // Filter für Einträge ohne fertiges Gampi-Bild vorbereiten
    items.forEach((item, index) => {
      if (!item.hasAfter) item.filterId = filter.create(`gampi-slide-${index}`, item.slide.preset);
    });

    function renderCaption() {
      const { slide } = items[current];
      const counter = items.length > 1 ? `  ·  ${current + 1} / ${items.length}` : "";
      caption.innerHTML = ["de", "en"].map(lang => {
        const preset = slide.presetName ? `  ·  ${escapeHtml(i18n.pick(slide.presetName, lang))}` : "";
        return `<span lang="${lang}"><strong>${escapeHtml(i18n.pick(slide.name, lang))}</strong>${preset}${counter}</span>`;
      }).join("");
    }

    function show(index) {
      current = (index + items.length) % items.length;
      const item = items[current];
      beforeImage.setAttribute("href", item.slide.before);
      if (item.hasAfter) {
        afterImage.setAttribute("href", item.slide.after);
        afterImage.removeAttribute("filter");
      } else {
        afterImage.setAttribute("href", item.slide.before);
        afterImage.setAttribute("filter", `url(#${item.filterId})`);
      }
      dots.querySelectorAll("button").forEach((dot, i) =>
        dot.setAttribute("aria-current", String(i === current)));
      renderCaption();
      slider.reset();
    }

    // Steuerung nur bei mehreren Bildern
    const several = items.length > 1;
    prev.hidden = next.hidden = dots.hidden = !several;
    if (several) {
      items.forEach((item, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `${index + 1}: ${i18n.pick(item.slide.name, "en")}`);
        dot.addEventListener("click", () => show(index));
        dots.appendChild(dot);
      });
      prev.addEventListener("click", () => show(current - 1));
      next.addEventListener("click", () => show(current + 1));

      // Alle Bilder vorladen, damit das Blättern ohne Wartezeit geht
      items.forEach(({ slide, hasAfter }) => {
        new Image().src = slide.before;
        if (hasAfter) new Image().src = slide.after;
      });
    }

    show(0);
  }

  return { init };
})();
