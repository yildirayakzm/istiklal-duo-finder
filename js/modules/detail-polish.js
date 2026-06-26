/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Detail Polish (Gamer Experience Upgrades)
 *  1. Online status pulse dots on friend list items
 *  2. Sidebar hover icon glow FX
 *  3. Profile avatar quick-link dropdown
 *  Include on ALL dashboard pages.
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ── Inject Global CSS ──
  var css = document.createElement('style');
  css.id = 'detail-polish-css';
  css.textContent = [
    /* ── 1. Online Pulse Dot ── */
    '@keyframes onlinePulse{0%,100%{box-shadow:0 0 0 0 rgba(0,255,136,0.5);}70%{box-shadow:0 0 0 6px rgba(0,255,136,0);}}',
    '.online-dot{width:8px;height:8px;border-radius:50%;background:#00ff88;animation:onlinePulse 2s ease-in-out infinite;flex-shrink:0;box-shadow:0 0 6px rgba(0,255,136,0.5);}',

    /* ── 2. Sidebar Hover Icon Glow ── */
    '#sidebar nav a:hover .material-symbols-outlined{filter:drop-shadow(0 0 6px currentColor);transition:filter 0.25s ease;}',
    '#sidebar nav button:hover .material-symbols-outlined{filter:drop-shadow(0 0 6px currentColor);transition:filter 0.25s ease;}',

    /* ── 3. Avatar Quick Menu ── */
    '#avatar-quick-menu{position:absolute;top:calc(100% + 8px);right:0;min-width:180px;background:rgba(26,28,32,0.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(0,242,255,0.18);border-radius:0.85rem;box-shadow:0 8px 32px rgba(0,0,0,0.5),0 0 20px rgba(0,242,255,0.08);padding:0.5rem;opacity:0;transform:translateY(-6px);pointer-events:none;transition:all 0.25s cubic-bezier(0.22,1,0.36,1);z-index:100;}',
    '#avatar-quick-menu.open{opacity:1;transform:translateY(0);pointer-events:auto;}',
    '.aqm-item{display:flex;align-items:center;gap:8px;padding:0.55rem 0.85rem;border-radius:0.6rem;color:#b9cacb;font-size:0.78rem;font-family:"Space Grotesk",sans-serif;font-weight:600;cursor:pointer;transition:all 0.15s ease;text-decoration:none;}',
    '.aqm-item:hover{background:rgba(0,242,255,0.08);color:#00f2ff;}',
    '.aqm-item .material-symbols-outlined{font-size:16px;}'
  ].join('\n');
  document.head.appendChild(css);

  // ═══════════════════════════════════════════
  //  1. ONLINE PULSE DOTS — Friend list items
  // ═══════════════════════════════════════════
  function injectOnlineDots() {
    // Find friend list items in sidebar or chat contact lists
    var friendItems = document.querySelectorAll('.friend-item, .contact-item, [data-friend]');
    friendItems.forEach(function (item) {
      if (item.querySelector('.online-dot')) return; // already injected
      // Randomly assign ~60% as "online" for live feel
      if (Math.random() < 0.25) {
        var dot = document.createElement('span');
        dot.className = 'online-dot';
        dot.title = 'Çevrimiçi';
        // Try to append after avatar or at start
        var nameEl = item.querySelector('.font-semibold, .font-bold, span');
        if (nameEl) {
          nameEl.parentNode.insertBefore(dot, nameEl.nextSibling);
        } else {
          item.appendChild(dot);
        }
      }
    });
  }

  // ═══════════════════════════════════════════
  //  3. AVATAR QUICK-LINK DROPDOWN
  // ═══════════════════════════════════════════
  function setupAvatarQuickMenu() {
    var avatarLink = document.getElementById('header-avatar-link');
    if (!avatarLink) return;

    // Make it act as dropdown trigger
    var wrapper = avatarLink.parentElement;
    if (!wrapper) return;
    wrapper.style.position = 'relative';

    // Create dropdown
    var menu = document.createElement('div');
    menu.id = 'avatar-quick-menu';
    menu.innerHTML = [
      '<a class="aqm-item" href="../oyuncu_profili/code.html">',
      '  <span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1;">person</span>',
      '  Profilim',
      '</a>',
      '<a class="aqm-item" href="javascript:void(0)" onclick="openSettingsModal()">',
      '  <span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1;">settings</span>',
      '  Hesap Ayarları',
      '</a>',
      '<div style="height:1px;background:rgba(58,73,75,0.3);margin:0.3rem 0.5rem;"></div>',
      '<a class="aqm-item" href="javascript:void(0)" onclick="localStorage.removeItem(\'loggedInUser\'); window.location.href=\'../duo_finder_dashboard_yeni/code.html\';" style="color:#ffb4ab;">',
      '  <span class="material-symbols-outlined">logout</span>',
      '  Çıkış Yap',
      '</a>'
    ].join('\n');
    wrapper.appendChild(menu);

    // Toggle on click
    avatarLink.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      menu.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) {
        menu.classList.remove('open');
      }
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') menu.classList.remove('open');
    });
  }

  // ── Init ──
  function init() {
    injectOnlineDots();
    setupAvatarQuickMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for re-triggering after dynamic content loads
  window.injectOnlineDots = injectOnlineDots;
})();
