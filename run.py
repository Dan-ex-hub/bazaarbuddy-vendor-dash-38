#!/usr/bin/env python3

import os
import sys
import subprocess
import time

def run_command(command, cwd=None):
    """Run a shell command and return True if successful"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, check=True)
        return result.returncode == 0
    except subprocess.CalledProcessError as e:
        print(f"❌ Error running command: {command}")
        print(f"Error: {e}")
        return False

def main():
    print("🚀 BazaarBuddy - Starting Application...")
    print("=" * 50)
    
    # Check if Node.js is installed
    if not run_command("node --version"):
        print("❌ Node.js is not installed. Please install Node.js first.")
        sys.exit(1)
    
    # Check if Python is installed
    if not run_command("python --version"):
        print("❌ Python is not installed. Please install Python first.")
        sys.exit(1)
    
    print("✅ Prerequisites check passed")
    
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
    
    # Install Python dependencies
    print("🐍 Installing Python dependencies...")
    if not run_command("pip install flask flask-cors"):
        print("❌ Failed to install Python dependencies")
        sys.exit(1)
    print("✅ Python dependencies installed")
    
    # Start the Flask server
    print("🌐 Starting Flask server...")
    print("📍 Application will be available at: http://localhost:5000")
    print("🔥 Press Ctrl+C to stop the server")
    print("=" * 50)
    
    try:
        os.chdir("backend")
        subprocess.run(["python", "app.py"])
    except KeyboardInterrupt:
        print("\n👋 Application stopped by user")
    except Exception as e:
        print(f"❌ Error starting Flask server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
