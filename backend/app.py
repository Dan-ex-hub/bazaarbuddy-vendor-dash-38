from flask import Flask, jsonify, request, send_from_directory, send_file
from flask_cors import CORS
from datetime import datetime, timedelta
import os
import json

app = Flask(__name__, static_folder='../dist', static_url_path='')
CORS(app)

# Serve React App
@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_react_routes(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Simple data storage
data = {
    "vendors": [
        {
            "id": "1", "name": "Fresh Valley Wholesalers", "rating": 4.8, "reviewCount": 156,
            "location": "Pune, Maharashtra", "phone": "+91 9876543210",
            "specialties": ["Vegetables", "Fruits", "Dairy"], "priceRange": "Budget",
            "deliveryTime": "2-4 hours", "trustScore": 95
        },
        {
            "id": "2", "name": "Spice Garden Suppliers", "rating": 4.6, "reviewCount": 89,
            "location": "Mumbai, Maharashtra", "phone": "+91 9765432109",
            "specialties": ["Spices", "Grains", "Pulses"], "priceRange": "Mid-Range",
            "deliveryTime": "4-6 hours", "trustScore": 92
        }
    ],
    "budget_items": [
        {
            "id": "1", "name": "Fresh Tomatoes", "wholesaler": "Fresh Valley Wholesalers",
            "price": 25, "originalPrice": 35, "unit": "per kg", "category": "Vegetables",
            "rating": 4.8, "discount": 29, "inStock": True, "estimatedSavings": 100
        },
        {
            "id": "2", "name": "Basmati Rice", "wholesaler": "Spice Garden Suppliers",
            "price": 120, "originalPrice": 150, "unit": "per 5kg", "category": "Grains",
            "rating": 4.6, "discount": 20, "inStock": True, "estimatedSavings": 150
        }
    ],
    "recent_orders": [
        {"id": "1", "itemName": "Organic Tomatoes (5kg)", "orderCount": 12},
        {"id": "2", "itemName": "Fresh Onions (10kg)", "orderCount": 8},
        {"id": "3", "itemName": "Basmati Rice (25kg)", "orderCount": 15},
        {"id": "4", "itemName": "Chicken Breast (3kg)", "orderCount": 6}
    ],
    "reviews": [
        {
            "id": "1", "vendorName": "Rajesh Sharma", "wholesalerName": "Fresh Valley Wholesalers",
            "rating": 5, "comment": "Excellent quality vegetables and timely delivery.", 
            "date": "2 days ago", "orderValue": 2500
        },
        {
            "id": "2", "vendorName": "Priya Patel", "wholesalerName": "Spice Garden Suppliers",
            "rating": 4, "comment": "Good variety of spices. Overall satisfied.",
            "date": "1 week ago", "orderValue": 1800
        }
    ],
    "pay_later": {
        "vendorId": "vendor123", "totalCreditLimit": 3000, "usedCredit": 1200,
        "dueDate": "2025-08-25", "interestRate": 0.05, "isEnrolled": True, "isBlocked": False,
        "bankDetails": {"aadhar": "XXXX XXXX XXXX", "pan": "ABCDE1234F"}
    }
}

# API Routes
@app.route('/api/vendors')
def get_vendors():
    return jsonify({"vendors": data["vendors"]})

@app.route('/api/budget-items')
def get_budget_items():
    items = data["budget_items"].copy()
    max_budget = request.args.get('maxBudget', type=int)
    category = request.args.get('category', 'all')
    sort_by = request.args.get('sortBy', 'discount')
    
    if max_budget:
        items = [item for item in items if item['price'] <= max_budget]
    if category != 'all':
        items = [item for item in items if item['category'] == category]
    
    if sort_by == 'price':
        items.sort(key=lambda x: x['price'])
    elif sort_by == 'discount':
        items.sort(key=lambda x: x['discount'], reverse=True)
    
    return jsonify({"items": items})

@app.route('/api/recent-orders')
def get_recent_orders():
    return jsonify({"orders": data["recent_orders"]})

@app.route('/api/reviews')
def get_reviews():
    return jsonify({"reviews": data["reviews"]})

@app.route('/api/pay-later')
def get_pay_later():
    return jsonify(data["pay_later"])

@app.route('/api/categories')
def get_categories():
    categories = [
        {"id": "fruits-vegetables", "title": "Fruits & Vegetables"},
        {"id": "fish-seafood", "title": "Fish & Seafood"},
        {"id": "dairy-eggs", "title": "Dairy & Eggs"},
        {"id": "flours", "title": "Flours & Grains"},
        {"id": "meat-poultry", "title": "Meat & Poultry"},
        {"id": "pulses", "title": "Pulses & Legumes"}
    ]
    return jsonify({"categories": categories})

@app.route('/api/inventory')
def get_inventory():
    inventory = [
        {"id": "1", "name": "Fresh Fruits", "category": "Produce"},
        {"id": "2", "name": "Grains & Cereals", "category": "Pantry"},
        {"id": "3", "name": "Meat", "category": "Protein"},
        {"id": "4", "name": "Seafood", "category": "Protein"},
        {"id": "5", "name": "Dairy Products", "category": "Refrigerated"},
        {"id": "6", "name": "Vegetables", "category": "Produce"}
    ]
    return jsonify({"inventory": inventory})

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

if __name__ == '__main__':
    print("🚀 Starting BazaarBuddy...")
    print("📦 Backend: http://localhost:5000")
    print("🌐 Frontend: http://localhost:5000")
    print("📊 API Health: http://localhost:5000/health")
    app.run(debug=True, host='0.0.0.0', port=5000)
