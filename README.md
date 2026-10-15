# 🕊️ Noor Sanctuary (نور Sanctuary)
### *The Luxury Islamic Digital Sanctuary*

> **100% Free Forever • Zero Ads • Zero Tracking • Pure Sacred Peace**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Pure Vanilla Web](https://img.shields.io/badge/Stack-HTML5%20%7C%20TailwindCSS%20%7C%20WebAudio-gold.svg)](#technology-stack)
[![Platform: Web & PWA](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Desktop-lightgrey.svg)](#progressive-web-app)

---

## 🌟 Overview

**Noor Sanctuary** is a peaceful, distraction-free Islamic web application designed with a timeless **Royal Cream & Antique Gold** aesthetic. Built as a sacred digital retreat, Noor Sanctuary brings the timeless tranquility of traditional Islamic architecture directly into modern mobile and desktop screens.

---

## ✨ Key Features

### 1. 📱 Infinite Vertical Reels Feed (Screen 1)
- Seamless vertical snap-scrolling feed of curated Quranic reflections.
- Displays authentic Uthmani Arabic script, English translation (*Sahih International*), and authentic Kashmiri translation (*Bayan-ul-Furqan*).
- Built-in audio recitation powered by world-renowned reciters (Mishary Rashid Alafasy, Abdul Basit, Mahmoud Khalil Al-Husary, Abu Bakr Al-Shatri).
- Classical **Tadabbur (Tafseer)** drawer with insights from *Tafsir Ibn Kathir*, *Tafsir al-Jalalayn*, and *Tafsir as-Sa'di*.
- Built-in **Web Audio generative soundscape** (soothing courtyard rain).

### 2. 🎯 Spiritual Mood Filtering
Instant thematic filtering based on your current spiritual state:
- ⚓ **Sabr (Patience & Endurance)**: *Surah Al-Baqarah 2:153*, *Surah Az-Zumar 39:10*, *Surah Al-Baqarah 2:155-156*, *Surah Ali 'Imran 3:139*.
- 🤲 **Calm (Anxiety, Serenity & Tawakkul)**: *Surah Ar-Ra'd 13:28*, *Surah At-Talaq 65:3*, and **Ayat al-Kursi (*Surah Al-Baqarah 2:255*)**.
- 🕊️ **Ease (Hardship, Relief & Openings)**: *Surah Ash-Sharh 94:5-6*, *Surah Ad-Duha 93:3*, *Surah Al-Baqarah 2:286*, *Surah Fatir 35:34*.
- 💛 **Shukr (Gratitude, Joy & Praise)**: *Surah Ibrahim 14:7*, *Surah Al-Baqarah 2:152*, *Surah An-Naml 27:40*, *Surah Luqman 31:12*.
- 🌧️ **Tawbah (Repentance, Hope & Mercy)**: *Surah Az-Zumar 39:53*, *Surah An-Nisa 4:110*, *Surah Al-Anbiya 21:87 (Dua of Yunus)*, *Surah Hud 11:90*, *Surah Al-Furqan 25:70*.

### 3. 🏔️ Authentic Kashmiri Quran Integration (کٲشُر قرآن)
- Sourced from the classical translation by **Mirwaiz Mohammad Yousuf Shah** (*Bayan-ul-Furqan*) and **Mufti Athar Manigami**.
- Rendered in authentic Kashmiri Nastaliq calligraphy with full diacritic support (**ٲ**, **ۄ**, **ؠ**, **چَھ**).
- Structured with each Kashmiri verse paired directly below the English text with an antique gold divider.

### 4. 📖 Complete Quran Reader (Screen 3)
- Complete catalog of all **114 Surahs** with instant search and classification (Meccan / Medinan).
- Instant offline access for essential daily Surahs (*Al-Fatihah*, *Ash-Sharh*, *Al-Ikhlas*, *Al-Falaq*, *An-Nas*).
- Dynamic streaming for all remaining Surahs with synchronized bilingual translation view.
- Floating playback bar with verse skip controls (`⏮`, `⏭`), speed adjustments, and auto-scrolling highlights.

### 5. 🕌 Sanctuary & Prayer Dashboard (Screen 2)
- **Real-Time Astronomical Prayer Clock**: Real-time countdown to the next Salah.
- **Sunnah Adaptive Adhkar**: Contextually updates between Morning (*04:00 - 12:00*) and Evening (*12:00 - 04:00*) Adhkar from *Hisnul Muslim*.
- **Interactive Qibla Compass**: Live bearing calculation relative to Kaaba coordinates.
- **Daily Salah Tracker & Streak Counter**: Visual 5-prayer completion tracker with streak milestone celebrations.
- **Adhan Arrival Notification & Chime**: Harmonic 3-note major chord chime synthesized entirely in-browser via Web Audio API.

### 6. 🔖 Bookmarks & Saved Reflections
- Quick heart button (`♡` / `♥`) to save any reflection or Ayah from the reels feed or reader.
- Sliding Bookmarks drawer with one-tap recitation listening and reflection review.
- Persisted locally on device.

---

## 🛠️ Technology Stack

- **Frontend**: Pure Vanilla HTML5, CSS3, ES6+ JavaScript (Zero heavyweight dependencies or frameworks).
- **Styling**: Tailwind CSS + Custom luxury typography (`Cinzel`, `Playfair Display`, `Amiri`, `Noto Nastaliq Urdu`, `Plus Jakarta Sans`).
- **Audio Engine**: Native Web Audio API for sound synthesis + everyayah.com sacred reciter CDN.
- **Persistence**: Safe browser `localStorage` engine.
- **Location**: Geodesic Haversine formula + HTML5 Geolocation API with regional fallback hubs (*Makkah, Madinah, Srinagar, London, New York, Istanbul, Cairo, Karachi, Dubai, Jakarta*).

---

## 🚀 Quick Start

### Running Locally
No build step or Node.js environment required!

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/noor-sanctuary.git
   cd noor-sanctuary
   ```
2. Open `index.html` in any web browser:
   - On macOS:
     ```bash
     open index.html
     ```
   - On Linux:
     ```bash
     xdg-open index.html
     ```
   - Or serve with any static server:
     ```bash
     npx serve .
     # or
     python3 -m http.server 8000
     ```

### Deploying to GitHub Pages (Free Hosting)
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
3. Under **Branch**, choose `main` / `root` and click **Save**.
4. Your site will be live within 60 seconds at `https://YOUR_USERNAME.github.io/noor-sanctuary/`!

---

## 📱 Progressive Web App (PWA)

Noor Sanctuary is configured with mobile-web app meta tags (`viewport-fit=cover`, `apple-mobile-web-app-capable`, `theme-color`).

To install as an app on your phone:
- **iOS Safari**: Tap the Share button (`⎙`) > **Add to Home Screen**.
- **Android Chrome**: Tap the three dots menu (`⋮`) > **Install app** or **Add to Home Screen**.

---

## 📜 Sacred Ethics & License

- **100% Free Forever**: No monetization, no premium tiers, no subscriptions.
- **Zero Tracking**: No Google Analytics, no third-party tracking pixels, no telemetry.
- **License**: Released under the [MIT License](LICENSE).
