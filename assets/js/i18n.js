/* ==========================================================================
   Gampi – Zweisprachigkeit (Deutsch/Englisch)
   Alle Texte stehen doppelt im HTML (<span lang="de"> / <span lang="en">);
   CSS blendet die inaktive Sprache aus. Dieses Modul setzt die Sprache,
   merkt sie sich und meldet Wechsel per Event "gampi:langchange".
   ========================================================================== */
window.Gampi = window.Gampi || {};

window.Gampi.i18n = (function () {
  const STORAGE_KEY = "gampi-lang";
  const SUPPORTED = ["de", "en"];
  const root = document.documentElement;

  function current() {
    return root.dataset.lang || "de";
  }

  function set(lang) {
    if (!SUPPORTED.includes(lang)) lang = "de";
    root.dataset.lang = lang;
    root.lang = lang;

    // Seitentitel folgt der Sprache (data-title-de / data-title-en am <body>)
    const title = document.body && document.body.dataset["title" + (lang === "en" ? "En" : "De")];
    if (title) document.title = title;

    document.querySelectorAll("[data-set-lang]").forEach(button =>
      button.setAttribute("aria-pressed", String(button.dataset.setLang === lang)));

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ohne Speicher egal */ }
    document.dispatchEvent(new CustomEvent("gampi:langchange", { detail: { lang } }));
  }

  /** Text oder { de, en } -> Text in der gewünschten Sprache. */
  function pick(value, lang) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    lang = lang || current();
    return value[lang] ?? value.de ?? value.en ?? "";
  }

  function init() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignorieren */ }
    const browser = (navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en";
    set(saved || browser);

    document.querySelectorAll("[data-set-lang]").forEach(button =>
      button.addEventListener("click", () => set(button.dataset.setLang)));
  }

  return { init, set, current, pick };
})();
