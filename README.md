<p align="center">
  <img src="./logo.svg" width="250" />
</p>

# Fullstack Webentwicklung einer ToDo-Liste als Webapplikation

Eine moderne, vollständige Fullstack-Webapplikation zur Verwaltung persönlicher Aufgaben. Das System umfasst Benutzerkonten, Deadlines, Kategorien, Filter- und Sortierfunktionen, Pagination, sowie Light- und Dark-Mode. Alle Daten werden benutzerspezifisch gespeichert und sind jederzeit online abrufbar und bietet eine klare, responsive Oberfläche.

## Funktionen

### Benutzerverwaltung

* Registrierung und Login über `JWT`-Authentifizierung
* Sicheres Passwort-Hashing mit `bcrypt`
* Benutzername wird bei Registrierung vergeben und im UI angezeigt
* Jeder Benutzer sieht ausschließlich seine eigenen Aufgabe
* Authentifizierung wird clientseitig persistent und in `localStorage` gespeichert

### ToDo-Management (CRUD)

* Aufgaben erstellen, anzeigen, bearbeiten und löschen
* Inline-Bearbeitung von:
  - Text
  - Deadline
  - Kategorie
* Speichern per Button oder `Enter`, Abbrechen per `Esc`
* Pflicht-Deadline (Standard = aktuelles Datum)
* Deadlines können nicht in der Vergangenheit liegen
* Kategorien frei wählbar oder vordefiniert

### Filtern, Sortieren und Kategorien

* Filteroptionen:
  - Offen
  - Heute
  - Diese Woche
  - Erledigt
  - Alle

* Sortieroptionen:
  - Erstellungsdatum (↑/↓)
  - Deadline (früh oder spät)
  - Status
  - Text (A–Z oder Z–A)
  - Kategorie (A–Z)

* Kategorie-Filter:
  - Dynamische Liste aller vorhandenen Kategorien
  - Auch benutzerdefinierte Kategorien werden erkannt
  - Jede Kategorie mit eigener Farb-Badge (automatisch generiert)

### Pagination und UX

* Maximal 8 Aufgaben pro Seite
* Navigation über `Weiter` und `Zurück`
* Keine endlosen Scroll-Listen
* Erledigte Aufgaben werden visuell abgedunkelt
*	Modernes, schlankes und responsives UI mit Tailwind CSS

### Dark Mode

* Umschaltbar zwischen Light und Dark Mode
* Einstellung wird dauerhaft in `localStorage` gespeichert
*	Dark Mode gilt auch auf der Login- und Registrierungsseite
* Optimierte Farben, Kontraste und Schatten


## Technologiestack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* JWT

### Backend

*	Node.js + Express
* MongoDB + Mongoose
*	JWT-Authentifizierung
*	bcryptjs (Password Hashing)
*	dotenv
*	cors

### Datenbank

* MongoDB Atlas
*	Mongoose ODM
  - `User`: Benutzername, E-Mail, Passwort (gehasht)
  - `Todo`: Text, Status, Kategorie, Deadline, User-Referenz)


## Architekturübersicht

Die Anwendung folgt einer klassischen und vollständige Fullstack Client-Server-Architektur.

```text
┌─────────────────────────┐
│     Frontend (React)    │
│  - Single Page App      │
│  - Auth per JWT         │
└────────────┬────────────┘
             │ HTTPS / JSON
             ▼
┌─────────────────────────┐
│ Backend (Node + Express)│
│ - REST API              │
│ - Auth & Business Logic │
└────────────┬────────────┘
             │ Mongoose
             ▼
┌─────────────────────────┐
│   MongoDB Atlas Cluster │
│ - persistent storage    │
└─────────────────────────┘

```

* Presentation Layer (React SPA)
* Application Layer (Express Controller und Middleware)
* Data Layer (Mongoose Modelle und Datenbankzugriff)


## Projektstruktur

```text
.
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
\   └── postcss.config.js
```

## Nutzung

Die Webapplikation ist unter dem nachfolgenden Link abrufbar:

```
https://todo-liste-webapp.netlify.app/
```

### Hinweis

Der Ladevorgang benötigt beim Starten der Webapplikation etwas Zeit.
