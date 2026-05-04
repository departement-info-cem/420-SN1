#!/usr/bin/env node
/**
 * Post-build script: enrichit l'index de recherche @easyops-cn avec des entrées
 * spécifiques à chaque onglet (queryString="onglet"), en ajoutant ?onglet=xxx
 * à l'URL de chaque résultat.
 *
 * Structure du fichier search-index.json généré par @easyops-cn v0.55:
 *   Array de 5 éléments (un par type de document):
 *     [0] = { documents: [...titleDocs],       index: lunrIndex }
 *     [1] = { documents: [...headingDocs],     index: lunrIndex }
 *     [2] = { documents: [...descriptionDocs], index: lunrIndex }
 *     [3] = { documents: [...keywordsDocs],    index: lunrIndex }
 *     [4] = { documents: [...contentDocs],     index: lunrIndex }
 *
 *   Chaque document: { i, t, u, h?, b?, s?, p? }
 *     i = id (number), t = texte indexé, u = url, h = hash anchor,
 *     b = breadcrumbs, s = titre de section, p = id parent
 */

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "docs");
const BUILD_DIR = path.join(ROOT, "build");
const BASE_URL = "/420-SN1/";

// ---------------------------------------------------------------------------
// 1. MAPPER LES FICHIERS MDX AUX URLs
// ---------------------------------------------------------------------------

function mdxFileToUrl(filePath) {
  let rel = path.relative(DOCS_DIR, filePath).replace(/\\/g, "/");
  rel = rel.replace(/\.mdx?$/, "");

  // Supprimer le préfixe numérique de chaque segment (ex: "01-cours" → "cours")
  const parts = rel.split("/").map((p) => p.replace(/^\d+-/, ""));

  // Ignorer les fichiers dans _components et accueil.mdx (pas d'onglets)
  if (parts[0].startsWith("_")) return null;

  // "accueil" → root, sinon chemin normal
  if (parts[parts.length - 1] === "accueil") return BASE_URL;

  return BASE_URL + parts.join("/");
}

// ---------------------------------------------------------------------------
// 2. PARSER LES ONGLETS DEPUIS LE CONTENU MDX
// ---------------------------------------------------------------------------

function extractTabItems(mdxContent) {
  const items = [];
  let pos = 0;

  while (pos < mdxContent.length) {
    const startPos = mdxContent.indexOf("<TabItem", pos);
    if (startPos === -1) break;

    // Trouver la fin du tag d'ouverture (gérer les accolades dans les attributs)
    let openTagEnd = startPos + 8;
    let braceDepth = 0;
    while (openTagEnd < mdxContent.length) {
      const ch = mdxContent[openTagEnd];
      if (ch === "{") braceDepth++;
      else if (ch === "}") braceDepth--;
      else if (braceDepth === 0 && ch === ">") break;
      openTagEnd++;
    }

    const openTag = mdxContent.substring(startPos, openTagEnd + 1);
    const isSelfClosing = mdxContent[openTagEnd - 1] === "/";

    const valueMatch = openTag.match(/value="([^"]+)"/);
    const labelMatch = openTag.match(/label="([^"]+)"/);

    if (!valueMatch || !labelMatch) {
      pos = openTagEnd + 1;
      continue;
    }

    if (isSelfClosing) {
      pos = openTagEnd + 1;
      continue;
    }

    // Trouver le </TabItem> correspondant (en tenant compte des TabItem imbriqués)
    let searchFrom = openTagEnd + 1;
    let nestDepth = 1;
    let contentEnd = -1;

    while (searchFrom < mdxContent.length && nestDepth > 0) {
      const nextOpen = mdxContent.indexOf("<TabItem", searchFrom);
      const nextClose = mdxContent.indexOf("</TabItem>", searchFrom);

      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        nestDepth++;
        searchFrom = nextOpen + 8;
      } else {
        nestDepth--;
        if (nestDepth === 0) contentEnd = nextClose;
        searchFrom = nextClose + 10;
      }
    }

    if (contentEnd === -1) {
      pos = openTagEnd + 1;
      continue;
    }

    const tabContent = mdxContent.substring(openTagEnd + 1, contentEnd);
    items.push({
      value: valueMatch[1],
      label: labelMatch[1],
      content: tabContent,
    });

    pos = contentEnd + 10;
  }

  return items;
}

function extractText(mdxContent) {
  return (
    mdxContent
      // Supprimer les imports
      .replace(/^import\s+.*$/gm, "")
      // Supprimer les blocs de code (garder un peu du contenu texte)
      .replace(/```[\s\S]*?```/g, " ")
      // Supprimer le code inline
      .replace(/`[^`\n]+`/g, " ")
      // Supprimer les tags JSX/HTML
      .replace(/<[^>]+>/g, " ")
      // Supprimer les expressions JSX (simple)
      .replace(/\{[^{}]*\}/g, " ")
      // Supprimer les titres markdown
      .replace(/^#{1,6}\s+/gm, "")
      // Convertir le gras/italique
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      // Supprimer les liens markdown
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Supprimer les lignes de séparation et les directives :::
      .replace(/^:::\w*.*$/gm, "")
      .replace(/^---+$/gm, "")
      // Normaliser les espaces
      .replace(/\s+/g, " ")
      .trim()
  );
}

function extractPageTitle(mdxContent) {
  // Essayer le frontmatter title
  const fmMatch = mdxContent.match(/^---[\s\S]*?^title:\s*(.+)$/m);
  if (fmMatch) return fmMatch[1].trim().replace(/^["']|["']$/g, "");
  // Sinon le premier # heading
  const h1Match = mdxContent.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();
  return "";
}

// ---------------------------------------------------------------------------
// 3. RECONSTRUIRE UN INDEX LUNR (même config que buildIndex.js)
// ---------------------------------------------------------------------------

let lunrInitialized = false;
let lunr;

function initLunr() {
  if (lunrInitialized) return;
  lunrInitialized = true;
  lunr = require("lunr");
  require("lunr-languages/lunr.stemmer.support")(lunr);
  require("lunr-languages/lunr.fr")(lunr);
}

function buildLunrIndex(documents) {
  initLunr();
  return lunr(function () {
    this.use(lunr.fr);
    this.ref("i");
    this.field("t");
    this.metadataWhitelist = ["position"];
    documents.forEach((doc) => {
      this.add({ ...doc, i: doc.i.toString() });
    });
  });
}

// ---------------------------------------------------------------------------
// 4. TROUVER LE FICHIER D'INDEX
// ---------------------------------------------------------------------------

function findSearchIndexFile() {
  // Le fichier peut s'appeler search-index.json ou search-index-{hash}.json
  const files = fs.readdirSync(BUILD_DIR);
  const match = files.find(
    (f) => f.startsWith("search-index") && f.endsWith(".json")
  );
  if (!match) throw new Error("Fichier search-index.json introuvable dans build/");
  return path.join(BUILD_DIR, match);
}

// ---------------------------------------------------------------------------
// 5. TROUVER TOUS LES FICHIERS MDX AVEC DES ONGLETS
// ---------------------------------------------------------------------------

function findMdxFiles(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!entry.name.startsWith("_")) findMdxFiles(fullPath, results);
    } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      results.push(fullPath);
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// 6. PROGRAMME PRINCIPAL
// ---------------------------------------------------------------------------

function main() {
  console.log("🔍 Enrichissement de l'index de recherche par onglet...");

  // 6.1 Lire l'index existant
  const indexFile = findSearchIndexFile();
  console.log(`  Fichier d'index : ${path.relative(ROOT, indexFile)}`);
  const searchIndex = JSON.parse(fs.readFileSync(indexFile, "utf-8"));

  // L'index est un tableau de 5 éléments {documents, index}
  // [0]=titles, [1]=headings, [2]=descriptions, [3]=keywords, [4]=content
  const [titleSlot, headingSlot, descSlot, kwSlot, contentSlot] = searchIndex;

  // 6.2 Trouver l'ID maximum pour éviter les collisions
  let maxId = 0;
  for (const slot of searchIndex) {
    for (const doc of slot.documents || []) {
      if (doc.i > maxId) maxId = doc.i;
    }
  }
  let nextId = maxId + 1;

  // 6.3 Parcourir tous les fichiers MDX
  const mdxFiles = findMdxFiles(DOCS_DIR);
  let totalTabsAdded = 0;

  for (const filePath of mdxFiles) {
    const content = fs.readFileSync(filePath, "utf-8");

    // Vérifier si la page a des onglets avec queryString
    if (!content.includes('queryString="onglet"')) continue;

    const pageUrl = mdxFileToUrl(filePath);
    if (!pageUrl) continue;

    const pageTitle = extractPageTitle(content);
    const tabs = extractTabItems(content);

    if (tabs.length === 0) continue;

    console.log(
      `  📄 ${path.relative(DOCS_DIR, filePath)} → ${tabs.length} onglets`
    );

    for (const tab of tabs) {
      const tabUrl = `${pageUrl}?onglet=${tab.value}`;
      const tabTitle = `${pageTitle} › ${tab.label}`;
      const tabText = extractText(tab.content);

      if (!tabText) continue;

      const titleId = nextId++;

      // Document titre (slot 0)
      titleSlot.documents.push({
        i: titleId,
        t: tabTitle,
        u: tabUrl,
        b: ["Cours"],
      });

      // Document contenu (slot 4) — texte de l'onglet, par tranches de 200 chars
      const chunkSize = 200;
      for (let start = 0; start < tabText.length; start += chunkSize) {
        const chunk = tabText.substring(start, start + chunkSize);
        contentSlot.documents.push({
          i: nextId++,
          t: chunk,
          s: tabTitle,
          u: tabUrl,
          p: titleId,
        });
      }

      totalTabsAdded++;
    }
  }

  if (totalTabsAdded === 0) {
    console.log("  Aucun onglet trouvé.");
    return;
  }

  // 6.4 Reconstruire les index Lunr pour les slots modifiés
  console.log(`\n  Reconstruction des index Lunr (${totalTabsAdded} onglets ajoutés)...`);

  searchIndex[0] = { documents: titleSlot.documents,   index: buildLunrIndex(titleSlot.documents) };
  searchIndex[4] = { documents: contentSlot.documents, index: buildLunrIndex(contentSlot.documents) };

  // 6.5 Écrire l'index enrichi
  fs.writeFileSync(indexFile, JSON.stringify(searchIndex), "utf-8");
  console.log(`  ✅ Index enrichi sauvegardé : ${path.relative(ROOT, indexFile)}`);
  console.log(`     ${totalTabsAdded} onglets indexés avec URLs spécifiques.`);
}

main();
