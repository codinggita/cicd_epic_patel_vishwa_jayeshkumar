$routes = @(
    '/auth',
    '/workflows',
    '/dataset',
    '/infra',
    '/search',
    '/yaml',
    '/analytics',
    '/debug',
    '/admin',
    '/monitoring',
    '/notifications',
    '/system'
)
foreach ($r in $routes) {
    $url = "http://localhost:5000$r"
    try {
        $response = Invoke-WebRequest -Uri $url -Method GET -UseBasicParsing -ErrorAction Stop
        $status = $response.StatusCode
    } catch {
        if ($_.Exception.Response) {
            $status = $_.Exception.Response.StatusCode.Value__
        } else {
            $status = 'Error'
        }
    }
    Write-Host "$r : $status"
}
