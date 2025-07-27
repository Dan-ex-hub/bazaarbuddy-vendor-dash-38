@echo off
echo Starting Flask Backend...

REM Check if virtual environment exists
if not exist "backend\venv" (
    echo Creating virtual environment...
    cd backend
    python -m venv venv
    cd ..
)

REM Activate virtual environment and install dependencies
echo Installing dependencies...
cd backend
call venv\Scripts\activate
pip install -r requirements.txt

echo Starting Flask server on http://localhost:5000
python app.py
pause
