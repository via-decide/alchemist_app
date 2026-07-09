const decision = require('../core/decision-engine/decision-engine.js');
const engine = decision.createDecisionEngine();

function json(statusCode, body) { return { statusCode, headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) }; }
function parseBody(event) { if (!event || !event.body) return {}; return typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body; }

async function handler(event = {}) {
  const url = new URL(event.rawUrl || event.url || 'http://local/api/progress');
  const method = event.httpMethod || event.method || 'GET';
  const parts = url.pathname.replace(/^\/api/, '').split('/').filter(Boolean);
  if (method === 'GET' && parts[0] === 'progress') return json(200, engine.getProgress());
  if (method === 'GET' && parts[0] === 'mastery') return json(200, engine.getMastery());
  if (method === 'GET' && parts[0] === 'confidence') return json(200, engine.getConfidence(url.searchParams.get('id')));
  if (method === 'POST' && parts[0] === 'decision') return json(200, engine.decide(Object.assign({ interactionType: 'API' }, parseBody(event))));
  if (method === 'GET' && parts[0] === 'history') return json(200, engine.getHistory());
  if (method === 'GET' && parts[0] === 'analytics') return json(200, engine.getAnalytics());
  if (method === 'GET' && parts[0] === 'topic') return json(200, engine.getKnowledgeUnit(parts[1]) || null);
  if (method === 'POST' && parts[0] === 'bookmark') return json(200, engine.addBookmark(parseBody(event)));
  if (method === 'POST' && parts[0] === 'highlight') return json(200, engine.addHighlight(parseBody(event)));
  if (method === 'POST' && parts[0] === 'note') return json(200, engine.addNote(parseBody(event)));
  return json(404, { error: 'not_found' });
}
module.exports = { handler, engine };
