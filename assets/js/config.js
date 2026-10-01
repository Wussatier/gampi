/* ==========================================================================
   Gampi – Website-Einstellungen
   Bei einer neuen App-Version nur "version" anpassen. Die Download-Links
   zeigen immer auf das neueste GitHub-Release; die Dateien im Release müssen
   dafür genau so heißen wie unten (build-release.ps1 legt sie so an).
   ========================================================================== */
window.Gampi = window.Gampi || {};

window.Gampi.config = {
  version: "1.6.0",
  github: {
    user: "Wussatier",
    repo: "gampi"
  },
  downloads: {
    setup: "Gampi-Setup.exe",
    portable: "Gampi-portable.exe"
  }
};
