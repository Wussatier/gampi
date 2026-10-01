/* ==========================================================================
   Gampi – Effekt im Browser
   Rechnet die Tonwertkurve eines Presets exakt wie die App
   (GammaRampService.ApplyBaseCurve + ApplyShadowBoost) und legt daraus einen
   SVG-Filter an. Sättigung per feColorMatrix als Annäherung.
   ========================================================================== */
window.Gampi = window.Gampi || {};

window.Gampi.filter = (function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const TABLE_SIZE = 65;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  /**
   * Tonwertkurve 0..1 -> 0..1. Werte wie in der App:
   * gamma (1.0), brightness (0.0), contrast (1.0), strength/range in %.
   */
  function curve(v, p) {
    const gamma = clamp(p.gamma ?? 1, 0.2, 3);
    const brightness = clamp(p.brightness ?? 0, -0.5, 0.5);
    const contrast = clamp(p.contrast ?? 1, 0.5, 2);

    // Kontrast als S-Kurve um 0.5 (Schwarz und Weiß bleiben fest)
    v = v < 0.5 ? 0.5 * Math.pow(2 * v, contrast) : 1 - 0.5 * Math.pow(2 * (1 - v), contrast);
    v = clamp(v + brightness, 0, 1);
    v = clamp(Math.pow(v, 1 / gamma), 0, 1);

    // Schatten-Boost: f(v) = v + a·v·(1-v)^n
    const strength = clamp((p.strength ?? 0) / 100, 0, 1);
    const range = clamp((p.range ?? 25) / 100, 0.05, 0.5);
    if (strength > 0) {
      const n = 3 / range - 1;
      const a = strength * 3;
      v = clamp(v + a * v * Math.pow(1 - v, n), 0, 1);
    }
    return v;
  }

  /** Legt <filter id="…"> im Container #gampi-filters an (einmalig je id). */
  function create(id, preset) {
    if (document.getElementById(id)) return id;
    const defs = document.querySelector("#gampi-filters defs");

    const filter = document.createElementNS(SVG_NS, "filter");
    filter.id = id;
    // sRGB: genau wie die Gamma-Ramp auf den gespeicherten Pixelwerten
    filter.setAttribute("color-interpolation-filters", "sRGB");

    const transfer = document.createElementNS(SVG_NS, "feComponentTransfer");
    const table = Array.from({ length: TABLE_SIZE },
      (_, i) => curve(i / (TABLE_SIZE - 1), preset).toFixed(4)).join(" ");
    for (const channel of ["R", "G", "B"]) {
      const fn = document.createElementNS(SVG_NS, "feFunc" + channel);
      fn.setAttribute("type", "table");
      fn.setAttribute("tableValues", table);
      transfer.appendChild(fn);
    }
    filter.appendChild(transfer);

    const saturation = (preset.saturation ?? 100) / 100;
    if (Math.abs(saturation - 1) > 0.001) {
      const matrix = document.createElementNS(SVG_NS, "feColorMatrix");
      matrix.setAttribute("type", "saturate");
      matrix.setAttribute("values", String(saturation));
      filter.appendChild(matrix);
    }

    defs.appendChild(filter);
    return id;
  }

  return { curve, create };
})();
