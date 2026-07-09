const assert = require('node:assert');
const compat = require('../core/knowledge-os/browser-compat.js');

let opened = false;
const modalDialog = { showModal() { opened = true; }, setAttribute() { throw new Error('fallback should not run'); } };
assert.equal(compat.safeShowDialog(modalDialog), true);
assert.equal(opened, true);

const fallbackAttrs = {};
const fallbackDialog = { setAttribute(name, value) { fallbackAttrs[name] = value; }, removeAttribute(name) { delete fallbackAttrs[name]; } };
assert.equal(compat.safeShowDialog(fallbackDialog), false);
assert.equal(fallbackAttrs.open, '');
assert.equal(compat.safeCloseDialog(fallbackDialog), false);
assert.equal('open' in fallbackAttrs, false);

assert.deepEqual(compat.validateRoute('#entity/missing', { entities: { known: true } }), { ok: false, root: '404', code: 'UNKNOWN_ENTITY', id: 'missing', route: 'entity/missing' });
assert.equal(compat.validateRoute('#entity/known', { entities: { known: true } }).ok, true);

let copied = '';
compat.copyText('Alchemist:ref', { writeText(value) { copied = value; return Promise.resolve(); } }).then((result) => {
  assert.equal(result, true);
  assert.equal(copied, 'Alchemist:ref');
  console.log('knowledge-os compatibility tests passed');
}).catch((error) => { console.error(error); process.exit(1); });
