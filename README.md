# 3D Interactive Portfolio

A modern, futuristic portfolio website with 3D interactive elements, custom cursor, smooth animations, and an immersive user experience.

![Portfolio Preview](preview.png)

## Features

- **Interactive 3D Background**: Dynamic starfield and floating grid using Three.js
- **Custom Mouse Cursor**: Context-aware cursor that changes based on interaction
- **Smooth Animations**: Page transitions, scroll-based animations, and hover effects
- **Responsive Design**: Fully adaptable across all device sizes
- **Interactive Project Cards**: 3D tilt effect on hover
- **Dynamic Timeline**: Animated work experience timeline
- **Tab-based Content**: Interactive information sections in the About page
- **Contact Form**: Interactive form with status animations
- **Dynamic Navigation**: Highlights current section while scrolling

## Tech Stack

- **React + Vite + TypeScript**: Core framework and language
- **Three.js / React Three Fiber**: 3D rendering and effects
- **Framer Motion**: Animation library
- **GSAP**: Advanced animations and interactions
- **Tailwind CSS**: Styling and responsive design

## Getting Started

### Prerequisites

- Node.js (v14.0 or higher)
- npm or yarn

### Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
portfolio/
├── public/           # Static assets
├── src/
│   ├── assets/       # Images and other resources
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── scenes/       # Three.js scenes
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main application component
│   ├── main.tsx      # Application entry point
│   └── index.css     # Global styles
└── ...               # Config files
```

## Customization

### Changing Colors

Edit the Tailwind configuration in `tailwind.config.js` to modify the color palette:

```js
theme: {
  extend: {
    colors: {
      'primary': '#0F172A',       // Background color
      'secondary': '#1E293B',     // Secondary background
      'accent': '#38BDF8',        // Accent color
      'text-primary': '#F8FAFC',  // Primary text
      'text-secondary': '#94A3B8' // Secondary text
    },
    // ...
  }
}
```

### Adding Projects

Update the project data in `src/components/Projects.tsx` to add your own projects:

```typescript
const projectData: Project[] = [
  {
    id: 1,
    title: 'Your Project Title',
    description: 'Description of your project...',
    tags: ['Technology 1', 'Technology 2'],
    image: 'path/to/image.jpg',
    link: 'https://project-link.com'
  },
  // Add more projects...
];
```

### Updating Experience

Modify the experience data in `src/components/Experience.tsx`:

```typescript
const experiences = [
  {
    title: 'Your Job Title',
    company: 'Company Name',
    period: 'Year - Year',
    description: 'Description of your role...',
    technologies: ['Skill 1', 'Skill 2'],
    color: '#ColorHex',
  },
  // Add more experiences...
];
```

## Deployment

To build for production:

```bash
npm run build
```

This will generate optimized files in the `dist` directory which can be deployed to any static site hosting service like Netlify, Vercel, GitHub Pages, etc.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Three.js](https://threejs.org/)
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [Vite](https://vitejs.dev/)
