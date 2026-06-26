/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Theme Switcher (theme-switcher.js)
 *  Dark ↔ Soft Light toggle with CSS variable overrides.
 *  Persists choice in localStorage ('preferred_theme').
 *  Injects sidebar toggle + CSS. Include on ALL pages.
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'preferred_theme';

  // ── 1. Inject CSS Variables & Overrides ──
  var themeCss = document.createElement('style');
  themeCss.id = 'theme-switcher-css';
  themeCss.textContent = [
    /* ══════ PROFESSIONAL LIGHT MODE OVERRIDES ══════ */
    'body.light-mode {',
    '  --accent-color: #3B82F6 !important;',
    '  --bg-sidebar: #FFFFFF !important;',
    '  --text-primary: #1F2937 !important;',
    '  --neon-glow: none !important;',
    '  background-color: #F4F7FA !important;',
    '  color: #1F2937 !important;',
    '}',
    
    /* ── Background surfaces (Body) ── */
    'body.light-mode .bg-background,',
    'body.light-mode .bg-\\[\\#111318\\],',
    'body.light-mode .bg-\\[\\#0d0f13\\] {',
    '  background-color: #F4F7FA !important;',
    '}',

    /* ── Cards / Sidebar / Panels (Pure White) ── */
    'body.light-mode .bg-\\[\\#1a1c20\\],',
    'body.light-mode .bg-\\[\\#1a1c20\\]\\/95,',
    'body.light-mode .bg-\\[\\#1a1c20\\]\\/80,',
    'body.light-mode .bg-\\[\\#1a1c20\\]\\/60,',
    'body.light-mode .bg-\\[\\#111318\\]\\/80,',
    'body.light-mode .bg-\\[\\#111318\\]\\/90,',
    'body.light-mode .bg-\\[\\#282a2e\\],',
    'body.light-mode .bg-\\[\\#282a2e\\]\\/60,',
    'body.light-mode .glass-panel,',
    'body.light-mode [class*="neon-card"] {',
    '  background: #FFFFFF !important;',
    '  border: 1px solid #E1E8ED !important;',
    '  box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important;',
    '  backdrop-filter: none !important;',
    '  -webkit-backdrop-filter: none !important;',
    '  border-radius: 16px !important;',
    '}',
    /* Explicitly kill all internal card borders if they exist */
    'body.light-mode .border-\\[\\#3a494b\\]\\/30 {',
    '  border-color: #E1E8ED !important;',
    '}',

    /* ── Sidebar specifically ── */
    'body.light-mode #sidebar {',
    '  background: #FFFFFF !important;',
    '  border-right: 1px solid #E1E8ED !important;',
    '  box-shadow: 4px 0 20px rgba(0,0,0,0.05) !important;',
    '}',

    /* ── Bottom nav ── */
    'body.light-mode .nexus-bottom-nav {',
    '  background: #FFFFFF !important;',
    '  border-top: 1px solid #E1E8ED !important;',
    '  box-shadow: 0 -4px 20px rgba(0,0,0,0.05) !important;',
    '}',
    
    /* ── Footer Specifically (Always Dark #111827 with White Text) ── */
    'body.light-mode footer {',
    '  background: #111827 !important;',
    '  border-top: 1px solid #1F2937 !important;',
    '}',
    'body.light-mode footer * {',
    '  color: #FFFFFF !important;',
    '  border-color: rgba(255,255,255,0.1) !important;',
    '}',
    'body.light-mode footer .text-\\[\\#849495\\],',
    'body.light-mode footer .text-\\[\\#b9cacb\\] {',
    '  color: rgba(255,255,255,0.7) !important;',
    '}',
    'body.light-mode footer svg {',
    '  color: #FFFFFF !important;',
    '}',
    /* Fix Integration Boxes which were overridden by global bg-[#1a1c20] -> #FFFFFF */
    'body.light-mode footer .group.bg-\\[\\#1a1c20\\] {',
    '  background: #1F2937 !important;',
    '  border-color: rgba(255,255,255,0.1) !important;',
    '}',
    'body.light-mode footer .group.bg-\\[\\#1a1c20\\] svg {',
    '  color: #FFFFFF !important;',
    '  fill: #FFFFFF !important;',
    '}',

    /* ── Header ── */
    'body.light-mode header,',
    'body.light-mode .sticky.top-0,',
    'body.light-mode aside.sticky {',
    '  background: rgba(255,255,255,0.9) !important;',
    '  backdrop-filter: blur(12px) !important;',
    '  -webkit-backdrop-filter: blur(12px) !important;',
    '  border-bottom: 1px solid #E1E8ED !important;',
    '  border-left: 1px solid #E1E8ED !important;',
    '  border-right: 1px solid #E1E8ED !important;',
    '  border-top: 1px solid #E1E8ED !important;',
    '  box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important;',
    '}',

    /* ── Input fields ── */
    'body.light-mode input:not([type="checkbox"]):not([type="radio"]),',
    'body.light-mode textarea,',
    'body.light-mode select,',
    'body.light-mode .bg-surface-container-low {',
    '  background-color: #F8FAFC !important;',
    '  color: #2D3436 !important;',
    '  border: 1px solid #E1E8ED !important;',
    '}',
    'body.light-mode input::placeholder,',
    'body.light-mode textarea::placeholder {',
    '  color: rgba(45,52,54,0.4) !important;',
    '}',
    'body.light-mode input:focus,',
    'body.light-mode textarea:focus,',
    'body.light-mode select:focus,',
    'body.light-mode .input-focus-glow:focus-within input {',
    '  border-color: #4A90E2 !important;',
    '  box-shadow: 0 0 0 3px rgba(74,144,226,0.15) !important;',
    '}',

    /* ── Text Colors (Antracite / Dark) ── */
    'body.light-mode .text-on-background,',
    'body.light-mode .text-on-surface,',
    'body.light-mode .text-\\[\\#e2e2e8\\],',
    'body.light-mode .text-\\[\\#e2e2e8\\]\\/80 {',
    '  color: #1F2937 !important;',
    '}',
    'body.light-mode .text-\\[\\#849495\\],',
    'body.light-mode .text-\\[\\#849495\\]\\/60,',
    'body.light-mode .text-\\[\\#b9cacb\\],',
    'body.light-mode .text-on-surface-variant {',
    '  color: #4B5563 !important;',
    '}',

    /* ── Accent Color (Solid Gamer Blue #3B82F6) replaces Neon Cyan/Orange ── */
    'body.light-mode .text-\\[\\#00f2ff\\],',
    'body.light-mode .text-\\[\\#00dbe7\\],',
    'body.light-mode .text-primary-container,',
    'body.light-mode .text-secondary-container,',
    'body.light-mode .text-\\[\\#ffaa00\\] {',
    '  color: #3B82F6 !important;',
    '  text-shadow: none !important;',
    '}',
    /* ── Also convert Material Icons to Blue ── */
    'body.light-mode .material-symbols-outlined[style*="color: rgb(0, 242, 255)"],',
    'body.light-mode .material-symbols-outlined[style*="color:#00f2ff"],',
    'body.light-mode .material-symbols-outlined.text-primary-container,',
    'body.light-mode .material-symbols-outlined.text-secondary-container {',
    '  color: #3B82F6 !important;',
    '  text-shadow: none !important;',
    '}',

    /* ── Other Accents (Error, Success, etc.) ── */
    'body.light-mode .text-\\[\\#ff4b4b\\],',
    'body.light-mode .text-\\[\\#ff4b4b\\]\\/80 {',
    '  color: #D63031 !important;',
    '}',
    'body.light-mode .text-\\[\\#a78bfa\\],',
    'body.light-mode .text-\\[\\#a78bfa\\]\\/80 {',
    '  color: #6C5CE7 !important;',
    '}',
    'body.light-mode .text-\\[\\#ffb4ab\\],',
    'body.light-mode .text-\\[\\#ffb4ab\\]\\/80 {',
    '  color: #D63031 !important;',
    '}',
    'body.light-mode .text-\\[\\#00ff88\\] {',
    '  color: #00B894 !important;',
    '}',

    /* ── ZEBRA STRIPING + LIST ITEMS ── */
    'body.light-mode .bg-white\\/5,',
    'body.light-mode .bg-\\[\\#333539\\]\\/40,',
    'body.light-mode .border-white\\/5,',
    'body.light-mode li.rounded-xl {',
    '  background: #FFFFFF !important;',
    '  border: 1px solid #E1E8ED !important;',
    '  color: #1F2937 !important;',
    '}',
    'body.light-mode #live-matches-list > div:nth-child(odd),',
    'body.light-mode ul.space-y-1 > li:nth-child(odd),',
    'body.light-mode .leaderboard-row:nth-child(odd),',
    'body.light-mode aside ul li:nth-child(odd) {',
    '  background: #F9FAFB !important;',
    '  border-color: transparent !important;',
    '}',
    'body.light-mode aside ul li { border: none !important; }',
    



    /* ── KILL ALL NEON GLOWS completely ── */
    'body.light-mode [class*="shadow-\\[0_0"],',
    'body.light-mode [style*="box-shadow"],',
    'body.light-mode .neon-glow-primary,',
    'body.light-mode .drop-shadow,',
    'body.light-mode [class*="drop-shadow"],',
    'body.light-mode .shadow-lg,',
    'body.light-mode .shadow-2xl,',
    'body.light-mode .neon-text-glow,',
    'body.light-mode .neon-glow-blue,',
    'body.light-mode [style*="text-shadow"] {',
    '  box-shadow: none !important;',
    '  text-shadow: none !important;',
    '  filter: none !important;',
    '}',
    /* Re-apply soft shadow to specific elements like avatars/cards that need depth */
    'body.light-mode .rounded-full.border-2 > img,',
    'body.light-mode .rounded-xl > img {',
    '  box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;',
    '}',

    /* ── Gradient Buttons → Solid Professional Blue ── */
    'body.light-mode .bg-gradient-to-r.from-\\[\\#00dbe7\\],',
    'body.light-mode .bg-gradient-to-br,',
    'body.light-mode .cyber-gradient-btn,',
    'body.light-mode [style*="linear-gradient"][style*="00dbe7"],',
    'body.light-mode [style*="linear-gradient"][style*="00f2ff"],',
    'body.light-mode .stg-save-btn,',
    'body.light-mode .stg-pw-save-btn,',
    'body.light-mode .sm-send-btn,',
    'body.light-mode .fb-send-btn {',
    '  background: #3B82F6 !important;',
    '  color: #FFFFFF !important;',
    '  box-shadow: 0 4px 12px rgba(59,130,246,0.3) !important;',
    '  border: none !important;',
    '  text-shadow: none !important;',
    '}',
    'body.light-mode .stg-save-btn:hover,',
    'body.light-mode .sm-send-btn:hover,',
    'body.light-mode .fb-send-btn:hover,',
    'body.light-mode .cyber-gradient-btn:hover {',
    '  background: #2563EB !important;',
    '  box-shadow: 0 6px 16px rgba(59,130,246,0.4) !important;',
    '}',

    /* ── Navigation / Sidebar Active states ── */
    'body.light-mode .bg-\\[\\#00f2ff\\]\\/10,',
    'body.light-mode .bg-\\[\\#00f2ff\\]\\/5 {',
    '  background: transparent !important;',
    '  color: #3B82F6 !important;',
    '  box-shadow: inset 4px 0 0 0 #3B82F6 !important;',
    '  border-radius: 0 !important; /* Flat bar on the side */',
    '}',

    /* ── Theme Toggle Switch ── */
    '#theme-toggle-row {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  padding: 0.65rem 1rem;',
    '  margin: 0 0.75rem 0.25rem;',
    '  border-radius: 0.75rem;',
    '  background: rgba(0,242,255,0.04);',
    '  border: 1px solid rgba(0,242,255,0.08);',
    '  cursor: pointer;',
    '  transition: all 0.2s ease;',
    '}',
    '#theme-toggle-row:hover {',
    '  background: rgba(0,242,255,0.08);',
    '}',
    'body.light-mode #theme-toggle-row {',
    '  background: #F8FAFC;',
    '  border-color: #E1E8ED;',
    '}',
    'body.light-mode #theme-toggle-row:hover {',
    '  background: #EEF2F6;',
    '}',
    '#theme-toggle-label {',
    '  font-family: "Space Grotesk", sans-serif;',
    '  font-weight: 600;',
    '  font-size: 0.72rem;',
    '  letter-spacing: 0.08em;',
    '  color: #849495;',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 6px;',
    '}',
    'body.light-mode #theme-toggle-label {',
    '  color: #2D3436;',
    '}',
    '#theme-toggle-switch {',
    '  position: relative;',
    '  width: 46px;',
    '  height: 24px;',
    '  border-radius: 12px;',
    '  background: rgba(58,73,75,0.5);',
    '  transition: background 0.3s ease;',
    '  flex-shrink: 0;',
    '}',
    '#theme-toggle-switch .knob {',
    '  position: absolute;',
    '  top: 2px;',
    '  left: 2px;',
    '  width: 20px;',
    '  height: 20px;',
    '  border-radius: 50%;',
    '  background: #e2e2e8;',
    '  transition: all 0.3s ease;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  font-size: 12px;',
    '  box-shadow: 0 1px 4px rgba(0,0,0,0.3);',
    '}',
    'body.light-mode #theme-toggle-switch {',
    '  background: rgba(74,144,226,0.3);',
    '}',
    'body.light-mode #theme-toggle-switch .knob {',
    '  left: 24px;',
    '  background: #FFFFFF;',
    '  box-shadow: 0 1px 6px rgba(0,0,0,0.15);',
    '}',

    /* Miscellaneous Light Overrides */
    'body.light-mode .neon-card-orange {',
    '  background: #FFFFFF !important;',
    '  border: 1px solid #E1E8ED !important;',
    '  box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important;',
    '}',
    'body.light-mode .neon-card-blue {',
    '  background: #FFFFFF !important;',
    '  border: 1px solid #E1E8ED !important;',
    '  box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important;',
    '}',
    'body.light-mode .trend-radar-box {',
    '  background: #FFFFFF !important;',
    '  border: 1px solid #E1E8ED !important;',
    '  box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important;',
    '  animation: none !important;',
    '}',

    /* Smooth transition for all theme changes */
    'body, body *, .glass-panel {',
    '  transition-property: background-color, background, color, border-color, box-shadow;',
    '  transition-duration: 0.3s;',
    '  transition-timing-function: ease;',
    '}'
  ].join('\n');
  document.head.appendChild(themeCss);

  // ── 2. Apply Theme from localStorage (BEFORE paint) ──
  function getStoredTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    updateToggleUI();
  }

  // Apply immediately (anti-flash)
  var storedTheme = getStoredTheme();
  if (storedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
  }

  // ── 3. Initialize Toggle ──
  function initThemeToggle() {
    var toggleRow = document.getElementById('theme-toggle-row');
    if (!toggleRow) return;

    if (!toggleRow.dataset.initialized) {
      toggleRow.addEventListener('click', function () {
        var isLight = document.body.classList.contains('light-mode');
        var newTheme = isLight ? 'dark' : 'light';
        try { localStorage.setItem(STORAGE_KEY, newTheme); } catch (e) {}
        applyTheme(newTheme);
      });
      toggleRow.dataset.initialized = 'true';
    }
  }

  function updateToggleUI() {
    var icon = document.querySelector('#theme-toggle-label .material-symbols-outlined');
    var knob = document.querySelector('#theme-toggle-switch .knob');
    if (!icon || !knob) return;

    var isLight = document.body.classList.contains('light-mode');
    icon.textContent = isLight ? 'light_mode' : 'dark_mode';
    knob.textContent = isLight ? '☀️' : '🌙';
  }

  // ── 4. Init ──
  function init() {
    // Ensure body class is correct (documentElement was set for anti-flash)
    if (storedTheme === 'light') {
      document.body.classList.add('light-mode');
      document.documentElement.classList.remove('light-mode');
    }
    initThemeToggle();
    updateToggleUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for programmatic access
  window.toggleTheme = function () {
    var isLight = document.body.classList.contains('light-mode');
    var newTheme = isLight ? 'dark' : 'light';
    try { localStorage.setItem(STORAGE_KEY, newTheme); } catch (e) {}
    applyTheme(newTheme);
  };

})();
