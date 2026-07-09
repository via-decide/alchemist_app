(function (global) {
  function createHistoryEngine(initial) {
    var events = Array.isArray(initial) ? initial.slice() : [];
    return { record: function (event) { events.push(Object.assign({}, event)); return event; }, list: function () { return events.slice(); }, byTopic: function (topic) { return events.filter(function (event) { return event.topic === topic; }); } };
  }
  var api = { createHistoryEngine: createHistoryEngine };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AlchemistHistoryEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
