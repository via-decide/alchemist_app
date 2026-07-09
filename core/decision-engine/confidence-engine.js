(function (global) {
  function clamp(n) { return Math.max(0, Math.min(100, Math.round(n))); }
  function calculateConfidence(input) {
    input = input || {};
    var accuracy = input.accuracy == null ? 0.5 : input.accuracy;
    var attempts = Math.max(1, input.attempts || 1);
    var duration = Math.max(0, input.duration || 0);
    var expected = Math.max(1000, input.expectedDuration || 8000);
    var timeScore = Math.max(0, 1 - Math.min(duration / expected, 1));
    var reviewScore = Math.min((input.reviewCount || 0) / 5, 1);
    var reading = input.readingCompletion == null ? 0 : input.readingCompletion;
    var quiz = input.quizPerformance == null ? accuracy : input.quizPerformance;
    var manual = input.manualConfidence;
    var base = (accuracy * 0.4 + timeScore * 0.15 + reviewScore * 0.1 + reading * 0.15 + quiz * 0.2) * 100;
    return clamp(manual == null ? base : (base * 0.7 + manual * 100 * 0.3));
  }
  var api = { calculateConfidence: calculateConfidence };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AlchemistConfidenceEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
