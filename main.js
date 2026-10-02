/* ==========================================================================
   Gampi – Einstieg
   Verdrahtet Konfiguration, Sprache und Karussell. Wird auf allen Seiten
   geladen; Bausteine, die es auf einer Seite nicht gibt, werden übersprungen.
   ========================================================================== */
(function () {
  const { config, i18n } = window.Gampi;

  i18n.init();

  // Social-Media-Links: nur anzeigen, wenn in config.js eine Adresse steht
  document.querySelectorAll("[data-social]").forEach(link => {
    const url = (config.socials || {})[link.dataset.social];
    if (!url) return;
    link.href = url;
    link.hidden = false;
  });

  document.querySelectorAll("[data-version]").forEach(el => { el.textContent = config.version; });
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

  const carousel = document.getElementById("carousel");
  if (carousel && window.Gampi.Carousel) {
    window.Gampi.Carousel.init(carousel, window.Gampi.slides || [], window.Gampi.demoSlide);
  }
})();
