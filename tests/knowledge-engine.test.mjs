import assert from 'node:assert';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { buildKnowledge } from '../core/knowledge/engine.mjs';
import { search } from '../core/knowledge/search.mjs';
import { handler } from '../api/knowledge-api.js';

const build = spawnSync('node', ['scripts/build-knowledge.mjs'], { encoding: 'utf8' });
assert.equal(build.status, 0, build.stderr || build.stdout);

const knowledge = buildKnowledge(process.cwd());
assert(knowledge.topics.some((topic) => topic.slug === 'content-physical-thermodynamics'));
const thermo = knowledge.topics.find((topic) => topic.slug === 'content-physical-thermodynamics');
assert(thermo.headings.some((heading) => heading.text === 'Core equation'));
assert(thermo.equations.some((equation) => equation.includes('Delta G')));
assert(thermo.mermaid.length > 0);
assert(thermo.readingTimeMinutes >= 1);

const hits = search(knowledge.search, 'gibbs entropy', { limit: 5 });
assert(hits.some((hit) => hit.slug === 'content-physical-thermodynamics'));

for (const file of ['knowledge-index.json', 'search-index.json', 'graph.json', 'navigation.json', 'toc.json', 'knowledge-stats.json']) {
  assert(fs.existsSync(`public/knowledge/${file}`), `${file} should be generated`);
}
assert(fs.existsSync('graphs/graph.mmd'));

const topics = await handler({ rawUrl: 'http://local/api/topics' });
assert.equal(topics.statusCode, 200);
assert(JSON.parse(topics.body).length >= 3);
const graph = await handler({ rawUrl: 'http://local/api/graph' });
assert.equal(JSON.parse(graph.body).nodes.length, knowledge.graph.nodes.length);
