// Noor Islamic Super App - Complete Sanctuary Controller
document.addEventListener("DOMContentLoaded", () => {
  const VERSES = [
    {
      meta: "Surah Ash-Sharh • 94:5-6",
      arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      english: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
      urdu: "پس حقیقت یہ ہے کہ تنگی کے ساتھ آسانی ہے، یقیناً تنگی کے ساتھ آسانی ہے۔",
      audio: "https://everyayah.com/data/Alafasy_128kbps/094005.mp3",
      asbab: "Revealed in Makkah during severe early persecution when the polytheists mocked the believers for their poverty. Allah revealed this Surah to comfort the Prophet ﷺ and guarantee that relief is already unfolding alongside distress.",
      ibnKathir: "Ibn Kathir notes: The definite noun 'Al-Usr' (the difficulty) is mentioned once in meaning, while 'Yusr' (ease) is repeated indefinite, meaning infinite forms of ease. The Prophet ﷺ said: 'One hardship will never overcome two eases.'",
      jalalayn: "'Fa-inna ma'a al-'usri yusran': The word 'ma'a' indicates proximity and companionship—the ease does not just follow after years, it walks side-by-side with the hardship.",
      asSadi: "Imam As-Sa'di writes: This verse contains a universal promise to every soul undergoing distress or poverty: divine relief is already being prepared by Allah."
    },
    {
      meta: "Sahih al-Bukhari • #1",
      arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      english: "Actions are judged only by intentions, and every person will receive that which they intended.",
      urdu: "اعمال کا دارومدار نیتوں پر ہے اور ہر انسان کے لیے وہی ہے جس کی اس نے نیت کی۔",
      audio: null,
      asbab: "Uttered by the Prophet ﷺ when a man migrated from Makkah to Madinah not for the sake of Allah, but solely to propose marriage to a woman named Umm Qays.",
      ibnKathir: "Imam Ash-Shafi'i stated that this single Hadith comprises one third of all sacred Islamic jurisprudence (Fiqh). All outward deeds depend upon inward sincerity.",
      jalalayn: "Exclusivity ('Innama'): Outward righteous actions carry zero spiritual weight before Allah if tainted with ostentation or worldly pride.",
      asSadi: "Every ordinary daily routine (working, eating, resting) turns into rewarded worship when dedicated with a sincere intention to serve Allah."
    },
    {
      meta: "Surah Al-Baqarah • 2:286",
      arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
      english: "Allah does not burden any soul beyond that which it can bear.",
      urdu: "اللہ کسی جان پر اس کی طاقت سے زیادہ بوجھ نہیں ڈالتا۔",
      audio: "https://everyayah.com/data/Alafasy_128kbps/002286.mp3",
      asbab: "Revealed when the Companions were weeping in fear over unintentional passing thoughts. Allah granted them peace and guaranteed that inadvertent mistakes and unavoidable burdens are pardoned.",
      ibnKathir: "Whoever recites the last two verses of Surah Al-Baqarah at night, they are sufficient for him against every harm and evil.",
      jalalayn: "Constitutes the foundation of Islamic law: divine obligations never surpass human spiritual and physical capacity.",
      asSadi: "Affirms Allah's supreme justice: nobody bears the sins of another, and mercy precedes justice."
    },
    {
      meta: "Surah Ad-Duha • 93:3",
      arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ",
      english: "Your Lord has not forsaken you, nor has He become displeased.",
      urdu: "آپ کے رب نے نہ آپ کو چھوڑا ہے اور نہ ناراض ہوا ہے۔",
      audio: "https://everyayah.com/data/Alafasy_128kbps/093003.mp3",
      asbab: "Revealed when revelation paused temporarily and the pagans mocked that Allah had abandoned the Prophet. Allah comforted him that night is followed by day.",
      ibnKathir: "Night and day alternate just like trials and ease. Revelation will never cease until the mission is accomplished.",
      jalalayn: "Reassurance of eternal divine love and care.",
      asSadi: "A reminder to every believer in moments of loneliness that Allah is constantly watching and protecting them."
    }
  ];

  let currentVerseIdx = 0;
  let currentScholarTab = "asbab";
  let isReciting = false;
  let audioObj = null;

  // 1. Navigation Switching: Pinned Bottom Dock & Top Back Buttons
  const track = document.getElementById("sanctuary-track");
  const navButtons = document.querySelectorAll(".nav-tab-btn");

  function setScreenTab(idx) {
    if (track) track.style.transform = `translateX(-${idx * 25}%)`;
    navButtons.forEach((btn, i) => {
      btn.classList.toggle("active", i === idx);
    });
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-tab-idx"), 10);
      setScreenTab(idx);
    });
  });

  // Back to Ayaat buttons in all secondary screens
  document.querySelectorAll(".btn-return-home").forEach(btn => {
    btn.addEventListener("click", () => {
      setScreenTab(0); // Return directly to Screen 1 (Ayaat)
    });
  });

  // Detect Vertical Reel Scroll
  const carousel = document.getElementById("verses-carousel");
  if (carousel) {
    carousel.addEventListener("scroll", () => {
      const idx = Math.round(carousel.scrollTop / carousel.clientHeight);
      if (idx !== currentVerseIdx && idx < VERSES.length) {
        currentVerseIdx = idx;
        if (isReciting && audioObj) {
          audioObj.pause();
          isReciting = false;
          const icon = document.getElementById("recite-icon");
          if (icon) icon.textContent = "▶";
        }
      }
    });
  }

  // Toast Notification System
  function showToast(msg, icon = "✨") {
    const toast = document.getElementById("toast-pill");
    if (!toast) return;
    const msgElem = document.getElementById("toast-msg");
    const iconElem = document.getElementById("toast-icon");
    if (msgElem) msgElem.textContent = msg;
    if (iconElem) iconElem.textContent = icon;
    toast.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  // 2. Truly Soothing Ambient Courtyard Rain Soundscape (Web Audio API)
  let audioCtx = null;
  let rainSource = null;
  let rainGain = null;
  let rainFilter = null;
  let dropInterval = null;
  let isAmbientPlaying = false;
  const btnAmbient = document.getElementById("btn-ambient-sound");

  function startSoothingRain() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    // 1. Warm Brownian Noise Bed (Gentle continuous distant rainfall)
    const bufferSize = audioCtx.sampleRate * 2;
    const brownBuffer = audioCtx.createBuffer(2, bufferSize, audioCtx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = brownBuffer.getChannelData(ch);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + (0.02 * white)) / 1.02;
        data[i] = lastOut * 2.5;
      }
    }

    rainSource = audioCtx.createBufferSource();
    rainSource.buffer = brownBuffer;
    rainSource.loop = true;

    // Deep lowpass filter (warm acoustic rain, eliminates static)
    rainFilter = audioCtx.createBiquadFilter();
    rainFilter.type = "lowpass";
    rainFilter.frequency.value = 360;
    rainFilter.Q.value = 0.8;

    const highpass = audioCtx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 85;

    rainGain = audioCtx.createGain();
    rainGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    rainGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 1.2); // Soft volume!

    rainSource.connect(rainFilter);
    rainFilter.connect(highpass);
    highpass.connect(rainGain);
    rainGain.connect(audioCtx.destination);
    rainSource.start();

    // 2. Delicate Marble Courtyard Raindrops (Soft pitter-patter)
    dropInterval = setInterval(() => {
      if (!isAmbientPlaying || !audioCtx) return;
      try {
        const dropOsc = audioCtx.createOscillator();
        const dropGain = audioCtx.createGain();
        const dropFilter = audioCtx.createBiquadFilter();

        const freq = 950 + Math.random() * 450;
        dropOsc.type = "sine";
        dropOsc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        dropOsc.frequency.exponentialRampToValueAtTime(freq * 0.65, audioCtx.currentTime + 0.04);

        dropFilter.type = "bandpass";
        dropFilter.frequency.value = freq;
        dropFilter.Q.value = 6;

        const dropVol = 0.006 + Math.random() * 0.009;
        dropGain.gain.setValueAtTime(dropVol, audioCtx.currentTime);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

        dropOsc.connect(dropFilter);
        dropFilter.connect(dropGain);
        dropGain.connect(audioCtx.destination);

        dropOsc.start();
        dropOsc.stop(audioCtx.currentTime + 0.045);
      } catch(e) {}
    }, 160 + Math.random() * 140);

    isAmbientPlaying = true;
    const txt = document.getElementById("ambient-text");
    if (txt) txt.textContent = "Rain On";
    if (btnAmbient) {
      btnAmbient.style.borderColor = "var(--emerald-primary)";
      btnAmbient.style.background = "rgba(16, 185, 129, 0.2)";
    }
    showToast("Ambient Courtyard Rain enabled", "🌧️");
  }

  function stopSoothingRain() {
    if (dropInterval) clearInterval(dropInterval);
    if (rainGain && audioCtx) {
      rainGain.gain.setValueAtTime(rainGain.gain.value, audioCtx.currentTime);
      rainGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      setTimeout(() => {
        if (rainSource) {
          try { rainSource.stop(); } catch(e) {}
        }
      }, 450);
    }
    isAmbientPlaying = false;
    const txt = document.getElementById("ambient-text");
    if (txt) txt.textContent = "Rain";
    if (btnAmbient) {
      btnAmbient.style.borderColor = "";
      btnAmbient.style.background = "";
    }
    showToast("Ambient Rain paused", "🌧️");
  }

  if (btnAmbient) {
    btnAmbient.addEventListener("click", () => {
      if (!isAmbientPlaying) {
        startSoothingRain();
      } else {
        stopSoothingRain();
      }
    });
  }

  // 3. Wallpaper Drawer & Atmospheric Tint Controls
  const WALLPAPERS = [
    {
      id: "madinah",
      name: "Madinah Sanctuary",
      subtitle: "Al-Masjid an-Nabawi Umbrellas",
      url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1080",
      thumb: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=300"
    },
    {
      id: "kaaba",
      name: "Midnight Kaaba",
      subtitle: "The Holy Sanctuary, Makkah",
      url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1080",
      thumb: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=300"
    },
    {
      id: "arabesque",
      name: "Emerald Arabesque",
      subtitle: "Sacred Geometric Mosque Arch",
      url: "https://images.unsplash.com/photo-1590076215667-873d3a778e38?q=80&w=1080",
      thumb: "https://images.unsplash.com/photo-1590076215667-873d3a778e38?q=80&w=300"
    },
    {
      id: "desert",
      name: "Celestial Stars",
      subtitle: "Desert Twilight Sky",
      url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1080",
      thumb: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=300"
    },
    {
      id: "minarets",
      name: "Golden Minarets",
      subtitle: "Warm Horizon Sunset",
      url: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1080",
      thumb: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=300"
    },
    {
      id: "obsidian",
      name: "Obsidian Slate",
      subtitle: "Minimalist Deep Slate",
      url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1080",
      thumb: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=300"
    }
  ];

  let activeWallpaperUrl = WALLPAPERS[0].url;
  const wallpaperSheet = document.getElementById("wallpaper-sheet");
  const wallpaperGrid = document.getElementById("wallpaper-grid");
  const wallpaperBg = document.querySelector(".wallpaper-bg");

  function renderWallpapers() {
    if (!wallpaperGrid) return;
    wallpaperGrid.innerHTML = "";
    WALLPAPERS.forEach(w => {
      const isSelected = w.url === activeWallpaperUrl;
      const card = document.createElement("div");
      card.className = `wallpaper-thumb-card ${isSelected ? "active" : ""}`;
      card.innerHTML = `
        <div class="wallpaper-img-box" style="background-image: url('${w.thumb}')"></div>
        <div style="padding: 4px 2px;">
          <h5 style="font-size: 11px; font-weight: 700; color: #fff; margin: 0;">${w.name}</h5>
          <p style="font-size: 9px; color: #94a3b8; margin: 2px 0 0 0;">${w.subtitle}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        activeWallpaperUrl = w.url;
        if (wallpaperBg) wallpaperBg.style.backgroundImage = `url('${w.url}')`;
        renderWallpapers();
        showToast(`Sanctuary backdrop: ${w.name}`, "🖼️");
      });
      wallpaperGrid.appendChild(card);
    });
  }
  renderWallpapers();

  const btnWallpaper = document.getElementById("btn-wallpaper");
  const closeWallpaper = document.getElementById("close-wallpaper");

  if (btnWallpaper && wallpaperSheet) {
    btnWallpaper.addEventListener("click", () => {
      wallpaperSheet.classList.add("open");
    });
  }
  if (closeWallpaper && wallpaperSheet) {
    closeWallpaper.addEventListener("click", () => {
      wallpaperSheet.classList.remove("open");
    });
  }
  if (wallpaperSheet) {
    wallpaperSheet.addEventListener("click", (e) => {
      if (e.target === wallpaperSheet) wallpaperSheet.classList.remove("open");
    });
  }

  // Tint controls
  const tintOverlay = document.querySelector(".wallpaper-overlay");
  const tintMap = {
    soft: { opacity: "0.45", label: "Soft (45%)" },
    balanced: { opacity: "0.7", label: "Balanced (70%)" },
    deep: { opacity: "0.88", label: "Deep (88%)" }
  };
  document.querySelectorAll(".tint-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tint = btn.getAttribute("data-tint");
      document.querySelectorAll(".tint-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const lbl = document.getElementById("tint-label");
      if (lbl) lbl.textContent = tintMap[tint].label;
      if (tintOverlay) tintOverlay.style.background = `rgba(0, 0, 0, ${tintMap[tint].opacity})`;
      showToast(`Atmospheric darkness: ${tintMap[tint].label}`, "🌓");
    });
  });

  const btnSavePhoneWp = document.getElementById("btn-save-phone-wallpaper");
  if (btnSavePhoneWp) {
    btnSavePhoneWp.addEventListener("click", () => {
      window.open(activeWallpaperUrl, "_blank");
      showToast("Opening HD Wallpaper for Save...", "📥");
    });
  }

  // 4. Location Selector & Astronomical Prayer Times Updates
  const CITIES_DATA = {
    makkah: {
      name: "Makkah",
      country: "Saudi Arabia",
      sub: "Holy Sanctuary",
      prayers: { Fajr: "04:52", Dhuhr: "12:15", Asr: "15:42", Maghrib: "18:20", Isha: "19:50" },
      nextPrayer: "Maghrib",
      timeRemainingSec: 6135,
      qiblaBearing: 0,
      qiblaText: "0° (At Kaaba)",
      qiblaSub: "Directly Facing Kaaba",
      qiblaDist: "Holy Sanctuary, Makkah"
    },
    madinah: {
      name: "Madinah",
      country: "Saudi Arabia",
      sub: "City of the Prophet ﷺ",
      prayers: { Fajr: "04:48", Dhuhr: "12:18", Asr: "15:46", Maghrib: "18:24", Isha: "19:54" },
      nextPrayer: "Maghrib",
      timeRemainingSec: 6375,
      qiblaBearing: 177,
      qiblaText: "177° South",
      qiblaSub: "Facing South toward Makkah",
      qiblaDist: "438 km to Kaaba"
    },
    london: {
      name: "London",
      country: "United Kingdom",
      sub: "Europe / MWL Standard",
      prayers: { Fajr: "04:12", Dhuhr: "13:02", Asr: "16:48", Maghrib: "19:28", Isha: "21:10" },
      nextPrayer: "Asr",
      timeRemainingSec: 3950,
      qiblaBearing: 119,
      qiblaText: "119° ESE",
      qiblaSub: "Pointing toward Makkah",
      qiblaDist: "4,792 km to Kaaba"
    },
    newyork: {
      name: "New York",
      country: "United States",
      sub: "North America / ISNA",
      prayers: { Fajr: "05:18", Dhuhr: "12:58", Asr: "16:34", Maghrib: "19:08", Isha: "20:42" },
      nextPrayer: "Dhuhr",
      timeRemainingSec: 4200,
      qiblaBearing: 58,
      qiblaText: "58° ENE",
      qiblaSub: "Great Circle Bearing",
      qiblaDist: "10,296 km to Kaaba"
    },
    dubai: {
      name: "Dubai",
      country: "UAE",
      sub: "Gulf / Umm al-Qura",
      prayers: { Fajr: "04:42", Dhuhr: "12:22", Asr: "15:48", Maghrib: "18:26", Isha: "19:44" },
      nextPrayer: "Maghrib",
      timeRemainingSec: 6490,
      qiblaBearing: 261,
      qiblaText: "261° West",
      qiblaSub: "Pointing toward Makkah",
      qiblaDist: "1,645 km to Kaaba"
    },
    karachi: {
      name: "Karachi",
      country: "Pakistan",
      sub: "South Asia / Karachi Standard",
      prayers: { Fajr: "04:58", Dhuhr: "12:30", Asr: "16:02", Maghrib: "18:42", Isha: "20:02" },
      nextPrayer: "Maghrib",
      timeRemainingSec: 7450,
      qiblaBearing: 267,
      qiblaText: "267° West",
      qiblaSub: "Pointing toward Makkah",
      qiblaDist: "2,780 km to Kaaba"
    },
    istanbul: {
      name: "Istanbul",
      country: "Turkey",
      sub: "Diyanet Standard",
      prayers: { Fajr: "04:50", Dhuhr: "13:06", Asr: "16:50", Maghrib: "19:35", Isha: "21:08" },
      nextPrayer: "Asr",
      timeRemainingSec: 4080,
      qiblaBearing: 151,
      qiblaText: "151° SSE",
      qiblaSub: "Pointing toward Makkah",
      qiblaDist: "2,425 km to Kaaba"
    },
    cairo: {
      name: "Cairo",
      country: "Egypt",
      sub: "Egyptian General Authority",
      prayers: { Fajr: "04:22", Dhuhr: "11:58", Asr: "15:32", Maghrib: "18:08", Isha: "19:30" },
      nextPrayer: "Maghrib",
      timeRemainingSec: 5410,
      qiblaBearing: 136,
      qiblaText: "136° SE",
      qiblaSub: "Pointing toward Makkah",
      qiblaDist: "1,285 km to Kaaba"
    },
    jakarta: {
      name: "Jakarta",
      country: "Indonesia",
      sub: "KEMENAG Standard",
      prayers: { Fajr: "04:36", Dhuhr: "11:54", Asr: "15:12", Maghrib: "17:56", Isha: "19:06" },
      nextPrayer: "Isha",
      timeRemainingSec: 3200,
      qiblaBearing: 295,
      qiblaText: "295° WNW",
      qiblaSub: "Pointing toward Makkah",
      qiblaDist: "7,910 km to Kaaba"
    },
    toronto: {
      name: "Toronto",
      country: "Canada",
      sub: "North America / ISNA",
      prayers: { Fajr: "05:24", Dhuhr: "13:16", Asr: "16:58", Maghrib: "19:32", Isha: "21:06" },
      nextPrayer: "Dhuhr",
      timeRemainingSec: 4600,
      qiblaBearing: 56,
      qiblaText: "56° ENE",
      qiblaSub: "Great Circle Bearing",
      qiblaDist: "10,210 km to Kaaba"
    }
  };

  let activeCityKey = "makkah";
  let countdownSec = 6135;
  const locationModal = document.getElementById("location-modal");
  const citiesListContainer = document.getElementById("cities-list-container");

  function selectCity(cityKey) {
    activeCityKey = cityKey;
    const city = CITIES_DATA[cityKey];

    // Update Top Bar
    const locLabel = document.getElementById("current-location-label");
    const chipPrayer = document.getElementById("chip-prayer-name");
    if (locLabel) locLabel.textContent = city.name;
    if (chipPrayer) chipPrayer.textContent = city.nextPrayer;
    countdownSec = city.timeRemainingSec;

    // Update Sanctuary Prayer Schedule
    const sCity = document.getElementById("sanctuary-city-method");
    const sPrayer = document.getElementById("sanctuary-prayer-name");
    const sSub = document.getElementById("sanctuary-prayer-sub");
    const sTime = document.getElementById("sanctuary-prayer-target-time");
    if (sCity) sCity.textContent = `${city.name} • ${city.sub.split("/")[1] || "Standard"}`;
    if (sPrayer) sPrayer.textContent = city.nextPrayer;
    if (sSub) sSub.textContent = `${city.nextPrayer} prayer in`;
    if (sTime) sTime.textContent = `${city.prayers[city.nextPrayer]} Today`;

    const tf = document.getElementById("time-fajr");
    const td = document.getElementById("time-dhuhr");
    const ta = document.getElementById("time-asr");
    const tm = document.getElementById("time-maghrib");
    const ti = document.getElementById("time-isha");
    if (tf) tf.textContent = city.prayers.Fajr;
    if (td) td.textContent = city.prayers.Dhuhr;
    if (ta) ta.textContent = city.prayers.Asr;
    if (tm) tm.textContent = city.prayers.Maghrib;
    if (ti) ti.textContent = city.prayers.Isha;

    // Highlight timetable active box
    ["fajr", "dhuhr", "asr", "maghrib", "isha"].forEach(p => {
      const col = document.getElementById(`col-${p}`);
      if (col) {
        col.className = p === city.nextPrayer.toLowerCase() ? "time-box active-maghrib" : "time-box";
      }
    });

    // Update Qibla Compass
    const qDeg = document.getElementById("sanctuary-qibla-deg");
    const qSub = document.getElementById("sanctuary-qibla-sub");
    const qDist = document.getElementById("sanctuary-qibla-dist");
    const qNeedle = document.getElementById("sanctuary-qibla-needle");
    if (qDeg) qDeg.textContent = city.qiblaText;
    if (qSub) qSub.textContent = city.qiblaSub;
    if (qDist) qDist.textContent = city.qiblaDist;
    if (qNeedle) qNeedle.style.transform = `rotate(${city.qiblaBearing}deg)`;

    if (locationModal) locationModal.classList.remove("open");
    renderCitiesList();
    showToast(`Location set to ${city.name}, ${city.country}`, "📍");
  }

  function renderCitiesList(filter = "") {
    if (!citiesListContainer) return;
    citiesListContainer.innerHTML = "";
    const q = filter.toLowerCase();
    Object.keys(CITIES_DATA).forEach(key => {
      const c = CITIES_DATA[key];
      if (q && !c.name.toLowerCase().includes(q) && !c.country.toLowerCase().includes(q)) return;
      const isCurrent = key === activeCityKey;
      const row = document.createElement("div");
      row.className = `city-item-row ${isCurrent ? "active" : ""}`;
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 14px;">${key === 'makkah' ? '🕋' : key === 'madinah' ? '🕌' : '📍'}</span>
          <div>
            <h4 style="font-size: 11px; font-weight: 700; color: #fff; margin: 0;">${c.name} <span style="font-weight: 400; color: #94a3b8;">• ${c.country}</span></h4>
            <p style="font-size: 9px; color: #94a3b8; margin: 1px 0 0 0;">${c.sub}</p>
          </div>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 10px; color: #34d399; font-weight: 700; display: block;">${c.nextPrayer}: ${c.prayers[c.nextPrayer]}</span>
          <span style="font-size: 9px; color: var(--gold-glow);">Qibla: ${c.qiblaBearing}°</span>
        </div>
      `;
      row.addEventListener("click", () => selectCity(key));
      citiesListContainer.appendChild(row);
    });
  }
  renderCitiesList();

  const btnLocSelector = document.getElementById("btn-location-selector");
  const closeLoc = document.getElementById("close-location");
  const citySearchInput = document.getElementById("city-search-input");
  const btnAutoGps = document.getElementById("btn-auto-gps");

  if (btnLocSelector && locationModal) {
    btnLocSelector.addEventListener("click", () => {
      locationModal.classList.add("open");
    });
  }
  if (closeLoc && locationModal) {
    closeLoc.addEventListener("click", () => {
      locationModal.classList.remove("open");
    });
  }
  if (locationModal) {
    locationModal.addEventListener("click", (e) => {
      if (e.target === locationModal) locationModal.classList.remove("open");
    });
  }
  if (citySearchInput) {
    citySearchInput.addEventListener("input", (e) => {
      renderCitiesList(e.target.value);
    });
  }
  if (btnAutoGps) {
    btnAutoGps.addEventListener("click", () => {
      showToast("GPS Lock: Local coordinates detected", "📍");
      setTimeout(() => {
        selectCity("london");
      }, 400);
    });
  }

  // 5. Audio Recitation
  const btnRecite = document.getElementById("btn-recite");
  if (btnRecite) {
    btnRecite.addEventListener("click", () => {
      const v = VERSES[currentVerseIdx];
      if (!v.audio) {
        showToast("Audio recitation available for Quranic Ayahs.", "ℹ️");
        return;
      }
      const icon = document.getElementById("recite-icon");
      if (isReciting && audioObj) {
        audioObj.pause();
        isReciting = false;
        if (icon) icon.textContent = "▶";
        showToast("Audio paused", "⏸");
      } else {
        if (audioObj) audioObj.pause();
        audioObj = new Audio(v.audio);
        audioObj.play();
        isReciting = true;
        if (icon) icon.textContent = "⏸";
        showToast("Reciting Sheikh Mishary Alafasy", "▶");
        audioObj.onended = () => {
          isReciting = false;
          if (icon) icon.textContent = "▶";
        };
      }
    });
  }

  // 6. Tadabbur (Tafseer) Modal
  const sheet = document.getElementById("tadabbur-sheet");
  const btnTadabbur = document.getElementById("btn-tadabbur");
  const closeTadabbur = document.getElementById("close-tadabbur");

  function openTadabburModal() {
    const v = VERSES[currentVerseIdx];
    const meta = document.getElementById("tadabbur-meta");
    const arabic = document.getElementById("tadabbur-arabic");
    if (meta) meta.textContent = v.meta;
    if (arabic) arabic.textContent = v.arabic;
    renderTadabburTab(currentScholarTab);
    if (sheet) sheet.classList.add("open");
  }

  function closeTadabburModal() {
    if (sheet) sheet.classList.remove("open");
  }

  if (btnTadabbur) btnTadabbur.addEventListener("click", openTadabburModal);
  if (closeTadabbur) closeTadabbur.addEventListener("click", closeTadabburModal);
  if (sheet) {
    sheet.addEventListener("click", (e) => {
      if (e.target === sheet) closeTadabburModal();
    });
  }

  function renderTadabburTab(tab) {
    currentScholarTab = tab;
    document.querySelectorAll(".t-tab").forEach(t => {
      t.classList.toggle("active", t.getAttribute("data-tab") === tab);
    });
    const v = VERSES[currentVerseIdx];
    const body = document.getElementById("tadabbur-body");
    if (body) body.innerHTML = v[tab] || "Commentary preserved in authentic tradition.";
  }

  document.querySelectorAll(".t-tab").forEach(tabBtn => {
    tabBtn.addEventListener("click", () => renderTadabburTab(tabBtn.getAttribute("data-tab")));
  });

  // 7. Hifz (Memorization)
  const btnMemorize = document.getElementById("btn-memorize");
  if (btnMemorize) {
    btnMemorize.addEventListener("click", () => {
      btnMemorize.classList.toggle("text-emerald-400");
      btnMemorize.innerHTML = `<span>✓</span><span>Saved</span>`;
      if (navigator.vibrate) navigator.vibrate([20, 50, 30]);
      showToast("Ayah added to personal Hifz memorization deck", "📿");
      setTimeout(() => {
        btnMemorize.innerHTML = `<span>📿</span><span>Hifz</span>`;
      }, 1500);
    });
  }

  // 8. Share Modal & Comprehensive Social Media Handlers
  const shareModal = document.getElementById("share-modal");
  const btnShareCard = document.getElementById("btn-share-card");
  const btnCloseShare = document.getElementById("btn-close-share");
  const btnDownloadCard = document.getElementById("btn-download-card");
  const btnCopyVerse = document.getElementById("btn-copy-verse");

  if (btnShareCard && shareModal) {
    btnShareCard.addEventListener("click", () => {
      const v = VERSES[currentVerseIdx];
      const sArabic = document.getElementById("story-card-arabic");
      const sEnglish = document.getElementById("story-card-english");
      const sMeta = document.getElementById("story-card-meta");
      if (sArabic) sArabic.textContent = v.arabic;
      if (sEnglish) sEnglish.textContent = `"${v.english}"`;
      if (sMeta) sMeta.textContent = v.meta;
      shareModal.classList.add("open");
    });
  }

  if (btnCloseShare && shareModal) {
    btnCloseShare.addEventListener("click", () => {
      shareModal.classList.remove("open");
    });
  }

  document.querySelectorAll(".social-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const platform = btn.getAttribute("data-platform");
      const v = VERSES[currentVerseIdx];
      const shareText = `"${v.arabic}"\n\n"${v.english}"\n— ${v.meta}\n\nShared via Noor • The 100% Free Islamic Sanctuary`;
      const url = "https://noorislamic.app";

      if (platform === "whatsapp") {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + "\n" + url)}`, "_blank");
        showToast("Opening WhatsApp...", "💬");
      } else if (platform === "twitter") {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, "_blank");
        showToast("Opening X (Twitter)...", "𝕏");
      } else if (platform === "facebook") {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`, "_blank");
        showToast("Opening Facebook...", "👥");
      } else if (platform === "telegram") {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`, "_blank");
        showToast("Opening Telegram...", "✈️");
      } else if (platform === "instagram") {
        navigator.clipboard.writeText(`${shareText}\n\n#Quran #DailyAyah #IslamicQuotes #NoorApp`);
        showToast("Ayah & hashtags copied! Ready for Instagram Story 📸", "📸");
      } else if (platform === "tiktok") {
        navigator.clipboard.writeText(`${shareText}\n\n#Islamic #Dua #Ayah #DailyQuran #Noor`);
        showToast("Ready for TikTok & Reels caption! Copied 🎵", "🎵");
      }
    });
  });

  if (btnCopyVerse) {
    btnCopyVerse.addEventListener("click", () => {
      const v = VERSES[currentVerseIdx];
      const text = `${v.arabic}\n\n"${v.english}"\n— ${v.meta}\n\nShared via Noor App`;
      navigator.clipboard.writeText(text);
      showToast("Ayah & translation copied to clipboard! 📋", "📋");
    });
  }

  if (btnDownloadCard) {
    btnDownloadCard.addEventListener("click", () => {
      showToast("Story card saved to Photos! 📥", "🖼️");
      setTimeout(() => {
        if (shareModal) shareModal.classList.remove("open");
      }, 1000);
    });
  }

  // 7. Interactive Dhikr Selectors & Tap Counter
  let fullTasbihCount = 0;
  const arabicDisplay = document.getElementById("tasbih-arabic-display");
  const transDisplay = document.getElementById("tasbih-trans-display");
  const meaningDisplay = document.getElementById("tasbih-meaning-display");
  const countDisplay = document.getElementById("full-tasbih-count");

  document.querySelectorAll(".dhikr-choice").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".dhikr-choice").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const arabic = btn.getAttribute("data-arabic");
      const trans = btn.getAttribute("data-trans");
      const meaning = btn.getAttribute("data-meaning");

      if (arabicDisplay) arabicDisplay.textContent = arabic;
      if (transDisplay) transDisplay.textContent = trans;
      if (meaningDisplay) meaningDisplay.textContent = `"${meaning}"`;

      fullTasbihCount = 0;
      if (countDisplay) countDisplay.textContent = fullTasbihCount;
      if (navigator.vibrate) navigator.vibrate(20);
    });
  });

  const fullTasbihTrigger = document.getElementById("full-tasbih-trigger");
  if (fullTasbihTrigger) {
    fullTasbihTrigger.addEventListener("click", () => {
      fullTasbihCount++;
      if (fullTasbihCount >= 33) {
        fullTasbihCount = 33;
        if (countDisplay) countDisplay.textContent = fullTasbihCount;
        if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
        setTimeout(() => {
          fullTasbihCount = 0;
          if (countDisplay) countDisplay.textContent = fullTasbihCount;
        }, 1200);
      } else {
        if (countDisplay) countDisplay.textContent = fullTasbihCount;
        if (navigator.vibrate) navigator.vibrate(25);
      }
    });
  }

  // 8. Quran Reader & Surahs Search
  const QURAN_SURAHS = {
    "1": {
      name: "Al-Fatihah",
      arabic: "الفَاتِحَة",
      ayahs: [
        { num: 1, ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", en: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
        { num: 2, ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", en: "[All] praise is [due] to Allah, Lord of the worlds." },
        { num: 3, ar: "الرَّحْمَٰنِ الرَّحِيمِ", en: "The Entirely Merciful, the Especially Merciful," },
        { num: 4, ar: "مَالِكِ يَوْمِ الدِّينِ", en: "Sovereign of the Day of Recompense." },
        { num: 5, ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", en: "It is You we worship and You we ask for help." },
        { num: 6, ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", en: "Guide us to the straight path -" },
        { num: 7, ar: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", en: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray." }
      ]
    },
    "94": {
      name: "Ash-Sharh",
      arabic: "الشَّرْح",
      ayahs: [
        { num: 1, ar: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", en: "Did We not expand for you, [O Muhammad], your breast?" },
        { num: 2, ar: "وَوَضَعْنَا عَنكَ وِزْرَكَ", en: "And We removed from you your burden" },
        { num: 3, ar: "الَّذِي أَنقَضَ ظَهْرَكَ", en: "Which had weighed upon your back" },
        { num: 4, ar: "وَرَفَعْنَا لَكَ ذِكْرَكَ", en: "And raised high for you your repute." },
        { num: 5, ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "For indeed, with hardship [will come] ease." },
        { num: 6, ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "Indeed, with hardship [will come] ease." },
        { num: 7, ar: "فَإِذَا فَرَغْتَ فَانصَبْ", en: "So when you have finished [your duties], then stand up [for worship]." },
        { num: 8, ar: "وَإِلَىٰ رَبِّكَ فَارْغَب", en: "And to your Lord direct [your] longing." }
      ]
    },
    "93": {
      name: "Ad-Duha",
      arabic: "الضُّحَى",
      ayahs: [
        { num: 1, ar: "وَالضُّحَىٰ", en: "By the morning brightness" },
        { num: 2, ar: "وَاللَّيْلِ إِذَا سَجَىٰ", en: "And [by] the night when it covers with darkness," },
        { num: 3, ar: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", en: "Your Lord has not forsaken you, nor has He become displeased." },
        { num: 4, ar: "وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ", en: "And the Hereafter is better for you than the first [life]." },
        { num: 5, ar: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ", en: "And your Lord is going to give you, and you will be satisfied." }
      ]
    },
    "112": {
      name: "Al-Ikhlas",
      arabic: "الإِخْلَاص",
      ayahs: [
        { num: 1, ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", en: "Say, 'He is Allah, [who is] One,'" },
        { num: 2, ar: "اللَّهُ الصَّمَدُ", en: "Allah, the Eternal Refuge." },
        { num: 3, ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", en: "He neither begets nor is born," },
        { num: 4, ar: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", en: "Nor is there to Him any equivalent." }
      ]
    }
  };

  const quranList = document.getElementById("surah-list");
  const quranReader = document.getElementById("quran-reader-view");
  const readerTitle = document.getElementById("reader-surah-title");
  const readerArabic = document.getElementById("reader-surah-arabic");
  const ayahsContainer = document.getElementById("reader-ayahs-container");
  const btnBackSurahs = document.getElementById("btn-back-to-surahs");

  document.querySelectorAll(".surah-card").forEach(card => {
    card.addEventListener("click", () => {
      const surahId = card.getAttribute("data-surah");
      const surahData = QURAN_SURAHS[surahId] || QURAN_SURAHS["1"];

      if (readerTitle) readerTitle.textContent = `Surah ${surahData.name} (${surahId})`;
      if (readerArabic) readerArabic.textContent = surahData.arabic;
      if (ayahsContainer) {
        ayahsContainer.innerHTML = "";
        surahData.ayahs.forEach(ayah => {
          const ayahBox = document.createElement("div");
          ayahBox.style.padding = "10px";
          ayahBox.style.borderRadius = "12px";
          ayahBox.style.background = "rgba(0,0,0,0.3)";
          ayahBox.style.border = "1px solid rgba(212,175,55,0.2)";
          ayahBox.style.marginBottom = "8px";
          ayahBox.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 9px; font-weight: 700; color: var(--gold-glow); background: rgba(0,0,0,0.4); border-radius: 9999px; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center;">${ayah.num}</span>
            </div>
            <p style="font-family: 'Amiri', serif; font-size: 18px; text-align: right; color: #fff; line-height: 1.8; margin: 4px 0;">${ayah.ar}</p>
            <p style="font-size: 11px; color: #94a3b8; line-height: 1.4; margin: 0;">${ayah.en}</p>
          `;
          ayahsContainer.appendChild(ayahBox);
        });
      }

      if (quranList) quranList.style.display = "none";
      if (quranReader) quranReader.style.display = "block";
    });
  });

  if (btnBackSurahs && quranReader && quranList) {
    btnBackSurahs.addEventListener("click", () => {
      quranReader.style.display = "none";
      quranList.style.display = "block";
    });
  }

  const quranSearch = document.getElementById("quran-search");
  if (quranSearch) {
    quranSearch.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll(".surah-card").forEach(c => {
        const name = (c.getAttribute("data-name") || "").toLowerCase();
        c.style.display = name.includes(q) ? "flex" : "none";
      });
    });
  }

  // Salah Pill Toggles
  document.querySelectorAll(".salah-check-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      if (btn.classList.contains("active")) {
        btn.textContent = btn.textContent.replace("○", "✓");
      } else {
        btn.textContent = btn.textContent.replace("✓", "○");
      }
    });
  });

  // Live Prayer Countdown Clock
  const chipCountdown = document.getElementById("chip-countdown");
  const sanctuaryCountdown = document.getElementById("sanctuary-countdown");

  setInterval(() => {
    countdownSec--;
    if (countdownSec <= 0) countdownSec = 7200;
    const h = String(Math.floor(countdownSec / 3600)).padStart(2, "0");
    const m = String(Math.floor((countdownSec % 3600) / 60)).padStart(2, "0");
    const s = String(countdownSec % 60).padStart(2, "0");
    const clockStr = `${h}:${m}:${s}`;
    if (chipCountdown) chipCountdown.textContent = clockStr;
    if (sanctuaryCountdown) sanctuaryCountdown.textContent = clockStr;
  }, 1000);
});
