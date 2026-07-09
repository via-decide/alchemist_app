(function (global) {
  var stateApi = global.AlchemistStateMachine || (typeof require === 'function' ? require('./state-machine.js') : null);
  var routerApi = global.AlchemistInteractionRouter || (typeof require === 'function' ? require('./interaction-router.js') : null);
  var masteryApi = global.AlchemistMasteryEngine || (typeof require === 'function' ? require('./mastery-engine.js') : null);
  var progressApi = global.AlchemistProgressEngine || (typeof require === 'function' ? require('./progress-engine.js') : null);
  var historyApi = global.AlchemistHistoryEngine || (typeof require === 'function' ? require('./history-engine.js') : null);
  var analyticsApi = global.AlchemistAnalyticsEngine || (typeof require === 'function' ? require('./analytics-engine.js') : null);

  function createKnowledgeUnit(input) {
    input = input || {};
    return { id: input.id || input.concept || input.topic || 'unknown', title: input.title || input.q || input.question || input.topic || 'Untitled', category: input.category || input.dom || input.domain || 'topic', difficulty: input.difficulty || input.level || 'unknown', prerequisites: input.prerequisites || [], mastery: input.mastery || 0, confidence: input.confidence || 0, history: input.history || [], tags: input.tags || [], related_topics: input.related_topics || [], references: input.references || (input.ref ? [input.ref] : []), state: input.state || 'unknown', xp: input.xp || 0 };
  }

  function createDecisionEngine(options) {
    options = options || {};
    var stateMachine = stateApi.createStateMachine(options.stateMachine || {});
    var mastery = masteryApi.createMasteryEngine(options.mastery || {});
    var progress = progressApi.createProgressEngine();
    var history = historyApi.createHistoryEngine(options.history || []);
    var analytics = analyticsApi.createAnalyticsEngine();
    var units = {};
    var bookmarks = [];
    var highlights = [];
    var notes = [];

    function ensureUnit(input) {
      var unit = createKnowledgeUnit(input || {});
      units[unit.id] = Object.assign(unit, units[unit.id] || {}, input || {});
      return units[unit.id];
    }
    function decide(input) {
      var event = routerApi.normalize(input);
      var unit = ensureUnit(Object.assign({}, event.payload.knowledgeUnit || {}, { id: event.concept, topic: event.topic }));
      var nextState = stateMachine.transition(unit.state, event.action);
      var mastered = mastery.apply(unit, event);
      units[unit.id] = Object.assign({}, unit, mastered, { state: nextState, history: (unit.history || []).concat([event]) });
      if (event.action === 'bookmark') bookmarks.push(event);
      if (event.action === 'highlight') highlights.push(event);
      if (event.action === 'annotate') notes.push(event);
      history.record(event);
      return { event: event, knowledgeUnit: units[unit.id], progress: progress.summarize(units), analytics: analytics.summarize(history.list(), units) };
    }
    return { decide: decide, registerKnowledgeUnit: ensureUnit, getKnowledgeUnit: function (id) { return units[id] || null; }, getProgress: function () { return progress.summarize(units); }, getMastery: function () { return units; }, getConfidence: function (id) { return id ? ((units[id] && units[id].confidence) || 0) : Object.keys(units).map(function (key) { return { id: key, confidence: units[key].confidence || 0 }; }); }, getHistory: history.list, getAnalytics: function () { return analytics.summarize(history.list(), units); }, addBookmark: function (input) { return decide(Object.assign({}, input, { interactionType: 'BOOKMARK' })); }, addHighlight: function (input) { return decide(Object.assign({}, input, { interactionType: 'HIGHLIGHT' })); }, addNote: function (input) { return decide(Object.assign({}, input, { interactionType: 'NOTE' })); }, bookmarks: function () { return bookmarks.slice(); }, highlights: function () { return highlights.slice(); }, notes: function () { return notes.slice(); } };
  }
  var api = { createDecisionEngine: createDecisionEngine, createKnowledgeUnit: createKnowledgeUnit };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AlchemistDecisionEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
