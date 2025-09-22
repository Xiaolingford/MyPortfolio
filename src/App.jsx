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
              className="text-5xl sm:text-sm md:text-xl lg:text-5xl text-[#413A3A] mb-1 font-light"
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full  mb-16"
          >
            <h2 className="text-5xl text-[#413A3A] font-bold mb-2 mr-auto">
              Works
            </h2>
            <div className="w-42 h-[0.1rem] bg-[#413A3A] rounded"></div>
          </motion.div>

          {/* Projects Grid */}
          <div className="flex flex-wrap justify-center gap-10 max-w-6xl">
            {[
              {
                title: "Portfolio Website",
                image: "/Tom3.png",
                description:
                  "A modern personal portfolio built with React and Tailwind.",
                demoLink: "#",
                codeLink: "#",
              },
              {
                title: "E-Commerce App",
                image: "/Tom2.png",
                description:
                  "Full-stack shop with cart, checkout, and Stripe integration.",
                demoLink: "#",
                codeLink: "#",
              },
              {
                title: "AI Chatbot",
                image: "/Tom1.png",
                description: "Conversational AI bot powered by OpenAI API.",
                demoLink: "#",
                codeLink: "#",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.2,
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative w-72 h-96 rounded-2xl overflow-hidden shadow-lg group"
              >
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-center text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm mb-4">{project.description}</p>
                  <div className="flex gap-3">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      className="bg-white text-black px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.codeLink}
                      target="_blank"
                      className="bg-white text-black px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      {/* Skills Section */}
      {showSkills && (
        <div
          id="skills"
          className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-10"
        >
          {/* Title aligned left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full  mb-16 mr-auto"
          >
            <h2 className="text-5xl text-[#413A3A] font-bold mb-4">Skills</h2>
            <div className="w-32 h-[0.1px] bg-[#413A3A] rounded"></div>
          </motion.div>

          <CurvedLoop
            marqueeText="C ✦ C# ✦ Java ✦ Python ✦ HTML ✦ CSS ✦"
            speed={0.6}
            curveAmount={0}
            direction="left"
            interactive={true}
            className="fill-[#413A3A] text-[3rem] font-semibold tracking-tight"
          />
          <CurvedLoop
            marqueeText="javascript ✦ React ✦ Node.js ✦ Express ✦ Git ✦"
            speed={0.6}
            curveAmount={0}
            direction="right"
            interactive={true}
            className="fill-[#413A3A] text-[3rem] font-semibold tracking-tight"
          />
        </div>
      )}
      {/* Contact Section */}
      {showContact && (
        <div
          id="contact"
          className="min-h-screen w-full flex flex-col items-center justify-center px-6"
        >
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#413A3A] mb-6">
            Contact Me
          </h2>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-3 text-center">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
