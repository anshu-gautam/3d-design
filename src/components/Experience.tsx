import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const experiences = [
  {
    title: "Senior Interactive Developer",
    company: "Creative Digital Studio",
    period: "2022 - Present",
    description:
      "Lead the development of award-winning interactive web experiences for high-profile clients. Specialized in WebGL and 3D web applications.",
    technologies: ["Three.js", "WebGL", "React", "GSAP", "Blender"],
    color: "#38BDF8",
  },
  {
    title: "UI/UX Developer",
    company: "Tech Innovations",
    period: "2020 - 2022",
    description:
      "Designed and developed user interfaces for web and mobile applications with a focus on micro-interactions and seamless experiences.",
    technologies: ["React", "Framer Motion", "Figma", "SCSS", "TypeScript"],
    color: "#A78BFA",
  },
  {
    title: "Front-end Developer",
    company: "Digital Agency",
    period: "2018 - 2020",
    description:
      "Created responsive websites and interactive elements for various client projects, focusing on performance and browser compatibility.",
    technologies: ["JavaScript", "CSS3", "HTML5", "GSAP", "Webpack"],
    color: "#34D399",
  },
  {
    title: "Web Design Intern",
    company: "Design Studio",
    period: "2017 - 2018",
    description:
      "Assisted senior designers in creating visual assets and implementing designs for client websites. Learned industry best practices.",
    technologies: ["Adobe XD", "HTML/CSS", "JavaScript", "WordPress"],
    color: "#F87171",
  },
];

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className={`relative mb-12 ${
        index % 2 === 0 ? "ml-auto pr-10" : "mr-auto pl-10"
      } w-full md:w-1/2`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Dot on timeline */}
      <motion.div
        className="absolute top-0 w-5 h-5 rounded-full"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={{
          backgroundColor: experience.color,
          left: index % 2 === 0 ? "-2.5rem" : "auto",
          right: index % 2 === 1 ? "-2.5rem" : "auto",
        }}
      />

      {/* Line connecting to next item */}
      {index < experiences.length - 1 && (
        <motion.div
          className="absolute w-0.5 h-full min-h-[100px]"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            backgroundColor: experience.color,
            top: "1.25rem",
            left: index % 2 === 0 ? "-1rem" : "auto",
            right: index % 2 === 1 ? "-1rem" : "auto",
          }}
        />
      )}

      <div
        className="bg-secondary/30 backdrop-blur-sm p-6 rounded-xl border border-secondary hover:border-opacity-50 transition-all duration-300"
        style={{
          borderColor: experience.color,
          borderTopWidth: "3px",
        }}
      >
        <h3 className="text-xl font-bold text-text-primary mb-1">
          {experience.title}
        </h3>
        <div className="flex justify-between mb-3">
          <span className="font-mono text-accent">{experience.company}</span>
          <span className="text-sm text-text-secondary bg-primary px-2 py-0.5 rounded-md">
            {experience.period}
          </span>
        </div>
        <p className="text-text-secondary mb-4">{experience.description}</p>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-md"
              style={{
                backgroundColor: `${experience.color}20`,
                color: experience.color,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="w-full">
      <motion.h2
        className="section-title mb-16"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Work Experience
      </motion.h2>

      <div className="relative">
        {/* Main timeline */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 top-0 w-0.5 h-full bg-secondary"
          style={{
            scaleY: scrollYProgress,
            originY: 0,
          }}
        />

        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.title}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
