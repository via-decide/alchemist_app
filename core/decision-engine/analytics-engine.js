(function (global) {
  function createAnalyticsEngine() {
    function summarize(events, units) {
      events = events || [];
      var totalTime = events.reduce(function (sum, event) { return sum + (event.duration || 0); }, 0);
      var decisions = events.filter(function (event) { return event.type === 'decision'; });
      var weakTopics = Object.keys(units || {}).map(function (id) { return units[id]; }).filter(function (unit) { return (unit.confidence || 0) < 50; }).map(function (unit) { return unit.id; });
      var strongTopics = Object.keys(units || {}).map(function (id) { return units[id]; }).filter(function (unit) { return (unit.confidence || 0) >= 80; }).map(function (unit) { return unit.id; });
      return { learningVelocity: decisions.length ? decisions.length / Math.max(totalTime / 60000, 1) : 0, timeSpent: totalTime, decisionCount: decisions.length, weakTopics: weakTopics, strongTopics: strongTopics, confidenceGraph: Object.keys(units || {}).map(function (id) { return { id: id, confidence: units[id].confidence || 0 }; }), revisionGraph: events.filter(function (event) { return event.action === 'review'; }) };
    }
    return { summarize: summarize };
  }
  var api = { createAnalyticsEngine: createAnalyticsEngine };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AlchemistAnalyticsEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
