#!/usr/bin/env python3
"""
Sahaayak - Single Command Startup Script
Runs both frontend and backend with a single command: python app.py
"""

import os
import sys
import subprocess
import signal
import time
import threading
from pathlib import Path

def run_command(command, cwd=None, shell=True):
    """Run a command and return the process"""
    try:
        return subprocess.Popen(
            command,
            shell=shell,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True
        )
    except Exception as e:
        print(f"Error running command '{command}': {e}")
        return None

def check_dependencies():
    """Check if required dependencies are installed"""
    print("🔍 Checking dependencies...")
    
    # Check Node.js
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Node.js: {result.stdout.strip()}")
        else:
            print("❌ Node.js not found. Please install Node.js first.")
            return False
    except:
        print("❌ Node.js not found. Please install Node.js first.")
        return False
    
    # Check Python
    try:
        version = sys.version.split()[0]
        print(f"✅ Python: {version}")
    except:
        print("❌ Python error")
        return False
    
    # Check if node_modules exists
    if not os.path.exists("node_modules"):
        print("📦 Installing Node.js dependencies...")
        result = subprocess.run(['npm', 'install'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Node.js dependencies installed")
        else:
            print(f"❌ Failed to install Node.js dependencies: {result.stderr}")
            return False
    else:
        print("✅ Node.js dependencies already installed")
    
    # Check Python dependencies
    print("🐍 Installing Python dependencies...")
    try:
        subprocess.run([sys.executable, '-m', 'pip', 'install', 'flask', 'flask-cors'], 
                      capture_output=True, check=True)
        print("✅ Python dependencies installed")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install Python dependencies: {e}")
        return False
    
    return True

def build_frontend():
    """Build the React frontend"""
    print("🔨 Building React frontend...")
    try:
        result = subprocess.run(['npm', 'run', 'build'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Frontend built successfully")
            return True
        else:
            print(f"❌ Frontend build failed: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Frontend build error: {e}")
        return False

def setup_database():
    """Setup the database"""
    print("🗄️ Setting up database...")
    
    # Check if database setup script exists
    if os.path.exists("backend/comprehensive_database_reset.py"):
        try:
            result = subprocess.run([sys.executable, 'comprehensive_database_reset.py'], 
                                  cwd='backend', capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ Database setup completed")
                print(result.stdout)
                return True
            else:
                print(f"⚠️ Database setup had issues: {result.stderr}")
                # Continue anyway as the backend will create basic tables
                return True
        except Exception as e:
            print(f"⚠️ Database setup error: {e}")
            # Continue anyway
            return True
    else:
        print("ℹ️ Database will be initialized by Flask app")
        return True

def start_backend():
    """Start the Flask backend server"""
    print("🌐 Starting Flask backend server...")
    
    backend_path = Path("backend")
    if not backend_path.exists():
        print("❌ Backend directory not found")
        return None
    
    # Start the Flask app
    proc = run_command([sys.executable, 'app.py'], cwd=str(backend_path))
    
    if proc:
        print("✅ Backend server starting on http://localhost:5000")
        return proc
    else:
        print("❌ Failed to start backend server")
        return None

def monitor_process(proc, name):
    """Monitor a process and print its output"""
    while True:
        output = proc.stdout.readline()
        if output == '' and proc.poll() is not None:
            break
        if output:
            print(f"[{name}] {output.strip()}")

def main():
    """Main function to start the application"""
    print("🚀 Sahaayak - Starting Application...")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        print("❌ Dependency check failed")
        sys.exit(1)
    
    # Build frontend
    if not build_frontend():
        print("❌ Frontend build failed")
        sys.exit(1)
    
    # Setup database
    if not setup_database():
        print("❌ Database setup failed")
        sys.exit(1)
    
    # Start backend
    backend_proc = start_backend()
    if not backend_proc:
        print("❌ Failed to start backend")
        sys.exit(1)
    
    # Monitor backend in a separate thread
    backend_thread = threading.Thread(
        target=monitor_process, 
        args=(backend_proc, "Backend"), 
        daemon=True
    )
    backend_thread.start()
    
    print("\n🎉 Application started successfully!")
    print("=" * 50)
    print("📱 Frontend: http://localhost:5000 (served by Flask)")
    print("🔧 Backend API: http://localhost:5000/api")
    print("🗄️ Database: SQLite (vendor_clubs.db)")
    print("\n📝 Demo Credentials:")
    print("   Vendors:")
    print("   • Raj Patel: 9876543210 / vendor123")
    print("   • Priya Shah: 9876543211 / vendor123")
    print("   • Amit Kumar: 9876543212 / vendor123")
    print("\n   Wholesalers:")
    print("   • Mumbai Fresh Mart: 9999999999 / password123")
    print("   • Gupta Fresh Veggies: 9000000001 / gupta123")
    print("\n🔥 Press Ctrl+C to stop the server")
    print("=" * 50)
    
    try:
        # Keep the main thread alive
        while True:
            if backend_proc.poll() is not None:
                print("\n❌ Backend process stopped unexpectedly")
                break
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n\n👋 Shutting down Sahaayak...")
        
        # Terminate processes
        if backend_proc:
            backend_proc.terminate()
            try:
                backend_proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                backend_proc.kill()
        
        print("✅ Application stopped successfully")
        sys.exit(0)

if __name__ == "__main__":
    main()
