from flask import Flask, render_template, redirect, url_for, request, flash, session, send_file, jsonify
from flask_cors import CORS
import sqlite3
import os
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
import uuid
import json

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this in production
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Enable CORS for React frontend
CORS(app, origins=["http://localhost:8080"])

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'doc', 'docx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Database setup
def init_db():
    conn = sqlite3.connect('vendor_clubs.db')
    cursor = conn.cursor()
    
    # Vendors table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS vendors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            password TEXT,
            location TEXT,
            is_approved BOOLEAN DEFAULT FALSE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Wholesalers table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS wholesalers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            shop_name TEXT NOT NULL,
            id_doc_path TEXT,
            license_doc_path TEXT,
            sourcing_info TEXT,
            location TEXT,
            is_approved BOOLEAN DEFAULT FALSE,
            trust_score REAL DEFAULT 4.7,
            response_rate REAL DEFAULT 95.0,
            delivery_rate REAL DEFAULT 92.0,
            profile_photo TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Products table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            wholesaler_id INTEGER,
            name TEXT NOT NULL,
            category TEXT,
            price REAL NOT NULL,
            stock INTEGER NOT NULL,
            group_buy_eligible BOOLEAN DEFAULT TRUE,
            image_path TEXT,
            views INTEGER DEFAULT 0,
            likes INTEGER DEFAULT 0,
            status TEXT DEFAULT 'In Stock',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (wholesaler_id) REFERENCES wholesalers (id)
        )
    ''')
    
    # Orders table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            wholesaler_id INTEGER,
            vendor_id INTEGER,
            product_id INTEGER,
            quantity INTEGER,
            total_amount REAL,
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (wholesaler_id) REFERENCES wholesalers (id),
            FOREIGN KEY (vendor_id) REFERENCES vendors (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
        )
    ''')
    
    # Reviews table with reply column
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            wholesaler_id INTEGER,
            vendor_id INTEGER,
            rating INTEGER,
            comment TEXT,
            reply TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (wholesaler_id) REFERENCES wholesalers (id),
            FOREIGN KEY (vendor_id) REFERENCES vendors (id)
        )
    ''')
    
    # Analytics table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS analytics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            wholesaler_id INTEGER,
            date DATE,
            total_orders INTEGER DEFAULT 0,
            total_revenue REAL DEFAULT 0,
            active_customers INTEGER DEFAULT 0,
            FOREIGN KEY (wholesaler_id) REFERENCES wholesalers (id)
        )
    ''')
    
    # Insert sample data if empty
    cursor.execute('SELECT COUNT(*) FROM vendors')
    if cursor.fetchone()[0] == 0:
        # Sample vendors
        vendors_data = [
            ('Raj Patel', 'raj@example.com', '9876543210', 'vendor123', 'Ghatkopar', 1),
            ('Priya Shah', 'priya@example.com', '9876543211', 'vendor123', 'Andheri', 1),
            ('Amit Kumar', 'amit@example.com', '9876543212', 'vendor123', 'Bandra', 1),
        ]
        cursor.executemany('INSERT INTO vendors (name, email, phone, password, location, is_approved) VALUES (?, ?, ?, ?, ?, ?)', vendors_data)
        
        # Sample wholesaler
        cursor.execute('''
            INSERT INTO wholesalers (name, phone, password, shop_name, sourcing_info, location, is_approved, trust_score, response_rate, delivery_rate)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', ('Mumbai Fresh Mart', '9999999999', 'password123', 'Fresh Mart Wholesale', 'Quality products from local farms', 'Ghatkopar', 1, 4.7, 95.0, 92.0))
        
        wholesaler_id = cursor.lastrowid
        
        # Sample products
        products_data = [
            (wholesaler_id, 'Organic Tomatoes', 'Vegetables', 45.0, 500, 1, None, 234, 12, 'In Stock'),
            (wholesaler_id, 'Fresh Spinach', 'Vegetables', 25.0, 200, 1, None, 156, 8, 'Low Stock'),
            (wholesaler_id, 'Premium Carrots', 'Vegetables', 35.0, 300, 1, None, 312, 18, 'In Stock'),
            (wholesaler_id, 'Red Onions', 'Vegetables', 30.0, 300, 1, None, 445, 25, 'In Stock'),
            (wholesaler_id, 'Basmati Rice', 'Grains & Cereals', 85.0, 150, 1, None, 289, 19, 'In Stock'),
        ]
        cursor.executemany('INSERT INTO products (wholesaler_id, name, category, price, stock, group_buy_eligible, image_path, views, likes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', products_data)
    
    conn.commit()
    conn.close()

# API Routes for React frontend
@app.route('/api/vendors')
def get_vendors():
    conn = sqlite3.connect('vendor_clubs.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM vendors WHERE is_approved = 1')
    vendors = cursor.fetchall()
    conn.close()
    
    vendor_list = []
    for vendor in vendors:
        vendor_list.append({
            'id': vendor[0],
            'name': vendor[1],
            'email': vendor[2],
            'phone': vendor[3],
            'location': vendor[5]
        })
    
    return jsonify({'vendors': vendor_list})

@app.route('/api/products')
def get_products():
    conn = sqlite3.connect('vendor_clubs.db')
    cursor = conn.cursor()
    cursor.execute('''
        SELECT p.*, w.name as wholesaler_name 
        FROM products p 
        JOIN wholesalers w ON p.wholesaler_id = w.id 
        WHERE w.is_approved = 1
    ''')
    products = cursor.fetchall()
    conn.close()
    
    product_list = []
    for product in products:
        product_list.append({
            'id': product[0],
            'name': product[2],
            'category': product[3],
            'price': product[4],
            'stock': product[5],
            'wholesaler': product[13],
            'rating': 4.5,  # Default rating
            'inStock': product[5] > 0,
            'estimatedSavings': int(product[4] * 0.1)  # 10% savings estimate
        })
    
    return jsonify({'items': product_list})

# Authentication routes
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    phone = data.get('phone')
    password = data.get('password')
    user_type = data.get('user_type')  # 'vendor' or 'wholesaler'
    
    conn = sqlite3.connect('vendor_clubs.db')
    cursor = conn.cursor()
    
    if user_type == 'vendor':
        cursor.execute('SELECT id, name, is_approved FROM vendors WHERE phone = ? AND password = ?', (phone, password))
        user = cursor.fetchone()
        if user and user[2]:  # is_approved
            session['user_id'] = user[0]
            session['user_name'] = user[1]
            session['user_type'] = 'vendor'
            return jsonify({'success': True, 'user_type': 'vendor', 'user': {'id': user[0], 'name': user[1]}})
    
    elif user_type == 'wholesaler':
        cursor.execute('SELECT id, name, is_approved FROM wholesalers WHERE phone = ? AND password = ?', (phone, password))
        user = cursor.fetchone()
        if user and user[2]:  # is_approved
            session['user_id'] = user[0]
            session['user_name'] = user[1]
            session['user_type'] = 'wholesaler'
            return jsonify({'success': True, 'user_type': 'wholesaler', 'user': {'id': user[0], 'name': user[1]}})
    
    conn.close()
    return jsonify({'success': False, 'message': 'Invalid credentials or account not approved'})

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True})

@app.route('/api/user')
def get_user():
    if 'user_id' in session:
        return jsonify({
            'success': True,
            'user': {
                'id': session['user_id'],
                'name': session['user_name'],
                'type': session['user_type']
            }
        })
    return jsonify({'success': False})

# Existing API routes for compatibility
@app.route('/api/budget-items')
def get_budget_items():
    return get_products()  # Reuse products endpoint

@app.route('/api/recent-orders')
def get_recent_orders():
    return jsonify({
        "orders": [
            {"id": "1", "itemName": "Organic Tomatoes (5kg)", "orderCount": 12},
            {"id": "2", "itemName": "Fresh Onions (10kg)", "orderCount": 8},
            {"id": "3", "itemName": "Basmati Rice (25kg)", "orderCount": 15},
            {"id": "4", "itemName": "Chicken Breast (3kg)", "orderCount": 6}
        ]
    })

@app.route('/api/reviews')
def get_reviews():
    return jsonify({
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
        ]
    })

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

@app.route('/api/pay-later')
def get_pay_later():
    return jsonify({
        "vendorId": "vendor123", "totalCreditLimit": 3000, "usedCredit": 1200,
        "dueDate": "2025-08-25", "interestRate": 0.05, "isEnrolled": True, "isBlocked": False,
        "bankDetails": {"aadhar": "XXXX XXXX XXXX", "pan": "ABCDE1234F"}
    })

@app.route('/api/health')
def health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)
