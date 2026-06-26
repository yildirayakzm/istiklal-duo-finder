$file = "C:\Users\yildi\Desktop\stitch_duo_finder_dashboard\js\core\nexus-ai.js"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

$replacements = @{
    "#00f2ff" = "#8B5CF6"
    "#00dbe7" = "#EC4899"
    "rgba(0, 242, 255," = "rgba(139, 92, 246,"
    "rgba(0,242,255," = "rgba(139,92,246,"
    "rgba(0,219,231," = "rgba(236,72,153,"
    "#00363a" = "#ffffff"
}

foreach ($key in $replacements.Keys) {
    $content = $content.Replace($key, $replacements[$key])
}

[System.IO.File]::WriteAllText($file, $content, new-object System.Text.UTF8Encoding $false)
Write-Host "Replaced colors in nexus-ai.js"
