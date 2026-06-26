$replacements = @{
    'ğŸ’»' = '💻'
    'ğŸŽ®' = '🎮'
    'ğŸ•¹ï¸ ' = '🕹️'
    'ğŸ•¹' = '🕹️'
    'ğŸ—¡ï¸ ' = '🗡️'
    'ğŸ—¡' = '🗡️'
    'ğŸ›¡ï¸ ' = '🛡️'
    'ğŸ›¡' = '🛡️'
    'ğŸ ‹ï¸ ' = '🏋️'
    'ğŸ ‹' = '🏋️'
    'ğŸŽ¯' = '🎯'
    'ğŸ”’' = '🔒'
    'ğŸ’Ž' = '💎'
    'ğŸŒ¿' = '🌿'
    'ğŸ’¾' = '💾'
    'ğŸ’¬' = '💬'
    'ğŸš€' = '🚀'
    'ğŸ‡¹ğŸ‡·' = '🇹🇷'
    'ğŸŽ ' = '🎁'
    'ğŸŸ¢' = '🟢'
    'ğŸ‘‘' = '👑'
    'ğŸ¥ˆ' = '🥈'
    'ğŸ¥‰' = '🥉'
    'ğŸŒ ' = '🌍'
    'ğŸŒ™' = '🌙'
    'ğŸ”¥' = '🔥'
    'ğŸ †' = '🏆'
    'ğŸ“©' = '📩'
    'ğŸŽ‰' = '🎉'
    'ğŸ”§' = '🔧'
    'ğŸ‘¤' = '👤'
    'ğŸ“¨' = '📨'
    'ğŸ“‹' = '📋'
    'â„¹ï¸ ' = 'ℹ️'
    'â„¹' = 'ℹ️'
    'âš ï¸ ' = '⚠️'
    'âš ' = '⚠️'
    'â€”' = '—'
    'âœ…' = '✅'
    'âœ¨' = '✨'
    'Ä°' = 'İ'
    'Ä±' = 'ı'
    'Äž' = 'Ğ'
    'ÄŸ' = 'ğ'
    'Ã–' = 'Ö'
    'Ã¶' = 'ö'
    'Ã‡' = 'Ç'
    'Ã§' = 'ç'
    'Ãœ' = 'Ü'
    'Ã¼' = 'ü'
    'Ã¢' = 'â'
    'Ã®' = 'î'
    'Ã»' = 'û'
    'DİÄžER' = 'DİĞER'
    'ETKİNLİÄžİ' = 'ETKİNLİĞİ'
    'EÅžLEÅžME' = 'EŞLEŞME'
}

$count = 0
$files = Get-ChildItem -Path '.' -Include *.html,*.js -Recurse -File

foreach ($file in $files) {
    try {
        $origContent = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
        $content = $origContent

        foreach ($key in $replacements.Keys) {
            $content = $content.Replace($key, $replacements[$key])
        }

        if ($content -cne $origContent) {
            [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
            Write-Host "Fixed $($file.FullName)"
            $count++
        }
    } catch {
        Write-Host "Error fixing $($file.FullName): $_"
    }
}

Write-Host "Total files fixed: $count"
