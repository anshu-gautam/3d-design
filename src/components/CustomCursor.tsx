import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseDown = () => setCursorVariant("click");
    const handleMouseUp = () => setCursorVariant("default");

    const handleLinkHover = () => setCursorVariant("hover");
    const handleLinkLeave = () => setCursorVariant("default");

    const handleProjectHover = () => setCursorVariant("project");
    const handleProjectLeave = () => setCursorVariant("default");

    // Add event listeners
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Add listeners for links and buttons
    const links = document.querySelectorAll("a, button, .btn");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover);
      link.addEventListener("mouseleave", handleLinkLeave);
    });

    // Add listeners for project cards
    const projects = document.querySelectorAll(".project-card");
    projects.forEach((project) => {
      project.addEventListener("mouseenter", handleProjectHover);
      project.addEventListener("mouseleave", handleProjectLeave);
    });

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover);
        link.removeEventListener("mouseleave", handleLinkLeave);
      });

      projects.forEach((project) => {
        project.removeEventListener("mouseenter", handleProjectHover);
        project.removeEventListener("mouseleave", handleProjectLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "#38BDF8",
      mixBlendMode: "difference" as const,
      opacity: 0.8,
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "#38BDF8",
      mixBlendMode: "difference" as const,
      opacity: 0.5,
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "transparent",
      border: "2px solid #38BDF8",
      mixBlendMode: "normal" as const,
      opacity: 0.8,
    },
    project: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      height: 50,
      width: 50,
      backgroundColor: "transparent",
      border: "2px solid #38BDF8",
      mixBlendMode: "normal" as const,
      opacity: 0.6,
      scale: 1.1,
    },
  };

  return (
    <motion.div
      className="cursor fixed top-0 left-0 rounded-full pointer-events-none z-50"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    />
  );
};

export default CustomCursor;
