# Aegis

Aegis is a mobile-first safety companion application built with Next.js and React. It is designed to help users stay informed, navigate safely, and respond quickly during uncertain or high-risk situations. The interface combines real-time location awareness, safety insights, route recommendations, emergency assistance, and community reporting into a single experience.

## Overview

Aegis brings together several core safety workflows in one app:

- Real-time GPS-based status and location display
- Live safety index and route recommendations
- Emergency SOS access
- Hazard and incident reporting
- AI-style companion interaction for support and guidance
- Safety maps, routes, analytics, and profile management

The project is currently structured as a polished front-end prototype with a strong focus on user experience, visual feedback, and interactive mobile navigation.

## Key Features

### Dashboard Experience
- Welcome screen with live user location and safety status
- Interactive safety index card with breakdown information
- Safe route suggestions and live navigation controls
- Quick action buttons for reporting hazards, viewing the map, and accessing the assistant

### Safety Tools
- Emergency SOS workflow
- Hazard reporting screen
- Route planning and journey tracking
- Community and analytics views
- Settings and profile management

### User Interface
- Responsive mobile-first layout
- Glassmorphism-inspired cards and animations
- Bottom navigation and mobile header for app-like behavior
- Leaflet-based mapping integration

## Tech Stack

- Next.js 16
- React 19
- JavaScript
- CSS Modules
- Leaflet and react-leaflet for map functionality
- Tailwind CSS
- Lucide React for icons

## Project Structure

```text
src/
  app/
    admin/          # Admin experience screens
    analytics/      # Safety analytics views
    assistant/      # AI-assistant experience
    community/      # Community safety features
    emergency/      # Emergency workflow
    journey/        # Journey and walk tracking
    login/          # Authentication screens
    map/            # Map experience
    places/         # Places and local area views
    profile/        # Profile and account settings
    report/         # Hazard reporting flow
    routes/         # Route planning views
    settings/       # App settings
  components/       # Reusable UI shell and navigation components
  hooks/            # Custom hooks such as location tracking
```

## Prerequisites

Make sure you have the following installed:

- Node.js 18 or newer (20+ recommended)
- npm

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd Agex
npm install
```

## Running the Development Server

Start the app locally:

```bash
npm run dev
```

Open your browser at:

```text
http://localhost:3000
```

## Build for Production

To create a production build:

```bash
npm run build
```

To start the production build locally:

```bash
npm run start
```

## Linting

Run lint checks with:

```bash
npm run lint
```

## Deployment Notes

This project is ready to be deployed to platforms that support Next.js applications such as Vercel, Netlify, or a Node.js hosting environment. For production deployments, you should connect real backend services for authentication, data persistence, and live safety feeds.

## Contributing

Contributions are welcome. If you would like to improve the experience, add new safety features, or integrate real APIs, feel free to open an issue or submit a pull request.
