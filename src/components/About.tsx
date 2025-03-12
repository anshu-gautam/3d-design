import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  const [selectedTab, setSelectedTab] = useState("skills");

  const tabs = [
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "interests", label: "Interests" },
  ];

  const skills = [
    { name: "3D Graphics", level: 90, icon: "🎮" },
    { name: "UI/UX Design", level: 85, icon: "🎨" },
    { name: "Front-end Development", level: 80, icon: "💻" },
    { name: "Animation", level: 75, icon: "✨" },
    { name: "WebGL / Three.js", level: 85, icon: "🌐" },
    { name: "React", level: 90, icon: "⚛️" },
  ];

  const education = [
    {
      degree: "Master of Design",
      field: "Interactive Media",
      school: "Creative University",
      year: "2020-2022",
      description:
        "Focused on immersive digital experiences, interactive installations, and 3D web applications.",
    },
    {
      degree: "Bachelor of Science",
      field: "Computer Science",
      school: "Tech Institute",
      year: "2016-2020",
      description:
        "Specialized in computer graphics, digital media, and user experience design.",
    },
  ];

  const interests = [
    "Digital Art & Generative Design",
    "Immersive Technologies (AR/VR)",
    "Interactive Storytelling",
    "Experimental Web Design",
    "Creative Coding",
    "Digital Fabrication",
  ];

  const tabVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-secondary/30 backdrop-blur-sm p-6 rounded-xl border border-secondary mb-8">
            <motion.p className="text-text-primary text-lg leading-relaxed mb-4">
              I'm a{" "}
              <span className="text-accent font-semibold">
                creative developer
              </span>{" "}
              and{" "}
              <span className="text-accent font-semibold">
                digital designer
              </span>{" "}
              specializing in building immersive web experiences that blend
              cutting-edge technology with compelling storytelling.
            </motion.p>
            <motion.p className="text-text-secondary leading-relaxed">
              My work focuses on creating memorable digital experiences that
              push the boundaries of what's possible on the web. I combine
              technical expertise with a passion for design to craft interactive
              journeys that engage, delight, and inspire.
            </motion.p>
          </div>

          <motion.div
            className="w-full h-72 relative bg-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-secondary"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-accent/30 opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-secondary/30 backdrop-blur-sm p-6 rounded-xl border border-secondary">
            <nav className="flex border-b border-secondary mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-2 px-4 font-mono relative ${
                    selectedTab === tab.id
                      ? "text-accent"
                      : "text-text-secondary"
                  }`}
                >
                  {tab.label}
                  {selectedTab === tab.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {selectedTab === "skills" && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        className="relative"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="mr-2">{skill.icon}</span>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-text-secondary">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-primary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.3,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {selectedTab === "education" && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {education.map((edu, index) => (
                      <motion.div
                        key={edu.degree}
                        variants={itemVariants}
                        className={`pb-5 ${
                          index !== education.length - 1
                            ? "border-b border-secondary mb-5"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-lg text-accent">
                            {edu.degree}
                          </h3>
                          <span className="text-sm text-text-secondary bg-primary px-2 py-1 rounded-md">
                            {edu.year}
                          </span>
                        </div>
                        <h4 className="text-text-primary mb-1">{edu.field}</h4>
                        <p className="text-sm text-text-secondary mb-2">
                          {edu.school}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {edu.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {selectedTab === "interests" && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 gap-4"
                  >
                    {interests.map((interest) => (
                      <motion.div
                        key={interest}
                        variants={itemVariants}
                        className="bg-primary p-3 rounded-lg text-center"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(56, 189, 248, 0.1)",
                        }}
                      >
                        <span className="text-text-primary">{interest}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
