/* ==========================================================================
   Gampi – Bilder im Vorher/Nachher-Karussell
   Bilder nach assets/img/slides/ legen und hier eintragen. Reihenfolge =
   Reihenfolge im Karussell. Einträge mit fehlendem Bild werden übersprungen;
   gibt es gar keine Bilder, zeigt die Seite die Demo-Szene (demo unten).

   Felder:
     name        Titel unter dem Bild – Text oder { de: "…", en: "…" }
     presetName  Preset-Bezeichnung  – Text oder { de: "…", en: "…" }
     before      Screenshot aus dem Spiel
     after       (empfohlen) das von Gampi erzeugte Bild "… Gampi <Preset>.png"
                 aus "Vorher/Nachher-Bild…" – exakt inkl. Sättigung
     preset      nur ohne "after": Werte wie in Gampi eingestellt; die Seite
                 rechnet den Effekt dann selbst (gleiche Formel wie die App,
                 Sättigung als Annäherung)

   Werte der App-Vorlagen:
     Night Ops  { strength: 70, range: 35, saturation: 110 }
     Clarity    { contrast: 1.06, strength: 30, range: 25 }
     Vivid      { contrast: 1.06, strength: 30, range: 25, saturation: 120 }

   Bildformat: JPG, ca. 1920 px breit, 16:9 (Originale sind oft mehrere MB groß).
   ========================================================================== */
window.Gampi = window.Gampi || {};

window.Gampi.slides = [
  {
    name: { de: "Escape from Tarkov · Woods bei Nacht", en: "Escape from Tarkov · Woods at night" },
    presetName: "Preset: Night Ops",
    before: "assets/img/slides/tarkov-wald-nacht.jpg",
    after: "assets/img/slides/tarkov-wald-nacht-gampi.jpg"
  },
  {
    name: { de: "Rocket League · Stadion", en: "Rocket League · Stadium" },
    presetName: { de: "Eigenes Preset: mehr Farbe", en: "Custom preset: more color" },
    before: "assets/img/slides/rocket-league-stadion.jpg",
    after: "assets/img/slides/rocket-league-stadion-gampi.jpg"
  },
  {
    name: { de: "Escape from Tarkov · Woods Nachts im Regen", en: "Escape from Tarkov · Woods at night rain" },
    presetName: "Preset: Night Ops",
    before: "assets/img/slides/tarkov-wald-regen.jpg",
    after: "assets/img/slides/tarkov-wald-regen-gampi.jpg"
  },
  {
    name: { de: "Rocket League · Sand-Arena", en: "Rocket League · Sand arena" },
    presetName: { de: "Eigenes Preset: mehr Farbe", en: "Custom preset: more color" },
    before: "assets/img/slides/rocket-league-sand.jpg",
    after: "assets/img/slides/rocket-league-sand-gampi.jpg"
  }
  // Beispiel ohne Gampi-Bild (Effekt wird im Browser berechnet):
  // {
  //   name: "DayZ",
  //   presetName: "Preset: Night Ops",
  //   before: "assets/img/slides/dayz.jpg",
  //   preset: { strength: 70, range: 35, saturation: 110 }
  // },
];

// Wird angezeigt, solange keine eigenen Bilder vorhanden sind.
window.Gampi.demoSlide = {
  name: { de: "Demo-Szene", en: "Demo scene" },
  presetName: { de: "Vorlage: Night Ops", en: "Template: Night Ops" },
  before: "assets/img/demo-night.svg",
  preset: { strength: 70, range: 35, saturation: 110 }
};
