$filePath = "js/modules/i18n.js"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Direct replacement of Turkish characters
$content = $content.Replace("Ä°", "İ")
$content = $content.Replace("Ä±", "ı")
$content = $content.Replace("Äž", "Ğ")
$content = $content.Replace("ÄŸ", "ğ")
$content = $content.Replace("Ã–", "Ö")
$content = $content.Replace("Ã¶", "ö")
$content = $content.Replace("Ã‡", "Ç")
$content = $content.Replace("Ã§", "ç")
$content = $content.Replace("Ãœ", "Ü")
$content = $content.Replace("Ã¼", "ü")
$content = $content.Replace("Ã¢", "â")
$content = $content.Replace("Ã®", "î")
$content = $content.Replace("Ã»", "û")
$content = $content.Replace("Åž", "Ş")
$content = $content.Replace("ÅŸ", "ş")
$content = $content.Replace("DİÄžER", "DİĞER")
$content = $content.Replace("ETKİNLİÄžİ", "ETKİNLİĞİ")
$content = $content.Replace("EÅžLEÅžME", "EŞLEŞME")

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
Write-Output "PowerShell TR Fix Completed."
