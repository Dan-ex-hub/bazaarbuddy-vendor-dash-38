@echo off
echo 🚀 BazaarBuddy - Starting Application...
echo ==================================================

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing Node.js dependencies...
    npm install
    if errorlevel 1 (
        echo ❌ Failed to install Node.js dependencies
        pause
        exit /b 1
    )
)

echo 🔨 Building React application...
npm run build
if errorlevel 1 (
    echo ❌ Failed to build React application
    pause
    exit /b 1
)

echo 🐍 Installing Python dependencies...
pip install flask flask-cors python-dotenv
if errorlevel 1 (
    echo ❌ Failed to install Python dependencies
    pause
    exit /b 1
)

echo 🌐 Starting Flask server...
echo 📍 Application will be available at: http://localhost:5000
echo 🔥 Press Ctrl+C to stop the server
echo ==================================================

cd backend
python app.py
pause
