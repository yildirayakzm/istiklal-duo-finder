$replacements = @{
    "Ä°" = "İ"
    "Ä±" = "ı"
    "Åž" = "Ş"
    "ÅŸ" = "ş"
    "Äž" = "Ğ"
    "ÄŸ" = "ğ"
    "Ã–" = "Ö"
    "Ã¶" = "ö"
    "Ã‡" = "Ç"
    "Ã§" = "ç"
    "Ãœ" = "Ü"
    "Ã¼" = "ü"
    "Ã¢" = "â"
    "Ã®" = "î"
    "Ã»" = "û"
    "â€™" = "’"
    "â€œ" = "“"
    "â€ " = "”"
    "â”€" = "─"
}

$files = Get-ChildItem -Path "C:\Users\yildi\Desktop\stitch_duo_finder_dashboard" -Recurse -Include *.html,*.md

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $originalContent = $content
    
    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }
    
    if ($content -cne $originalContent) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed: $($file.FullName)"
    }
}
Write-Host "Done."
