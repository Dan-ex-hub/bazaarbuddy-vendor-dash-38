from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

# Vercel serverless function handler
def handler(request):
    return app(request.environ, lambda *args: None)
