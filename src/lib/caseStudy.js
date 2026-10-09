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

export function loadCaseStudy(file) {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', file), 'utf8');
  const lines = raw.split('\n');

  let headline = '';
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
  }

  const visible = sections
    .filter((s) => !HIDDEN_SECTIONS.includes(s.title))
    .map((s) => ({
      title: s.title,
      html: highlightPending(marked.parse(s.body.join('\n'))),
    }));

  const impact = facts.find((f) => f.label === 'Impacto');
  return {
    headline,
    facts: facts.filter((f) => f.label !== 'Impacto').map((f) => ({
      ...f,
      value: f.value.replace(/\[(por confirmar)\]/i, 'Por confirmar'),
      pending: /por confirmar/i.test(f.value),
    })),
    impact: impact ? impact.value.charAt(0).toUpperCase() + impact.value.slice(1) : '',
    sections: visible,
  };
}
