@echo off
echo Kurulum basliyor... Windows guvenlik uyarisi (Evet/Hayir) cikarsa lutfen EVET e tiklayin.
winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
echo.
echo Kurulum tamamlandi! Lutfen bu pencereyi kapatin ve bana haber verin.
pause
