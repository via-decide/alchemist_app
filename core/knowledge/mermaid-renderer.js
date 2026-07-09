(function (global) {
  function renderMermaid(root) {
    var scope = root || document;
    var blocks = scope.querySelectorAll('pre code.language-mermaid, code.language-mermaid, .mermaid-source');
    blocks.forEach(function (block, index) {
      var source = block.textContent;
      var container = document.createElement('div');
      container.className = 'mermaid';
      container.dataset.mermaidIndex = String(index);
      container.textContent = source;
      var pre = block.closest('pre');
      (pre || block).replaceWith(container);
    });
    if (global.mermaid && typeof global.mermaid.run === 'function') global.mermaid.run({ querySelector: '.mermaid' });
  }
  global.AlchemistMermaidRenderer = { renderMermaid: renderMermaid };
})(typeof window !== 'undefined' ? window : globalThis);
