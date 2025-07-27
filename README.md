# 🛒 Sahaayak - Lightweight Offline Version

A simplified, lightweight wholesale food marketplace with multi-language support and theme switching.

## ⚡ Quick Start

### Development Mode (Frontend Only)
```bash
npm run dev
```
Runs on `http://localhost:8080` with mock data

### Production Mode (Full Stack)
```bash
python app.py
```
Builds frontend and starts Flask backend on `http://localhost:5000`

## 🌟 Features

### 🎨 **Theme Switching**
- Click "Switch Theme" in sidebar to toggle between light/dark mode
- Uses `next-themes` for persistent theme storage

### 🌍 **Multi-Language Support**
- **English (EN)** - Default
- **Hindi (हिंदी)** - Complete translation
- **Marathi (मराठी)** - Complete translation
- Click "Language" in sidebar to cycle through languages

### 📱 **Responsive Design**
- Mobile-first approach
- Works on all devices (320px to 2560px+)
- Collapsible sidebar with proper logo visibility

## 🔧 Development

### Frontend Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Full Stack Development
```bash
# Option 1: Single command (builds + runs)
python app.py

# Option 2: Manual steps
npm run build
cd backend && python app.py

# Option 3: Platform scripts
./run.sh        # Linux/Mac
run.bat         # Windows
python run.py   # Cross-platform
```

## 📂 Project Structure

```
├── src/
│   ├── components/          # React components
│   ├── contexts/           # Language context
│   ├── pages/              # Page components
│   ├── services/           # API services (with mock fallback)
│   └── lib/                # Utilities
├── backend/                # Flask backend
│   ├── app.py             # Main Flask app
│   └── README.md          # Backend docs
├── app.py                 # Single-command startup
└── dist/                  # Built React app
```

## 🎯 Language Implementation

### Switching Languages
The sidebar "Language" button cycles through:
1. **English** → **Hindi** → **Marathi** → **English**

### Adding Translations
Edit `src/contexts/LanguageContext.tsx`:

```typescript
const translations = {
  en: { 'key': 'English text' },
  hi: { 'key': 'हिंदी टेक्स्ट' },
  mr: { 'key': 'मराठी मजकूर' }
};
```

### Using Translations
```typescript
import { useLanguage } from '@/contexts/LanguageContext';

const Component = () => {
  const { t } = useLanguage();
  return <h1>{t('nav.welcome')}</h1>;
};
```

## 🎨 Theme Implementation

### Manual Theme Switching
```typescript
import { useTheme } from 'next-themes';

const Component = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return <button onClick={toggleTheme}>Toggle Theme</button>;
};
```

## 🔄 API Architecture

### Development Mode
- Uses mock data when backend unavailable
- Automatic fallback to local data
- All UI features work without backend

### Production Mode
- Full Flask REST API
- Real-time data processing
- Database integration ready

## 📊 Performance Optimizations

- **Bundle Size:** ~892KB (254KB gzipped)
- **Dependencies:** Minimized to essential packages only
- **Loading:** Fast initial render with mock data
- **Memory:** Optimized React context usage

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Vite (build tool)
- next-themes (theme switching)

**Backend:**
- Flask + Python
- CORS enabled
- Static file serving

## VS Code Usage

1. Open project in VS Code
2. Open terminal (`Ctrl+` `)
3. Run development: `npm run dev`
4. Or run production: `python app.py`

## 📱 Mobile Features

- Touch-friendly sidebar navigation
- Responsive categories grid
- Mobile-optimized typography
- Gesture support for theme/language switching

## 🌐 Offline Support

- Works completely offline in development mode
- Service worker ready for PWA conversion
- Local storage for preferences
- Mock data ensures functionality

## 🔐 Security

- No external API calls in dev mode
- CORS properly configured
- XSS protection with React
- Safe HTML rendering

---

**Sahaayak** - Your reliable wholesale marketplace companion! 🚀
