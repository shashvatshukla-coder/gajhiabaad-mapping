# 🏛️ KIET 3D Interactive Campus Map & Navigation System

An interactive 3D Web application for **KIET Group of Institutions (KIET Deemed to be University, Ghaziabad / Delhi-NCR)** built with **Three.js, React 18, Vite, and Tailwind CSS**.

![KIET 3D Campus Map](https://img.shields.io/badge/KIET-Deemed_to_be_University-0284c7?style=for-the-badge)
![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-black?style=for-the-badge&logo=three.js)
![React](https://img.shields.io/badge/React_18-Vite-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-Glassmorphism-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 🌟 Key Features

### 1. 🏢 Complete 3D Campus Architecture (21.56 Acres)
- **Academic Blocks A through H**:
  - **Block A**: Director General Secretariat, Registrar, Dean Academics, A-Block Conference Hall.
  - **Block B**: KIET Knowledge Resource Centre (Multi-Floor Central Library) & Electrical Engineering.
  - **Block C**: Electronics & Communication Engineering (ECE), VLSI, and Microwave Labs.
  - **Block D**: Mechanical & Civil Engineering Labs, CNC Machining, and CAD/CAM Center.
  - **Block E**: Computer Science & Engineering (CSE), AI/ML GPU Center, and Cloud Computing.
  - **Block F**: Information Technology (IT) & Computer Applications (MCA), Cyber Security Labs.
  - **Block G**: School of Management Studies (MBA) & Case Study Suites.
  - **Block H**: Centers of Excellence (Apple iOS Academy, Mercedes-Benz ADAM, D-Link).
  - **KSOP Block**: KIET School of Pharmacy (PCI approved labs & medicinal garden).
  - **TBI-KIET**: Technology Business Incubator (Govt. of India NSTEDB Supported Startup Hub).
- **Residential Hostels (Boys & Girls)**:
  - Boys Hostels: Aryabhatta (1st Year), C.V. Raman, Tagore, Vivekanand, Chandragupt, Chanakya.
  - Girls Hostels: Gargi, Sarojini, and Saraswati Hostels complex with private dining & gardens.
- **Sports & Recreation**:
  - Full-size Cricket Stadium & Turf Pitch, Football Arena.
  - Floodlit Synthetic Basketball, Lawn Tennis, and Volleyball Courts.
- **Dining & Social**:
  - Central Student Cafeteria, Café Coffee Day (CCD), Amul Parlour, Nescafe Kiosks.
- **Auditoriums & Culture**:
  - 600+ Seater Central Air-Conditioned Auditorium, Open Air Theatre (OAT Amphitheatre).
- **Campus Facilities & Highway Gates**:
  - Main Gate 1 (NH-58 Delhi-Meerut Highway), Gate 2 (Hostel), Gate 3 (Sports).
  - Campus Mandir (Shri Shiva & Saraswati Temple), 24/7 Medical Dispensary & Ambulance, Bank ATM Plaza.

---

### 2. 🔍 Interactive 3D Building Inspector & Floor Exploder
- Click any building to zoom in with cinematic camera transitions.
- **3D Floor Explosion Mode**: Watch multi-storey buildings separate vertically in 3D to inspect each floor's labs, classrooms, and offices.
- Floor-by-floor breakdown of department facilities and room numbers.

---

### 3. 🚶 Smart Campus Wayfinding & Navigation Engine
- Graph-based shortest pathfinding using Dijkstra's algorithm across real campus walkways.
- Displays total walking distance in meters, estimated walking duration, and step-by-step turn directions.
- Glowing 3D animated route ribbon guiding students and visitors directly to their destination.

---

### 4. 🚁 Cinematic 3D Drone Campus Tour
- 8-milestone automated drone flight path covering all institutional landmarks.
- Step-by-step informative audio and text narrations highlighting campus history and achievements.

---

### 5. 🕹️ First-Person Walkthrough Mode
- Explore the campus from a student's eye-level using **WASD / Arrow Keys** and mouse look, or on-screen touch controls.

---

### 6. 🌓 Dynamic Time-of-Day & Weather Engine
- **Day Mode**: Crisp sunlight with soft shadows and sky ambiance.
- **Sunset Mode**: Warm golden hour hues across campus facades.
- **Night Mode**: Illuminated building windows, glowing signboards, and street lamp spotlights.
- **Rain Mode**: Atmospheric rainfall particles and misty fog.

---

### 7. 📏 3D Distance Measurement Tool
- Click any two points on the 3D map to measure real-world distance in meters and feet.

---

### 8. 🗺️ Real-Time 2D Radar Mini-Map
- Top-down live mini-map with real-time campus footprint, route tracking, and instant click-to-focus.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/shashvatshukla-coder/gajhiabaad-mapping.git

# Navigate into project
cd gajhiabaad-mapping

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Building for Production

```bash
# Build optimized static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack
- **Engine**: Three.js (WebGL 3D Rendering)
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Glassmorphism UI HUD
- **Icons**: Lucide React
- **Audio**: Web Audio API (Synthesized UI Feedback)
- **Pathfinding**: Dijkstra Algorithm on Walkway Graph

---

## 📍 Campus Location
- **Address**: KIET Group of Institutions, Delhi-NCR, NH-58, Delhi-Meerut Highway, Muradnagar, Ghaziabad, Uttar Pradesh 201206
- **Coordinates**: 28.75257° N, 77.49851° E
- **Official Website**: [https://www.kiet.edu](https://www.kiet.edu)
