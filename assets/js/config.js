/* ==========================================================================
   Gampi – Website-Einstellungen
   Bei einer neuen App-Version nur "version" anpassen. Die Download-Buttons
   zeigen auf das neueste GitHub-Release; die Adressen stehen direkt in
   index.html.
   ========================================================================== */
window.Gampi = window.Gampi || {};

window.Gampi.config = {
  version: "1.6.0",

  // Links im Abschnitt "Kontakt". Leere Einträge ("") werden nicht angezeigt.
  // PLATZHALTER: Instagram, TikTok und YouTube führen bisher nur zur Startseite
  // des Dienstes. Durch die eigene Profiladresse ersetzen, z. B.
  // "https://www.instagram.com/deinname".
  socials: {
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    youtube: "https://www.youtube.com/",
    github: "https://github.com/Wussatier/gampi"
  }
};
