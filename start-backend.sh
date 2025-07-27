#!/bin/bash

echo "Starting Flask Backend..."

# Check if virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo "Creating virtual environment..."
    cd backend
    python -m venv venv
    cd ..
fi

# Activate virtual environment and install dependencies
echo "Installing dependencies..."
cd backend

# Activate virtual environment (works on both Linux/Mac and Windows Git Bash)
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
else
    source venv/Scripts/activate
fi

pip install -r requirements.txt

echo "Starting Flask server on http://localhost:5000"
python app.py
