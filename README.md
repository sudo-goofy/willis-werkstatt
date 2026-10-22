# Willis Werkstatt – Digitales Büro

Das digitale Büro der Werkstatt: eine kleine Web-App, die alles Wichtige rund um die
gemeinschaftliche Werkstatt an einem Ort bündelt – Regeln, Sicherheit, Geräte und der
Ablauf vor Ort. Motto: **Safety First.**

**Live:** <https://sudo-goofy.github.io/willis-werkstatt/>

## Was drin ist

- **Intro** – Begrüßung und die wichtigsten Sicherheitsregeln auf einen Blick.
- **Konzept** – Wie die Werkstatt funktioniert (offen für alle Bewohnis, ohne Termin,
  Finanzierung über die Spendenbox).
- **Check-In** – Kurze Checkliste, bevor es losgeht (Werkstatt aufgeräumt, Schutz an etc.).
- **Maschinen** – Inventar der Geräte samt Bedien- und Sicherheitsregeln.
- **Notfall** – Notrufnummer 112 und die UVV-Dokumente für den Ernstfall.

## Aufbau

```text
werkstatt/
├── index.html              # Die App (eine einzelne HTML-Datei)
├── css/site.css            # Tailwind, lokal gebaut (nicht von Hand bearbeiten)
├── css/tailwind.src.css    # Eingabe für den Build (inkl. @font-face)
├── tailwind.config.js      # Farben + Build-Konfiguration
├── fonts/                  # Fira Code + Kirang Haerang (SIL OFL)
├── js/                     # Lucide Icons, fest auf eine Version
├── img/zeichen/            # Sicherheitszeichen aus den Aushängen
├── uvv/                     # UVV-Handbuch (Unfallverhütungsvorschriften)
└── README.md
```

Aus Datenschutzgründen lädt die Seite **nichts von fremden Servern** (keine Google Fonts,
kein CDN). Nach Änderungen an Tailwind-Klassen in `index.html` das CSS neu bauen:

```bash
npx tailwindcss@3.4.19 -i css/tailwind.src.css -o css/site.css --minify
```

## Starten

Online: <https://werkstatt.wogenau.haus/> (gehostet über GitHub Pages, Branch `main`).

Lokal: einfach `index.html` im Browser öffnen.
