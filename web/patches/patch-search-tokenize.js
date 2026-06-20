#!/usr/bin/env node
/**
 * Patch pour @easyops-cn/docusaurus-search-local
 *
 * CAUSE 1 - tokenize.js (cote recherche) :
 *   df["Age"] -> token df["age"] -> stemmer -> df["age"] (inchange)
 *   Mais l'index contient df["ag -> mismatch -> pas de resultat.
 *
 * CAUSE 2 - buildIndex.js (cote indexation) :
 *   Lunr tokenize sur espaces/tirets donc (df["tip"] garde le ( en debut.
 *   -> df["tip"] indexe comme (df["tip"] -> introuvable par df["tip"].
 *
 * CORRECTION :
 *   tokenize.js  : strip chars non-alphanum en FIN de token (cote recherche).
 *   buildIndex.js: trimmer custom strip en DEBUT+FIN avant le stemmer (indexation).
 */
const fs = require("fs");
const path = require("path");
const base = path.join(__dirname, "..", "node_modules", "@easyops-cn", "docusaurus-search-local");

// ─── Patch 1 : tokenize.js ────────────────────────────────────────────────────

const tokenizePath = path.join(base, "dist", "client", "client", "utils", "tokenize.js");

const tokenizeOriginal = "    return text.toLowerCase().match(regExpMatchWords) || [];";

// Signature invariante independante de l'encodage Unicode du regex
const tokenizePatchedSignature = ".map((token) => token.replace(";

const tokenizePatched =
  "    // Strip trailing non-word characters from each token so that complete code\n" +
  "    // expressions like df[\"Age\"] or print(x) match the same index entries as\n" +
  "    // their incomplete counterparts df[\"Age or print(x.\n" +
  "    // The Lunr French stemmer strips trailing punctuation at index time\n" +
  "    // (df[\"Age\"] becomes df[\"ag in the index) but not at query time,\n" +
  "    // causing a mismatch when the closing chars are present.\n" +
  "    return (text.toLowerCase().match(regExpMatchWords) || [])\n" +
  "        .map((token) => token.replace(/[^\\w一-鿿]+$/, \"\"));";

applyPatch("tokenize.js", tokenizePath, tokenizeOriginal, tokenizePatched, tokenizePatchedSignature);

// ─── Patch 2a : buildIndex.js - enregistrement du trimmer ────────────────────

const buildIndexPath = path.join(base, "dist", "server", "server", "utils", "buildIndex.js");

const buildIndexOriginal1 =
  "        if (language.length > 1) {\n" +
  "            plugin = lunr_1.default.multiLanguage(...language);\n" +
  "        }\n" +
  "        else if (language[0] !== \"en\") {\n" +
  "            plugin = lunr_1.default[language[0]];\n" +
  "        }\n" +
  "    }";

const buildIndexPatched1 =
  "        if (language.length > 1) {\n" +
  "            plugin = lunr_1.default.multiLanguage(...language);\n" +
  "        }\n" +
  "        else if (language[0] !== \"en\") {\n" +
  "            plugin = lunr_1.default[language[0]];\n" +
  "        }\n" +
  "        // Register a custom trimmer that strips leading/trailing non-word\n" +
  "        // characters from tokens at index time. This ensures code expressions\n" +
  "        // like (df[\"tip\"] are stored as df[\"tip in the index, matching\n" +
  "        // the same stripping that the search tokenizer applies at query time.\n" +
  "        function codeExpressionTrimmer(token) {\n" +
  "            return token.update(function (str) {\n" +
  "                return str.replace(/^[^\\w一-鿿]+|[^\\w一-鿿]+$/g, \"\");\n" +
  "            });\n" +
  "        }\n" +
  "        lunr_1.default.Pipeline.registerFunction(codeExpressionTrimmer, \"codeExpressionTrimmer\");\n" +
  "    }";

applyPatch("buildIndex.js (register trimmer)", buildIndexPath, buildIndexOriginal1, buildIndexPatched1, "codeExpressionTrimmer");

// ─── Patch 2b : buildIndex.js - ajout dans le pipeline ───────────────────────

const buildIndexOriginal2 =
  "            // Override tokenizer when language `zh` is enabled.\n" +
  "            if (language.includes(\"zh\")) {\n" +
  "                this.tokenizer = lunr_1.default.zh.tokenizer;\n" +
  "            }\n" +
  "            this.ref(\"i\");";

const buildIndexPatched2 =
  "            // Override tokenizer when language `zh` is enabled.\n" +
  "            if (language.includes(\"zh\")) {\n" +
  "                this.tokenizer = lunr_1.default.zh.tokenizer;\n" +
  "            }\n" +
  "            // Add the code expression trimmer before the stemmer so that\n" +
  "            // tokens like (df[\"tip\"] become df[\"tip before stemming.\n" +
  "            const trimmerFn = lunr_1.default.Pipeline.registeredFunctions[\"codeExpressionTrimmer\"];\n" +
  "            const stemmerFn = language.includes(\"en\")\n" +
  "                ? lunr_1.default.stemmer\n" +
  "                : lunr_1.default[language.find(function(l) { return l !== \"en\"; }) || language[0]].stemmer;\n" +
  "            if (trimmerFn && stemmerFn) {\n" +
  "                this.pipeline.before(stemmerFn, trimmerFn);\n" +
  "            }\n" +
  "            this.ref(\"i\");";

applyPatch("buildIndex.js (add to pipeline)", buildIndexPath, buildIndexOriginal2, buildIndexPatched2, "pipeline.before(stemmerFn, trimmerFn)");

// ─── Helper ───────────────────────────────────────────────────────────────────

function applyPatch(label, filePath, original, patched, alreadyPatchedSignature) {
  var content = fs.readFileSync(filePath, "utf8");

  var signature = alreadyPatchedSignature || patched;
  if (content.includes(signature)) {
    console.log("✓ " + label + ": patch deja applique.");
    return;
  }

  if (!content.includes(original)) {
    console.error("✗ " + label + ": texte cible introuvable — le patch doit etre mis a jour.");
    process.exit(1);
  }

  content = content.replace(original, patched);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("✓ " + label + ": patch applique.");
}
