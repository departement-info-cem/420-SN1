/**
 * Construit une version hors-ligne du site pour les examens (npm run offline).
 *
 * 1. Build Docusaurus avec baseUrl "/" (OFFLINE=1) dans le dossier build-offline/
 * 2. Enrichit l'index de recherche (enhance-tab-search.js)
 * 3. Copie le lanceur .bat dans le build
 * 4. Compresse le tout dans 420-SN1-hors-ligne.zip
 *
 * Le dossier build/ (version en ligne) n'est pas touché.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT_DIR_NAME = "build-offline";
const OUT_DIR = path.join(ROOT, OUT_DIR_NAME);
const LANCEUR = path.join(ROOT, "offline", "Lanceur_pour_ouvrir_la_documentation.bat");
const ZIP_PATH = path.join(ROOT, "420-SN1-hors-ligne.zip");

const env = { ...process.env, OFFLINE: "1", BUILD_DIR: OUT_DIR_NAME };
const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", cwd: ROOT, env, ...opts });

console.log("\n=== 1/4 Build Docusaurus (baseUrl = /) ===");
run(`npx docusaurus build --out-dir ${OUT_DIR_NAME}`);

console.log("\n=== 2/4 Enrichissement de l'index de recherche ===");
run("node scripts/enhance-tab-search.js");

console.log("\n=== 3/4 Copie du lanceur ===");
fs.copyFileSync(LANCEUR, path.join(OUT_DIR, path.basename(LANCEUR)));

console.log("\n=== 4/4 Compression ===");
fs.rmSync(ZIP_PATH, { force: true });
if (process.platform === "win32") {
  // tar.exe (bsdtar) est inclus dans Windows 10+ ; -a déduit le format zip de l'extension.
  // Chemin explicite : le tar de Git (GNU) peut être trouvé avant dans le PATH et ne gère pas le zip.
  const tar = path.join(process.env.SystemRoot || "C:\\Windows", "System32", "tar.exe");
  run(`"${tar}" -a -c -f "${ZIP_PATH}" *`, { cwd: OUT_DIR });
} else {
  run(`zip -r -q "${ZIP_PATH}" .`, { cwd: OUT_DIR });
}

console.log(`\nVersion hors-ligne prête : ${ZIP_PATH}`);
