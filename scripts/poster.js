// Poster (A3) neu erzeugen:
//   npm install --no-save qrcode@1.5.3
//   node scripts/poster.js qrcode
// Schreibt poster/nutzungskonzept.html und poster/sicherheit.html (Texte wie auf der Website).
const QR = require(process.argv[2] || 'qrcode');
const fs = require('fs');
const SITE = 'https://werkstatt.wogenau.haus/';

function qr(url, size) {
    const q = QR.create(url, { errorCorrectionLevel: 'Q' });
    const n = q.modules.size, m = 2, W = n + 2 * m;
    let d = '';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.modules.data[y * n + x]) d += `M${x + m} ${y + m}h1v1h-1z`;
    return `<div class="qr" style="width:${size}mm;height:${size}mm"><svg viewBox="0 0 ${W} ${W}" shape-rendering="crispEdges" role="img" aria-label="QR-Code: ${url}"><rect width="${W}" height="${W}" fill="#fff"/><path fill="#221f1c" d="${d}"/></svg></div>`;
}
// Spenden-QR mit Label in der Mitte – identisch mit dem Spenden-Fenster der Website
const index = fs.readFileSync('index.html', 'utf8');
const donateSvg = index.match(/<svg viewBox="0 0 45 45"[^>]*aria-label="QR-Code zum PayPal-Pool der Werkstatt"[\s\S]*?<\/svg>/)[0];
const donateQr = size => `<div class="qr" style="width:${size}mm;height:${size}mm">${donateSvg}</div>`;

const underline = `<svg viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path d="M3 11C52 3 150 3 197 8" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`;
const sign = (file, cap) => `<figure class="sign"><img src="../img/zeichen/${file}.jpg" alt=""><figcaption>${cap}</figcaption></figure>`;
const page = (title, cls, body) => `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>${title} | Poster A3 | Willis Werkstatt</title>
<!-- Erzeugt mit scripts/poster.js – nicht von Hand bearbeiten. Druck: A3 hochkant, Skalierung 100 %, ohne Ränder. -->
<link rel="stylesheet" href="poster.css">
</head>
<body>
<main class="page ${cls}">
${body}
</main>
<script src="../js/lucide-1.52.0.min.js"></script>
<script>
lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
// ?flat: ohne Bildschirmrand (Vorschaubilder); meldet Überlauf in data-overflow (mm)
if (location.search.includes('flat')) document.body.classList.add('flat');
document.fonts.ready.then(() => { const p = document.querySelector('.page'); document.body.dataset.overflow = Math.round((p.scrollHeight - p.clientHeight) / 3.7795); });
</script>
</body>
</html>
`;

// ======================= POSTER 1: NUTZUNGSKONZEPT =======================
const ul = (items, dot) => `<ul class="dots" style="--dot:${dot}">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
const key = (bg, accent, icon, label, big, items) => `
        <div class="key" style="background:${bg}">
            <div class="head"><span class="badge" style="background:${accent}"><i data-lucide="${icon}"></i></span><span class="label">${label}</span></div>
            <div class="big">${big}</div>
            ${ul(items, accent)}
        </div>`;
const pr = (icon, k, v) => `<div class="pr"><i data-lucide="${icon}"></i><div class="k">${k}</div><p>${v}</p></div>`;
const konzept = page('Nutzungskonzept', 'p-konzept', `
    <header>
        <div class="eyebrow">Willis Werkstatt</div>
        <h1>Nutzungs<span class="u">konzept${underline}</span></h1>
    </header>

    <section class="keys">
        ${key('var(--teal-50)', 'var(--teal)', 'key-round', 'Zugang', 'Ab 18 + Einweisung', [
            '<b>Kategorie Grün:</b> nach Grundeinweisung selbstständig.',
            '<b>Kategorie Blau:</b> zusätzliche Einweisung.',
            '<b>Gäste &amp; Minderjährige:</b> nur Grün, nur unter Aufsicht.'])}
        ${key('var(--amber-50)', 'var(--amber)', 'volume-2', 'Laute Arbeiten', '9–12 · 14–19 Uhr<small>bitte nicht an Sonn- und Feiertagen</small>', [
            'Rücksicht nehmen, <b>Tür zu</b>.',
            '<b>Keine Buchung</b> nötig.',
            'Große Projekte in den <b>Wandkalender</b>.'])}
        ${key('var(--red-50)', 'var(--red)', 'piggy-bank', 'Kosten', 'Kostenlos<small>für Bewohnis</small>', [
            '<b>Spenden</b> für Verschleiß &amp; Kleinteile erbeten.',
            'Nachbarn &amp; Freunde: <b>Spendenempfehlung</b>.',
            'Material &amp; Workshops: <b>vorher absprechen</b>.'])}
    </section>

    <h2 class="sec-title">Fünf Grundsätze</h2>
    <section class="principles">
        ${pr('scroll-text', 'Einverstanden', 'Wer hier werkelt, hält sich an dieses Konzept.')}
        ${pr('wrench', 'Werkzeugkunde', 'Nur Werkzeuge, deren <b>Gefahren &amp; Einsatz</b> du kennst.')}
        ${pr('users', 'Rücksicht', 'Auf <b>Menschen &amp; Inventar</b> achten.')}
        ${pr('sparkles', 'Ordnung', '<b>Sauber &amp; aufgeräumt</b> hinterlassen.')}
        ${pr('triangle-alert', 'Schäden', '<b>Sofort kennzeichnen</b> und mit den Werkstattwarten klären.')}
    </section>

    <div class="strip" style="background:var(--blue-50)">
        <i data-lucide="graduation-cap" style="color:var(--blue)"></i>
        <span><b>Minderjährige:</b> nur ausgewählte Grün-Geräte, immer mit eingewiesener erwachsener Begleitung und Zustimmung der Sorgeberechtigten – siehe Aushang.</span>
    </div>

    <footer class="foot" style="grid-template-columns: 1.2fr 1fr;">
        <div class="qr-card">
            ${qr(SITE + '#konzept', 42)}
            <div class="qr-text"><div class="label">Alles online</div><div class="t">werkstatt.<wbr>wogenau.haus</div><p>Konzept, Sicherheit, Notfall &amp; Betriebsanweisungen.</p></div>
        </div>
        <div class="qr-card" style="background:var(--teal-50)">
            ${donateQr(42)}
            <div class="qr-text"><div class="label">Spenden</div><div class="t">Hiergenau richtig!</div><p>Für Verschleiß &amp; Kleinteile – via PayPal-Pool.</p></div>
        </div>
    </footer>
    <div class="meta"><span>Willis Kollektiv e.V. · Stand 30.10.2026</span><span></span></div>
`);

// ======================= POSTER 2: SICHERHEIT =======================
const ruleCard = (signs, title, items) => `
        <div class="card">
            <div class="rc-head">${signs}<h2>${title}</h2></div>
            ${ul(items, 'var(--ink)')}
        </div>`;
const step = (n, bg, accent, signs, title, items) => `
        <div class="step" style="background:${bg}">
            <div class="rc-head"><span class="num" style="background:${accent}">${n}</span><h2>${title}</h2><span style="margin-left:auto">${signs}</span></div>
            ${ul(items, accent)}
        </div>`;
const sicherheit = page('Sicherheit', 'p-sicherheit', `
    <header>
        <div class="eyebrow">Willis Werkstatt</div>
        <h1>Sicher<span class="u">heit${underline}</span></h1>
        <p class="lead">Ausführlich online und <b>per QR-Code an jedem Gerät.</b></p>
    </header>

    <h2 class="sec-title">Werkstattregeln</h2>
    <section class="grid2">
        ${ruleCard(sign('warnung', 'Einweisung beachten'), 'Zugang', [
            'Selbstständig nur <b>Volljährige mit dokumentierter Einweisung</b> – und nur eingewiesene Werkzeuge.',
            '<b>Grün:</b> Grundeinweisung. <b>Blau:</b> persönliche Einweisung je Maschine – Schlüssel oder Code ≠ Berechtigung.',
            '<b>Gäste &amp; Minderjährige:</b> nur Grün, nur mit Aufsicht.'])}
        ${ruleCard(sign('wege-frei-halten', 'Wege frei halten'), 'Rücksicht', [
            'Unsicher? <b>Stopp – Werkstattwarte fragen.</b> Auf Gefahren hinweisen, <b>niemanden erschrecken</b>.',
            '<b>Ein Maschinenplatz</b> zur Zeit – Sauger läuft mit.',
            'Späne zeitnah absaugen, <b>Wege &amp; Tür frei</b>.'])}
        ${ruleCard(sign('augenschutz', 'Augenschutz') + sign('gehoerschutz', 'Bei Lärm'), 'Kleidung &amp; Schutz', [
            '<b>Feste Schuhe</b>, enge Kleidung, Haare zusammen, Schmuck ab.',
            '<b>Schutzbrille &amp; Gehörschutz</b> – auch für Umstehende.',
            '<b>Keine Handschuhe</b> an rotierenden Teilen.',
            '<b>Nie</b> unter Alkohol oder Drogen.'])}
        ${ruleCard(sign('keine-flammen', 'Keine Flammen'), 'Brandgefahr', [
            '<b>Nicht rauchen, kein offenes Feuer</b> – Staub, Funken und Dämpfe brennen.',
            '<b>Verboten:</b> Säuren, Laugen, Leinöl, Spiritus.',
            'Nur bekannte, geeignete Produkte.'])}
    </section>

    <div class="strip" style="background:var(--amber-50)"><i data-lucide="volume-2" style="color:var(--amber)"></i><span><b>Laute Arbeiten</b> nur 9–12 und 14–19 Uhr (bitte nicht an Sonn- und Feiertagen).</span></div>

    <h2 class="sec-title">Sicher arbeiten</h2>
    <section class="grid3">
        ${step(1, 'var(--teal-50)', 'var(--teal)', sign('warnung', 'Prüfen'), 'Vorher', [
            '<b>Betriebsanweisung</b> lesen – QR am Gerät.',
            'Gerät, Kabel/Akku, Werkzeug, Schutz <b>prüfen</b>.',
            'Einstellen <b>nur stromlos</b>.',
            'Werkstück spannen, <b>Absaugung an</b>, dann Probelauf.'])}
        ${step(2, 'var(--amber-50)', 'var(--amber)', sign('augenschutz', 'Schutz tragen'), 'Dabei', [
            '<b>Hände raus</b> aus der Gefahrenzone, Hilfsmittel nutzen.',
            'Klemmt, raucht, funkt es? <b>Sofort sicher aus.</b>',
            'Staub oder Saugerwarnung: <b>Stopp</b> – weiter nur mit Absaugung.'])}
        ${step(3, 'var(--red-50)', 'var(--red)', sign('strom-trennen', 'Strom trennen'), 'Danach', [
            '<b>Stillstand abwarten</b>, Stecker ziehen oder Akku raus.',
            '<b>Absaugen</b> – nicht kehren, nicht abblasen.',
            '<b>Mängel melden</b> und kennzeichnen.',
            'Blaue Geräte &amp; Schlüssel wieder sichern, <b>Laden beenden</b>.',
            'Zuletzt: <b>Strom, Licht, Tür</b>.'])}
    </section>

    <footer class="foot" style="grid-template-columns: 1.6fr 1fr;">
        <div class="sos">
            <i data-lucide="siren"></i>
            <div class="sos-text">
                <div class="sos-num">112</div>
                <p><b>Unfall oder Brand:</b> Eigenschutz, andere warnen, 112 rufen. Bei Brand Tür schließen, nicht abschließen.</p>
                <p class="addr">Wilhelm-Reitzmayr-Straße 1, 86157 Augsburg · EG am Quartiersplatz</p>
            </div>
            ${qr(SITE + '#notfall', 30)}
        </div>
        <div class="qr-card">
            ${qr(SITE + '#sicherheit', 34)}
            <div class="qr-text"><div class="label">Alles online</div><div class="t">werkstatt.<wbr>wogenau.haus</div><p>Regeln &amp; Betriebs&shy;anweisungen.</p></div>
        </div>
    </footer>
    <div class="meta"><span>Willis Kollektiv e.V. · Stand 30.10.2026</span><span></span></div>
`);

fs.writeFileSync('poster/nutzungskonzept.html', konzept);
fs.writeFileSync('poster/sicherheit.html', sicherheit);
console.log('poster/nutzungskonzept.html, poster/sicherheit.html');
