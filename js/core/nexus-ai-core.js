/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Nexus AI Core (nexus-ai-core.js)
 *  Real-time Gemini 1.5 Flash API integration.
 *  Manages conversation history, system personality,
 *  and language-aware responses.
 *  MUST be loaded BEFORE nexus-ai.js
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  var MODEL = 'gemini-2.0-flash-lite';

  // ── Load Environment Variables (Dynamic Client-side Parser) ──
  function loadEnvFile() {
    var paths = ['../../.env', '../.env', '/.env', '.env'];
    var currentPathIndex = 0;

    function tryNextPath() {
      if (currentPathIndex >= paths.length) {
        console.warn('[Nexus AI Core] Could not load .env file. Falling back to localStorage.');
        return;
      }
      var path = paths[currentPathIndex];
      currentPathIndex++;

      var xhr = new XMLHttpRequest();
      xhr.open('GET', path, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
          console.log('[Nexus AI Core] Successfully loaded .env from: ' + path);
          parseEnvContent(xhr.responseText);
        } else {
          tryNextPath();
        }
      };
      xhr.onerror = function () {
        tryNextPath();
      };
      try {
        xhr.send();
      } catch (e) {
        console.warn('[Nexus AI Core] CORS or file protocol error reading .env:', e);
        tryNextPath();
      }
    }

    tryNextPath();
  }

  function parseEnvContent(text) {
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line || line.indexOf('#') === 0) continue;
      var parts = line.split('=');
      if (parts.length >= 2) {
        var key = parts[0].trim();
        var val = parts.slice(1).join('=').trim();
        if ((val.indexOf('"') === 0 && val.lastIndexOf('"') === val.length - 1) ||
            (val.indexOf("'") === 0 && val.lastIndexOf("'") === val.length - 1)) {
          val = val.substring(1, val.length - 1);
        }
        if (key === 'GEMINI_API_KEY' && val) {
          localStorage.setItem('istiklal_ai_gemini_key', val);
        } else if (key === 'GROK_API_KEY' && val) {
          localStorage.setItem('istiklal_ai_grok_key', val);
        }
      }
    }
  }

  // Initial call to load env variables
  loadEnvFile();

  // ── Rate limit tracking ──
  var lastRequestTime = 0;
  var MIN_REQUEST_INTERVAL = 2000; // Minimum 2 seconds between requests

  // ── System Instruction (The "Aga" Personality) ──
  var SYSTEM_INSTRUCTION = "Sen İstiklal platformunun yapay zeka asistanı İstiklal.Ai'sın. " +
    "Kullanıcınla tıpkı bir gamer/oyuncu arkadaşı gibi samimi, esprili ve bir 'Aga' gibi konuş. " +
    "Türkçe ve İngilizce dillerine tam hakimsin. " +
    "Kullanıcıyı her zaman ismiyle selamla ve ona oyunlarda veya platformda rehberlik et. " +
    "Asla robotik konuşma, bir 'Aga' gibi davran. " +
    "Senin temel uzmanlık alanın popüler oyunlar hakkındaki her türlü bilgiyi, güncellemeleri, en son yama notlarını (patch notes) ve yeni oyun içeriklerini sunmaktır. " +
    "Özellikle şu oyunlar hakkında derin bilgiye sahipsin: League of Legends (LoL), Valorant, Minecraft, GTA 5, Roblox, CS:GO / CS2 (Counter-Strike) ve Fortnite. " +
    "Platform özellikleri: Duo eşleşme, lobi sistemi, mesajlaşma, oyuncu profilleri, leaderboard, rekabet modu. " +
    "Cevaplarını kısa ve öz tut, çok uzun paragraflar yazma. Samimi ol, emoji kullan ama abartma.";

  // ── Conversation Log ──
  var conversationLog = [];

  // ── Get language ──
  function getLang() {
    try { return localStorage.getItem('preferred_lang') || 'tr'; } catch (e) { return 'tr'; }
  }

  // ── Get username ──
  function getUsername() {
    var email = null;
    try { email = localStorage.getItem('loggedInUser'); } catch (e) { }
    if (!email) return 'Oyuncu';
    var users = [];
    try { users = JSON.parse(localStorage.getItem('users')) || []; } catch (e) { }
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].username) return users[i].username;
    }
    return email.split('@')[0];
  }

  // ── Build the full prompt with history ──
  function buildPrompt(userMessage) {
    var lang = getLang();
    var username = getUsername();

    // System identity — prepended to every request
    var systemPrompt = "Sen İstiklal asistanı İstiklal.Ai'sın. Kullanıcın " + username + ". " +
      "Bir gamer gibi samimi konuş. Asla robotik olma. " +
      "Senin temel uzmanlık alanın popüler oyunlar hakkındaki bilgileri, güncellemeleri, en son yama notlarını (patch notes) ve yeni oyun içeriklerini sunmaktır. " +
      "Özellikle şu oyunlar hakkında derin bilgiye sahipsin: League of Legends (LoL), Valorant, Minecraft, GTA 5, Roblox, CS:GO / CS2 (Counter-Strike) ve Fortnite. " +
      "Platform özellikleri: Duo eşleşme, lobi sistemi, mesajlaşma, oyuncu profilleri, leaderboard. " +
      "Cevaplarını kısa ve öz tut. Samimi ol, emoji kullan ama abartma. ";

    if (lang === 'en') {
      systemPrompt += "The user's language is ENGLISH. Respond in English.";
    } else {
      systemPrompt += "Kullanıcının dili TÜRKÇE. Türkçe cevap ver.";
    }

    // Add to conversation log
    conversationLog.push({ role: 'user', text: userMessage });

    // Keep last 20 exchanges
    if (conversationLog.length > 40) {
      conversationLog = conversationLog.slice(conversationLog.length - 40);
    }

    // Build conversation context string
    var contextStr = '';
    for (var i = 0; i < conversationLog.length; i++) {
      var entry = conversationLog[i];
      if (entry.role === 'user') {
        contextStr += '\nKullanıcı: ' + entry.text;
      } else {
        contextStr += '\nNexus AI: ' + entry.text;
      }
    }

    // Final prompt: system + history
    var fullText = systemPrompt + '\n\n--- Sohbet Geçmişi ---' + contextStr + '\n\nNexus AI:';

    return fullText;
  }

  // ── Get AI Settings ──
  function getAISettings() {
    var engine = 'grok';
    var grokKey = '';
    var grokModel = 'grok-2';
    var customModel = '';

    try {
      engine = localStorage.getItem('istiklal_ai_engine') || 'grok';
      grokKey = localStorage.getItem('istiklal_ai_grok_key') || '';
      grokModel = localStorage.getItem('istiklal_ai_grok_model') || 'grok-2';
      customModel = localStorage.getItem('istiklal_ai_grok_model_custom') || '';
    } catch (e) { }

    return {
      engine: engine,
      grokKey: grokKey,
      grokModel: grokModel === 'custom' ? customModel : grokModel
    };
  }

  // ── Send message to Grok API ──
  function sendToGrok(userMessage, callback) {
    var settings = getAISettings();
    var apiKey = settings.grokKey;
    if (!apiKey) {
      callback(null, "⚠️ Grok API Anahtarı girilmemiş! Sohbet penceresinin üzerindeki ⚙️ Ayarlar ikonuna tıklayarak Grok API Anahtarınızı girip kaydedin. 🎮");
      return;
    }

    var username = getUsername();
    var systemPrompt = "Sen İstiklal platformunun yapay zeka asistanı İstiklal.Ai'sın. " +
      "Kullanıcınla tıpkı bir gamer/oyuncu arkadaşı gibi samimi, esprili ve bir 'Aga' gibi konuş. " +
      "Senin temel uzmanlık alanın popüler oyunlar hakkındaki her türlü bilgiyi, güncellemeleri, en son yama notlarını (patch notes) ve yeni oyun içeriklerini sunmaktır. " +
      "Özellikle şu oyunlar hakkında derin bilgiye sahipsin: League of Legends (LoL), Valorant, Minecraft, GTA 5, Roblox, CS:GO / CS2 (Counter-Strike) ve Fortnite. " +
      "Kullanıcıya bu oyunlardaki en yeni yamaları, taktikleri, güncellemeleri ve karakter rehberlerini anlatabilirsin. " +
      "Ayrıca oyuncuları İstiklal platformundaki Lobi Sistemi, Duo Eşleşme, Arkadaşlık ve Mesajlaşma gibi özellikler konusunda yönlendirirsin. " +
      "Cevaplarını kısa ve öz tut, çok uzun ve sıkıcı paragraflar yazma. Samimi ol, bolca emoji kullan, oyuncu dilini (tilt olmak, carry'lemek, elo hell, vb.) benimse.";

    var lang = getLang();
    if (lang === 'en') {
      systemPrompt += " The user's language is ENGLISH. Respond in English.";
    } else {
      systemPrompt += " Kullanıcının dili TÜRKÇE. Türkçe cevap ver.";
    }

    // Build the messages array with conversation history
    var messages = [];
    messages.push({ role: 'system', content: systemPrompt });

    // Add userMessage temporarily to log to build the array
    conversationLog.push({ role: 'user', text: userMessage });

    // Keep last 20 exchanges (40 entries)
    if (conversationLog.length > 40) {
      conversationLog = conversationLog.slice(conversationLog.length - 40);
    }

    // Add history to messages array
    for (var i = 0; i < conversationLog.length; i++) {
      messages.push({
        role: conversationLog[i].role === 'user' ? 'user' : 'assistant',
        content: conversationLog[i].text
      });
    }

    var requestBody = {
      model: settings.grokModel || 'grok-2',
      messages: messages,
      temperature: 0.7
    };

    console.log('[Nexus AI Core] Sending request to Grok API... (Model: ' + requestBody.model + ')');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.x.ai/v1/chat/completions', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      if (xhr.status === 200) {
        try {
          var response = JSON.parse(xhr.responseText);
          console.log('[Nexus AI Core] Grok Response received:', response);

          var text = '';
          if (response.choices && response.choices[0] && response.choices[0].message) {
            text = response.choices[0].message.content || '';
          }

          if (text) {
            // Save AI response to history
            conversationLog.push({ role: 'assistant', text: text });
            callback(null, text);
          } else {
            console.warn('[Nexus AI Core] Empty response from Grok API');
            callback('empty_response', null);
          }
        } catch (e) {
          console.error('[Nexus AI Core] Parse error:', e.message);
          callback('parse_error', null);
        }
      } else {
        console.error('[Nexus AI Core] Grok API Error — Status:', xhr.status);
        console.error('[Nexus AI Core] Grok API Error — Response:', xhr.responseText);
        
        var errMsg = "⚠️ Grok API Hatası (Durum: " + xhr.status + "). ";
        if (xhr.status === 401) {
          errMsg += "API Anahtarınız geçersiz veya süresi dolmuş. Lütfen ⚙️ Ayarlar ikonundan anahtarınızı kontrol edin.";
        } else if (xhr.status === 403) {
          errMsg += "Erişim reddedildi. xAI hesabınızın faturalandırma veya yetkilendirme durumunu kontrol edin.";
        } else if (xhr.status === 404) {
          errMsg += "Seçilen model (" + requestBody.model + ") bulunamadı. Model ismini kontrol edin.";
        } else if (xhr.status === 429) {
          errMsg += "Çok fazla istek gönderildi. Lütfen biraz bekleyin.";
        } else {
          errMsg += "API isteği başarısız oldu.";
        }
        callback(null, errMsg);
      }
    };

    xhr.onerror = function () {
      console.error('[Nexus AI Core] Network error — could not reach Grok API');
      callback(null, "⚠️ Grok API'sine bağlanırken ağ hatası oluştu. Lütfen internet bağlantınızı kontrol edin.");
    };

    xhr.timeout = 25000;
    xhr.ontimeout = function () {
      console.error('[Nexus AI Core] Grok Request timeout after 25s');
      callback(null, "⚠️ Grok API isteği zaman aşımına uğradı (25 saniye).");
    };

    xhr.send(JSON.stringify(requestBody));
  }

  // ── Send message to Gemini API (with retry for 429) ──
  function sendToGemini(userMessage, callback) {
    var settings = getAISettings();
    if (settings.engine === 'grok') {
      sendToGrok(userMessage, callback);
      return;
    }

    var prompt = buildPrompt(userMessage);

    var requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    // Throttle: ensure minimum interval between requests
    var now = Date.now();
    var timeSinceLast = now - lastRequestTime;
    var delay = timeSinceLast < MIN_REQUEST_INTERVAL ? (MIN_REQUEST_INTERVAL - timeSinceLast) : 0;

    setTimeout(function() {
      lastRequestTime = Date.now();
      attemptRequest(requestBody, callback, 0);
    }, delay);
  }

  // ── Attempt API request with retry logic ──
  function attemptRequest(requestBody, callback, retryCount) {
    var MAX_RETRIES = 3;
    var bodyStr = JSON.stringify(requestBody);

    var geminiKey = localStorage.getItem('istiklal_ai_gemini_key') || '';
    if (!geminiKey) {
      console.warn('[Nexus AI Core] Gemini API Key is missing. Check your .env file or local storage settings.');
      callback(null, "⚠️ Gemini API Anahtarı bulunamadı! Lütfen `.env` dosyasını yapılandırın veya sohbet penceresindeki ⚙️ Ayarlar menüsünden anahtarınızı girin. 🎮");
      return;
    }

    var apiURL = 'https://generativelanguage.googleapis.com/v1beta/models/' + MODEL + ':generateContent?key=' + geminiKey;

    console.log('[Nexus AI Core] Sending request to Gemini... (attempt ' + (retryCount + 1) + ')');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', apiURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      if (xhr.status === 200) {
        try {
          var response = JSON.parse(xhr.responseText);
          console.log('[Nexus AI Core] Response received:', response);

          var text = '';
          if (response.candidates && response.candidates[0] &&
            response.candidates[0].content && response.candidates[0].content.parts) {
            text = response.candidates[0].content.parts[0].text || '';
          }

          // Save AI response to history
          if (text) {
            conversationLog.push({ role: 'ai', text: text });
          }

          if (text) {
            callback(null, text);
          } else {
            console.warn('[Nexus AI Core] Empty response from API, falling back to KB');
            callback('empty_response', null);
          }
        } catch (e) {
          console.error('[Nexus AI Core] Parse error:', e.message);
          console.error('[Nexus AI Core] Raw response:', xhr.responseText);
          callback('parse_error', null);
        }
      } else if (xhr.status === 429 && retryCount < MAX_RETRIES) {
        // Rate limited — retry with exponential backoff
        var backoffMs = Math.pow(2, retryCount + 1) * 1000; // 2s, 4s, 8s
        console.warn('[Nexus AI Core] Rate limited (429). Retrying in ' + backoffMs + 'ms...');
        setTimeout(function() {
          attemptRequest(requestBody, callback, retryCount + 1);
        }, backoffMs);
      } else {
        console.error('[Nexus AI Core] API Error — Status:', xhr.status);
        console.error('[Nexus AI Core] API Error — Response:', xhr.responseText);
        callback('api_error_' + xhr.status, null);
      }
    };

    xhr.onerror = function () {
      console.error('[Nexus AI Core] Network error — could not reach Gemini API');
      callback('network_error', null);
    };

    xhr.timeout = 20000;
    xhr.ontimeout = function () {
      console.error('[Nexus AI Core] Request timeout after 20s');
      callback('timeout', null);
    };

    xhr.send(bodyStr);
  }

  // ── Fallback message ──
  function getFallback() {
    var lang = getLang();
    if (lang === 'en') {
      return "Hmm, I couldn't connect right now. But I'm still here to help! Try asking again in a moment. 🎮";
    }
    return "Hmm, şu an bağlanamadım. Ama yine de buradayım! Biraz sonra tekrar dene. 🎮";
  }

  // ── Get welcome message ──
  function getWelcome() {
    var lang = getLang();
    var username = getUsername();
    if (lang === 'en') {
      return 'Welcome ' + username + '! Nexus AI Assistant is ready. Game strategy, Duo matching, or just chat? Let me know, let\'s solve it. 🎮';
    }
    return 'Hoş geldin ' + username + '! Nexus AI Asistanı hazır. Oyun stratejisi, Duo eşleşmesi veya sadece sohbet mi? Söyle, çözelim. 🎮';
  }

  // ── Clear history ──
  function clearHistory() {
    conversationLog = [];
  }

  // ── Expose API ──
  window.NexusAICore = {
    sendToGemini: sendToGemini,
    getWelcome: getWelcome,
    clearHistory: clearHistory,
    getLang: getLang,
    getUsername: getUsername
  };

})();
