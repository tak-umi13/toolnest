import type { Tool } from "./registry/types";

/**
 * Internal-linking engine.
 *
 * The "related tools" block on every page is the heart of the SEO flywheel:
 * it spreads link equity ("authority circulation"), keeps users on-site, and
 * tells Google how tools relate. With 1,000+ tools, you can't hand-pick links
 * for each one — so this function decides them automatically.
 *
 * The plumbing is done for you:
 *   1. Hand-picked `tool.related` slugs always come first (editorial control).
 *   2. Everything else is ranked by scoreRelatedness() and appended.
 *   3. The list is de-duped and trimmed to `limit`.
 *
 * What's left to you is scoreRelatedness() — the part that actually shapes the
 * graph. See the TODO below.
 */
export function getRelatedTools(tool: Tool, all: Tool[], limit = 6): Tool[] {
  const bySlug = new Map(all.map((t) => [t.slug, t]));

  // 1. Editorial picks first, in the author's order.
  const manual: Tool[] = (tool.related ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((t): t is Tool => Boolean(t) && t!.slug !== tool.slug);

  const taken = new Set(manual.map((t) => t.slug));
  taken.add(tool.slug);

  // 2. Score the rest and append the best.
  const scored = all
    .filter((t) => !taken.has(t.slug))
    .map((t) => ({ tool: t, score: scoreRelatedness(tool, t) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.tool);

  return [...manual, ...scored].slice(0, limit);
}

// Generic function-words and tool-type suffixes that appear across unrelated
// tools ("free json generator", "online emi calculator"). Counting these as
// topical overlap would wire up spurious links, so we ignore them — the goal is
// to match on *subject* (gst, json, slug) not on *format* (calculator, online).
const GENERIC_TOKENS = new Set([
  "free", "online", "tool", "tools", "the", "a", "to", "and", "of", "for", "in",
  "your", "best", "how", "with", "calculator", "converter", "generator", "checker",
  "validator", "formatter", "encoder", "decoder", "counter", "maker",
]);

function subjectTokens(tool: Tool): Set<string> {
  const tokens = new Set<string>();
  for (const phrase of tool.keywords) {
    for (const raw of phrase.toLowerCase().split(/\s+/)) {
      const t = raw.replace(/[^a-z0-9]/g, "");
      if (t.length > 1 && !GENERIC_TOKENS.has(t)) tokens.add(t);
    }
  }
  return tokens;
}

/**
 * Score how related candidate `b` is to the current tool `a` (higher = more
 * related). This single function shapes the entire internal-linking graph.
 *
 * Weighting rationale:
 *   - Same category is a solid baseline (+3), but deliberately NOT the only
 *     signal, so authority isn't trapped inside silos.
 *   - Each shared subject token adds topical relevance (+2 each).
 *   - A cross-category pair that still shares subject tokens is a "bridge"
 *     (e.g. slug-generator ↔ keyword-density-checker via "seo"). Those links are
 *     the most valuable for circulating authority, so they get a bonus (+3).
 *
 * Pure and O(tokens) per comparison — cheap enough to run across the catalog.
 */
export function scoreRelatedness(a: Tool, b: Tool): number {
  let score = a.category === b.category ? 3 : 0;

  const at = subjectTokens(a);
  const bt = subjectTokens(b);
  let shared = 0;
  for (const t of at) if (bt.has(t)) shared++;

  score += shared * 2;
  if (a.category !== b.category && shared > 0) score += 3; // cross-silo bridge

  return score;
}
