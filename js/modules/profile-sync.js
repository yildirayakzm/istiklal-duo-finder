/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Global Profile Image Sync + Reward Display
 *  Auto-syncs user_profile_image from localStorage to all
 *  header/sidebar avatar elements on every page.
 *  Also applies Neon Frame & Legendary Badge rewards globally.
 *  Include this script on any page (after DOM is ready).
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'user_profile_image';

  /**
   * Get profile image: localStorage first, then database.js default.
   * User uploads (Base64) are in localStorage → persist across F5.
   * If none saved, fall back to MASTER_USERS default for the logged-in user.
   */
  function getProfileImage() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;

      // Fallback: check if logged-in user has a default in database.js
      var loggedInEmail = localStorage.getItem('loggedInUser');
      if (loggedInEmail && window.MASTER_USERS) {
        for (var i = 0; i < window.MASTER_USERS.length; i++) {
          if (window.MASTER_USERS[i].email === loggedInEmail && window.MASTER_USERS[i].profileImage) {
            return window.MASTER_USERS[i].profileImage;
          }
        }
      }
      return null;
    } catch (e) { return null; }
  }

  /**
   * Find all <a> elements linking to the profile page and replace
   * their child <img> or <span> with the saved profile image.
   */
  function syncAllAvatars() {
    var base64 = getProfileImage();
    if (!base64) return; // No saved image — keep default fallback

    // Target: any <a> linking to oyuncu_profili/code.html (header avatars/mobile drawer)
    var links = document.querySelectorAll('a[href*="oyuncu_profili/code.html"]');
    links.forEach(function (link) {
      // 1. Dashboard Header: Replace icon inside .profile-avatar-ring
      var ring = link.querySelector('.profile-avatar-ring, .hex-avatar-inner');
      if (ring) {
        ring.innerHTML = '<img src="' + base64 + '" class="w-full h-full object-cover rounded-full" alt="Profil" referrerpolicy="no-referrer"/>';
        return;
      }

      // 2. Mobile Drawer Item OR pure block container without text
      if (link.classList.contains('drawer-item')) {
        // Drawer uses a span icon next to text
        var icon = link.querySelector('.material-symbols-outlined');
        if (icon) {
           var img = document.createElement('img');
           img.src = base64;
           img.className = 'w-6 h-6 rounded-full object-cover';
           img.setAttribute('referrerpolicy', 'no-referrer');
           icon.parentNode.replaceChild(img, icon);
        }
      } else if (link.classList.contains('block') || link.id === 'header-avatar-link') {
        var existingImg = link.querySelector('img');
        if (existingImg) {
          existingImg.src = base64;
          existingImg.setAttribute('referrerpolicy', 'no-referrer');
        } else {
          // Replace placeholder icon with image
          link.innerHTML = '<img src="' + base64 + '" class="w-full h-full object-cover rounded-full" alt="Profil" referrerpolicy="no-referrer"/>';
        }
      }
    });

    // Also target any element with id="header-avatar-link" explicitly (profile page specific logic)
    var headerLink = document.getElementById('header-avatar-link');
    if (headerLink && !headerLink.querySelector('.hex-avatar-inner')) {
      var img = headerLink.querySelector('img');
      if (img) {
        img.src = base64;
        img.setAttribute('referrerpolicy', 'no-referrer');
      } else {
        headerLink.innerHTML = '<img src="' + base64 + '" class="w-full h-full object-cover rounded-full" alt="Profil" referrerpolicy="no-referrer"/>';
      }
    }

    // Target the big hero avatar on the profile page itself (#avatar-preview)
    var avatarPreview = document.getElementById('avatar-preview');
    if (avatarPreview) {
      avatarPreview.innerHTML = '<img src="' + base64 + '" class="w-full h-full object-cover rounded-full" alt="Profil" referrerpolicy="no-referrer"/>';
    }
  }

  // ═══════════════════════════════════════════
  // NEON FRAME — Global Active Frame System
  // ═══════════════════════════════════════════
  function injectNeonFrameCSS() {
    if (document.getElementById('neon-frame-global-css')) return;

    var style = document.createElement('style');
    style.id = 'neon-frame-global-css';
    style.textContent = [
      '@keyframes neonPulse {',
      '  0%, 100% {',
      '    box-shadow: 0 0 8px rgba(139,92,246,0.5), 0 0 20px rgba(139,92,246,0.3), 0 0 40px rgba(236,72,153,0.15);',
      '    border-color: #8B5CF6;',
      '  }',
      '  50% {',
      '    box-shadow: 0 0 12px rgba(236,72,153,0.6), 0 0 30px rgba(236,72,153,0.35), 0 0 60px rgba(139,92,246,0.2);',
      '    border-color: #EC4899;',
      '  }',
      '}',
      '.neon-frame-active {',
      '  border-color: #8B5CF6 !important;',
      '  animation: neonPulse 2.5s ease-in-out infinite !important;',
      '}',
      '.hex-avatar.neon-frame-active {',
      '  animation: neonPulse 2.5s ease-in-out infinite, avatarSpin 8s linear infinite !important;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function applyNeonFrame() {
    var activeFrame = null;
    try { activeFrame = localStorage.getItem('df_active_frame'); } catch(e) {}

    if (activeFrame === 'neon-frame') {
      injectNeonFrameCSS();

      // Apply to header avatar rings
      var rings = document.querySelectorAll('.profile-avatar-ring');
      rings.forEach(function(ring) {
        ring.classList.add('neon-frame-active');
      });

      // Apply to header-avatar-link (profile page)
      var headerLink = document.getElementById('header-avatar-link');
      if (headerLink) {
        headerLink.classList.add('neon-frame-active');
      }

      // Apply to hex-avatar on profile page
      var hexAvatars = document.querySelectorAll('.hex-avatar');
      hexAvatars.forEach(function(hex) {
        hex.classList.add('neon-frame-active');
      });
    } else {
      // Remove if not active
      var actives = document.querySelectorAll('.neon-frame-active');
      actives.forEach(function(el) { el.classList.remove('neon-frame-active'); });
    }
  }

  // ═══════════════════════════════════════════
  // LEGENDARY BADGE — Icon Next to Username
  // ═══════════════════════════════════════════
  function injectLegendaryBadgeCSS() {
    if (document.getElementById('legendary-badge-global-css')) return;

    var style = document.createElement('style');
    style.id = 'legendary-badge-global-css';
    style.textContent = [
      '@keyframes badgeShine {',
      '  0%, 100% { filter: drop-shadow(0 0 4px rgba(255,170,0,0.6)); }',
      '  50% { filter: drop-shadow(0 0 10px rgba(255,215,0,0.9)); }',
      '}',
      '.legendary-badge-icon {',
      '  display: inline-flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  vertical-align: middle;',
      '  margin-left: 6px;',
      '  animation: badgeShine 2s ease-in-out infinite;',
      '}',
      '.legendary-badge-icon .material-symbols-outlined {',
      '  font-size: 1.2em;',
      '  color: #FFD700;',
      '  font-variation-settings: "FILL" 1;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function applyLegendaryBadge() {
    var activeBadge = null;
    try { activeBadge = localStorage.getItem('df_active_badge'); } catch(e) {}

    // Remove existing badge icons first (prevent duplicates)
    var existingBadges = document.querySelectorAll('.legendary-badge-icon');
    existingBadges.forEach(function(b) { b.remove(); });

    if (activeBadge === 'legendary') {
      injectLegendaryBadgeCSS();

      // Apply to hero display name on profile page
      var heroName = document.getElementById('hero-display-name');
      if (heroName && !heroName.querySelector('.legendary-badge-icon')) {
        var badge = document.createElement('span');
        badge.className = 'legendary-badge-icon';
        badge.title = 'Legendary Rozet';
        badge.innerHTML = '<span class="material-symbols-outlined">workspace_premium</span>';
        heroName.appendChild(badge);
      }
    }
  }

  // ═══════════════════════════════════════════
  // INIT — Run all syncs
  // ═══════════════════════════════════════════
  function runAllSyncs() {
    syncAllAvatars();
    applyNeonFrame();
    applyLegendaryBadge();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllSyncs);
  } else {
    runAllSyncs();
  }

  // Expose for instant update (e.g., after profile save or reward claim)
  window.syncProfileImage = syncAllAvatars;
  window.applyNeonFrame = applyNeonFrame;
  window.applyLegendaryBadge = applyLegendaryBadge;
})();
