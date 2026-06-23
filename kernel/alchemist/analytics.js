/**
 * MODULE_CONTRACT
 * Inputs: localStorage state, optional beacon sync URL
 * Outputs: event tracking, local funnel statistics, return session detection
 * Functions: AlchemistAnalytics.init(), trackEvent(), getFunnelMetrics(), getStats()
 * Constraints: Privacy-first, local-only by default, no external trackers, clean API.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'alchemist_analytics_data';
  var VISIT_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour session gap for return visit

  // Initialize analytics state structure
  var state = {
    visitorId: '',
    visitsCount: 0,
    lastActiveTime: 0,
    events: [],
    funnel: {
      landing: true,
      firstPrompt: false,
      firstAsset: false,
      firstExport: false,
      returnSession: false
    }
  };

  function loadState() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        var parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          // Merge default keys to prevent errors with older local storage
          Object.keys(state).forEach(function (key) {
            if (parsed[key] !== undefined) {
              state[key] = parsed[key];
            }
          });
        }
      }
    } catch (e) {
      console.warn('Failed to load Alchemist analytics state:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save Alchemist analytics state:', e);
    }
  }

  function generateUUID() {
    return 'usr_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  function init() {
    loadState();
    var now = Date.now();

    // Generate unique visitor ID if not present
    if (!state.visitorId) {
      state.visitorId = generateUUID();
      state.visitsCount = 0;
    }

    // Return visit detection (>1 hour inactivity or subsequent visits)
    var isNewSession = false;
    if (state.lastActiveTime === 0) {
      isNewSession = true;
      state.visitsCount = 1;
    } else if (now - state.lastActiveTime > VISIT_TIMEOUT_MS) {
      isNewSession = true;
      state.visitsCount += 1;
      state.funnel.returnSession = true;
      trackEvent('return_visit', { visitNo: state.visitsCount });
    }

    state.lastActiveTime = now;
    saveState();

    if (isNewSession) {
      trackEvent('session_started', { visitNo: state.visitsCount });
    }
  }

  function trackEvent(name, metadata) {
    loadState();
    var eventObj = {
      name: name,
      timestamp: Date.now(),
      meta: metadata || {}
    };

    state.events.push(eventObj);
    state.lastActiveTime = Date.now();

    // Contextually update funnel states
    if (name === 'session_started') {
      state.funnel.landing = true;
    } else if (name === 'question_submitted') {
      state.funnel.firstPrompt = true;
    } else if (name === 'asset_created') {
      state.funnel.firstAsset = true;
    } else if (name === 'pdf_exported' || name === 'epub_exported' || name === 'html_exported' || name === 'zay_exported') {
      state.funnel.firstExport = true;
    } else if (name === 'return_visit') {
      state.funnel.returnSession = true;
    }

    saveState();

    // Trigger document event for integration hooks
    if (typeof document !== 'undefined') {
      var customEvent = new CustomEvent('alchemist:analytics:event', {
        detail: eventObj
      });
      document.dispatchEvent(customEvent);
    }

    // Optional background sync with Google Sheet telemetry if BEACON_URL is accessible
    if (typeof window !== 'undefined' && window.BEACON_URL) {
      fetch(window.BEACON_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: name,
          visitor_id: state.visitorId,
          session_id: window.CURRENT_SES_ID || localStorage.getItem("LAST_SES_ID") || "GUEST",
          visit_no: state.visitsCount,
          timestamp: new Date().toISOString(),
          meta: metadata || {}
        })
      }).catch(function () {
        // Silent catch for network issues / offline state
      });
    }

    console.log('[Analytics] Event Tracked:', name, eventObj.meta);
  }

  function getFunnelMetrics() {
    loadState();
    
    // In a local context, we derive percentages from our funnel progression.
    // If the visitor has reached a stage, conversion for that stage is 100% for this user.
    // We compute aggregate simulator weights to show on the dashboard mock.
    var funnel = state.funnel;

    var metrics = [
      { id: 'landing', label: 'Landing Page', completed: funnel.landing, rate: 100 },
      { id: 'firstPrompt', label: 'First Prompt (Activation)', completed: funnel.firstPrompt, rate: funnel.firstPrompt ? 100 : 0 },
      { id: 'firstAsset', label: 'First Asset Created', completed: funnel.firstAsset, rate: funnel.firstAsset ? 100 : 0 },
      { id: 'firstExport', label: 'First Export Generated', completed: funnel.firstExport, rate: funnel.firstExport ? 100 : 0 },
      { id: 'returnSession', label: 'Return Visit Retention', completed: funnel.returnSession, rate: funnel.returnSession ? 100 : 0 }
    ];

    // Read general statistics from all users if simulated, or output local user conversion path
    return metrics;
  }

  function getStats() {
    loadState();
    
    // Mock general benchmark metrics based on current local progress to render a rich dashboard
    var localScore = 0;
    if (state.funnel.landing) localScore += 20;
    if (state.funnel.firstPrompt) localScore += 20;
    if (state.funnel.firstAsset) localScore += 20;
    if (state.funnel.firstExport) localScore += 20;
    if (state.funnel.returnSession) localScore += 20;

    // Aggregate simulated rates to show typical funnel conversion
    return {
      visitorId: state.visitorId,
      visitsCount: state.visitsCount,
      activationRate: state.funnel.firstPrompt ? 100 : 0,
      exportRate: state.funnel.firstExport ? 100 : 0,
      returnRate: state.funnel.returnSession ? 100 : 0,
      eventsCount: state.events.length,
      funnel: state.funnel,
      score: localScore
    };
  }

  // Export module to global scope
  var AlchemistAnalytics = {
    init: init,
    trackEvent: trackEvent,
    getFunnelMetrics: getFunnelMetrics,
    getStats: getStats
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = AlchemistAnalytics;
  }
  global.AlchemistAnalytics = AlchemistAnalytics;

})(typeof window !== 'undefined' ? window : globalThis);
