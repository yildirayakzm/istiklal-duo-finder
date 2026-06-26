/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Reverse Navigation Logic
 *  Mobile  (<768px): Bottom nav VISIBLE, sidebar = utility only
 *  Desktop (≥768px): Bottom nav HIDDEN,  sidebar = full nav + utility
 *  Include on ALL dashboard pages AFTER page scripts.
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  var MOBILE_BREAKPOINT = 768;

  // ── 5 Main Navigation Items ──
  var NAV_ITEMS = [
    { label: 'Panel', icon: 'dashboard', href: '../duo_finder_dashboard_yeni/code.html' },
    { label: 'Eşleşmeler', icon: 'bolt', href: '../duo_e_le_melerim/code.html' },
    { label: 'Rekabet', icon: 'emoji_events', href: '../duo_finder_yar_ma_ekran/code.html' },

    { label: 'Destek', icon: 'support_agent', href: 'javascript:void(0)', onclick: 'openSupportModal' }
  ];

  // ── Utility Items (sidebar only) ──
  var UTILITY_ITEMS_MOBILE = [
    { label: 'Profil', icon: 'person', href: '../oyuncu_profili/code.html' },
    { label: 'Ayarlar', icon: 'settings', href: 'javascript:void(0)', onclick: 'showSettingsAlert' },
    { label: 'Rapor Bildir', icon: 'shield', href: 'javascript:void(0)', onclick: 'openReportModal', color: '#ff4b4b' },
    { label: 'İstek & Öneri', icon: 'lightbulb', href: 'javascript:void(0)', onclick: 'openFeedbackModal', color: '#a78bfa' },
    { label: 'Çıkış Yap', icon: 'logout', href: 'javascript:void(0)', onclick: 'doMobileLogout', color: '#ffb4ab' }
  ];

  // Detect active page
  function getActivePage() {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf('duo_finder_dashboard_yeni') !== -1) return 'Panel';
    if (path.indexOf('duo_e_le_melerim') !== -1) return 'Eşleşmeler';
    if (path.indexOf('duo_finder_yar_ma_ekran') !== -1) return 'Rekabet';

    if (path.indexOf('destek') !== -1) return 'Destek';
    if (path.indexOf('oyuncu_profili') !== -1) return 'Profil';
    return '';
  }

  // Get user info from localStorage
  function getUserInfo() {
    var displayName = 'Oyuncu';
    var email = '';
    var profileImg = null;
    try {
      var loggedIn = localStorage.getItem('loggedInUser');
      if (loggedIn) {
        email = loggedIn;
        displayName = loggedIn.split('@')[0];
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        for (var i = 0; i < users.length; i++) {
          if (users[i].email === loggedIn) {
            displayName = users[i].username || displayName;
            break;
          }
        }
      }
      profileImg = localStorage.getItem('user_profile_image');
      // Fallback: database.js default for the logged-in master user
      if (!profileImg && loggedIn && window.MASTER_USERS) {
        for (var j = 0; j < window.MASTER_USERS.length; j++) {
          if (window.MASTER_USERS[j].email === loggedIn && window.MASTER_USERS[j].profileImage) {
            profileImg = window.MASTER_USERS[j].profileImage;
            break;
          }
        }
      }
    } catch (e) { }
    return { name: displayName, email: email, img: profileImg };
  }

  function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  // Settings — opens settings modal (provided by settings-modal.js)
  window.showSettingsAlert = function () {
    if (typeof window.openSettingsModal === 'function') {
      window.openSettingsModal();
    }
  };

  // Logout — clears session and stays on panel
  window.doMobileLogout = function () {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../duo_finder_dashboard_yeni/code.html';
  };

  // ═══════════════════════════════════════════
  //  INJECT PROFILE CARD INTO SIDEBAR (always)
  // ═══════════════════════════════════════════
  var profileInjected = false;

  function injectProfileCard() {
    if (profileInjected) return;
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    var user = getUserInfo();

    // 1. Identify & Remove Redundant Placeholder Profile
    // Search for any hard-coded profile divs in the sidebar (excluding the header and our dynamic card)
    // The static card usually contains #sidebar-user-name or default person icon.
    var existingNames = sidebar.querySelectorAll('#sidebar-user-name, #sidebar-user-email');
    existingNames.forEach(function (el) {
      // Find the closest container that looks like a profile card (flex, border-b)
      var container = el.closest('.border-b.flex.items-center');
      // Ensure we don't accidentally remove the main header (which has h-16)
      if (container && !container.classList.contains('h-16') && container.id !== 'nav-profile-card') {
        container.remove();
      }
    });

    // 2. Conditional Rendering Logic: Create the dynamic profile block
    var profileCard = document.createElement('div');
    profileCard.id = 'nav-profile-card';
    // UI Alignment: Adjusted padding to px-6 py-5 to perfectly align vertically/horizontally with the logo header (px-6)
    profileCard.className = 'px-6 py-5 border-b border-[#3a494b]/30 flex items-center gap-3';
    
    var avatarHtml = user.img
      ? '<img src="' + user.img + '" class="w-11 h-11 rounded-full object-cover border-2 border-[#00f2ff]/40 shadow-[0_0_10px_rgba(0,242,255,0.2)]" alt="Profil"/>'
      : '<div class="w-11 h-11 rounded-full bg-gradient-to-br from-[#00f2ff]/20 to-[#00dbe7]/10 flex items-center justify-center border-2 border-[#00f2ff]/30"><span class="material-symbols-outlined text-[#00f2ff]">person</span></div>';
    
    profileCard.innerHTML = avatarHtml +
      '<div class="flex-1 min-w-0">' +
      '<p id="sidebar-user-name" class="text-sm font-bold text-[#e2e2e8] truncate font-[\'Space_Grotesk\']">' + user.name + '</p>' +
      '<p id="sidebar-user-email" class="text-[10px] text-[#849495] truncate">' + (user.email || 'Oyuncu') + '</p>' +
      '</div>';
      
    var sidebarHeader = sidebar.querySelector('.flex.items-center.justify-between.h-16');
    if (!sidebarHeader) {
        sidebarHeader = sidebar.querySelector('.flex.items-center.justify-between');
    }

    if (sidebarHeader) {
      // Insert our single valid profile right below the header
      sidebarHeader.parentNode.insertBefore(profileCard, sidebarHeader.nextSibling);
    }
    profileInjected = true;
  }

  // ═══════════════════════════════════════════
  //  BUILD SIDEBAR NAV LINK
  // ═══════════════════════════════════════════
  function createNavLink(item, activePage) {
    var isActive = item.label === activePage;
    var itemColor = item.color || '#00f2ff';
    var a = document.createElement('a');
    a.href = item.href;

    if (item.onclick) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        if (typeof window[item.onclick] === 'function') window[item.onclick]();
      });
    }

    if (item.color) {
      a.className = 'flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group text-[#e2e2e8]/80 hover:bg-[' + itemColor + ']/5 hover:text-[' + itemColor + ']';
      a.innerHTML =
        '<span class="material-symbols-outlined text-[' + itemColor + ']/70 group-hover:text-[' + itemColor + '] transition-colors">' + item.icon + '</span>' +
        '<span class="font-[\'Space_Grotesk\'] font-semibold text-sm tracking-wide">' + item.label + '</span>';
    } else {
      a.className = 'flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ' +
        (isActive
          ? 'bg-[#00f2ff]/10 text-[#00f2ff] shadow-[0_0_12px_rgba(0,242,255,0.15)]'
          : 'text-[#e2e2e8]/80 hover:bg-[#00f2ff]/5 hover:text-[#00f2ff]');
      a.innerHTML =
        '<span class="material-symbols-outlined transition-colors' +
        (isActive ? ' text-[#00f2ff] drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]' : ' text-[#849495] group-hover:text-[#00f2ff]') +
        '"' + (isActive ? ' style="font-variation-settings:\'FILL\' 1;"' : '') +
        '>' + item.icon + '</span>' +
        '<span class="font-[\'Space_Grotesk\'] font-semibold text-sm tracking-wide">' + item.label + '</span>' +
        (isActive ? '<div class="ml-auto w-1.5 h-5 rounded-full bg-[#00f2ff] shadow-[0_0_8px_rgba(0,242,255,0.6)]"></div>' : '');
    }
    return a;
  }

  // ═══════════════════════════════════════════
  //  DESKTOP: Inject 5 main nav links INTO sidebar
  // ═══════════════════════════════════════════
  var desktopNavInjected = false;

  function injectDesktopSidebarNav() {
    if (desktopNavInjected) return;
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    var nav = sidebar.querySelector('nav');
    if (!nav) return;

    var activePage = getActivePage();

    // Nav section
    var navSection = document.createElement('div');
    navSection.id = 'desktop-nav-links';
    navSection.className = 'px-4 pt-3 pb-2 space-y-1';

    var navLabel = document.createElement('div');
    navLabel.className = 'px-3 pb-2 pt-1';
    navLabel.innerHTML = '<span class="text-[9px] font-bold text-[#849495]/60 uppercase tracking-[0.15em] font-[\'Space_Grotesk\']">NAVİGASYON</span>';
    navSection.appendChild(navLabel);

    NAV_ITEMS.forEach(function (item) {
      navSection.appendChild(createNavLink(item, activePage));
    });

    // Insert at top of nav
    var existingNavFirstChild = nav.firstChild;
    nav.insertBefore(navSection, existingNavFirstChild);

    // Separator
    var sep = document.createElement('div');
    sep.className = 'my-2 mx-4 border-t border-[#3a494b]/30';
    sep.id = 'desktop-nav-separator';
    nav.insertBefore(sep, navSection.nextSibling);

    desktopNavInjected = true;
  }

  function removeDesktopSidebarNav() {
    if (!desktopNavInjected) return;
    var navLinks = document.getElementById('desktop-nav-links');
    var separator = document.getElementById('desktop-nav-separator');
    if (navLinks) navLinks.remove();
    if (separator) separator.remove();
    desktopNavInjected = false;
  }

  // ═══════════════════════════════════════════
  //  MOBILE: Clean sidebar — utility only
  //  Remove 5 main nav items if they exist in
  //  the static sidebar HTML and rebuild with
  //  only Profil, Ayarlar, Raporla, Çıkış Yap
  // ═══════════════════════════════════════════
  var mobileUtilityInjected = false;

  function injectMobileUtility() {
    if (mobileUtilityInjected) return;
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    var nav = sidebar.querySelector('nav');
    if (!nav) return;

    // Hide original static nav content
    var origChildren = nav.children;
    for (var i = 0; i < origChildren.length; i++) {
      origChildren[i].setAttribute('data-original-nav', 'true');
      origChildren[i].style.display = 'none';
    }

    var activePage = getActivePage();

    // Build utility section
    var utilSection = document.createElement('div');
    utilSection.id = 'mobile-utility-links';
    utilSection.className = 'px-4 pt-3 pb-2 space-y-1';

    var utilLabel = document.createElement('div');
    utilLabel.className = 'px-3 pb-2 pt-1';
    utilLabel.innerHTML = '<span class="text-[9px] font-bold text-[#849495]/60 uppercase tracking-[0.15em] font-[\'Space_Grotesk\']">MENÜ</span>';
    utilSection.appendChild(utilLabel);

    UTILITY_ITEMS_MOBILE.forEach(function (item) {
      utilSection.appendChild(createNavLink(item, activePage));
    });

    nav.appendChild(utilSection);
    mobileUtilityInjected = true;
  }

  function removeMobileUtility() {
    if (!mobileUtilityInjected) return;
    var utilLinks = document.getElementById('mobile-utility-links');
    if (utilLinks) utilLinks.remove();

    // Restore original nav items
    var sidebar = document.getElementById('sidebar');
    if (sidebar) {
      var nav = sidebar.querySelector('nav');
      if (nav) {
        var origChildren = nav.querySelectorAll('[data-original-nav]');
        for (var i = 0; i < origChildren.length; i++) {
          origChildren[i].style.display = '';
          origChildren[i].removeAttribute('data-original-nav');
        }
      }
    }
    mobileUtilityInjected = false;
  }

  // ═══════════════════════════════════════════
  //  BOTTOM NAV: Add nexus-bottom-nav class
  // ═══════════════════════════════════════════
  function tagBottomNav() {
    // Find all fixed bottom navs and tag them
    var allNavs = document.querySelectorAll('nav');
    for (var i = 0; i < allNavs.length; i++) {
      var n = allNavs[i];
      if (n.classList.contains('fixed') && (
        n.classList.contains('bottom-0') ||
        window.getComputedStyle(n).bottom === '0px'
      )) {
        n.classList.add('nexus-bottom-nav');
      }
    }
  }

  // ═══════════════════════════════════════════
  //  INJECT CSS MEDIA QUERIES (once)
  // ═══════════════════════════════════════════
  function injectMediaCSS() {
    if (document.getElementById('nexus-nav-media-css')) return;
    var style = document.createElement('style');
    style.id = 'nexus-nav-media-css';
    style.textContent =
      '/* ── Reverse Navigation: Mobile=BottomBar, Desktop=Sidebar ── */\n' +
      '@media (max-width: 767px) {\n' +
      '  .nexus-bottom-nav { display: flex !important; }\n' +
      '}\n' +
      '@media (min-width: 768px) {\n' +
      '  .nexus-bottom-nav { display: none !important; }\n' +
      '}\n' +
      '/* Neon glow animation for mobile bottom nav active tab */\n' +
      '@keyframes nexusNavPulse {\n' +
      '  0%, 100% { box-shadow: 0 0 8px rgba(0,242,255,0.3); }\n' +
      '  50% { box-shadow: 0 0 16px rgba(0,242,255,0.6); }\n' +
      '}\n' +
      '.nexus-bottom-nav a.nexus-nav-active {\n' +
      '  animation: nexusNavPulse 2s ease-in-out infinite;\n' +
      '}\n' +
      '/* ── Sidebar Scroll Fix (small monitors) ── */\n' +
      '#sidebar { display: flex !important; flex-direction: column !important; height: 100vh !important; }\n' +
      '#sidebar nav { overflow-y: auto !important; flex-grow: 1 !important; }\n' +
      '/* ── Neon Sidebar Scrollbar ── */\n' +
      '#sidebar nav::-webkit-scrollbar { width: 4px; }\n' +
      '#sidebar nav::-webkit-scrollbar-track { background: transparent; }\n' +
      '#sidebar nav::-webkit-scrollbar-thumb { background: rgba(0,242,255,0.3); border-radius: 10px; }\n' +
      '#sidebar nav::-webkit-scrollbar-thumb:hover { background: rgba(0,242,255,0.6); }\n' +
      '#sidebar nav { scrollbar-width: thin; scrollbar-color: rgba(0,242,255,0.3) transparent; }\n';
    document.head.appendChild(style);
  }

  // ═══════════════════════════════════════════
  //  MAIN LAYOUT LOGIC
  // ═══════════════════════════════════════════
  function applyLayout() {
    tagBottomNav();
    injectMediaCSS();
    injectProfileCard();

    if (isMobile()) {
      // MOBILE: bottom nav visible (via CSS), sidebar = utility only
      removeDesktopSidebarNav();
      injectMobileUtility();
    } else {
      // DESKTOP: bottom nav hidden (via CSS), sidebar = full nav
      removeMobileUtility();
      injectDesktopSidebarNav();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLayout);
  } else {
    applyLayout();
  }

  // Handle resize with debounce
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyLayout, 200);
  });

})();
