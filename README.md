# Petualangan Ajisaka 👑

![Ajisaka Blotcat Illustration](public/assets/ajisaka-blotcat.jpg)

Petualangan Ajisaka is an offline-first Progressive Web App (PWA) built to teach Aksara Jawa (Javanese script). It structures the learning process as a journey across three islands, moving from basic letters to complex consonant pairings.

Instead of relying on simple multiple-choice questions or pixel-perfect canvas matching, we built a custom stroke evaluation engine and an additive synthesizer for audio feedback. The app runs entirely in the browser and requires no internet connection after the initial load.

## Architecture & Mechanics

- **Vector Geometry Stroke Recognition**: The drawing canvas captures user inputs as coordinate paths, normalizes them, and evaluates them against reference contours using a Chamfer Distance algorithm. This prevents players from cheating by scribbling over the entire canvas and ensures the evaluation scales correctly across any screen resolution.
- **Physical Modeling Gamelan Audio**: The app synthesizes its own sound effects using the native Web Audio API. When a player completes a stroke, it triggers a modeled Gamelan strike complete with a mallet exciter, dynamically damped low-pass filters, and the characteristic *Ombak* (acoustic beating) of resonating bronze.
- **Granular State Tracking**: Game progress is tracked and persisted locally via Zustand. Players can leave the app mid-level and return without losing their unlocked phases, islands, or items.
- **Three-Way Localization**: The UI, story, and drawing hints are fully translated into Indonesian, English, and Javanese Krama Inggil.
- **Free Type Mode**: A dedicated sandbox where users can test out the virtual keyboard and see their Javanese characters transliterated into Latin text in real time.

## Technical Details

The codebase is structured around React 18 and Vite.

- **Frontend Framework**: React 18 (TypeScript)
- **Styling**: Tailwind CSS v4, built on an OKLCH color token system for theme consistency.
- **State**: Zustand with localStorage persistence.
- **Routing**: React Router using HashRouter to ensure stable offline navigation without server-side rewrite rules.
- **Offline Capabilities**: Workbox precaches the HTML bundle, custom Javanese font (WOFF2), and minimal assets. 

## Running the App

You need Node.js (v18 or newer) to run the development server.

1. Clone the repository:
   ```bash
   git clone https://github.com/1999AZZAR/ajisaka.git
   cd ajisaka
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

To test the touch interactions on a mobile device on your local network, start the server with `npm run dev -- --host` and navigate to the provided local IP address on your phone.

### Using Docker

If you prefer using Docker, you can build and run the production image using the included multi-stage Dockerfile:

1. Build the image:
   ```bash
   docker build -t ajisaka .
   ```
2. Run the container:
   ```bash
   docker run -p 8080:80 ajisaka
   ```
The app will be available at `http://localhost:8080`.

## Repository Layout

- `src/engine/` - Mathematical logic for the canvas stroke geometry (`raster.ts`, `geometry.ts`) and the physical modeling audio synthesizer (`audio.ts`).
- `src/state/` - Zustand stores for tracking progress and user configuration.
- `src/ui/` - React views, UI components, and the virtual keyboard.
- `src/data/` - Static configurations for the three levels and the JSON definitions for the Javanese script SVG contours.
- `docs/` - Planning documents, scripts, and task tracking.

## License
Private Repository. Copyright © 2026 Azzar. All Rights Reserved.
