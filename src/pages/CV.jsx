import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import SideNavbar from "../components/SideNavbar";
import { Link } from "react-router-dom";
import marcelaPhoto from "../assets/marcelaphoto.png";

function CV() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="relative min-h-screen overflow-x-hidden text-[var(--text-primary)] bg-[var(--bg-dark)] print:bg-white print:text-black">
      <SideNavbar />

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
              <h1 className="font-impact uppercase tracking-tight print:text-black flex flex-row items-end gap-x-0 whitespace-nowrap orig-bot hero-title">
                <span 
                  className="text-[var(--text-primary)] hero-first-name" 
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
                  className="text-white hero-last-name" 
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
              Desarrolladora Web &amp; Diseñadora de experiencias digitales
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

      <section id="cv-content" className="relative z-[10] pt-12">
        
        <div className="absolute top-12 right-6 md:right-12 z-50 print:hidden">
          <a
            href="/CV_Marcela_Mancini.pdf"
            download="CV_Marcela_Mancini.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Descargar CV en PDF"
            className="flex items-center justify-center w-14 h-14 rounded-none transition-transform duration-200 hover:-translate-y-1 hover:-translate-x-1 border-2 border-[var(--primary)] bg-[var(--primary)] text-[#121212] shadow-[4px_4px_0px_#FFFFFF]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-20">
          
          <section>
            {/* Margen aumentado a mb-24 */}
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-24 flex items-center gap-3 w-3/4">
              <span className="text-[var(--primary)] text-3xl animate-pulse">▌</span>
              <span className="text-[var(--text-primary)] print:text-black">Perfil profesional</span>
            </h2>

            <div className="px-8 md:px-0">
              <div className="bg-[var(--bg-surface)] border-2 border-[var(--border)] rounded-none p-8 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:border-[var(--primary)] hover:shadow-[6px_6px_0px_var(--primary)] print:bg-white print:text-black print:shadow-none print:border">
                <p className="text-[var(--text-secondary)] leading-relaxed font-medium text-lg print:text-black/80">
                  {profile?.summary ||
                    "Desarrolladora Web graduada de la UNSJ, especializada en Full Stack y Tecnologías Inmersivas (WebAR). Mi perfil une la lógica del código con el diseño creativo para construir experiencias digitales que realmente conectan con las personas. Soy de aprendizaje ágil y me encanta trabajar en equipo. Busco una oportunidad como desarrolladora Junior para sumar mi visión, adaptabilidad y ganas de crear productos que marquen la diferencia."}
                </p>
              </div>
            </div>
          </section>

          <section>
            {/* Margen aumentado a mb-24 */}
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-24 flex items-center gap-3">
              <span className="text-[var(--primary)] text-3xl animate-pulse">▌</span>
              <span className="text-[var(--text-primary)] print:text-black">Habilidades</span>
            </h2>

            {/* Agregamos px-8 md:px-0 para separar de los bordes */}
            <div className="space-y-12 px-8 md:px-0">
              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-[var(--text-secondary)] mb-8 print:text-black flex items-center gap-3 text-center md:text-left w-full justify-center md:justify-start">
                  Lenguajes
                </h3>
                {/* justify-center md:justify-start para centrar los botones en celular */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full">
                  {myLanguages.map((s, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 rounded-none bg-[var(--bg-surface)] border-2 border-[var(--border)] text-[var(--text-primary)] font-bold uppercase tracking-wider text-sm shadow-[3px_3px_0px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:border-[var(--primary)] hover:shadow-[3px_3px_0px_var(--primary)] hover:text-[var(--primary)] cursor-default print:bg-white print:text-black print:border-black print:hover:translate-y-0 print:hover:shadow-none"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-[var(--text-secondary)] mb-8 print:text-black flex items-center gap-3 text-center md:text-left w-full justify-center md:justify-start">
                  Frameworks / Librerías
                </h3>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full">
                  {myFrameworks.map((s, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 rounded-none bg-[var(--bg-surface)] border-2 border-[var(--border)] text-[var(--text-primary)] font-bold uppercase tracking-wider text-sm shadow-[3px_3px_0px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:border-[var(--primary)] hover:shadow-[3px_3px_0px_var(--primary)] hover:text-[var(--primary)] cursor-default print:bg-white print:text-black print:border-black print:hover:translate-y-0 print:hover:shadow-none"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-[var(--text-secondary)] mb-8 print:text-black flex items-center gap-3 text-center md:text-left w-full justify-center md:justify-start">
                  Herramientas y Tecnologías
                </h3>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full">
                  {myTools.map((s, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 rounded-none bg-[var(--bg-surface)] border-2 border-[var(--border)] text-[var(--text-primary)] font-bold uppercase tracking-wider text-sm shadow-[3px_3px_0px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:border-[var(--primary)] hover:shadow-[3px_3px_0px_var(--primary)] hover:text-[var(--primary)] cursor-default print:bg-white print:text-black print:border-black print:hover:translate-y-0 print:hover:shadow-none"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            {/* Margen aumentado a mb-24 */}
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-24 flex items-center gap-3">
              <span className="text-[var(--primary)] text-3xl animate-pulse">▌</span>
              <span className="text-[var(--text-primary)] print:text-black">Experiencia</span>
            </h2>

            <div className="relative border-l-4 border-[var(--primary)] pl-8 pr-8 md:pr-0 space-y-10 print:border-black">
              {(profile?.experience || []).map((exp, i) => (
                <article
                  key={i}
                  className="relative w-[calc(100%-12px)] md:w-full bg-[var(--bg-surface)] border-2 border-[var(--border)] rounded-none p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_var(--primary)] hover:border-[var(--primary)] print:bg-white print:text-black print:shadow-none print:border print:hover:translate-y-0"
                >
                  <span className="absolute -left-[42px] top-6 w-4 h-4 bg-[var(--bg-dark)] border-4 border-[var(--primary)] rounded-none print:bg-black print:border-white"></span>
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-wide text-[var(--text-primary)] print:text-black">
                        {exp.role}
                      </h3>
                      <p className="text-[var(--primary)] font-bold uppercase tracking-wider mt-1 print:text-black/80">
                        {exp.company}
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-none bg-transparent border-2 border-[var(--border)] font-bold text-sm text-[var(--text-secondary)] whitespace-nowrap print:border-none print:p-0 print:text-black/70">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] font-medium mt-5 leading-relaxed print:text-black/80">
                    {exp.summary}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section>
            {/* Margen aumentado a mb-24 */}
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-24 flex items-center gap-3">
              <span className="text-[var(--primary)] text-3xl animate-pulse">▌</span>
              <span className="text-[var(--text-primary)] print:text-black">Formación</span>
            </h2>

            <div className="relative border-l-4 border-[var(--primary)] pl-8 pr-8 md:pr-0 space-y-10 print:border-black">
              {(profile?.education || []).map((edu, i) => (
                <article
                  key={i}
                  className="relative w-[calc(100%-12px)] md:w-full bg-[var(--bg-surface)] border-2 border-[var(--border)] rounded-none p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_var(--primary)] hover:border-[var(--primary)] print:bg-white print:text-black print:shadow-none print:border print:hover:translate-y-0"
                >
                  <span className="absolute -left-[42px] top-6 w-4 h-4 bg-[var(--bg-dark)] border-4 border-[var(--primary)] rounded-none print:bg-black print:border-white"></span>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-wide text-[var(--text-primary)] print:text-black">
                        {edu.degree}
                      </h3>
                      <p className="text-[var(--primary)] font-bold uppercase tracking-wider mt-1 print:text-black/70">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-none bg-transparent border-2 border-[var(--border)] font-bold text-sm text-[var(--text-secondary)] whitespace-nowrap print:border-none print:p-0 print:text-black/70">
                      {edu.startYear} — {edu.endYear}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] font-medium leading-relaxed print:text-black/80">
                    {edu.details}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section>
            {/* Margen aumentado a mb-24 */}
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-24 flex items-center gap-3">
              <span className="text-[var(--primary)] text-3xl animate-pulse">▌</span>
              <span className="text-[var(--text-primary)] print:text-black">Proyectos destacados</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-0">
              {(profile?.projects || [])
                .filter((proj) => proj.featured === true)
                .map((proj, i) => (
                  <article
                    key={i}
                    className="w-full bg-[var(--bg-surface)] border-2 border-[var(--border)] rounded-none p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-2 hover:translate-x-2 hover:shadow-[8px_8px_0px_var(--primary)] hover:border-[var(--primary)] print:bg-dark print:text-black print:shadow-none print:border flex flex-col group"
                  >
                    <h3 className="text-xl font-black uppercase tracking-wide text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors duration-300 print:text-black">
                      {proj.name}
                    </h3>
                    <p className="text-[var(--text-secondary)] font-medium mt-4 flex-grow leading-relaxed print:text-black/80">
                      {proj.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-8">
                      {(proj.stack || []).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-none border border-[var(--border)] text-xs font-bold uppercase text-[var(--text-secondary)] bg-transparent print:bg-white print:text-black"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
            </div>

            {(!profile?.projects ||
              profile.projects.filter((p) => p.featured === true).length === 0) && (
              <p className="text-[var(--text-secondary)] font-bold uppercase text-center mt-4 print:text-black/70">
                Aún no hay proyectos destacados.
              </p>
            )}
          </section>

          <section className="mt-20 mb-12 pt-16 border-t-4 border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-10 print:hidden">
            <div className="text-center md:text-left flex-1">
              <h2 className="text-4xl md:text-5xl font-black uppercase text-[var(--text-primary)] mb-4 tracking-tight">
                Creamos algo <span className="text-[var(--primary)]" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.5)" }}>increíble?</span>
              </h2>
              <p className="text-lg font-medium text-[var(--text-secondary)] max-w-xl mx-auto md:mx-0 mt-6">
                Ya sea para un nuevo proyecto, sumar a alguien a tu equipo o charlar sobre tecnología, me encantaría escucharte.
              </p>
            </div>
            
            <div className="shrink-0">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-black uppercase tracking-widest text-[#121212] bg-[var(--primary)] border-2 border-[var(--primary)] rounded-none transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 shadow-[6px_6px_0px_#FFFFFF] hover:shadow-[8px_8px_0px_#FFFFFF] group"
              >
                Hablemos ahora
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </section>

        </div>
      </section>
    </div>
  );
}

export default CV;