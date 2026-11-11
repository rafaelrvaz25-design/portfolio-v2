// Compara o HTML gerado em out/ com a linha de base guardada em scripts/linha-de-base/.
// Normaliza o que muda de build para build sem mudar a página: remove os <script>
// (o payload RSC e os chunks têm nomes com hash) e os caminhos /_next/static/...
//
//   node scripts/comparar-html.mjs guardar    → guarda a linha de base a partir de out/
//   node scripts/comparar-html.mjs            → compara out/ com a linha de base (sai com 1 se diferir)
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out');
const BASE = path.join(ROOT, 'scripts', 'linha-de-base');

export const PAGES = [
  'index.html',
  'projetos/design-system-fpf/index.html',
  'projetos/rrs-pingo-doce/index.html',
  'projetos/monday-talent-pool/index.html',
  'projetos/gallo/index.html',
];

export function normalize(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/g, '')
    .replace(/\/_next\/static\/[^"')\s]+/g, '/_next/static/…')
    .replace(/></g, '>\n<'); // uma tag por linha, para o diff ser legível
}

const fileName = (p) => p.replace(/\//g, '__');

function save() {
  fs.mkdirSync(BASE, { recursive: true });
  for (const p of PAGES) {
    fs.writeFileSync(path.join(BASE, fileName(p)), normalize(fs.readFileSync(path.join(OUT, p), 'utf8')));
    console.log('guardado ', p);
  }
}

function compare() {
  let failed = 0;
  for (const p of PAGES) {
    const file = path.join(OUT, p);
    if (!fs.existsSync(file)) { console.log('FALTA    ', p); failed++; continue; }
    const now = normalize(fs.readFileSync(file, 'utf8')).split('\n');
    const before = fs.readFileSync(path.join(BASE, fileName(p)), 'utf8').split('\n');
    const diffs = [];
    const n = Math.max(now.length, before.length);
    for (let i = 0; i < n; i++) if (now[i] !== before[i]) diffs.push(i);
    if (!diffs.length) { console.log('IGUAL    ', p); continue; }
    failed++;
    console.log(`DIFERE   ${p} (${diffs.length} linhas; primeira na linha ${diffs[0] + 1})`);
    for (const i of diffs.slice(0, 5)) {
      console.log(`  antes: ${(before[i] ?? '∅').slice(0, 200)}`);
      console.log(`  agora: ${(now[i] ?? '∅').slice(0, 200)}`);
    }
  }
  process.exitCode = failed ? 1 : 0;
}

if (process.argv[2] === 'guardar') save();
else compare();
