# Sahaayak - Complete Vendor/Wholesaler Platform

## 🚀 Quick Start (Single Command)

Just run this one command to start everything:

```bash
python app.py
```

That's it! The script will automatically:
- ✅ Check dependencies (Node.js, Python)
- ✅ Install missing packages
- ✅ Build the React frontend
- ✅ Setup the database
- ✅ Start the Flask backend
- ✅ Serve the complete application

## 📱 Access the App

Once started, open your browser and go to:
**http://localhost:5000**

## 🔐 Demo Credentials

### Vendors (Street Vendors)
- Raj Patel: `9876543210` / `vendor123`
- Priya Shah: `9876543211` / `vendor123` 
- Amit Kumar: `9876543212` / `vendor123`

### Wholesalers (Suppliers)
- Mumbai Fresh Mart: `9999999999` / `password123`
- Gupta Fresh Veggies: `9000000001` / `gupta123`

## ✨ All Features Now Working

### Vendor Side:
✅ **Reorder Button** - Adds items to cart with success message  
✅ **Pay Buttons** - Fake payment with success notifications  
✅ **Add to Cart** - All inventory and budget items work  
✅ **Voice Search** - Hindi/English support ("tamatar" → tomato)  
✅ **Categories** - Click to filter products  
✅ **Profile** - View/edit vendor profile  
✅ **Orders** - Track order history  
✅ **Offers** - Browse and claim deals  

### Wholesaler Side:
✅ **Add Product** - Adds new products to inventory  
✅ **Edit Button** - Opens product edit interface  
✅ **Dashboard** - Complete business analytics  
✅ **Order Management** - Handle vendor orders  

## 🛠️ Requirements

- **Python 3.7+** (for backend)
- **Node.js 16+** (for frontend build)
- **Internet connection** (for initial package downloads)

## 📁 Project Structure

```
sahaayak/
├── app.py              # 🚀 Single command startup script
├── backend/            # 🐍 Flask API server
├── src/                # ⚛️ React frontend
├── dist/               # 📦 Built frontend (auto-generated)
└── vendor_clubs.db     # 🗄️ SQLite database (auto-created)
```

## 🔧 Manual Development (Optional)

If you want to develop separately:

```bash
# Frontend only (development mode)
npm run dev

# Backend only 
cd backend && python app.py

# Build frontend for production
npm run build
```

## 💡 Features Overview

- **Dual Interface**: Separate dashboards for vendors and wholesalers
- **Real Shopping Cart**: Add/remove items with quantity management
- **Voice Search**: Hindi and English voice recognition
- **Payment System**: Fake payment processing with success feedback
- **Order Management**: Complete order tracking and history
- **Product Management**: CRUD operations for wholesalers
- **Offers System**: Discount management and claiming
- **Multi-language**: English, Hindi, Marathi support

---

**Start with one command: `python app.py`** 🎉
