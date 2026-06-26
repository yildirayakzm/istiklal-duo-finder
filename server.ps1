$port = 8080
$path = (Get-Location).Path

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Sunucu http://localhost:$port/ adresinde başlatıldı..."
Write-Host "Durdurmak için bu pencereyi kapatabilirsiniz (veya CTRL+C yapabilirsiniz)."

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $reqPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrEmpty($reqPath)) {
        $reqPath = "index.html"
    }

    $filePath = Join-Path $path $reqPath

    if (Test-Path $filePath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = "text/plain"
        switch ($ext) {
            ".html" { $contentType = "text/html" }
            ".css"  { $contentType = "text/css" }
            ".js"   { $contentType = "application/javascript" }
            ".png"  { $contentType = "image/png" }
            ".jpg"  { $contentType = "image/jpeg" }
            ".svg"  { $contentType = "image/svg+xml" }
        }
        
        $response.ContentType = $contentType
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
    }
    
    $response.Close()
}
