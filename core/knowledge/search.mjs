export function search(index, query, options = {}) {
  const q = String(query || '').toLowerCase().trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  return index.map((item) => ({ item, score: score(item, tokens, options) })).filter((r) => r.score > 0).sort((a,b) => b.score - a.score).slice(0, options.limit || 20).map((r) => ({ ...r.item, score: r.score }));
}
function score(item, tokens, options) {
  let total = 0;
  const hay = [item.text, ...(item.headings || []), ...(item.tags || []), ...(item.equations || []), item.author || ''].join(' ').toLowerCase();
  for (const token of tokens) {
    if (hay.includes(token)) total += 10;
    else if (fuzzy(hay, token)) total += 3;
  }
  if (options.tag && (item.tags || []).includes(options.tag)) total += 20;
  if (options.author && String(item.author).toLowerCase().includes(String(options.author).toLowerCase())) total += 20;
  return total;
}
function fuzzy(hay, needle) { let i = 0; for (const ch of hay) if (ch === needle[i]) i++; return i === needle.length && needle.length > 2; }
