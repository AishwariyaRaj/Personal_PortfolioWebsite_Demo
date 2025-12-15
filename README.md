# Aishwariya D - 3D Interactive Portfolio

A modern, high-performance 3D interactive portfolio website built with React, Three.js (React Three Fiber), and GSAP animations.

## 🚀 Features

- **3D Interactive Experience**: Stunning 3D visuals with floating geometric shapes, particle fields, and smooth animations
- **Scroll-based Animations**: GSAP-powered scroll animations for engaging user experience
- **Responsive Design**: Fully responsive across all devices
- **Modern UI**: Clean, futuristic design with glass morphism effects
- **Performance Optimized**: Low-poly 3D models and optimized rendering
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Three.js / React Three Fiber** - 3D Graphics
- **@react-three/drei** - Three.js helpers
- **GSAP** - Animations
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── Scene.jsx          # Main 3D scene
│   │   │   ├── FloatingGeometry.jsx # Hero 3D objects
│   │   │   ├── ParticleField.jsx   # Background particles
│   │   │   └── SkillsOrbit.jsx     # Orbiting skill icons
│   │   ├── sections/
│   │   │   ├── Hero.jsx           # Hero section
│   │   │   ├── About.jsx          # About section
│   │   │   ├── Projects.jsx       # Projects showcase
│   │   │   ├── Skills.jsx         # Skills & expertise
│   │   │   └── Contact.jsx        # Contact section
│   │   └── ui/
│   │       ├── Navbar.jsx         # Navigation bar
│   │       ├── Footer.jsx         # Footer
│   │       ├── Loader.jsx         # Loading screen
│   │       └── CustomCursor.jsx   # Custom cursor
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Import the repository on [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
```js
colors: {
  accent: {
    cyan: '#00f5ff',
    purple: '#a855f7',
    pink: '#ec4899',
  }
}
```

### 3D Objects
Modify `src/components/3d/FloatingGeometry.jsx` to change the 3D hero elements.

### Content
Update the content in section components under `src/components/sections/`.

## ⚡ Performance Tips

1. **3D Performance**: The 3D scene uses low-poly geometry and optimized materials
2. **Image Optimization**: Use WebP format for images
3. **Code Splitting**: Vite automatically code-splits for optimal loading
4. **Lazy Loading**: 3D components are wrapped in Suspense

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 👤 Author

**Aishwariya D**
- GitHub: [@AishwariyaRaj](https://github.com/AishwariyaRaj)
- LinkedIn: [aishwariya-dharmaraj](https://www.linkedin.com/in/aishwariya-dharmaraj/)
- Email: aishwariya229@gmail.com

## 📄 License

This project is open source and available under the MIT License.
