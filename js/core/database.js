/**
 * ═══════════════════════════════════════════════════════════════
 *  İSTİKLAL — Global Master User Database (database.js)
 *  Portable user registry that works across all devices.
 *  Include this script BEFORE any auth or data-reading scripts.
 * ═══════════════════════════════════════════════════════════════
 */

// ─── MASTER USERS ─────────────────────────────────────────────
// These users are recognized on EVERY computer, even without
// prior localStorage data. Add new master accounts here.
// ──────────────────────────────────────────────────────────────

window.MASTER_USERS = [
  {
    username: "yildirayakzm",
    password: "123",
    email: "akuzumy1905@gmail.com",
    role: "founder",
    bio: "İSTİKLAL Kurucusu 🎮",
    profileImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-J9zOVUO1ToBZWRRPXQZEyUe0L8moDbBKcNLtAi4ceR29HQvbb-lLjtown-YoiNLu32xkcnkH8FI5VMso1YQMORW_NOLxWSKxZ03XLgCbRpxxsECcf60goTjEi22oUkzZpciyD5ga0DE9KMrsTokrIiUE5TUv2--LzUI4KiK2EDWsfO8HDPU-cxwhAYZsyYfzp78twsge6JO0TfURxhB-vEepxAXLmlkfSf-6AsNFeqe9-OH0kpsKCiU7aqsDuQEOwcDaGaByyhGe",
    games: [
      { name: "valorant", rank: "Immortal", main: "Jett", level: 312 },
      { name: "lol", rank: "Diamond", main: "Yasuo", level: 245 }
    ],
    roles: ["Duelist", "Carry"],
    region: "TR",
    friends: [],
    messages: {},
    hardware: {
      cpu: "", gpu: "", ram: "", motherboard: "",
      storage: "", psu: "", pcCase: "", cooling: "",
      monitor: "", keyboard: "", mouse: "", headset: "",
      mousepad: "", console: "", laptop: ""
    },
    stats: { winRate: 0, kd: 0, winStreak: 0, totalDuos: 0, hoursPlayed: 0 },
    registeredAt: "2026-06-20T10:00:00.000Z"
  },
  {
    username: "deneme",
    password: "123",
    email: "deneme@deneme.com",
    role: "user",
    bio: "Test Hesabı",
    profileImage: "",
    games: [
      { name: "valorant", rank: "Gold", main: "Reyna", level: 100 }
    ],
    roles: ["Duelist"],
    region: "TR",
    friends: [],
    messages: {},
    hardware: {
      cpu: "", gpu: "", ram: "", motherboard: "",
      storage: "", psu: "", pcCase: "", cooling: "",
      monitor: "", keyboard: "", mouse: "", headset: "",
      mousepad: "", console: "", laptop: ""
    },
    stats: { winRate: 0, kd: 0, winStreak: 0, totalDuos: 0, hoursPlayed: 0 },
    registeredAt: "2026-06-22T14:30:00.000Z"
  }
];


// ─── PRE-LOAD SYNC ────────────────────────────────────────────
// Merges MASTER_USERS into localStorage on every page load.
// Master credentials always take priority; runtime profile
// edits (bio, avatar, etc.) are preserved if they exist.
// ──────────────────────────────────────────────────────────────

window.syncMasterUsers = function () {
  'use strict';

  var users = [];
  try { users = JSON.parse(localStorage.getItem('users')) || []; } catch (e) { users = []; }

  var masterList = window.MASTER_USERS || [];
  var changed = false;

  for (var m = 0; m < masterList.length; m++) {
    var master = masterList[m];
    var found = false;
    var idx = -1;

    // Check if this master user already exists in localStorage
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === master.email) {
        found = true;
        idx = i;
        break;
      }
    }

    if (found) {
      // ── Merge: master credentials always win, but keep runtime data ──
      var existing = users[idx];
      existing.username = master.username;
      existing.password = master.password;
      existing.email = master.email;

      // Only set defaults for fields the user hasn't customized yet
      if (!existing.bio) existing.bio = master.bio || '';
      if (!existing.games) existing.games = master.games || [];
      if (!existing.roles) existing.roles = master.roles || [];
      if (!existing.region) existing.region = master.region || '';
      if (!existing.hardware) existing.hardware = master.hardware || {};
      if (!existing.stats) existing.stats = master.stats || { winRate: 0, kd: 0, winStreak: 0, totalDuos: 0, hoursPlayed: 0 };
      if (!existing.registeredAt) existing.registeredAt = master.registeredAt || new Date().toISOString();

      users[idx] = existing;
      changed = true;
    } else {
      // ── New master user — inject into localStorage ──
      users.push({
        username: master.username,
        password: master.password,
        email: master.email,
        bio: master.bio || '',
        profileImage: master.profileImage || null,
        games: master.games || [],
        roles: master.roles || [],
        region: master.region || '',
        friends: master.friends || [],
        messages: master.messages || {},
        hardware: master.hardware || {},
        stats: master.stats || { winRate: 0, kd: 0, winStreak: 0, totalDuos: 0, hoursPlayed: 0 },
        registeredAt: master.registeredAt || new Date().toISOString()
      });
      changed = true;
    }

    // ── Sync profile image default (per-user, only if none exists) ──
    // Uses the global key 'user_profile_image' for the currently
    // logged-in master user. Only writes the default from database.js
    // when NO image has been saved yet (so user uploads are preserved).
    var loggedInEmail = null;
    try { loggedInEmail = localStorage.getItem('loggedInUser'); } catch (e) { }
    if (master.profileImage && loggedInEmail === master.email) {
      if (!localStorage.getItem('user_profile_image')) {
        localStorage.setItem('user_profile_image', master.profileImage);
      }
    }

    // ── Sync friends list default (only if none exists) ──
    if (master.friends && master.friends.length > 0) {
      var existingFriends = [];
      try { existingFriends = JSON.parse(localStorage.getItem('user_friends_list') || '[]'); } catch (e) { existingFriends = []; }
      if (existingFriends.length === 0) {
        localStorage.setItem('user_friends_list', JSON.stringify(master.friends));
      }
    }
  }

  if (changed) {
    localStorage.setItem('users', JSON.stringify(users));
  }
};

// ── Auto-run sync on load ──
window.syncMasterUsers();

// ── Platform Settings Enforcement ──
(function () {
  try {
    var settings = JSON.parse(localStorage.getItem('PLATFORM_SETTINGS')) || {};
    var loggedInEmail = localStorage.getItem('loggedInUser');
    var href = window.location.href;

    // ── Global Ban Enforcement ──
    if (loggedInEmail) {
      var bannedUsers = [];
      try { bannedUsers = JSON.parse(localStorage.getItem('banned_users')) || []; } catch(e) { }
      if (bannedUsers.indexOf(loggedInEmail) > -1) {
        // Kill active session immediately
        localStorage.removeItem('loggedInUser');
        loggedInEmail = null;
        if (href.indexOf('giri_yap_login') === -1) {
          window.location.href = '../giri_yap_login/code.html';
          return;
        }
      }
    }

    // Check if user is founder
    var isFounder = false;
    if (loggedInEmail) {
      var masterList = window.MASTER_USERS || [];
      for (var i = 0; i < masterList.length; i++) {
        if (masterList[i].email === loggedInEmail && masterList[i].role === 'founder') {
          isFounder = true; break;
        }
      }
      isFounder = isFounder && (loggedInEmail === 'akuzumy1905@gmail.com');
    }

    // Expose maintenance status globally (for login page banner)
    window.DF_MAINTENANCE_MODE = !!(settings.maintenance);
    window.DF_IS_FOUNDER = isFounder;

    // 1. Maintenance Mode
    if (settings.maintenance && !isFounder) {
      // Pages that are exempt from maintenance redirect
      var isExemptPage = href.indexOf('giri_yap_login') > -1
        || href.indexOf('kay_t_ol_register') > -1
        || href.indexOf('splash_screen') > -1
        || href.indexOf('sifremi_unuttum') > -1
        || href.indexOf('admin_panel') > -1;

      if (!isExemptPage) {
        if (loggedInEmail) {
          localStorage.removeItem('loggedInUser');
        }
        window.location.href = '../giri_yap_login/code.html';
        return; // Stop further execution
      }

      // On login page, show a maintenance banner (non-blocking)
      if (href.indexOf('giri_yap_login') > -1) {
        document.addEventListener('DOMContentLoaded', function () {
          var banner = document.createElement('div');
          banner.id = 'maintenance-banner';
          banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:999;background:linear-gradient(90deg,#ff8800,#ff4444);padding:10px 20px;text-align:center;font-family:Outfit,sans-serif;font-size:13px;font-weight:700;color:#fff;letter-spacing:0.5px;box-shadow:0 4px 20px rgba(255,68,68,0.3);';
          var mLang = 'tr'; try { mLang = localStorage.getItem('preferred_lang') || 'tr'; } catch (e) { }
          banner.innerHTML = mLang === 'en' ? '🔧 Platform is currently in maintenance mode. Only founder accounts can log in.' : '🔧 Platform şu anda bakım modundadır. Kurucu hesabı dışında giriş yapılamaz.';
          document.body.insertBefore(banner, document.body.firstChild);
        });
      }
    }
  } catch (e) { }
})();
