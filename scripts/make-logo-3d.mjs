// Gera o "Rv." do logo 3D a partir da Mattone Black (Collletttivo, OFL 1.1).
// Uso: node scripts/make-logo-3d.mjs [encaixe] [espaço do ponto] [svg de pré-visualização]
// Saída: src/data/logo3d.js (caminhos SVG por letra, extrudidos pelo components/Logo3D)
import fs from 'fs';
import opentype from 'opentype.js';

const font = opentype.loadSync('fonts-src/Mattone-Black.otf');
const size = 100;
const overlap = Number(process.argv[2] ?? 0.08); // quanto o v entra no R (em em)
const dotGap = Number(process.argv[3] ?? 0.02);  // espaço entre v e ponto (em em)

const scale = size / font.unitsPerEm;
let x = 0;
const parts = [];
for (const [ch, adv] of [['R', -overlap], ['v', dotGap], ['.', 0]]) {
  const g = font.charToGlyph(ch);
  parts.push(g.getPath(x, 0, size).toPathData(2));
  x += g.advanceWidth * scale + adv * size;
}
const nums = parts.join(' ').match(/-?\d+(\.\d+)?/g).map(Number);
const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1);
const viewBox = [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)].map((n) => +n.toFixed(2));
fs.writeFileSync('src/data/logo3d.js', `// Gerado por scripts/make-logo-3d.mjs (Mattone Black)\nexport const logo3d = ${JSON.stringify({ parts, viewBox }, null, 2)};\n`);
if (process.argv[4]) fs.writeFileSync(process.argv[4], `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox.join(' ')}"><path d="${parts.join(' ')}"/></svg>`);
console.log('viewBox', viewBox);
