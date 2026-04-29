(function(){
  const html = document.documentElement;
  const $ = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => ctx.querySelectorAll(s);

  // ---- language toggle ----
  const langToggle = $('#langToggle');
  try {
    const saved = localStorage.getItem('chimeicare-lang');
    if (saved === 'en' || saved === 'zh') html.lang = saved;
  } catch(e) {}
  langToggle.addEventListener('click', () => {
    const next = html.lang === 'zh' ? 'en' : 'zh';
    html.lang = next;
    try { localStorage.setItem('chimeicare-lang', next); } catch(e) {}
  });

  // ---- mobile menu ----
  const menuBtn = $('#menuBtn');
  const navLinks = $('#navLinks');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // ---- nav background on scroll ----
  const nav = $('#nav');
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- year tabs ----
  $$('.year-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const year = tab.dataset.year;
      $$('.year-tab').forEach(t => t.classList.remove('active'));
      $$('.year-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`.year-panel[data-panel="${year}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // ---- inject preview thumbnails into media cards ----
  // Map of URL substring -> preview image (og:image, podcast cover, etc.)
  const previewThumbs = {
    'health.tvbs.com.tw/medical/320349': 'https://health-asset.tvbs.com.tw/img/program/upload/2019/11/29/20191129184311-b16038d2.jpg',
    'health.ettoday.net/news/1621234': 'https://cdn2.ettoday.net/images/4636/d4636031.jpg',
    'ettoday.net/news/20240509/2735241': 'https://cdn2.ettoday.net/images/7634/d7634976.jpg',
    'nvns.net/news_view.php?new_sn=34157': 'https://uploads.posu.tw/73/738/img/2-1%28436%29.jpg',
    'gooddoctorweb.com/post/1593': 'https://static-cdn.gooddoctorweb.com/images/post/phpVkeCIl.jpg',
    'health.ltn.com.tw/article/breakingnews/2289171': 'https://img.ltn.com.tw/Upload/health/page/800/2017/12/20/2289171_1.jpg',
    'managertoday.firstory.io/episodes/cml0b2n970hhv01059i54cpto': 'https://image.firstory-cdn.me/Image/ckufaibc5dc3u0966b6rc961b/QiXqydEzZpZcO-KBsi6QX.jpg',
    'open.firstory.me/story/cm9eoowap4p430108bruw406r': 'https://files.soundon.fm/1744479829204-0d2e2569-100b-4d9a-9653-5a27b34e1df2.jpeg',
  };
  const playlistFirstEp = 'PLu0u5uG3noI7oeyQXdfbWp1X3juA9z_NW';

  $$('#mediaGrid .media-card').forEach(card => {
    const link = card.querySelector('a.thumb-link, a.read');
    if (!link) return;
    const href = link.href;
    let src = null;
    const watch = href.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/);
    if (watch) src = `https://img.youtube.com/vi/${watch[1]}/mqdefault.jpg`;
    else if (href.includes(playlistFirstEp)) src = 'https://img.youtube.com/vi/Xgpw2nyJo90/mqdefault.jpg';
    else for (const key in previewThumbs) if (href.includes(key)) { src = previewThumbs[key]; break; }
    if (!src) return;
    const thumb = card.querySelector('.thumb');
    if (!thumb || thumb.querySelector('img.thumb-img')) return;
    const img = document.createElement('img');
    img.className = 'thumb-img';
    img.loading = 'lazy';
    img.alt = '';
    img.src = src;
    img.onerror = () => { img.remove(); };
    thumb.prepend(img);
  });

  // ---- sort media cards by year (newest first) ----
  (() => {
    const grid = $('#mediaGrid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.media-card'));
    const keyOf = (card) => {
      // Pull the first year (and optional /MM) out of the .meta line
      const meta = card.querySelector('.meta');
      const text = meta ? meta.textContent : '';
      const m = text.match(/(\d{4})(?:\/(\d{1,2}))?/);
      const year = m ? parseInt(m[1], 10) : 0;
      const month = m && m[2] ? parseInt(m[2], 10) : 0;
      // Cards without a year (year=0) should fall to the bottom
      return year === 0 ? -Infinity : year * 100 + month;
    };
    cards.sort((a, b) => keyOf(b) - keyOf(a));
    cards.forEach(c => grid.appendChild(c));
  })();

  // ---- media filter ----
  const filterBar = $('#filterBar');
  const mediaCards = $$('#mediaGrid .media-card');
  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;
    const filter = btn.dataset.filter;
    $$('.filter-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    mediaCards.forEach(card => {
      const cat = card.dataset.cat;
      card.style.display = (filter === 'all' || filter === cat) ? '' : 'none';
    });
  });

  // ---- reveal on scroll ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  // ---- counter animation ----
  const counterIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const dur = 1400;
        const t0 = performance.now();
        const fmt = n => target >= 1000 ? n.toLocaleString() : String(n);
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = fmt(target);
        };
        requestAnimationFrame(tick);
        counterIo.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  $$('[data-count]').forEach(el => counterIo.observe(el));

  // ---- module wheel ----
  const wheel = $('#modelWheel');
  if (wheel) {
    const setActive = (n) => {
      $$('.wheel-segment').forEach(s => s.classList.toggle('active', s.dataset.seg === n));
      $$('.wheel-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === n));
    };
    $$('.wheel-segment').forEach(seg => {
      seg.addEventListener('click', () => setActive(seg.dataset.seg));
      seg.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(seg.dataset.seg); }
      });
    });
  }

  // ---- patient journey ----
  const flowDetail = $('#flowDetail');
  $$('#flowSteps .flow-step').forEach(step => {
    step.addEventListener('click', () => {
      const n = step.dataset.step;
      $$('#flowSteps .flow-step').forEach(s => s.classList.toggle('active', s === step));
      flowDetail.dataset.active = n;
      $$('.flow-detail-content').forEach(c => c.classList.toggle('active', c.dataset.content === n));
    });
  });

  // ---- donut chart animation ----
  const CIRC = 2 * Math.PI * 50; // ≈314.16
  $$('.donut-fill').forEach(c => {
    c.style.strokeDasharray = CIRC;
    c.style.strokeDashoffset = CIRC;
  });
  const donutIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const c = entry.target;
        const pct = Math.max(0, Math.min(100, parseFloat(c.dataset.pct)));
        c.style.strokeDashoffset = CIRC - (CIRC * pct / 100);
        donutIo.unobserve(c);
      }
    });
  }, { threshold: 0.4 });
  $$('.donut-fill').forEach(c => donutIo.observe(c));

  // ---- bar chart animation ----
  const barIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const b = entry.target;
        const w = parseFloat(b.dataset.w);
        b.style.width = w + '%';
        barIo.unobserve(b);
      }
    });
  }, { threshold: 0.4 });
  $$('.bar-fill').forEach(b => barIo.observe(b));

  // ============================================================
  // GALLERIES (Friendly Care Day) — generated dynamically
  // Each year has a palette + 4 stylised scene placeholders.
  // Replace with real photos by editing the SVG inside .gal-thumb,
  // or swap the entire SVG for an <img src="...">.
  // ============================================================
  const SCENES = {
    opening: `<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
      <rect x="86" y="58" width="28" height="40" fill="#fff" opacity=".95"/>
      <rect x="80" y="52" width="40" height="10" fill="#fff" opacity=".95"/>
      <circle cx="100" cy="42" r="7" fill="#fff" opacity=".95"/>
      <rect x="91" y="48" width="18" height="14" rx="3" fill="#fff" opacity=".95"/>
      <g fill="#000" fill-opacity=".42">
        <circle cx="22" cy="118" r="6"/><rect x="16" y="121" width="12" height="22"/>
        <circle cx="44" cy="121" r="5"/><rect x="39" y="123" width="10" height="20"/>
        <circle cx="64" cy="116" r="6"/><rect x="58" y="119" width="12" height="24"/>
        <circle cx="82" cy="119" r="5"/><rect x="77" y="121" width="10" height="22"/>
        <circle cx="118" cy="119" r="5"/><rect x="113" y="121" width="10" height="22"/>
        <circle cx="138" cy="116" r="6"/><rect x="132" y="119" width="12" height="24"/>
        <circle cx="158" cy="121" r="5"/><rect x="153" y="123" width="10" height="20"/>
        <circle cx="180" cy="118" r="6"/><rect x="174" y="121" width="12" height="22"/>
      </g>
    </svg>`,
    dialogue: `<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
      <g fill="#fff" opacity=".92">
        <circle cx="60" cy="58" r="13"/>
        <path d="M 42 72 Q 42 110 60 130 L 78 130 Q 78 110 78 72 Z"/>
        <circle cx="140" cy="58" r="13"/>
        <path d="M 122 72 Q 122 110 140 130 L 158 130 Q 158 110 158 72 Z"/>
      </g>
      <g fill="#fff" opacity=".7">
        <circle cx="100" cy="76" r="5"/>
        <circle cx="92" cy="86" r="3"/>
        <circle cx="86" cy="92" r="2"/>
      </g>
    </svg>`,
    workshop: `<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
      <g fill="#fff" opacity=".88">
        <circle cx="100" cy="40" r="9"/>
        <rect x="93" y="48" width="14" height="20" rx="3"/>
        <circle cx="56" cy="64" r="9"/>
        <rect x="49" y="72" width="14" height="20" rx="3"/>
        <circle cx="144" cy="64" r="9"/>
        <rect x="137" y="72" width="14" height="20" rx="3"/>
        <circle cx="50" cy="108" r="9"/>
        <rect x="43" y="116" width="14" height="22" rx="3"/>
        <circle cx="150" cy="108" r="9"/>
        <rect x="143" y="116" width="14" height="22" rx="3"/>
        <circle cx="100" cy="124" r="9"/>
      </g>
      <circle cx="100" cy="84" r="20" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 3" opacity=".55"/>
    </svg>`,
    display: `<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
      <rect x="38" y="22" width="124" height="72" rx="3" fill="#fff" opacity=".96"/>
      <rect x="46" y="32" width="68" height="6" fill="#000" opacity=".55"/>
      <rect x="46" y="44" width="44" height="4" fill="#000" opacity=".4"/>
      <rect x="46" y="54" width="56" height="4" fill="#000" opacity=".4"/>
      <rect x="46" y="64" width="32" height="4" fill="#000" opacity=".4"/>
      <circle cx="138" cy="62" r="14" fill="#ea580c" opacity=".7"/>
      <line x1="98" y1="94" x2="102" y2="118" stroke="#fff" stroke-width="3" opacity=".7"/>
      <g fill="#000" opacity=".55">
        <circle cx="100" cy="124" r="8"/>
        <rect x="91" y="130" width="18" height="20"/>
      </g>
    </svg>`,
    panel: `<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
      <rect x="20" y="100" width="160" height="6" fill="#fff" opacity=".5"/>
      <g fill="#fff" opacity=".92">
        <circle cx="50" cy="62" r="11"/>
        <rect x="38" y="74" width="24" height="30" rx="4"/>
        <circle cx="100" cy="58" r="12"/>
        <rect x="87" y="71" width="26" height="33" rx="4"/>
        <circle cx="150" cy="62" r="11"/>
        <rect x="138" y="74" width="24" height="30" rx="4"/>
      </g>
      <line x1="60" y1="40" x2="80" y2="40" stroke="#fff" stroke-width="2" opacity=".5"/>
      <line x1="120" y1="40" x2="140" y2="40" stroke="#fff" stroke-width="2" opacity=".5"/>
    </svg>`,
    award: `<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
      <g fill="#fff" opacity=".96">
        <circle cx="100" cy="58" r="22" stroke="#ea580c" stroke-width="3" fill="#fff"/>
        <path d="M 88 76 L 84 110 L 100 100 L 116 110 L 112 76 Z"/>
      </g>
      <text x="100" y="64" text-anchor="middle" font-family="serif" font-size="20" font-style="italic" fill="#ea580c">★</text>
      <g fill="#fff" opacity=".5">
        <circle cx="38" cy="44" r="2"/>
        <circle cx="160" cy="40" r="2"/>
        <circle cx="170" cy="80" r="2"/>
        <circle cx="32" cy="86" r="2"/>
      </g>
    </svg>`,
  };

  const PALETTES = {
    '2025': ['#b0492a,#7a9a6e','#7c3a1f,#5a7a52','#a04020,#637e4f','#7c3a1f,#8aab7a'],
    '2024': ['#5a7a52,#8a6a3a','#637e4f,#a07842','#7a9a6e,#9c6f3a','#5a7a52,#7e5b32'],
    '2021': ['#5a7a8a,#7a6a52','#4a6a7a,#6a5942','#637e8e,#7e6850','#4a6a7a,#7a6750'],
    '2020': ['#7c3a1f,#9c6f3a','#8a4225,#a07a44','#9c4a2a,#b08850','#7c3a1f,#8a6a3a'],
    '2018': ['#92400e,#c0593a','#a16207,#c66a3e','#b45309,#d97a4a','#854d0e,#a85a30'],
  };

  const GALLERY_DATA = {
    '2025': [
      {img:'assets/Poster101.jpg',     zh:'活動主視覺海報',                en:'Event main poster'},
      {img:'assets/PosterBG.jpg',      zh:'嘉年華視覺',                   en:'Carnival visual'},
      {img:'assets/liza.jpeg',         zh:'《Eyes on Ukraine》劇照',     en:'Eyes on Ukraine — film still'},
      {img:'assets/01RK.jpeg',         zh:'劉仁凱｜性別論壇講者',          en:'Liu Ren-Kai · Gender Forum speaker'},
      {img:'assets/02CY.jpeg',         zh:'謝佳吟護理師｜友愛論壇講者',     en:'Hsieh Chia-Yin, RN · Friendly Medicine Forum'},
      {img:'assets/prize.png',         zh:'Love Wins Film Festival 榮譽', en:'Honored at Love Wins Film Festival'},
    ],
    '2024': [
      {img:'assets/Carnival POster.jpg', zh:'2024 嘉年華海報',          en:'2024 carnival poster'},
      {img:'assets/202401.jpg',          zh:'2024 活動現場',            en:'2024 event scene'},
      {img:'assets/202403.JPG',          zh:'2024 活動花絮',            en:'2024 event highlights'},
      {img:'assets/202404.JPG',          zh:'2024 活動花絮',            en:'2024 event highlights'},
      {img:'assets/202405.jpg',          zh:'2024 活動花絮',            en:'2024 event highlights'},
    ],
    '2021': [
      {scene:'dialogue', zh:'遠距諮詢與電話追蹤',       en:'Tele-consultation & phone follow-up'},
      {scene:'workshop', zh:'隔離期個案管理',           en:'Isolation-period case management'},
      {scene:'display',  zh:'慢箋延長與代領藥',         en:'Extended prescriptions & proxy pickup'},
      {scene:'panel',    zh:'疫情下心理支持',           en:'Mental-health support under COVID-19'},
    ],
    '2020': [
      {scene:'workshop', zh:'全院友善醫療教育訓練',     en:'Hospital-wide friendly-care training'},
      {scene:'display',  zh:'倡議文宣與動線標示',       en:'Advocacy materials & signage'},
      {scene:'dialogue', zh:'匿名篩檢動線設計',         en:'Anonymous screening pathway design'},
      {scene:'panel',    zh:'跨科共識會議',            en:'Cross-specialty alignment'},
    ],
    '2018': [
      {scene:'display',  zh:'問卷調查啟動',            en:'Survey launch'},
      {scene:'dialogue', zh:'病人經驗訪談',            en:'Patient experience interviews'},
      {scene:'workshop', zh:'員工焦點團體',            en:'Staff focus groups'},
      {scene:'opening',  zh:'院內結果發表',            en:'Internal findings briefing'},
    ],
  };

  // build galleries
  Object.keys(GALLERY_DATA).forEach(year => {
    const panel = document.querySelector(`.year-panel[data-panel="${year}"]`);
    if (!panel) return;
    const items = GALLERY_DATA[year];
    const palette = PALETTES[year];

    const section = document.createElement('div');
    section.className = 'gallery-section';
    section.innerHTML = `
      <div class="gal-label">
        <span class="lang-zh">活動現場 · 點擊放大</span>
        <span class="lang-en">From the day · click to enlarge</span>
      </div>
      <div class="gallery-grid"></div>
    `;
    const grid = section.querySelector('.gallery-grid');

    items.forEach((it, idx) => {
      const [c1, c2] = palette[idx % palette.length].split(',');
      const thumb = document.createElement('div');
      thumb.className = 'gal-thumb';
      thumb.style.background = it.img ? '#3a261a' : `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
      thumb.dataset.year = year;
      thumb.dataset.index = idx;
      const visual = it.img
        ? `<img src="${it.img}" alt="${it.zh}" style="width:100%;height:100%;object-fit:cover;display:block">`
        : SCENES[it.scene];
      thumb.innerHTML = `
        ${visual}
        <div class="gal-cap"><span class="lang-zh">${it.zh}</span><span class="lang-en">${it.en}</span></div>
        <div class="gal-zoom">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
        </div>
      `;
      grid.appendChild(thumb);
    });

    panel.appendChild(section);
  });

  // ---- lightbox ----
  const lb = $('#lightbox');
  const lbFrame = $('#lbFrame');
  const lbTitle = $('#lbTitle');
  const lbMeta = $('#lbMeta');
  const lbClose = $('#lbClose');
  const lbPrev = $('#lbPrev');
  const lbNext = $('#lbNext');
  let lbState = { year: null, index: 0 };

  const renderLb = () => {
    const items = GALLERY_DATA[lbState.year];
    if (!items) return;
    const it = items[lbState.index];
    const [c1, c2] = PALETTES[lbState.year][lbState.index % PALETTES[lbState.year].length].split(',');
    if (it.img) {
      lbFrame.style.background = '#2b1d12';
      lbFrame.innerHTML = `<img src="${it.img}" alt="${it.zh}" style="max-width:100%;max-height:100%;object-fit:contain;display:block;margin:0 auto">`;
    } else {
      lbFrame.style.background = `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
      lbFrame.innerHTML = SCENES[it.scene];
    }
    lbTitle.innerHTML = `<span class="lang-zh">${it.zh}</span><span class="lang-en">${it.en}</span>`;
    lbMeta.textContent = `${lbState.year} · ${lbState.index + 1} / ${items.length}`;
  };
  const openLb = (year, index) => {
    lbState = { year, index };
    renderLb();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };
  const moveLb = (delta) => {
    const items = GALLERY_DATA[lbState.year];
    lbState.index = (lbState.index + delta + items.length) % items.length;
    renderLb();
  };

  document.addEventListener('click', e => {
    const thumb = e.target.closest('.gal-thumb');
    if (thumb) openLb(thumb.dataset.year, parseInt(thumb.dataset.index, 10));
  });
  lbClose.addEventListener('click', closeLb);
  lbPrev.addEventListener('click', () => moveLb(-1));
  lbNext.addEventListener('click', () => moveLb(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') moveLb(-1);
    if (e.key === 'ArrowRight') moveLb(1);
  });
})();
