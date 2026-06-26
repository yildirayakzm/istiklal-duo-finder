/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — İstiklal AI Assistant (nexus-ai.js)
 *  Floating AI chat button + slide-up panel + Knowledge Brain
 *  Theme-adaptive (dark/light), TR/EN bilingual.
 *  Include on ALL dashboard pages.
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  // ══════════════════════════════════════════════
  //  KNOWLEDGE BASE — Platform Q&A + Gaming Tips
  // ══════════════════════════════════════════════
  var KB = {
    tr: {
      greeting: function (name) {
        return 'Hoş geldin ' + name + '! İstiklal AI Asistanı hazır. Oyun stratejisi, Duo eşleşmesi veya sadece sohbet mi? Söyle, çözelim.';
      },
      fallback: 'Hmm, bu konuda kesin bilgim yok ama seni en iyi Duo\'nla buluşturmak için buradayım! Başka bir soru sormak ister misin? 🎮',
      typing: 'İstiklal AI Düşünüyor',
      placeholder: 'İstiklal AI\'ya bir şey sor...',
      title: 'İstiklal AI',
      subtitle: 'Duo Uzmanın',
      qa: [
        {
          keywords: ['duo', 'bul', 'nasıl', 'eşleş', 'lobi', 'lobby', 'kod'],
          answer: '🎯 Duo bulmak çok kolay! Ana paneldeki "Lobi Sistemi"nden bir lobi oluştur ve kodunu arkadaşınla paylaş. Ya da "Lobiye Katıl" sekmesinden bir lobi kodunu girerek başkasının odasına katılabilirsin! Ayrıca Keşfet menüsündeki "LFG Lobiler" sayfasından tüm aktif lobileri görebilirsin.'
        },
        {
          keywords: ['ayar', 'değiştir', 'profil', 'setting'],
          answer: '⚙️ Ayarlarını değiştirmek için sol üstteki menü ikonuna (☰) tıkla, ardından "Ayarlar"ı seç. Buradan profilini, şifreni, bildirim tercihlerini ve oyun hesaplarını yönetebilirsin!'
        },
        {
          keywords: ['tema', 'karanlık', 'aydınlık', 'mod', 'theme', 'dark', 'light'],
          answer: '🌗 Temayı değiştirmek için menüyü aç (☰) ve "GÖRÜNÜM" toggle\'ını kullan. Gece modu için 🌙, gündüz modu için ☀️ seç!'
        },
        {
          keywords: ['dil', 'ingilizce', 'türkçe', 'language'],
          answer: '🌐 Dil değiştirmek için menüyü aç (☰) ve "DİL" kısmından TR veya EN seç. Tüm platform anında çevrilecek!'
        },
        {
          keywords: ['rapor', 'şikayet', 'report', 'bildir'],
          answer: '🛡️ Bir oyuncuyu raporlamak için menüden "Rapor Bildir"e tıkla. Kategori seç, kullanıcı adını gir ve detayları yaz. Ekibimiz en kısa sürede inceleyecek!'
        },
        {
          keywords: ['elo', 'hell', 'rank', 'yüksel', 'çık', 'climb'],
          answer: '🏔️ Elo Hell\'den çıkmanın 5 altın kuralı:\n\n1. **Ana champion havuzunu daralt** — 2-3 şampiyonla oyna\n2. **CS/Last Hit** pratiği yap — dakikada 7+ CS hedefle\n3. **Harita bilinci** — her 15 saniyede minimap\'e bak\n4. **Tilt olma** — 2 kayıptan sonra mola ver\n5. **Duo oyna!** — İstiklal\'da sana uygun birini bul 😉'
        },
        {
          keywords: ['jungle', 'orman', 'şampiyon', 'champion', 'jungler'],
          answer: '🌿 En güçlü Jungle şampiyonları (Meta 2026):\n\n🔥 **S Tier:** Vi, Viego, Lee Sin, Graves\n⚡ **A Tier:** Elise, Rek\'Sai, Hecarim, Kindred\n💪 **B Tier:** Amumu, Warwick, Nunu\n\nYeni başlayanlar için Warwick veya Amumu tavsiyem!'
        },
        {
          keywords: ['valorant', 'agent', 'ajan', 'karakter', 'duelist'],
          answer: '🎯 Valorant Agent Tavsiyeleri:\n\n**Duelist:** Jett (mobilite), Reyna (clutch), Raze (damage)\n**Controller:** Omen (versatile), Astra (pro play)\n**Initiator:** Sova (info), Fade (agresif)\n**Sentinel:** Killjoy (site hold), Chamber (op play)\n\nRank\'ına göre önerim: Reyna ile başla, sonra Jett\'e geç!'
        },
        {
          keywords: ['cs2', 'counter', 'strike', 'aim', 'nişan'],
          answer: '🎯 CS2 Aim Geliştirme Rehberi:\n\n1. **Deathmatch** — Günde 30dk aim pratiği\n2. **Crosshair placement** — Kafaseviyesinde tut\n3. **Spray control** — AK, M4 spray\'lerini öğren\n4. **Workshop haritaları** — Aim Botz, Recoil Master\n5. **Sensitivity** — 400 DPI, 1.5-2.5 in-game önerilir'
        },
        {
          keywords: ['fortnite', 'build', 'inşa', 'edit'],
          answer: '🏗️ Fortnite Build & Edit Tips:\n\n1. **90\'lar** — Temel yapı tekniği, hız kazandırır\n2. **Ramp rush** — Wall + Ramp + Floor combo\n3. **Edit kursları** — Creative\'de pratik yap\n4. **Keybind** — Rahat tuş atamaları seç\n5. **Box fight** — 1v1 kutu savaşlarını öğren'
        },
        {
          keywords: ['minecraft', 'pvp', 'survival', 'sunucu'],
          answer: '⛏️ Minecraft Pro İpuçları:\n\n**PvP:** W-tap ve strafe tekniklerini öğren, rod + sword combo\n**Survival:** İlk gece shelter kur, demir bul, enchant yap\n**Sunucu:** Hypixel, CubeCraft popüler sunucular\n\nİstiklal\'da MC partneri bulmayı unutma!'
        },
        {
          keywords: ['lol', 'league', 'legends', 'meta', 'mid', 'adc', 'yasuo'],
          answer: '⚔️ League of Legends (LoL) İpuçları:\n\n1. **Meta (2026):** Mid lane\'de assassin ve control mage meta. ADC rolünde Jinx ve Kai\'Sa öne çıkıyor.\n2. **Gelişim:** Harita takibini geliştirin, her CS değerlidir.\n3. **Minyon Kontrolü:** Wave management (freeze/slow push) öğrenerek rakibi cezalandırın.\n\nİstiklal\'de hemen bir LoL pre bulup Duo olarak tırmanmaya başlayabilirsin! 🚀'
        },
        {
          keywords: ['gta', 'gta5', 'gta 5', 'online', 'para', 'soygun', 'heist'],
          answer: '🚗 GTA 5 & GTA Online Rehberi:\n\n1. **Kolay Para:** Cayo Perico Heist ve Diamond Casino Heist en hızlı para kazanma yollarıdır.\n2. **Şirketler:** CEO Office, Bunker ve Acid Lab pasif gelir için harika yatırımlardır.\n3. **Hileler:** Story modunda eğlenmek için `PAINKILLER` (5dk ölümsüzlük) veya `TURTLE` (can & zırh) kodlarını dene!'
        },
        {
          keywords: ['roblox', 'robux', 'kodu', 'promocode', 'bedava'],
          answer: '🧸 Roblox İpuçları & Bilgileri:\n\n1. **Popüler Oyunlar:** Adopt Me!, Brookhaven RP, Blox Fruits ve Pet Simulator 99 şu an en çok oynananlar arasında.\n2. **Bedava Robux:** Güvenli olmayan sitelerden uzak durun! Robux sadece resmi yollarla veya Microsoft Rewards gibi kampanyalarla kazanılabilir.\n3. **Duo:** İstiklal\'de seninle Blox Fruits kasacak arkadaşı saniyeler içinde bulabilirsin!'
        },
        {
          keywords: ['merhaba', 'selam', 'hey', 'naber', 'nasılsın'],
          answer: '👋 Selam! Ben İstiklal AI, platformun yapay zeka asistanıyım. Oyun tavsiyeleri, platform rehberliği veya duo bulma konularında sana yardımcı olabilirim. Ne sormak istersin? 🎮'
        },
        {
          keywords: ['teşekkür', 'sağol', 'eyvallah', 'thanks'],
          answer: '😊 Rica ederim! Her zaman buradayım. İyi oyunlar dilerim, iyi fraglar! 🎮🔥'
        }
      ]
    },
    en: {
      greeting: function (name) {
        return 'Welcome ' + name + '! İstiklal AI Assistant is ready. Game strategy, Duo matching, or just chat? Let me know, let\'s solve it.';
      },
      fallback: 'Hmm, I\'m not sure about that, but I\'m here to help you find your perfect Duo! Want to ask something else? 🎮',
      typing: 'İstiklal AI is Thinking',
      placeholder: 'Ask İstiklal AI something...',
      title: 'İstiklal AI',
      subtitle: 'Your Duo Specialist',
      qa: [
        {
          keywords: ['duo', 'find', 'match', 'how', 'lobby', 'code', 'join'],
          answer: '🎯 Finding a Duo is easy! Use the "Lobby System" on the dashboard to create a lobby and share the code with your friend. Or enter a lobby code in the "Join Lobby" tab to join someone else\'s room! You can also browse all active lobbies from the "LFG Lobbies" page in the Explore menu.'
        },
        {
          keywords: ['settings', 'change', 'profile', 'ayar'],
          answer: '⚙️ To change settings, click the menu icon (☰) at the top left, then select "Settings". From there you can manage your profile, password, notification preferences, and game accounts!'
        },
        {
          keywords: ['theme', 'dark', 'light', 'mode'],
          answer: '🌗 To change the theme, open the menu (☰) and use the "THEME" toggle. Choose 🌙 for dark mode or ☀️ for light mode!'
        },
        {
          keywords: ['language', 'english', 'turkish'],
          answer: '🌐 To change language, open the menu (☰) and select TR or EN in the "LANGUAGE" section. The entire platform will translate instantly!'
        },
        {
          keywords: ['report', 'complaint'],
          answer: '🛡️ To report a player, click "Report" in the menu. Select a category, enter the username, and describe the issue. Our team will review it ASAP!'
        },
        {
          keywords: ['elo', 'hell', 'rank', 'climb', 'stuck'],
          answer: '🏔️ 5 Golden Rules to Escape Elo Hell:\n\n1. **Narrow your champion pool** — Play 2-3 champs max\n2. **CS/Last Hit practice** — Aim for 7+ CS/min\n3. **Map awareness** — Check minimap every 15 seconds\n4. **Don\'t tilt** — Take a break after 2 losses\n5. **Play Duo!** — Find your match on İstiklal 😉'
        },
        {
          keywords: ['jungle', 'champion', 'jungler', 'best'],
          answer: '🌿 Best Jungle Champions (Meta 2026):\n\n🔥 **S Tier:** Vi, Viego, Lee Sin, Graves\n⚡ **A Tier:** Elise, Rek\'Sai, Hecarim, Kindred\n💪 **B Tier:** Amumu, Warwick, Nunu\n\nMy recommendation for beginners: Warwick or Amumu!'
        },
        {
          keywords: ['valorant', 'agent', 'character', 'duelist'],
          answer: '🎯 Valorant Agent Recommendations:\n\n**Duelist:** Jett (mobility), Reyna (clutch), Raze (damage)\n**Controller:** Omen (versatile), Astra (pro play)\n**Initiator:** Sova (info), Fade (aggressive)\n**Sentinel:** Killjoy (site hold), Chamber (op play)\n\nMy tip: Start with Reyna, then switch to Jett!'
        },
        {
          keywords: ['cs2', 'counter', 'strike', 'aim'],
          answer: '🎯 CS2 Aim Improvement Guide:\n\n1. **Deathmatch** — 30min daily aim practice\n2. **Crosshair placement** — Keep at head level\n3. **Spray control** — Learn AK, M4 spray patterns\n4. **Workshop maps** — Aim Botz, Recoil Master\n5. **Sensitivity** — 400 DPI, 1.5-2.5 in-game recommended'
        },
        {
          keywords: ['fortnite', 'build', 'edit', 'tips'],
          answer: '🏗️ Fortnite Build & Edit Tips:\n\n1. **90s** — Fundamental building technique\n2. **Ramp rush** — Wall + Ramp + Floor combo\n3. **Edit courses** — Practice in Creative\n4. **Keybinds** — Choose comfortable key bindings\n5. **Box fights** — Master 1v1 box fighting'
        },
        {
          keywords: ['minecraft', 'pvp', 'survival', 'server'],
          answer: '⛏️ Minecraft Pro Tips:\n\n**PvP:** Learn W-tap and strafing, rod + sword combo\n**Survival:** Build shelter first night, find iron, enchant\n**Servers:** Hypixel, CubeCraft are popular choices\n\nDon\'t forget to find an MC partner on İstiklal!'
        },
        {
          keywords: ['lol', 'league', 'legends', 'meta', 'mid', 'adc', 'yasuo'],
          answer: '⚔️ League of Legends (LoL) Tips:\n\n1. **Meta (2026):** Control mages and mobile assassins dominate Mid. Jinx and Kai\'Sa are top tier ADCs.\n2. **Improvement:** Work on map awareness, every CS counts!\n3. **Wave Management:** Master freezing and slow pushing to deny gold/XP.\n\nFind a LoL partner on İstiklal and start climbing together! 🚀'
        },
        {
          keywords: ['gta', 'gta5', 'gta 5', 'online', 'money', 'heist'],
          answer: '🚗 GTA 5 & GTA Online Guide:\n\n1. **Fast Money:** Cayo Perico Heist and Diamond Casino Heist are still the best active money makers.\n2. **Businesses:** Acid Lab, Bunker, and Cocaine Lockup are great for passive income.\n3. **Story Cheats:** Use `PAINKILLER` (5min invincibility) or `TURTLE` (max health & armor) for fun in Story Mode!'
        },
        {
          keywords: ['roblox', 'robux', 'promo', 'codes', 'free'],
          answer: '🧸 Roblox Tips & Info:\n\n1. **Top Games:** Adopt Me!, Brookhaven RP, Blox Fruits, and Pet Simulator 99 are highly recommended.\n2. **Free Robux:** Avoid scam sites! Get Robux only from official purchases or trusted programs like Microsoft Rewards.\n3. **Duo:** Find a partner on İstiklal to grind Blox Fruits or play Brookhaven with you!'
        },
        {
          keywords: ['hello', 'hi', 'hey', 'sup', 'what\'s up'],
          answer: '👋 Hello! I\'m İstiklal AI, your AI assistant. I can help you with game tips, platform guidance, or finding your perfect duo. What would you like to know? 🎮'
        },
        {
          keywords: ['thank', 'thanks', 'thx', 'ty'],
          answer: '😊 You\'re welcome! I\'m always here. Good luck and have fun gaming! 🎮🔥'
        }
      ]
    }
  };

  // ══════════════════════════════════════════════
  //  BRAIN — Smart Answer lookup
  // ══════════════════════════════════════════════
  function getSmartUsername() {
    var email = null;
    try { email = localStorage.getItem('loggedInUser'); } catch(e){}
    if (!email) return 'Oyuncu';
    var users = [];
    try { users = JSON.parse(localStorage.getItem('users')) || []; } catch(e){}
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].username) return users[i].username;
    }
    return email.split('@')[0];
  }

  function getTimeGreeting(lang) {
    var h = new Date().getHours();
    if (lang === 'en') {
      if (h < 6) return 'Still up gaming? 🌙';
      if (h < 12) return 'Good morning! ☀️';
      if (h < 18) return 'Good afternoon! 🎮';
      return 'Good evening! 🌆';
    }
    if (h < 6) return 'Hâlâ ayakta mısın gece kuşu? 🌙';
    if (h < 12) return 'Günaydın! ☀️';
    if (h < 18) return 'İyi öğlenler! 🎮';
    return 'İyi akşamlar! 🌆';
  }

  function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  var smartFallbacks = {
    tr: [
      'Hmm, tam olarak anlayamadım ama merak etme! Duo bulma, oyun tavsiyeleri veya platform hakkında sorabilirsin. Ne dersin? 🎮',
      'Bu konuda bilgim sınırlı ama sana başka konularda yardımcı olabilirim! Mesela hangi ajanla oynaman gerektiğini söyleyebilirim 😎',
      'Onu tam bilmiyorum ama hey, duo bulmak veya oyun stratejisi konuşmak istersen buradayım! 🔥',
      'Valla bu soruyu çözemedim ama başka bir şey sorarsan elimden geleni yaparım aga! 💪',
      'Hmm o konuda pek bilgim yok, ama platformla ilgili veya oyunlarla ilgili her şeyi sorabileceğini biliyorsun! 🎯'
    ],
    en: [
      "Hmm, I'm not quite sure about that, but feel free to ask about finding duos, game tips, or the platform! 🎮",
      "I don't have info on that, but I can help with game strategies, agent picks, or finding your perfect duo! 😎",
      "Not sure about that one, but hey, I'm here for anything gaming related! Ask away! 🔥",
      "That's outside my expertise, but try asking about Valorant, CS2, LoL or platform features! 💪",
      "Hmm can't help with that, but I know a ton about the platform and gaming — what else you got? 🎯"
    ]
  };

  function findAnswer(query, lang) {
    var data = KB[lang] || KB.tr;
    var q = query.toLowerCase().replace(/[?!.,;:'"()]/g, '').trim();
    var username = getSmartUsername();
    var bestMatch = null;
    var bestScore = 0;

    // Check for greetings first — personalize with time
    var greetWords = lang === 'en' 
      ? ['hello','hi','hey','sup','yo','what\'s up','howdy','hola']
      : ['merhaba','selam','hey','naber','nasılsın','sa','selamm','slm','nbr','noluyo'];
    for (var g = 0; g < greetWords.length; g++) {
      if (q.indexOf(greetWords[g]) > -1) {
        var timeG = getTimeGreeting(lang);
        if (lang === 'en') {
          return '👋 ' + timeG + ' Hey ' + username + '! I\'m İstiklal AI, your gaming buddy. Need help with game tips, finding a duo, or platform stuff? Just ask! 🎮';
        }
        return '👋 ' + timeG + ' Selam ' + username + '! Ben İstiklal AI, oyun arkadaşın. Oyun tavsiyeleri, duo bulma veya platform hakkında ne istersen sor! 🎮';
      }
    }

    // Smart keyword matching with partial support
    for (var i = 0; i < data.qa.length; i++) {
      var score = 0;
      var keywords = data.qa[i].keywords;
      for (var k = 0; k < keywords.length; k++) {
        var kw = keywords[k].toLowerCase();
        if (q.indexOf(kw) !== -1) {
          score += 2; // exact match
        } else if (kw.length > 3) {
          // partial match — check if query contains 70%+ of keyword
          var partial = kw.substring(0, Math.ceil(kw.length * 0.7));
          if (q.indexOf(partial) !== -1) score += 1;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = data.qa[i];
      }
    }

    if (bestMatch && bestScore >= 2) {
      return bestMatch.answer;
    }

    // Smart fallback with username
    var fb = pickRandom(smartFallbacks[lang] || smartFallbacks.tr);
    return fb;
  }

  // ══════════════════════════════════════════════
  //  CSS INJECTION
  // ══════════════════════════════════════════════
  var css = document.createElement('style');
  css.id = 'nexus-ai-css';
  css.textContent = [
    /* ── FAB Wrapper & Tooltip ── */
    '#nexus-ai-fab-wrapper {',
    '  position: fixed;',
    '  bottom: 100px;',
    '  right: 24px;',
    '  z-index: 200;',
    '  display: flex;',
    '  flex-direction: column;',
    '  align-items: center;',
    '  gap: 8px;',
    '}',
    '#nexus-ai-fab-label {',
    '  font-family: "Segoe UI", sans-serif;',
    '  font-size: 10px;',
    '  font-weight: 700;',
    '  letter-spacing: 0.1em;',
    '  color: rgba(139, 92, 246, 0.8);',
    '  text-shadow: 0 0 8px rgba(139, 92, 246, 0.4);',
    '  background: rgba(17, 19, 24, 0.6);',
    '  padding: 4px 8px;',
    '  border-radius: 6px;',
    '  border: 1px solid rgba(139, 92, 246, 0.1);',
    '  backdrop-filter: blur(4px);',
    '  white-space: nowrap;',
    '  pointer-events: none;',
    '}',
    'body.light-mode #nexus-ai-fab-label {',
    '  color: #FFFFFF;',
    '  text-shadow: none;',
    '  background: #1F2937;',
    '  border-color: rgba(0, 0, 0, 0.1);',
    '}',
    '#nexus-ai-tooltip {',
    '  position: absolute;',
    '  right: 70px;',
    '  bottom: 0;',
    '  width: 220px;',
    '  background: rgba(26, 28, 32, 0.95);',
    '  border: 1px solid rgba(139, 92, 246, 0.2);',
    '  color: #e2e2e8;',
    '  padding: 12px 16px;',
    '  border-radius: 12px;',
    '  font-family: "Plus Jakarta Sans", sans-serif;',
    '  font-size: 12px;',
    '  line-height: 1.5;',
    '  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);',
    '  opacity: 0;',
    '  transform: translateX(10px);',
    '  pointer-events: none;',
    '  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);',
    '}',
    'body.light-mode #nexus-ai-tooltip {',
    '  background: rgba(26, 26, 29, 0.95) !important;',
    '  border-color: rgba(255, 255, 255, 0.1) !important;',
    '  color: #ffffff !important;',
    '}',
    '#nexus-ai-fab-wrapper:hover #nexus-ai-tooltip {',
    '  opacity: 1;',
    '  transform: translateX(0);',
    '}',

    /* ── Floating Button ── */
    '#nexus-ai-fab {',
    '  width: 56px;',
    '  height: 56px;',
    '  border-radius: 50%;',
    '  border: none;',
    '  cursor: pointer;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  background: linear-gradient(135deg, #EC4899, #8B5CF6);',
    '  box-shadow: 0 4px 20px rgba(139,92,246,0.4), 0 0 40px rgba(139,92,246,0.15);',
    '  transition: all 0.3s ease;',
    '  animation: nexusFabPulse 3s ease-in-out infinite;',
    '}',
    '#nexus-ai-fab:hover {',
    '  transform: scale(1.1);',
    '  box-shadow: 0 6px 28px rgba(139,92,246,0.55), 0 0 50px rgba(139,92,246,0.25);',
    '}',
    '#nexus-ai-fab:active { transform: scale(0.95); }',
    '#nexus-ai-fab .fab-icon {',
    '  font-size: 26px;',
    '  color: #ffffff;',
    '  font-variation-settings: "FILL" 1;',
    '  transition: transform 0.3s ease;',
    '}',
    '#nexus-ai-fab-wrapper.open .fab-icon { transform: rotate(180deg); }',
    '#nexus-ai-fab-wrapper.open #nexus-ai-tooltip, #nexus-ai-fab-wrapper.open #nexus-ai-fab-label { opacity: 0; pointer-events: none; }',

    /* Light mode FAB */
    'body.light-mode #nexus-ai-fab {',
    '  background: #1E3A8A !important;',
    '  box-shadow: 0 4px 16px rgba(30,58,138,0.3) !important;',
    '  animation: none !important;', /* Kill neon pulse */
    '}',
    'body.light-mode #nexus-ai-fab .fab-icon { color: #ffffff !important; }',
    'body.light-mode #nexus-ai-fab:hover {',
    '  background: #1e40af !important;',
    '  box-shadow: 0 6px 20px rgba(30,58,138,0.4) !important;',
    '  transform: scale(1.1);',
    '}',

    /* ── Pulse Animation ── */
    '@keyframes nexusFabPulse {',
    '  0%, 100% { box-shadow: 0 4px 20px rgba(139,92,246,0.4), 0 0 40px rgba(139,92,246,0.15); }',
    '  50% { box-shadow: 0 4px 28px rgba(139,92,246,0.55), 0 0 60px rgba(139,92,246,0.25); }',
    '}',
    'body.light-mode @keyframes nexusFabPulse {',
    '  0%, 100% { box-shadow: 0 4px 20px rgba(26,26,29,0.3); }',
    '  50% { box-shadow: 0 4px 28px rgba(26,26,29,0.45); }',
    '}',

    /* ── Chat Panel ── */
    '#nexus-ai-panel {',
    '  position: fixed;',
    '  bottom: 170px;',
    '  right: 24px;',
    '  z-index: 199;',
    '  width: 380px;',
    '  max-height: 520px;',
    '  border-radius: 20px;',
    '  overflow: hidden;',
    '  display: flex;',
    '  flex-direction: column;',
    '  opacity: 0;',
    '  transform: translateY(20px) scale(0.95);',
    '  pointer-events: none;',
    '  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);',
    /* Dark mode default */
    '  background: rgba(26,28,32,0.92);',
    '  backdrop-filter: blur(24px);',
    '  -webkit-backdrop-filter: blur(24px);',
    '  border: 1px solid rgba(139,92,246,0.12);',
    '  box-shadow: 0 12px 48px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.08);',
    '}',
    '#nexus-ai-panel.open {',
    '  opacity: 1;',
    '  transform: translateY(0) scale(1);',
    '  pointer-events: auto;',
    '}',

    /* Light mode panel */
    'body.light-mode #nexus-ai-panel {',
    '  background: rgba(26,26,29,0.95) !important;',
    '  border-color: rgba(255,255,255,0.08) !important;',
    '  box-shadow: 0 12px 48px rgba(0,0,0,0.25) !important;',
    '}',

    /* ── Header ── */
    '#nexus-ai-header {',
    '  padding: 14px 18px;',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 10px;',
    '  border-bottom: 1px solid rgba(139,92,246,0.1);',
    '  background: rgba(139,92,246,0.04);',
    '  flex-shrink: 0;',
    '}',
    'body.light-mode #nexus-ai-header {',
    '  border-bottom-color: rgba(255,255,255,0.08) !important;',
    '  background: rgba(255,255,255,0.04) !important;',
    '}',
    '#nexus-ai-header .ai-avatar {',
    '  width: 36px; height: 36px; border-radius: 12px;',
    '  background: linear-gradient(135deg, #EC4899, #8B5CF6);',
    '  display: flex; align-items: center; justify-content: center;',
    '  flex-shrink: 0;',
    '}',
    'body.light-mode #nexus-ai-header .ai-avatar {',
    '  background: linear-gradient(135deg, #ffffff20, #ffffff30) !important;',
    '  border: 1px solid rgba(255,255,255,0.15);',
    '}',
    '#nexus-ai-header .ai-avatar .material-symbols-outlined {',
    '  font-size: 20px; color: #ffffff;',
    '  font-variation-settings: "FILL" 1;',
    '}',
    'body.light-mode #nexus-ai-header .ai-avatar .material-symbols-outlined {',
    '  color: #ffffff !important;',
    '}',
    '#nexus-ai-header .ai-info h4 {',
    '  font-family: "Space Grotesk", sans-serif;',
    '  font-weight: 700; font-size: 14px; color: #8B5CF6;',
    '  letter-spacing: 0.03em;',
    '}',
    'body.light-mode #nexus-ai-header .ai-info h4 { color: #ffffff !important; }',
    '#nexus-ai-header .ai-info p {',
    '  font-family: "Plus Jakarta Sans", sans-serif;',
    '  font-size: 10px; color: #849495; margin: 0;',
    '}',
    'body.light-mode #nexus-ai-header .ai-info p { color: rgba(255,255,255,0.5) !important; }',
    '#nexus-ai-header .close-panel {',
    '  background: none; border: none;',
    '  color: #849495; cursor: pointer; padding: 4px;',
    '  font-size: 20px; transition: color 0.2s;',
    '}',
    '#nexus-ai-header .close-panel:hover { color: #ffb4ab; }',
    '#nexus-ai-header .toggle-settings {',
    '  margin-left: auto; background: none; border: none;',
    '  color: #849495; cursor: pointer; padding: 4px;',
    '  font-size: 20px; transition: color 0.2s;',
    '}',
    '#nexus-ai-header .toggle-settings:hover { color: #8B5CF6; }',

    /* ── Settings Panel Styles ── */
    '#nexus-ai-settings-panel {',
    '  font-family: "Plus Jakarta Sans", sans-serif;',
    '}',
    '#nexus-ai-settings-panel select, #nexus-ai-settings-panel input {',
    '  width: 100%; padding: 8px 12px; background: rgba(7, 8, 24, 0.85);',
    '  color: #e2e2e8; border: 1.5px solid rgba(139, 92, 246, 0.15);',
    '  border-radius: 8px; font-size: 11px; outline: none; transition: all 0.2s;',
    '  font-family: "Poppins", sans-serif; box-sizing: border-box;',
    '}',
    '#nexus-ai-settings-panel select:focus, #nexus-ai-settings-panel input:focus {',
    '  border-color: rgba(139, 92, 246, 0.45); background: rgba(7, 8, 24, 0.95);',
    '}',
    '#nexus-ai-settings-panel button {',
    '  width: 100%; padding: 8px; background: linear-gradient(135deg, #8B5CF6, #EC4899);',
    '  border: none; border-radius: 8px; color: #ffffff; font-size: 10px;',
    '  font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;',
    '  cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; font-family: "Outfit", sans-serif;',
    '}',
    '#nexus-ai-settings-panel button:hover {',
    '  transform: translateY(-1px); box-shadow: 0 4px 12px rgba(139, 92, 246, 0.35);',
    '}',
    '#nexus-ai-settings-panel button:active { transform: scale(0.98); }',

    /* ── Messages Area ── */
    '#nexus-ai-messages {',
    '  flex: 1; overflow-y: auto; padding: 16px;',
    '  display: flex; flex-direction: column; gap: 12px;',
    '  min-height: 250px; max-height: 340px;',
    '}',
    '#nexus-ai-messages::-webkit-scrollbar { width: 4px; }',
    '#nexus-ai-messages::-webkit-scrollbar-thumb {',
    '  background: rgba(139,92,246,0.2); border-radius: 4px;',
    '}',

    /* Message bubbles */
    '.nai-msg { display: flex; gap: 8px; animation: naiMsgIn 0.3s ease; max-width: 100%; }',
    '.nai-msg.user { flex-direction: row-reverse; }',

    '.nai-msg .msg-avatar {',
    '  width: 28px; height: 28px; border-radius: 8px;',
    '  display: flex; align-items: center; justify-content: center;',
    '  flex-shrink: 0; margin-top: 2px;',
    '}',
    '.nai-msg.bot .msg-avatar {',
    '  background: linear-gradient(135deg, rgba(236,72,153,0.15), rgba(139,92,246,0.1));',
    '  border: 1px solid rgba(139,92,246,0.2);',
    '}',
    'body.light-mode .nai-msg.bot .msg-avatar {',
    '  background: rgba(255,255,255,0.1) !important;',
    '  border-color: rgba(255,255,255,0.15) !important;',
    '}',
    '.nai-msg.bot .msg-avatar .material-symbols-outlined {',
    '  font-size: 16px; color: #8B5CF6; font-variation-settings: "FILL" 1;',
    '}',
    'body.light-mode .nai-msg.bot .msg-avatar .material-symbols-outlined {',
    '  color: #a0d8e0 !important;',
    '}',
    '.nai-msg.user .msg-avatar {',
    '  background: rgba(255,170,0,0.15);',
    '  border: 1px solid rgba(255,170,0,0.2);',
    '}',
    '.nai-msg.user .msg-avatar .material-symbols-outlined {',
    '  font-size: 16px; color: #ffaa00; font-variation-settings: "FILL" 1;',
    '}',

    '.nai-msg .msg-bubble {',
    '  padding: 10px 14px; border-radius: 14px;',
    '  font-family: "Plus Jakarta Sans", sans-serif;',
    '  font-size: 13px; line-height: 1.55;',
    '  max-width: 260px; word-break: break-word;',
    '  white-space: pre-line;',
    '}',
    '.nai-msg.bot .msg-bubble {',
    '  background: rgba(139,92,246,0.06);',
    '  border: 1px solid rgba(139,92,246,0.08);',
    '  color: #e2e2e8;',
    '  border-top-left-radius: 4px;',
    '}',
    'body.light-mode .nai-msg.bot .msg-bubble {',
    '  background: rgba(255,255,255,0.08) !important;',
    '  border-color: rgba(255,255,255,0.08) !important;',
    '  color: #e0e0e0 !important;',
    '}',
    '.nai-msg.user .msg-bubble {',
    '  background: linear-gradient(135deg, rgba(236,72,153,0.2), rgba(139,92,246,0.12));',
    '  border: 1px solid rgba(139,92,246,0.15);',
    '  color: #e2e2e8;',
    '  border-top-right-radius: 4px;',
    '}',
    'body.light-mode .nai-msg.user .msg-bubble {',
    '  background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.08)) !important;',
    '  border-color: rgba(255,255,255,0.1) !important;',
    '  color: #e0e0e0 !important;',
    '}',

    /* Typing indicator */
    '.nai-typing { display: flex; align-items: center; gap: 6px; padding: 6px 0; }',
    '.nai-typing .dot {',
    '  width: 6px; height: 6px; border-radius: 50%; background: #8B5CF6;',
    '  animation: naiTypingDot 1.4s ease-in-out infinite;',
    '}',
    'body.light-mode .nai-typing .dot { background: #a0d8e0 !important; }',
    '.nai-typing .dot:nth-child(2) { animation-delay: 0.2s; }',
    '.nai-typing .dot:nth-child(3) { animation-delay: 0.4s; }',
    '.nai-typing-label {',
    '  font-family: "Space Grotesk", sans-serif; font-size: 10px;',
    '  color: #849495; letter-spacing: 0.05em; text-transform: uppercase;',
    '  margin-left: 4px;',
    '}',
    'body.light-mode .nai-typing-label { color: rgba(255,255,255,0.4) !important; }',

    '@keyframes naiTypingDot {',
    '  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }',
    '  40% { opacity: 1; transform: scale(1.2); }',
    '}',
    '@keyframes naiMsgIn {',
    '  from { opacity: 0; transform: translateY(8px); }',
    '  to { opacity: 1; transform: translateY(0); }',
    '}',

    /* ── Input Area ── */
    '#nexus-ai-input-area {',
    '  display: flex; align-items: center; gap: 8px;',
    '  padding: 12px 14px;',
    '  border-top: 1px solid rgba(139,92,246,0.08);',
    '  background: rgba(17,19,24,0.6);',
    '  flex-shrink: 0;',
    '}',
    'body.light-mode #nexus-ai-input-area {',
    '  border-top-color: rgba(255,255,255,0.06) !important;',
    '  background: rgba(0,0,0,0.2) !important;',
    '}',
    '#nexus-ai-input {',
    '  flex: 1; border: none; outline: none;',
    '  background: rgba(51,53,57,0.5);',
    '  color: #e2e2e8;',
    '  font-family: "Plus Jakarta Sans", sans-serif;',
    '  font-size: 13px;',
    '  padding: 10px 14px;',
    '  border-radius: 12px;',
    '  border: 1px solid rgba(139,92,246,0.08);',
    '  transition: border-color 0.2s;',
    '}',
    '#nexus-ai-input:focus { border-color: rgba(139,92,246,0.25); }',
    'body.light-mode #nexus-ai-input {',
    '  background: rgba(255,255,255,0.08) !important;',
    '  color: #e0e0e0 !important;',
    '  border-color: rgba(255,255,255,0.08) !important;',
    '}',
    'body.light-mode #nexus-ai-input:focus { border-color: rgba(255,255,255,0.2) !important; }',
    '#nexus-ai-input::placeholder { color: #849495; }',
    'body.light-mode #nexus-ai-input::placeholder { color: rgba(255,255,255,0.3) !important; }',
    '#nexus-ai-send {',
    '  width: 38px; height: 38px; border-radius: 10px;',
    '  border: none; cursor: pointer;',
    '  background: linear-gradient(135deg, #EC4899, #8B5CF6);',
    '  display: flex; align-items: center; justify-content: center;',
    '  transition: all 0.2s; flex-shrink: 0;',
    '}',
    '#nexus-ai-send:hover { transform: scale(1.05); box-shadow: 0 2px 12px rgba(139,92,246,0.3); }',
    '#nexus-ai-send:active { transform: scale(0.95); }',
    '#nexus-ai-send .material-symbols-outlined {',
    '  font-size: 18px; color: #ffffff; font-variation-settings: "FILL" 1;',
    '}',
    'body.light-mode #nexus-ai-send {',
    '  background: linear-gradient(135deg, #ffffff, #e0e0e0) !important;',
    '}',
    'body.light-mode #nexus-ai-send .material-symbols-outlined { color: #1A1A1D !important; }',

    /* ── Mobile responsive ── */
    '@media (max-width: 480px) {',
    '  #nexus-ai-panel { width: calc(100vw - 32px); right: 16px; bottom: 150px; }',
    '  #nexus-ai-fab-wrapper { bottom: 88px; right: 16px; }',
    '}'
  ].join('\n');
  document.head.appendChild(css);

  // ══════════════════════════════════════════════
  //  DOM INJECTION
  // ══════════════════════════════════════════════
  function getLang() {
    try { return localStorage.getItem('preferred_lang') || 'tr'; } catch (e) { return 'tr'; }
  }

  function getUsername() {
    var email = null;
    try { email = localStorage.getItem('loggedInUser'); } catch (e) {}
    if (!email) return 'Oyuncu';
    var users = [];
    try { users = JSON.parse(localStorage.getItem('users')) || []; } catch (e) {}
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].username) return users[i].username;
    }
    return email.split('@')[0];
  }

  function init() {
    if (document.getElementById('nexus-ai-fab')) return;

    var lang = getLang();
    var data = KB[lang] || KB.tr;
    var username = getUsername();

    // ── FAB Wrapper + Button + Label + Tooltip ──
    var fabWrapper = document.createElement('div');
    fabWrapper.id = 'nexus-ai-fab-wrapper';
    
    var fabLabel = document.createElement('div');
    fabLabel.id = 'nexus-ai-fab-label';
    fabLabel.textContent = lang === 'en' ? 'İSTİKLAL AI ASSISTANT' : 'İSTİKLAL AI ASİSTANI';
    
    var fabTooltip = document.createElement('div');
    fabTooltip.id = 'nexus-ai-tooltip';
    fabTooltip.textContent = lang === 'en' 
      ? 'İstiklal AI is ready for Duo matching, game strategies, and real chat!' 
      : 'Duo eşleşmesi, oyun stratejileri ve gerçek sohbet için İstiklal AI hazır aga!';
      
    var fab = document.createElement('button');
    fab.id = 'nexus-ai-fab';
    fab.setAttribute('aria-label', 'İstiklal AI');
    fab.innerHTML = '<span class="material-symbols-outlined fab-icon">psychology</span>';
    
    fabWrapper.appendChild(fabLabel);
    fabWrapper.appendChild(fabTooltip);
    fabWrapper.appendChild(fab);
    document.body.appendChild(fabWrapper);

    // ── Chat Panel ──
    var panel = document.createElement('div');
    panel.id = 'nexus-ai-panel';
    panel.innerHTML =
      '<div id="nexus-ai-header">' +
        '<div class="ai-avatar"><span class="material-symbols-outlined">psychology</span></div>' +
        '<div class="ai-info">' +
          '<h4>' + data.title + '</h4>' +
          '<p>' + data.subtitle + '</p>' +
        '</div>' +
        '<button class="toggle-settings material-symbols-outlined" title="Yapay Zeka Ayarları" style="display:none;">settings</button>' +
        '<button class="close-panel material-symbols-outlined">close</button>' +
      '</div>' +
      '<div id="nexus-ai-settings-panel" style="display:none; padding:12px; background:rgba(20,21,48,0.95); border-bottom:1px solid rgba(139,92,246,0.2); font-family:\'Plus Jakarta Sans\', sans-serif; flex-direction:column; gap:8px;">' +
        '<div style="font-size:10px; font-weight:800; color:#8B5CF6; text-transform:uppercase; letter-spacing:0.05em;">İstiklal.Ai Yapay Zeka Ayarları</div>' +
        '<div>' +
          '<label style="display:block; font-size:9px; color:#849495; margin-bottom:3px; font-weight:700;">SERVİS SAĞLAYICI</label>' +
          '<select id="stg-ai-engine">' +
            '<option value="gemini">Gemini (Varsayılan)</option>' +
            '<option value="grok">Grok (xAI API)</option>' +
          '</select>' +
        '</div>' +
        '<div id="stg-ai-gemini-section" style="display:flex; flex-direction:column; gap:8px;">' +
          '<div>' +
            '<label style="display:block; font-size:9px; color:#849495; margin-bottom:3px; font-weight:700;">GEMINI API ANAHTARI (API KEY)</label>' +
            '<input type="password" id="stg-ai-gemini-key" placeholder="AIzaSy...">' +
          '</div>' +
        '</div>' +
        '<div id="stg-ai-grok-section" style="display:none; flex-direction:column; gap:8px;">' +
          '<div>' +
            '<label style="display:block; font-size:9px; color:#849495; margin-bottom:3px; font-weight:700;">GROK API ANAHTARI (API KEY)</label>' +
            '<input type="password" id="stg-ai-grok-key" placeholder="xai-...">' +
          '</div>' +
          '<div>' +
            '<label style="display:block; font-size:9px; color:#849495; margin-bottom:3px; font-weight:700;">MODEL SEÇİMİ</label>' +
            '<select id="stg-ai-grok-model">' +
              '<option value="grok-2">Grok 2</option>' +
              '<option value="grok-beta">Grok Beta</option>' +
              '<option value="custom">Özel Model...</option>' +
            '</select>' +
            '<input type="text" id="stg-ai-grok-model-custom" placeholder="Model adını yazın (örn: grok-2-1212)" style="display:none; margin-top:4px;">' +
          '</div>' +
        '</div>' +
        '<button id="stg-ai-save" style="margin-top:4px;">Ayarları Kaydet</button>' +
      '</div>' +
      '<div id="nexus-ai-messages"></div>' +
      '<div id="nexus-ai-input-area">' +
        '<input type="text" id="nexus-ai-input" placeholder="' + data.placeholder + '" autocomplete="off">' +
        '<button id="nexus-ai-send"><span class="material-symbols-outlined">send</span></button>' +
      '</div>';
    document.body.appendChild(panel);

    var messagesEl = document.getElementById('nexus-ai-messages');
    var inputEl = document.getElementById('nexus-ai-input');
    var sendBtn = document.getElementById('nexus-ai-send');
    var closeBtn = panel.querySelector('.close-panel');
    var toggleSettingsBtn = panel.querySelector('.toggle-settings');
    var settingsPanelEl = document.getElementById('nexus-ai-settings-panel');
    
    var engineSelect = document.getElementById('stg-ai-engine');
    var geminiSection = document.getElementById('stg-ai-gemini-section');
    var geminiKeyInput = document.getElementById('stg-ai-gemini-key');
    var grokSection = document.getElementById('stg-ai-grok-section');
    var grokKeyInput = document.getElementById('stg-ai-grok-key');
    var grokModelSelect = document.getElementById('stg-ai-grok-model');
    var grokModelCustomInput = document.getElementById('stg-ai-grok-model-custom');
    var saveSettingsBtn = document.getElementById('stg-ai-save');

    var isOpen = false;
    var greeted = false;
    var isSettingsOpen = false;

    // ── Load Settings to UI ──
    function loadSettingsToUI() {
      var engine = localStorage.getItem('istiklal_ai_engine') || 'grok';
      var geminiKey = localStorage.getItem('istiklal_ai_gemini_key') || '';
      var grokKey = localStorage.getItem('istiklal_ai_grok_key') || '';
      var grokModel = localStorage.getItem('istiklal_ai_grok_model') || 'grok-2';
      var customModel = localStorage.getItem('istiklal_ai_grok_model_custom') || '';

      engineSelect.value = engine;
      geminiKeyInput.value = geminiKey;
      grokKeyInput.value = grokKey;
      grokModelSelect.value = grokModel;
      grokModelCustomInput.value = customModel;

      updateGrokVisibility();
    }

    function updateGrokVisibility() {
      if (engineSelect.value === 'grok') {
        grokSection.style.display = 'flex';
        geminiSection.style.display = 'none';
      } else {
        grokSection.style.display = 'none';
        geminiSection.style.display = 'flex';
      }

      if (grokModelSelect.value === 'custom') {
        grokModelCustomInput.style.display = 'block';
      } else {
        grokModelCustomInput.style.display = 'none';
      }
    }

    engineSelect.addEventListener('change', updateGrokVisibility);
    grokModelSelect.addEventListener('change', updateGrokVisibility);

    // ── Toggle settings panel ──
    toggleSettingsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      isSettingsOpen = !isSettingsOpen;
      if (isSettingsOpen) {
        loadSettingsToUI();
        settingsPanelEl.style.display = 'flex';
        toggleSettingsBtn.style.color = '#8B5CF6';
      } else {
        settingsPanelEl.style.display = 'none';
        toggleSettingsBtn.style.color = '#849495';
      }
    });

    // ── Save Settings ──
    saveSettingsBtn.addEventListener('click', function () {
      localStorage.setItem('istiklal_ai_engine', engineSelect.value);
      localStorage.setItem('istiklal_ai_gemini_key', geminiKeyInput.value.trim());
      localStorage.setItem('istiklal_ai_grok_key', grokKeyInput.value.trim());
      localStorage.setItem('istiklal_ai_grok_model', grokModelSelect.value);
      localStorage.setItem('istiklal_ai_grok_model_custom', grokModelCustomInput.value.trim());

      // Hide settings panel
      isSettingsOpen = false;
      settingsPanelEl.style.display = 'none';
      toggleSettingsBtn.style.color = '#849495';

      // Inform user in chat
      var engineName = engineSelect.value === 'grok' ? 'Grok (xAI)' : 'Gemini (Varsayılan)';
      addBotMessage("⚙️ Yapay Zeka ayarları başarıyla kaydedildi! Şu an **" + engineName + "** servisi aktif.");
    });

    // ── Toggle panel ──
    fab.addEventListener('click', function () {
      isOpen = !isOpen;
      panel.classList.toggle('open', isOpen);
      fabWrapper.classList.toggle('open', isOpen);

      if (isOpen && !greeted) {
        greeted = true;
        // Use Gemini core welcome if available, otherwise fallback
        var welcomeMsg = (window.NexusAICore && window.NexusAICore.getWelcome) 
          ? window.NexusAICore.getWelcome() 
          : data.greeting(username);
        addBotMessage(welcomeMsg);
      }
      if (isOpen) {
        setTimeout(function () { inputEl.focus(); }, 400);
      }
    });

    closeBtn.addEventListener('click', function () {
      isOpen = false;
      panel.classList.remove('open');
      fabWrapper.classList.remove('open');
      // Also close settings
      isSettingsOpen = false;
      settingsPanelEl.style.display = 'none';
      toggleSettingsBtn.style.color = '#849495';
    });

    // ── Add message helpers ──
    function addBotMessage(text) {
      var msg = document.createElement('div');
      msg.className = 'nai-msg bot';
      msg.innerHTML =
        '<div class="msg-avatar"><span class="material-symbols-outlined">psychology</span></div>' +
        '<div class="msg-bubble">' + formatText(text) + '</div>';
      messagesEl.appendChild(msg);
      scrollToBottom();
    }

    function addUserMessage(text) {
      var msg = document.createElement('div');
      msg.className = 'nai-msg user';
      msg.innerHTML =
        '<div class="msg-avatar"><span class="material-symbols-outlined">person</span></div>' +
        '<div class="msg-bubble">' + escapeHtml(text) + '</div>';
      messagesEl.appendChild(msg);
      scrollToBottom();
    }

    function showTyping() {
      var currentLang = getLang();
      var typingData = KB[currentLang] || KB.tr;
      var typing = document.createElement('div');
      typing.className = 'nai-msg bot';
      typing.id = 'nai-typing-indicator';
      typing.innerHTML =
        '<div class="msg-avatar"><span class="material-symbols-outlined">psychology</span></div>' +
        '<div class="msg-bubble"><div class="nai-typing">' +
        '<div class="dot"></div><div class="dot"></div><div class="dot"></div>' +
        '<span class="nai-typing-label">' + typingData.typing + '</span>' +
        '</div></div>';
      messagesEl.appendChild(typing);
      scrollToBottom();
    }

    function hideTyping() {
      var t = document.getElementById('nai-typing-indicator');
      if (t) t.parentNode.removeChild(t);
    }

    function scrollToBottom() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function formatText(text) {
      // Bold **text**
      text = escapeHtml(text);
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return text;
    }

    // ── Send message ──
    function sendMessage() {
      var text = inputEl.value.trim();
      if (!text) return;

      addUserMessage(text);
      inputEl.value = '';

      var currentLang = getLang();

      // Show typing indicator
      showTyping();

      // Use Gemini API if core is available
      if (window.NexusAICore && window.NexusAICore.sendToGemini) {
        window.NexusAICore.sendToGemini(text, function (err, answer) {
          hideTyping();
          if (err || !answer) {
            // API failed — fall back to local knowledge base
            console.warn('[Nexus AI] API error (' + err + '), using local KB');
            var kbAnswer = findAnswer(text, currentLang);
            addBotMessage(kbAnswer);
          } else {
            addBotMessage(answer);
          }
        });
      } else {
        // Fallback to static KB
        var delay = 800 + Math.floor(Math.random() * 700);
        setTimeout(function () {
          hideTyping();
          var answer = findAnswer(text, currentLang);
          addBotMessage(answer);
        }, delay);
      }
    }

    sendBtn.addEventListener('click', sendMessage);
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // ── Init ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
