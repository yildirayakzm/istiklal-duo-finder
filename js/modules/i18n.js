/**
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 *  İSTİKLAL — i18n Multi-Language Engine (i18n.js)
 *  TR â†” EN toggle with data-i18n DOM updates.
 *  Persists choice in localStorage ('preferred_lang').
 *  Injects sidebar language toggle. Include on ALL pages.
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 */
(function () {
  'use strict';

  var LANG_KEY = 'preferred_lang';

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  //  TRANSLATION DICTIONARY
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  var DICT = {
    // â”€â”€ Navigation â”€â”€
    nav_panel: { tr: 'Panel', en: 'Dashboard' },
    nav_matches: { tr: 'Eşleşmeler', en: 'Matches' },
    nav_compete: { tr: 'Rekabet', en: 'Compete' },
    nav_messages: { tr: 'Mesajlar', en: 'Messages' },
    nav_support: { tr: 'Destek', en: 'Support' },
    nav_profile: { tr: 'Profil', en: 'Profile' },
    nav_settings: { tr: 'Ayarlar', en: 'Settings' },
    nav_report: { tr: 'Rapor Bildir', en: 'Report' },
    nav_feedback: { tr: 'İstek & Öneri', en: 'Feedback' },
    nav_logout: { tr: 'Çıkış Yap', en: 'Logout' },
    nav_faq: { tr: 'SSS', en: 'FAQ' },
    nav_rules: { tr: 'Kurallar', en: 'Rules' },
    nav_login: { tr: 'Giriş', en: 'Login' },
    nav_register: { tr: 'Kayıt', en: 'Register' },
    nav_discover: { tr: 'Keşfet', en: 'Discover' },
    nav_community: { tr: 'Topluluk', en: 'Community' },
    nav_forum: { tr: 'Forum', en: 'Forum' },
    nav_help: { tr: 'Yardım', en: 'Help' },
    nav_tournaments: { tr: 'Turnuvalar', en: 'Tournaments' },
    nav_clips: { tr: 'Klipler', en: 'Clips' },
    nav_missions: { tr: 'Görevler', en: 'Missions' },
    nav_admin: { tr: 'Admin', en: 'Admin' },
    
    // -- Mega Menu Dropdown --
    mega_find_player: { tr: 'OYUNCU BUL', en: 'FIND PLAYER' },
    mega_lfg_lobbies: { tr: 'LFG Lobiler', en: 'LFG Lobbies' },
    mega_lfg_desc: { tr: 'Aktif lobilere göz at, anında katıl', en: 'Browse active lobbies, join instantly' },
    mega_popular: { tr: 'POPÜLER', en: 'POPULAR' },
    mega_my_matches: { tr: 'Eşleşmelerim', en: 'My Matches' },
    mega_matches_desc: { tr: 'Geçmiş ve aktif duo eşleşmelerin', en: 'Your past and active duo matches' },
    mega_search_player: { tr: 'Oyuncu Ara', en: 'Search Player' },
    mega_search_desc: { tr: 'İsme, oyuna veya rank\'a göre bul', en: 'Find by name, game, or rank' },
    mega_contents: { tr: 'İÇERİKLER', en: 'CONTENTS' },
    mega_best_clips: { tr: 'En İyi Klipler', en: 'Best Clips' },
    mega_clips_desc: { tr: 'Topluluktan öne çıkan oyun anları', en: 'Highlight moments from the community' },
    mega_polls: { tr: 'Anketler & Oylama', en: 'Polls & Voting' },
    mega_polls_desc: { tr: 'Topluluk oylamaları ve fikir paylaşımı', en: 'Community votes and idea sharing' },
    mega_support: { tr: 'DESTEK', en: 'SUPPORT' },
    mega_live_support: { tr: 'Destek', en: 'Support' },
    mega_live_support_desc: { tr: 'Yardım ekibimize ulaşın', en: 'Contact our support team' },
    mega_faq: { tr: 'Sıkça Sorulan Sorular', en: 'Frequently Asked Questions' },
    mega_faq_desc: { tr: 'En çok merak edilen konular', en: 'Most wondered topics' },
    mega_rules: { tr: 'Topluluk Kuralları', en: 'Community Rules' },
    mega_rules_desc: { tr: 'Adil oyun ve davranış kuralları', en: 'Fair play and code of conduct' },
    mega_feedback_section: { tr: 'GERİ BİLDİRİM', en: 'FEEDBACK' },
    mega_report_player: { tr: 'Oyuncu Raporla', en: 'Report Player' },
    mega_report_desc: { tr: 'Kural ihlali veya toksik davranış bildir', en: 'Report rule violations or toxic behavior' },
    mega_feedback: { tr: 'İstek & Öneri', en: 'Feedback & Suggestion' },
    mega_feedback_desc: { tr: 'Platform iyileştirme önerileriniz', en: 'Your suggestions for platform improvement' },
    live_stream: { tr: 'CANLI AKIŞ', en: 'LIVE STREAM' },
    ticker_1: { tr: 'Lobi oluştur, duo\'nu bul ve birlikte kazan!', en: 'Create a lobby, find your duo and win together!' },
    ticker_2: { tr: 'Valorant, LoL, CS2 ve Fortnite için duo eşleşme sistemi aktif!', en: 'Duo matching system active for Valorant, LoL, CS2 and Fortnite!' },
    ticker_3: { tr: 'Nexus AI destekli akıllı eşleşme teknolojisi ile en uygun duo\'nu keşfet!', en: 'Discover your perfect duo with Nexus AI smart matching technology!' },
    ticker_4: { tr: 'Haftalık yarışmalara katıl, ödüller kazan!', en: 'Join weekly competitions, win rewards!' },
    ticker_5: { tr: 'Duo\'nla sesli iletişim kur, Discord entegrasyonu yakında!', en: 'Voice chat with your duo, Discord integration coming soon!' },
    ticker_6: { tr: 'İstiklal - Oyuncuları bir araya getiren yeni nesil eşleşme platformu!', en: 'İstiklal - The next-gen matching platform bringing players together!' },

    // â”€â”€ Dashboard â”€â”€
    welcome_prefix: { tr: "İstiklal'e Hoş Geldin,", en: 'Welcome to İstiklal,' },
    dashboard_subtitle: { tr: 'Bugün kimi taşıyorsun?', en: "Who are you carrying today?" },
    most_played: { tr: 'EN ÇOK OYNANANLAR', en: 'MOST PLAYED' },
    quick_match: { tr: 'Hızlı Eşleşme', en: 'Quick Match' },
    find_duo: { tr: 'Duo Bul', en: 'Find Duo' },
    connect_play: { tr: 'Bağlan ve Oyna', en: 'Connect & Play' },
    leaderboard: { tr: 'Sıralama', en: 'Leaderboard' },
    online_now: { tr: 'Şu an çevrimiçi', en: 'Online now' },
    active_matches: { tr: 'Aktif Eşleşmeler', en: 'Active Matches' },
    online_players: { tr: 'Online Oyuncular', en: 'Online Players' },
    active_requests: { tr: 'Aktif İstekler', en: 'Active Requests' },
    nexus_tactic: { tr: 'İSTİKLAL TAKTİK', en: 'İSTİKLAL TACTIC' },
    player_role: { tr: 'Oyuncu', en: 'Player' },
    drawer_theme: { tr: 'Tema', en: 'Theme' },
    drawer_lang: { tr: 'Dil', en: 'Language' },
    drawer_appearance: { tr: 'GÖRÜNÜM', en: 'THEME' },

    // â”€â”€ Sidebar / Profile â”€â”€
    sidebar_title: { tr: 'İSTİKLAL', en: 'İSTİKLAL' },
    theme_label: { tr: 'GÖRÜNÜM', en: 'THEME' },
    lang_label: { tr: 'DİL', en: 'LANGUAGE' },

    // â”€â”€ Auth / Login â”€â”€
    login_title: { tr: 'Giriş Yap', en: 'Login' },
    login_subtitle: { tr: 'Hesabına giriş yap', en: 'Sign in to your account' },
    login_nexus_entry: { tr: 'Oyun Dünyasına Adım At', en: 'Enter the Gaming World' },
    login_or_continue: { tr: 'Veya şununla devam et', en: 'Or continue with' },
    login_no_account: { tr: 'Henüz hesabın yok mu?', en: "Don't have an account yet?" },
    login_register_link: { tr: 'Kayıt Ol', en: 'Register' },
    login_logging_in: { tr: 'Giriş Yapılıyor...', en: 'Logging in...' },
    register_title: { tr: 'Kayıt Ol', en: 'Register' },
    email_label: { tr: 'E-Posta', en: 'Email' },
    email_or_username_label: { tr: 'E-posta veya Kullanıcı Adı', en: 'Email or Username' },
    password_label: { tr: 'Şifre', en: 'Password' },
    username_label: { tr: 'Kullanıcı Adı', en: 'Username' },
    remember_me: { tr: 'Beni Hatırla', en: 'Remember Me' },
    forgot_password: { tr: 'Şifremi Unuttum?', en: 'Forgot Password?' },
    no_account: { tr: 'Hesabın yok mu?', en: "Don't have an account?" },
    has_account: { tr: 'Zaten hesabın var mı?', en: 'Already have an account?' },
    login_btn: { tr: 'Giriş Yap', en: 'Login' },
    register_btn: { tr: 'KAYIT OL', en: 'REGISTER' },

    // â”€â”€ Register Page â”€â”€
    reg_subtitle: { tr: 'Yeni nesil eşleşme deneyimi', en: 'Next-gen matching experience' },
    reg_pw_confirm: { tr: 'Şifre Tekrar', en: 'Confirm Password' },
    reg_fav_games: { tr: 'En Sevdiğin Oyunlar', en: 'Favorite Games' },
    reg_optional: { tr: 'Opsiyonel', en: 'Optional' },
    reg_create_account: { tr: 'Hesap Oluştur', en: 'Create Account' },
    reg_already_account: { tr: 'Zaten bir hesabın var mı?', en: 'Already have an account?' },
    reg_login_link: { tr: 'Giriş Yap', en: 'Login' },
    reg_verify_title: { tr: 'Doğrulama Kodu', en: 'Verification Code' },
    reg_verify_desc: { tr: 'E-posta adresinize gönderilen', en: 'Enter the' },
    reg_verify_desc_code: { tr: '6 haneli kodu', en: '6-digit code' },
    reg_verify_desc_suffix: { tr: 'giriniz.', en: 'sent to your email.' },
    reg_verify_btn: { tr: 'Doğrula & Kayıt Ol', en: 'Verify & Register' },
    reg_resend: { tr: 'Tekrar Gönder', en: 'Resend' },
    reg_cancel: { tr: 'İptal', en: 'Cancel' },
    reg_success_toast: { tr: 'Hesap başarıyla oluşturuldu!', en: 'Account created successfully!' },
    reg_gamer_tag_ph: { tr: 'Gamer Etiketi', en: 'Gamer Tag' },
    reg_creating: { tr: 'Oluşturuluyor...', en: 'Creating...' },

    // â”€â”€ Settings Modal â”€â”€
    settings_title: { tr: 'Ayarlar', en: 'Settings' },
    settings_subtitle: { tr: 'Hesap ve uygulama tercihlerini yönet.', en: 'Manage account and app preferences.' },
    profile_info: { tr: 'PROFİL BİLGİLERİ', en: 'PROFILE INFO' },
    game_accounts: { tr: 'OYUN HESAPLARI', en: 'GAME ACCOUNTS' },
    notif_settings: { tr: 'BİLDİRİM AYARLARI', en: 'NOTIFICATION SETTINGS' },
    account_mgmt: { tr: 'HESAP YÖNETİMİ', en: 'ACCOUNT MANAGEMENT' },
    bio_label: { tr: 'Kısa Biyografi', en: 'Short Bio' },
    riot_id: { tr: 'Riot ID', en: 'Riot ID' },
    discord_id: { tr: 'Discord ID', en: 'Discord ID' },
    steam_url: { tr: 'Steam Profil Linki', en: 'Steam Profile URL' },
    email_notif: { tr: 'Raporlarım onaylandığında mail gelsin', en: 'Email me when my reports are reviewed' },
    change_password: { tr: 'Şifre Değiştir', en: 'Change Password' },
    current_password: { tr: 'Mevcut Şifre', en: 'Current Password' },
    new_password: { tr: 'Yeni Şifre (min 6 karakter)', en: 'New Password (min 6 chars)' },
    confirm_password: { tr: 'Yeni Şifre (Tekrar)', en: 'Confirm New Password' },
    update_password: { tr: 'Şifreyi Güncelle', en: 'Update Password' },
    delete_account: { tr: 'Hesabı Kalıcı Olarak Sil', en: 'Permanently Delete Account' },
    save_changes: { tr: 'Değişiklikleri Kaydet', en: 'Save Changes' },

    // â”€â”€ Feedback Modal â”€â”€
    feedback_title: { tr: 'İstek & Öneri', en: 'Feedback & Suggestions' },
    feedback_subtitle: { tr: 'Fikirlerini paylaş, platformu birlikte geliştirelim!', en: 'Share your ideas, let\'s improve the platform together!' },
    fb_title_label: { tr: 'Başlık', en: 'Title' },
    fb_category: { tr: 'Kategori', en: 'Category' },
    fb_description: { tr: 'Detaylı Açıklama', en: 'Detailed Description' },
    fb_send: { tr: 'Gönder', en: 'Submit' },
    fb_cat_feature: { tr: '🚀 Yeni Özellik İsteği', en: '🚀 New Feature Request' },
    fb_cat_improve: { tr: '⚡ Mevcut Özelliği Geliştir', en: '⚡ Improve Existing Feature' },
    fb_cat_design: { tr: '🎨 Tasarım Önerisi', en: '🎨 Design Suggestion' },
    fb_cat_other: { tr: '💡 Diğer', en: '💡 Other' },
    fb_cat_select: { tr: 'Kategori seçin...', en: 'Select category...' },

    // â”€â”€ Report Modal â”€â”€
    report_title: { tr: 'Rapor Bildir', en: 'Report User' },
    report_category: { tr: 'Şikayet Kategorisi', en: 'Report Category' },
    report_username: { tr: 'Kullanıcı Adı', en: 'Username' },
    report_desc: { tr: 'Açıklama', en: 'Description' },
    report_submit: { tr: 'Rapor Gönder', en: 'Submit Report' },
    report_cancel: { tr: 'İptal', en: 'Cancel' },
    report_cat_select: { tr: 'Kategori seçin...', en: 'Select category...' },
    report_cat_cheat: { tr: '🎮 Hile Kullanımı', en: '🎮 Cheating' },
    report_cat_harass: { tr: '💬 Hakaret / Taciz', en: '💬 Harassment' },
    report_cat_profile: { tr: '👤 Uygunsuz Profil', en: '👤 Inappropriate Profile' },
    report_cat_spam: { tr: '📨 Spam / Reklam', en: '📨 Spam / Advertisement' },
    report_cat_other: { tr: '📋 Diğer', en: '📋 Other' },

    // â”€â”€ Notifications â”€â”€
    notif_title: { tr: 'Bildirimler', en: 'Notifications' },
    notif_clear_all: { tr: 'Tümünü Sil', en: 'Clear All' },
    notif_mark_read: { tr: 'Okundu İşaretle', en: 'Mark as Read' },

    // â”€â”€ Profile Page â”€â”€
    profile_title: { tr: 'Oyuncu Profili', en: 'Player Profile' },
    profile_stats: { tr: 'İstatistikler', en: 'Statistics' },
    profile_games: { tr: 'Oyunlar', en: 'Games' },
    profile_upload: { tr: 'Fotoğraf Yükle', en: 'Upload Photo' },
    profile_game_ids: { tr: 'Oyun Kimlikleri', en: 'Game IDs' },
    profile_identity: { tr: 'Kimlik Ayarları', en: 'Identity Settings' },
    profile_hardware: { tr: 'Sistem Özellikleri & Ekipman', en: 'System Specs & Equipment' },
    profile_gaming_prefs: { tr: 'Oyun Tercihleri', en: 'Gaming Preferences' },
    profile_account_security: { tr: 'Hesap & Güvenlik', en: 'Account & Security' },
    profile_save_changes: { tr: 'Değişiklikleri Kaydet', en: 'Save Changes' },
    profile_cancel: { tr: 'İptal', en: 'Cancel' },
    profile_get_support: { tr: 'Destek Al', en: 'Get Support' },
    profile_gamer_customize: { tr: 'Gamer kimliğini özelleştir', en: 'Customize your gamer identity' },
    profile_select_games: { tr: 'Oyunlarını Seç', en: 'Select Your Games' },
    profile_in_game_roles: { tr: 'Oyun İçi Roller', en: 'In-Game Roles' },
     profile_server_region: { tr: 'Sunucu Bölgesi', en: 'Server Region' },
    profile_email_readonly: { tr: 'E-posta adresi değiştirilemez', en: 'Email address cannot be changed' },
    profile_email_label: { tr: 'E-posta', en: 'Email' },
    profile_old_pw: { tr: 'Mevcut Şifre', en: 'Current Password' },
    profile_new_pw: { tr: 'Yeni Şifre', en: 'New Password' },
    profile_bio_label: { tr: 'Biyografi', en: 'Bio' },
    profile_rank_select: { tr: 'Rank Seç...', en: 'Select Rank...' },
    profile_mode_select: { tr: 'Mod Seç...', en: 'Select Mode...' },
    profile_region_select: { tr: 'Bölge Seç...', en: 'Select Region...' },

    // â”€â”€ Profile Hardware Placeholders â”€â”€
    ph_cpu: { tr: 'İşlemci (CPU)', en: 'Processor (CPU)' },
    ph_gpu: { tr: 'Ekran Kartı (GPU)', en: 'Graphics Card (GPU)' },
    ph_ram: { tr: 'RAM (Bellek)', en: 'RAM (Memory)' },
    ph_motherboard: { tr: 'Anakart', en: 'Motherboard' },
    ph_storage: { tr: 'Depolama (SSD/HDD)', en: 'Storage (SSD/HDD)' },
    ph_psu: { tr: 'Güç Kaynağı (PSU)', en: 'Power Supply (PSU)' },
    ph_case: { tr: 'Kasa', en: 'Case' },
    ph_cooling: { tr: 'Soğutma Sistemi', en: 'Cooling System' },
    ph_monitor: { tr: 'Monitör', en: 'Monitor' },
    ph_keyboard: { tr: 'Klavye', en: 'Keyboard' },
    ph_mouse: { tr: 'Mouse', en: 'Mouse' },
    ph_headset: { tr: 'Kulaklık', en: 'Headset' },
    ph_mousepad: { tr: 'Mousepad', en: 'Mousepad' },
    ph_console: { tr: 'Oyun Konsolu (PS5 Pro vb.)', en: 'Game Console (PS5 Pro etc.)' },
    ph_laptop: { tr: 'Laptop (MacBook vb.)', en: 'Laptop (MacBook etc.)' },
    ph_gamer_tag: { tr: 'GamerTag\'ini gir...', en: 'Enter your GamerTag...' },
    ph_bio_profile: { tr: 'Kendinden bahset...', en: 'Tell about yourself...' },
    hw_pc_components: { tr: '💻 PC Bileşenleri', en: '💻 PC Components' },
    hw_peripherals: { tr: '🎮 Çevre Birimleri', en: '🎮 Peripherals' },
    hw_console_other: { tr: '🕹️ Konsol & Diğer', en: '🕹️ Console & Other' },

    // —— Messages Page ——
    msg_friends: { tr: 'Arkadaşlar', en: 'Friends' },
    msg_chats: { tr: 'Sohbetler', en: 'Chats' },
    msg_requests: { tr: 'İstekler', en: 'Requests' },
    msg_search: { tr: 'Ara...', en: 'Search...' },
    msg_type: { tr: 'Mesaj yaz...', en: 'Type a message...' },
    msg_accept: { tr: 'Kabul Et', en: 'Accept' },
    msg_reject: { tr: 'Reddet', en: 'Reject' },
    msg_duo_list: { tr: 'DUO LİST', en: 'DUO LIST' },
    msg_active_friends: { tr: 'AKTİF ARKADAŞLAR', en: 'ACTIVE FRIENDS' },
    msg_my_friends: { tr: 'ARKADAŞLARIM', en: 'MY FRIENDS' },
    msg_incoming_requests: { tr: 'Gelen İstekler', en: 'Incoming Requests' },
    msg_sent_requests: { tr: 'Gönderilen İstekler', en: 'Sent Requests' },
    msg_suggested_players: { tr: 'ÖNERİLEN OYUNCULAR', en: 'SUGGESTED PLAYERS' },
    msg_select_contact: { tr: 'Bir kişi seçin', en: 'Select a person' },
    msg_start_chat: { tr: 'Sohbet başlatmak için bir kişi seçin', en: 'Select a person to start a chat' },
    msg_block_user: { tr: 'Kullanıcıyı Engelle', en: 'Block User' },
    msg_report_user: { tr: 'Kullanıcıyı Bildir', en: 'Report User' },
    msg_requests_title: { tr: 'İSTEKLER', en: 'REQUESTS' },

    // —— Competition Page ——
    comp_title: { tr: 'Yarışma Ekranı', en: 'Competition' },
    comp_ranking: { tr: 'Sıralama Tablosu', en: 'Ranking Board' },
    comp_daily_live: { tr: 'GÜNLÜK CANLI YARIŞMA', en: 'DAILY LIVE COMPETITION' },
    comp_grand_prize: { tr: 'BÜYÜK ÖDÜLÜ', en: 'GRAND PRIZE' },
    comp_ready_to_win: { tr: 'KAZANMAYA HAZIR MISIN?', en: 'ARE YOU READY TO WIN?' },
    comp_join_battle: { tr: '⚔️ SAVAŞA KATIL', en: '⚔️ JOIN THE BATTLE' },
    comp_time_left: { tr: 'KALAN SÜRE', en: 'TIME LEFT' },
    comp_daily_challenges: { tr: 'DAILY CHALLENGES', en: 'DAILY CHALLENGES' },
    comp_today: { tr: 'Bugün', en: 'Today' },
    comp_leaderboard: { tr: 'LİDERLİK TABLOSU', en: 'LEADERBOARD' },
    comp_you: { tr: '(SEN)', en: '(YOU)' },
    comp_won_grand_prize: { tr: 'BÜYÜK ÖDÜLÜ KAZANDIN!', en: 'YOU WON THE GRAND PRIZE!' },
    comp_total_earnings: { tr: 'Toplam Kazanç', en: 'Total Earnings' },
    comp_collect_reward: { tr: 'Ödülü Al & Çık', en: 'Collect & Exit' },
    comp_time_label: { tr: 'Süre', en: 'Time' },
    comp_congrats: { tr: 'TEBRİKLER!', en: 'CONGRATS!' },
    comp_trivia_arena: { tr: 'TRIVIA ARENA', en: 'TRIVIA ARENA' },
    comp_question_loading: { tr: 'Soru Yükleniyor...', en: 'Loading Question...' },
    comp_correct: { tr: 'DOĞRU!', en: 'CORRECT!' },
    comp_wrong: { tr: 'MAALESEF!', en: 'WRONG!' },
    comp_time_up: { tr: 'SÜRE DOLDU!', en: 'TIME UP!' },
    comp_completed: { tr: 'COMPLETED ✅', en: 'COMPLETED ✅' },
    comp_this_weeks_rewards: { tr: 'Bu Haftanın Ödülleri', en: "This Week's Rewards" },
    comp_neon_frame: { tr: 'Neon Çerçeve', en: 'Neon Frame' },
    comp_legendary_badge: { tr: 'Efsane Rozet', en: 'Legendary Badge' },

    // â”€â”€ Matches Page â”€â”€
    match_title: { tr: 'Duo Eşleşmelerim', en: 'My Duo Matches' },
    match_search: { tr: 'Duo Ara...', en: 'Search Duo...' },
    match_duo_perf: { tr: 'Duo Performansı', en: 'Duo Performance' },
    match_win_rate: { tr: 'Galibiyet Oranı', en: 'Win Rate' },
    match_kd_ratio: { tr: 'K/D Oranı', en: 'K/D Ratio' },
    match_win_streak: { tr: 'Seri Galibiyet', en: 'Win Streak' },
    match_total_duo: { tr: 'Toplam Duo', en: 'Total Duos' },
    match_hours_played: { tr: 'Saat Oynadın', en: 'Hours Played' },
    match_custom_duos: { tr: 'Sana Özel Duo\'lar ⚡', en: 'Duos for You ⚡' },
    match_battle_log: { tr: 'Savaş Günlüğü', en: 'Battle Log' },
    match_filter: { tr: 'Filtre', en: 'Filter' },
    match_victory: { tr: 'GALİBİYET', en: 'VICTORY' },
    match_defeat: { tr: 'BOZGUN', en: 'DEFEAT' },
    match_loading: { tr: 'Yükleniyor...', en: 'Loading...' },
    match_duo_request: { tr: 'Duo İsteği 📩', en: 'Duo Request 📩' },
    match_request_sent: { tr: 'Gönderildi âœ“', en: 'Sent âœ“' },
    match_rank_low: { tr: 'Silver — Platinum Arası', en: 'Silver — Platinum Range' },
    match_rank_high: { tr: 'Diamond — Radiant Arası', en: 'Diamond — Radiant Range' },
    match_rank_mixed: { tr: 'Karışık Öneriler', en: 'Mixed Suggestions' },
    match_apply: { tr: 'Uygula', en: 'Apply' },
    match_filter_game: { tr: 'Oyun', en: 'Game' },
    match_filter_rank: { tr: 'Rank', en: 'Rank' },
    match_filter_mic: { tr: 'Mikrofon', en: 'Microphone' },

    // â”€â”€ Avatar Quick Menu â”€â”€
    aqm_profile: { tr: 'Profilim', en: 'My Profile' },
    aqm_settings: { tr: 'Hesap Ayarları', en: 'Account Settings' },
    aqm_logout: { tr: 'Çıkış Yap', en: 'Logout' },

    // â”€â”€ Toasts / Alerts â”€â”€
    toast_saved: { tr: 'Değişiklikler başarıyla kaydedildi aga!', en: 'Changes saved successfully!' },
    toast_pw_changed: { tr: 'Şifre başarıyla değiştirildi!', en: 'Password changed successfully!' },
    toast_pw_wrong: { tr: 'Mevcut şifre yanlış!', en: 'Current password is incorrect!' },
    toast_pw_short: { tr: 'Yeni şifre en az 6 karakter olmalı!', en: 'New password must be at least 6 characters!' },
    toast_pw_mismatch: { tr: 'Yeni şifreler eşleşmiyor!', en: 'New passwords do not match!' },
    toast_fb_sent: { tr: 'Öneriniz başarıyla gönderildi, teşekkürler!', en: 'Your feedback was sent successfully, thanks!' },
    toast_report_sent: { tr: 'Raporunuz başarıyla gönderildi!', en: 'Your report was sent successfully!' },
    toast_delete_confirm: { tr: "Tüm verilerin ve 'Duo'ların silinecek, emin misin?", en: "All your data and Duos will be deleted. Are you sure?" },

    // â”€â”€ Login Error Messages â”€â”€
    login_err_both: { tr: 'Lütfen e-posta/kullanıcı adı ve şifre giriniz.', en: 'Please enter email/username and password.' },
    login_err_email: { tr: 'Lütfen e-posta veya kullanıcı adınızı giriniz.', en: 'Please enter your email or username.' },
    login_err_pw: { tr: 'Lütfen şifrenizi giriniz.', en: 'Please enter your password.' },
    login_err_not_found: { tr: 'Hesap bulunamadı, lütfen kayıt olun.', en: 'Account not found, please register.' },
    login_err_invalid: { tr: 'Geçersiz e-posta/kullanıcı adı veya şifre!', en: 'Invalid email/username or password!' },

    // â”€â”€ Placeholders â”€â”€
    ph_username: { tr: 'Kullanıcı adını gir', en: 'Enter your username' },
    ph_email: { tr: 'ornek@mail.com', en: 'example@mail.com' },
    ph_email_or_username: { tr: 'E-posta veya kullanıcı adı', en: 'Email or username' },
    ph_bio: { tr: 'Hakkında kısaca yaz...', en: 'Write about yourself...' },
    ph_riot: { tr: 'Oyuncu#TR1', en: 'Player#TR1' },
    ph_discord: { tr: 'oyuncu#1234', en: 'player#1234' },
    ph_steam: { tr: 'https://steamcommunity.com/id/...', en: 'https://steamcommunity.com/id/...' },
    ph_current_pw: { tr: 'Şu anki şifreniz', en: 'Your current password' },
    ph_new_pw: { tr: 'Yeni şifre', en: 'New password' },
    ph_confirm_pw: { tr: 'Yeni şifreyi tekrar girin', en: 'Confirm new password' },
    ph_fb_title: { tr: 'Önerinizi kısaca özetleyin...', en: 'Summarize your suggestion...' },
    ph_fb_desc: { tr: 'Fikrinizi detaylı anlatın...', en: 'Describe your idea in detail...' },
    ph_report_user: { tr: 'Rapor edilecek kullanıcı...', en: 'Username to report...' },
    ph_report_desc: { tr: 'Detayları yazın...', en: 'Write the details...' },
    ph_search_player: { tr: 'Oyuncu Bul...', en: 'Find Player...' },

    // â”€â”€ Splash Screen â”€â”€
    splash_loading: { tr: 'İstiklal Core Yükleniyor...', en: 'İstiklal Core Loading...' },
    splash_text_1: { tr: 'Match-Engine Kalibre Ediliyor...', en: 'Calibrating Match-Engine...' },
    splash_text_2: { tr: 'En İyi Duo\'lar Taranıyor...', en: 'Scanning Best Duos...' },
    splash_text_3: { tr: 'Oyuncu Verileri Senkronize Ediliyor...', en: 'Syncing Player Data...' },
    splash_text_4: { tr: 'İstiklal Ağı Hazırlanıyor...', en: 'Preparing İstiklal Network...' },
    splash_text_5: { tr: 'Duo-Radar Başlatılıyor...', en: 'Launching Duo-Radar...' },

    // â”€â”€ Bottom Nav â”€â”€
    btm_panel: { tr: 'PANEL', en: 'DASHBOARD' },
    btm_matches: { tr: 'EŞLEŞMELER', en: 'MATCHES' },
    btm_compete: { tr: 'REKABET', en: 'COMPETE' },
    btm_messages: { tr: 'MESAJLAR', en: 'MESSAGES' },
    btm_support: { tr: 'DESTEK', en: 'SUPPORT' },

    // â”€â”€ Lobby System â”€â”€
    lobby_title: { tr: 'Lobi Sistemi', en: 'Lobby System' },
    lobby_tab_create: { tr: 'Lobi Oluştur', en: 'Create Lobby' },
    lobby_tab_join: { tr: 'Lobiye Katıl', en: 'Join Lobby' },
    lobby_tab_browse: { tr: 'Lobiler', en: 'Browse Lobbies' },

    // â”€â”€ Split-Screen Auth Pages â”€â”€
    go_back: { tr: 'Geri Dön', en: 'Go Back' },
    login_welcome: { tr: 'Hoş Geldin!', en: 'Welcome!' },
    login_welcome_sub: { tr: 'Hesabına giriş yap ve oyun dünyasına adım at.', en: 'Please login to your account.' },
    login_page_title: { tr: 'İstiklal | Giriş Yap', en: 'İstiklal | Login' },
    reg_page_title: { tr: 'İstiklal | Kayıt Ol', en: 'İstiklal | Register' },
    brand_login_title_1: { tr: 'Yeteneklerini', en: 'Improve Your' },
    brand_login_title_2: { tr: 'Geliştir,', en: 'Skills,' },
    brand_login_highlight: { tr: 'İstiklal', en: 'İstiklal' },
    brand_login_title_3: { tr: 'ile', en: 'with' },
    brand_login_desc: { tr: 'Uzman oyuncularla eşleş, takım arkadaşlarını bul ve <strong>rekabetçi oyun deneyimini</strong> bir üst seviyeye taşı. Ücretsiz eşleşme platformu.', en: 'Match with expert players, find teammates, and take your <strong>competitive gaming experience</strong> to the next level. Free matching platform.' },
    brand_rotating_1: { tr: 'Seviyene uygun <strong>duo partnerini</strong> saniyeler içinde bul, birlikte zirveye çık.', en: 'Find your <strong>duo partner</strong> matching your level in seconds, rise to the top together.' },
    brand_rotating_2: { tr: 'Rankını yükselt, <strong>stratejik takım arkadaşlarınla</strong> sahaya hükmet.', en: 'Increase your rank, dominate the arena with your <strong>strategic teammates</strong>.' },
    brand_rotating_3: { tr: '<strong>Güvenilir oyuncularla</strong> anında eşleş, toksik ortamlardan kurtul.', en: 'Match instantly with <strong>reliable players</strong>, escape toxic environments.' },
    brand_rotating_4: { tr: 'Oyun tarzına uygun <strong>mükemmel takım arkadaşını</strong> keşfet, birlikte kazan.', en: 'Discover the <strong>perfect teammate</strong> matching your playstyle, win together.' },
    brand_reg_title_1: { tr: 'Yeni Nesil', en: 'Next-Gen' },
    brand_reg_highlight: { tr: 'Eşleşme', en: 'Matching' },
    brand_reg_title_2: { tr: 'Deneyimi', en: 'Experience' },
    brand_reg_desc: { tr: 'Rekabetçi oyun dünyasında <strong>mükemmel takım arkadaşını</strong> bul. Ücretsiz kayıt ol, hemen eşleşmeye başla.', en: 'Find the <strong>perfect teammate</strong> in the competitive gaming world. Register for free and start matching now.' },
    reg_title_heading: { tr: 'Hesap Oluştur', en: 'Create Account' },
    reg_join_sub: { tr: 'Yeni nesil eşleşme deneyimine katıl.', en: 'Join the next-gen matching experience.' },
    agree_section_title: { tr: 'Sözleşme Onayı', en: 'Agreement Consent' },
    agree_select_all: { tr: 'Tümünü kabul ediyorum', en: 'I accept all' },
    agree_terms: { tr: "Kullanım Koşulları'nı okudum ve kabul ediyorum.", en: 'I have read and accept the Terms of Service.' },
    agree_privacy: { tr: "Gizlilik Politikası'nı okudum ve kabul ediyorum.", en: 'I have read and accept the Privacy Policy.' },
    agree_kvkk: { tr: "KVKK Aydınlatma Metni'ni okudum, onaylıyorum.", en: 'I have read and approve the KVKK Disclosure.' },
    agree_cookie: { tr: "Çerez Politikası'nı kabul ediyorum.", en: 'I accept the Cookie Policy.' },
    agree_terms_link: { tr: 'Kullanım Koşulları', en: 'Terms of Service' },
    agree_privacy_link: { tr: 'Gizlilik Politikası', en: 'Privacy Policy' },
    agree_kvkk_link: { tr: 'KVKK Aydınlatma Metni', en: 'KVKK Disclosure' },
    agree_cookie_link: { tr: 'Çerez Politikası', en: 'Cookie Policy' },
    agree_error_msg: { tr: 'Devam edebilmek için tüm sözleşmeleri onaylamanız gerekmektedir.', en: 'You must accept all agreements to proceed.' },
    reg_sending_code: { tr: 'Doğrulama Kodu Gönderiliyor...', en: 'Sending Verification Code...' },
    reg_registering: { tr: 'Kayıt Ediliyor...', en: 'Registering...' },
    footer_copyright: { tr: 'Â© 2026 İstiklal. Tüm hakları saklıdır.', en: 'Â© 2026 İstiklal. All rights reserved.' },
    guest_access_btn: { tr: 'Misafir Olarak Devam Et', en: 'Continue as Guest' },
    login_or_guest: { tr: 'veya', en: 'or' },
    forgot_password_setup: { tr: 'Şifre Ayarla veya Sıfırla', en: 'Setup or Reset Password' },

    // â”€â”€ Footer Links â”€â”€
    footer_faq: { tr: 'SSS', en: 'FAQ' },
    footer_privacy: { tr: 'Gizlilik', en: 'Privacy' },
    footer_terms: { tr: 'Koşullar', en: 'Terms' },
    footer_cookie: { tr: 'Çerez', en: 'Cookie' },
    footer_kvkk: { tr: 'KVKK', en: 'KVKK' },
    footer_contact: { tr: 'İletişim', en: 'Contact' },
    lang_hint_text: { tr: 'Türkçe (Turkish)', en: 'English (İngilizce)' },

    // â”€â”€ Verify Modal â”€â”€
    verify_confirm_btn: { tr: 'Doğrula & Kayıt Ol', en: 'Verify & Register' },
    verify_resend_prefix: { tr: 'Tekrar Gönder', en: 'Resend' },
    verify_cancel: { tr: 'İptal', en: 'Cancel' },
    verify_enter_code: { tr: 'E-posta adresinize gönderilen', en: 'Enter the' },
    verify_6digit: { tr: '6 haneli kodu', en: '6-digit code' },
    verify_suffix: { tr: 'giriniz.', en: 'sent to your email.' },

    // â”€â”€ Legal Modal Titles â”€â”€
    legal_privacy_title: { tr: 'Gizlilik Politikası', en: 'Privacy Policy' },
    legal_terms_title: { tr: 'Kullanım Koşulları', en: 'Terms of Service' },
    legal_cookie_title: { tr: 'Çerez Politikası', en: 'Cookie Policy' },
    legal_kvkk_title: { tr: 'KVKK Aydınlatma Metni', en: 'KVKK Disclosure' },

    // â”€â”€ Register error messages â”€â”€
    reg_err_field_prefix: { tr: 'Lütfen', en: 'Please fill in the' },
    reg_err_field_suffix: { tr: 'alanını doldurunuz.', en: 'field.' },
    reg_err_pw_mismatch: { tr: 'Şifreler eşleşmiyor.', en: 'Passwords do not match.' },
    reg_err_email_exists: { tr: 'Bu e-posta adresi zaten kayıtlı!', en: 'This email is already registered!' },
    reg_err_send_fail: { tr: 'E-posta gönderilemedi. Lütfen tekrar deneyin.', en: 'Failed to send email. Please try again.' },
    verify_err_incomplete: { tr: 'Lütfen 6 haneli kodu eksiksiz giriniz.', en: 'Please enter the complete 6-digit code.' },
    verify_err_wrong: { tr: 'Yanlış kod, lütfen tekrar kontrol ediniz.', en: 'Wrong code, please check again.' },
    verify_resend_fail: { tr: 'Tekrar gönderilemedi:', en: 'Failed to resend:' },

    // â”€â”€ Agreement Accordion â”€â”€
    accord_read_btn: { tr: 'Oku', en: 'Read' },
    accord_close_btn: { tr: 'Kapat', en: 'Close' },
    accord_terms_text: { tr: "Kullanım Koşulları'nı okudum ve kabul ediyorum.", en: 'I have read and accept the Terms of Service.' },
    accord_privacy_text: { tr: "Gizlilik Politikası'nı okudum ve kabul ediyorum.", en: 'I have read and accept the Privacy Policy.' },
    accord_kvkk_text: { tr: "KVKK Aydınlatma Metni'ni okudum, onaylıyorum.", en: 'I have read and approve the KVKK Disclosure.' },
    accord_cookie_text: { tr: "Çerez Politikası'nı kabul ediyorum.", en: 'I accept the Cookie Policy.' },
    accord_terms_header: { tr: 'Kullanım Koşulları', en: 'Terms of Service' },
    accord_privacy_header: { tr: 'Gizlilik Politikası', en: 'Privacy Policy' },
    accord_kvkk_header: { tr: 'KVKK Aydınlatma Metni', en: 'KVKK Disclosure' },
    accord_cookie_header: { tr: 'Çerez Politikası', en: 'Cookie Policy' },
    accord_terms_body_title: { tr: 'İstiklal Genel Kullanım Koşulları', en: 'İstiklal General Terms of Service' },
    accord_terms_body_intro: { tr: 'İstiklal hizmetlerine erişerek aşağıdaki kuralları kabul etmiş sayılırsınız:', en: 'By accessing İstiklal services, you agree to the following rules:' },
    accord_terms_rule_1: { tr: 'Platform üzerinde diğer kullanıcılara karşı saygılı ve adil olmak.', en: 'Be respectful and fair to other users on the platform.' },
    accord_terms_rule_2: { tr: 'Hile, üçüncü parti yazılım veya manipülatif bot kullanımının kalıcı yasaklanma sebebi olduğunu bilmek.', en: 'Understand that using cheats, third-party software, or manipulative bots will result in a permanent ban.' },
    accord_terms_rule_3: { tr: 'Toksik davranışlar ve hakaret içerikli mesajların sistem tarafından otomatik olarak filtrelendiğini kabul etmek.', en: 'Accept that toxic behavior and abusive messages are automatically filtered by the system.' },
    accord_terms_body_footer: { tr: 'Platform yönetimi kural ihlallerinde önceden haber vermeksizin hesapları kapatma hakkını saklı tutar.', en: 'Platform management reserves the right to close accounts without prior notice in case of rule violations.' },
    accord_privacy_body_title: { tr: 'İstiklal Gizlilik Politikası', en: 'İstiklal Privacy Policy' },
    accord_privacy_body_date: { tr: 'Son güncellenme: 14 Eylül 2026', en: 'Last updated: September 14, 2026' },
    accord_privacy_body_p1: { tr: 'İstiklal olarak kişisel verilerinize son derece önem veriyoruz. Sistemimizde toplanan veriler yalnızca oyuncu eşleştirmelerini daha isabetli gerçekleştirmek ve size daha iyi bir deneyim sunmak amacıyla kullanılmaktadır.', en: 'At İstiklal, we take your personal data very seriously. The data collected in our system is used solely to make player matches more accurate and to provide you with a better experience.' },
    accord_privacy_body_p2: { tr: 'Oyun içi istatistikleriniz ve oynama süreleriniz herkese açık olarak profilinizde sergilenmekte olup, mesajlaşma verileriniz uçtan uca şifreleme ile korunmaktadır.', en: 'Your in-game statistics and play times are publicly displayed on your profile, while your messaging data is protected with end-to-end encryption.' },
    accord_kvkk_body_title: { tr: '6698 Sayılı KVKK Çerçevesinde Aydınlatma Metni', en: 'Disclosure Text Under Law No. 6698 (KVKK)' },
    accord_kvkk_body_p1: { tr: "Veri Sorumlusu sıfatıyla İstiklal A.Ş., toplanan bilgilerinizi KVKK'nın 5. ve 6. maddelerine uygun olarak işlemektedir.", en: 'As the Data Controller, İstiklal Inc. processes your collected information in accordance with Articles 5 and 6 of the KVKK.' },
    accord_kvkk_body_p2: { tr: 'Detaylı talep ve itirazlarınızı "destek@duofinder.com" adresine iletebilirsiniz.', en: 'You can submit your detailed requests and objections to "destek@duofinder.com".' },
    accord_cookie_body_title: { tr: 'Çerez (Cookie) Kullanımı', en: 'Cookie Usage' },
    accord_cookie_body_p1: { tr: 'Platformumuzun temel işlevlerini sağlamak ve güvenliği sağlamak için zaruri çerezler kullanılmaktadır.', en: 'Essential cookies are used to provide the core functionality of our platform and ensure security.' },
    accord_cookie_body_p2: { tr: 'Sitemizde reklam çerezleri veya üçüncü taraf izleme çerezleri bulundurmamaktayız.', en: 'We do not use advertising cookies or third-party tracking cookies on our site.' },

    // â”€â”€ Admin Panel â”€â”€
    admin_title: { tr: 'Yönetim Paneli', en: 'Admin Panel' },
    admin_command_center: { tr: 'Komuta Merkezi', en: 'Command Center' },
    admin_user_mgmt: { tr: 'Kullanıcı Yönetimi', en: 'User Management' },
    admin_analytics: { tr: 'Platform Analitik', en: 'Platform Analytics' },
    admin_lobby_mgmt: { tr: 'Lobi Yönetimi', en: 'Lobby Management' },
    admin_reports: { tr: 'Raporlar & Moderasyon', en: 'Reports & Moderation' },
    admin_announcements: { tr: 'Duyurular', en: 'Announcements' },
    admin_platform_settings: { tr: 'Platform Ayarları', en: 'Platform Settings' },
    admin_total_users: { tr: 'Toplam Kullanıcı', en: 'Total Users' },
    admin_active_lobbies: { tr: 'Aktif Lobiler', en: 'Active Lobbies' },
    admin_online_now: { tr: 'Çevrimiçi', en: 'Online Now' },
    admin_pending_reports: { tr: 'Bekleyen Raporlar', en: 'Pending Reports' },
    admin_search_users: { tr: 'Kullanıcı ara...', en: 'Search users...' },
    admin_username: { tr: 'Kullanıcı Adı', en: 'Username' },
    admin_email: { tr: 'E-posta', en: 'Email' },
    admin_role: { tr: 'Rol', en: 'Role' },
    admin_status: { tr: 'Durum', en: 'Status' },
    admin_actions: { tr: 'İşlemler', en: 'Actions' },
    admin_ban: { tr: 'Yasakla', en: 'Ban' },
    admin_unban: { tr: 'Yasağı Kaldır', en: 'Unban' },
    admin_delete: { tr: 'Sil', en: 'Delete' },
    admin_view: { tr: 'Görüntüle', en: 'View' },
    admin_active: { tr: 'Aktif', en: 'Active' },
    admin_banned: { tr: 'Yasaklı', en: 'Banned' },
    admin_founder: { tr: 'Kurucu', en: 'Founder' },
    admin_moderator: { tr: 'Moderatör', en: 'Moderator' },
    admin_user: { tr: 'Kullanıcı', en: 'User' },
    admin_game_popularity: { tr: 'Oyun Popülerliği', en: 'Game Popularity' },
    admin_region_dist: { tr: 'Bölge Dağılımı', en: 'Region Distribution' },
    admin_recent_regs: { tr: 'Son Kayıtlar', en: 'Recent Registrations' },
    admin_report_category: { tr: 'Kategori', en: 'Category' },
    admin_reported_user: { tr: 'Raporlanan', en: 'Reported' },
    admin_reporter: { tr: 'Raporlayan', en: 'Reporter' },
    admin_report_date: { tr: 'Tarih', en: 'Date' },
    admin_report_desc: { tr: 'Açıklama', en: 'Description' },
    admin_dismiss: { tr: 'Reddet', en: 'Dismiss' },
    admin_warn: { tr: 'Uyar', en: 'Warn' },
    admin_announce_title: { tr: 'Duyuru Başlığı', en: 'Announcement Title' },
    admin_announce_body: { tr: 'Duyuru İçeriği', en: 'Announcement Body' },
    admin_announce_type: { tr: 'Tür', en: 'Type' },
    admin_announce_send: { tr: 'Yayınla', en: 'Publish' },
    admin_ticker_mgmt: { tr: 'Ticker Mesajları', en: 'Ticker Messages' },
    admin_add_ticker: { tr: 'Ticker Ekle', en: 'Add Ticker' },
    admin_maintenance_mode: { tr: 'Bakım Modu', en: 'Maintenance Mode' },
    admin_feature_flags: { tr: 'Özellik Anahtarları', en: 'Feature Flags' },
    admin_platform_uptime: { tr: 'Platform Süresi', en: 'Platform Uptime' },
    admin_back_dashboard: { tr: 'Panele Dön', en: 'Back to Dashboard' },
    admin_no_reports: { tr: 'Bekleyen rapor yok', en: 'No pending reports' },
    admin_no_users: { tr: 'Kullanıcı bulunamadı', en: 'No users found' },
    admin_audit_log: { tr: 'Denetim Kaydı', en: 'Audit Log' },

    // â”€â”€ CAPTCHA â”€â”€
    login_err_captcha: { tr: 'Lütfen robot olmadığınızı doğrulayın.', en: 'Please verify that you are not a robot.' },
    captcha_label: { tr: 'Robot olmadığımı doğrula', en: 'Verify you are not a robot' },
    captcha_instruction: { tr: 'Kaydırıcıyı sağa sürükle', en: 'Slide to the right' },
    captcha_success: { tr: 'Doğrulandı!', en: 'Verified!' },
    captcha_failed: { tr: 'Tekrar dene', en: 'Try again' },
    captcha_shield: { tr: 'İstiklal Shield', en: 'İstiklal Shield' },
    captcha_protected: { tr: 'Güvenli Doğrulama', en: 'Secure Verification' }
  };

  // Expose for other scripts
  window.I18N_DICT = DICT;

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  //  CORE ENGINE
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  function getLang() {
    try { return localStorage.getItem(LANG_KEY) || 'tr'; } catch (e) { return 'tr'; }
  }

  function setLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { }
  }

  function t(key) {
    var lang = getLang();
    if (DICT[key]) return DICT[key][lang] || DICT[key].tr || key;
    return key;
  }
  window.t = t;
  window.getLang = getLang;

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  //  DOM UPDATER — scans data-i18n elements
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  function updateDOM() {
    var lang = getLang();

    // 1. Update elements with data-i18n (text content)
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (DICT[key]) {
        els[i].textContent = DICT[key][lang] || DICT[key].tr;
      }
    }

    // 2. Update elements with data-i18n-placeholder
    var phs = document.querySelectorAll('[data-i18n-ph]');
    for (var j = 0; j < phs.length; j++) {
      var phKey = phs[j].getAttribute('data-i18n-ph');
      if (DICT[phKey]) {
        phs[j].setAttribute('placeholder', DICT[phKey][lang] || DICT[phKey].tr);
      }
    }

    // 3. Update elements with data-i18n-title (title attribute)
    var titles = document.querySelectorAll('[data-i18n-title]');
    for (var t2 = 0; t2 < titles.length; t2++) {
      var tKey = titles[t2].getAttribute('data-i18n-title');
      if (DICT[tKey]) {
        titles[t2].setAttribute('title', DICT[tKey][lang] || DICT[tKey].tr);
      }
    }

    // 4. Update mobile-nav injected sidebar links
    updateSidebarLabels(lang);

    // 5. Update toggle UI
    updateLangToggleUI();

    // 6. Re-render Smart Match card (if present)
    if (typeof window.renderSmartMatchCard === 'function') {
      window.renderSmartMatchCard();
    }
  }
  window.updateI18nDOM = updateDOM;

  // â”€â”€ Update mobile-nav sidebar link labels â”€â”€
  function updateSidebarLabels(lang) {
    var sidebarLinks = document.querySelectorAll('#sidebar nav a, #sidebar nav button');
    var labelMap = {
      'Panel': { tr: 'Panel', en: 'Dashboard' },
      'Dashboard': { tr: 'Panel', en: 'Dashboard' },
      'Eşleşmeler': { tr: 'Eşleşmeler', en: 'Matches' },
      'Matches': { tr: 'Eşleşmeler', en: 'Matches' },
      'Rekabet': { tr: 'Rekabet', en: 'Compete' },
      'Compete': { tr: 'Rekabet', en: 'Compete' },
      'Mesajlar': { tr: 'Mesajlar', en: 'Messages' },
      'Messages': { tr: 'Mesajlar', en: 'Messages' },
      'Destek': { tr: 'Destek', en: 'Support' },
      'Support': { tr: 'Destek', en: 'Support' },
      'Profil': { tr: 'Profil', en: 'Profile' },
      'Profile': { tr: 'Profil', en: 'Profile' },
      'Ayarlar': { tr: 'Ayarlar', en: 'Settings' },
      'Settings': { tr: 'Ayarlar', en: 'Settings' },
      'Rapor Bildir': { tr: 'Rapor Bildir', en: 'Report' },
      'Report': { tr: 'Rapor Bildir', en: 'Report' },
      'İstek & Öneri': { tr: 'İstek & Öneri', en: 'Feedback' },
      'Feedback': { tr: 'İstek & Öneri', en: 'Feedback' },
      'Çıkış Yap': { tr: 'Çıkış Yap', en: 'Logout' },
      'Logout': { tr: 'Çıkış Yap', en: 'Logout' },
      'SSS': { tr: 'SSS', en: 'FAQ' },
      'FAQ': { tr: 'SSS', en: 'FAQ' }
    };

    for (var i = 0; i < sidebarLinks.length; i++) {
      var spans = sidebarLinks[i].querySelectorAll('span:not(.material-symbols-outlined):not(.online-dot)');
      for (var s = 0; s < spans.length; s++) {
        var txt = spans[s].textContent.trim();
        if (labelMap[txt]) {
          spans[s].textContent = labelMap[txt][lang];
        }
      }
    }

    // Update theme toggle label
    var themeLabel = document.getElementById('theme-toggle-label');
    if (themeLabel) {
      var icon = themeLabel.querySelector('.material-symbols-outlined');
      var iconHTML = icon ? icon.outerHTML : '';
      themeLabel.innerHTML = iconHTML + (lang === 'en' ? 'THEME' : 'GÖRÜNÜM');
    }
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  //  INJECT CSS
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  var css = document.createElement('style');
  css.id = 'i18n-css';
  css.textContent = [
    '#lang-toggle-row{display:flex;align-items:center;justify-content:space-between;padding:0.65rem 1rem;margin:0 0.75rem 0.25rem;border-radius:0.75rem;background:rgba(0,242,255,0.04);border:1px solid rgba(0,242,255,0.08);cursor:pointer;transition:all 0.2s ease;}',
    '#lang-toggle-row:hover{background:rgba(0,242,255,0.08);}',
    'body.light-mode #lang-toggle-row{background:rgba(26,26,46,0.04);border-color:rgba(26,26,46,0.1);}',
    'body.light-mode #lang-toggle-row:hover{background:rgba(26,26,46,0.08);}',
    '#lang-toggle-label{font-family:"Space Grotesk",sans-serif;font-weight:600;font-size:0.72rem;letter-spacing:0.08em;color:#849495;display:flex;align-items:center;gap:6px;}',
    'body.light-mode #lang-toggle-label{color:#2D3436;}',
    '#lang-toggle-pills{display:flex;gap:2px;background:rgba(58,73,75,0.3);border-radius:8px;padding:2px;flex-shrink:0;}',
    '.lang-pill{padding:3px 10px;border-radius:6px;font-family:"Space Grotesk",sans-serif;font-size:11px;font-weight:700;letter-spacing:0.06em;color:#849495;transition:all 0.2s ease;cursor:pointer;}',
    '.lang-pill.active{background:rgba(0,242,255,0.2);color:#00f2ff;box-shadow:0 0 8px rgba(0,242,255,0.15);}',
    'body.light-mode .lang-pill.active{background:rgba(26,26,46,0.12);color:#1A1A2E;box-shadow:none;}',
    'body.light-mode #lang-toggle-pills{background:rgba(0,0,0,0.06);}',
    /* Login page selector */
    '#login-lang-selector{position:fixed;top:1.25rem;right:1.25rem;z-index:100;display:flex;gap:2px;background:rgba(17,19,24,0.7);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(0,242,255,0.15);border-radius:10px;padding:3px;}',
    'body.light-mode #login-lang-selector{background:rgba(255,255,255,0.85);border-color:rgba(26,26,46,0.12);}',
    '.login-lang-btn{padding:4px 14px;border-radius:7px;font-family:"Space Grotesk",sans-serif;font-size:12px;font-weight:700;color:#849495;cursor:pointer;transition:all 0.2s ease;border:none;background:none;}',
    '.login-lang-btn.active{background:rgba(0,242,255,0.2);color:#00f2ff;}',
    'body.light-mode .login-lang-btn.active{background:rgba(26,26,46,0.12);color:#1A1A2E;}'
  ].join('\n');
  document.head.appendChild(css);

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  //  INIT SIDEBAR LANGUAGE TOGGLE (Now in Header)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  function initLangToggle() {
    var langRow = document.getElementById('lang-toggle-row');
    if (!langRow) return;

    if (!langRow.dataset.initialized) {
      langRow.addEventListener('click', function (e) {
        var pill = e.target.closest('.lang-pill');
        if (!pill) return;
        var newLang = pill.getAttribute('data-lang');
        setLang(newLang);
        updateDOM();
      });
      langRow.dataset.initialized = 'true';
    }
  }

  function updateLangToggleUI() {
    var pills = document.querySelectorAll('.lang-pill');
    var lang = getLang();
    for (var i = 0; i < pills.length; i++) {
      if (pills[i].getAttribute('data-lang') === lang) {
        pills[i].classList.add('active');
      } else {
        pills[i].classList.remove('active');
      }
    }
    var label = document.getElementById('lang-toggle-label');
    if (label) {
      var icon = label.querySelector('.material-symbols-outlined');
      var iconHTML = icon ? icon.outerHTML : '';
      label.innerHTML = iconHTML + (lang === 'en' ? 'LANGUAGE' : 'DİL');
    }
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  //  INJECT LOGIN PAGE SELECTOR (if on login/register page)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  function injectLoginLangSelector() {
    if (document.getElementById('login-lang-selector')) return;
    // Only inject on login/register pages (check URL)
    var path = window.location.pathname.toLowerCase();
    var isAuthPage = path.indexOf('giri') !== -1 || path.indexOf('login') !== -1 ||
      path.indexOf('kay') !== -1 || path.indexOf('register') !== -1;
    if (!isAuthPage) return;

    var lang = getLang();
    var selector = document.createElement('div');
    selector.id = 'login-lang-selector';
    selector.innerHTML =
      '<button class="login-lang-btn' + (lang === 'tr' ? ' active' : '') + '" data-lang="tr">TR</button>' +
      '<button class="login-lang-btn' + (lang === 'en' ? ' active' : '') + '" data-lang="en">EN</button>';
    document.body.appendChild(selector);

    selector.addEventListener('click', function (e) {
      var btn = e.target.closest('.login-lang-btn');
      if (!btn) return;
      var newLang = btn.getAttribute('data-lang');
      setLang(newLang);
      // Update buttons
      var btns = selector.querySelectorAll('.login-lang-btn');
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.toggle('active', btns[i].getAttribute('data-lang') === newLang);
      }
      updateDOM();
    });
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  //  INIT
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  function init() {
    initLangToggle();
    injectLoginLangSelector();
    updateDOM();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // â”€â”€ Expose for programmatic switching â”€â”€
  window.setLanguage = function (lang) {
    setLang(lang);
    updateDOM();
  };

})();




