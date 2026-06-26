@echo off
echo ========================================================
echo GITHUB OTOMATIK YUKLEME ARACI
echo ========================================================
echo.
echo Birazdan GitHub oturumunuzu acmaniz icin bir tarayici acilacak. 
echo Lutfen tarayicidan hesabiniza giris yapin ve yetki verin.
echo.
pause
gh auth login --web -h github.com

echo.
echo Git baslatiliyor ve dosyalar hazirlaniyor...
git init
git add .
git commit -m "Ilk yukleme: Proje ve README gereksinimleri eklendi"

echo.
echo 'istiklal-duo-finder' adinda bir depo (repository) olusturuluyor ve kodlar aktariliyor...
gh repo create istiklal-duo-finder --public --source=. --remote=origin --push

echo.
echo ========================================================
echo MUKEMMEL! Projeniz basariyla GitHub'a yuklendi.
echo ========================================================
pause
