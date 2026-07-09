(function (global) {
  var STATES = ['unknown', 'seen', 'learning', 'practicing', 'confident', 'mastered', 'needs_review', 'archived'];
  var DEFAULT_TRANSITIONS = {
    unknown: { read: 'seen', study: 'learning', practice: 'learning', mastered: 'confident', incorrect: 'learning' },
    seen: { read: 'seen', study: 'learning', practice: 'practicing', mastered: 'confident', incorrect: 'learning' },
    learning: { practice: 'practicing', correct: 'practicing', mastered: 'confident', incorrect: 'needs_review', review: 'practicing' },
    practicing: { correct: 'confident', mastered: 'mastered', incorrect: 'needs_review', review: 'confident' },
    confident: { correct: 'mastered', mastered: 'mastered', incorrect: 'needs_review', decay: 'needs_review', archive: 'archived' },
    mastered: { incorrect: 'needs_review', decay: 'needs_review', review: 'mastered', archive: 'archived' },
    needs_review: { review: 'practicing', correct: 'confident', mastered: 'mastered', incorrect: 'needs_review' },
    archived: { restore: 'needs_review', read: 'archived' }
  };
  function createStateMachine(config) {
    var transitions = Object.assign({}, DEFAULT_TRANSITIONS, (config && config.transitions) || {});
    return {
      states: STATES.slice(),
      transition: function (state, action) {
        var current = STATES.indexOf(state) >= 0 ? state : 'unknown';
        var table = transitions[current] || {};
        return table[action] || current;
      },
      canTransition: function (state, action) { return this.transition(state, action) !== (STATES.indexOf(state) >= 0 ? state : 'unknown'); }
    };
  }
  var api = { STATES: STATES, DEFAULT_TRANSITIONS: DEFAULT_TRANSITIONS, createStateMachine: createStateMachine };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AlchemistStateMachine = api;
})(typeof window !== 'undefined' ? window : globalThis);
