import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import SideNavbar from "../components/SideNavbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import marcelaPhoto from "../assets/marcelaphoto.png";
import { useTranslation } from "react-i18next";

function CV() {
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const isEn = i18n.language?.startsWith("en");

  const myLanguages = ["HTML5", "CSS/SCSS", "JavaScript", "Java", "C#", "PHP", "Python"];
  const myFrameworks = ["React", "Svelte", "Node.js", "Flutter", "Laravel", "ASP.NET (.NET 9)", "Three.js", "MindAR"];
  const myTools = ["Git", "Firebase", "MySQL", "Figma", "Canva", "Netbeans"];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const snap = await getDoc(doc(db, "profile", "main"));
        if (snap.exists()) setProfile(snap.data());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return null;

  const fadeInUp = {
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const crystallineTitle = {
    color: "transparent",
    WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
    backgroundImage: "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.4) 100%)",
    WebkitBackgroundClip: "text",
    lineHeight: "1",
  };

  return (
    /* CORRECCIÓN: Forzamos w-full max-w-full overflow-x-hidden en la raíz para liquidar el margen fantasma */
    <div className="w-full max-w-full overflow-x-hidden relative min-h-screen text-[var(--text-primary)] bg-[var(--bg-dark)] print:bg-white print:text-black">
      <SideNavbar />

      {/* ==================== HERO SECTION ==================== */}
      <section id="hero-section" className="relative z-[30] overflow-hidden text-[var(--text-primary)] print:bg-white pt-20 md:pt-0 min-h-[100vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={marcelaPhoto}
            alt="Marcela Mancini"
            className="w-full h-full object-cover"
            style={{ objectPosition: "right 25%" }}
          />
          <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 w-full h-[80vh]">
          <div className="flex-1 text-left flex flex-col items-center w-full pt-20 md:pt-80 hero-wrapper-main">
            <div style={{ marginLeft: "-550px" }} className="hero-name-container">
              {/* CORRECCIÓN: Cambiado whitespace-nowrap por whitespace-normal en móviles para que no rompa el viewport */}
              <h1 className="font-impact uppercase tracking-tight print:text-black flex flex-row items-end gap-x-0 whitespace-normal sm:whitespace-nowrap orig-bot hero-title">
                <span 
                  translate="no"
                  className="text-[var(--text-primary)] hero-first-name notranslate" 
                  style={{ 
                    fontSize: "clamp(3rem, 9vw, 5.5rem)",         
                    WebkitTextStroke: "4px var(--text-primary)",           
                    transform: "scale(0.75, 4)",
                    display: "inline-block",
                    transformOrigin: "bottom",
                    lineHeight: "0.9",
                    letterSpacing: "-0.02em",
                    marginRight: "-65px",
                    fontWeight: "900"
                  }}
                >
                  MARCELA
                </span>
                <span 
                  translate="no"
                  className="text-white hero-last-name notranslate" 
                  style={{ 
                    fontSize: "clamp(3rem, 9vw, 5.5rem)", 
                    transform: "scale(0.75, 4)",
                    display: "inline-block",
                    transformOrigin: "bottom",
                    WebkitTextStroke: "4px white",
                    letterSpacing: "0.05em",
                    lineHeight: "0.80",
                    padding: "0 15px",
                    fontWeight: "950",
                    margin: "0",
                    verticalAlign: "text-bottom",
                    position: "relative",
                    top: "-15px"
                  }}
                >
                  MANCINI
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mt-0 print:text-black/80 text-center md:text-left leading-tight hero-subtitle" style={{ marginLeft: "-550px" }}>
              {t('cv.subtitle')}
            </p>

            <div className="hidden print:flex flex-col gap-1 mt-6 text-black text-sm font-medium w-full text-left">
              <p>📞 +54 9 264 4825831</p>
              <p>✉️ marcelamancinidiaz@gmail.com</p>
              <p>🌐 linkedin.com/in/marcela-mancini-dev</p>
              <p>💻 github.com/marcem22</p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1023px) {
            .hero-wrapper-main {
              padding-top: 50vh !important;
              justify-content: flex-end !important;
            }
            .hero-name-container {
              margin-left: 0 !important;
              background-color: rgba(0, 0, 0, 0.6) !important; 
              padding: 55px 15px 5px 15px !important;
              border-radius: 12px 12px 0 0 !important;
              backdrop-filter: blur(4px) !important;
              display: flex !important;
              justify-content: center !important;
              width: 95% !important;
            }
            .hero-title {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .hero-first-name {
              transform: scale(1, 2.2) !important;
              margin-right: 0 !important;
              font-size: clamp(1.2rem, 7vw, 2.5rem) !important;
              -webkit-text-stroke: 1px var(--text-primary) !important;
            }
            .hero-last-name {
              transform: scale(1, 2.2) !important;
              top: 0 !important;
              padding: 0 !important;
              margin-left: 6px !important;
              font-size: clamp(1.2rem, 7vw, 2.5rem) !important;
              -webkit-text-stroke: 1px white !important;
            }
            .hero-subtitle {
              margin-left: 0 !important;
              margin-top: 0 !important;
              background-color: rgba(0, 0, 0, 0.6) !important;
              padding: 5px 15px 15px 15px !important;
              border-radius: 0 0 12px 12px !important;
              backdrop-filter: blur(4px) !important;
              width: 95% !important;
              text-align: center !important;
              font-size: 0.95rem !important;
            }
          }
        `}</style>
      </section>

      {/* ==================== CONTENIDO CENTRAL INTERACTIVO ==================== */}
      <section id="cv-content" className="relative z-[30] pt-24 pb-20">
        
        <div className="fixed bottom-24 right-6 md:bottom-12 md:right-12 z-50 print:hidden">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="/CV_Marcela_Mancini.pdf"
            download="CV_Marcela_Mancini.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)] text-black shadow-[0_0_20px_rgba(217,82,94,0.4)] transition-transform"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </motion.a>
        </div>

        <div className="max-w-6xl mx-auto px-6 space-y-40">
          
          {/* SECCIÓN PERFIL */}
          <motion.section {...fadeInUp}>
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-12" style={crystallineTitle}>
              {t('cv.profileTitle')}
            </h2>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[32px] shadow-2xl">
              <p className="text-gray-300 leading-relaxed font-medium text-lg md:text-xl italic break-words">
                "{profile?.summary || t('cv.defaultSummary')}"
              </p>
            </div>
          </motion.section>

          {/* SECCIÓN SKILLS */}
          <section>
            <motion.h2 {...fadeInUp} className="text-5xl md:text-7xl font-black uppercase mb-12" style={crystallineTitle}>
              {t('cv.skillsTitle')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: t('cv.languages'), items: myLanguages },
                { title: t('cv.frameworks'), items: myFrameworks },
                { title: t('cv.tools'), items: myTools }
              ].map((cat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  className="flex flex-col gap-6"
                >
                  <h3 className="text-[var(--primary)] font-black uppercase tracking-widest text-sm border-b border-[var(--primary)]/30 pb-2">
                    {cat.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {cat.items.map((s, i) => (
                      <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-tighter hover:border-[var(--primary)] hover:text-white transition-all cursor-default">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SECCIÓN EXPERIENCIA Y EDUCACIÓN */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-16" style={crystallineTitle}>
                {t('cv.experienceTitle')}
              </h2>
              <div className="space-y-8 border-l-2 border-white/10 pl-6 md:pl-8">
                {(profile?.experience || []).map((exp, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative group w-full"
                  >
                    <div className="absolute -left-[33px] md:-left-[41px] top-2 w-4 h-4 bg-[var(--primary)] rounded-full shadow-[0_0_10px_var(--primary)]" />
                    <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 hover:bg-white/[0.08] transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold text-white uppercase break-words">{exp.role}</h3>
                          <p className="text-[var(--primary)] font-bold text-sm break-words">{exp.company}</p>
                        </div>
                        <span className="text-xs font-mono text-gray-400 border border-white/10 px-2 py-1 rounded-md bg-white/5 shrink-0 w-max">
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mt-4 break-words">{exp.summary}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-16" style={crystallineTitle}>
                {t('cv.educationTitle')}
              </h2>
              <div className="space-y-8 border-l-2 border-white/10 pl-6 md:pl-8">
                {(profile?.education || []).map((edu, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative group w-full"
                  >
                    <div className="absolute -left-[33px] md:-left-[41px] top-2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]" />
                    <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 hover:bg-white/[0.08] transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold text-white uppercase break-words">{edu.degree}</h3>
                          <p className="text-gray-400 font-bold text-sm break-words">{edu.institution}</p>
                        </div>
                        <span className="text-xs font-mono text-gray-400 border border-white/10 px-2 py-1 rounded-md bg-white/5 shrink-0 w-max">
                          {edu.startYear} — {edu.endYear}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mt-4 break-words">{edu.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* PROYECTOS DESTACADOS */}
          <section>
            <motion.h2 {...fadeInUp} className="text-5xl md:text-7xl font-black uppercase mb-12" style={crystallineTitle}>
              {t('cv.featuredProjectsTitle')}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(profile?.projects || [])
                .filter((proj) => proj.featured === true)
                .map((proj, i) => (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="w-full bg-white/5 border border-white/10 rounded-[24px] p-6 shadow-xl flex flex-col hover:border-[var(--primary)]/50 hover:bg-white/[0.07] transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold uppercase tracking-wide text-white break-words">
                      {proj.name}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium mt-4 flex-grow leading-relaxed break-words">
                      {isEn ? (proj.summary_en || proj.summary) : (proj.summary_es || proj.summary)}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {(proj.stack || []).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase text-gray-300 bg-white/5 shrink-0"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                ))}
            </div>

            {(!profile?.projects ||
              profile.projects.filter((p) => p.featured === true).length === 0) && (
              <p className="text-gray-400 font-bold uppercase text-center mt-4">
                {t('cv.noProjects')}
              </p>
            )}
          </section>

          {/* CTA FINAL */}
          <section className="pt-12 pb-4 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl mx-auto rounded-[24px] p-[1px] bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[var(--primary)]/5 blur-[80px] pointer-events-none" />
              
              <div className="p-8 md:p-12 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
                  {t('cv.ctaTitle1')}{" "}
                  <span className="text-[var(--text-primary)]">{t('cv.ctaTitle2')}</span>
                </h2>
                
                <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto mb-8 font-medium leading-relaxed">
                  {t('cv.ctaDesc')}
                </p>

                <Link
                  to="/contacto"
                  className="group inline-flex items-center gap-3 px-6 py-3 border border-white/20 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-all duration-500 shadow-md"
                >
                  {t('cv.ctaButton')}
                  <svg className="w-3 h-3 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </section>

        </div>
      </section>
    </div>
  );
}

export default CV;