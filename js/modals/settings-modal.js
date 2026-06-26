/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Global Settings Modal (settings-modal.js)
 *  Self-contained: injects HTML, CSS, and logic.
 *  Include this script on any page to enable settings.
 *  Theme: Nexus Purple (#8B5CF6) + Pink (#EC4899)
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ── Inject CSS ──
  var css = document.createElement('style');
  css.id = 'settings-modal-css';
  css.textContent = [
    /* Backdrop */
    '#settings-modal-backdrop{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.65);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);display:none;align-items:center;justify-content:center;opacity:0;transition:opacity 0.35s ease;}',
    '#settings-modal-backdrop.active{display:flex;opacity:1;}',

    /* Card */
    '#settings-modal-card{position:relative;background:rgba(20,21,48,0.92);backdrop-filter:blur(32px);-webkit-backdrop-filter:blur(32px);border:1px solid rgba(139,92,246,0.2);border-radius:24px;padding:0;width:100%;max-width:520px;max-height:85vh;margin:1rem;box-shadow:0 24px 80px rgba(0,0,0,0.6),0 0 60px rgba(139,92,246,0.1);transform:scale(0.92) translateY(20px);transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1),opacity 0.35s ease;opacity:0;display:flex;flex-direction:column;overflow:hidden;}',
    '#settings-modal-backdrop.active #settings-modal-card{transform:scale(1) translateY(0);opacity:1;}',

    /* Body */
    '#settings-modal-body{overflow-y:auto;padding:1.5rem 1.75rem 2rem;flex:1;}',
    '#settings-modal-body::-webkit-scrollbar{width:4px;}',
    '#settings-modal-body::-webkit-scrollbar-track{background:transparent;}',
    '#settings-modal-body::-webkit-scrollbar-thumb{background:rgba(139,92,246,0.3);border-radius:10px;}',
    '#settings-modal-body::-webkit-scrollbar-thumb:hover{background:rgba(139,92,246,0.6);}',

    /* Sections */
    '.stg-section{margin-bottom:1.25rem;}',
    '.stg-section:last-child{margin-bottom:0;}',
    '.stg-section-title{font-family:"Outfit",sans-serif;font-weight:800;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#8B5CF6;margin-bottom:0.75rem;display:flex;align-items:center;gap:6px;}',
    '.stg-section-title .material-symbols-outlined{font-size:16px;color:#8B5CF6;filter:drop-shadow(0 0 6px rgba(139,92,246,0.4));}',

    /* Fields */
    '.stg-field{margin-bottom:0.85rem;}',
    '.stg-field:last-child{margin-bottom:0;}',
    '.stg-label{display:block;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.15em;color:rgba(139,92,246,0.6);margin-bottom:0.35rem;margin-left:0.15rem;font-family:"Outfit",sans-serif;}',
    '.stg-input{width:100%;background:rgba(7,8,24,0.8);border:1.5px solid rgba(45,46,74,0.4);border-radius:12px;color:#e2e2e8;padding:0.7rem 0.85rem;font-size:0.82rem;outline:none;transition:all 0.25s ease;font-family:"Poppins",sans-serif;box-sizing:border-box;}',
    '.stg-input:focus{border-color:rgba(139,92,246,0.5);box-shadow:0 0 16px rgba(139,92,246,0.12);}',
    '.stg-input::placeholder{color:rgba(132,148,149,0.35);}',
    '.stg-input.error{border-color:rgba(255,107,107,0.6);box-shadow:0 0 12px rgba(255,107,107,0.12);}',
    '.stg-divider{height:1px;background:rgba(45,46,74,0.3);margin:1.25rem 0;}',

    /* Checkbox */
    '.stg-check-row{display:flex;align-items:center;gap:10px;padding:0.5rem 0;cursor:pointer;}',
    '.stg-checkbox{width:18px;height:18px;border:2px solid rgba(45,46,74,0.6);border-radius:6px;background:rgba(7,8,24,0.8);display:flex;align-items:center;justify-content:center;transition:all 0.25s ease;flex-shrink:0;}',
    '.stg-checkbox.checked{border-color:#8B5CF6;background:rgba(139,92,246,0.15);}',
    '.stg-checkbox.checked::after{content:"✓";color:#8B5CF6;font-size:12px;font-weight:700;}',
    '.stg-check-label{font-size:0.82rem;color:#b9cacb;font-family:"Poppins",sans-serif;}',

    /* Save Button */
    '.stg-save-btn{width:100%;padding:0.85rem;border-radius:14px;font-weight:800;font-size:0.82rem;text-transform:uppercase;letter-spacing:0.15em;color:#fff;background:linear-gradient(135deg,#8B5CF6,#7C3AED);border:none;cursor:pointer;box-shadow:0 6px 24px rgba(139,92,246,0.3);transition:all 0.25s ease;font-family:"Outfit",sans-serif;}',
    '.stg-save-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(139,92,246,0.5);}',
    '.stg-save-btn:active{transform:scale(0.97);}',

    /* Password Change Button */
    '.stg-password-btn{width:100%;padding:0.7rem;border-radius:12px;font-weight:700;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.12em;color:#e2e2e8;background:transparent;border:1.5px solid rgba(139,92,246,0.25);cursor:pointer;transition:all 0.25s ease;font-family:"Outfit",sans-serif;}',
    '.stg-password-btn:hover{border-color:rgba(139,92,246,0.5);background:rgba(139,92,246,0.08);box-shadow:0 0 16px rgba(139,92,246,0.1);}',

    /* Password Save Button */
    '.stg-pw-save-btn{width:100%;padding:0.6rem;border-radius:12px;font-weight:800;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.12em;color:#fff;background:linear-gradient(135deg,#8B5CF6,#7C3AED);border:none;cursor:pointer;box-shadow:0 4px 16px rgba(139,92,246,0.25);transition:all 0.25s ease;font-family:"Outfit",sans-serif;margin-top:0.6rem;}',
    '.stg-pw-save-btn:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(139,92,246,0.4);}',

    /* Delete Account Button */
    '.stg-delete-btn{width:100%;padding:0.7rem;border-radius:12px;font-weight:700;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.12em;color:#ff6b6b;background:transparent;border:1.5px solid rgba(255,107,107,0.2);cursor:pointer;transition:all 0.25s ease;font-family:"Outfit",sans-serif;margin-top:0.5rem;}',
    '.stg-delete-btn:hover{border-color:rgba(255,107,107,0.5);background:rgba(255,107,107,0.08);box-shadow:0 0 16px rgba(255,107,107,0.15);}',

    /* Close Button */
    '.stg-close-btn{position:absolute;top:1rem;right:1rem;width:36px;height:36px;border-radius:10px;border:1px solid rgba(45,46,74,0.3);background:rgba(10,11,30,0.5);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#849495;transition:all 0.2s ease;padding:0;z-index:5;}',
    '.stg-close-btn:hover{color:#ff6b6b;border-color:rgba(255,107,107,0.3);}',

    /* Password form */
    '#stg-pw-form{display:none;margin-top:0.75rem;padding:0.85rem;background:rgba(7,8,24,0.5);border:1px solid rgba(139,92,246,0.1);border-radius:14px;}',
    '#stg-pw-form.visible{display:block;}',

    /* Toast */
    '.stg-toast{position:fixed;top:5rem;left:50%;transform:translateX(-50%);z-index:10000;padding:0.85rem 1.5rem;border-radius:14px;font-size:0.82rem;font-weight:600;display:none;visibility:hidden;opacity:0;pointer-events:none;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);font-family:"Outfit",sans-serif;align-items:center;gap:8px;}',
    '.stg-toast.success{display:flex;visibility:visible;opacity:1;pointer-events:auto;background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.25);color:#e2e2e8;box-shadow:0 12px 40px rgba(0,0,0,0.5),0 0 20px rgba(0,255,136,0.08);animation:stgToastIn 0.4s ease forwards;}',
    '.stg-toast.error{display:flex;visibility:visible;opacity:1;pointer-events:auto;background:rgba(255,107,107,0.08);border:1px solid rgba(255,107,107,0.25);color:#ff6b6b;box-shadow:0 12px 40px rgba(0,0,0,0.5),0 0 20px rgba(255,107,107,0.08);animation:stgToastIn 0.4s ease forwards;}',
    '@keyframes stgToastIn{from{opacity:0;transform:translateX(-50%) translateY(-16px) scale(0.95);}to{opacity:1;transform:translateX(-50%) translateY(0) scale(1);}}'
  ].join('\n');
  document.head.appendChild(css);

  // ── Inject Modal HTML ──
  var modalHTML = [
    '<div id="settings-modal-backdrop">',
    '  <div id="settings-modal-card">',
    '    <button class="stg-close-btn" onclick="closeSettingsModal()">',
    '      <span class="material-symbols-outlined" style="font-size:20px;">close</span>',
    '    </button>',
    /* Header */
    '    <div style="padding:1.75rem 1.75rem 0;text-align:center;">',
    '      <div style="width:56px;height:56px;margin:0 auto 0.75rem;border-radius:16px;background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(236,72,153,0.08));border:1px solid rgba(139,92,246,0.2);display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(139,92,246,0.15);">',
    '        <span class="material-symbols-outlined" style="color:#8B5CF6;font-size:28px;font-variation-settings:\'FILL\' 1;filter:drop-shadow(0 0 8px rgba(139,92,246,0.5));">settings</span>',
    '      </div>',
    '      <h3 style="font-family:\'Outfit\',sans-serif;font-weight:800;font-size:1.2rem;color:#e2e2e8;margin-bottom:0.2rem;letter-spacing:-0.02em;">Ayarlar</h3>',
    '      <p style="font-size:0.72rem;color:#849495;margin-bottom:0;font-family:\'Poppins\',sans-serif;">Hesap ve uygulama tercihlerini yönet.</p>',
    '    </div>',
    /* Scrollable body */
    '    <div id="settings-modal-body">',
    /* Section: Profile */
    '      <div class="stg-section">',
    '        <div class="stg-section-title"><span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1;">person</span>PROFİL BİLGİLERİ</div>',
    '        <div class="stg-field">',
    '          <label class="stg-label">Kullanıcı Adı</label>',
    '          <input id="stg-username" class="stg-input" type="text" placeholder="Kullanıcı adını gir"/>',
    '        </div>',
    '        <div class="stg-field">',
    '          <label class="stg-label">E-Posta</label>',
    '          <input id="stg-email" class="stg-input" type="email" placeholder="ornek@mail.com"/>',
    '        </div>',
    '        <div class="stg-field">',
    '          <label class="stg-label">Kısa Biyografi</label>',
    '          <input id="stg-bio" class="stg-input" type="text" placeholder="Hakkında kısaca yaz..." maxlength="120"/>',
    '        </div>',
    '      </div>',
    /* Section: Game Accounts */
    '      <div class="stg-divider"></div>',
    '      <div class="stg-section">',
    '        <div class="stg-section-title"><span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1;">sports_esports</span>OYUN HESAPLARI</div>',
    '        <div class="stg-field">',
    '          <label class="stg-label">Riot ID</label>',
    '          <input id="stg-riot-id" class="stg-input" type="text" placeholder="Oyuncu#TR1"/>',
    '        </div>',
    '        <div class="stg-field">',
    '          <label class="stg-label">Discord ID</label>',
    '          <input id="stg-discord-id" class="stg-input" type="text" placeholder="oyuncu#1234"/>',
    '        </div>',
    '        <div class="stg-field">',
    '          <label class="stg-label">Steam Profil Linki</label>',
    '          <input id="stg-steam-url" class="stg-input" type="url" placeholder="https://steamcommunity.com/id/..."/>',
    '        </div>',
    '      </div>',
    /* Section: Notifications */
    '      <div class="stg-divider"></div>',
    '      <div class="stg-section">',
    '        <div class="stg-section-title"><span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1;">notifications</span>BİLDİRİM AYARLARI</div>',
    '        <div id="stg-email-notif-row" class="stg-check-row">',
    '          <div id="stg-email-notif-check" class="stg-checkbox checked"></div>',
    '          <span class="stg-check-label">Raporlarım onaylandığında mail gelsin</span>',
    '        </div>',
    '      </div>',
    /* Section: Account */
    '      <div class="stg-divider"></div>',
    '      <div class="stg-section">',
    '        <div class="stg-section-title"><span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1;">manage_accounts</span>HESAP YÖNETİMİ</div>',
    '        <button id="stg-change-pw-btn" class="stg-password-btn">Şifre Değiştir</button>',
    /* Inline password form (hidden by default) */
    '        <div id="stg-pw-form">',
    '          <div class="stg-field">',
    '            <label class="stg-label">Mevcut Şifre</label>',
    '            <input id="stg-pw-current" class="stg-input" type="password" placeholder="Şu anki şifreniz"/>',
    '          </div>',
    '          <div class="stg-field">',
    '            <label class="stg-label">Yeni Şifre (min 6 karakter)</label>',
    '            <input id="stg-pw-new" class="stg-input" type="password" placeholder="Yeni şifre"/>',
    '          </div>',
    '          <div class="stg-field">',
    '            <label class="stg-label">Yeni Şifre (Tekrar)</label>',
    '            <input id="stg-pw-confirm" class="stg-input" type="password" placeholder="Yeni şifreyi tekrar girin"/>',
    '          </div>',
    '          <button id="stg-pw-submit" class="stg-pw-save-btn">Şifreyi Güncelle</button>',
    '        </div>',
    '        <button id="stg-delete-account-btn" class="stg-delete-btn">Hesabı Kalıcı Olarak Sil</button>',
    '      </div>',
    /* Save */
    '      <div style="margin-top:0.75rem;">',
    '        <button id="stg-save-btn" class="stg-save-btn">Değişiklikleri Kaydet</button>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</div>',
    '<div id="stg-toast" class="stg-toast"></div>'
  ].join('\n');

  var wrapper = document.createElement('div');
  wrapper.innerHTML = modalHTML;
  while (wrapper.firstChild) {
    document.body.appendChild(wrapper.firstChild);
  }

  // ── References ──
  var backdrop = document.getElementById('settings-modal-backdrop');
  var toastEl  = document.getElementById('stg-toast');

  // ── STORAGE KEY ──
  var STG_KEY = 'df_settings';

  function loadSettings() {
    try {
      var s = JSON.parse(localStorage.getItem(STG_KEY));
      if (s) return s;
    } catch (e) {}
    return {};
  }

  function saveSettings(data) {
    try { localStorage.setItem(STG_KEY, JSON.stringify(data)); } catch(e) {}
  }

  // ── Helper: get current user record ──
  function getCurrentUser() {
    try {
      var loggedInEmail = localStorage.getItem('loggedInUser') || '';
      var users = JSON.parse(localStorage.getItem('users') || '[]');
      for (var i = 0; i < users.length; i++) {
        if (users[i].email === loggedInEmail) {
          return { user: users[i], index: i, users: users, email: loggedInEmail };
        }
      }
    } catch (e) {}
    return null;
  }

  // ── Populate from user record + settings ──
  function populateFields() {
    var settings = loadSettings();
    var record = getCurrentUser();
    var user = record ? record.user : {};
    var email = record ? record.email : '';

    // Profile fields — prioritize settings, fallback to user record
    document.getElementById('stg-username').value = settings.username || user.username || '';
    document.getElementById('stg-email').value = settings.email || email || '';
    document.getElementById('stg-bio').value = settings.bio || user.bio || '';

    // Game accounts — from settings
    document.getElementById('stg-riot-id').value = settings.riotId || '';
    document.getElementById('stg-discord-id').value = settings.discordId || '';
    document.getElementById('stg-steam-url').value = settings.steamUrl || '';

    // Checkbox
    var emailCheck = document.getElementById('stg-email-notif-check');
    if (settings.emailNotif === false) {
      emailCheck.classList.remove('checked');
    } else {
      emailCheck.classList.add('checked');
    }

    // Reset password form
    var pwForm = document.getElementById('stg-pw-form');
    pwForm.classList.remove('visible');
    document.getElementById('stg-pw-current').value = '';
    document.getElementById('stg-pw-new').value = '';
    document.getElementById('stg-pw-confirm').value = '';
    clearInputErrors();
  }

  function clearInputErrors() {
    var inputs = document.querySelectorAll('#stg-pw-form .stg-input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove('error');
    }
  }

  // ── Checkbox toggle ──
  document.getElementById('stg-email-notif-row').addEventListener('click', function () {
    var check = document.getElementById('stg-email-notif-check');
    check.classList.toggle('checked');
  });

  // ── Open ──
  window.openSettingsModal = function () {
    populateFields();
    backdrop.style.display = 'flex';
    void backdrop.offsetWidth;
    backdrop.classList.add('active');
  };

  // ── Close ──
  window.closeSettingsModal = function () {
    backdrop.classList.remove('active');
    setTimeout(function () {
      backdrop.style.display = 'none';
    }, 350);
  };

  // ── Click outside to close ──
  backdrop.addEventListener('click', function (e) {
    if (e.target === backdrop) closeSettingsModal();
  });

  // ── ESC key ──
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) closeSettingsModal();
  });

  // ── Toast ──
  function showStgToast(msg, type) {
    type = type || 'success';
    toastEl.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px;color:' + (type === 'success' ? '#00ff88' : '#ff6b6b') + ';font-variation-settings:\'FILL\' 1;filter:drop-shadow(0 0 6px ' + (type === 'success' ? 'rgba(0,255,136,0.4)' : 'rgba(255,107,107,0.4)') + ');">' + (type === 'success' ? 'check_circle' : 'error') + '</span><span>' + msg + '</span>';
    toastEl.className = 'stg-toast ' + type;
    setTimeout(function () {
      toastEl.className = 'stg-toast';
      toastEl.innerHTML = '';
    }, 3500);
  }

  // ══════════════════════════════════════════════
  //  SAVE — Persist all fields to df_settings + user record
  // ══════════════════════════════════════════════
  document.getElementById('stg-save-btn').addEventListener('click', function () {
    var settings = {
      username: document.getElementById('stg-username').value.trim(),
      email: document.getElementById('stg-email').value.trim(),
      bio: document.getElementById('stg-bio').value.trim(),
      riotId: document.getElementById('stg-riot-id').value.trim(),
      discordId: document.getElementById('stg-discord-id').value.trim(),
      steamUrl: document.getElementById('stg-steam-url').value.trim(),
      emailNotif: document.getElementById('stg-email-notif-check').classList.contains('checked')
    };
    saveSettings(settings);

    // Also update the user record in localStorage
    var record = getCurrentUser();
    if (record) {
      if (settings.username) record.user.username = settings.username;
      if (settings.bio !== undefined) record.user.bio = settings.bio;
      record.users[record.index] = record.user;
      try { localStorage.setItem('users', JSON.stringify(record.users)); } catch(e) {}
    }

    showStgToast('Değişiklikler başarıyla kaydedildi!');
    setTimeout(closeSettingsModal, 1200);
  });

  // ══════════════════════════════════════════════
  //  SECURE PASSWORD CHANGE — 3-field validation
  // ══════════════════════════════════════════════
  document.getElementById('stg-change-pw-btn').addEventListener('click', function () {
    var pwForm = document.getElementById('stg-pw-form');
    pwForm.classList.toggle('visible');
    clearInputErrors();
  });

  document.getElementById('stg-pw-submit').addEventListener('click', function () {
    clearInputErrors();

    var currentPw = document.getElementById('stg-pw-current').value;
    var newPw     = document.getElementById('stg-pw-new').value;
    var confirmPw = document.getElementById('stg-pw-confirm').value;

    // Get actual password from user record
    var record = getCurrentUser();
    if (!record) {
      showStgToast('Kullanıcı bulunamadı!', 'error');
      return;
    }

    // Validate current password
    if (currentPw !== record.user.password) {
      document.getElementById('stg-pw-current').classList.add('error');
      showStgToast('Mevcut şifre yanlış!', 'error');
      return;
    }

    // Validate new password length
    if (newPw.length < 6) {
      document.getElementById('stg-pw-new').classList.add('error');
      showStgToast('Yeni şifre en az 6 karakter olmalı!', 'error');
      return;
    }

    // Validate passwords match
    if (newPw !== confirmPw) {
      document.getElementById('stg-pw-confirm').classList.add('error');
      showStgToast('Yeni şifreler eşleşmiyor!', 'error');
      return;
    }

    // All good — update password
    record.user.password = newPw;
    record.users[record.index] = record.user;
    try { localStorage.setItem('users', JSON.stringify(record.users)); } catch(e) {}

    // Reset form
    document.getElementById('stg-pw-current').value = '';
    document.getElementById('stg-pw-new').value = '';
    document.getElementById('stg-pw-confirm').value = '';
    document.getElementById('stg-pw-form').classList.remove('visible');

    showStgToast('Şifre başarıyla değiştirildi!');
  });

  // ══════════════════════════════════════════════
  //  DELETE ACCOUNT — Custom confirmation
  // ══════════════════════════════════════════════
  document.getElementById('stg-delete-account-btn').addEventListener('click', function () {
    if (!confirm("Tüm verilerin ve 'Duo'ların silinecek, emin misin?\n\nBu işlem geri alınamaz!")) return;

    try {
      var loggedInEmail = localStorage.getItem('loggedInUser') || '';
      var users = JSON.parse(localStorage.getItem('users') || '[]');
      users = users.filter(function (u) { return u.email !== loggedInEmail; });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('user_profile_image');
      localStorage.removeItem('df_settings');
      localStorage.removeItem('user_friends_list');
      localStorage.removeItem('user_hardware_data');
      localStorage.removeItem('duo_contacts_list');
      localStorage.removeItem('submitted_reports');
      window.location.href = '../duo_finder_dashboard_yeni/code.html';
    } catch (e) {}
  });

  // ── Legacy alias ──
  window.showSettingsAlert = window.openSettingsModal;
})();
