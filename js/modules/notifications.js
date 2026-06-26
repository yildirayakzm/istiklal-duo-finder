/**
 * ═══════════════════════════════════════════
 *  İSTİKLAL — Centralized Notification System
 *  Shared across all pages via localStorage
 * ═══════════════════════════════════════════
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'globalNotifications';

  // ── Default seed notifications ──
  var DEFAULT_NOTIFICATIONS = [];

  // ── Read / Write ──
  function getNotifications() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) {
        return [];
      }
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }


  function saveNotifications(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  // ── Add new notification (public API) ──
  // Usage: addNotification({ text: "...", icon: "person_add", iconColor: "#00f2ff" })
  window.addNotification = function (opts) {
    var notifications = getNotifications();
    var now = new Date();
    var timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    var newNotif = {
      id: 'n' + Date.now(),
      icon: opts.icon || 'notifications',
      iconColor: opts.iconColor || '#00f2ff',
      bgColor: opts.bgColor || 'rgba(0,242,255,0.1)',
      borderColor: opts.borderColor || '#00f2ff',
      text: opts.text || '',
      time: timeStr,
      isRead: false
    };
    // Add to beginning (newest first)
    notifications.unshift(newNotif);
    saveNotifications(notifications);
    updateBadge();
    renderNotifications();
    updateCountLabel();
    return newNotif;
  };

  // ── Render badge (unread count only) ──
  function updateBadge() {
    var badge = document.getElementById('notif-badge');
    if (!badge) return;
    var notifications = getNotifications();
    var unreadCount = 0;
    notifications.forEach(function (n) { if (!n.isRead) unreadCount++; });
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = 'flex';
    } else {
      badge.textContent = '0';
      badge.style.display = 'none';
    }
  }

  // ── Render notification count label ──
  function updateCountLabel() {
    var label = document.getElementById('notif-count-label');
    if (!label) return;
    var n = getNotifications();
    var unread = 0;
    n.forEach(function (x) { if (!x.isRead) unread++; });
    label.textContent = unread > 0 ? unread + ' yeni' : (n.length > 0 ? 'Hepsi okundu' : 'Boş');
  }

  // ── Build a single notification item element ──
  function buildNotifItem(n) {
    var item = document.createElement('div');
    item.className = 'notif-item px-4 py-3 flex items-start gap-3 hover:bg-[#00f2ff]/5 transition-all duration-300'
      + (n.borderColor && n.borderColor !== 'transparent' ? ' border-l-2' : '')
      + (n.isRead || n.dimmed ? ' opacity-60' : '');
    item.style.borderLeftColor = (n.borderColor && n.borderColor !== 'transparent') ? n.borderColor : '';
    item.setAttribute('data-notif-id', n.id);

    item.innerHTML =
      '<div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style="background:' + n.bgColor + '">' +
        '<span class="material-symbols-outlined text-sm" style="color:' + n.iconColor + ';font-variation-settings:\'FILL\' 1;">' + n.icon + '</span>' +
      '</div>' +
      '<div class="flex-1">' +
        '<p class="text-sm text-[#e2e2e8]">' + n.text + '</p>' +
        '<span class="text-[10px] text-[#849495]">' + n.time + '</span>' +
      '</div>' +
      (!n.isRead ? '<div class="w-2 h-2 rounded-full bg-[#00f2ff] flex-shrink-0 mt-2 shadow-[0_0_6px_rgba(0,242,255,0.5)]"></div>' : '');

    return item;
  }

  // ── Render the notification list (newest first) ──
  function renderNotifications() {
    var list = document.getElementById('notif-list');
    if (!list) return;
    var notifications = getNotifications();

    list.innerHTML = '';

    if (notifications.length === 0) {
      list.innerHTML =
        '<div class="px-4 py-8 text-center">' +
          '<span class="material-symbols-outlined text-[#3a494b] text-4xl mb-2">notifications_off</span>' +
          '<p class="text-[12px] text-[#849495] tracking-wide">Bildiriminiz bulunmuyor</p>' +
        '</div>';
      return;
    }

    // Newest first (already ordered if using unshift in addNotification)
    notifications.forEach(function (n) {
      list.appendChild(buildNotifItem(n));
    });
  }

  // ── Clear all with fade-out animation ──
  window.clearNotifications = function () {
    var list = document.getElementById('notif-list');
    if (!list) return;

    var items = list.querySelectorAll('.notif-item');
    if (items.length === 0) {
      saveNotifications([]);
      updateBadge();
      updateCountLabel();
      renderNotifications();
      return;
    }

    items.forEach(function (item, idx) {
      setTimeout(function () {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.maxHeight = item.scrollHeight + 'px';
        setTimeout(function () {
          item.style.maxHeight = '0';
          item.style.padding = '0 16px';
          item.style.overflow = 'hidden';
        }, 200);
      }, idx * 80);
    });

    var totalDelay = items.length * 80 + 400;
    setTimeout(function () {
      saveNotifications([]);
      updateBadge();
      updateCountLabel();
      renderNotifications();
    }, totalDelay);
  };

  // ── Mark all as read ──
  window.markNotificationsRead = function () {
    var notifications = getNotifications();
    notifications.forEach(function (n) { n.isRead = true; });
    saveNotifications(notifications);
    updateBadge();
    updateCountLabel();
    renderNotifications();
  };

  // ── Toggle dropdown ──
  function initDropdownToggle() {
    var notifBtn = document.getElementById('notif-btn');
    var notifDropdown = document.getElementById('notif-dropdown');
    if (!notifBtn || !notifDropdown) return;

    notifBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      notifDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', function (e) {
      var wrapper = document.getElementById('notif-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        notifDropdown.classList.add('hidden');
      }
    });
  }

  // ── Init on DOM ready ──
  function init() {
    updateBadge();
    renderNotifications();
    updateCountLabel();
    initDropdownToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
