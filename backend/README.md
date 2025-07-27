# Flask Backend for Sahaayak

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask app:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

## API Endpoints

### Vendors
- `GET /api/vendors` - Get all wholesalers
- `GET /api/budget-items` - Get budget-friendly items with filters
- `GET /api/recent-orders` - Get recent orders
- `GET /api/reviews` - Get vendor reviews
- `GET /api/categories` - Get product categories
- `GET /api/inventory` - Get inventory items

### Pay Later Service
- `GET /api/pay-later` - Get pay later status
- `POST /api/pay-later/enroll` - Enroll in pay later service
- `POST /api/pay-later/repay` - Make repayment

### Food Donations
- `GET /api/food-donations` - Get available food donations
- `POST /api/food-donations` - Create food donation

### Health Check
- `GET /health` - Health check endpoint

## Environment Variables

Create a `.env` file in the backend directory:

```
SECRET_KEY=your-secret-key-here
FLASK_DEBUG=True
```
