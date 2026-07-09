(function (global) {
  function createProgressEngine() {
    function summarize(units) {
      var values = Object.keys(units || {}).map(function (id) { return units[id]; });
      var byCategory = {};
      values.forEach(function (unit) { var category = unit.category || 'topic'; byCategory[category] = (byCategory[category] || 0) + 1; });
      return { topicsCompleted: values.filter(function (u) { return u.state === 'mastered' || u.state === 'archived'; }).length, conceptsLearned: values.filter(function (u) { return (u.confidence || 0) >= 60; }).length, coverage: byCategory, totalKnowledgeUnits: values.length };
    }
    return { summarize: summarize };
  }
  var api = { createProgressEngine: createProgressEngine };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AlchemistProgressEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
