const fs = require('node:fs');
const path = require('node:path');

function readJson(name) { return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/knowledge', name), 'utf8')); }
function json(statusCode, body) { return { statusCode, headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) }; }
function filterByType(type) { return readJson('knowledge-index.json').filter((t) => t.category.includes(type) || t.frontmatter.type === type); }

async function handler(event = {}) {
  const url = new URL(event.rawUrl || event.url || 'http://local/topics');
  const parts = url.pathname.replace(/^\/api/, '').split('/').filter(Boolean);
  if (parts[0] === 'topics') return json(200, readJson('knowledge-index.json'));
  if (parts[0] === 'topic') return json(200, readJson('knowledge-index.json').find((t) => t.slug === parts[1]) || null);
  if (parts[0] === 'search') {
    const q = (url.searchParams.get('q') || '').toLowerCase();
    return json(200, readJson('search-index.json').filter((i) => i.text.includes(q)).slice(0, 25));
  }
  if (parts[0] === 'graph') return json(200, readJson('graph.json'));
  if (['history','equations','people','references'].includes(parts[0])) return json(200, filterByType(parts[0].replace(/s$/, '')));
  if (parts[0] === 'export' && parts[1] === 'epub') return json(200, { status: 'planned', message: 'Run scripts/build-knowledge.mjs then scripts/build_epub.py for reproducible EPUB output.' });
  if (parts[0] === 'export' && parts[1] === 'pdf') return json(200, { status: 'planned', message: 'PDF export is reserved for the static publishing pipeline.' });
  return json(404, { error: 'not_found' });
}
module.exports = { handler };
