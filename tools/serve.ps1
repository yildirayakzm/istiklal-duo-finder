$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8090/")
$listener.Start()
Write-Host "Server running at http://localhost:8090"
$root = "c:\Users\yildi\Desktop\stitch_duo_finder_dashboard"

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = $ctx.Request.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }
    $file = Join-Path $root ($path.Replace("/", "\"))
    
    if (Test-Path $file -PathType Leaf) {
        $bytes = [IO.File]::ReadAllBytes($file)
        $ext = [IO.Path]::GetExtension($file).ToLower()
        $types = @{".html"="text/html;charset=utf-8";".js"="application/javascript;charset=utf-8";".css"="text/css;charset=utf-8";".png"="image/png";".jpg"="image/jpeg";".svg"="image/svg+xml";".json"="application/json"}
        if ($types[$ext]) { $ctx.Response.ContentType = $types[$ext] } else { $ctx.Response.ContentType = "application/octet-stream" }
        $ctx.Response.ContentLength64 = $bytes.Length
        $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $ctx.Response.StatusCode = 404
        $msg = [Text.Encoding]::UTF8.GetBytes("Not Found: $path")
        $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $ctx.Response.Close()
}
