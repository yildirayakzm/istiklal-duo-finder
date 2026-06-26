/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Global Report & Moderation System
 *  Provides: Report modal, block user logic, toast notifications
 *  Include on ALL pages.
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ── TOAST NOTIFICATION ──
  function showToast(message, type) {
    var existing = document.getElementById('df-toast');
    if (existing) existing.remove();

    var colors = {
      success: { bg: 'rgba(0,255,136,0.12)', border: '#00ff88', icon: 'check_circle', iconColor: '#00ff88' },
      error: { bg: 'rgba(255,75,75,0.12)', border: '#ff4b4b', icon: 'error', iconColor: '#ff4b4b' },
      info: { bg: 'rgba(0,242,255,0.12)', border: '#00f2ff', icon: 'info', iconColor: '#00f2ff' },
      warning: { bg: 'rgba(255,170,0,0.12)', border: '#ffaa00', icon: 'warning', iconColor: '#ffaa00' }
    };
    var c = colors[type] || colors.success;

    var toast = document.createElement('div');
    toast.id = 'df-toast';
    toast.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%) translateY(-20px);z-index:9999;' +
      'background:' + c.bg + ';border:1px solid ' + c.border + ';backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);' +
      'border-radius:14px;padding:12px 20px;display:flex;align-items:center;gap:10px;' +
      'box-shadow:0 4px 24px rgba(0,0,0,0.4),0 0 15px ' + c.border + '30;' +
      'opacity:0;transition:opacity 0.3s ease,transform 0.3s ease;max-width:90vw;';
    toast.innerHTML =
      '<span class="material-symbols-outlined" style="color:' + c.iconColor + ';font-variation-settings:\'FILL\' 1;font-size:20px;">' + c.icon + '</span>' +
      '<span style="font-family:\'Space Grotesk\',sans-serif;font-weight:600;font-size:13px;color:#e2e2e8;white-space:nowrap;">' + message + '</span>';
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(function () { if (toast.parentNode) toast.remove(); }, 300);
    }, 3000);
  }
  window.showDFToast = showToast;

  // ── REPORT MODAL ──
  var modalInjected = false;

  function injectReportModal() {
    if (modalInjected) return;
    var modal = document.createElement('div');
    modal.id = 'report-modal';
    modal.className = 'fixed inset-0 z-[200] hidden';
    modal.innerHTML =
      '<div class="absolute inset-0 bg-black/70 backdrop-blur-md" id="report-backdrop"></div>' +
      '<div class="absolute inset-0 flex items-center justify-center p-4">' +
      '<div id="report-container" class="w-full max-w-md bg-[#1a1c20]/95 backdrop-blur-xl border border-[#ff4b4b]/25 rounded-3xl shadow-[0_0_40px_rgba(255,75,75,0.15)] overflow-hidden transform transition-all duration-300 scale-95 opacity-0">' +
      // Header
      '<div class="px-6 py-4 border-b border-[#ff4b4b]/20 flex items-center justify-between bg-[#1a1c20]/60">' +
      '<div class="flex items-center gap-2">' +
      '<span class="material-symbols-outlined text-[#ff4b4b] animate-pulse" style="font-variation-settings:\'FILL\' 1;">report</span>' +
      '<span class="font-[\'Space_Grotesk\'] font-bold text-[#ff4b4b] tracking-widest text-sm uppercase">Rapor Bildir</span>' +
      '</div>' +
      '<button id="report-close-btn" class="material-symbols-outlined text-[#849495] hover:text-[#ffb4ab] transition-colors active:scale-90 text-xl">close</button>' +
      '</div>' +
      // Body
      '<div class="p-6 space-y-4">' +
      // Category
      '<div>' +
      '<label class="block text-[10px] font-bold text-[#849495] uppercase tracking-widest mb-1.5 font-[\'Space_Grotesk\']">Şikayet Kategorisi</label>' +
      '<div class="relative">' +
      '<select id="report-category" class="w-full bg-[#282a2e]/60 border border-[#3a494b]/40 rounded-xl px-4 py-3 text-[#e2e2e8] outline-none focus:ring-1 focus:ring-[#ff4b4b]/30 focus:border-[#ff4b4b]/30 transition-all appearance-none cursor-pointer" style="font-size:14px;">' +
      '<option value="">Kategori seçin...</option>' +
      '<option value="cheat">🎮 Hile Kullanımı</option>' +
      '<option value="harassment">💬 Hakaret / Taciz</option>' +
      '<option value="inappropriate">👤 Uygunsuz Profil</option>' +
      '<option value="spam">📨 Spam / Reklam</option>' +
      '<option value="other">📋 Diğer</option>' +
      '</select>' +
      '<span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#849495] pointer-events-none" style="font-size:18px;">expand_more</span>' +
      '</div>' +
      '</div>' +
      // Username
      '<div>' +
      '<label class="block text-[10px] font-bold text-[#849495] uppercase tracking-widest mb-1.5 font-[\'Space_Grotesk\']">Kullanıcı Adı</label>' +
      '<input id="report-username" type="text" placeholder="Rapor edilecek kullanıcı..." class="w-full bg-[#282a2e]/60 border border-[#3a494b]/40 rounded-xl px-4 py-3 text-[#e2e2e8] placeholder:text-[#849495]/40 focus:ring-1 focus:ring-[#ff4b4b]/30 focus:border-[#ff4b4b]/30 outline-none transition-all" style="font-size:14px;"/>' +
      '</div>' +
      // Description
      '<div>' +
      '<label class="block text-[10px] font-bold text-[#849495] uppercase tracking-widest mb-1.5 font-[\'Space_Grotesk\']">Açıklama</label>' +
      '<textarea id="report-description" rows="3" placeholder="Detayları yazın..." class="w-full bg-[#282a2e]/60 border border-[#3a494b]/40 rounded-xl px-4 py-3 text-[#e2e2e8] placeholder:text-[#849495]/40 focus:ring-1 focus:ring-[#ff4b4b]/30 focus:border-[#ff4b4b]/30 outline-none transition-all resize-none" style="font-size:14px;"></textarea>' +
      '</div>' +
      '</div>' +
      // Footer
      '<div class="px-6 py-4 border-t border-[#3a494b]/20 flex gap-3">' +
      '<button id="report-cancel-btn" class="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-[#e2e2e8] border border-[#3a494b]/40 rounded-xl hover:bg-[#282a2e]/60 transition-all font-[\'Space_Grotesk\']">İptal</button>' +
      '<button id="report-submit-btn" class="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#ff3333] to-[#ff4b4b] rounded-xl shadow-[0_0_15px_rgba(255,75,75,0.3)] hover:scale-[1.02] active:scale-95 transition-all font-[\'Space_Grotesk\']">Rapor Gönder</button>' +
      '</div>' +
      '</div>' +
      '</div>';
    document.body.appendChild(modal);

    // Events
    var container = document.getElementById('report-container');
    document.getElementById('report-backdrop').addEventListener('click', closeReportModal);
    document.getElementById('report-close-btn').addEventListener('click', closeReportModal);
    document.getElementById('report-cancel-btn').addEventListener('click', closeReportModal);
    document.getElementById('report-submit-btn').addEventListener('click', submitReport);

    modalInjected = true;
  }

  function openReportModal(prefillUsername) {
    injectReportModal();
    var modal = document.getElementById('report-modal');
    var container = document.getElementById('report-container');
    modal.classList.remove('hidden');
    document.getElementById('report-category').value = '';
    document.getElementById('report-username').value = prefillUsername || '';
    document.getElementById('report-description').value = '';
    setTimeout(function () {
      container.classList.remove('scale-95', 'opacity-0');
      container.classList.add('scale-100', 'opacity-100');
    }, 50);
  }
  window.openReportModal = openReportModal;

  function closeReportModal() {
    var modal = document.getElementById('report-modal');
    var container = document.getElementById('report-container');
    if (!modal) return;
    container.classList.remove('scale-100', 'opacity-100');
    container.classList.add('scale-95', 'opacity-0');
    setTimeout(function () { modal.classList.add('hidden'); }, 300);
  }
  window.closeReportModal = closeReportModal;

  // ── ISOLATED REPORT EMAIL — No global emailjs.init() ──
  // Uses its own service/template/key to avoid conflicts with other EmailJS integrations
  function sendReportEmail(reportData) {
    if (typeof emailjs === 'undefined') {
      console.warn('[İSTİKLAL] EmailJS SDK not loaded — report email skipped.');
      return;
    }

    var templateParams = {
      from_name: reportData.reporter,           // Raporlayan
      to_name: reportData.username,              // Şikayet Edilen
      message: reportData.description,           // Açıklama
      category: reportData.category              // Şikayet Türü
    };

    emailjs.send(
      'service_ie9temp',
      'template_vq7ligv',
      templateParams,
      { publicKey: 'oIIqUotzVs9Zyuhd3' }
    ).then(function () {
      showToast('Raporunuz başarıyla gönderildi!', 'success');
    }).catch(function (err) {
      console.error('[İSTİKLAL] Report email error:', err);
      showToast('Mail gönderilirken bir hata oluştu!', 'error');
    });
  }
  window.sendReportEmail = sendReportEmail;

  function submitReport() {
    var category = document.getElementById('report-category').value;
    var username = document.getElementById('report-username').value.trim();
    var description = document.getElementById('report-description').value.trim();

    if (!category) { showToast('Lütfen bir kategori seçin', 'warning'); return; }
    if (!username) { showToast('Kullanıcı adı boş olamaz', 'warning'); return; }

    var report = {
      category: category,
      username: username,
      description: description,
      timestamp: new Date().toISOString(),
      reporter: localStorage.getItem('loggedInUser') || 'anonymous'
    };

    // 1. Save to localStorage (submitted_reports)
    try {
      var reports = JSON.parse(localStorage.getItem('submitted_reports') || '[]');
      reports.push(report);
      localStorage.setItem('submitted_reports', JSON.stringify(reports));
    } catch (e) { }

    // 2. Send email via isolated EmailJS
    sendReportEmail(report);

    // 3. Close modal & clean inputs
    closeReportModal();
  }

  // ── BLOCK USER LOGIC ──
  function blockUser(username) {
    if (!username) return;
    try {
      // Add to blocked list
      var blocked = JSON.parse(localStorage.getItem('blocked_users') || '[]');
      if (blocked.indexOf(username) === -1) {
        blocked.push(username);
        localStorage.setItem('blocked_users', JSON.stringify(blocked));
      }
      // Remove from friends list
      var friends = JSON.parse(localStorage.getItem('user_friends_list') || '[]');
      friends = friends.filter(function (f) { return f.id !== username; });
      localStorage.setItem('user_friends_list', JSON.stringify(friends));
      // Remove from duo contacts
      var contacts = JSON.parse(localStorage.getItem('duo_contacts_list') || '[]');
      contacts = contacts.filter(function (c) { return c.id !== username; });
      localStorage.setItem('duo_contacts_list', JSON.stringify(contacts));
    } catch (e) { }
    showToast(username + ' engellendi!', 'error');
  }
  window.blockUser = blockUser;

  function isBlocked(username) {
    try {
      var blocked = JSON.parse(localStorage.getItem('blocked_users') || '[]');
      return blocked.indexOf(username) !== -1;
    } catch (e) { return false; }
  }
  window.isUserBlocked = isBlocked;

  // Inject modal on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectReportModal);
  } else {
    injectReportModal();
  }

})();
