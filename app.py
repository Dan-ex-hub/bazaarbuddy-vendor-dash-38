#!/usr/bin/env python3

import os
import sys
import subprocess
import time
import socket

def is_port_in_use(port):
    """Check if a port is already in use"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def run_command(command, cwd=None):
    """Run a shell command and return True if successful"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, check=True, capture_output=True, text=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error running command: {command}")
        print(f"Error: {e}")
        return False

def main():
    print("🚀 Sahaayak - Starting Application...")
    print("=" * 60)
    
    # Check if Node.js is installed
    try:
        subprocess.run(["node", "--version"], check=True, capture_output=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Node.js is not installed. Please install Node.js first.")
        sys.exit(1)
    
    # Check if Python Flask dependencies are available
    try:
        import flask
        from flask_cors import CORS
    except ImportError:
        print("📦 Installing Python dependencies...")
        if not run_command("pip install flask flask-cors"):
            print("❌ Failed to install Python dependencies")
            sys.exit(1)
        print("✅ Python dependencies installed")
    
    # Install Node.js dependencies if node_modules doesn't exist
    if not os.path.exists("node_modules"):
        print("📦 Installing Node.js dependencies...")
        if not run_command("npm install"):
            print("❌ Failed to install Node.js dependencies")
            sys.exit(1)
        print("✅ Node.js dependencies installed")
    
    # Build the React app
    print("🔨 Building React application...")
    if not run_command("npm run build"):
        print("❌ Failed to build React application")
        sys.exit(1)
    print("✅ React application built successfully")
    
    # Check if port 5000 is available
    port = 5000
    if is_port_in_use(port):
        print(f"⚠️  Port {port} is already in use. Trying port 5001...")
        port = 5001
        if is_port_in_use(port):
            print("❌ Ports 5000 and 5001 are both in use. Please close other applications.")
            sys.exit(1)
    
    # Start the Flask server
    print(f"🌐 Starting Sahaayak server...")
    print("=" * 60)
    print(f"🎉 Sahaayak is now running!")
    print(f"📍 Local:    http://localhost:{port}")
    print(f"📍 Network:  http://127.0.0.1:{port}")
    print(f"📊 API Health: http://localhost:{port}/health")
    print("🔥 Press Ctrl+C to stop the server")
    print("=" * 60)
    
    try:
        # Set environment variable for port if different from 5000
        if port != 5000:
            os.environ['FLASK_PORT'] = str(port)
        
        os.chdir("backend")
        # Import and run the Flask app
        sys.path.insert(0, '.')
        from app import app
        app.run(debug=False, host='0.0.0.0', port=port, use_reloader=False)
    except KeyboardInterrupt:
        print("\n👋 Sahaayak stopped by user")
    except Exception as e:
        print(f"❌ Error starting Flask server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
