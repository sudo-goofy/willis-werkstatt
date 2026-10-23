// QR-Aufkleber neu erzeugen (z. B. wenn ein Werkzeug dazukommt):
//   npm install --no-save qrcode@1.5.3
//   node scripts/aufkleber.js qrcode index.html aufkleber.html
const QR = require(process.argv[2]);
const fs = require('fs');
const html = fs.readFileSync(process.argv[3], 'utf8');
const line = html.split('\n').find(l => l.startsWith('        const tools = '));
const tools = JSON.parse(line.replace('        const tools = ', '').replace(/;\s*$/, ''));
const BASE = 'https://werkstatt.wogenau.haus/#werkzeug/';

const isTopic = t => t.cat === 'stoffe' || ['leitern-transport', 'laerm'].includes(t.id);
const order = { green: 0, blue: 1, werkzeug: 2, stoffe: 3 };
const byCat = (a, b) => order[a.cat] - order[b.cat];
const groups = [
  ['In der Werkstatt', tools.filter(t => t.vorhanden && !isTopic(t)).sort(byCat)],
  ['Tätigkeiten & Stoffe', tools.filter(isTopic)],
  ['Noch nicht vorhanden (für später)', tools.filter(t => !t.vorhanden).sort(byCat)],
];
const CAT = { green: ['#9ac79a', 'Kategorie Grün'], blue: ['#7fabd6', 'Kategorie Blau'], werkzeug: ['#e7d4ab', 'Werkzeug & Tätigkeit'], stoffe: ['#f1d27a', 'Stoffe & Tätigkeit'] };

function qrSvg(url) {
  const qr = QR.create(url, { errorCorrectionLevel: 'Q' });   // Q: verträgt Schmutz/Kratzer (~25 %)
  const n = qr.modules.size, q = 4, W = n + 2 * q;
  let d = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (qr.modules.data[y * n + x]) d += `M${x + q} ${y + q}h1v1h-1z`;
  return `<svg viewBox="0 0 ${W} ${W}" shape-rendering="crispEdges" role="img" aria-label="QR-Code: ${url}"><rect width="${W}" height="${W}" fill="#fff"/><path fill="#221f1c" d="${d}"/></svg>`;
}
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const willi = `<svg viewBox="0 0 100 100" class="willi" aria-hidden="true"><path d="M 50 4 C 74 4, 95 16, 94 50 C 93 82, 78 95, 50 94 C 17 93, 6 78, 6 50 C 6 21, 22 4, 50 4 Z" fill="#e59c90" stroke="#221f1c" stroke-width="6"/><circle cx="37" cy="42" r="5.5" fill="#221f1c"/><path d="M 57 43 q 6 5 12 0" fill="none" stroke="#221f1c" stroke-width="6" stroke-linecap="round"/><path d="M 32 60 Q 50 80 68 60" fill="none" stroke="#221f1c" stroke-width="6.5" stroke-linecap="round"/></svg>`;

const sticker = t => `
      <div class="sticker">
        <div class="bar" style="background:${CAT[t.cat][0]}">${willi}<span class="brand">Willis Werkstatt</span><span class="cat">${CAT[t.cat][1]}</span></div>
        <div class="qr">${qrSvg(BASE + t.id)}</div>
        <div class="name">${esc(t.name)}</div>
        <div class="hint">Scannen: Betriebsanweisung</div>
      </div>`;

const body = groups.map(([title, list]) => `
    <section class="sheet">
      <h2>${esc(title)} <small>${list.length} Aufkleber</small></h2>
      <div class="grid">${list.map(sticker).join('')}
      </div>
    </section>`).join('');

fs.writeFileSync(process.argv[4], `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>QR-Aufkleber | Willis Werkstatt</title>
<!-- Druckvorlage: ein QR-Aufkleber pro Werkzeug. Erzeugt aus den Werkzeug-Daten in index.html.
     Jeder Code führt auf ${BASE}<id>. Nicht von Hand bearbeiten – neu erzeugen. -->
<style>
  @font-face { font-family: 'Fira Code'; font-weight: 300 700; src: url(fonts/fira-code-latin-wght-normal.woff2) format('woff2'); }
  @font-face { font-family: 'Kirang Haerang'; src: url(fonts/kirang-haerang-latin-400-normal.woff2) format('woff2'); }
  :root { --ink: #221f1c; --paper: #f5ead2; --card: #fffaf0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Fira Code', monospace; color: var(--ink); background: var(--paper); }
  .intro { max-width: 190mm; margin: 0 auto; padding: 24px 16px 8px; }
  .intro h1 { font-family: 'Kirang Haerang', cursive; font-size: 2.4rem; margin: 0 0 .25rem; }
  .intro p { margin: .25rem 0; font-size: .9rem; }
  .intro button { margin-top: .75rem; font: inherit; font-weight: 700; padding: .6rem 1.2rem; border: 2px solid var(--ink); border-radius: 999px; background: #c1343f; color: #fff; cursor: pointer; }
  .sheet { max-width: 190mm; margin: 0 auto; padding: 8px 16px 24px; }
  h2 { font-size: 1.1rem; margin: 1rem 0 .6rem; } h2 small { font-weight: 400; color: #4c453c; }
  .grid { display: grid; grid-template-columns: repeat(3, 58mm); gap: 6mm; justify-content: start; }
  .sticker { width: 58mm; height: 82mm; background: #fff; border: 0.4mm solid var(--ink); border-radius: 4mm; overflow: hidden;
             display: flex; flex-direction: column; align-items: center; break-inside: avoid; }
  .bar { width: 100%; display: flex; align-items: center; gap: 1.5mm; padding: 1.8mm 2.5mm; border-bottom: 0.4mm solid var(--ink); }
  .willi { width: 6mm; height: 6mm; flex-shrink: 0; }
  .brand { font-family: 'Kirang Haerang', cursive; font-size: 11pt; line-height: 1; flex: 1; white-space: nowrap; }
  .cat { font-size: 5.5pt; font-weight: 700; text-transform: uppercase; background: #fff; border: 0.3mm solid var(--ink); border-radius: 99px; padding: .5mm 1.5mm; white-space: nowrap; }
  .qr { width: 44mm; height: 44mm; margin-top: 2.5mm; } .qr svg { width: 100%; height: 100%; display: block; }
  .name { font-weight: 800; font-size: 10.5pt; line-height: 1.15; text-align: center; padding: 1.5mm 3mm 0; flex: 1; display: flex; align-items: center; hyphens: auto; }
  .hint { font-size: 6.5pt; color: #4c453c; padding-bottom: 2.5mm; }
  @page { size: A4; margin: 10mm; }
  @media print {
    body { background: #fff; }
    .intro { display: none; }
    .sheet { padding: 0; max-width: none; break-after: page; }
    .sheet:last-child { break-after: auto; }
    h2 { margin-top: 0; }
  }
</style>
</head>
<body>
  <div class="intro">
    <h1>QR-Aufkleber</h1>
    <p>Ein Aufkleber pro Werkzeug – der Code öffnet direkt die Betriebsanweisung auf <b>werkstatt.wogenau.haus</b>.</p>
    <p>Drucken auf A4, Skalierung 100 % („Tatsächliche Größe“). Jeder Abschnitt beginnt auf einer neuen Seite.</p>
    <button onclick="window.print()">Drucken</button>
  </div>
${body}
</body>
</html>
`);
console.log(groups.map(([t, l]) => `${t}: ${l.length}`).join(' | '));
