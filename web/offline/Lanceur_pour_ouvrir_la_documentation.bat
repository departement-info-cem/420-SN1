@echo off
setlocal

REM Démarre le serveur HTTP sur le port 3000
start "" python -m http.server 3000

REM Attend un court instant pour laisser le serveur démarrer
timeout /t 2 >nul

REM Ouvre le navigateur à l'adresse localhost:3000
start "" http://localhost:3000

endlocal