(function (global) {
  var confidenceApi = global.AlchemistConfidenceEngine || (typeof require === 'function' ? require('./confidence-engine.js') : null);
  function createMasteryEngine(config) {
    config = config || {};
    var xpPerCorrect = config.xpPerCorrect || 1;
    function apply(unit, event) {
      unit = unit || {};
      event = event || {};
      var attempts = (unit.attempts || 0) + (event.action === 'practice' || event.action === 'mastered' || event.correct != null ? 1 : 0);
      var correct = (unit.correct || 0) + (event.correct === true || event.action === 'mastered' ? 1 : 0);
      var xp = unit.xp || 0;
      if ((event.correct === true || event.action === 'mastered') && !event.repeat) xp += xpPerCorrect;
      var accuracy = attempts ? correct / attempts : 0;
      var confidence = confidenceApi.calculateConfidence({ accuracy: accuracy, attempts: attempts, duration: event.duration, reviewCount: unit.reviewCount || 0, readingCompletion: unit.readingCompletion || 0, quizPerformance: accuracy, manualConfidence: event.manualConfidence });
      var level = Math.floor(xp / 10) + 1;
      return Object.assign({}, unit, { xp: xp, level: level, attempts: attempts, correct: correct, accuracy: accuracy, confidence: confidence, mastery: confidence >= 85 && correct >= 2 ? 1 : confidence / 100, revisionIntervalDays: confidence >= 85 ? 14 : confidence >= 60 ? 7 : 2, streak: event.correct === false ? 0 : (unit.streak || 0) + 1 });
    }
    return { apply: apply };
  }
  var api = { createMasteryEngine: createMasteryEngine };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AlchemistMasteryEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
