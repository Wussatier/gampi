/* ==========================================================================
   Gampi – Schritte mit App-Screenshots ("So funktioniert's")
   Reiter links, passender Screenshot rechts. Bedienbar per Maus und Tastatur
   (Pfeiltasten, Pos1/Ende) nach dem WAI-ARIA-Muster "Tabs".
   ========================================================================== */
window.Gampi = window.Gampi || {};

window.Gampi.Showcase = (function () {
  function init(root) {
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));

    function select(index, focus) {
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        document.getElementById(tab.getAttribute("aria-controls")).hidden = !active;
      });
      if (focus) tabs[index].focus();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(i, false));
      tab.addEventListener("keydown", event => {
        const keys = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
        if (!(event.key in keys)) return;
        event.preventDefault();
        select((keys[event.key] + tabs.length) % tabs.length, true);
      });
    });
  }

  return { init };
})();

document.querySelectorAll("[data-showcase]").forEach(root => window.Gampi.Showcase.init(root));
