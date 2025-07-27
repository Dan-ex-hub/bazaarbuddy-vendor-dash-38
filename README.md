# BazaarBuddy - Wholesale Food Marketplace

A modern React + Flask application for wholesale food vendors to connect with suppliers and manage their business.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Flask + Python
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theme

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- npm or yarn

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:8080`

### 2. Backend Setup

#### Option A: Using the provided scripts (Recommended)

**Linux/Mac:**
```bash
./start-backend.sh
```

**Windows:**
```bash
start-backend.bat
```

#### Option B: Manual setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

The backend API will be available at `http://localhost:5000`

## 📁 Project Structure

```
├── src/                    # React frontend source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── lib/               # Utilities
│   └── types/             # TypeScript types
├── backend/               # Flask backend
│   ├── app.py            # Main Flask application
│   ├── config.py         # Configuration
│   ├── requirements.txt  # Python dependencies
│   └── README.md         # Backend documentation
├── public/               # Static assets
└── dist/                # Build output
```

## 🛠️ Development Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run backend` - Start Flask backend
- `npm run start:backend` - Start backend with setup script

## 🔧 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components
- **Real-time Data**: Flask REST API backend
- **TypeScript**: Full type safety
- **Performance Optimized**: Removed unnecessary dependencies

## 📦 Dependencies Optimized

Removed unused packages to reduce bundle size:
- embla-carousel-react
- input-otp  
- react-day-picker
- react-resizable-panels
- recharts
- vaul
- cmdk
- @tailwindcss/typography
- lovable-tagger (debug tool)

## 🔗 API Endpoints

The Flask backend provides the following REST endpoints:

- `GET /api/vendors` - Wholesaler data
- `GET /api/budget-items` - Budget-friendly items
- `GET /api/recent-orders` - Recent orders
- `GET /api/reviews` - Vendor reviews
- `GET /api/categories` - Product categories
- `GET /api/inventory` - Inventory management
- `GET /api/pay-later` - Pay later service
- `POST /api/pay-later/enroll` - Enroll in pay later
- `POST /api/pay-later/repay` - Make repayment
- `GET /api/food-donations` - Food donations
- `POST /api/food-donations` - Create donation
- `GET /health` - Health check

## 🌐 Production Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to your web server
```

### Backend
```bash
cd backend
pip install -r requirements.txt
# Set FLASK_ENV=production
python app.py
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+) 
- Desktop (1024px+)
- Large screens (1400px+)

## 🎨 Theming

Uses a custom Tailwind CSS theme with:
- CSS custom properties for colors
- Gradient backgrounds
- Consistent shadows and borders
- Dark mode support (via next-themes)

## 🔒 Environment Variables

Create `.env` files for configuration:

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000
```

**Backend (backend/.env):**
```
SECRET_KEY=your-secret-key
FLASK_DEBUG=True
FLASK_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
