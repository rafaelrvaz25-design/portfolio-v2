// Lê um case study em /content e parte-o em: título, ficha, secções.
// Corre só no build (server component), por isso pode usar fs.
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// Secções que são notas de trabalho para o Rafa, não para o site.
const HIDDEN_SECTIONS = ['Por confirmar', 'Imagens necessárias'];

function highlightPending(html) {
  return html.replace(/\[(por confirmar|por preencher)\]/gi, '<mark>$1</mark>');
}

// Uma linha só com ![legenda](caminho) vira uma figura larga entre blocos de texto.
const FIGURE = /^!\[(.*)\]\((.+)\)\s*$/;
const esc = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Se existir um ficheiro com o mesmo nome e "-mobile" (ex.: 03-fluxos-mobile.webp),
// a figura usa-o em ecrãs estreitos. O ?v=N do original passa para a versão mobile.
function mobileVersion(src) {
  const [file, query] = src.split('?');
  const mobile = file.replace(/(\.[a-z0-9]+)$/i, '-mobile$1');
  if (mobile === file) return null;
  if (!fs.existsSync(path.join(process.cwd(), 'public', mobile.replace(/^\//, '')))) return null;
  return query ? `${mobile}?${query}` : mobile;
}

function toBlocks(lines) {
  const blocks = [];
  let buf = [];
  const flush = () => {
    const md = buf.join('\n').trim();
    if (md) blocks.push({ type: 'html', html: highlightPending(marked.parse(md)) });
    buf = [];
  };
  let stats = null;
  for (const line of lines) {
    const t = line.trim();
    // :::stats ... ::: → números em destaque, na coluna do texto. Cada linha: "número | descrição".
    if (stats) {
      if (t === ':::') {
        const items = stats.map((l) => {
          const [n, ...d] = l.split('|');
          return `<div><dt>${esc(n.trim())}</dt><dd>${marked.parseInline(d.join('|').trim())}</dd></div>`;
        });
        buf.push('', `<dl class="stats">${items.join('')}</dl>`, '');
        stats = null;
      } else if (t) stats.push(t);
      continue;
    }
    if (t === ':::stats') { stats = []; continue; }
    const m = t.match(FIGURE);
    if (m) { flush(); blocks.push({ type: 'figure', caption: m[1], src: m[2], srcMobile: mobileVersion(m[2]) }); }
    else buf.push(line);
  }
  flush();
  return blocks;
}

export function loadCaseStudy(file) {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', file), 'utf8');
  const lines = raw.split('\n');

  let headline = '';
  const leadLines = []; // texto entre o título e a ficha: descrição curta no hero
  const facts = [];
  const sections = [];
  let current = null;
  let inFacts = false;

  for (const line of lines) {
    if (line.startsWith('# ')) continue; // título interno do documento
    if (line.startsWith('### Ficha rápida')) { inFacts = true; continue; }
    if (inFacts) {
      const m = line.match(/^- \*\*(.+?):\*\*\s*(.+)$/);
      if (m) { facts.push({ label: m[1], value: m[2] }); continue; }
      if (line.trim() === '---') { inFacts = false; continue; }
      if (line.trim() === '') continue;
    }
    if (line.startsWith('## ')) {
      const title = line.slice(3).trim();
      if (!headline) { headline = title; continue; }
      current = { title, body: [] };
      sections.push(current);
      continue;
    }
    if (line.trim() === '---') continue;
    if (current) current.body.push(line);
    else if (headline && !facts.length && line.trim()) leadLines.push(line.trim());
  }

  const visible = sections
    .filter((s) => !HIDDEN_SECTIONS.includes(s.title))
    .map((s) => ({ title: s.title, blocks: toBlocks(s.body) }));

  const impact = facts.find((f) => f.label === 'Impacto');
  return {
    headline,
    lead: leadLines.join(' '),
    facts: facts.filter((f) => f.label !== 'Impacto').map((f) => ({
      ...f,
      value: f.value.replace(/\[(por confirmar)\]/i, 'Por confirmar'),
      pending: /por confirmar/i.test(f.value),
    })),
    impact: impact ? impact.value.charAt(0).toUpperCase() + impact.value.slice(1) : '',
    sections: visible,
  };
}
