import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  activeSection: string;
}

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/80 backdrop-blur-md py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div
            className="text-2xl font-mono font-bold text-text-primary"
            variants={itemVariants}
          >
            <span className="text-accent">&lt;</span>
            Portfolio
            <span className="text-accent">/&gt;</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav className="hidden md:block" variants={itemVariants}>
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link ${
                      activeSection === item.id ? "text-accent" : ""
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
                        layoutId="activeSection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col space-y-1.5 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variants={itemVariants}
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-6 h-0.5 bg-text-primary block"
              animate={
                isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-text-primary block"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-text-primary block"
              animate={
                isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.nav
        className="md:hidden fixed inset-0 bg-primary/95 backdrop-blur-lg z-40 flex items-center justify-center"
        initial={{ opacity: 0, x: "100%" }}
        animate={
          isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ul className="flex flex-col space-y-8 text-center">
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.3, delay: isMobileMenuOpen ? 0.1 : 0 }}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-2xl font-mono ${
                  activeSection === item.id
                    ? "text-accent"
                    : "text-text-primary"
                }`}
              >
                {item.label}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar;
