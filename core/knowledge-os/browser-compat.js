(function (global) {
  function safeShowDialog(dialog) {
    if (!dialog) return false;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      return true;
    }
    dialog.setAttribute('open', '');
    return false;
  }

  function safeCloseDialog(dialog) {
    if (!dialog) return false;
    if (typeof dialog.close === 'function') {
      dialog.close();
      return true;
    }
    dialog.removeAttribute('open');
    return false;
  }

  function copyText(text, clipboard) {
    var api = clipboard || (global.navigator && global.navigator.clipboard);
    if (!api || typeof api.writeText !== 'function') return Promise.resolve(false);
    return api.writeText(String(text)).then(function () { return true; }).catch(function (error) {
      if (global.console && typeof global.console.error === 'function') global.console.error(error);
      return false;
    });
  }

  function debounce(fn, wait) {
    var timer = null;
    return function () {
      var args = arguments;
      var ctx = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, wait || 150);
    };
  }

  function validateRoute(route, registry) {
    var clean = String(route || 'home').replace(/^#/, '') || 'home';
    var parts = clean.split('/').filter(Boolean);
    var root = parts[0] || 'home';
    registry = registry || {};
    if (root === 'entity' && registry.entities && !registry.entities[parts[1]]) return { ok: false, root: '404', code: 'UNKNOWN_ENTITY', id: parts[1] || '', route: clean };
    if (root === 'domain' && registry.domains && !registry.domains[parts[1]]) return { ok: false, root: '404', code: 'UNKNOWN_DOMAIN', id: parts[1] || '', route: clean };
    return { ok: true, root: root, id: parts[1] || '', route: clean };
  }

  function setActiveNavigation(links, activeId) {
    Array.prototype.forEach.call(links || [], function (link) {
      var active = link.getAttribute('data-nav') === activeId;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function setTabs(tabs, selectedId) {
    Array.prototype.forEach.call(tabs || [], function (tab) {
      var selected = tab.getAttribute('data-tab') === selectedId;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.tabIndex = selected ? 0 : -1;
    });
  }

  var api = { safeShowDialog: safeShowDialog, safeCloseDialog: safeCloseDialog, copyText: copyText, debounce: debounce, validateRoute: validateRoute, setActiveNavigation: setActiveNavigation, setTabs: setTabs };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AlchemistBrowserCompat = api;
})(typeof window !== 'undefined' ? window : globalThis);
