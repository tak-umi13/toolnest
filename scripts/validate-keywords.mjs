// DataForSEO keyword validation — pulls live search volume, CPC and keyword
// difficulty for the seed keywords across one or more locations, applies the
// brief's filters, and writes a ranked opportunity roadmap (JSON + Markdown).
// Zero dependencies (Node 18+ global fetch).
//
//   npm run validate:keywords
//
// Reads credentials from .env.local / .env (never hard-code secrets):
//   DATAFORSEO_LOGIN=...      DATAFORSEO_PASSWORD=...
// Locations (comma-separated, default US): DATAFORSEO_LOCATION_CODES=2840,2356
//   2840 = US, 2356 = India, 2826 = UK …
// Optional: DATAFORSEO_LANGUAGE_CODE (default en), MAX_KD, MIN_VOLUME,
//   MAX_VOLUME, MIN_CPC.

import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// --- Minimal .env loader (no dotenv dependency) ---------------------------
function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = join(root, file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1];
      const val = m[2].trim().replace(/^["']|["']$/g, "");
      if (process.env[key] === undefined || process.env[key] === "") process.env[key] = val;
    }
  }
}
loadEnv();

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASSWORD = process.env.DATAFORSEO_PASSWORD;

// Filters straight from the brief.
const MAX_KD = Number(process.env.MAX_KD ?? 35);
const MIN_VOLUME = Number(process.env.MIN_VOLUME ?? 500);
const MAX_VOLUME = Number(process.env.MAX_VOLUME ?? 50000);
const MIN_CPC = Number(process.env.MIN_CPC ?? 0.3);
const LANGUAGE = process.env.DATAFORSEO_LANGUAGE_CODE ?? "en";
let LOCATIONS = (process.env.DATAFORSEO_LOCATION_CODES || process.env.DATAFORSEO_LOCATION_CODE || "2840")
  .split(",")
  .map((s) => Number(s.trim()))
  .filter(Boolean);

const LOC_NAME = { 2840: "US", 2356: "India", 2826: "UK", 2036: "Australia", 2124: "Canada" };
const locLabel = (c) => LOC_NAME[c] || `loc-${c}`;

// --cached: rebuild both reports from scripts/keyword-report.json without any
// API calls (free). Useful after changing filter logic or report formatting.
const CACHED = process.argv.includes("--cached");
const reportPath = join(__dirname, "keyword-report.json");

if ((!LOGIN || !PASSWORD) && !CACHED) {
  console.log(`
┌─────────────────────────────────────────────────────────────────┐
│  DataForSEO credentials not set — skipping live validation.       │
└─────────────────────────────────────────────────────────────────┘

To run real keyword validation:
  1. Copy .env.example to .env.local
  2. Set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD
  3. (Optional) DATAFORSEO_LOCATION_CODES=2840,2356  (US + India)
  4. Run:  npm run validate:keywords

It fetches search volume, CPC and keyword difficulty for every keyword in
scripts/seed-keywords.txt across each location, keeps those matching the brief
(KD < ${MAX_KD}, volume ${MIN_VOLUME}-${MAX_VOLUME}, CPC ≥ $${MIN_CPC.toFixed(2)}),
and writes scripts/keyword-report.json + ROADMAP-keywords.md.
`);
  process.exit(0);
}

// --- Load seed keywords ---------------------------------------------------
const kwPath = join(__dirname, "seed-keywords.txt");
if (!existsSync(kwPath)) {
  console.error("Missing scripts/seed-keywords.txt");
  process.exit(1);
}
const keywords = readFileSync(kwPath, "utf8")
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter((s) => s && !s.startsWith("#"));

if (!keywords.length) {
  console.error("No keywords found in scripts/seed-keywords.txt");
  process.exit(1);
}

const AUTH = "Basic " + Buffer.from(`${LOGIN}:${PASSWORD}`).toString("base64");

async function post(path, body) {
  const res = await fetch("https://api.dataforseo.com" + path, {
    method: "POST",
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  // Read the JSON body even on HTTP errors — DataForSEO returns an actionable
  // status_code/message there (e.g. 40104 "verify your account", 40200 payment)
  // that's far more useful than the bare HTTP status.
  let json = null;
  try {
    json = await res.json();
  } catch {
    /* non-JSON body */
  }
  if (json && json.status_code && json.status_code !== 20000) {
    throw new Error(`${json.status_code} ${json.status_message}`);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return json;
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

// Fetch volume/CPC + keyword difficulty for ONE location. Each call is
// fault-tolerant so a gap in one product doesn't lose the rest.
async function fetchLocation(code) {
  const vol = new Map();
  const diff = new Map();
  for (const batch of chunk(keywords, 700)) {
    try {
      const sv = await post("/v3/keywords_data/google_ads/search_volume/live", [
        { keywords: batch, location_code: code, language_code: LANGUAGE },
      ]);
      for (const task of sv.tasks ?? [])
        for (const r of task.result ?? [])
          if (r?.keyword)
            vol.set(r.keyword.toLowerCase(), { search_volume: r.search_volume ?? 0, cpc: r.cpc ?? 0, competition: r.competition ?? null });
    } catch (e) {
      console.warn(`  ⚠ ${locLabel(code)} search-volume failed: ${e.message}`);
    }
    try {
      const kd = await post("/v3/dataforseo_labs/google/bulk_keyword_difficulty/live", [
        { keywords: batch, location_code: code, language_code: LANGUAGE },
      ]);
      for (const task of kd.tasks ?? [])
        for (const r of task.result ?? []) {
          const items = r?.items ?? (Array.isArray(r) ? r : [r]);
          for (const it of items) if (it?.keyword) diff.set(it.keyword.toLowerCase(), it.keyword_difficulty ?? null);
        }
    } catch (e) {
      console.warn(`  ⚠ ${locLabel(code)} keyword-difficulty failed: ${e.message}`);
    }
  }
  return { vol, diff };
}

function scoreOf(sv, cpc, kd) {
  return kd != null ? Math.round((sv * Math.max(cpc, 0.01)) / (kd + 1)) : 0;
}
// MAX_VOLUME is a soft signal, not a gate. KD already measures competition
// directly, so a low-KD term with huge volume is the BEST outcome, not a fail —
// the hard cap used to reject exactly the strongest terms (e.g. gst calculator
// India: 301k volume at KD 18). Those now get a "jackpot" verdict instead.
function verdictOf(sv, cpc, kd) {
  if (kd == null || kd >= MAX_KD || sv < MIN_VOLUME || cpc < MIN_CPC) return null;
  return sv > MAX_VOLUME ? "jackpot" : "pass";
}

function toMarkdown(rows) {
  let md = `# Keyword Opportunity Roadmap\n\n`;
  md += `_Generated ${new Date().toISOString()}_\n\n`;
  md += `**Filters:** keyword difficulty < ${MAX_KD} · volume ${MIN_VOLUME}–${MAX_VOLUME} · CPC ≥ $${MIN_CPC}\n\n`;
  md += `**Locations:** ${LOCATIONS.map(locLabel).join(", ")}. Ranked by best opportunity score (volume × CPC ÷ difficulty) across locations.\n\n`;
  md += `🔥 = passes the KD/CPC quality filters with volume **above** the ${MAX_VOLUME} cap — the highest-upside terms. ✅ = passes within the cap. Build/optimize 🔥 and ✅ rows first.\n\n`;
  let head = `| # | Keyword |`;
  let sep = `|---|---|`;
  for (const code of LOCATIONS) {
    head += ` ${locLabel(code)} Vol | ${locLabel(code)} CPC | ${locLabel(code)} KD |`;
    sep += `---|---|---|`;
  }
  head += ` Opportunity | Build first? |`;
  sep += `---|---|`;
  md += head + "\n" + sep + "\n";
  rows.forEach((r, i) => {
    let row = `| ${i + 1} | ${r.keyword} |`;
    for (const code of LOCATIONS) {
      const l = r.locations[code];
      row += ` ${l.search_volume} | $${l.cpc} | ${l.kd ?? "—"} |`;
    }
    row += ` ${r.bestScore} | ${r.verdict === "jackpot" ? "🔥" : r.verdict === "pass" ? "✅" : "—"} |`;
    md += row + "\n";
  });
  return md;
}

async function run() {
  let kwList = keywords;
  const byLoc = {};

  if (CACHED) {
    if (!existsSync(reportPath)) {
      console.error("--cached given but scripts/keyword-report.json doesn't exist. Run live once first.");
      process.exit(1);
    }
    const prev = JSON.parse(readFileSync(reportPath, "utf8"));
    LOCATIONS = prev.locations;
    kwList = prev.rows.map((r) => r.keyword);
    for (const code of LOCATIONS) byLoc[code] = { vol: new Map(), diff: new Map() };
    for (const r of prev.rows)
      for (const code of LOCATIONS) {
        const l = r.locations[code];
        if (!l) continue;
        const k = r.keyword.toLowerCase();
        byLoc[code].vol.set(k, { search_volume: l.search_volume, cpc: l.cpc, competition: l.competition });
        byLoc[code].diff.set(k, l.kd);
      }
    console.log(`Rebuilding reports from cached data (${kwList.length} keywords, no API calls)…`);
  } else {
    console.log(`Validating ${kwList.length} keywords across ${LOCATIONS.map(locLabel).join(" + ")} (lang ${LANGUAGE})…`);
    for (const code of LOCATIONS) {
      console.log(`\nFetching ${locLabel(code)} (${code})…`);
      byLoc[code] = await fetchLocation(code);
    }
  }

  const rows = kwList
    .map((kw) => {
      const k = kw.toLowerCase();
      const locations = {};
      let bestScore = 0;
      let verdict = null;
      for (const code of LOCATIONS) {
        const v = byLoc[code].vol.get(k) ?? {};
        const kd = byLoc[code].diff.get(k) ?? null;
        const sv = v.search_volume ?? 0;
        const cpc = v.cpc ?? 0;
        const score = scoreOf(sv, cpc, kd);
        const vd = verdictOf(sv, cpc, kd);
        locations[code] = { search_volume: sv, cpc: Number(cpc.toFixed(2)), kd, competition: v.competition ?? null, score, verdict: vd };
        if (score > bestScore) bestScore = score;
        if (vd === "jackpot" || (vd === "pass" && verdict !== "jackpot")) verdict = vd;
      }
      return { keyword: kw, locations, bestScore, verdict, pass: verdict != null };
    })
    .sort((a, b) => Number(b.pass) - Number(a.pass) || b.bestScore - a.bestScore);

  // --- Console table ---
  const pad = (s, n) => String(s).padEnd(n);
  let header = pad("KEYWORD", 30);
  for (const code of LOCATIONS) header += pad(`${locLabel(code)} vol/kd`, 16);
  header += "BUILD";
  console.log("\n" + header);
  console.log("─".repeat(header.length));
  for (const r of rows) {
    let line = pad(r.keyword.slice(0, 29), 30);
    for (const code of LOCATIONS) {
      const l = r.locations[code];
      line += pad(`${l.search_volume}/${l.kd ?? "—"}`, 16);
    }
    line += r.verdict === "jackpot" ? "★" : r.verdict === "pass" ? "✓" : "";
    console.log(line);
  }

  const passed = rows.filter((r) => r.pass).length;
  const jackpots = rows.filter((r) => r.verdict === "jackpot").length;
  const anyData = rows.some((r) => LOCATIONS.some((c) => r.locations[c].search_volume > 0 || r.locations[c].kd != null));
  console.log("\n" + "─".repeat(header.length));
  console.log(`${passed}/${rows.length} keywords pass (${jackpots} ★ high-volume jackpots) across ${LOCATIONS.map(locLabel).join(" + ")}.`);
  if (!anyData) {
    console.log("\n⚠ No metrics returned — see the warning(s) above for the exact reason");
    console.log("  (common causes: account not yet verified, or insufficient balance).");
  }

  writeFileSync(reportPath, JSON.stringify({ generatedAt: new Date().toISOString(), filters: { MAX_KD, MIN_VOLUME, MAX_VOLUME, MIN_CPC }, locations: LOCATIONS, rows }, null, 2));
  const mdPath = join(root, "ROADMAP-keywords.md");
  writeFileSync(mdPath, toMarkdown(rows));
  console.log(`\nReports written:\n  scripts/keyword-report.json\n  ROADMAP-keywords.md`);
}

run().catch((e) => {
  console.error("\nValidation failed:", e.message);
  process.exit(1);
});
