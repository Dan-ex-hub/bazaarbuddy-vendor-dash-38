#!/usr/bin/env python3
"""
Production Flask app for Render deployment
"""
import os
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Get port from environment variable or default to 10000
port = int(os.environ.get('PORT', 10000))

# Serve React build files
@app.route('/')
def serve_react_app():
    return send_from_directory('../dist', 'index.html')

@app.route('/<path:path>')
def serve_react_static(path):
    return send_from_directory('../dist', path)

# API Routes
@app.route('/api/health')
def health_check():
    return jsonify({"status": "healthy", "service": "Sahaayak API"})

@app.route('/api/auth/login', methods=['POST'])
def login():
    # Mock authentication - replace with real auth
    return jsonify({
        "success": True,
        "user": {
            "name": "Demo User",
            "type": "vendor",
            "phone": "9876543210"
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=False)
