/* ==========================================================================
   Gampi – Vorher/Nachher-Regler
   Maus, Touch (horizontal ziehen, vertikal scrollt die Seite weiter) und
   Tastatur (Pfeiltasten, Pos1/Ende) – als ARIA-Slider zugänglich.
   ========================================================================== */
window.Gampi = window.Gampi || {};

window.Gampi.CompareSlider = function (root) {
  const after = root.querySelector(".compare__layer--after");
  const divider = root.querySelector(".compare__divider");
  const handle = root.querySelector(".compare__handle");
  let value = 50;
  let dragging = false;

  function set(percent) {
    value = Math.max(0, Math.min(100, percent));
    after.style.clipPath = `inset(0 0 0 ${value}%)`;
    divider.style.left = handle.style.left = value + "%";
    root.setAttribute("aria-valuenow", String(Math.round(value)));
  }

  function fromPointer(event) {
    const rect = root.getBoundingClientRect();
    set((event.clientX - rect.left) / rect.width * 100);
  }

  root.addEventListener("pointerdown", event => {
    if (event.target.closest("button")) return; // Karussell-Pfeile nicht mitbewegen
    dragging = true;
    root.setPointerCapture(event.pointerId);
    fromPointer(event);
  });
  root.addEventListener("pointermove", event => { if (dragging) fromPointer(event); });
  root.addEventListener("pointerup", () => { dragging = false; });
  root.addEventListener("pointercancel", () => { dragging = false; });

  root.addEventListener("keydown", event => {
    const step = event.shiftKey ? 10 : 5;
    const keys = {
      ArrowLeft: value - step, ArrowDown: value - step,
      ArrowRight: value + step, ArrowUp: value + step,
      Home: 0, End: 100
    };
    if (event.key in keys) {
      set(keys[event.key]);
      event.preventDefault();
    }
  });

  set(50);
  return { set, reset: () => set(50) };
};
