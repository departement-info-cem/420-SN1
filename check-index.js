#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const idxPath = path.join(__dirname, "web", "build", "search-index.json");
const raw = fs.readFileSync(idxPath, "utf8");
const idx = JSON.parse(raw);

// Check content slot (4) for mon_ensemble documents
const contentDocs = idx[4].documents;
const matches = contentDocs.filter(
  (d) => d.t && d.t.includes("mon_ensemble")
);
console.log("Content docs with mon_ensemble:", matches.length);
matches.slice(0, 3).forEach((d) =>
  console.log("  url:", d.u, "| text:", d.t.substring(0, 120))
);

// Check the Lunr inverted index for tokens
const invertedIdx = idx[4].index.invertedIndex;
const allTokens = Object.keys(invertedIdx);
console.log("\nTotal tokens in content Lunr index:", allTokens.length);

const ensTokens = allTokens.filter((t) => t.includes("ensembl"));
console.log("Tokens with 'ensembl':", ensTokens.slice(0, 10));

const setTokens = allTokens.filter((t) => t === "set" || t.startsWith("set("));
console.log("Tokens for 'set':", setTokens.slice(0, 5));

const mon_tokens = allTokens.filter((t) => t.startsWith("mon_ensembl"));
console.log("Tokens starting with 'mon_ensembl':", mon_tokens.slice(0, 5));

// Check if 'set([4' specifically gets indexed
// The tokenizer would split on spaces, so 'set([4,' -> token 'set([4,'
// After codeExpressionTrimmer: 'set([4' -> strips leading non-word at start: '(' -> but 's' is word, so only trailing stripped
// 'set([4,' -> trailing ',' stripped -> 'set([4'
// French stemmer on 'set([4' -> ?
const dropnaTokens = allTokens.filter((t) => t.includes("dropna"));
console.log("Tokens with 'dropna':", dropnaTokens);

const mon_ensembleTokens = allTokens.filter((t) => t === "mon_ensemble" || t === "mon_ensembl");
console.log("Exact mon_ensemble/mon_ensembl token:", mon_ensembleTokens);
