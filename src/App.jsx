  import { useEffect, useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import BlurText from "./components/BlurText";
  import Navbar from "./Navbar";
  import CurvedLoop from "./components/CurvedLoop";

  function App() {
    const [showAbout, setShowAbout] = useState(false);
    const [showWorks, setShowWorks] = useState(false);
    const [showSkills, setShowSkills] = useState(false);
    const [showContact, setShowContact] = useState(false);



    useEffect(() => {
      const timer = setTimeout(() => {
        setShowAbout(true);
      }, 6000);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      if (showAbout) {
        const timer = setTimeout(() => setShowWorks(true), 1200);
        return () => clearTimeout(timer);
      }
    }, [showAbout]);

    useEffect(() => {
      if (showWorks) {
        const timer = setTimeout(() => setShowSkills(true), 1200);
        return () => clearTimeout(timer);
      }
    }, [showWorks]);

    useEffect(() => {
      if (showSkills) {
        const timer = setTimeout(() => setShowContact(true), 1200);
        return () => clearTimeout(timer);
      }
    }, [showSkills]);

    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        {/* Navbar (only show after landing animation is done) */}
        {showAbout && <Navbar />}
        {/* Landing -> About */}
        <AnimatePresence mode="wait">
          {!showAbout ? (
            <motion.div
              key="landing"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col justify-center items-center"
            >
              <BlurText
                text="Nigel Shillingford"
                globalDelay={0}
                delay={150}
                animateBy="letters"
                direction="top"
                className="text-5xl sm:text-xs md:text-sm lg:text-5xl text-[#413A3A] mb-1 font-light"
              />
              <BlurText
                text="Software Developer"
                globalDelay={3100}
                delay={0}
                animateBy="words"
                direction="top"
                className="text-lg text-[#413A3A]"
              />
            </motion.div>
          ) : (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="min-h-screen flex flex-col md:flex-row items-center gap-10 p-10"
            >
              <div
                className="h-full w-full max-w-[1600px] mx-auto px-8 md:px-20 lg:px-32 py-20 mt-20 
                  flex flex-col md:flex-row justify-between items-center gap-16"
              >
                <div className="max-w-3xl text-center md:text-left">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl text-[#413A3A] font-black mb-8">
                    ABOUT ME
                  </h2>
                  <p className="text-base md:text-xl lg:text-2xl text-[#413A3A] leading-relaxed">
                    Hi, I'm Nigel Shillingford, I'm an aspiring{" "}
                    <span className="font-medium">software developer</span> with a
                    desire to build , <span className="font-medium">sleek</span> ,
                    <span className="font-medium"> creative</span> and{" "}
                    <span className="font-medium">user-focused</span> web
                    applications.
                  </p>
                  <div className="flex gap-4 mt-6 justify-center md:justify-start">
                    <a
                      href="https://github.com/xiaolingford"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="./github.svg"
                        alt="First Icon"
                        width={44}
                        height={44}
                        className="cursor-pointer hover:scale-110 transition-transform"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nigel-shillingford-87b819380/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="./LinkedIn.svg"
                        alt="Second Icon"
                        width={44}
                        height={44}
                        className="cursor-pointer hover:scale-110 transition-transform"
                      />
                    </a>
                    <a
                      href="mailto:nigelshillingford21@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="./gmail.svg"
                        alt="Third Icon"
                        width={44}
                        height={44}
                        className="cursor-pointer hover:scale-110 transition-transform"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <img
                    src="/Portfolio_Picture.png"
                    alt="Nigel"
                    className="rounded-2xl w-26 md:w-80 lg:w-[18rem] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      {/* Works Section */}
  {showWorks && (
    <div
      id="works"
      className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-10"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full mb-16"
      >
        <h2 className="flex-center text-6xl text-[#413A3A] font-black mb-2">
          PROJECTS
        </h2>
      </motion.div>

      {/* Projects Grid + Loop */}
<div className="relative w-full max-w-6xl flex flex-col items-center">
  {/* Cards in grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
    {[
      {
        title: "Snake Game",
        image: "/snake.jpg",
        description: "Basic Snake game made with Java",
        demoLink: "#",
        codeLink: "https://github.com/Xiaolingford/Snake-Game",
        tech: ["/java.svg"],
      },
      {
        title: "To do List",
        image: "/Todo.jpg",
        description:
          "To do list with frontend and API for login and signup as well as todolist items",
        demoLink: "#",
        codeLink: "https://github.com/Xiaolingford/TodoFinal",
        tech: ["/Maui.svg", "/csharp.svg"],
      },
      {
        title: "Csv to 3 different Graphs",
        image: "/data.jpg",
        description:
          "Data analytics assignment, converting csv data into sankey, bar and pentagram graphs, pair work",
        demoLink: "#",
        codeLink: "https://github.com/Bonbon711/PLOTS",
        tech: ["/python.svg"],
      },
      {
        title: "Microplastic Detection and Classification",
        image: "/microplastic.jpg",
        description: "My thesis currently in progress",
        demoLink: "#",
        codeLink: "https://github.com/Xiaolingford/Pomeranians",
        tech: ["/python.svg"],
      },
    ].map((project, index) => (
      <motion.div
        key={index}
        layoutId={`card-${index}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05, zIndex: 50 }}
        whileHoverTransition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer mx-auto"
        onClick={() => setActiveProject({ ...project, index })}
      >
        {/* Project Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-center text-center text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm mb-4">{project.description}</p>
          <div className="flex flex-col items-center gap-2">
            {/* GitHub Button */}
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded-lg hover:bg-gray-200 transition"
            >
              <img
                src="/github.svg"
                alt="GitHub Repo"
                className="w-6 h-6"
              />
            </a>
            {/* Tech Stack */}
            <div className="flex gap-3 mt-2 flex-wrap justify-center">
              {project.tech?.map((tech, i) => (
                <img
                  key={i}
                  src={tech}
                  alt="Tech Icon"
                  className="w-8 h-8 bg-white p-1 rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div>
</div>
  )}

        
        {/* Contact Section */}
{showContact && (
  <motion.div
    id="contact"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.2 }}
    className="min-h-screen w-full flex flex-col items-center justify-center px-6"
  >
    {/* Top Curved Loop */}
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full mb-6"
    >
      <CurvedLoop
        icons={[
          "./Maui.svg",
          "./Javascript.svg",
          "./React.svg",
          "./vite.svg",
          "./html5.svg",
          "./css3.svg",
          "./python.svg",
          "./csharp.svg",
          "./c.svg",
          "./java.svg",
          "./nodejs.svg",
          "./threejs.svg",
        ]}
        size={65}
        gap={120}
        speed={0.5}
        curveAmount={0}
        direction="left"
        interactive={true}
      />
    </motion.div>

    {/* Title */}
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-extrabold text-[#413A3A] mb-6"
    >
      Contact Me
    </motion.h2>

    {/* Contact Info */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-3 text-center"
    >
      <a
        href="mailto:nigelshillingford21@gmail.com"
        className="text-lg md:text-xl text-[#413A3A] hover:underline"
      >
        nigelshillingford21@gmail.com
      </a>
      <a
        href="https://www.linkedin.com/in/nigel-shillingford-87b819380/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg md:text-xl text-[#413A3A] hover:underline"
      >
        LinkedIn
      </a>
    </motion.div>

    {/* Bottom Curved Loop */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full mt-8"
    >
      <CurvedLoop
        icons={[
          "./Maui.svg",
          "./Javascript.svg",
          "./React.svg",
          "./vite.svg",
          "./html5.svg",
          "./css3.svg",
          "./python.svg",
          "./csharp.svg",
          "./c.svg",
          "./java.svg",
          "./nodejs.svg",
          "./threejs.svg",
        ]}
        size={65}
        gap={120}
        speed={0.5}
        curveAmount={0}
        direction="right"
        interactive={true}
      />
    </motion.div>
  </motion.div>
  )}
      </div>
    );
  }

  export default App;
