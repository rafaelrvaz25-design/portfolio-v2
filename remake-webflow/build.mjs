// Gera o remake estático do site Webflow "Rafa Stuff".
// Uso: node remake-webflow/build.mjs  →  escreve em remake-webflow/dist/
// Todos os caminhos são relativos, por isso funciona em qualquer subpasta (ex.: /portfolio-v2/webflow/).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import { remake, comingSoon } from './remake.config.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dist = path.join(here, 'dist');

// Lê src/data/projects.js (ESM com `export const`) sem depender do Next.
const projectsSrc = fs.readFileSync(path.join(root, 'src/data/projects.js'), 'utf8');
const { projects, person } = await import('data:text/javascript,' + encodeURIComponent(projectsSrc));

const HIDDEN = ['Por confirmar', 'Imagens necessárias'];
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function loadStudy(file) {
  const lines = fs.readFileSync(path.join(root, 'content', file), 'utf8').split('\n');
  let headline = '';
  const facts = [];
  const sections = [];
  let cur = null;
  let inFacts = false;
  for (const line of lines) {
    if (line.startsWith('# ')) continue;
    if (line.startsWith('### Ficha rápida')) { inFacts = true; continue; }
    if (inFacts) {
      const m = line.match(/^- \*\*(.+?):\*\*\s*(.+)$/);
      if (m) { facts.push({ label: m[1], value: m[2] }); continue; }
      if (line.trim() === '---') { inFacts = false; continue; }
      if (!line.trim()) continue;
    }
    if (line.startsWith('## ')) {
      const t = line.slice(3).trim();
      if (!headline) { headline = t; continue; }
      cur = { title: t, md: [] };
      sections.push(cur);
      continue;
    }
    if (line.trim() === '---') continue;
    if (cur) cur.md.push(line);
  }
  const impact = facts.find((f) => f.label === 'Impacto');
  return {
    headline,
    facts: facts.filter((f) => f.label !== 'Impacto'),
    impact: impact ? impact.value.charAt(0).toUpperCase() + impact.value.slice(1) : '',
    sections: sections.filter((s) => !HIDDEN.includes(s.title)).map((s) => ({ title: s.title, html: marked.parse(s.md.join('\n')) })),
  };
}

// O padrão do site antigo: dentro de uma secção, cada subtítulo (h3) vira uma linha
// com o título à esquerda e o texto à direita, separada por uma linha fina.
function rowsFromH3(html) {
  const parts = html.split(/(?=<h3[ >])/);
  const intro = parts[0].startsWith('<h3') ? '' : parts.shift();
  const rows = parts.map((p) => {
    const m = p.match(/^<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*)$/);
    if (!m) return p;
    return `<div class="row"><h3 class="row-title">${m[1]}</h3><div class="row-body">${m[2]}</div></div>`;
  });
  return `${intro ? `<div class="prose">${intro}</div>` : ''}${rows.join('')}`;
}

const asset = (depth, p) => `${'../'.repeat(depth)}${p}`;

function head(title, depth, description) {
  return `<!doctype html>
<html lang="pt" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="preload" href="${asset(depth, 'fonts/outfit-latin-400-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset(depth, 'styles.css')}">
<script defer src="${asset(depth, 'main.js')}"></script>
</head>`;
}

function navbar(depth) {
  const home = asset(depth, 'index.html');
  return `<header class="navbar">
  <div class="container nav-inner">
    <a class="brand" href="${home}" aria-label="Início"><img src="${asset(depth, 'assets/logo-rv.png')}" alt="Rv." width="29" height="22"></a>
    <button class="menu-button" aria-expanded="false" aria-controls="menu" aria-label="Menu"><span></span><span></span></button>
    <nav id="menu" class="nav-menu" aria-label="Principal">
      <a class="nav-link" href="${home}#estudos">Estudos</a>
      <a class="nav-link" href="${home}#sobre">Sobre</a>
      <a class="nav-link" href="${person.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
    </nav>
  </div>
</header>`;
}

function footer(depth) {
  return `<footer class="footer">
  <div class="container container-left">
    <a class="email" href="mailto:${person.email}">${person.email}</a>
    <div class="footer-links">
      <a class="link-externo" href="${person.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
      <a class="link-externo" href="mailto:${person.email}">Enviar email</a>
    </div>
    <p class="copyright">© 2026 Rafael Vaz · UX/UI Designer</p>
  </div>
</footer>`;
}

function banner(p, depth, size = 'large') {
  const b = remake[p.slug].banner;
  return `<a class="banner banner-${size}" href="${asset(depth, `projetos/${p.slug}/index.html`)}" style="--bg:${b.bg};--fg:${b.fg}">
    <span class="banner-shape" aria-hidden="true"></span>
    <span class="banner-text">
      <span class="banner-kicker">${esc(b.kicker)}</span>
      <span class="banner-title">${esc(p.title)}</span>
      <span class="banner-client">${esc(p.client)}</span>
    </span>
    <span class="banner-device" aria-hidden="true"><span>Imagem por enviar</span></span>
  </a>`;
}

/* ---------- Home ---------- */
function home() {
  const [featured, ...others] = projects;
  const cards = others.map((p) => `<div class="card">${banner(p, 0, 'card')}</div>`).join('')
    + comingSoon.map((c) => `<div class="card card-soon" aria-label="${esc(c.title)}, em breve">
      <span class="soon-title">${esc(c.title)}</span><span class="soon-tag">${esc(c.tag)}</span><span class="soon-label">Em breve</span>
    </div>`).join('');

  return `${head('Rafael Vaz · UX/UI Designer', 0, 'Portfolio de Rafael Vaz, UX/UI Designer especializado em Design Systems.')}
<body>
${navbar(0)}
<main>
  <section class="section-hello">
    <div class="container reveal">
      <div class="label-text">UX/UI · Design de produto</div>
      <h1 class="heading">Olá, sou o Rafael</h1>
      <p class="paragraph-1">UX/UI Designer especializado em Design Systems, fascinado por comportamento humano e tecnologia.</p>
    </div>
  </section>

  <section class="section-2" id="estudos">
    <div class="container container-left reveal">
      <h2 class="heading-2">Estudo recente</h2>
      ${banner(featured, 0, 'large')}
    </div>
  </section>

  <section class="section-3">
    <div class="container container-left reveal">
      <h2 class="heading-2">Outros estudos</h2>
      <div class="other-works">${cards}</div>
    </div>
  </section>

  <section class="about-me" id="sobre">
    <div class="container container-left about-grid">
      <div class="about-text reveal">
        <div class="label-text">Sobre mim</div>
        <h2 class="heading">Quem sou?</h2>
        <p class="paragraph">O meu nome é Rafael Vaz. Sou UX/UI Designer na Monday, em Lisboa, com três anos de experiência em produtos digitais de desporto, e-commerce e retalho.</p>
        <p class="paragraph">Especializei-me na construção e evolução de Design Systems. Gosto mais de acompanhar e fazer crescer um produto depois do lançamento do que de um projeto com início, meio e fim.</p>
        <div class="buttons">
          <a class="button" href="mailto:${person.email}">Contacta-me</a>
          <a class="button button-ghost" href="${person.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <img class="euzim" src="assets/rafael.png" alt="Rafael Vaz" width="500" height="667">
    </div>
  </section>
</main>
${footer(0)}
</body>
</html>`;
}

/* ---------- Case study ---------- */
function caseStudy(p, i) {
  const s = loadStudy(p.file);
  const cfg = remake[p.slug];
  const next = projects[(i + 1) % projects.length];
  const figures = (title) => (p.images[title] || []).map((cap) => `
      <figure class="figure reveal">
        <div class="figure-frame" style="--bg:${p.color}"><span>Imagem por enviar</span></div>
        <figcaption>${esc(cap)}</figcaption>
      </figure>`).join('');

  const sections = s.sections.map((sec, k) => `
  <section class="cs-section ${k % 2 ? 'tone-white' : 'tone-blue'}">
    <div class="container container-left">
      <div class="reveal">
        <div class="label-text label-gap">${String(k + 1).padStart(2, '0')} · ${esc(sec.title)}</div>
        <h2 class="heading heading-cs">${esc(cfg.headings[sec.title] || sec.title)}</h2>
      </div>
      <div class="reveal">${rowsFromH3(sec.html)}</div>
      ${figures(sec.title)}
    </div>
  </section>`).join('');

  const facts = s.facts.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('');

  return `${head(`${p.title} · Rafael Vaz`, 2, s.headline)}
<body class="case">
<div class="scrollbar" aria-hidden="true"></div>
${navbar(2)}
<main>
  <section class="cs-intro">
    <div class="container container-left intro-grid">
      <div class="reveal">
        <div class="label-text label-gap">${esc(p.tag)} · ${esc(p.client)}</div>
        <h1 class="heading heading-intro">${esc(s.headline)}</h1>
        <p class="long-paragraph intro-p">${esc(s.impact)}</p>
        <dl class="facts">${facts}</dl>
      </div>
      <div class="intro-cover reveal" style="--bg:${cfg.banner.bg}"><span>Capa · ${esc(p.title)}</span></div>
    </div>
  </section>
  ${sections}

  <section class="up-next">
    <div class="container container-left">
      <p class="title-up-next">Próximo estudo</p>
      ${banner(next, 2, 'next')}
    </div>
  </section>
</main>
${footer(2).replace('<div class="footer-links">', `<div class="footer-links"><a class="link-externo" href="../../index.html#estudos">Todos os trabalhos</a>`)}
</body>
</html>`;
}

/* ---------- Escrever ---------- */
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
for (const d of ['assets', 'fonts']) fs.cpSync(path.join(here, 'src', d), path.join(dist, d), { recursive: true });
fs.copyFileSync(path.join(here, 'src/styles.css'), path.join(dist, 'styles.css'));
fs.copyFileSync(path.join(here, 'src/main.js'), path.join(dist, 'main.js'));
fs.writeFileSync(path.join(dist, 'index.html'), home());
projects.forEach((p, i) => {
  const dir = path.join(dist, 'projetos', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), caseStudy(p, i));
});
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
console.log('Remake gerado em', path.relative(root, dist));
