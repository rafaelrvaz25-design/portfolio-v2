// Migra um case study do formato antigo (src/data/projects.js + content/*.md) para
// content/projetos/<slug>.yml, o formato editado no backoffice.
//
//   node scripts/migrar.mjs gallo            → escreve content/projetos/gallo.yml
//   node scripts/migrar.mjs gallo --verificar → só verifica (não escreve)
//
// Não altera nem apaga o Markdown original. No fim, prova que nada se perdeu: o case study
// lido do YAML tem de ser idêntico, campo a campo, ao lido do Markdown original
// (título, ficha, secções, HTML de cada bloco, figuras, tempo de leitura).
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import YAML from 'yaml';
import { projects } from '../src/data/projects.js';
import { parseCaseStudy } from '../src/lib/caseStudy.js';
import { projectToMarkdown, FICHA } from '../src/lib/content.js';

const slug = process.argv[2];
const onlyCheck = process.argv.includes('--verificar');
const entry = projects.find((p) => p.slug === slug);
if (!entry) throw new Error(`Projeto "${slug}" não existe em src/data/projects.js`);

const root = process.cwd();
const raw = fs.readFileSync(path.join(root, 'content', entry.file), 'utf8');
const lines = raw.split('\n');
const withSlash = (src) => (src.startsWith('/') ? src : `/${src}`);
const LABEL_TO_KEY = Object.fromEntries(FICHA.map(([k, l]) => [l, k]));
const HIDDEN = ['Por confirmar', 'Imagens necessárias'];

// ---------- Markdown → estrutura ----------
let headline = null;
const lead = [];
const ficha = {};
const sections = [];
let state = 'start';
let current = null;
for (const line of lines) {
  if (line.startsWith('# ')) continue;
  if (state === 'start' && line.startsWith('## ')) { headline = line.slice(3).trim(); state = 'lead'; continue; }
  if (state === 'lead') {
    if (line.startsWith('### Ficha rápida')) { state = 'facts'; continue; }
    if (line.trim()) lead.push(line.trim());
    continue;
  }
  if (state === 'facts') {
    const m = line.match(/^- \*\*(.+?):\*\*\s*(.+)$/);
    if (m) {
      const key = LABEL_TO_KEY[m[1]];
      if (!key) throw new Error(`Campo da ficha desconhecido: "${m[1]}" (o modelo YAML não o guardaria)`);
      ficha[key] = m[2];
      continue;
    }
    if (line.trim() === '---') { state = 'body'; continue; }
    if (line.trim()) throw new Error(`Linha inesperada na ficha: "${line}"`);
    continue;
  }
  if (state === 'body') {
    if (line.startsWith('## ')) {
      const titulo = line.slice(3).trim();
      if (HIDDEN.includes(titulo)) throw new Error(`Secção de notas "${titulo}": decidir antes de migrar`);
      current = { titulo, body: [] };
      sections.push(current);
      continue;
    }
    if (!current) { if (line.trim()) throw new Error(`Texto antes da primeira secção: "${line}"`); continue; }
    current.body.push(line);
  }
}

const FIGURE = /^!\[(.*)\]\((.+)\)\s*$/;
function mobileFor(src) {
  const [file, query] = src.split('?');
  const mobile = file.replace(/(\.[a-z0-9]+)$/i, '-mobile$1');
  if (!fs.existsSync(path.join(root, 'public', mobile.replace(/^\//, '')))) return null;
  return query ? `${mobile}?${query}` : mobile;
}

const secoes = sections.map(({ titulo, body }) => {
  const s = { titulo };
  const ls = [...body];
  while (ls.length && !ls[0].trim()) ls.shift();
  if (ls[0]?.startsWith('### ')) s.subtitulo = ls.shift().slice(4).trim();
  const blocos = [];
  let text = [];
  const flush = () => {
    const corpo = text.join('\n').trim();
    if (corpo) blocos.push({ tipo: 'texto', corpo });
    text = [];
  };
  for (let i = 0; i < ls.length; i++) {
    const t = ls[i].trim();
    const fig = t.match(FIGURE);
    if (fig) {
      flush();
      const imagem = withSlash(fig[2]);
      const b = { tipo: 'figura', imagem };
      const mob = mobileFor(imagem);
      if (mob) b.imagem_mobile = mob;
      b.legenda = fig[1];
      blocos.push(b);
    } else if (t === ':::stats') {
      flush();
      const itens = [];
      for (i++; i < ls.length && ls[i].trim() !== ':::'; i++) {
        if (!ls[i].trim()) continue;
        const [valor, ...d] = ls[i].trim().split('|');
        itens.push({ valor: valor.trim(), descricao: d.join('|').trim() });
      }
      blocos.push({ tipo: 'numeros', itens });
    } else text.push(ls[i]);
  }
  flush();
  s.blocos = blocos;
  return s;
});

const data = {
  slug: entry.slug,
  visibilidade: 'publico',
  ordem: (projects.indexOf(entry) + 1) * 10,
  titulo: entry.title,
  categoria: entry.tag,
  titulo_pagina: headline,
  ...(lead.length ? { descricao: lead.join('\n') } : {}),
  ...(entry.year ? { ano: entry.year } : {}),
  ficha,
  capa: { imagem: withSlash(entry.cover), cor_fundo: entry.color },
  secoes,
};

// ---------- Prova de que nada se perdeu ----------
// A única diferença aceite é a barra inicial nos caminhos das imagens ("/images/…" no YAML,
// para o Decap mostrar as miniaturas): o componente remove-a ao montar o URL.
const noSlash = (study) => JSON.parse(JSON.stringify(study, (k, v) => ((k === 'src' || k === 'srcMobile') && typeof v === 'string' ? v.replace(/^\//, '') : v)));
const before = noSlash(parseCaseStudy(raw));
const after = noSlash(parseCaseStudy(projectToMarkdown(data)));
assert.deepStrictEqual(after, before, 'O conteúdo lido do YAML difere do original');
assert.strictEqual(data.titulo, entry.title);
assert.strictEqual(data.categoria, entry.tag);
assert.strictEqual(data.ficha.cliente, entry.client, 'O cliente dos cartões difere do da ficha');
const figuras = secoes.flatMap((s) => s.blocos).filter((b) => b.tipo === 'figura').length;
console.log(`OK: ${secoes.length} secções, ${figuras} figuras, ${before.readMinutes} min de leitura, conteúdo idêntico ao Markdown.`);

if (!onlyCheck) {
  const out = path.join(root, 'content', 'projetos', `${entry.slug}.yml`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const doc = new YAML.Document(data);
  fs.writeFileSync(out, doc.toString({ lineWidth: 0, blockQuote: 'literal' }));
  // O ficheiro escrito tem de voltar a dar o mesmo resultado.
  const reread = YAML.parse(fs.readFileSync(out, 'utf8'));
  assert.deepStrictEqual(noSlash(parseCaseStudy(projectToMarkdown(reread))), before);
  console.log(`Escrito ${path.relative(root, out)} (o Markdown original fica intacto).`);
}
