// Gera o logo "Rv." em vetor a partir da Outfit 900, com o encaixe apertado do logo original.
// Saída: src/data/logo.js (caminhos SVG por letra, para o header 2D e para extrudir em 3D)
import fs from 'fs';
import opentype from 'opentype.js';

const font = opentype.loadSync('node_modules/@fontsource/outfit/files/outfit-latin-900-normal.woff');
const size = 100;
const overlap = Number(process.argv[2] ?? 0.16);   // quanto o v entra no R (em em)
const dotGap = Number(process.argv[3] ?? 0.02);    // espaço entre v e ponto (em em)

const R = font.charToGlyph('R'), v = font.charToGlyph('v'), dot = font.charToGlyph('.');
const scale = size / font.unitsPerEm;
let x = 0;
const parts = [];
for (const [g, adv] of [[R, -overlap], [v, dotGap - 0.04], [dot, 0]]) {
  const p = g.getPath(x, 0, size);
  parts.push(p.toPathData(2));
  x += g.advanceWidth * scale + adv * size;
}
// caixa total para centrar
const all = parts.join(' ');
const bb = (() => {
  const nums = all.match(/-?\d+(\.\d+)?/g).map(Number);
  const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
})();
const out = { parts, viewBox: [bb.minX, bb.minY, bb.maxX - bb.minX, bb.maxY - bb.minY].map((n) => +n.toFixed(2)) };
fs.writeFileSync('src/data/logo.js', `// Gerado por scripts/make-logo.mjs (Outfit 900, encaixe do logo original Rv.)\nexport const logo = ${JSON.stringify(out, null, 2)};\n`);
fs.writeFileSync(process.argv[4] || '/dev/null', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${out.viewBox.join(' ')}"><path d="${parts.join(' ')}"/></svg>`);
console.log('viewBox', out.viewBox);
