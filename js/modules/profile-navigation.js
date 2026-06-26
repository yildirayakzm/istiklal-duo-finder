/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Profile Navigation Helper
 *  Handles profile avatar click navigation and ensures
 *  logged-in user info is displayed consistently across pages.
 *  Include this script on any page (after DOM is ready).
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ─── Resolve current user ───
  function getCurrentUser() {
    try {
      var loggedInEmail = localStorage.getItem('loggedInUser');
      if (!loggedInEmail) return null;

      var users = JSON.parse(localStorage.getItem('users')) || [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].email === loggedInEmail) {
          return {
            email: loggedInEmail,
            username: users[i].username || loggedInEmail.split('@')[0]
          };
        }
      }
      return { email: loggedInEmail, username: loggedInEmail.split('@')[0] };
    } catch (e) {
      return null;
    }
  }

  // ─── Update profile links with correct username display ───
  function syncProfileLinks() {
    var user = getCurrentUser();
    if (!user) return;

    // Update any username display elements
    var nameEls = document.querySelectorAll('.profile-username-text, .user-name-display');
    nameEls.forEach(function (el) {
      el.textContent = user.username;
    });

    // Ensure profile links point to correct page
    var profileLinks = document.querySelectorAll('a[href*="oyuncu_profili"]');
    profileLinks.forEach(function (link) {
      link.title = user.username + ' - Profil';
    });
  }

  // ─── Init ───
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncProfileLinks);
  } else {
    syncProfileLinks();
  }

  // Expose globally for other scripts
  window.getCurrentUser = getCurrentUser;
  window.syncProfileLinks = syncProfileLinks;
})();
