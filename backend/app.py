from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)

# Mock data storage (in production, use a proper database)
vendors = [
    {
        "id": "1",
        "name": "Fresh Valley Wholesalers",
        "rating": 4.8,
        "reviewCount": 156,
        "location": "Pune, Maharashtra",
        "phone": "+91 9876543210",
        "specialties": ["Vegetables", "Fruits", "Dairy"],
        "priceRange": "Budget",
        "deliveryTime": "2-4 hours",
        "trustScore": 95
    },
    {
        "id": "2",
        "name": "Spice Garden Suppliers",
        "rating": 4.6,
        "reviewCount": 89,
        "location": "Mumbai, Maharashtra",
        "phone": "+91 9765432109",
        "specialties": ["Spices", "Grains", "Pulses"],
        "priceRange": "Mid-Range",
        "deliveryTime": "4-6 hours",
        "trustScore": 92
    }
]

budget_items = [
    {
        "id": "1",
        "name": "Fresh Tomatoes",
        "wholesaler": "Fresh Valley Wholesalers",
        "price": 25,
        "originalPrice": 35,
        "unit": "per kg",
        "category": "Vegetables",
        "rating": 4.8,
        "discount": 29,
        "inStock": True,
        "estimatedSavings": 100
    },
    {
        "id": "2",
        "name": "Basmati Rice",
        "wholesaler": "Spice Garden Suppliers",
        "price": 120,
        "originalPrice": 150,
        "unit": "per 5kg",
        "category": "Grains",
        "rating": 4.6,
        "discount": 20,
        "inStock": True,
        "estimatedSavings": 150
    }
]

recent_orders = [
    {"id": "1", "itemName": "Organic Tomatoes (5kg)", "orderCount": 12},
    {"id": "2", "itemName": "Fresh Onions (10kg)", "orderCount": 8},
    {"id": "3", "itemName": "Basmati Rice (25kg)", "orderCount": 15},
    {"id": "4", "itemName": "Chicken Breast (3kg)", "orderCount": 6}
]

reviews = [
    {
        "id": "1",
        "vendorName": "Rajesh Sharma",
        "wholesalerName": "Fresh Valley Wholesalers",
        "rating": 5,
        "comment": "Excellent quality vegetables and timely delivery. The tomatoes were fresh and perfectly ripe.",
        "date": "2 days ago",
        "orderValue": 2500
    },
    {
        "id": "2",
        "vendorName": "Priya Patel",
        "wholesalerName": "Spice Garden Suppliers",
        "rating": 4,
        "comment": "Good variety of spices. Packaging could be better but overall satisfied.",
        "date": "1 week ago",
        "orderValue": 1800
    }
]

pay_later_data = {
    "vendorId": "vendor123",
    "totalCreditLimit": 3000,
    "usedCredit": 1200,
    "dueDate": "2025-08-25",
    "interestRate": 0.05,
    "isEnrolled": True,
    "isBlocked": False,
    "bankDetails": {
        "aadhar": "XXXX XXXX XXXX",
        "pan": "ABCDE1234F",
        "accountNumber": "123456789",
        "ifsc": "HDFC0001234",
        "upi": "vendor@upi"
    }
}

# API Routes
@app.route('/api/vendors', methods=['GET'])
def get_vendors():
    return jsonify({"vendors": vendors})

@app.route('/api/budget-items', methods=['GET'])
def get_budget_items():
    max_budget = request.args.get('maxBudget', type=int)
    category = request.args.get('category', 'all')
    sort_by = request.args.get('sortBy', 'discount')
    
    filtered_items = budget_items.copy()
    
    if max_budget:
        filtered_items = [item for item in filtered_items if item['price'] <= max_budget]
    
    if category != 'all':
        filtered_items = [item for item in filtered_items if item['category'] == category]
    
    if sort_by == 'price':
        filtered_items.sort(key=lambda x: x['price'])
    elif sort_by == 'discount':
        filtered_items.sort(key=lambda x: x['discount'], reverse=True)
    elif sort_by == 'savings':
        filtered_items.sort(key=lambda x: x['estimatedSavings'], reverse=True)
    
    return jsonify({"items": filtered_items})

@app.route('/api/recent-orders', methods=['GET'])
def get_recent_orders():
    return jsonify({"orders": recent_orders})

@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    return jsonify({"reviews": reviews})

@app.route('/api/pay-later', methods=['GET'])
def get_pay_later():
    return jsonify(pay_later_data)

@app.route('/api/pay-later/enroll', methods=['POST'])
def enroll_pay_later():
    data = request.json
    pay_later_data['isEnrolled'] = True
    pay_later_data['bankDetails'].update(data.get('bankDetails', {}))
    return jsonify({"success": True, "data": pay_later_data})

@app.route('/api/pay-later/repay', methods=['POST'])
def repay_pay_later():
    data = request.json
    amount = data.get('amount', 0)
    
    if amount > 0:
        pay_later_data['usedCredit'] = max(0, pay_later_data['usedCredit'] - amount)
        pay_later_data['isBlocked'] = False
        
    return jsonify({"success": True, "data": pay_later_data})

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = [
        {"id": "fruits-vegetables", "title": "Fruits & Vegetables", "icon": "Apple"},
        {"id": "fish-seafood", "title": "Fish & Seafood", "icon": "Fish"},
        {"id": "dairy-eggs", "title": "Dairy & Eggs", "icon": "Milk"},
        {"id": "flours", "title": "Flours & Grains", "icon": "Wheat"},
        {"id": "meat-poultry", "title": "Meat & Poultry", "icon": "ChefHat"},
        {"id": "pulses", "title": "Pulses & Legumes", "icon": "Bean"}
    ]
    return jsonify({"categories": categories})

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    inventory = [
        {"id": "1", "name": "Fresh Fruits", "category": "Produce", "icon": "Apple"},
        {"id": "2", "name": "Grains & Cereals", "category": "Pantry", "icon": "Wheat"},
        {"id": "3", "name": "Meat", "category": "Protein", "icon": "Beef"},
        {"id": "4", "name": "Seafood", "category": "Protein", "icon": "Fish"},
        {"id": "5", "name": "Dairy Products", "category": "Refrigerated", "icon": "Milk"},
        {"id": "6", "name": "Vegetables", "category": "Produce", "icon": "Leaf"}
    ]
    return jsonify({"inventory": inventory})

@app.route('/api/food-donations', methods=['GET'])
def get_food_donations():
    donations = [
        {
            "id": "1",
            "donorName": "Green Valley Restaurant",
            "foodType": "Cooked Meals",
            "quantity": "50 portions",
            "expiryTime": "2 hours",
            "location": "Pune, Maharashtra",
            "status": "Available"
        }
    ]
    return jsonify({"donations": donations})

@app.route('/api/food-donations', methods=['POST'])
def create_food_donation():
    data = request.json
    new_donation = {
        "id": str(len(recent_orders) + 1),
        "donorName": data.get('donorName'),
        "foodType": data.get('foodType'),
        "quantity": data.get('quantity'),
        "expiryTime": data.get('expiryTime'),
        "location": data.get('location'),
        "status": "Pending"
    }
    return jsonify({"success": True, "donation": new_donation})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
