/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Global Support Modal
 *  Self-contained: injects HTML, CSS, and EmailJS logic.
 *  Include this script on any page to enable support modal.
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ── EmailJS CDN loader ──
  function loadEmailJS(cb) {
    if (window.emailjs) return cb();
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = function () {
      emailjs.init('4nOnD1fyCLTj7BW3p');
      cb();
    };
    document.head.appendChild(s);
  }

  // ── Inject CSS ──
  var css = document.createElement('style');
  css.textContent = [
    '#support-modal-backdrop{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:none;align-items:center;justify-content:center;opacity:0;transition:opacity 0.35s ease;}',
    '#support-modal-backdrop.active{display:flex;opacity:1;}',
    '#support-modal-card{background:rgba(20, 21, 48, 0.95);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(139, 92, 246, 0.15);border-radius:2rem;padding:2.5rem 2rem;width:100%;max-width:460px;margin:1rem;box-shadow:0 0 60px rgba(139, 92, 246, 0.1),0 24px 48px rgba(0,0,0,0.5);transform:scale(0.92) translateY(20px);transition:transform 0.35s cubic-bezier(0.22,1,0.36,1),opacity 0.35s ease;opacity:0;font-family:"Poppins",sans-serif;}',
    '#support-modal-backdrop.active #support-modal-card{transform:scale(1) translateY(0);opacity:1;}',
    '.sm-input{width:100%;background:rgba(15, 16, 35, 0.9);border:1.5px solid rgba(139, 92, 246, 0.2);border-radius:0.75rem;color:#e2e2e8;padding:0.85rem 1rem 0.85rem 2.8rem;font-size:0.875rem;outline:none;transition:all 0.2s ease;font-family:"Poppins",sans-serif;}',
    '.sm-input:focus{border-color:rgba(139, 92, 246, 0.6);box-shadow:0 0 16px rgba(139, 92, 246, 0.15),0 0 4px rgba(139, 92, 246, 0.3);}',
    '.sm-input::placeholder{color:rgba(132,148,149,0.5);}',
    '.sm-textarea{resize:none;height:120px;padding-top:0.85rem;}',
    '.sm-label{display:block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:rgba(236, 72, 153, 0.8);margin-bottom:0.4rem;margin-left:0.25rem;font-family:"Outfit",sans-serif;}',
    '.sm-icon{position:absolute;left:0.85rem;top:50%;transform:translateY(-50%);color:rgba(139, 92, 246, 0.8);font-size:1.15rem;}',
    '.sm-icon-ta{top:1rem;transform:none;}',
    '.sm-send-btn{width:100%;padding:0.95rem;border-radius:12px;font-weight:800;font-size:0.95rem;text-transform:uppercase;letter-spacing:0.12em;color:#1E0A4B;background:linear-gradient(135deg, #8B5CF6, #EC4899);border:none;cursor:pointer;box-shadow:0 0 24px rgba(139, 92, 246, 0.35);transition:all 0.2s ease;font-family:"Syne",sans-serif;}',
    '.sm-send-btn:hover{transform:translateY(-2px);box-shadow:0 6px 28px rgba(139, 92, 246, 0.45);}',
    '.sm-send-btn:active{transform:translateY(0);}',
    '.sm-send-btn:disabled{opacity:0.65;cursor:not-allowed;transform:none;}',
    '.sm-close-btn{position:absolute;top:1.2rem;right:1.2rem;background:none;border:none;cursor:pointer;color:rgba(132,148,149,0.8);transition:color 0.2s;padding:4px;}',
    '.sm-close-btn:hover{color:#EC4899;}',
    '.sm-toast{position:fixed;top:5rem;left:50%;transform:translateX(-50%);z-index:10000;padding:0.85rem 1.5rem;border-radius:1rem;font-size:0.85rem;font-weight:600;display:none;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);animation:smToastIn 0.4s ease forwards;font-family:"Poppins",sans-serif;}',
    '.sm-toast.success{background:rgba(0,230,118,0.12);border:1px solid rgba(0,230,118,0.35);color:#e2e2e8;box-shadow:0 0 30px rgba(0,230,118,0.2);}',
    '.sm-toast.error{background:rgba(255,68,68,0.12);border:1px solid rgba(255,68,68,0.35);color:#ffb4ab;box-shadow:0 0 30px rgba(255,68,68,0.2);}',
    '@keyframes smToastIn{from{opacity:0;transform:translateX(-50%) translateY(-16px) scale(0.95);}to{opacity:1;transform:translateX(-50%) translateY(0) scale(1);}}'
  ].join('\n');
  document.head.appendChild(css);

  // ── Inject Modal HTML ──
  var modalHTML = [
    '<div id="support-modal-backdrop">',
    '  <div id="support-modal-card" style="position:relative;">',
    '    <button class="sm-close-btn" onclick="closeSupportModal()">',
    '      <span class="material-symbols-outlined" style="font-size:1.5rem;">close</span>',
    '    </button>',
    '    <div style="text-align:center;margin-bottom:1.5rem;">',
    '      <div style="width:56px;height:56px;margin:0 auto 1rem;border-radius:50%;background:linear-gradient(135deg, #8B5CF6, #EC4899);display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(139, 92, 246, 0.4);">',
    '        <span class="material-symbols-outlined" style="color:#1E0A4B;font-size:1.8rem;font-variation-settings:\'FILL\' 1;">support_agent</span>',
    '      </div>',
    '      <h3 style="font-family:\'Outfit\',sans-serif;font-weight:800;font-size:1.5rem;color:#e2e2e8;margin-bottom:0.25rem;">Destek Merkezi</h3>',
    '      <p style="font-size:0.8rem;color:#849495;">Sorunu anlat, en kısa sürede dönüş yapalım.</p>',
    '    </div>',
    '    <div style="display:flex;flex-direction:column;gap:1rem;">',
    '      <div>',
    '        <label class="sm-label">Ad Soyad</label>',
    '        <div style="position:relative;">',
    '          <span class="material-symbols-outlined sm-icon">person</span>',
    '          <input id="sm-name" class="sm-input" type="text" placeholder="Adın Soyadın" />',
    '        </div>',
    '      </div>',
    '      <div>',
    '        <label class="sm-label">E-posta</label>',
    '        <div style="position:relative;">',
    '          <span class="material-symbols-outlined sm-icon">mail</span>',
    '          <input id="sm-email" class="sm-input" type="email" placeholder="ornek@mail.com" />',
    '        </div>',
    '      </div>',
    '      <div>',
    '        <label class="sm-label">Mesajınız</label>',
    '        <div style="position:relative;">',
    '          <span class="material-symbols-outlined sm-icon sm-icon-ta">chat</span>',
    '          <textarea id="sm-message" class="sm-input sm-textarea" placeholder="Sorununuzu detaylı açıklayın..."></textarea>',
    '        </div>',
    '      </div>',
    '      <button id="sm-send-btn" class="sm-send-btn" onclick="submitSupportModal()">Gönder</button>',
    '    </div>',
    '  </div>',
    '</div>',
    '<div id="sm-toast" class="sm-toast"></div>'
  ].join('\n');

  var wrapper = document.createElement('div');
  wrapper.innerHTML = modalHTML;
  while (wrapper.firstChild) {
    document.body.appendChild(wrapper.firstChild);
  }

  // ── References ──
  var backdrop = document.getElementById('support-modal-backdrop');
  var card     = document.getElementById('support-modal-card');
  var toastEl  = document.getElementById('sm-toast');

  // ── Open ──
  window.openSupportModal = function () {
    backdrop.style.display = 'flex';
    // Force reflow so the transition fires
    void backdrop.offsetWidth;
    backdrop.classList.add('active');
  };

  // ── Close ──
  window.closeSupportModal = function () {
    backdrop.classList.remove('active');
    setTimeout(function () {
      backdrop.style.display = 'none';
    }, 350);
  };

  // ── Click outside to close ──
  backdrop.addEventListener('click', function (e) {
    if (e.target === backdrop) closeSupportModal();
  });

  // ── ESC key to close ──
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) closeSupportModal();
  });

  // ── Toast helper ──
  function showSmToast(msg, type) {
    toastEl.textContent = (type === 'success' ? '✓ ' : '✕ ') + msg;
    toastEl.className = 'sm-toast ' + type;
    toastEl.style.display = 'block';
    setTimeout(function () {
      toastEl.style.display = 'none';
    }, 4000);
  }

  // ── Submit ──
  window.submitSupportModal = function () {
    var nameEl    = document.getElementById('sm-name');
    var emailEl   = document.getElementById('sm-email');
    var messageEl = document.getElementById('sm-message');
    var btn       = document.getElementById('sm-send-btn');

    var name    = nameEl.value.trim();
    var email   = emailEl.value.trim();
    var message = messageEl.value.trim();

    if (!name || !email || !message) {
      showSmToast('Lütfen tüm alanları doldur!', 'error');
      return;
    }

    // Loading state
    btn.disabled = true;
    btn.textContent = 'Mesaj İletiliyor...';

    var templateParams = {
      name: name,
      email: email,
      message: message,
      from_name: 'İSTİKLAL Destek'
    };

    loadEmailJS(function () {
      emailjs.send('service_is4jo2s', 'template_gg6h54g', templateParams, '4nOnD1fyCLTj7BW3p')
        .then(function () {
          showSmToast('Talebiniz bize ulaştı, en kısa sürede dönüş sağlayacağız.', 'success');
          nameEl.value = '';
          emailEl.value = '';
          messageEl.value = '';
          btn.disabled = false;
          btn.textContent = 'Gönder';
          setTimeout(closeSupportModal, 1500);
        }, function (err) {
          showSmToast('Gönderim başarısız: ' + (err.text || err), 'error');
          btn.disabled = false;
          btn.textContent = 'Gönder';
        });
    });
  };
})();
