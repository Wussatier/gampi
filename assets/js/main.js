/* ==========================================================================
   Gampi – Einstieg
   Verdrahtet Konfiguration, Sprache und Karussell. Wird auf allen Seiten
   geladen; Bausteine, die es auf einer Seite nicht gibt, werden übersprungen.
   ========================================================================== */
(function () {
  const { config, i18n } = window.Gampi;

  i18n.init();

  // Download-Links (immer das neueste GitHub-Release)
  const base = `https://github.com/${config.github.user}/${config.github.repo}/releases/latest/download/`;
  document.querySelectorAll("[data-download]").forEach(link => {
    const file = config.downloads[link.dataset.download];
    if (file) link.href = base + file;
  });

  document.querySelectorAll("[data-version]").forEach(el => { el.textContent = config.version; });
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

  const carousel = document.getElementById("carousel");
  if (carousel && window.Gampi.Carousel) {
    window.Gampi.Carousel.init(carousel, window.Gampi.slides || [], window.Gampi.demoSlide);
  }
})();
