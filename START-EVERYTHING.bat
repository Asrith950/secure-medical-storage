@echo off
echo ==========================================
echo   SECURE MEDICAL RECORDS WEBSITE
echo   Complete Auto-Start System
echo ==========================================
echo.
echo Starting all services...
echo.

REM Create data directory if it doesn't exist
if not exist "C:\data\db" mkdir "C:\data\db"

REM Change to the project directory
pushd "%~dp0"

REM Start MongoDB if found
echo [1/3] Checking MongoDB...
set "MONGO_EXE="
if exist "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" set "MONGO_EXE=C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe"
if not defined MONGO_EXE if exist "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" set "MONGO_EXE=C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"

if defined MONGO_EXE (
    echo Starting MongoDB...
    start "MongoDB Server" cmd /k "\"%MONGO_EXE%\" --dbpath \"C:\data\db\""
    timeout /t 3 /nobreak >nul
) else (
    echo MongoDB not found - continuing anyway...
)

echo [2/3] Starting Backend Server...
start "Backend Server - Port 5000" powershell -NoExit -Command "cd '%~dp0server'; Write-Host '=== BACKEND SERVER (Port 5000) ===' -ForegroundColor Green; npm run dev"

echo [3/3] Starting Frontend App...
timeout /t 5 /nobreak >nul
start "Frontend App - Port 3000" powershell -NoExit -Command "cd '%~dp0client'; Write-Host '=== FRONTEND APP (Port 3000) ===' -ForegroundColor Cyan; $env:BROWSER='none'; npm start"

echo.
echo ==========================================
echo Services are starting...
echo.
echo Wait 30-40 seconds for React to compile
echo Then your browser will open automatically
echo ==========================================
echo.
timeout /t 25 /nobreak
start http://localhost:3000

echo.
echo ==========================================
echo Website should now be open in your browser!
echo ==========================================
echo.
echo Keep all windows open while using the website
echo To stop: Run STOP-EVERYTHING.bat
echo.
popd
pause