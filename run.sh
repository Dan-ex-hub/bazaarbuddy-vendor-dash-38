#!/bin/bash

echo "🚀 Sahaayak - Starting Application..."
echo "=================================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Node.js dependencies"
        exit 1
    fi
fi

echo "🔨 Building React application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build React application"
    exit 1
fi

echo "🐍 Installing Python dependencies..."
pip install flask flask-cors python-dotenv
if [ $? -ne 0 ]; then
    echo "❌ Failed to install Python dependencies"
    exit 1
fi

echo "🌐 Starting Flask server..."
echo "📍 Application will be available at: http://localhost:5000"
echo "🔥 Press Ctrl+C to stop the server"
echo "=================================================="

cd backend
python app.py
