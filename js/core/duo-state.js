/**
 * İSTİKLAL — Shared State Manager (duo-state.js)
 * Handles: Theme persistence, Notification badge memory,
 *          Page fade transitions, Online status dot.
 * Include this file on EVERY page via <script src="../duo-state.js"></script>
 */
(function () {
  'use strict';

  // ═══════════════════════════════════════════
  // 1. THEME SYSTEM — accent colors only
  //    Dark glass backgrounds stay untouched.
  // ═══════════════════════════════════════════
  var THEMES = {
    'nexus-blue': {
      label: 'Nexus Blue',
      primary: '#00f2ff',
      primaryRgb: '0,242,255',
      gradFrom: '#00dbe7',
      gradTo: '#00f2ff',
      glow: 'rgba(0,242,255,0.4)',
      glowSoft: 'rgba(0,242,255,0.15)',
      glowStrong: 'rgba(0,242,255,0.6)',
      shadow: 'rgba(0,242,255,0.3)',
      border: 'rgba(0,242,255,0.1)',
      borderMd: 'rgba(0,242,255,0.3)',
      borderHi: 'rgba(0,242,255,0.5)'
    },
    'crimson-fury': {
      label: 'Crimson Fury',
      primary: '#ff2d55',
      primaryRgb: '255,45,85',
      gradFrom: '#e6002e',
      gradTo: '#ff2d55',
      glow: 'rgba(255,45,85,0.4)',
      glowSoft: 'rgba(255,45,85,0.15)',
      glowStrong: 'rgba(255,45,85,0.6)',
      shadow: 'rgba(255,45,85,0.3)',
      border: 'rgba(255,45,85,0.1)',
      borderMd: 'rgba(255,45,85,0.3)',
      borderHi: 'rgba(255,45,85,0.5)'
    },
    'emerald-ghost': {
      label: 'Emerald Ghost',
      primary: '#00ff88',
      primaryRgb: '0,255,136',
      gradFrom: '#00d97e',
      gradTo: '#00ff88',
      glow: 'rgba(0,255,136,0.4)',
      glowSoft: 'rgba(0,255,136,0.15)',
      glowStrong: 'rgba(0,255,136,0.6)',
      shadow: 'rgba(0,255,136,0.3)',
      border: 'rgba(0,255,136,0.1)',
      borderMd: 'rgba(0,255,136,0.3)',
      borderHi: 'rgba(0,255,136,0.5)'
    }
  };

  function applyTheme(themeId) {
    var t = THEMES[themeId];
    if (!t) themeId = 'nexus-blue', t = THEMES[themeId];
    localStorage.setItem('df_theme', themeId);

    var r = document.documentElement.style;
    r.setProperty('--df-primary', t.primary);
    r.setProperty('--df-primary-rgb', t.primaryRgb);
    r.setProperty('--df-grad-from', t.gradFrom);
    r.setProperty('--df-grad-to', t.gradTo);
    r.setProperty('--df-glow', t.glow);
    r.setProperty('--df-glow-soft', t.glowSoft);
    r.setProperty('--df-glow-strong', t.glowStrong);
    r.setProperty('--df-shadow', t.shadow);
    r.setProperty('--df-border', t.border);
    r.setProperty('--df-border-md', t.borderMd);
    r.setProperty('--df-border-hi', t.borderHi);

    // Recolor elements using hardcoded #00f2ff → var(--df-primary)
    // We inject a dynamic <style> that overrides the neon accent classes
    var styleId = 'df-theme-overrides';
    var existing = document.getElementById(styleId);
    if (existing) existing.remove();

    var css = document.createElement('style');
    css.id = styleId;
    css.textContent = '' +
      /* ── TEXT COLORS ── */
      '.text-\\[\\#00f2ff\\], .text-primary-container { color: ' + t.primary + ' !important; }' +
      '.text-\\[\\#00f2ff\\]\\/70 { color: ' + t.primary + ' !important; opacity: 0.7; }' +
      '.drop-shadow-\\[0_0_8px_rgba\\(0\\2c 242\\2c 255\\2c 0\\.4\\)\\] { filter: drop-shadow(0 0 8px ' + t.glow + ') !important; }' +
      '.drop-shadow-\\[0_0_10px_rgba\\(0\\2c 242\\2c 255\\2c 0\\.6\\)\\] { filter: drop-shadow(0 0 10px ' + t.glowStrong + ') !important; }' +

      /* ── NEON TEXT-SHADOW ── */
      '.neon-glow-blue { text-shadow: 0 0 12px ' + t.glowStrong + ' !important; }' +
      '.glow-sm { text-shadow: 0 0 10px ' + t.glow + ' !important; }' +

      /* ── BORDERS ── */
      '.border-\\[\\#00f2ff\\] { border-color: ' + t.primary + ' !important; }' +
      '.border-\\[\\#00f2ff\\]\\/10, .border-\\[\\#00f2ff\\]\\/15, .border-\\[\\#00f2ff\\]\\/20 { border-color: ' + t.border + ' !important; }' +
      '.border-\\[\\#00f2ff\\]\\/30, .border-\\[\\#00f2ff\\]\\/40, .border-\\[\\#00f2ff\\]\\/50 { border-color: ' + t.borderMd + ' !important; }' +
      '.border-primary-container { border-color: ' + t.primary + ' !important; }' +

      /* ── BG ACCENT ── */
      '.bg-\\[\\#00f2ff\\] { background-color: ' + t.primary + ' !important; }' +
      '.bg-\\[\\#00f2ff\\]\\/10, .bg-\\[\\#00f2ff\\]\\/5 { background-color: rgba(' + t.primaryRgb + ',0.1) !important; }' +
      '.bg-primary-container { background-color: ' + t.primary + ' !important; }' +

      /* ── BOX-SHADOW (neon cards) ── */
      '.neon-card-blue { box-shadow: 0 0 15px ' + t.border + ' !important; border-color: ' + t.border + ' !important; }' +

      /* ── GRADIENTS (buttons / nav active) ── */
      '.from-primary-fixed-dim { --tw-gradient-from: ' + t.gradFrom + ' !important; }' +
      '.to-primary-container { --tw-gradient-to: ' + t.gradTo + ' !important; }' +
      '.from-\\[\\#00dbe7\\] { --tw-gradient-from: ' + t.gradFrom + ' !important; }' +
      '.to-\\[\\#00f2ff\\] { --tw-gradient-to: ' + t.gradTo + ' !important; }' +

      /* ── SHADOW GLOWS ── */
      '.shadow-\\[0_0_20px_rgba\\(0\\2c 242\\2c 255\\2c 0\\.4\\)\\] { box-shadow: 0 0 20px ' + t.glow + ' !important; }' +
      '.shadow-\\[0_0_10px_rgba\\(0\\2c 242\\2c 255\\2c 0\\.3\\)\\] { box-shadow: 0 0 10px ' + t.shadow + ' !important; }' +
      '.shadow-\\[0_0_8px_rgba\\(0\\2c 242\\2c 255\\2c 0\\.8\\)\\] { box-shadow: 0 0 8px ' + t.glowStrong + ' !important; }' +
      '.shadow-\\[0_0_8px_\\#00f2ff\\] { box-shadow: 0 0 8px ' + t.primary + ' !important; }' +

      /* ── BOTTOM NAV active indicator ── */
      'nav.fixed.bottom-0 a .bg-\\[\\#00f2ff\\] { background-color: ' + t.primary + ' !important; }' +
      'nav.fixed.bottom-0 a .bg-\\[\\#00f2ff\\]\\/50 { background-color: rgba(' + t.primaryRgb + ',0.5) !important; }' +

      /* ── HOVER STATES ── */
      '.hover\\:text-\\[\\#00f2ff\\]:hover { color: ' + t.primary + ' !important; }' +
      '.hover\\:border-\\[\\#00f2ff\\]:hover { border-color: ' + t.primary + ' !important; }' +
      '.hover\\:bg-\\[\\#00f2ff\\]\\/5:hover { background-color: rgba(' + t.primaryRgb + ',0.05) !important; }' +
      '.hover\\:bg-\\[\\#00f2ff\\]\\/10:hover { background-color: rgba(' + t.primaryRgb + ',0.10) !important; }' +
      '.hover\\:bg-\\[\\#00f2ff\\]\\/20:hover { background-color: rgba(' + t.primaryRgb + ',0.20) !important; }' +

      /* ── LEFT PANEL live borders ── */
      '.border-\\[\\#00e5ff\\]\\/40 { border-color: ' + t.borderMd + ' !important; }' +
      '.shadow-\\[0_0_20px_rgba\\(0\\2c 229\\2c 255\\2c 0\\.15\\)\\] { box-shadow: 0 0 20px ' + t.glowSoft + ' !important; }' +

      /* ── SIDEBAR logo ── */
      '#sidebar .text-\\[\\#00f2ff\\] { color: ' + t.primary + ' !important; }' +

      /* ── FOCUS RINGS ── */
      '.focus\\:ring-\\[\\#00f2ff\\]\\/30:focus { --tw-ring-color: rgba(' + t.primaryRgb + ',0.3) !important; }' +
      '.focus\\:ring-primary-container\\/30:focus { --tw-ring-color: rgba(' + t.primaryRgb + ',0.3) !important; }' +
      '.focus\\:border-\\[\\#00f2ff\\]\\/30:focus { border-color: ' + t.borderMd + ' !important; }' +

      /* ── Sidebar theme buttons active state ── */
      '.df-theme-btn.active { border-color: ' + t.primary + ' !important; box-shadow: 0 0 12px ' + t.glow + '; }' +
      '.df-theme-btn.active .df-theme-label { color: ' + t.primary + ' !important; }' +

      /* ── Status dot color ── */
      '';

    document.head.appendChild(css);

    // Update active state on sidebar theme buttons
    var btns = document.querySelectorAll('.df-theme-btn');
    btns.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-theme') === themeId);
    });
  }

  // ═══════════════════════════════════════════
  // 2. NOTIFICATION BADGE MEMORY
  // ═══════════════════════════════════════════
  function isBadgeCleared() {
    return localStorage.getItem('df_notif_cleared') === 'true';
  }

  function hideBadge() {
    var badge = document.getElementById('notif-badge');
    if (badge) {
      badge.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      badge.style.transform = 'scale(0)';
      badge.style.opacity = '0';
      setTimeout(function () { badge.style.display = 'none'; }, 300);
    }
    localStorage.setItem('df_notif_cleared', 'true');
  }

  function checkBadgeOnLoad() {
    if (isBadgeCleared()) {
      var badge = document.getElementById('notif-badge');
      if (badge) badge.style.display = 'none';
    }
  }

  // ═══════════════════════════════════════════
  // 3. PAGE FADE TRANSITIONS
  // ═══════════════════════════════════════════
  function setupTransitions() {
    // Inject transition style
    var s = document.createElement('style');
    s.textContent = 'body{opacity:0;transition:opacity 0.35s ease}body.df-visible{opacity:1}';
    document.head.appendChild(s);

    // Fade in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add('df-visible');
      });
    });

    // Intercept bottom-nav links for fade-out
    var navLinks = document.querySelectorAll('nav.fixed.bottom-0 a[href]');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('javascript')) return;
        e.preventDefault();
        document.body.classList.remove('df-visible');
        setTimeout(function () { window.location.href = href; }, 300);
      });
    });
  }

  // ═══════════════════════════════════════════
  // 4. ONLINE STATUS DOT (injected next to profile)
  // ═══════════════════════════════════════════
  function injectStatusDot() {
    // Inject the pulse keyframe once
    var s = document.createElement('style');
    s.textContent = '@keyframes dfPulse{0%,100%{opacity:.4;box-shadow:0 0 4px #00ff88}50%{opacity:1;box-shadow:0 0 12px #00ff88,0 0 20px #00ff88}}' +
      '.df-status-dot{width:10px;height:10px;border-radius:50%;background:#00ff88;animation:dfPulse 2s ease-in-out infinite;flex-shrink:0;margin-right:4px;}';
    document.head.appendChild(s);

    // Find the profile name area in the header (top-right text block)
    var profileName = document.querySelector('header .text-right');
    if (profileName) {
      var dot = document.createElement('span');
      dot.className = 'df-status-dot';
      profileName.parentElement.insertBefore(dot, profileName);
      return;
    }
    // Fallback: just before the profile avatar link in header
    var avatarLink = document.querySelector('header a[href*="oyuncu_profili"]');
    if (avatarLink) {
      var dot2 = document.createElement('span');
      dot2.className = 'df-status-dot';
      avatarLink.parentElement.insertBefore(dot2, avatarLink);
    }
  }

  // ═══════════════════════════════════════════
  // 5. SIDEBAR THEME SECTION (injected via JS)
  // ═══════════════════════════════════════════
  function injectThemeSection() {
    var sidebarNav = document.querySelector('#sidebar nav');
    if (!sidebarNav) return;

    // Find the divider before logout
    var dividers = sidebarNav.querySelectorAll('.border-t');
    var insertBefore = dividers.length > 0 ? dividers[dividers.length - 1] : null;

    var section = document.createElement('div');
    section.className = 'px-4 py-4';
    section.innerHTML = '' +
      '<div class="flex items-center gap-2 mb-3">' +
        '<span class="material-symbols-outlined text-[#849495] text-lg">palette</span>' +
        '<span class="font-[\'Space_Grotesk\'] font-bold text-[11px] uppercase tracking-[0.15em] text-[#849495]">TEMA DEĞİŞTİR 🎨</span>' +
      '</div>' +
      '<div class="flex flex-col gap-2">' +
        '<button class="df-theme-btn flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#3a494b]/30 bg-[#111318]/40 hover:bg-[#111318]/60 transition-all" data-theme="nexus-blue">' +
          '<span style="width:14px;height:14px;border-radius:50%;background:#00f2ff;box-shadow:0 0 8px rgba(0,242,255,0.5);flex-shrink:0;"></span>' +
          '<span class="df-theme-label font-[\'Space_Grotesk\'] font-semibold text-xs text-[#b9cacb]">Nexus Blue</span>' +
        '</button>' +
        '<button class="df-theme-btn flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#3a494b]/30 bg-[#111318]/40 hover:bg-[#111318]/60 transition-all" data-theme="crimson-fury">' +
          '<span style="width:14px;height:14px;border-radius:50%;background:#ff2d55;box-shadow:0 0 8px rgba(255,45,85,0.5);flex-shrink:0;"></span>' +
          '<span class="df-theme-label font-[\'Space_Grotesk\'] font-semibold text-xs text-[#b9cacb]">Crimson Fury</span>' +
        '</button>' +
        '<button class="df-theme-btn flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#3a494b]/30 bg-[#111318]/40 hover:bg-[#111318]/60 transition-all" data-theme="emerald-ghost">' +
          '<span style="width:14px;height:14px;border-radius:50%;background:#00ff88;box-shadow:0 0 8px rgba(0,255,136,0.5);flex-shrink:0;"></span>' +
          '<span class="df-theme-label font-[\'Space_Grotesk\'] font-semibold text-xs text-[#b9cacb]">Emerald Ghost</span>' +
        '</button>' +
      '</div>';

    if (insertBefore) {
      sidebarNav.insertBefore(section, insertBefore);
    } else {
      sidebarNav.appendChild(section);
    }

    // Wire up theme buttons
    section.querySelectorAll('.df-theme-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.getAttribute('data-theme'));
      });
    });
  }

  // ═══════════════════════════════════════════
  // INIT — run on every page
  // ═══════════════════════════════════════════
  function init() {
    // Apply saved theme (or default)
    var savedTheme = localStorage.getItem('df_theme') || 'nexus-blue';
    applyTheme(savedTheme);

    // Badge check
    checkBadgeOnLoad();

    // Inject UI elements
    injectStatusDot();
    injectThemeSection();

    // Page transitions
    setupTransitions();
  }

  // Expose API for other scripts
  window.DFState = {
    applyTheme: applyTheme,
    clearNotifications: hideBadge,
    themes: THEMES
  };

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
