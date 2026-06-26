$s = "Ä°stiklal | Dashboard"
$bytes = [System.Text.Encoding]::GetEncoding(1252).GetBytes($s)
$fixed = [System.Text.Encoding]::UTF8.GetString($bytes)
Write-Output $fixed
