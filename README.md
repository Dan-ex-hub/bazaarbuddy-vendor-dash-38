# 🛒 Sahaayak - Lightweight Offline Version

A simplified, lightweight wholesale food marketplace that runs completely offline with a single command.

## ⚡ Quick Start (One Command)

### Option 1: Python Script (Recommended)
```bash
python run.py
```

### Option 2: Platform-specific scripts
**Windows:**
```bash
run.bat
```

**Linux/Mac:**
```bash
./run.sh
```

### Option 3: NPM Script
```bash
npm start
```

That's it! Your app will be available at `http://localhost:5000`

## 🎯 What This Does

1. **Installs dependencies** (Node.js + Python packages)
2. **Builds the React frontend** (optimized production build)
3. **Starts Flask backend** (serves both API and frontend)
4. **Opens on single port** (5000) - no CORS issues!

## 📦 Lightweight & Optimized

**Removed unnecessary packages:**
- ❌ React Query (replaced with simple fetch)
- ❌ 15+ unused Radix UI components 
- ❌ Carousel, Charts, Date picker, etc.
- ❌ All Lovable debugging tools

**Result:** ~50% smaller bundle size, faster loading!

## 🏗️ Simple Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   React Build   │    │   Flask API     │
│   (Static)      │◄───┤   /api/*        │
│   Served by     │    │                 │
│   Flask         │    │   Serves React  │
└─────────────────┘    └─────────────────┘
        📍 http://localhost:5000
```

## 🔧 Manual Setup (if needed)

### Prerequisites
- Python 3.7+
- Node.js 16+

### Manual Steps
```bash
# 1. Install Node dependencies
npm install

# 2. Build React app
npm run build

# 3. Install Python packages
pip install flask flask-cors python-dotenv

# 4. Start server
cd backend && python app.py
```

## 📂 Project Structure

```
├── src/                 # React source (simplified)
├── backend/
│   └── app.py          # Flask server (serves everything)
├── dist/               # Built React app
├── run.py              # One-command startup
├── run.sh              # Linux/Mac script
└── run.bat             # Windows script
```

## 🚀 Features

✅ **Responsive Design** - Works on all devices  
✅ **Offline Ready** - No internet required  
✅ **Single Port** - Everything on localhost:5000  
✅ **Fast Loading** - Optimized bundle size  
✅ **Simple Setup** - One command to rule them all  

## 📱 App Features

- 🏪 **Vendor Management** - Browse wholesalers
- 💰 **Budget Items** - Find deals with filters
- 📦 **Inventory** - Track your stock
- ⭐ **Reviews** - Rate suppliers
- 💳 **Pay Later** - Credit system
- 🎁 **Food Donations** - Reduce waste

## 🔧 Development

```bash
# Development mode (frontend only)
npm run dev

# Build for production
npm run build

# Run backend only
npm run backend
```

## 📊 Performance Optimizations

- **Bundle Size:** Reduced by ~50%
- **Dependencies:** Cut from 60+ to 20 essential packages
- **Loading:** Faster initial load with minimal JS
- **Memory:** Lower memory footprint

## 🛠️ Tech Stack

**Frontend:** React + TypeScript + Tailwind CSS  
**Backend:** Flask + Python  
**Build:** Vite (fast builds)  
**UI:** Minimal Radix UI components  

## 🎯 VS Code Usage

1. Open project in VS Code
2. Open terminal (`Ctrl+` `)
3. Run: `python run.py`
4. Visit: `http://localhost:5000`

**That's it! No complex setup, no multiple terminals, no configuration.**

## 🔒 Offline & Secure

- ✅ No external API calls
- ✅ No tracking or analytics
- ✅ All data stays local
- ✅ No internet required after setup

## 📄 License

MIT License - Use freely for personal/commercial projects.
