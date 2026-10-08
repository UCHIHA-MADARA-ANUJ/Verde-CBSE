# 🌿 Project Verde — Technical System Compendium

> **Chlorophyll meets silicon.** An autonomous, cloud-integrated regenerative ecosystem for high-tech vertical farming — documented through an immersive, interactive web experience.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-0.162-000000?logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel)

---

## 📖 Overview

**Project Verde** is not just a portfolio — it's a living technical document that showcases an autonomous vertical farming system built from scratch. The website itself is an engineering artifact: interactive 3D scenes, real-time animations, a retro-futuristic terminal aesthetic, and deep technical breakdowns of every subsystem.

### The System

Project Verde is a closed-loop, sensor-driven vertical farming ecosystem featuring:

- **ESP8266 microcontroller** with custom firmware (1,200+ lines of C++)
- **Firebase Realtime Database** for cloud synchronization
- **TensorFlow Lite** plant disease detection model
- **Twilio WhatsApp Bot** with Hindi + English support
- **OpenWeatherMap API** for predictive irrigation
- **Custom PCB** designed in KiCad with LM2596 BUCK power delivery
- **Sensor array**: DHT22, soil moisture, HC-SR04 ultrasonic, NPK RS485, rain sensor, OV2640 camera

### The Website

This Next.js application documents the entire system with:

- 🎮 **3D Scene** — Interactive Three.js background with performance-adaptive rendering
- ⚡ **Boot Sequence** — Retro terminal boot animation on first load
- 🧬 **DNA Helix** — Animated biological-technical transition element
- 🌱 **Plant Growth Animation** — Scroll-driven growth visualization
- 🔌 **Living Circuit Board** — Hover-interactive hardware architecture diagram
- 📊 **Real-time Dashboard** — Live sensor telemetry display
- 🕸️ **Data Packet Flow** — Animated sensor → cloud data pipeline
- 📱 **Responsive Design** — Fully responsive with mobile optimizations
- ♿ **Accessibility** — Keyboard navigation, skip links, reduced motion support
- 🎭 **Performance Tiers** — Adaptive rendering for low/medium/high-end devices

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.3 |
| **Styling** | Tailwind CSS 3.4 |
| **Animation** | Framer Motion 11 |
| **3D Graphics** | Three.js + React Three Fiber + Drei |
| **Scroll** | Lenis smooth scroll |
| **Icons** | Lucide React |
| **Fonts** | Space Grotesk + JetBrains Mono |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
verde-portfolio/
├── app/
│   ├── api/                    # API routes
│   │   ├── contact/            # Contact form handler
│   │   ├── health/             # Health check endpoint
│   │   ├── stats/              # Project statistics
│   │   ├── telemetry/          # Sensor telemetry
│   │   └── weather/            # Weather data proxy
│   ├── components/             # Reusable UI components
│   │   ├── CustomCursor.tsx    # Circuit-themed cursor
│   │   ├── DataPacketFlow.tsx  # Animated data pipeline
│   │   ├── DNAHelix.tsx        # DNA transition element
│   │   ├── EasterEggs.tsx      # Hidden interactions
│   │   ├── GlitchText.tsx      # Glitch text effect
│   │   ├── GridBackground.tsx  # Terminal grid overlay
│   │   ├── LivingCircuitBoard.tsx  # Interactive circuit diagram
│   │   ├── MagneticButton.tsx  # Magnetic hover effect
│   │   ├── NavBar.tsx          # Navigation bar
│   │   ├── ParticleCanvas.tsx  # Particle system
│   │   ├── Scene3D.tsx         # Three.js 3D scene
│   │   ├── ScrollProgressRing.tsx  # Scroll indicator
│   │   ├── Terminal.tsx        # Terminal UI component
│   │   ├── TextScramble.tsx    # Text scramble animation
│   │   ├── ThemeToggle.tsx     # Light/dark mode toggle
│   │   └── TiltCard.tsx        # 3D tilt card effect
│   ├── hooks/                  # Custom React hooks
│   │   ├── useKeyboardNavigation.ts
│   │   ├── useMagneticEffect.ts
│   │   ├── usePerformanceTier.ts
│   │   ├── useReducedMotion.ts
│   │   └── useScrollProgress.ts
│   ├── sections/               # Page sections
│   │   ├── Hero.tsx            # Landing hero section
│   │   ├── About.tsx           # Project architecture
│   │   ├── Dashboard.tsx       # Live sensor dashboard
│   │   ├── Hardware.tsx        # Hardware breakdown
│   │   ├── Intelligence.tsx    # AI/ML capabilities
│   │   ├── Code.tsx            # Firmware code showcase
│   │   ├── Team.tsx            # Team members
│   │   ├── Contact.tsx         # Contact section
│   │   ├── Footer.tsx          # Footer
│   │   └── ...                 # Additional sections
│   ├── globals.css             # Global styles & animations
│   ├── layout.tsx              # Root layout with metadata
│   └── page.tsx                # Main page orchestrator
├── public/                     # Static assets
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind theme configuration
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## 🏗️ Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm**, **pnpm**, or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/UCHIHA-MADARA-ANUJ/verde-main-portfolio.git
cd verde-main-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (with clean build) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🎨 Key Features

### Performance-Adaptive Rendering
The site detects device capabilities and adjusts rendering quality automatically:
- **High**: Full 3D scenes, particles, all animations
- **Medium**: Reduced particles, simplified 3D
- **Low**: No 3D, no particles, minimal animations

### Retro-Futuristic Terminal Aesthetic
- Scanline overlay effect
- CRT noise texture
- Glitch text animations
- Green-on-black neon theme with cyan/purple accents

### Interactive Elements
- **Magnetic buttons** that respond to cursor proximity
- **Tilt cards** with 3D perspective transforms
- **Text scramble** effects on hover
- **Ripple effects** on click
- **Custom cursor** with circuit trail

### Easter Eggs
Try these keyboard combinations for hidden features:
- `↑↑↓↓←→←→BA` — The Konami Code
- `verde` — Type it anywhere

---

## 🌐 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/stats` | GET | Project statistics |
| `/api/telemetry` | GET | Sensor telemetry data |
| `/api/weather` | GET | Weather data proxy |
| `/api/contact` | POST | Contact form submission |

---

## 👥 Team

| Name | Role | Expertise |
|------|------|-----------|
| **Anuj Phulera** | Project Lead / Software Architect | Next.js, Firebase, TensorFlow, C++, Python |
| **Aarav Choudhary** | Hardware Node / PCB Designer | KiCad, ESP8266, Soldering, Power Electronics |

---

## 📄 License

This project is proprietary. All rights reserved by the Project Verde team.

---

## 🙏 Acknowledgments

- Built with Next.js, React, Three.js, Framer Motion, and Tailwind CSS
- Deployed on Vercel
- Font: Space Grotesk & JetBrains Mono

---

<p align="center">
  <strong>🌿 Project Verde — Where biology meets engineering.</strong><br>
  <sub>Chlorophyll meets silicon.</sub>
</p>
