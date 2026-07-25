<div align="center">

```text
   _              _           _   ___ 
  /_\  ___  __ _ (_)___      /_\ |_ _|
 / _ \/ _ \/ _` || / __|    / _ \ | | 
/ / \ \  __/ (_| || \__ \  / / \ \| | 
\/   \/\___|\__, ||_|___/  \/   \/___|
            |___/                     
```

# 🛡️ AegisAI — AI Personal Safety & Safe Corridor Navigator
### *Next-Generation Real-Time GPS Tracking, Emergency SOS Panic Broadcasting, Safe Corridor Routing & Community Safety Platform*

  <p align="center">
    <a href="#-overview">Overview</a> •
    <a href="#-key-highlights--core-capabilities">Key Features</a> •
    <a href="#-system-architecture">Architecture</a> •
    <a href="#-technology-stack">Tech Stack</a> •
    <a href="#-project-structure">Folder Structure</a> •
    <a href="#-quick-start-guide">Quick Start</a>
  </p>

  <br />

  [![Next.js](https://img.shields.io/badge/Next.js-16.2.11-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
  [![OSRM](https://img.shields.io/badge/Routing-OSRM_API-6366F1?style=for-the-badge&logo=openstreetmap&logoColor=white)](https://project-osrm.org/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

  <br />
  <hr />

</div>

<br />

## 🌟 Overview

**AegisAI (Agex)** is an empathetic, AI-powered personal safety and safe corridor navigation platform designed to empower individuals with real-time situational awareness, intelligent safe routing, continuous GPS telemetry, emergency SOS broadcasting, and community hazard tracking.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Leaflet**, and integrated with **OpenStreetMap Nominatim** and **OSRM (Open Source Routing Machine)**, AegisAI dynamically analyzes local CCTV coverage, streetlight density, active incident reports, and real-time GPS telemetry to compute safe walking, biking, and driving corridors.

<br />

---

## ⚡ Key Highlights & Core Capabilities

### 🚨 Emergency SOS & Live Panic Mode
- **Concentrated Pulse Ring SOS**: Instant single-tap emergency SOS activation with pulsating visual countdown beacon.
- **Continuous Live GPS Telemetry**: Real-time geolocation coordinates broadcasting to primary emergency guardians.
- **Emergency Action Suite**: Built-in triggers for high-decibel siren alarms, strobe light beacons, fake incoming calls, and evidence recording.
- **Direct 911 Dispatch Line**: Quick-action emergency dispatch call integration.

---

### 🗺️ Safe Corridor Route Planner & OSRM Guidance
- **Multi-Modal Navigation**: Calculate real-world safe paths for **walking**, **biking**, and **driving**.
- **Live OSRM Geometry**: Computes real-time road geometry via Open Source Routing Machine public API.
- **Turn-by-Turn Navigation**: Step-by-step direction guidance computed from real-world street intersections.
- **Risk Score Assessment**: Dynamic safety scoring (`Safest AI Corridor` vs `Fastest Corridor`) based on lighting, police patrol density, and active incidents.

---

### 📍 Interactive Safety Map & Live Heatmap
- **CartoDB Dark Matter Mapping**: High-contrast, dark-mode maps powered by Leaflet and CartoDB Dark Matter tiles.
- **Dynamic Real-Time Markers**: Visual map indicators for local police precincts, verified community safe havens, and active hazard warnings.
- **Live Search Autocomplete**: Integrated location search powered by OpenStreetMap Nominatim Geocoding API.
- **Heatmap Layer Toggle**: Interactive radius heatmaps highlighting risk density and high-safety zones.

---

### 🤖 Aegis AI Safety Companion
- **Interactive Chat Assistant**: Conversational AI safety assistant providing real-time local safety recommendations, night walk guidance, and nearby precinct locations.
- **Quick Safety Chips**: One-tap quick prompts (`Nearest safe place`, `Share location`, `Night walk tips`, `Check area status`).
- **Simulated Voice Input**: Interactive microphone toggle with pulsating audio indicators.

---

### 📢 Community Incident Feed & Threat Matrix
- **Crowdsourced Safety Reports**: Community feed for reporting suspicious activity, broken streetlights, sidewalk obstructions, and unsafe corridors.
- **Severity Tagging**: Categorized risk matrix (`Low`, `Medium`, `High`) with custom color badges.
- **Upvoting & Verification System**: Community upvotes and comments to validate local safety warnings.

---

### 🛡️ Verified Safe Places Directory
- **Safe Haven Directory**: Vetted listing of 24/7 hospitals, police precincts, open cafes, fire stations, and public libraries.
- **Distance & Safety Score**: Instant mileage calculations and verified safety index scores.

---

### 📊 Telemetry & Analytics Dashboard
- **Weekly Index Trends**: Visual bar charts and metric gauges for regional safety progression.
- **Weekly Incident Heatmap**: Time-slot matrix (`Morning`, `Afternoon`, `Evening`, `Night`) tracking hazard probability across 7 days.
- **PDF Report Export**: One-tap telemetry report download simulator.

<br />

---

## 🏗️ System Architecture

```
                               ┌────────────────────────────────────────┐
                               │         Root Layout (layout.js)        │
                               │   Global CSS & Google Font Preloader   │
                               └───────────────────┬────────────────────┘
                                                   │
                                    AppShell Wrapper Composition
                                                   │
                               ┌───────────────────▼────────────────────┐
                               │         Page Component (src/app/*)     │
                               │      Next.js 16 App Router SPA         │
                               └──────┬────────────┬────────────┬───────┘
                                      │            │            │
                    ┌─────────────────┴──┐   ┌─────┴──────┐   ┌─┴────────────────┐
                    │ HTML5 Geolocation  │   │ LiveMap /  │   │ OSRM & Nominatim │
                    │ (useRealtimeLoc)   │   │ LeafletInner│   │ External APIs    │
                    └────────────────────┘   └────────────┘   └──────────────────┘
```

<br />

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16.2](https://nextjs.org/) | App Router, Client Components, Turbopack |
| **UI Library** | [React 19](https://react.dev/) | Client Rendering, Custom Hooks, State Management |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS Modules | Glassmorphism UI, Dark Mode & Scoped Styling |
| **Mapping Library** | [Leaflet](https://leafletjs.com/) + [React-Leaflet](https://react-leaflet.js.org/) | Interactive Maps, Custom DivIcons, Heatmaps |
| **Map Tiles** | [CartoDB Dark Matter](https://carto.com/) | Ultra-Sleek Dark Theme Map Tiles |
| **Geocoding API** | [OpenStreetMap Nominatim](https://nominatim.org/) | Real-time Location Search & Autocomplete |
| **Routing Engine** | [OSRM Routing API](https://project-osrm.org/) | Real-world Turn-by-Turn Route Geometry |
| **Icons** | [Lucide React](https://lucide.dev/) + Google Material Symbols | Vector Icons & Rounded Symbols |

<br />

---

## 📂 Project Structure

```
Agex/
├── public/                 # Static assets (favicon, icons)
├── src/
│   ├── app/                # App Router Page Routes
│   │   ├── admin/          # Admin Control Panel & Emergency Broadcast
│   │   ├── analytics/      # Safety Telemetry & Weekly Heatmap Matrix
│   │   ├── assistant/      # Aegis AI Safety Assistant Chat UI
│   │   ├── community/      # Community Safety Feed & Upvote System
│   │   ├── emergency/      # Emergency SOS Panic Mode & Broadcasting
│   │   ├── journey/        # Safe Walk Journey Tracker & Guardian Check-ins
│   │   ├── login/          # Authentication Portal (Sign In / Sign Up)
│   │   ├── map/            # Interactive Map, Heatmap & Place Finder
│   │   ├── places/         # Verified Safe Place Directory
│   │   ├── profile/        # User Profile, Guardians & Preferences
│   │   ├── report/         # Incident Reporting Form
│   │   ├── routes/         # Safe Route Planner & OSRM Turn-by-Turn Guidance
│   │   ├── settings/       # System Settings & Theme Controls
│   │   ├── globals.css     # Global Styles, CSS Variables & Tailwind Imports
│   │   └── layout.js       # Root Layout & Font Definitions
│   ├── components/         # Reusable React UI Components
│   │   ├── AppShell.js     # Top Layout Wrapper (Sidebar / Mobile Nav / Header)
│   │   ├── BottomNav.js    # Mobile Bottom Navigation Bar
│   │   ├── LeafletMapInner.js # Client-Side Leaflet Map Core
│   │   ├── LiveMap.js      # Dynamic SSR-Disabled Leaflet Loader
│   │   ├── MobileHeader.js # Responsive Top Header
│   │   └── Sidebar.js      # Desktop Glassmorphic Sidebar
│   ├── hooks/              # Custom React Hooks
│   │   └── useRealtimeLocation.js # HTML5 Geolocation API Hook
│   └── lib/                # Shared Application Constants & Configurations
│       └── constants.js    # Default Coordinates, User Profiles & Nav Lists
├── package.json            # Dependencies & Build Scripts
└── jsconfig.json           # Path Alias Mapping (@/* -> ./src/*)
```

<br />

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- [npm](https://www.npmjs.com/) v9.0.0 or higher

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/karmaboy1309/Agex.git
cd Agex
```

---

### 2️⃣ Install Dependencies
```bash
npm install
```

---

### 3️⃣ Start Development Server
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to launch AegisAI!

---

### 4️⃣ Build for Production
```bash
npm run build
npm run start
```

<br />

---

## 🔒 Security & Privacy Features

- 🛡️ **Client-Side Geolocation Encryption**: Real-time coordinates are processed locally and securely transmitted.
- 👤 **Anonymous Reporting**: Option to submit incident reports anonymously to protect user identity.
- 📍 **GPS Fallback Protection**: Graceful fallback to default coordinates when geolocation access is restricted.

<br />

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Crafted with ❤️ for modern personal safety by **[karmaboy1309](https://github.com/karmaboy1309)**

★ **Star this repo if you find AegisAI helpful!** ★

</div>
