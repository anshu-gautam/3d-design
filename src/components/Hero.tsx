import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // GSAP animation for 3D text tilt effect
  useEffect(() => {
    if (!heroRef.current || !textRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const heroEl = heroRef.current;
      const textEl = textRef.current;

      if (heroEl && textEl) {
        const rect = heroEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const moveX = (clientX - centerX) / 25;
        const moveY = (clientY - centerY) / 25;

        gsap.to(textEl, {
          rotationY: moveX,
          rotationX: -moveY,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.5,
        });
      }
    };

    const handleMouseLeave = () => {
      if (textRef.current) {
        gsap.to(textRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const heroEl = heroRef.current;
    heroEl.addEventListener("mousemove", handleMouseMove);
    heroEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heroEl.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7,
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#1E293B",
      border: "1px solid #38BDF8",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const scrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={heroRef} className="w-full relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.span
            className="text-accent font-mono text-lg md:text-xl mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hello, welcome to my portfolio
          </motion.span>

          <motion.h1
            ref={textRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            style={{ transformStyle: "preserve-3d" }}
          >
            Creative <span className="text-accent">Digital</span> Experience
          </motion.h1>

          <motion.p
            className="text-text-secondary text-lg md:text-xl mb-8 max-w-lg"
            variants={descriptionVariants}
            initial="hidden"
            animate="visible"
          >
            A showcase of my projects and my abilities in creating immersive
            digital experiences through innovative design and development.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              className="btn bg-accent text-primary hover:bg-transparent hover:text-accent border-accent"
              whileHover="hover"
              onClick={scrollDown}
            >
              Explore My Work
            </motion.button>
            <motion.a href="#contact" className="btn" whileHover="hover">
              Get In Touch
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="hidden lg:flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: "easeOut",
          }}
        >
          {/* This will be a placeholder for a 3D model or animated visual */}
          <div className="w-[400px] h-[400px] relative animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary rounded-full blur-2xl opacity-60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl text-accent">3D</div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: [0, 1, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <button onClick={scrollDown} aria-label="Scroll down">
          <svg
            className="w-6 h-6 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;
