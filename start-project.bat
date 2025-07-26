@echo off
echo.
echo ========================================
echo    🚀 Starting PenCraft Project 🚀
echo ========================================
echo.
echo 📝 PenCraft - Advanced Blogging Platform
echo ⚡ Starting both Frontend and Backend servers...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: npm is not installed or not in PATH
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed
echo.

REM Check if backend directory exists
if not exist "backend" (
    echo ❌ Error: backend directory not found
    echo Please make sure you are running this from the project root directory
    pause
    exit /b 1
)

REM Check if frontend directory exists  
if not exist "frontend" (
    echo ❌ Error: frontend directory not found
    echo Please make sure you are running this from the project root directory
    pause
    exit /b 1
)

REM Check if backend dependencies are installed
if not exist "backend\node_modules" (
    echo 📦 Backend dependencies not found. Installing...
    cd backend
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Error: Failed to install backend dependencies
        pause
        exit /b 1
    )
    cd ..
    echo ✅ Backend dependencies installed successfully
    echo.
)

REM Check if frontend dependencies are installed
if not exist "frontend\node_modules" (
    echo 📦 Frontend dependencies not found. Installing...
    cd frontend
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Error: Failed to install frontend dependencies
        pause
        exit /b 1
    )
    cd ..
    echo ✅ Frontend dependencies installed successfully
    echo.
)

REM Check if backend .env file exists
if not exist "backend\.env" (
    echo ⚠️  Warning: backend\.env file not found
    echo Please create backend\.env file with your configuration:
    echo.
    echo MONGODB_URI=your_mongodb_connection_string
    echo JWT_SECRET=your_jwt_secret_key
    echo PORT=5000
    echo NODE_ENV=development
    echo FRONTEND_URL=http://localhost:3000
    echo.
    echo Press any key to continue anyway, or Ctrl+C to exit and create .env file first
    pause
)

echo 🔧 Configuration Check Complete
echo.
echo 🌐 Starting servers...
echo.
echo 📍 Backend will run on: http://localhost:5000
echo 📍 Frontend will run on: http://localhost:3000
echo.
echo ⏱️  Please wait while servers start up...
echo.
echo =======================================
echo 💡 To stop servers: Press Ctrl+C
echo 💡 Backend API: http://localhost:5000/api
echo 💡 Frontend App: http://localhost:3000
echo =======================================
echo.

REM Start backend server in new window
start "🔧 PenCraft Backend Server" cmd /c "cd backend && echo Starting Backend Server on Port 5000... && npm run dev && pause"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server in new window  
start "🎨 PenCraft Frontend Server" cmd /c "cd frontend && echo Starting Frontend Server on Port 3000... && npm start && pause"

echo ✅ Both servers are starting up!
echo.
echo 📱 Your PenCraft application will be available at:
echo 🌐 http://localhost:3000
echo.
echo 🔍 Check the separate terminal windows for server status
echo 📝 Happy Blogging with PenCraft! ✨
echo.

REM Wait for 5 seconds then try to open browser
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo 🚀 PenCraft is now running!
echo.
echo Press any key to exit this window (servers will continue running)
pause >nul 