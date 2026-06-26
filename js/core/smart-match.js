/**
 * ═══════════════════════════════════════════════════════════
 *  İSTİKLAL — Lobby Code System (smart-match.js)
 *  "Lobi Sistemi" — Create & share lobby codes,
 *  join others' lobbies by entering their code.
 *  Replaces the old Smart Match engine.
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  'use strict';



  // ── Constants ──
  var LOBBIES_KEY = 'nexus_lobbies';
  var MY_LOBBY_KEY = 'nexus_my_lobby';
  var CHAT_KEY = 'nexus_lobby_chat';
  var LOBBY_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes
  var MAX_PLAYERS = 5;

  // ── Chat Helpers ──
  function getChatMessages(lobbyCode) {
    try {
      var all = JSON.parse(localStorage.getItem(CHAT_KEY)) || {};
      return all[lobbyCode] || [];
    } catch (e) { return []; }
  }

  function saveChatMessage(lobbyCode, msg) {
    try {
      var all = JSON.parse(localStorage.getItem(CHAT_KEY)) || {};
      if (!all[lobbyCode]) all[lobbyCode] = [];
      all[lobbyCode].push(msg);
      // Keep max 50 messages per lobby
      if (all[lobbyCode].length > 50) all[lobbyCode] = all[lobbyCode].slice(-50);
      localStorage.setItem(CHAT_KEY, JSON.stringify(all));
    } catch (e) { }
  }

  function clearChat(lobbyCode) {
    try {
      var all = JSON.parse(localStorage.getItem(CHAT_KEY)) || {};
      delete all[lobbyCode];
      localStorage.setItem(CHAT_KEY, JSON.stringify(all));
    } catch (e) { }
  }

  function chatTimeFormat(ts) {
    var d = new Date(ts);
    var h = d.getHours();
    var m = d.getMinutes();
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  // Bot chat responses removed — only real user messages

  // ── Game Data ──
  var GAME_LIST = [
    { id: 'valorant', name: 'VALORANT', icon: 'https://img.icons8.com/?size=100&id=aUZxT3Erwill&format=png&color=000000', color: '#ff4655' },
    { id: 'lol', name: 'LEAGUE OF LEGENDS', icon: 'https://www.rw-designer.com/icon-image/21516-64x64x32.png', color: '#c89b3c' },
    { id: 'cs2', name: 'CS2', icon: 'https://img.icons8.com/?size=100&id=jzahITKncvRL&format=png&color=000000', color: '#de9b35' },
    { id: 'fortnite', name: 'FORTNITE', icon: 'https://img.icons8.com/?size=100&id=68099&format=png&color=000000', color: '#00b4ff' },
    { id: 'minecraft', name: 'MINECRAFT', icon: 'https://img.icons8.com/?size=100&id=PQ7bo28SyNO6&format=png&color=000000', color: '#5da83a' },
    { id: 'other', name: 'DİĞER', icon: 'https://img.icons8.com/?size=100&id=36631&format=png&color=a78bfa', color: '#a78bfa' }
  ];

  // Per-game rank lists with correct ranks for each game
  var RANK_MAP = {
    valorant: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'],
    lol: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
    cs2: ['Silver I', 'Silver II', 'Silver III', 'Silver IV', 'Silver Elite', 'Silver Elite Master', 'Gold Nova I', 'Gold Nova II', 'Gold Nova III', 'Gold Nova Master', 'Master Guardian I', 'Master Guardian II', 'Master Guardian Elite', 'Distinguished Master Guardian', 'Legendary Eagle', 'Legendary Eagle Master', 'Supreme Master First Class', 'Global Elite'],
    fortnite: ['Open League', 'Contender League', 'Champion League', 'Unreal'],
    minecraft: [],
    other: []
  };

  function getRanksForGame(gameId) {
    return RANK_MAP[gameId] || [];
  }

  // ── Helpers ──
  function generateCode() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var code = 'NX-';
    for (var i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  function getLobbies() {
    try {
      var data = JSON.parse(localStorage.getItem(LOBBIES_KEY)) || [];
      // Filter expired
      var now = Date.now();
      var active = [];
      for (var i = 0; i < data.length; i++) {
        if (now - data[i].createdAt < LOBBY_EXPIRY_MS) {
          active.push(data[i]);
        }
      }
      return active;
    } catch (e) { return []; }
  }

  function saveLobbies(lobbies) {
    try { localStorage.setItem(LOBBIES_KEY, JSON.stringify(lobbies)); } catch (e) { }
  }

  function getMyLobby() {
    try {
      var data = JSON.parse(localStorage.getItem(MY_LOBBY_KEY));
      if (data && (Date.now() - data.createdAt < LOBBY_EXPIRY_MS)) {
        // Sync player list from global lobbies (other players may have joined)
        var lobbies = getLobbies();
        for (var i = 0; i < lobbies.length; i++) {
          if (lobbies[i].code === data.code) {
            data.players = lobbies[i].players;
            // Persist synced data back
            saveMyLobby(data);
            break;
          }
        }
        return data;
      }
      return null;
    } catch (e) { return null; }
  }

  function saveMyLobby(lobby) {
    try { localStorage.setItem(MY_LOBBY_KEY, JSON.stringify(lobby)); } catch (e) { }
  }

  function clearMyLobby() {
    try { localStorage.removeItem(MY_LOBBY_KEY); } catch (e) { }
  }

  function getUsername() {
    try {
      var email = localStorage.getItem('loggedInUser');
      if (!email) return 'Oyuncu';
      var users = JSON.parse(localStorage.getItem('users')) || [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) return users[i].username || 'Oyuncu';
      }
      return 'Oyuncu';
    } catch (e) { return 'Oyuncu'; }
  }

  function getLang() {
    try { return localStorage.getItem('preferred_lang') || 'tr'; } catch (e) { return 'tr'; }
  }

  function getGameById(id) {
    for (var i = 0; i < GAME_LIST.length; i++) {
      if (GAME_LIST[i].id === id) return GAME_LIST[i];
    }
    return GAME_LIST[0];
  }

  // Returns display name: custom name if 'other' game, else standard game name
  function getDisplayGameName(lobby) {
    var game = getGameById(lobby.game);
    if (lobby.game === 'other' && lobby.customGameName) {
      return lobby.customGameName;
    }
    return game.name;
  }

  function timeAgo(timestamp) {
    var lang = getLang();
    var diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return lang === 'en' ? 'Just now' : 'Az önce';
    var mins = Math.floor(diff / 60);
    if (mins < 60) return mins + (lang === 'en' ? ' min ago' : ' dk önce');
    return lang === 'en' ? '30+ min ago' : '30+ dk önce';
  }

  function timeRemaining(timestamp) {
    var lang = getLang();
    var remaining = LOBBY_EXPIRY_MS - (Date.now() - timestamp);
    if (remaining <= 0) return lang === 'en' ? 'Expired' : 'Süresi doldu';
    var mins = Math.floor(remaining / 60000);
    var secs = Math.floor((remaining % 60000) / 1000);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  // Mock lobbies removed — only real user lobbies
  function seedMockLobbies() { /* no-op */ }

  // ── Render the Lobby System ──
  function renderSmartMatchCard() {
    var container = document.getElementById('smart-match-container');
    if (!container) return;

    var lang = getLang();
    var myUsername = getUsername();
    var myLobby = getMyLobby();

    seedMockLobbies();

    var html = '';

    // ── Section Title ──
    html += '<div class="flex items-center justify-between mb-6">';
    html += '<div class="flex items-center gap-3">';
    html += '<span class="material-symbols-outlined text-[#00f2ff] text-2xl" style="font-variation-settings:\'FILL\' 1">meeting_room</span>';
    html += '<h3 class="font-fredoka text-xl font-semibold text-on-background" data-i18n="lobby_title">' + (lang === 'en' ? 'Lobby System' : 'Lobi Sistemi') + '</h3>';
    html += '</div>';
    html += '<div class="lobby-player-count">';
    html += '<span class="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse inline-block"></span>';
    html += '<span class="text-[11px] font-space font-bold text-[#849495] ml-1.5">' + getLobbies().length + ' ' + (lang === 'en' ? 'Active' : 'Aktif') + '</span>';
    html += '</div>';
    html += '</div>';

    // ── Tab Navigation ──
    html += '<div class="lobby-tabs mb-5">';
    html += '<button class="lobby-tab active" data-tab="create" id="lobby-tab-create">';
    html += '<span class="material-symbols-outlined text-sm">add_circle</span>';
    html += '<span data-i18n="lobby_tab_create">' + (lang === 'en' ? 'Create Lobby' : 'Lobi Oluştur') + '</span>';
    html += '</button>';
    html += '<button class="lobby-tab" data-tab="join" id="lobby-tab-join">';
    html += '<span class="material-symbols-outlined text-sm">login</span>';
    html += '<span data-i18n="lobby_tab_join">' + (lang === 'en' ? 'Join Lobby' : 'Lobiye Katıl') + '</span>';
    html += '</button>';

    html += '</div>';

    // ═══════════════════════════════════════
    //  TAB 1: CREATE LOBBY
    // ═══════════════════════════════════════
    html += '<div class="lobby-panel" id="panel-create">';

    if (myLobby) {
      // Show active lobby
      var myGame = getGameById(myLobby.game);
      var myGameDisplayName = getDisplayGameName(myLobby);
      html += '<div class="lobby-active-card">';
      html += '<div class="lobby-active-header">';
      html += '<div class="flex items-center gap-3">';
      html += '<div class="lobby-game-icon-lg" style="border-color:' + myGame.color + '40">';
      html += '<img src="' + myGame.icon + '" alt="' + myGameDisplayName + '" class="w-full h-full rounded-full object-cover">';
      html += '</div>';
      html += '<div>';
      html += '<div class="text-lg font-fredoka font-bold text-on-background">' + (lang === 'en' ? 'Your Lobby' : 'Senin Lobin') + '</div>';
      html += '<div class="flex items-center gap-2">';
      html += '<span class="lobby-game-chip" style="background:' + myGame.color + '20;color:' + myGame.color + '">' + myGameDisplayName + '</span>';
      if (myLobby.rank) {
        html += '<span class="text-[11px] text-[#849495] font-space">' + myLobby.rank + '</span>';
      }
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '<div class="lobby-timer" id="my-lobby-timer">';
      html += '<span class="material-symbols-outlined text-xs">timer</span>';
      html += '<span>' + timeRemaining(myLobby.createdAt) + '</span>';
      html += '</div>';
      html += '</div>';

      // Lobby code display
      html += '<div class="lobby-code-display">';
      html += '<div class="lobby-code-label">' + (lang === 'en' ? 'LOBBY CODE' : 'LOBİ KODU') + '</div>';
      html += '<div class="lobby-code-value" id="my-lobby-code">' + myLobby.code + '</div>';
      html += '<button class="lobby-copy-btn" id="lobby-copy-btn" title="' + (lang === 'en' ? 'Copy' : 'Kopyala') + '">';
      html += '<span class="material-symbols-outlined text-sm">content_copy</span>';
      html += '<span>' + (lang === 'en' ? 'Copy Code' : 'Kodu Kopyala') + '</span>';
      html += '</button>';
      html += '</div>';

      // Room ID display (if provided)
      if (myLobby.roomId) {
        html += '<div class="lobby-room-id-display">';
        html += '<div class="lobby-room-id-header">';
        html += '<div class="flex items-center gap-2">';
        html += '<span class="material-symbols-outlined text-sm" style="color:#ffaa00;font-variation-settings:\'FILL\' 1">meeting_room</span>';
        html += '<span class="lobby-room-id-label">' + (lang === 'en' ? 'IN-GAME ROOM ID' : 'OYUN İÇİ ODA NUMARASI') + '</span>';
        html += '</div>';
        html += '</div>';
        html += '<div class="lobby-room-id-value" id="my-room-id-value">' + myLobby.roomId + '</div>';
        html += '<button class="lobby-copy-btn lobby-room-copy-btn" id="room-id-copy-btn" title="' + (lang === 'en' ? 'Copy Room ID' : 'Oda Numarasını Kopyala') + '">';
        html += '<span class="material-symbols-outlined text-sm">content_copy</span>';
        html += '<span>' + (lang === 'en' ? 'Copy Room ID' : 'Oda No. Kopyala') + '</span>';
        html += '</button>';
        html += '</div>';
      }

      // Players in lobby
      html += '<div class="lobby-players-section">';
      html += '<div class="text-[10px] font-space font-bold uppercase tracking-widest text-[#849495] mb-2">';
      html += (lang === 'en' ? 'PLAYERS' : 'OYUNCULAR') + ' (' + myLobby.players.length + '/' + myLobby.maxPlayers + ')';
      html += '</div>';
      html += '<div class="lobby-players-list">';
      for (var p = 0; p < myLobby.players.length; p++) {
        html += '<div class="lobby-player-chip">';
        html += '<span class="material-symbols-outlined text-xs" style="font-variation-settings:\'FILL\' 1">person</span>';
        html += '<span>' + myLobby.players[p] + '</span>';
        if (p === 0) html += '<span class="lobby-host-badge">' + (lang === 'en' ? 'HOST' : 'KURUCU') + '</span>';
        html += '</div>';
      }
      html += '</div>';
      html += '</div>';

      if (myLobby.note) {
        html += '<div class="lobby-note">';
        html += '<span class="material-symbols-outlined text-xs text-[#849495]">chat_bubble</span>';
        html += '<span class="text-[12px] text-[#b9cacb]">' + myLobby.note + '</span>';
        html += '</div>';
      }

      // ── Lobby Chat Section ──
      html += '<div class="lobby-chat-section">';
      html += '<div class="lobby-chat-header">';
      html += '<div class="lobby-chat-title">';
      html += '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">forum</span>';
      html += '<span>' + (lang === 'en' ? 'LOBBY CHAT' : 'LOBİ SOHBET') + '</span>';
      html += '</div>';
      html += '<div class="lobby-chat-online-dot"></div>';
      html += '</div>';
      html += '<div class="lobby-chat-container">';
      html += '<div class="lobby-chat-messages" id="lobby-chat-messages">';

      // Render existing messages
      var chatMsgs = getChatMessages(myLobby.code);
      if (chatMsgs.length === 0) {
        // System welcome message
        html += '<div class="lobby-chat-system-msg"><span>' + (lang === 'en' ? '🎮 Lobby created — chat with your team!' : '🎮 Lobi oluşturuldu — takımınla sohbet et!') + '</span></div>';
      } else {
        for (var m = 0; m < chatMsgs.length; m++) {
          html += renderChatMessage(chatMsgs[m], myUsername, myLobby.host);
        }
      }

      html += '</div>'; // .lobby-chat-messages
      html += '<div class="lobby-chat-input-row">';
      html += '<input type="text" class="lobby-chat-input" id="lobby-chat-input" placeholder="' + (lang === 'en' ? 'Type a message...' : 'Bir mesaj yaz...') + '" maxlength="200" autocomplete="off">';
      html += '<button class="lobby-chat-send-btn" id="lobby-chat-send-btn">';
      html += '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">send</span>';
      html += '</button>';
      html += '</div>';
      html += '</div>'; // .lobby-chat-container
      html += '</div>'; // .lobby-chat-section

      // Close lobby button
      html += '<button class="lobby-close-btn" id="lobby-close-btn">';
      html += '<span class="material-symbols-outlined text-sm">close</span>';
      html += '<span>' + (lang === 'en' ? 'Close Lobby' : 'Lobiyi Kapat') + '</span>';
      html += '</button>';

      html += '</div>'; // .lobby-active-card
    } else {
      // Create lobby form
      html += '<div class="lobby-create-form">';

      // Game selector
      html += '<div class="lobby-form-group">';
      html += '<label class="lobby-form-label">' + (lang === 'en' ? 'SELECT GAME' : 'OYUN SEÇ') + '</label>';
      html += '<div class="lobby-game-grid" id="lobby-game-grid">';
      for (var g = 0; g < GAME_LIST.length; g++) {
        html += '<button class="lobby-game-btn' + (g === 0 ? ' active' : '') + '" data-game="' + GAME_LIST[g].id + '" style="--game-color:' + GAME_LIST[g].color + '">';
        html += '<img src="' + GAME_LIST[g].icon + '" alt="' + GAME_LIST[g].name + '" class="w-8 h-8 rounded-lg object-cover">';
        html += '<span class="text-[10px] font-space font-bold mt-1 truncate w-full text-center">' + GAME_LIST[g].name + '</span>';
        html += '</button>';
      }
      html += '</div>';
      html += '</div>';

      // Rank selector (dynamic per game)
      var defaultGameId = 'valorant';
      var defaultRanks = getRanksForGame(defaultGameId);
      html += '<div class="lobby-form-group" id="lobby-rank-group"' + (defaultRanks.length === 0 ? ' style="display:none"' : '') + '>';
      html += '<label class="lobby-form-label">' + (lang === 'en' ? 'YOUR RANK' : 'RANKIN') + '</label>';
      html += '<select class="lobby-select" id="lobby-rank-select">';
      html += '<option value="">' + (lang === 'en' ? 'Select Rank...' : 'Rank Seç...') + '</option>';
      for (var r = 0; r < defaultRanks.length; r++) {
        html += '<option value="' + defaultRanks[r] + '">' + defaultRanks[r] + '</option>';
      }
      html += '</select>';
      html += '</div>';

      // Custom game name input (visible only when 'Diğer' is selected)
      html += '<div class="lobby-form-group" id="lobby-custom-game-group" style="display:none">';
      html += '<label class="lobby-form-label">' + (lang === 'en' ? 'GAME NAME' : 'OYUN ADI') + '</label>';
      html += '<input type="text" class="lobby-input" id="lobby-custom-game-input" placeholder="' + (lang === 'en' ? 'e.g. Apex Legends, Rocket League...' : 'Örn: Apex Legends, Rocket League...') + '" maxlength="40">';
      html += '</div>';

      // Room ID
      html += '<div class="lobby-form-group">';
      html += '<label class="lobby-form-label">' + (lang === 'en' ? 'IN-GAME ROOM ID (OPTIONAL)' : 'OYUN İÇİ ODA NUMARASI (OPSİYONEL)') + '</label>';
      html += '<div class="lobby-room-input-wrapper">';
      html += '<span class="material-symbols-outlined lobby-room-input-icon">meeting_room</span>';
      html += '<input type="text" class="lobby-input lobby-room-input" id="lobby-room-input" placeholder="' + (lang === 'en' ? 'e.g. MyRoom#1234, LobbyName...' : 'Örn: OdaAdı#1234, LobiAdi...') + '" maxlength="40">';
      html += '</div>';
      html += '<span class="text-[10px] text-[#849495]/60 font-space mt-1 block" style="margin-top:4px">' + (lang === 'en' ? 'Share your in-game room so others can join directly' : 'Oyun içi oda numaranı paylaş, diğerleri direkt katılsın') + '</span>';
      html += '</div>';

      // Note
      html += '<div class="lobby-form-group">';
      html += '<label class="lobby-form-label">' + (lang === 'en' ? 'NOTE (OPTIONAL)' : 'NOT (OPSİYONEL)') + '</label>';
      html += '<input type="text" class="lobby-input" id="lobby-note-input" placeholder="' + (lang === 'en' ? 'e.g. Ranked grind, mic required...' : 'Örn: Ranked kasıyorum, mikrofonlu gelsin...') + '" maxlength="80">';
      html += '</div>';

      // Create button
      html += '<button class="lobby-create-btn" id="lobby-create-btn">';
      html += '<span class="material-symbols-outlined text-lg">rocket_launch</span>';
      html += '<span>' + (lang === 'en' ? 'Create Lobby' : 'Lobi Oluştur') + '</span>';
      html += '</button>';

      html += '</div>'; // .lobby-create-form
    }

    html += '</div>'; // #panel-create

    // ═══════════════════════════════════════
    //  TAB 2: JOIN LOBBY
    // ═══════════════════════════════════════
    html += '<div class="lobby-panel hidden" id="panel-join">';
    html += '<div class="lobby-join-form">';

    // Code input
    html += '<div class="lobby-join-illustration">';
    html += '<span class="material-symbols-outlined lobby-join-icon">vpn_key</span>';
    html += '<p class="text-sm text-[#b9cacb] font-space mt-2 text-center">' + (lang === 'en' ? 'Enter a lobby code to join your friend\'s room' : 'Arkadaşının odasına katılmak için lobi kodunu gir') + '</p>';
    html += '</div>';

    html += '<div class="lobby-code-input-wrapper">';
    html += '<input type="text" class="lobby-code-input" id="lobby-code-input" placeholder="NX-XXXX" maxlength="7" autocomplete="off" spellcheck="false">';
    html += '</div>';

    html += '<div id="lobby-join-result" class="lobby-join-result hidden"></div>';

    html += '<button class="lobby-join-btn" id="lobby-join-btn">';
    html += '<span class="material-symbols-outlined text-lg">login</span>';
    html += '<span>' + (lang === 'en' ? 'Join Lobby' : 'Lobiye Katıl') + '</span>';
    html += '</button>';

    html += '</div>'; // .lobby-join-form
    html += '</div>'; // #panel-join



    container.innerHTML = html;

    // ── Bind Events ──
    bindTabEvents();
    bindCreateEvents();
    bindJoinEvents();

    bindChatEvents();

    // Start timer if my lobby is active
    if (myLobby) {
      startMyLobbyTimer();
      // Auto-scroll chat to bottom
      var chatBox = document.getElementById('lobby-chat-messages');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  // ── Render single chat message ──
  function renderChatMessage(msg, myUsername, hostName) {
    var html = '';
    if (msg.type === 'system') {
      html += '<div class="lobby-chat-system-msg"><span>' + msg.text + '</span></div>';
      return html;
    }
    var isMine = msg.sender === myUsername;
    var isHost = msg.sender === hostName;
    html += '<div class="lobby-chat-msg' + (isMine ? ' mine' : '') + '">';
    html += '<div class="lobby-chat-avatar' + (isHost ? ' host' : '') + '">';
    html += '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">' + (isHost ? 'shield' : 'person') + '</span>';
    html += '</div>';
    html += '<div class="lobby-chat-bubble">';
    html += '<div class="lobby-chat-bubble-name' + (isHost ? ' host-name' : '') + '">' + msg.sender + '</div>';
    html += '<div class="lobby-chat-bubble-text">' + escapeHtml(msg.text) + '</div>';
    html += '<div class="lobby-chat-bubble-time">' + chatTimeFormat(msg.time) + '</div>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }



  // ── Tab Switching ──
  function bindTabEvents() {
    var tabs = document.querySelectorAll('.lobby-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function () {
        var target = this.getAttribute('data-tab');
        // Update tab active state
        var allTabs = document.querySelectorAll('.lobby-tab');
        for (var t = 0; t < allTabs.length; t++) {
          allTabs[t].classList.remove('active');
        }
        this.classList.add('active');
        // Show correct panel
        var panels = document.querySelectorAll('.lobby-panel');
        for (var p = 0; p < panels.length; p++) {
          panels[p].classList.add('hidden');
        }
        var panel = document.getElementById('panel-' + target);
        if (panel) {
          panel.classList.remove('hidden');
          panel.style.animation = 'lobbyFadeIn 0.3s ease forwards';
        }
      });
    }
  }

  // ── Create Lobby Events ──
  function bindCreateEvents() {
    // Game selection (with dynamic rank update)
    var gameBtns = document.querySelectorAll('.lobby-game-btn');
    for (var i = 0; i < gameBtns.length; i++) {
      gameBtns[i].addEventListener('click', function () {
        for (var j = 0; j < gameBtns.length; j++) {
          gameBtns[j].classList.remove('active');
        }
        this.classList.add('active');

        // Dynamically update rank dropdown for selected game
        var selectedGameId = this.getAttribute('data-game');
        var ranks = getRanksForGame(selectedGameId);
        var rankSelect = document.getElementById('lobby-rank-select');
        var rankGroup = document.getElementById('lobby-rank-group');
        var lang = getLang();
        if (rankSelect) {
          rankSelect.innerHTML = '<option value="">' + (lang === 'en' ? 'Select Rank...' : 'Rank Seç...') + '</option>';
          for (var r = 0; r < ranks.length; r++) {
            rankSelect.innerHTML += '<option value="' + ranks[r] + '">' + ranks[r] + '</option>';
          }
        }
        if (rankGroup) {
          rankGroup.style.display = ranks.length === 0 ? 'none' : '';
        }
        // Show/hide custom game name input
        var customGameGroup = document.getElementById('lobby-custom-game-group');
        if (customGameGroup) {
          customGameGroup.style.display = selectedGameId === 'other' ? '' : 'none';
        }
      });
    }

    // Create button
    var createBtn = document.getElementById('lobby-create-btn');
    if (createBtn) {
      createBtn.addEventListener('click', function () {
        var selectedGame = document.querySelector('.lobby-game-btn.active');
        var gameId = selectedGame ? selectedGame.getAttribute('data-game') : 'valorant';
        var rankSelect = document.getElementById('lobby-rank-select');
        var noteInput = document.getElementById('lobby-note-input');
        var customGameInput = document.getElementById('lobby-custom-game-input');
        var roomInput = document.getElementById('lobby-room-input');
        var rank = rankSelect ? rankSelect.value : '';
        var note = noteInput ? noteInput.value.trim() : '';
        var customGameName = (customGameInput && gameId === 'other') ? customGameInput.value.trim() : '';
        var roomId = roomInput ? roomInput.value.trim() : '';
        var username = getUsername();

        var newLobby = {
          code: generateCode(),
          host: username,
          game: gameId,
          customGameName: customGameName,
          rank: rank,
          note: note,
          roomId: roomId,
          players: [username],
          maxPlayers: MAX_PLAYERS,
          createdAt: Date.now()
        };

        // Save to my lobby
        saveMyLobby(newLobby);

        // Add to global lobbies
        var lobbies = getLobbies();
        lobbies.unshift(newLobby);
        saveLobbies(lobbies);

        // Re-render with animation
        createBtn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">progress_activity</span><span>' + (getLang() === 'en' ? 'Creating...' : 'Oluşturuluyor...') + '</span>';
        createBtn.disabled = true;

        setTimeout(function () {
          renderSmartMatchCard();
        }, 800);
      });
    }

    // Close lobby button
    var closeBtn = document.getElementById('lobby-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        var myLobby = getMyLobby();
        if (myLobby) {
          // Remove from global lobbies
          var lobbies = getLobbies();
          var filtered = [];
          for (var i = 0; i < lobbies.length; i++) {
            if (lobbies[i].code !== myLobby.code) {
              filtered.push(lobbies[i]);
            }
          }
          saveLobbies(filtered);
          // Clear chat for this lobby
          clearChat(myLobby.code);
        }
        clearMyLobby();
        renderSmartMatchCard();
      });
    }

    // Copy lobby code button
    var copyBtn = document.getElementById('lobby-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var codeEl = document.getElementById('my-lobby-code');
        if (codeEl) {
          copyToClipboard(codeEl.textContent, copyBtn);
        }
      });
    }

    // Copy Room ID button (in active lobby)
    var roomCopyBtn = document.getElementById('room-id-copy-btn');
    if (roomCopyBtn) {
      roomCopyBtn.addEventListener('click', function () {
        var roomEl = document.getElementById('my-room-id-value');
        if (roomEl) {
          copyToClipboard(roomEl.textContent, roomCopyBtn);
        }
      });
    }
  }

  // Generic copy to clipboard helper
  function copyToClipboard(text, feedbackBtn) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        if (feedbackBtn) showCopyFeedback(feedbackBtn);
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      if (feedbackBtn) showCopyFeedback(feedbackBtn);
    }
  }

  function showCopyFeedback(btn) {
    var lang = getLang();
    var original = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span><span>' + (lang === 'en' ? 'Copied!' : 'Kopyalandı!') + '</span>';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.innerHTML = original;
      btn.classList.remove('copied');
    }, 2000);
  }

  // ── Join Lobby Events ──
  function bindJoinEvents() {
    var input = document.getElementById('lobby-code-input');
    var joinBtn = document.getElementById('lobby-join-btn');
    var result = document.getElementById('lobby-join-result');

    if (input) {
      // Auto uppercase and format
      input.addEventListener('input', function () {
        var val = this.value.toUpperCase().replace(/[^A-Z0-9\-]/g, '');
        // Auto-insert dash after NX
        if (val.length === 2 && val === 'NX') {
          val = 'NX-';
        }
        this.value = val;
      });

      // Submit on Enter
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && joinBtn) {
          joinBtn.click();
        }
      });
    }

    if (joinBtn) {
      joinBtn.addEventListener('click', function () {
        if (!input || !result) return;
        var code = input.value.trim().toUpperCase();

        if (code.length < 5) {
          showJoinResult(result, 'error', getLang() === 'en' ? 'Please enter a valid lobby code' : 'Lütfen geçerli bir lobi kodu girin');
          return;
        }

        // Animate search
        joinBtn.disabled = true;
        joinBtn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">radar</span><span>' + (getLang() === 'en' ? 'Searching...' : 'Aranıyor...') + '</span>';

        setTimeout(function () {
          var lobbies = getLobbies();
          var found = null;
          for (var i = 0; i < lobbies.length; i++) {
            if (lobbies[i].code === code) {
              found = lobbies[i];
              break;
            }
          }

          if (found) {
            var game = getGameById(found.game);
            var foundDisplayName = getDisplayGameName(found);
            var lang = getLang();
            var myUsername = getUsername();

            // Check if already in lobby
            var alreadyIn = false;
            for (var j = 0; j < found.players.length; j++) {
              if (found.players[j] === myUsername) alreadyIn = true;
            }

            if (found.players.length >= found.maxPlayers && !alreadyIn) {
              showJoinResult(result, 'error', lang === 'en' ? 'Lobby is full!' : 'Lobi dolu!');
            } else {
              // Add player to lobby
              if (!alreadyIn) {
                found.players.push(myUsername);
                var lobbies2 = getLobbies();
                for (var k = 0; k < lobbies2.length; k++) {
                  if (lobbies2[k].code === code) {
                    lobbies2[k] = found;
                    break;
                  }
                }
                saveLobbies(lobbies2);
              }

              var successHtml = '<div class="lobby-join-success">';
              successHtml += '<div class="lobby-join-success-icon"><span class="material-symbols-outlined text-3xl text-[#00ff88]">check_circle</span></div>';
              successHtml += '<div class="text-base font-fredoka font-bold text-on-background mt-2">' + (lang === 'en' ? 'Lobby Found!' : 'Lobi Bulundu!') + '</div>';
              successHtml += '<div class="lobby-join-found-card mt-3">';
              successHtml += '<div class="flex items-center gap-3">';
              successHtml += '<div class="lobby-game-icon-sm" style="border-color:' + game.color + '40">';
              successHtml += '<img src="' + game.icon + '" alt="' + foundDisplayName + '" class="w-full h-full rounded-full object-cover">';
              successHtml += '</div>';
              successHtml += '<div>';
              successHtml += '<div class="text-sm font-bold text-on-background">' + found.host + (lang === 'en' ? '\'s Lobby' : ' Lobisi') + '</div>';
              successHtml += '<div class="flex items-center gap-2">';
              successHtml += '<span class="lobby-game-chip-sm" style="background:' + game.color + '20;color:' + game.color + '">' + foundDisplayName + '</span>';
              if (found.rank) {
                successHtml += '<span class="text-[11px] text-[#849495] font-space">' + found.rank + '</span>';
              }
              successHtml += '</div>';
              successHtml += '</div>';
              successHtml += '</div>';
              if (found.roomId) {
                successHtml += '<div class="lobby-join-room-id mt-3">';
                successHtml += '<div class="flex items-center gap-2">';
                successHtml += '<span class="material-symbols-outlined" style="font-size:14px;color:#ffaa00;font-variation-settings:\'FILL\' 1">meeting_room</span>';
                successHtml += '<span class="text-[10px] font-space font-bold uppercase tracking-widest text-[#ffaa00]">' + (lang === 'en' ? 'ROOM ID' : 'ODA NUMARASI') + '</span>';
                successHtml += '</div>';
                successHtml += '<div class="lobby-join-room-id-value">' + found.roomId + '</div>';
                successHtml += '<button class="lobby-copy-btn lobby-room-copy-btn lobby-join-room-copy" data-room-id="' + found.roomId + '" style="margin-top:6px">';
                successHtml += '<span class="material-symbols-outlined text-sm">content_copy</span>';
                successHtml += '<span>' + (lang === 'en' ? 'Copy Room ID' : 'Oda No. Kopyala') + '</span>';
                successHtml += '</button>';
                successHtml += '</div>';
              }
              if (found.note) {
                successHtml += '<p class="text-[11px] text-[#b9cacb] mt-2 pl-10">"' + found.note + '"</p>';
              }
              successHtml += '<div class="flex items-center gap-2 mt-2 pl-10">';
              successHtml += '<span class="material-symbols-outlined text-xs text-[#849495]">group</span>';
              successHtml += '<span class="text-[11px] text-[#849495] font-space">' + found.players.length + '/' + found.maxPlayers + ' ' + (lang === 'en' ? 'players' : 'oyuncu') + '</span>';
              successHtml += '</div>';
              successHtml += '</div>';
              successHtml += '</div>';
              showJoinResult(result, 'success', successHtml, true);
            }
          } else {
            showJoinResult(result, 'error', getLang() === 'en' ? 'Lobby not found! Check the code and try again.' : 'Lobi bulunamadı! Kodu kontrol edip tekrar deneyin.');
          }

          // Reset button
          joinBtn.disabled = false;
          joinBtn.innerHTML = '<span class="material-symbols-outlined text-lg">login</span><span>' + (getLang() === 'en' ? 'Join Lobby' : 'Lobiye Katıl') + '</span>';
        }, 1200);
      });
    }
  }

  function showJoinResult(el, type, message, isHtml) {
    el.classList.remove('hidden', 'success', 'error');
    el.classList.add(type);
    if (isHtml) {
      el.innerHTML = message;
    } else {
      el.innerHTML = '<div class="flex items-center gap-2"><span class="material-symbols-outlined text-sm">' + (type === 'error' ? 'error' : 'check_circle') + '</span><span>' + message + '</span></div>';
    }
    el.style.animation = 'lobbyFadeIn 0.3s ease forwards';
  }



  // ── Chat Events ──
  function bindChatEvents() {
    var chatInput = document.getElementById('lobby-chat-input');
    var sendBtn = document.getElementById('lobby-chat-send-btn');
    if (!chatInput || !sendBtn) return;

    function sendMessage() {
      var myLobby = getMyLobby();
      if (!myLobby) return;
      var text = chatInput.value.trim();
      if (!text) return;

      var msg = {
        sender: getUsername(),
        text: text,
        time: Date.now(),
        type: 'user'
      };

      saveChatMessage(myLobby.code, msg);

      // Append to DOM directly for smooth UX (no full re-render)
      var chatBox = document.getElementById('lobby-chat-messages');
      if (chatBox) {
        // Remove empty state if present
        var systemMsgs = chatBox.querySelectorAll('.lobby-chat-system-msg');
        // Keep system messages, they're fine

        var msgHtml = renderChatMessage(msg, getUsername(), myLobby.host);
        var temp = document.createElement('div');
        temp.innerHTML = msgHtml;
        while (temp.firstChild) {
          chatBox.appendChild(temp.firstChild);
        }
        chatBox.scrollTop = chatBox.scrollHeight;
      }

      chatInput.value = '';
      chatInput.focus();
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // ── Timer for my lobby ──
  var timerInterval = null;
  function startMyLobbyTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(function () {
      var myLobby = getMyLobby();
      if (!myLobby) {
        clearInterval(timerInterval);
        renderSmartMatchCard();
        return;
      }
      var timerEl = document.getElementById('my-lobby-timer');
      if (timerEl) {
        var remaining = LOBBY_EXPIRY_MS - (Date.now() - myLobby.createdAt);
        if (remaining <= 0) {
          clearMyLobby();
          clearInterval(timerInterval);
          renderSmartMatchCard();
        } else {
          var spans = timerEl.querySelectorAll('span');
          if (spans.length > 1) {
            spans[1].textContent = timeRemaining(myLobby.createdAt);
          }
        }
      }
    }, 1000);
  }

  // ── Init ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSmartMatchCard);
  } else {
    renderSmartMatchCard();
  }

  // Expose for i18n refresh
  window.renderSmartMatchCard = renderSmartMatchCard;

})();
