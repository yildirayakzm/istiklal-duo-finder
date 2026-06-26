/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Header Enhancements (Global)
 *  Adds: clickable logo, live clock, player search bar
 *  Include on ALL pages AFTER the page <script>.
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ── 0. INJECT WAVING FLAG CSS ──
  (function injectFlagStyles() {
    var style = document.createElement('style');
    style.textContent = [
      '/* ── Turkish Flag Wave Animation ── */',
      '@keyframes flagWave {',
      '  0%   { transform: rotate(0deg) scaleX(1); }',
      '  10%  { transform: rotate(2deg) scaleX(1.03); }',
      '  20%  { transform: rotate(-1deg) scaleX(0.98); }',
      '  30%  { transform: rotate(3deg) scaleX(1.04); }',
      '  40%  { transform: rotate(-2deg) scaleX(0.97); }',
      '  50%  { transform: rotate(1deg) scaleX(1.02); }',
      '  60%  { transform: rotate(-1.5deg) scaleX(0.99); }',
      '  70%  { transform: rotate(2.5deg) scaleX(1.03); }',
      '  80%  { transform: rotate(-0.5deg) scaleX(1); }',
      '  90%  { transform: rotate(1.5deg) scaleX(1.01); }',
      '  100% { transform: rotate(0deg) scaleX(1); }',
      '}',
      '@keyframes flagPoleShine {',
      '  0%, 100% { opacity: 0.6; }',
      '  50%      { opacity: 1; }',
      '}',
      '.istiklal-flag-wrapper {',
      '  display: inline-flex;',
      '  align-items: center;',
      '  margin-left: 6px;',
      '  position: relative;',
      '  vertical-align: middle;',
      '}',
      '.istiklal-flag-pole {',
      '  width: 2px;',
      '  height: 22px;',
      '  background: linear-gradient(180deg, #FFD700 0%, #C8A832 50%, #FFD700 100%);',
      '  border-radius: 1px;',
      '  flex-shrink: 0;',
      '  animation: flagPoleShine 3s ease-in-out infinite;',
      '  box-shadow: 0 0 4px rgba(255, 215, 0, 0.4);',
      '}',
      '.istiklal-flag-pole::before {',
      '  content: "";',
      '  display: block;',
      '  width: 5px;',
      '  height: 5px;',
      '  background: #FFD700;',
      '  border-radius: 50%;',
      '  position: absolute;',
      '  top: -2px;',
      '  left: -1.5px;',
      '  box-shadow: 0 0 6px rgba(255, 215, 0, 0.6);',
      '}',
      '.istiklal-flag-svg {',
      '  animation: flagWave 4s ease-in-out infinite;',
      '  transform-origin: left center;',
      '  filter: drop-shadow(0 1px 3px rgba(0,0,0,0.3));',
      '  margin-left: 0px;',
      '}',
      '.istiklal-flag-wrapper:hover .istiklal-flag-svg {',
      '  animation-duration: 1.5s;',
      '  filter: drop-shadow(0 2px 6px rgba(255,0,0,0.3));',
      '}',
      ''
    ].join('\n');
    document.head.appendChild(style);
  })();

  // ── Helper: Create Turkish Flag SVG Element ──
  function createTurkishFlag(size) {
    var s = size || 18;
    var wrapper = document.createElement('span');
    wrapper.className = 'istiklal-flag-wrapper';
    wrapper.title = 'Türk Bayrağı 🇹🇷';
    wrapper.innerHTML =
      '<span class="istiklal-flag-pole" style="height:' + (s + 4) + 'px;"></span>' +
      '<svg class="istiklal-flag-svg" width="' + s + '" height="' + Math.round(s * 0.67) + '" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="1200" height="800" fill="#E30A17"/>' +
      '<circle cx="400" cy="400" r="200" fill="#fff"/>' +
      '<circle cx="450" cy="400" r="160" fill="#E30A17"/>' +
      '<polygon fill="#fff" fill-rule="nonzero" points="566.6,400 747.5,341.2 635.7,495.1 635.7,304.9 747.5,458.8"/>' +
      '</svg>';
    return wrapper;
  }

  // ── 1. CLICKABLE LOGO + FLAG ──
  // Find <h1> containing İSTİKLAL and wrap text in <a>, add waving flag
  (function makeLogoClickable() {
    // Check for <h1> or <a> with İSTİKLAL text
    var headers = document.querySelectorAll('header h1, header a');
    headers.forEach(function (el) {
      if (el.textContent.trim() === 'İSTİKLAL' && el.tagName === 'H1') {
        // Already an h1 — wrap inner content in a link
        var link = document.createElement('a');
        link.href = '../duo_finder_dashboard_yeni/code.html';
        link.className = el.className;
        link.style.cssText = el.style.cssText;
        link.textContent = 'İSTİKLAL';
        link.style.textDecoration = 'none';
        link.style.display = 'inline-flex';
        link.style.alignItems = 'center';
        link.style.gap = '4px';
        link.appendChild(createTurkishFlag(24));
        el.className = '';
        el.style.cssText = '';
        el.innerHTML = '';
        el.appendChild(link);
      }
    });
  })();

  // ── 1b. ADD FLAG TO ALL İSTİKLAL BRAND ELEMENTS ──
  (function addFlagToAllBrands() {
    // Target all spans/elements that contain exactly "İSTİKLAL" brand text
    var allEls = document.querySelectorAll('span, h1, a, div');
    allEls.forEach(function (el) {
      // Only target elements with exact İSTİKLAL text (not nested children with it)
      if (el.childElementCount === 0 && el.textContent.trim() === 'İSTİKLAL') {
        // Skip if flag already added
        if (el.parentElement && el.parentElement.querySelector('.istiklal-flag-wrapper')) return;
        if (el.querySelector && el.querySelector('.istiklal-flag-wrapper')) return;
        // Determine size based on element font size
        var computedSize = window.getComputedStyle(el).fontSize;
        var pxSize = parseInt(computedSize, 10) || 16;
        var flagSize = Math.max(16, Math.min(pxSize + 2, 32));
        el.style.display = 'inline-flex';
        el.style.alignItems = 'center';
        el.style.gap = '4px';
        el.appendChild(createTurkishFlag(flagSize));
      }
    });
  })();

  // ── 2. LIVE CLOCK & DATE ──
  (function initLiveClock() {
    // Check if clock already exists (dashboard has its own)
    var existingClock = document.getElementById('live-clock');

    // Find the right-side div in header (contains notif bell)
    var header = document.querySelector('header');
    if (!header) return;
    var rightDiv = header.querySelector('.flex.items-center.gap-4');
    if (!rightDiv) return;

    var clockEl;
    if (existingClock) {
      clockEl = existingClock;
    } else {
      // Create clock element and insert before notification bell
      clockEl = document.createElement('div');
      clockEl.id = 'live-clock';
      clockEl.className = 'hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#3a494b]/40 bg-[#111318]/60';
      clockEl.innerHTML =
        '<span class="material-symbols-outlined text-[#00f2ff]/70 text-sm">schedule</span>' +
        '<span id="clock-text" class="font-[\'Space_Grotesk\'] font-medium text-[11px] tracking-wider text-[#e2e2e8]/80"></span>';
      rightDiv.insertBefore(clockEl, rightDiv.firstChild);
    }

    function updateClock() {
      var now = new Date();
      var h = String(now.getHours()).padStart(2, '0');
      var m = String(now.getMinutes()).padStart(2, '0');
      var s = String(now.getSeconds()).padStart(2, '0');
      var d = String(now.getDate()).padStart(2, '0');
      var mo = String(now.getMonth() + 1).padStart(2, '0');
      var y = now.getFullYear();
      var formatted = h + ':' + m + ':' + s + ' | ' + d + '.' + mo + '.' + y;

      var textEl = document.getElementById('clock-text');
      if (textEl) {
        textEl.textContent = formatted;
      } else if (clockEl) {
        clockEl.textContent = formatted;
      }
    }

    updateClock();
    setInterval(updateClock, 1000);
  })();

  // ── 3. HEADER SEARCH BAR ──
  (function initHeaderSearch() {
    var header = document.querySelector('header');
    if (!header) return;
    var rightDiv = header.querySelector('.flex.items-center.gap-4');
    if (!rightDiv) return;

    // Don't add if already present
    if (document.getElementById('header-search-wrapper')) return;

    // Create search wrapper
    var wrapper = document.createElement('div');
    wrapper.id = 'header-search-wrapper';
    wrapper.className = 'relative hidden sm:block';
    wrapper.innerHTML =
      '<div class="relative">' +
      '<span class="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#00f2ff]/70 text-base pointer-events-none">search</span>' +
      '<input id="header-search-input" type="text" placeholder="Oyuncu Bul..." ' +
      'class="w-40 lg:w-52 py-1.5 pl-8 pr-3 text-xs rounded-full bg-[#111318]/80 text-[#e2e2e8] placeholder-[#849495]/50 outline-none transition-all ' +
      'focus:w-56 lg:focus:w-64" ' +
      'style="font-family:\'Space Grotesk\',sans-serif; border: 1px solid rgba(0,242,255,0.35); box-shadow: 0 0 8px rgba(0,242,255,0.15), inset 0 0 4px rgba(0,242,255,0.05);" ' +
      'onfocus="this.style.borderColor=\'rgba(0,242,255,0.7)\';this.style.boxShadow=\'0 0 14px rgba(0,242,255,0.3), inset 0 0 6px rgba(0,242,255,0.08)\';" ' +
      'onblur="this.style.borderColor=\'rgba(0,242,255,0.35)\';this.style.boxShadow=\'0 0 8px rgba(0,242,255,0.15), inset 0 0 4px rgba(0,242,255,0.05)\';" />' +
      '</div>' +
      '<div id="header-search-results" class="hidden absolute right-0 top-full mt-2 w-72 max-h-72 overflow-y-auto bg-[#1e2024]/95 backdrop-blur-xl border border-[#00f2ff]/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[70] p-2"></div>';

    // Insert before the notification bell for consistent placement
    var notifWrapper = document.getElementById('notif-wrapper');
    if (notifWrapper) {
      rightDiv.insertBefore(wrapper, notifWrapper);
    } else {
      rightDiv.insertBefore(wrapper, rightDiv.firstChild);
    }

    // Search logic — searches ALL_PLAYERS pool from localStorage or a default set
    var searchInput = document.getElementById('header-search-input');
    var searchResults = document.getElementById('header-search-results');

    var SEARCH_PLAYERS = [];

    // Also include contacts from localStorage
    function getSearchPool() {
      var pool = SEARCH_PLAYERS.slice();
      try {
        var contacts = JSON.parse(localStorage.getItem('duo_contacts_list') || '[]');
        contacts.forEach(function (c) {
          if (!pool.find(function (p) { return p.id === c.id; })) {
            pool.push({ id: c.id, game: '—', rank: '—' });
          }
        });
      } catch (e) { }
      return pool;
    }

    searchInput.addEventListener('input', function () {
      var q = searchInput.value.trim().toLowerCase();
      if (!q) {
        searchResults.classList.add('hidden');
        return;
      }
      var results = getSearchPool().filter(function (p) { return p.id.toLowerCase().indexOf(q) !== -1; });
      searchResults.innerHTML = '';
      if (results.length === 0) {
        searchResults.innerHTML =
          '<div class="flex flex-col items-center py-4 opacity-60">' +
          '<span class="material-symbols-outlined text-3xl text-[#3a494b] mb-1">person_off</span>' +
          '<p class="text-[11px] text-[#849495]">Oyuncu bulunamadı</p>' +
          '</div>';
        searchResults.classList.remove('hidden');
        return;
      }
      results.slice(0, 6).forEach(function (p) {
        var card = document.createElement('div');
        card.className = 'flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#00f2ff]/5 cursor-pointer transition-all';
        card.innerHTML =
          '<div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f2ff]/20 to-[#00dbe7]/10 flex items-center justify-center flex-shrink-0">' +
          '<span class="material-symbols-outlined text-[#00f2ff] text-sm">person</span>' +
          '</div>' +
          '<div class="flex-1 min-w-0">' +
          '<p class="text-xs font-bold text-[#e2e2e8] truncate">' + p.id + '</p>' +
          '<p class="text-[9px] text-[#849495]">' + p.game + ' • ' + p.rank + '</p>' +
          '</div>';
        card.addEventListener('click', function () {
          window.location.href = '../oyuncu_profili/code.html?view=public&user=' + p.id.toLowerCase();
        });
        searchResults.appendChild(card);
      });
      searchResults.classList.remove('hidden');
    });

    searchInput.addEventListener('focus', function () {
      if (searchInput.value.trim()) searchResults.classList.remove('hidden');
    });

    // Close results on outside click
    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) {
        searchResults.classList.add('hidden');
      }
    });

    // Close on Escape
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        searchResults.classList.add('hidden');
        searchInput.blur();
      }
    });
  })();

})();
