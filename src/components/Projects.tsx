import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

const projectData: Project[] = [
  {
    id: 1,
    title: "Immersive 3D Product Showcase",
    description:
      "An interactive 3D product configurator that allows users to customize and view products in real-time with realistic lighting and materials.",
    tags: ["Three.js", "WebGL", "React", "GLSL Shaders"],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    link: "#",
  },
  {
    id: 2,
    title: "Data Visualization Platform",
    description:
      "A dynamic dashboard that transforms complex datasets into intuitive, interactive visualizations that update in real-time.",
    tags: ["D3.js", "SVG Animation", "TypeScript", "API Integration"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "#",
  },
  {
    id: 3,
    title: "Generative Art Installation",
    description:
      "An algorithmic artwork that creates unique visual compositions based on user interaction and environmental data.",
    tags: [
      "Canvas API",
      "WebAudio",
      "Generative Algorithms",
      "Interactive Art",
    ],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "#",
  },
  {
    id: 4,
    title: "Virtual Reality Experience",
    description:
      "An immersive VR journey that combines storytelling with interactive elements, accessible through WebXR on modern browsers.",
    tags: ["WebXR", "Spatial Audio", "Three.js", "A-Frame"],
    image:
      "https://images.unsplash.com/photo-1626379953819-d83de4083dcf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    link: "#",
  },
  {
    id: 5,
    title: "Interactive Music Visualizer",
    description:
      "A responsive application that transforms music into stunning visual effects that react to frequency, amplitude, and beat detection.",
    tags: ["Web Audio API", "GSAP", "Canvas", "Audio Analysis"],
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "#",
  },
  {
    id: 6,
    title: "Experimental Portfolio Website",
    description:
      "A cutting-edge portfolio with unconventional navigation, micro-animations, and fluid transitions between sections.",
    tags: ["Framer Motion", "GSAP", "Experimental UI", "Custom Cursor"],
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    link: "#",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateY = (e.clientX - centerX) / 20;
    const rotateX = (centerY - e.clientY) / 20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card relative h-80 md:h-96 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotation}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${
          rotation.y
        }deg) scale(${isHovered ? 1.02 : 1})`,
      }}
    >
      {/* Image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent opacity-80"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 transition-transform duration-300">
        <motion.h3
          className="text-xl md:text-2xl font-bold text-white mb-2"
          animate={{ y: isHovered ? -8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="text-text-secondary text-sm mb-4 line-clamp-3"
          animate={{
            opacity: isHovered ? 1 : 0.7,
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {project.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          animate={{
            opacity: isHovered ? 1 : 0.5,
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-md"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.a
          href={project.link}
          className="inline-flex items-center text-accent font-mono text-sm"
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          View Project
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
};

const ProjectsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projectData.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

const Projects = () => {
  return (
    <div className="w-full">
      <motion.h2
        className="section-title mb-12"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h2>

      <ProjectsGrid />
    </div>
  );
};

export default Projects;
