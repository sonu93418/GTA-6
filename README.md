# GTA VI - Vice City Stories Landing Page

A cinematic, scroll-driven storytelling landing page inspired by the official GTA 6 website, built with React and modern web technologies.

## ✨ Features

- **AAA Game Launch Feel** - Premium cinematic experience
- **Scroll-Driven Animations** - 230-frame hero animation that responds to scroll
- **Neon Vice City Aesthetic** - High-contrast visuals with neon accents
- **Smooth Transitions** - Powered by Framer Motion
- **Butter-Smooth Scrolling** - Lenis smooth scroll library
- **4 Character Sections** - Jason, Lucia, Raul, and Real Dimez
- **Parallax Effects** - Multiple layers with depth
- **Responsive Design** - Works on all devices
- **Fast Static Export** - Optimized Vite build

## 🚀 Tech Stack

- **React 18** - Component-based UI
- **Vite** - Lightning-fast build tool
- **Framer Motion** - Production-ready animations
- **Lenis** - Smooth scroll library
- **React Intersection Observer** - Viewport detection
- **CSS3** - Modern styling with CSS variables

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🔧 Development

```bash
# Start development server
npm run dev
```

The site will open at `http://localhost:3000`

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build
```

This creates a `dist/` folder with all static files ready for deployment.

## 👀 Preview Production Build

```bash
# Preview the built site
npm run preview
```

## 📁 Project Structure

```
GTA/
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx/css    # Initial loading animation
│   │   ├── Navigation.jsx/css       # Top navigation bar
│   │   ├── HeroSection.jsx/css      # 230-frame scroll animation
│   │   ├── CharacterSection.jsx/css # Character showcase
│   │   └── FinalSection.jsx/css     # Call-to-action
│   ├── App.jsx                      # Main app component
│   ├── App.css                      # App styles
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── assets/                          # Images and media
│   ├── hero section/                # 230 animation frames
│   ├── page -1 Jason Duval/
│   ├── page-2 Lucia Caminos/
│   ├── page-3 Raul Bautista/
│   └── page-4 Real Dimez/
├── index.html                       # HTML template
├── package.json                     # Dependencies
└── vite.config.js                   # Vite configuration

```

## 🎨 Key Features Explained

### Hero Section
- 230 PNG frames loaded dynamically
- Canvas-based rendering for performance
- Scroll-synced frame progression
- Smooth fade-out on scroll

### Character Sections
- Alternating left/right layouts
- Parallax image effects
- Animated stat bars
- Hover interactions
- Smooth fade-in animations

### Smooth Scroll
- Lenis library for buttery-smooth scrolling
- Custom easing curves
- Touch-optimized

### Loading Screen
- Simulated loading with progress bar
- Neon glow effects
- Smooth fade-out transition

## 🌐 Deployment

The built site is a pure static site that can be deployed to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop the `dist/` folder
- **GitHub Pages**: Enable Pages and point to `dist/`
- **Any static host**: Upload `dist/` contents

## 🎯 Performance Optimizations

- Code splitting with Vite
- Lazy image loading
- Optimized bundle sizes
- Minified CSS/JS
- Tree-shaking
- Asset compression

## 🎮 Characters

1. **Jason Duval** - The Wheelman
2. **Lucia Caminos** - The Mastermind  
3. **Raul Bautista** - The Hacker
4. **Real Dimez** - The Enforcer

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🛠️ Customization

### Change Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --neon-pink: #ff006e;
  --neon-blue: #00f5ff;
  --neon-purple: #8b00ff;
  --neon-yellow: #ffea00;
}
```

### Add More Characters
Update the `characters` array in `src/App.jsx`

### Adjust Animation Speed
Modify Lenis duration in `src/App.jsx`:
```javascript
const lenis = new Lenis({
  duration: 1.2, // Adjust this value
})
```

## 📄 License

This is a demo project for educational purposes.

## 🙏 Credits

- Inspired by official GTA 6 marketing
- Fonts: Bebas Neue, Oswald
- Built with ❤️ using React & Vite

---

**Enjoy the ride through Vice City! 🌴🌆**
# GTA-6
