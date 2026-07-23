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

```
werkstatt/
├── web/index.html          # Die App (eine einzelne HTML-Datei)
├── Werkstattkonzept.pdf     # Ausführliches Werkstattkonzept
├── uvv/                     # UVV-Handbuch (Unfallverhütungsvorschriften)
└── README.md
```

Die App ist eine eigenständige `index.html` ohne Build-Schritt. Sie nutzt Tailwind CSS
und Lucide Icons direkt über CDN.

## Starten

Online: <https://sudo-goofy.github.io/willis-werkstatt/> (gehostet über GitHub Pages,
Branch `main`).

Lokal: einfach `web/index.html` im Browser öffnen. Für eine lokale Adresse alternativ:
