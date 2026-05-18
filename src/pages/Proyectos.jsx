import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaPlayCircle, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import { useTranslation } from "react-i18next";

function TypewriterText({ text, speed = 60 }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayText("");
    setIndex(0);
  }, [text]);

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
    </>
  );
}

function Proyectos() {
  const { t, i18n } = useTranslation(); 
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDoc(doc(db, "profile", "main"));
        if (snap.exists()) {
          const data = snap.data();
          setProjects(data.projects || []);
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
    <div className="relative min-h-screen w-full bg-(--bg-dark) text-white overflow-x-hidden">
      <SideNavbar />

      <section className="relative z-30 bg-(--bg-dark) text-(--text-primary) py-10">
        <div className="relative z-10 max-w-6xl mx-auto px-6 flex justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-black uppercase flex flex-col items-center w-full text-center"
            style={{ lineHeight: "0.8" }}
          >
            <span className="text-[clamp(1.2rem,3vw,1.8rem)] text-white tracking-[0.3em] opacity-90 mb-2">
              {t('projects.my', 'MIS')}
            </span>
            <span className="text-[clamp(3rem,10vw,6.5rem)] text-(--primary) tracking-[-0.06em]">
              <TypewriterText text={t('projects.title', 'PROYECTOS')} speed={55} />
            </span>
          </motion.h1>
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-14 md:pt-20 pb-12">
        {projects.length === 0 ? (
          <p className="text-center text-(--text-muted)text-lg mt-10">
            {t('projects.noProjects', 'No hay proyectos cargados aún.')}
          </p>
        ) : (
          <div className="flex flex-col gap-12 lg:gap-16">
            {[...projects].reverse().map((project, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.article
                  key={i} 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="group relative bg-[#121212] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500 hover:border-(--primary) shadow-xl"
                >
                  <div className={`relative w-full lg:w-5/12 h-56 lg:h-80 overflow-hidden bg-gray-900 shrink-0 ${!isEven ? 'lg:order-last' : ''}`}>
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        className="w-full h-full object-cover grayscale-[40] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[(--primary)] opacity-20 text-4xl">
                        &lt; /&gt;
                      </div>
                    )}
                    
                    {project.featured && (
                      <div className={`absolute top-4 z-20 ${!isEven ? 'left-4' : 'right-4'}`}>
                        <span className="bg-(--primary) text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-1 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
                          {t('projects.featured', 'Destacado')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 md:p-8 flex flex-col w-full lg:w-7/12 bg-[#121212]">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white group-hover:text-(--primary) transition-colors mb-3">
                      {project.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {(project.stack || []).map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white/5 border border-white/10 text-(--text-secondary)">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-gray-400 mb-6 grow">
                      <strong className="text-(--primary) block text-[10px] uppercase tracking-[0.2em] mb-1.5">
                        {t('projects.theProject', 'El Proyecto:')}
                      </strong>
                      <p className="text-sm leading-relaxed font-medium">
                        {i18n.language?.startsWith('en') 
                          ? (project.summary_en || project.summary) 
                          : (project.summary_es || project.summary)}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-5 border-t border-white/5 mt-2 w-full">
                      {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" 
                           className="w-full sm:flex-1 flex justify-center items-center gap-2 py-2.5 bg-(--primary) text-black text-[10px] font-black uppercase tracking-widest hover:-translate-y-1 hover:translate-x-1 shadow-[4px_4px_0px_rgba(255,255,255,0.1)] hover:shadow-[4px_4px_0px_#FFFFFF] transition-all border border-(--primary)">
                          <FaPlayCircle className="text-sm" /> Demo
                        </a>
                      )}
                      
                      {project.link && project.link !== "#" && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" 
                           className="w-full sm:flex-1 flex justify-center items-center gap-2 py-2.5 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all">
                          <FaExternalLinkAlt className="text-sm" /> {t('projects.web', 'Web')}
                        </a>
                      )}

                      {project.github ? (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                           className="w-full sm:flex-1 flex justify-center items-center gap-2 py-2.5 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all">
                          <FaGithub className="text-sm" /> {t('projects.viewCode', 'Código')}
                        </a>
                      ) : (
                        <div className="w-full sm:flex-1 flex justify-center items-center gap-2 py-2.5 border border-white/5 text-white/20 text-[10px] font-black uppercase tracking-widest cursor-not-allowed">
                          <FaLock className="text-sm" /> {t('projects.privateCode', 'Privado')}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-8 pb-12">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative border-t border-white/10 py-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <span className="block text-(--primary) text-[9px] font-black uppercase tracking-[0.4em] mb-3">
              {t('cta.badge', 'CONTACTO')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              {t('cta.title', '¿CREAMOS ALGO')} <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
                {t('cta.subtitle', 'INCREÍBLE?')}
              </span>
            </h2>
          </div>

          <Link
            to="/contacto"
            className="group inline-flex items-center gap-4 px-8 py-4 border border-white/20 text-white font-black uppercase tracking-widest text-[10px] hover:border-(--primary) hover:bg-(--primary) hover:text-black transition-all duration-500"
          >
            {t('cta.button', 'Hablemos hoy')}
            <svg className="w-3 h-3 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </section>

      <style>{`
        @keyframes blink { 0%, 50%, 100% { opacity: 1; } 25%, 75% { opacity: 0; } }
      `}</style>
    </div>
  );
}

export default Proyectos;