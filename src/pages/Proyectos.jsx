import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaPlayCircle, FaLock } from "react-icons/fa";
import SideNavbar from "../components/SideNavbar";

function TypewriterText({ text, speed = 60 }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <>
      {displayText}
      <span style={{ marginLeft: "2px", animation: "blink 1s infinite" }}>|</span>
      <style>{`@keyframes blink { 0%, 50%, 100% { opacity: 1; } 25%, 75% { opacity: 0; } }`}</style>
    </>
  );
}

function Proyectos() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDoc(doc(db, "profile", "main"));
        if (snap.exists()) {
          const data = snap.data();
          setProjects(
            data.projects?.length
              ? data.projects
              : [
                  {
                    name: "TEAssist",
                    summary: "Plataforma integral de seguimiento y asistencia para pacientes con autismo.",
                    stack: ["Laravel", "Tailwind CSS", "MySQL"],
                    link: "#",
                    github: "https://github.com/eormeno/teassist",
                  }
                ]
          );
        }
      } catch (err) {
        console.error("Error al cargar proyectos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <div className="relative min-h-screen w-full bg-[var(--bg-dark)] text-white overflow-hidden">
      <SideNavbar />

      <section className="relative z-[30] bg-[var(--bg-dark)] text-[var(--text-primary)] py-10">
  <div className="relative z-10 max-w-5xl mx-auto px-6 flex justify-center">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="font-black uppercase flex flex-col items-center w-full text-center"
      style={{ lineHeight: "0.8" }}
    >
      <span
        style={{
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          color: "#FFFFFF",
          letterSpacing: "0.3em",
          opacity: "0.9",
        }}
      >
        Mis
      </span>
      <span
        style={{
          fontSize: "clamp(4rem, 12vw, 8rem)",
          color: "var(--primary)",
          letterSpacing: "-0.06em",
        }}
      >
        <TypewriterText text="Proyectos" speed={55} />
      </span>
    </motion.h1>
  </div>
</section>
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-14 pb-24">
        {projects.length === 0 ? (
          <p className="text-center text-[var(--text-muted)] text-lg mt-10">
            No hay proyectos cargados aún.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {[...projects].reverse().map((project, i) => (
              <motion.div
                key={i} 
                className="relative w-full bg-[#121212] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col h-full group"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                  borderColor: "#FFC2C7",
                  boxShadow: "0 0 50px rgba(255,194,199,0.25)",
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-900 to-black overflow-hidden group">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-full h-full object-cover object-[center_0%] opacity-80 group-hover:opacity-100 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#FFC2C7] font-mono text-lg opacity-50 bg-gray-900 border-b border-[#2A2A2A]">
                      &lt; {project.name} /&gt;
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[#FFC2C7]">
                    {project.name}
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {(project.stack || []).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md border border-[#FFC2C7]/30 text-[#FFC2C7] bg-[#FFC2C7]/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="absolute top-55 right-3 flex flex-col items-end gap-2">
                    {project.featured && (
                      <span className="bg-[#FFC2C7] text-[#121212] text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-[0_0_15px_rgba(255,194,199,0.5)]">
                         Destacado
                      </span>
                    )}
                  </div>
                  
                  <div className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 space-y-3 flex-grow transition-colors duration-300 group-hover:text-white">
                    <p className="line-clamp-4"><strong className="text-[var(--text-primary)] transition-colors duration-300 group-hover:text-white">El Proyecto:</strong> {project.summary}</p>
                    {project.challenges && (
                      <p className="line-clamp-4"><strong className="text-[var(--text-primary)] transition-colors duration-300 group-hover:text-white">El Desafío:</strong> <span className="text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-white/80">{project.challenges}</span></p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-auto pt-5 border-t border-[#2A2A2A]">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex justify-center items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-[#FFC2C7] !text-black hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,194,199,0.5)] transition-all duration-300"
                      >
                        <FaPlayCircle className="text-lg" />
                        Ver Demo
                      </a>
                    )}

                    {project.link && project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex justify-center items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border border-[#FFC2C7] !text-[#FFC2C7] hover:bg-[#FFC2C7] hover:!text-black transition-all duration-300"
                      >
                        <FaExternalLinkAlt /> Web
                      </a>
                    )}

                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex justify-center items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border border-[#444] !text-gray-300 hover:border-[#FFC2C7] hover:!text-[#FFC2C7] hover:bg-[rgba(255,194,199,0.1)] transition-all duration-300"
                      >
                        <FaGithub className="text-lg" /> Código
                      </a>
                    ) : (
                      <span className="flex-1 flex justify-center items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border border-[#2A2A2A] bg-gray-900/50 text-gray-500 cursor-not-allowed">
                        <FaLock className="text-sm" /> Código Privado
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <style>{`
        @keyframes shine {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 0.7s;
        }
      `}</style>
    </div>
  );
}

export default Proyectos;