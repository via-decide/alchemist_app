const assert = require('node:assert');
const state = require('../core/decision-engine/state-machine.js');
const router = require('../core/decision-engine/interaction-router.js');
const decision = require('../core/decision-engine/decision-engine.js');
const api = require('../api/decision-api.js');

const machine = state.createStateMachine();
assert.equal(machine.transition('unknown', 'read'), 'seen');
assert.equal(machine.transition('seen', 'practice'), 'practicing');
assert.equal(machine.transition('practicing', 'mastered'), 'mastered');
assert.equal(machine.transition('mastered', 'incorrect'), 'needs_review');

const event = router.normalize({ interactionType: 'SWIPE', topic: 'electrochemistry', concept: 'nernst_equation', correct: true, duration: 4200 });
assert.equal(event.type, 'decision');
assert.equal(event.interactionType, 'SWIPE');
assert.equal(event.action, 'mastered');
assert.equal(event.topic, 'electrochemistry');

const engine = decision.createDecisionEngine();
const first = engine.decide({ interactionType: 'SWIPE', topic: 'electrochemistry', concept: 'nernst_equation', correct: true, duration: 4200 });
assert.equal(first.knowledgeUnit.id, 'nernst_equation');
assert.equal(first.knowledgeUnit.xp, 1);
assert(first.knowledgeUnit.confidence > 0);
assert.equal(engine.getProgress().totalKnowledgeUnits, 1);

engine.decide({ interactionType: 'READ', topic: 'thermodynamics', concept: 'entropy', duration: 1000, payload: { knowledgeUnit: { id: 'entropy', title: 'Entropy', category: 'equations' } } });
engine.addBookmark({ topic: 'thermodynamics', concept: 'entropy' });
engine.addHighlight({ topic: 'thermodynamics', concept: 'entropy' });
engine.addNote({ topic: 'thermodynamics', concept: 'entropy' });
assert.equal(engine.bookmarks().length, 1);
assert.equal(engine.highlights().length, 1);
assert.equal(engine.notes().length, 1);
assert(engine.getAnalytics().decisionCount >= 4);
assert.equal(engine.getKnowledgeUnit('entropy').category, 'equations');

(async () => {
  const response = await api.handler({ method: 'POST', rawUrl: 'http://local/api/decision', body: JSON.stringify({ topic: 'organic', concept: 'sn2', correct: true, duration: 3000 }) });
  assert.equal(response.statusCode, 200);
  assert.equal(JSON.parse(response.body).knowledgeUnit.id, 'sn2');
  const progress = await api.handler({ method: 'GET', rawUrl: 'http://local/api/progress' });
  assert.equal(progress.statusCode, 200);
  assert(JSON.parse(progress.body).totalKnowledgeUnits >= 1);
  console.log('decision-engine tests passed');
})().catch((error) => { console.error(error); process.exit(1); });
