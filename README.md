# Petualangan Ajisaka 👑

Petualangan Ajisaka is a **Gamified Progressive Web App (PWA)** designed to teach **Aksara Jawa** (Javanese Script) through an engaging, interactive adventure.

Built with an offline-first architecture, this app leverages a custom **Vector Geometry Stroke Engine** and a **Web Audio Physical Modeling Gamelan Synthesizer** to create a deeply authentic, tactile learning experience right in your browser—without needing a constant internet connection.

## ✨ Features

- ✍️ **Vector Geometry Stroke Recognition**: Rather than rigid pixel matching, the app uses dynamic Chamfer Distance geometry to accurately evaluate drawing strokes on the canvas, even across different screen sizes.
- 🎵 **Procedural Gamelan Audio Engine**: No bloated MP3 samples! The app synthesizes authentic Javanese Gamelan instruments (Saron, Gong, Keprak) in real-time using Web Audio physical modeling, including transients and *Ombak* (acoustic beating).
- 🌍 **Full Localization (i18n)**: Play in Indonesian, English, or Javanese (Krama Inggil). 
- 🕹️ **Gamified Progression**: Unlock levels, gather companions, and earn mythical items (like the Sacred Sword and Magic Shield) as you master the script.
- 📱 **Offline-First PWA**: Install it on your phone or tablet and play it entirely offline. Progress is securely persisted locally using Zustand.
- 🆓 **Free Type Mode**: An experimental playground where users can freely type Javanese script using a custom virtual keyboard, complete with real-time Latin transliteration.

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS v4, OKLCH Color Tokens
- **State Management**: Zustand (with Persist)
- **Routing**: React Router (HashRouter for optimal PWA caching)
- **Audio**: Native Web Audio API (Additive/Physical Modeling Synthesis)
- **PWA**: Vite PWA Plugin, Workbox (Service Worker precaching)
- **i18n**: i18next, react-i18next

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1999AZZAR/ajisaka.git
   cd ajisaka
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   *Note: For testing touch interactions and PWA features locally on a mobile device, you can use `npm run dev -- --host`.*

4. **Build for production**
   ```bash
   npm run build
   ```

## 🗺️ Project Structure

- `src/engine/` - Core logic for stroke recognition (`raster.ts`, `geometry.ts`) and audio synthesis (`audio.ts`).
- `src/state/` - Zustand global state for tracking unlocked levels, phases, and rewards.
- `src/ui/` - React components, screens, and UI elements.
- `src/data/` - Level configurations and Javanese character datasets (SVG paths).
- `docs/` - Original design documents, naskah (scripts), and TODO lists.

## 📜 Storyline
Follow the legend of **Ajisaka** as you travel from Sanjaya Island to the Nusantara Kingdom. Master the *Nglegena* (basic letters), learn the *Sandangan* (vowel modifications), and conquer the final challenge using *Pasangan* (consonant pairs) to defeat the Green Giants and claim the throne!

## 📄 License
Private Repository. Copyright © 2026 Azzar. All Rights Reserved.
