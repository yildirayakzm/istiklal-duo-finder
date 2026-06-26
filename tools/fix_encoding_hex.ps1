$filePath = "js/modules/i18n.js"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Replacement pairs using hex values to prevent script encoding corruption
$replacements = @{
    # Turkish characters
    "$([char]0x00C4)$([char]0x00B0)" = "$([char]0x0130)" # Ä° -> İ
    "$([char]0x00C4)$([char]0x00B1)" = "$([char]0x0131)" # Ä± -> ı
    "$([char]0x00C4)$([char]0x009E)" = "$([char]0x011E)" # Äž -> Ğ
    "$([char]0x00C4)$([char]0x009F)" = "$([char]0x011F)" # ÄŸ -> ğ
    "$([char]0x00C3)$([char]0x0096)" = "$([char]0x00D6)" # Ã– -> Ö
    "$([char]0x00C3)$([char]0x00B6)" = "$([char]0x00F6)" # Ã¶ -> ö
    "$([char]0x00C3)$([char]0x0087)" = "$([char]0x00C7)" # Ã‡ -> Ç
    "$([char]0x00C3)$([char]0x00A7)" = "$([char]0x00E7)" # Ã§ -> ç
    "$([char]0x00C3)$([char]0x009C)" = "$([char]0x00DC)" # Ãœ -> Ü
    "$([char]0x00C3)$([char]0x00BC)" = "$([char]0x00FC)" # Ã¼ -> ü
    "$([char]0x00C3)$([char]0x00A2)" = "$([char]0x00E2)" # Ã¢ -> â
    "$([char]0x00C3)$([char]0x00AE)" = "$([char]0x00EE)" # Ã® -> î
    "$([char]0x00C3)$([char]0x00BB)" = "$([char]0x00FB)" # Ã» -> û
    "$([char]0x00C5)$([char]0x009E)" = "$([char]0x015E)" # Åž -> Ş
    "$([char]0x00C5)$([char]0x009F)" = "$([char]0x015F)" # ÅŸ -> ş

    # Emojis and miscellaneous double UTF-8
    "$([char]0x011F)$([char]0x0178)$([char]0x2019)$([char]0x00BB)" = "💻" # ğŸ’»
    "$([char]0x011F)$([char]0x0178)$([char]0x017D)$([char]0x00AE)" = "🎮" # ğŸŽ®
    "$([char]0x011F)$([char]0x0178)$([char]0x2022)$([char]0x00B9)$([char]0x00EF)$([char]0x00B8)" = "🕹️" # ğŸ•¹ï¸ 
    "$([char]0x011F)$([char]0x0178)$([char]0x2014)$([char]0x00A1)$([char]0x00EF)$([char]0x00B8)" = "🗡️" # ğŸ—¡ï¸ 
    "$([char]0x011F)$([char]0x0178)$([char]0x2014)$([char]0x00A1)" = "🗡️" # ğŸ—¡
    "$([char]0x011F)$([char]0x0178)$([char]0x201B)$([char]0x00A1)$([char]0x00EF)$([char]0x00B8)" = "🛡️" # ğŸ›¡ï¸ 
    "$([char]0x011F)$([char]0x0178)$([char]0x201B)$([char]0x00A1)" = "🛡️" # ğŸ›¡
    "$([char]0x011F)$([char]0x0178)$([char]0x0160)$([char]0x2039)$([char]0x00EF)$([char]0x00B8)" = "🏋️" # ğŸ ‹ï¸ 
    "$([char]0x011F)$([char]0x0178)$([char]0x0160)$([char]0x2039)" = "🏋️" # ğŸ ‹
    "$([char]0x011F)$([char]0x0178)$([char]0x017D)$([char]0x00AF)" = "🎯" # ğŸŽ¯
    "$([char]0x011F)$([char]0x0178)$([char]0x201D)$([char]0x2019)" = "🔒" # ğŸ”’
    "$([char]0x011F)$([char]0x0178)$([char]0x2019)$([char]0x017D)" = "💎" # ğŸ’Ž
    "$([char]0x011F)$([char]0x0178)$([char]0x00AC)" = "💬" # ğŸ’¬
    "$([char]0x011F)$([char]0x0178)$([char]0x0161)$([char]0x20AC)" = "🚀" # ğŸš€
    "$([char]0x011F)$([char]0x0178)$([char]0x2021)$([char]0x00B9)$([char]0x011F)$([char]0x0178)$([char]0x2021)$([char]0x00B7)" = "🇹🇷" # ğŸ‡¹ğŸ‡·
    "$([char]0x011F)$([char]0x0178)$([char]0x017D)$([char]0x00A0)" = "🎁" # ğŸŽ 
    "$([char]0x011F)$([char]0x0178)$([char]0x0178)$([char]0x00A2)" = "🟢" # ğŸŸ¢
    "$([char]0x011F)$([char]0x0178)$([char]0x2018)$([char]0x2018)" = "👑" # ğŸ‘‘
    "$([char]0x011F)$([char]0x0178)$([char]0x00A5)$([char]0x02C6)" = "🥈" # ğŸ¥ˆ
    "$([char]0x011F)$([char]0x0178)$([char]0x00A5)$([char]0x2030)" = "🥉" # ğŸ¥‰
    "$([char]0x011F)$([char]0x0178)$([char]0x0152)$([char]0x00A0)" = "🌍" # ğŸŒ 
    "$([char]0x011F)$([char]0x0178)$([char]0x0152)$([char]0x2122)" = "🌙" # ğŸŒ™
    "$([char]0x011F)$([char]0x0178)$([char]0x201D)$([char]0x00A5)" = "🔥" # ğŸ”¥
    "$([char]0x011F)$([char]0x0178)$([char]0x2020)$([char]0x00A0)" = "🏆" # ğŸ †
    "$([char]0x011F)$([char]0x0178)$([char]0x201C)$([char]0x00A9)" = "📩" # ğŸ“©
    "$([char]0x011F)$([char]0x0178)$([char]0x017D)$([char]0x2030)" = "🎉" # ğŸŽ‰
    "$([char]0x011F)$([char]0x0178)$([char]0x201D)$([char]0x00A7)" = "🔧" # ğŸ”§
    "$([char]0x011F)$([char]0x0178)$([char]0x2018)$([char]0x00A4)" = "👤" # ğŸ‘¤
    "$([char]0x011F)$([char]0x0178)$([char]0x201C)$([char]0x00A8)" = "📨" # ğŸ“¨
    "$([char]0x011F)$([char]0x0178)$([char]0x201C)$([char]0x2039)" = "📋" # ğŸ“‹
    "â„¹ï¸ " = "ℹ️"
    "â„¹" = "ℹ️"
    "âš ï¸ " = "⚠️"
    "âš " = "⚠️"
    "â€”" = "—"
    "âœ…" = "✅"
    "âœ¨" = "✨"
}

foreach ($bad in $replacements.Keys) {
    $good = $replacements[$bad]
    $content = $content.Replace($bad, $good)
}

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
Write-Output "PowerShell Encoding Hex Repair Completed."
