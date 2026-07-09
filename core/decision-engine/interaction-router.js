(function (global) {
  var TYPES = ['SWIPE','BUTTON','KEYBOARD','SEARCH','READ','BOOKMARK','NOTE','HIGHLIGHT','QUIZ','VOICE','GRAPH_NODE','TIMELINE','LAB','PDF','EPUB','API'];
  var ACTIONS = { SWIPE: 'practice', BUTTON: 'study', KEYBOARD: 'practice', SEARCH: 'read', READ: 'read', BOOKMARK: 'bookmark', NOTE: 'annotate', HIGHLIGHT: 'highlight', QUIZ: 'practice', VOICE: 'practice', GRAPH_NODE: 'study', TIMELINE: 'study', LAB: 'practice', PDF: 'export', EPUB: 'export', API: 'study' };
  function normalize(input) {
    input = input || {};
    var interaction = String(input.interactionType || input.source || 'API').toUpperCase();
    if (TYPES.indexOf(interaction) === -1) interaction = 'API';
    var action = input.action || ACTIONS[interaction] || 'study';
    if (input.correct === true) action = input.action || 'mastered';
    if (input.correct === false) action = input.action || 'incorrect';
    return { type: 'decision', interactionType: interaction, topic: input.topic || input.domain || 'unknown', concept: input.concept || input.knowledgeUnitId || input.id || input.topic || 'unknown', action: action, confidence: input.confidence == null ? null : input.confidence, duration: input.duration || 0, timestamp: input.timestamp || new Date().toISOString(), correct: input.correct, payload: input.payload || {} };
  }
  var api = { TYPES: TYPES, normalize: normalize };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AlchemistInteractionRouter = api;
})(typeof window !== 'undefined' ? window : globalThis);
