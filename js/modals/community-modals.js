/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Community Rules & FAQ Modals
 *  Self-contained: injects HTML + CSS. Include on any page.
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ── Inject CSS ──
  var css = document.createElement('style');
  css.textContent = [
    '#cm-backdrop{position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,0.7);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);display:none;align-items:center;justify-content:center;opacity:0;transition:opacity 0.35s ease;}',
    '#cm-backdrop.active{display:flex;opacity:1;}',
    '#cm-card{background:rgba(26,28,32,0.92);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(139,92,246,0.2);border-radius:2rem;padding:0;width:100%;max-width:560px;margin:1rem;box-shadow:0 0 60px rgba(139,92,246,0.08),0 24px 48px rgba(0,0,0,0.5);transform:scale(0.92) translateY(20px);transition:transform 0.35s cubic-bezier(0.22,1,0.36,1),opacity 0.35s ease;opacity:0;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;}',
    '#cm-backdrop.active #cm-card{transform:scale(1) translateY(0);opacity:1;}',
    '#cm-header{padding:1.5rem 1.5rem 1rem;border-bottom:1px solid rgba(58,73,75,0.3);flex-shrink:0;display:flex;align-items:center;justify-content:space-between;}',
    '#cm-body{padding:1.25rem 1.5rem 1.5rem;overflow-y:auto;flex:1;}',
    '#cm-body::-webkit-scrollbar{width:4px;}',
    '#cm-body::-webkit-scrollbar-track{background:transparent;}',
    '#cm-body::-webkit-scrollbar-thumb{background:rgba(139,92,246,0.2);border-radius:10px;}',
    '.cm-close{background:none;border:none;cursor:pointer;color:rgba(132,148,149,0.8);transition:color 0.2s;padding:4px;}',
    '.cm-close:hover{color:#ffb4ab;}',
    /* Rules styles */
    '.cm-rule{display:flex;gap:0.75rem;padding:0.85rem 0;border-bottom:1px solid rgba(58,73,75,0.15);}',
    '.cm-rule:last-child{border-bottom:none;}',
    '.cm-rule-num{min-width:28px;height:28px;border-radius:8px;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#8B5CF6;font-family:"Space Grotesk",sans-serif;flex-shrink:0;}',
    '.cm-rule-title{font-size:0.85rem;font-weight:700;color:#e2e2e8;margin-bottom:2px;}',
    '.cm-rule-desc{font-size:0.75rem;color:#849495;line-height:1.5;}',
    /* FAQ styles */
    '.cm-faq-item{border:1px solid rgba(58,73,75,0.25);border-radius:0.75rem;margin-bottom:0.5rem;overflow:hidden;transition:border-color 0.2s;}',
    '.cm-faq-item.open{border-color:rgba(139,92,246,0.3);}',
    '.cm-faq-q{padding:0.85rem 1rem;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:0.75rem;background:rgba(17,19,24,0.5);transition:background 0.2s;}',
    '.cm-faq-q:hover{background:rgba(139,92,246,0.04);}',
    '.cm-faq-q span.q-text{font-size:0.82rem;font-weight:600;color:#e2e2e8;flex:1;}',
    '.cm-faq-q span.q-icon{color:#8B5CF6;font-size:1.2rem;transition:transform 0.3s ease;flex-shrink:0;}',
    '.cm-faq-item.open .cm-faq-q span.q-icon{transform:rotate(180deg);}',
    '.cm-faq-a{max-height:0;overflow:hidden;transition:max-height 0.35s ease,padding 0.35s ease;padding:0 1rem;}',
    '.cm-faq-item.open .cm-faq-a{max-height:300px;padding:0.75rem 1rem 1rem;}',
    '.cm-faq-a p{font-size:0.78rem;color:#b9cacb;line-height:1.7;}'
  ].join('\n');
  document.head.appendChild(css);

  // ── Inject Modal Container ──
  var container = document.createElement('div');
  container.innerHTML =
    '<div id="cm-backdrop">' +
      '<div id="cm-card">' +
        '<div id="cm-header">' +
          '<div style="display:flex;align-items:center;gap:0.5rem;">' +
            '<span id="cm-icon" class="material-symbols-outlined" style="color:#8B5CF6;font-size:1.4rem;font-variation-settings:\'FILL\' 1;"></span>' +
            '<h3 id="cm-title" style="font-family:\'Space Grotesk\',sans-serif;font-weight:800;font-size:1rem;color:#8B5CF6;text-transform:uppercase;letter-spacing:0.1em;"></h3>' +
          '</div>' +
          '<button class="cm-close" onclick="closeCMModal()"><span class="material-symbols-outlined" style="font-size:1.4rem;">close</span></button>' +
        '</div>' +
        '<div id="cm-body"></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(container.firstChild);

  var backdrop = document.getElementById('cm-backdrop');

  function openCM() {
    backdrop.style.display = 'flex';
    void backdrop.offsetWidth;
    backdrop.classList.add('active');
  }

  window.closeCMModal = function () {
    backdrop.classList.remove('active');
    setTimeout(function () { backdrop.style.display = 'none'; }, 350);
  };

  backdrop.addEventListener('click', function (e) { if (e.target === backdrop) closeCMModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && backdrop.classList.contains('active')) closeCMModal(); });

  // ═══════════════════════════════════
  // COMMUNITY RULES MODAL
  // ═══════════════════════════════════
  var rules = [
    { title: 'Saygı & Nezaket', desc: 'Tüm oyunculara saygılı davranın. Ayrımcılık, taciz veya nefret söylemi kesinlikle yasaktır.' },
    { title: 'Hile Kesinlikle Yasaktır', desc: 'Hile, exploit veya üçüncü parti yazılım kullanmak kalıcı ban ile sonuçlanır.' },
    { title: 'Spam & Reklam Yasağı', desc: 'Mesajlarda veya profilde spam, reklam veya istenmeyen bağlantılar paylaşmayın.' },
    { title: 'Küfür & Hakaret', desc: 'Sohbetlerde küfür, hakaret veya kışkırtıcı dil kullanımı tolerans gösterilmez.' },
    { title: 'Kişisel Bilgi Güvenliği', desc: 'Kendi veya başkalarının kişisel bilgilerini (telefon, adres, şifre vb.) paylaşmayın.' },
    { title: 'Adil Oyun Anlayışı', desc: 'Kasıtlı olarak oyun kaybetme (inting), AFK kalma ve takım sabote etme yasaktır.' },
    { title: 'İhbar & Raporlama', desc: 'Kural ihlali gördüğünüzde lütfen destek kanalından raporlayın. Yanlış raporlama da yaptırıma tabidir.' },
    { title: 'Topluluk Ruhu', desc: 'İstiklal güvenli ve eğlenceli bir alan olmayı hedefler. Olumlu, yapıcı ve yardımsever olun!' }
  ];

  window.openRulesModal = function () {
    document.getElementById('cm-icon').textContent = 'gavel';
    document.getElementById('cm-title').textContent = 'Topluluk Kuralları';
    var body = document.getElementById('cm-body');
    body.innerHTML = '';
    rules.forEach(function (r, i) {
      body.innerHTML +=
        '<div class="cm-rule">' +
          '<div class="cm-rule-num">' + (i + 1) + '</div>' +
          '<div><div class="cm-rule-title">' + r.title + '</div><div class="cm-rule-desc">' + r.desc + '</div></div>' +
        '</div>';
    });
    openCM();
  };

  // ═══════════════════════════════════
  // FAQ MODAL
  // ═══════════════════════════════════
  var faqs = [
    { q: 'Duo nasıl bulunur?', a: '"LFG Lobiler" sekmesinden aktif odalara anında katılabilir veya kendi lobinizi oluşturarak uygun oyuncuları bekleyebilirsiniz.' },
    { q: 'İstiklal AI (Yapay Zeka) nasıl çalışır?', a: 'Nexus AI teknolojisi; rankınız, oynadığınız roller, aktif saatleriniz ve oyun içi iletişim tercihlerinizi analiz ederek uyumluluk yüzdesi en yüksek oyuncuları karşınıza çıkarır.' },
    { q: 'Hangi oyunları destekliyorsunuz?', a: 'Sistemimiz şu anda aktif olarak Valorant, League of Legends, CS2 ve Fortnite için gelişmiş duo ve lobi eşleştirmesi yapmaktadır.' },

    { q: 'Bir oyuncuyu nasıl raporlarım?', a: 'Oyun deneyiminizi bozan veya topluluk kurallarını ihlal eden kullanıcıları, eşleşme geçmişinizden veya profillerindeki Rapor Et butonunu kullanarak anında şikayet edebilirsiniz.' },
    { q: 'Premium üyelik var mı?', a: 'İstiklal temel eşleşme özellikleri ile her zaman ücretsiz kalacaktır. Liderlik tablosu avantajları veya özel profil kişiselleştirmeleri gibi ek özellikler zamanla eklenebilir.' },
    { q: 'Destek ekibine nasıl ulaşırım?', a: 'Mega menüdeki "Yardım" sekmesinden "Destek" bölümüne tıklayarak veya Yardım Merkezimizden 7/24 ekibimizle iletişime geçebilirsiniz.' }
  ];

  window.openFAQModal = function () {
    document.getElementById('cm-icon').textContent = 'help';
    document.getElementById('cm-title').textContent = 'Sıkça Sorulan Sorular';
    var body = document.getElementById('cm-body');
    body.innerHTML = '';
    faqs.forEach(function (f, i) {
      body.innerHTML +=
        '<div class="cm-faq-item" data-faq="' + i + '">' +
          '<div class="cm-faq-q" onclick="toggleFAQ(this)">' +
            '<span class="q-text">' + f.q + '</span>' +
            '<span class="material-symbols-outlined q-icon">expand_more</span>' +
          '</div>' +
          '<div class="cm-faq-a"><p>' + f.a + '</p></div>' +
        '</div>';
    });
    openCM();
  };

  window.toggleFAQ = function (el) {
    var item = el.parentElement;
    var wasOpen = item.classList.contains('open');
    // Close all
    var all = document.querySelectorAll('.cm-faq-item');
    all.forEach(function (it) { it.classList.remove('open'); });
    // Toggle current
    if (!wasOpen) item.classList.add('open');
  };
})();
