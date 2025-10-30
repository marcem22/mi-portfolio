import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import SideNavbar from "../components/SideNavbar";

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
                    summary:
                      "Plataforma integral de seguimiento y asistencia para pacientes con autismo. Desarrollada con Laravel, Tailwind y MySQL. Ofrece herramientas para terapeutas y familias, facilitando el monitoreo del progreso y la gestión de terapias personalizadas.",
                    stack: [
                      "Laravel",
                      "PHP",
                      "MySQL",
                      "Blade",
                      "Tailwind CSS",
                      "Vite",
                      "JavaScript",
                    ],
                    link: "#",
                    github: "https://github.com/eormeno/teassist/tree/mancini",
                  },
                  {
                    name: "Hábitos +",
                    summary:
                      "Plataforma web para crear y seguir hábitos saludables de forma visual y motivadora. Permite establecer metas personalizadas, registrar progreso diario y visualizar la evolución mediante una interfaz intuitiva.",
                    stack: [
                      ".NET 9",
                      "C#",
                      "JavaScript",
                      "Bootstrap",
                      "Vite",
                      "MySQL",
                    ],
                    link: "https://marcem22.github.io/Habitos-/",
                    github: "https://github.com/marcem22/Habitos-",
                  },
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
      <span
        style={{
          marginLeft: "2px",
          animation: "blink 1s infinite",
        }}
      >
        |
      </span>
      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
      `}</style>
    </>
  );
}
  return (
    <div className="relative min-h-screen bg-[var(--bg-dark)] text-white overflow-hidden">
        <SideNavbar />

      {/* === HERO === */}
      <section className="relative z-[30] overflow-hidden bg-[var(--bg-dark)] text-[var(--text-primary)] py-24 md:py-32 text-center">
        <div className="absolute inset-0 bg-[var(--bg-dark)] opacity-95 z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-extrabold tracking-tight leading-tight flex items-center justify-center text-white drop-shadow-[0_0_35px_rgba(255,27,109,0.4)]"
            style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
          >
            {/* ✨ Efecto de tipeo del título */}
            <TypewriterText text="Mis Proyectos" speed={55} />
          </motion.h1>
        </div>
      </section>






      {/* === GRID DE PROYECTOS === */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-24">
        {projects.length === 0 ? (
          <p className="text-center text-[var(--text-muted)] text-lg mt-10">
            No hay proyectos cargados aún. Agregalos desde el panel de administración.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                className="relative bg-[var(--bg-surface)]/70 border border-[var(--border-light)] rounded-2xl p-6 
                          shadow-[0_0_20px_rgba(255,27,109,0.1)] hover:shadow-[0_0_40px_rgba(255,27,109,0.3)] 
                          transition-all duration-300 hover:scale-[1.03] group"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {/* Nombre */}
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-[var(--accent)] transition-colors duration-300">
                  {project.name}
                </h3>

                {/* Descripción */}
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                  {project.summary}
                </p>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.stack || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-lg border border-[var(--border)] 
                                 text-[var(--text-muted)] bg-[var(--bg-hover)]/60 group-hover:text-white 
                                 group-hover:border-[var(--accent)] transition-colors duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                      Ver proyecto
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[var(--text-secondary)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] hover:bg-[var(--accent)] transition-all duration-300"
                    >
                      <FaGithub className="text-base" />
                      Código
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* === CTA FINAL === */}
     <section className="relative z-20 text-center px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 mt-8 sm:mt-12">
        <Link
          to="/contacto"
          className="inline-block bg-[var(--bg-surface)]/80 border border-[var(--border-light)]
                    rounded-2xl px-6 sm:px-10 py-6 sm:py-8 text-center
                    hover:scale-[1.05] transition-all duration-300
                    shadow-[0_0_35px_rgba(255,27,109,0.25)]"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
            ✨ Conectemos
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-snug">
            ¿Tenés una idea o proyecto? Hablemos y hagámoslo realidad.
          </p>
        </Link>
      </section>

    </div>
  );
}

export default Proyectos;
