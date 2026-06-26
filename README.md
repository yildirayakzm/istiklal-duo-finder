# 5. GitHub README Gereksinimleri

## 5.1. Proje Özeti
Bu uygulamanın amacı, oyuncuların yetenek seviyelerine ve oynadıkları oyunlara göre ideal takım arkadaşlarını (duo) bulmalarını, lobi kurmalarını ve diğer oyuncularla etkileşime geçmelerini sağlayan modern bir "Duo Finder & Lobi" platformu sunmaktır.
**Hedef kullanıcı kitlesi:** Valorant, CS2, League of Legends, Fortnite, GTA 5, PUBG, Apex Legends gibi rekabetçi ve popüler çok oyunculu oyunları oynayan oyunculardır.
**Çözmek istediği problem:** Tek başına (solo) oyun giren oyuncuların eşleştirme sistemlerinde rastgele ve toksik oyuncularla karşılaşma sorununu çözerek; iletişim kurabilecekleri, aynı dili konuşan, ortak rütbe (rank) ve rollere sahip oyuncuları filtreleyip bulmalarını sağlamaktır.

## 5.2. Kullanılan AI Araçları
Proje geliştirme sürecinde aşağıdaki yapay zeka araçları aktif olarak kullanılmıştır:
* **Kod üretimi ve Debugging:** Gemini 2.5 Flash / Pro (Google DeepMind Antigravity AI Asistanı üzerinden)
* **UI tasarımı ve Prototipleme:** Gemini AI Asistanı (Tailwind CSS ve Vanilla JS ile anlık kodlama)
* **Görsel/İçerik Yerleşim Planlaması:** AI destekli sayfa mimarisi kurgulama araçları.

## 5.3. Prompt Kütüphanesi
Geliştirme sürecinde kullanılan ve yapay zekayı yönlendiren başarılı prompt örnekleri şunlardır:

* **UI üretim promptları:** 
  - "Neon detaylara ve cam efekti (glassmorphism) tasarımına sahip karanlık temalı (dark mode) modern bir oyun dashboard paneli tasarla."
  - "Giriş yap ve kayıt ol ekranını akıcı animasyonlarla (fade-in-up) ve estetik bir arayüzle kodla."
* **Kod üretim promptları:** 
  - "Dashboard'daki lobi kartlarını filtrelemek için JavaScript yaz. 'Valorant', 'CS2' veya 'Tüm Lobiler' butonuna basıldığında ekrandaki lobiler anında filtrelensin."
  - "Klipler (Clips) sayfasındaki kalp ikonuna tıklandığında beğeni sayısını artıran ve tekrar tıklandığında geri alan toggle fonksiyonu oluştur."
* **Veri üretim promptları:** 
  - "Mockup (sahte) veriler içeren bir lobi listesi JSON'u hazırla. Her lobinin oluşturulma tarihi, oyuncu sayısı, aradığı rütbe (rank) ve oyun modu olsun."
* **İçerik üretim promptları:** 
  - "Espor ve oyuncu topluluğuna uygun, oyun içinde küfür/hile kullanımını yasaklayan detaylı ama okunabilir bir Kullanım Koşulları sözleşmesi yaz."

## 5.4. Kurulum ve Çalıştırma
Projeyi yerel (local) ortamda çalıştırmak için ek bir paket veya sunucu kurmanıza gerek yoktur (HTML/CSS/JS tabanlıdır). Çalıştırmak için şu adımları izleyebilirsiniz:

**Adım 1:** Proje klasörünü bilgisayarınıza indirin veya `git clone` ile çekin.
**Adım 2:** Klasör içerisine girin.
**Adım 3:** Tarayıcınızla çalıştırmak için:
```bash
# Sadece ana dizindeki veya bileşen klasöründeki HTML dosyasına çift tıklamanız yeterlidir.
# Örneğin:
components/giri_yap_login/code.html
```

*(Opsiyonel)* Eğer Live Server veya Python HTTP server ile çalıştırmak isterseniz:
```bash
# Terminal üzerinden:
python -m http.server 8000
# Ardından tarayıcınızda http://localhost:8000 adresine gidin.
```

## 5.5. Gelecek Vizyonu
Projenin gelecek sürümleri için hedeflenen vizyon:

* **Hangi AI özelliklerinin geliştirilebileceği:** 
  Gelecekte sisteme yapay zeka tabanlı "Akıllı Duo Eşleştirme" algoritması eklenebilir. Bu sistem, oyuncuların oyun geçmişlerini ve profil verilerini analiz ederek en yüksek kazanma oranına (win rate) sahip olabilecekleri kişileri otomatik eşleştirecektir.
* **Hangi kullanıcı problemlerinin çözülebileceği:** 
  Kullanıcıların beyan ettikleri rütbelerin (rank) doğruluğu problemi, oyunların resmi Tracker API'leri (örneğin Riot API) entegre edilerek çözülecektir. Böylece herkesin gerçek KDA ve rank istatistiği profilinde doğrulanmış olarak gözükecektir.
* **Ürünün nasıl ölçeklenebileceği:** 
  Ürün şu anda web tabanlı bir PWA/Dashboard olarak hizmet vermektedir. Gelecekte arka uç (Backend) tarafında Node.js + Socket.io ile anlık mesajlaşma/sesli sohbet (WebRTC) özelliği eklenecek ve React Native ile mobil uygulaması çıkartılarak platform bağımsız devasa bir oyuncu topluluğuna ölçeklenecektir.