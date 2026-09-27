# ✈ Flight Tracking & Operations Dashboard

A responsive Flight Tracking & Operations Dashboard built with Angular and Leaflet Maps for monitoring flight activity, routes, and operational status.

The dashboard provides an aviation operations-style interface with an interactive map, flight details, KPI cards, search and filters, flight list, and dark mode.

---

## 📌 Project Overview

This project was developed as a Flight Tracking & Operations Dashboard using Angular.

The main goal is to provide a simple and professional interface for operations teams to:

- Monitor flights on an interactive map
- View flight routes
- Check flight status
- Search flights by callsign
- Filter flights by status and airports
- View detailed flight information
- Monitor operational KPIs
- Switch between light and dark modes

The application uses mock flight data stored in a local JSON file. No backend API or external flight-tracking service is required.

---

## 🚀 Features

### 1. Interactive Flight Map

The dashboard includes an interactive Leaflet map.

Features:

- Displays 20 mock flights
- Shows each flight as a map marker
- Flight marker popup displays:
  - Flight Number
  - Callsign
  - Origin
  - Destination
  - Status
- Users can click a flight marker to select a flight
- Selected flight is displayed in the flight details panel

---

### 2. Flight Route Visualization

When a flight is selected:

- The flight route is displayed on the map
- A route line is drawn from:
  - Origin
  - Current flight position
  - Destination
- The map automatically centers and zooms to the selected flight route
- The selected flight is highlighted in the flight list

---

### 3. Flight Details Panel

The flight details panel displays information for the selected flight.

Information includes:

- Flight Number
- Callsign
- Aircraft Type
- Origin Airport
- Destination Airport
- Current Status
- Estimated Departure Time
- Estimated Arrival Time

If no flight is selected, the panel displays a simple empty state asking the user to select a flight.

---

### 4. Operations Dashboard KPIs

The dashboard displays four KPI cards:

- **Total Flights**
- **Active Flights**
- **Delayed Flights**
- **Arrived Flights**

The KPI values are calculated dynamically from the flight data.

---

### 5. Search & Filters

Users can search and filter flights using Reactive Forms.

Available filters:

- Search by Callsign
- Filter by Status
- Filter by Origin Airport
- Filter by Destination Airport
- Reset Filters

The flight map and flight list update based on the selected filters.

---

### 6. Flight List

A flight table is displayed below the map.

The table contains:

- Flight Number
- Callsign
- Aircraft Type
- Origin
- Destination
- Status

Users can select a flight directly from the table.

Selecting a flight updates:

- Map
- Route
- Flight Details Panel
- Selected row

---

### 7. Dark Mode

A light/dark theme toggle is included in the dashboard header.

Users can switch between:

- Light Mode
- Dark Mode

The dashboard layout, cards, filters, map section, details panel, and flight list are styled to work with both themes.

---

### 8. Responsive Design

The dashboard is designed to work across different screen sizes.

Supported layouts include:

- Desktop
- Tablet
- Mobile

On smaller screens:

- KPI cards stack
- Filters become responsive
- Map remains the primary section
- Flight details move below the map
- Flight list remains accessible with horizontal scrolling

---

## 🛠 Technologies Used

- Angular 20
- TypeScript
- HTML5
- CSS3
- Leaflet
- RxJS
- Reactive Forms
- Angular Router
- HttpClient
- JSON

---

## 📁 Project Structure

```text
flight-tracking-dashboard/
│
├── public/
│   ├── flights.json
│   └── favicon.svg
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.ts
│   │   │   │   ├── dashboard.html
│   │   │   │   └── dashboard.css
│   │   │   │
│   │   │   ├── flight-details/
│   │   │   │   ├── flight-details.ts
│   │   │   │   ├── flight-details.html
│   │   │   │   └── flight-details.css
│   │   │   │
│   │   │   ├── flight-list/
│   │   │   │   ├── flight-list.ts
│   │   │   │   ├── flight-list.html
│   │   │   │   └── flight-list.css
│   │   │   │
│   │   │   └── flight-map/
│   │   │       ├── flight-map.ts
│   │   │       ├── flight-map.html
│   │   │       └── flight-map.css
│   │   │
│   │   ├── models/
│   │   │   └── flight.ts
│   │   │
│   │   ├── services/
│   │   │   └── flight.ts
│   │   │
│   │   ├── app.config.ts
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   └── app.css
│   │
│   ├── index.html
│   └── styles.css
│
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.spec.json