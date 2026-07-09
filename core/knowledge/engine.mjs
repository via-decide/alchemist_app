import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const MARKDOWN_ROOTS = ['content', 'docs', 'book', 'research'];
const GENERATED_DIRS = new Set(['docs/generated', 'public/knowledge', 'exports']);
const RELATION_KEYS = ['prerequisite','related','scientist','equation','experiment','industrial_application','laboratory_method','compound','process'];

export function slugify(value) {
  return String(value || '')
    .toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'untitled';
}

export function discoverMarkdown(root = process.cwd()) {
  const files = [];
  for (const base of MARKDOWN_ROOTS) {
    const abs = path.join(root, base);
    if (fs.existsSync(abs)) walk(abs, root, files);
  }
  return files.sort();
}

function walk(dir, root, out) {
  const rel = path.relative(root, dir).replaceAll(path.sep, '/');
  if ([...GENERATED_DIRS].some((generated) => rel === generated || rel.startsWith(`${generated}/`))) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(abs, root, out);
    if (entry.isFile() && /\.mdx?$/i.test(entry.name)) out.push(path.relative(root, abs).replaceAll(path.sep, '/'));
  }
}

export function parseMarkdown(filePath, source) {
  const { frontmatter, body } = parseFrontmatter(source);
  const headings = [...body.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((m) => ({ level: m[1].length, text: cleanInline(m[2]), slug: slugify(m[2]) }));
  const title = frontmatter.title || headings[0]?.text || path.basename(filePath, path.extname(filePath));
  const slug = frontmatter.slug || slugify(filePath.replace(/\.mdx?$/i, ''));
  const links = extractLinks(body);
  const tags = normalizeList(frontmatter.tags).map(slugify);
  const words = cleanInline(body).split(/\s+/).filter(Boolean).length;
  const equations = [...body.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g)].map((m) => (m[1] || m[2]).trim()).filter(Boolean);
  const mermaid = [...body.matchAll(/```mermaid\n([\s\S]*?)```/g)].map((m) => m[1].trim());
  const relationships = {};
  for (const key of RELATION_KEYS) relationships[key] = normalizeList(frontmatter[key] || frontmatter[`${key}s`]).map(slugify);
  return {
    id: slug,
    slug,
    title,
    path: filePath,
    collection: filePath.split('/')[0],
    category: frontmatter.category || filePath.split('/').slice(1, -1).join('/') || 'root',
    frontmatter,
    tags,
    author: frontmatter.author || frontmatter.authors || '',
    summary: frontmatter.summary || firstParagraph(body),
    headings,
    toc: headings.map((h) => ({ level: h.level, title: h.text, anchor: h.slug })),
    links,
    backlinks: [],
    relationships,
    equations,
    mermaid,
    readingTimeMinutes: Math.max(1, Math.ceil(words / 220)),
    wordCount: words,
    checksum: crypto.createHash('sha256').update(source).digest('hex')
  };
}

function parseFrontmatter(source) {
  if (!source.startsWith('---\n')) return { frontmatter: {}, body: source };
  const end = source.indexOf('\n---', 4);
  if (end === -1) return { frontmatter: {}, body: source };
  return { frontmatter: parseYaml(source.slice(4, end)), body: source.slice(end + 4) };
}

function parseYaml(yaml) {
  const data = {};
  for (const raw of yaml.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (value.startsWith('[') && value.endsWith(']')) data[key] = value.slice(1, -1).split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
    else data[key] = value.replace(/^['"]|['"]$/g, '');
  }
  return data;
}

function extractLinks(body) {
  const markdown = [...body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((m) => m[1]);
  const wiki = [...body.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)].map((m) => m[1]);
  return [...new Set([...markdown, ...wiki].filter((href) => !href.startsWith('http')).map((href) => slugify(href.replace(/\.mdx?(#.*)?$/i, ''))))];
}

function normalizeList(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return String(value).split(',').map((item) => item.trim()).filter(Boolean);
}
function cleanInline(text) { return String(text).replace(/[`*_#[\]()]/g, ' ').replace(/<[^>]+>/g, ' ').trim(); }
function firstParagraph(body) { return body.split(/\n\s*\n/).map(cleanInline).find((p) => p.length > 40)?.slice(0, 240) || ''; }

export function buildKnowledge(root = process.cwd()) {
  const topics = discoverMarkdown(root).map((file) => parseMarkdown(file, fs.readFileSync(path.join(root, file), 'utf8')));
  const bySlug = new Map(topics.map((topic) => [topic.slug, topic]));
  for (const topic of topics) for (const link of topic.links) if (bySlug.has(link)) bySlug.get(link).backlinks.push(topic.slug);
  const nodes = topics.map((topic) => ({ id: topic.slug, label: topic.title, type: inferType(topic), path: topic.path, tags: topic.tags }));
  const edges = [];
  for (const topic of topics) {
    for (const target of topic.links) edges.push({ source: topic.slug, target, type: 'links_to' });
    for (const [type, targets] of Object.entries(topic.relationships)) for (const target of targets) edges.push({ source: topic.slug, target, type });
  }
  const graph = { generatedAt: new Date(0).toISOString(), nodes, edges: dedupeEdges(edges) };
  return { topics, graph, search: buildSearch(topics), navigation: buildNavigation(topics), toc: topics.map((t) => ({ slug: t.slug, title: t.title, toc: t.toc })) };
}

function inferType(topic) { return topic.frontmatter.type || (topic.category.includes('people') ? 'scientist' : topic.category.includes('equation') ? 'equation' : 'topic'); }
function dedupeEdges(edges) { return [...new Map(edges.map((e) => [`${e.source}|${e.target}|${e.type}`, e])).values()].sort((a,b) => `${a.source}${a.target}${a.type}`.localeCompare(`${b.source}${b.target}${b.type}`)); }
function buildSearch(topics) { return topics.map((t) => ({ slug: t.slug, title: t.title, path: t.path, tags: t.tags, author: t.author, headings: t.headings.map((h) => h.text), equations: t.equations, text: [t.title, t.summary, t.tags.join(' '), t.headings.map((h) => h.text).join(' '), t.equations.join(' ')].join(' ').toLowerCase() })); }
function buildNavigation(topics) { const groups = {}; for (const topic of topics) (groups[topic.category] ||= []).push({ slug: topic.slug, title: topic.title, path: topic.path }); return groups; }
export function graphToMermaid(graph) { return ['graph TD', ...graph.edges.map((e) => `  ${slugify(e.source)}["${e.source}"] -->|${e.type}| ${slugify(e.target)}["${e.target}"]`)].join('\n') + '\n'; }
