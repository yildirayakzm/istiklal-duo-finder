/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Global Feedback / İstek & Öneri Modal
 *  Self-contained: injects HTML, CSS, and EmailJS logic.
 *  Positive-toned modal (blue/purple neon) for suggestions.
 *  Include this script on any page.
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ── Inject CSS ──
  var css = document.createElement('style');
  css.id = 'feedback-modal-css';
  css.textContent = [
    '#feedback-modal{position:fixed;inset:0;z-index:200;display:none;}',
    '#feedback-modal.open{display:block;}',
    '#feedback-backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}',
    '#feedback-card{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.92);width:100%;max-width:460px;margin:0 1rem;background:rgba(26,28,32,0.94);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(130,100,255,0.25);border-radius:1.5rem;box-shadow:0 0 60px rgba(130,100,255,0.12),0 24px 48px rgba(0,0,0,0.5);opacity:0;transition:all 0.35s cubic-bezier(0.22,1,0.36,1);overflow:hidden;display:flex;flex-direction:column;max-height:85vh;}',
    '#feedback-modal.open #feedback-card{transform:translate(-50%,-50%) scale(1);opacity:1;}',
    '#feedback-body{overflow-y:auto;padding:1.5rem 1.75rem 1.75rem;flex:1;}',
    '#feedback-body::-webkit-scrollbar{width:4px;}',
    '#feedback-body::-webkit-scrollbar-track{background:transparent;}',
    '#feedback-body::-webkit-scrollbar-thumb{background:rgba(130,100,255,0.3);border-radius:10px;}',
    '.fb-label{display:block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:rgba(130,100,255,0.7);margin-bottom:0.4rem;margin-left:0.1rem;font-family:"Space Grotesk",sans-serif;}',
    '.fb-input{width:100%;background:rgba(17,19,24,0.9);border:1.5px solid rgba(58,73,75,0.4);border-radius:0.65rem;color:#e2e2e8;padding:0.75rem 0.9rem;font-size:0.83rem;outline:none;transition:all 0.2s ease;font-family:"Plus Jakarta Sans",sans-serif;}',
    '.fb-input:focus{border-color:rgba(130,100,255,0.6);box-shadow:0 0 14px rgba(130,100,255,0.12);}',
    '.fb-input::placeholder{color:rgba(132,148,149,0.4);}',
    '.fb-textarea{resize:none;height:110px;}',
    '.fb-send-btn{width:100%;padding:0.85rem;border-radius:9999px;font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.12em;color:#fff;background:linear-gradient(135deg,#7c5cfc,#a78bfa);border:none;cursor:pointer;box-shadow:0 0 24px rgba(130,100,255,0.3);transition:all 0.2s ease;font-family:"Space Grotesk",sans-serif;margin-top:0.5rem;}',
    '.fb-send-btn:hover{transform:scale(1.02);box-shadow:0 0 36px rgba(130,100,255,0.5);}',
    '.fb-send-btn:active{transform:scale(0.97);}',
    '.fb-send-btn:disabled{opacity:0.6;cursor:not-allowed;transform:none;}',
    '.fb-close{position:absolute;top:1rem;right:1rem;background:none;border:none;cursor:pointer;color:rgba(132,148,149,0.8);transition:color 0.2s;padding:4px;z-index:5;}',
    '.fb-close:hover{color:#ffb4ab;}',
    '.fb-toast{position:fixed;top:5rem;left:50%;transform:translateX(-50%);z-index:10001;padding:0.85rem 1.5rem;border-radius:1rem;font-size:0.85rem;font-weight:600;display:none;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);animation:fbToastIn 0.4s ease forwards;font-family:"Plus Jakarta Sans",sans-serif;background:rgba(130,100,255,0.12);border:1px solid rgba(130,100,255,0.35);color:#e2e2e8;box-shadow:0 0 30px rgba(130,100,255,0.2);}',
    '@keyframes fbToastIn{from{opacity:0;transform:translateX(-50%) translateY(-16px) scale(0.95);}to{opacity:1;transform:translateX(-50%) translateY(0) scale(1);}}'
  ].join('\n');
  document.head.appendChild(css);

  // ── Inject Modal HTML ──
  var html = [
    '<div id="feedback-modal">',
    '  <div id="feedback-backdrop"></div>',
    '  <div id="feedback-card">',
    '    <button class="fb-close" id="fb-close-btn">',
    '      <span class="material-symbols-outlined" style="font-size:1.5rem;">close</span>',
    '    </button>',
    /* Header */
    '    <div style="padding:1.5rem 1.75rem 0;text-align:center;">',
    '      <div style="width:52px;height:52px;margin:0 auto 0.75rem;border-radius:50%;background:linear-gradient(135deg,#7c5cfc,#a78bfa);display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(130,100,255,0.35);">',
    '        <span class="material-symbols-outlined" style="color:#fff;font-size:1.6rem;font-variation-settings:\'FILL\' 1;">lightbulb</span>',
    '      </div>',
    '      <h3 style="font-family:\'Space Grotesk\',sans-serif;font-weight:800;font-size:1.15rem;color:#e2e2e8;margin-bottom:0.2rem;">İstek & Öneri</h3>',
    '      <p style="font-size:0.75rem;color:#849495;margin-bottom:0;">Fikirlerini paylaş, platformu birlikte geliştirelim!</p>',
    '    </div>',
    /* Body */
    '    <div id="feedback-body">',
    '      <div style="margin-bottom:0.85rem;">',
    '        <label class="fb-label">Başlık</label>',
    '        <input id="fb-title" class="fb-input" type="text" placeholder="Önerinizi kısaca özetleyin..." maxlength="80"/>',
    '      </div>',
    '      <div style="margin-bottom:0.85rem;">',
    '        <label class="fb-label">Kategori</label>',
    '        <select id="fb-category" class="fb-input" style="cursor:pointer;">',
    '          <option value="">Kategori seçin...</option>',
    '          <option value="feature">🚀 Yeni Özellik İsteği</option>',
    '          <option value="improvement">⚡ Mevcut Özelliği Geliştir</option>',
    '          <option value="design">🎨 Tasarım Önerisi</option>',
    '          <option value="other">💡 Diğer</option>',
    '        </select>',
    '      </div>',
    '      <div style="margin-bottom:0.85rem;">',
    '        <label class="fb-label">Detaylı Açıklama</label>',
    '        <textarea id="fb-description" class="fb-input fb-textarea" placeholder="Fikrinizi detaylı anlatın..."></textarea>',
    '      </div>',
    '      <button id="fb-send-btn" class="fb-send-btn">Gönder</button>',
    '    </div>',
    '  </div>',
    '</div>',
    '<div id="fb-toast" class="fb-toast"></div>'
  ].join('\n');

  var wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  while (wrapper.firstChild) {
    document.body.appendChild(wrapper.firstChild);
  }

  // ── References ──
  var modal    = document.getElementById('feedback-modal');
  var toastEl  = document.getElementById('fb-toast');

  // ── Open ──
  window.openFeedbackModal = function () {
    document.getElementById('fb-title').value = '';
    document.getElementById('fb-category').value = '';
    document.getElementById('fb-description').value = '';
    var btn = document.getElementById('fb-send-btn');
    btn.disabled = false;
    btn.textContent = 'Gönder';
    modal.classList.add('open');
  };

  // ── Close ──
  window.closeFeedbackModal = function () {
    modal.classList.remove('open');
  };

  document.getElementById('feedback-backdrop').addEventListener('click', closeFeedbackModal);
  document.getElementById('fb-close-btn').addEventListener('click', closeFeedbackModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeFeedbackModal();
  });

  // ── Toast ──
  function showFbToast(msg, isError) {
    toastEl.textContent = (isError ? '✕ ' : '✓ ') + msg;
    if (isError) {
      toastEl.style.background = 'rgba(255,75,75,0.12)';
      toastEl.style.borderColor = 'rgba(255,75,75,0.35)';
      toastEl.style.color = '#ffb4ab';
    } else {
      toastEl.style.background = 'rgba(130,100,255,0.12)';
      toastEl.style.borderColor = 'rgba(130,100,255,0.35)';
      toastEl.style.color = '#e2e2e8';
    }
    toastEl.style.display = 'block';
    setTimeout(function () { toastEl.style.display = 'none'; }, 4000);
  }

  // ── EmailJS loader ──
  function loadEmailJS(cb) {
    if (window.emailjs) return cb();
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = function () {
      emailjs.init('oIIqUotzVs9Zyuhd3');
      cb();
    };
    document.head.appendChild(s);
  }

  // ── Submit ──
  document.getElementById('fb-send-btn').addEventListener('click', function () {
    var title       = document.getElementById('fb-title').value.trim();
    var category    = document.getElementById('fb-category').value;
    var description = document.getElementById('fb-description').value.trim();
    var btn         = this;

    if (!title || !description) {
      showFbToast('Lütfen başlık ve açıklama alanlarını doldurun!', true);
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Gönderiliyor...';

    var reporter = localStorage.getItem('loggedInUser') || 'anonymous';

    var templateParams = {
      from_name: reporter,
      to_name: title,
      message: '[' + (category || 'Genel').toUpperCase() + '] ' + description,
      category: 'İSTEK / ÖNERİ'
    };

    loadEmailJS(function () {
      emailjs.send(
        'service_ie9temp',
        'template_vq7ligv',
        templateParams,
        { publicKey: 'oIIqUotzVs9Zyuhd3' }
      ).then(function () {
        showFbToast('Öneriniz başarıyla gönderildi, teşekkürler!');
        btn.disabled = false;
        btn.textContent = 'Gönder';
        setTimeout(closeFeedbackModal, 1200);
      }).catch(function (err) {
        showFbToast('Gönderim başarısız: ' + (err.text || err), true);
        btn.disabled = false;
        btn.textContent = 'Gönder';
      });
    });
  });

})();
