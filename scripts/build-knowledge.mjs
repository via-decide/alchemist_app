import fs from 'node:fs';
import path from 'node:path';
import { buildKnowledge, graphToMermaid } from '../core/knowledge/engine.mjs';

const root = process.cwd();
const outputDir = path.join(root, 'public/knowledge');
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(path.join(root, 'graphs'), { recursive: true });
const knowledge = buildKnowledge(root);
const stats = { generatedAt: new Date(0).toISOString(), topicCount: knowledge.topics.length, edgeCount: knowledge.graph.edges.length, markdownFiles: knowledge.topics.map((t) => t.path) };
const files = {
  'knowledge-index.json': knowledge.topics,
  'search-index.json': knowledge.search,
  'graph.json': knowledge.graph,
  'navigation.json': knowledge.navigation,
  'toc.json': knowledge.toc,
  'knowledge-stats.json': stats
};
for (const [name, data] of Object.entries(files)) fs.writeFileSync(path.join(outputDir, name), `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(path.join(root, 'graphs/graph.mmd'), graphToMermaid(knowledge.graph));
fs.writeFileSync(path.join(root, 'docs/generated/SUMMARY.md'), renderSummary(knowledge));
fs.writeFileSync(path.join(root, 'docs/generated/README.md'), renderReadme(stats));
console.log(`Indexed ${stats.topicCount} Markdown files and ${stats.edgeCount} graph edges.`);

function renderSummary(knowledge) {
  return ['# Alchemist Knowledge Summary', '', ...Object.entries(knowledge.navigation).flatMap(([category, topics]) => [`## ${category}`, '', ...topics.map((t) => `- [${t.title}](../../${t.path})`), ''])].join('\n');
}
function renderReadme(stats) {
  return `# Generated Knowledge Documentation\n\nThis directory is reproducible from Markdown source files using \`node scripts/build-knowledge.mjs\`.\n\n- Topics indexed: ${stats.topicCount}\n- Graph edges: ${stats.edgeCount}\n- Deterministic timestamp: ${stats.generatedAt}\n`;
}
