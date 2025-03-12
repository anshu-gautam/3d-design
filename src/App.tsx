import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

// Custom components
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import LoadingScreen from "./components/LoadingScreen";
import BackgroundScene from "./scenes/BackgroundScene";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle section change on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollY = window.scrollY;

        if (
          scrollY >= sectionTop - 100 &&
          scrollY < sectionTop + sectionHeight - 100
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="fixed inset-0 -z-10">
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={null}>
                  <BackgroundScene />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                  />
                </Suspense>
              </Canvas>
            </div>

            <Navbar activeSection={activeSection} />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
              <section id="hero" className="min-h-screen flex items-center">
                <Hero />
              </section>

              <section id="about" className="min-h-screen py-20">
                <About />
              </section>

              <section id="experience" className="min-h-screen py-20">
                <Experience />
              </section>

              <section id="projects" className="min-h-screen py-20">
                <Projects />
              </section>

              <section id="contact" className="min-h-screen py-20">
                <Contact />
              </section>
            </main>

            <footer className="py-6 bg-secondary/60 backdrop-blur-md">
              <div className="container mx-auto px-4 text-center text-text-secondary">
                <p>© {new Date().getFullYear()} | Designed & Built with ❤️</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
