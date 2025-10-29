import React, { useEffect, useState, useRef } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import SideNavbar from "../components/SideNavbar";
import Parallax3D from "../components/Parallax3D";
import BackgroundEffects from "../components/BackgroundEffects";
import { Link } from "react-router-dom";


function CV() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const snap = await getDoc(doc(db, "profile", "main"));
        if (snap.exists()) setProfile(snap.data());
      } catch (error) {
        console.error("Error al leer perfil desde Firestore:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return null;


  return (

    <div
     
      className="relative min-h-screen text-white bg-[#0a0a0a] print:bg-white print:text-black"
    >
      <SideNavbar />
      <BackgroundEffects />

      {/* ===== HERO CV ===== */}
      <section className="relative z-[30] overflow-hidden bg-[var(--bg-dark)] text-[var(--text-primary)] print:bg-white pt-20 md:pt-0">

        <div className="absolute inset-0 bg-[var(--bg-dark)] opacity-95 z-0 print:hidden"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-14">
          {/* Texto principal */}
          <div className="flex-1 text-left ml-0 md:ml-4">
            <h1
              className="font-extrabold text-white leading-[1.1] tracking-tight print:text-black"
              style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
            >
              Marcela&nbsp;Mancini
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mt-2 print:text-black/80">
              Desarrolladora Web &amp; Diseñadora de experiencias digitales
            </p>
          </div>

          {/* Imagen */}
          <div className="flex-1 flex justify-end">
            <div className="relative w-[260px] md:w-[380px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,27,109,0.25)] border border-[var(--border-light)] md:translate-x-6 print:shadow-none print:border">
              <img
                src="/assets/marcela-photo.jpg"
                alt="Marcela Mancini"
                className="object-cover w-full h-full"
                style={{ objectPosition: "top center" }}
                crossOrigin="anonymous"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTENIDO CV (scroll lineal) ===== */}
      <section id="cv-content" className="relative z-[10]">
        {/* Parallax arranca recién acá (NO se ve en el Hero) */}
        <Parallax3D />

        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-20">
          {/* PERFIL PROFESIONAL */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
              <span className="text-[var(--accent)] text-3xl">▌</span>
              <span className="text-white print:text-black">Perfil profesional</span>

            </h2>

            <p className="text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface)]/70 border border-[var(--border-light)] rounded-2xl p-6 shadow-[0_0_25px_rgba(255,27,109,0.08)] print:bg-white print:text-black print:shadow-none print:border">
              {profile?.summary ||
                "Estudiante universitaria especializada en desarrollo web y realidad aumentada. Creativa, adaptable y enfocada en experiencias interactivas."}
            </p>
          </section>

          {/* HABILIDADES */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
              <span className="text-[var(--accent)] text-3xl">▌</span>
              <span className="text-white print:text-black">Habilidades</span>
            </h2>

            <div className="space-y-8">
              {/* Lenguajes */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 print:text-black">
                  Lenguajes
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(profile?.skillsLanguages || [
                    "HTML5",
                    "CSS/SCSS",
                    "JavaScript",
                    "C#",
                    "PHP",
                    "Python",
                  ]).map((s, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-secondary)] print:bg-white print:text-black"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frameworks / Librerías */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 print:text-black">
                  Frameworks / Librerías
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(profile?.skillsFrameworks || [
                    "React",
                    "Node.js",
                    "Laravel",
                    "ASP.NET (.NET 9)",
                    "Three.js",
                    "MindAR",
                  ]).map((s, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-secondary)] print:bg-white print:text-black"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Herramientas */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 print:text-black">
                  Herramientas y Tecnologías
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(profile?.skillsTools || ["Git", "MySQL", "Figma", "Canva"]).map(
                    (s, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-secondary)] print:bg-white print:text-black"
                      >
                        {s}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* EXPERIENCIA */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
              <span className="text-[var(--accent)] text-3xl">▌</span>
              <span className="text-white print:text-black">Experiencia</span>
            </h2>

            <div className="relative border-l-2 border-[var(--accent)] pl-6 space-y-8 print:border-black">
              {(profile?.experience || [
                {
                  role: "Desarrolladora Web RA",
                  company: "Universidad / Proyecto Académico",
                  startDate: "Jun 2025",
                  endDate: "Presente",
                  summary:
                    "Aplicación web interactiva con RA usando MindAR y Three.js para educación con Merge Cube.",
                },
              ]).map((exp, i) => (
                <article
                  key={i}
                  className="relative bg-[var(--bg-surface)]/70 border border-[var(--border-light)] rounded-2xl p-6 shadow-md hover:shadow-[0_0_20px_rgba(255,27,109,0.2)] transition-all duration-300 print:bg-white print:text-black print:shadow-none print:border"
                >
                  <span className="absolute -left-[13px] top-6 w-5 h-5 bg-[var(--accent)] rounded-full border-4 border-[var(--bg-dark)] print:bg-black print:border-white"></span>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white print:text-black">
                        {exp.role}
                      </h3>
                      <p className="text-[var(--text-secondary)] print:text-black/80">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-[var(--text-muted)] whitespace-nowrap print:text-black/70">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] mt-3 leading-relaxed print:text-black/80">
                    {exp.summary}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* FORMACIÓN */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
              <span className="text-[var(--accent)] text-3xl">▌</span>
              <span className="text-white print:text-black">Formación</span>
            </h2>

            <div className="relative border-l-2 border-[var(--accent)] pl-6 space-y-8 print:border-black">
              {(profile?.education || [
                {
                  degree: "Tecnicatura Universitaria en Programación Web",
                  institution: "UNSJ - Universidad Nacional de San Juan",
                  startYear: "2022",
                  endYear: "En curso",
                  details:
                    "Desarrollo web/móvil, bases de datos y arquitectura de sistemas.",
                },
              ]).map((edu, i) => (
                <article
                  key={i}
                  className="relative bg-[var(--bg-surface)]/70 border border-[var(--border-light)] rounded-2xl p-6 shadow-md hover:shadow-[0_0_20px_rgba(255,27,109,0.2)] transition-all duration-300 print:bg-white print:text-black print:shadow-none print:border"
                >
                  <span className="absolute -left-[13px] top-6 w-5 h-5 bg-[var(--accent)] rounded-full border-4 border-[var(--bg-dark)] print:bg-black print:border-white"></span>
                  <h3 className="text-xl font-semibold text-white mb-1 print:text-black">
                    {edu.degree}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm font-medium mb-1 print:text-black/70">
                    {edu.institution}
                  </p>
                  <p className="text-[var(--text-muted)] text-sm mb-3 print:text-black/70">
                    {edu.startYear} — {edu.endYear}
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed print:text-black/80">
                    {edu.details}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* PROYECTOS */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
              <span className="text-[var(--accent)] text-3xl">▌</span>
              <span className="text-white print:text-black">Proyectos destacados</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {(profile?.projects || [])
                .filter((proj) => proj.featured === true) // 👈 solo los marcados como destacados
                .map((proj, i) => (
                  <article
                    key={i}
                    className="bg-[var(--bg-surface)]/70 border border-[var(--border-light)] rounded-2xl p-6 shadow-md hover:shadow-[0_0_20px_rgba(255,27,109,0.2)] transition-all duration-300 print:bg-white print:text-black print:shadow-none print:border"
                  >
                    <h3 className="text-xl font-semibold text-white print:text-black">
                      {proj.name}
                    </h3>
                    <p className="text-[var(--text-secondary)] mt-2 print:text-black/80">
                      {proj.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(proj.stack || []).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg-hover)]/60 print:bg-white print:text-black"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
            </div>

            {/* Mensaje si no hay proyectos destacados */}
            {(!profile?.projects ||
              profile.projects.filter((p) => p.featured === true).length === 0) && (
              <p className="text-[var(--text-secondary)] text-center mt-4 print:text-black/70">
                Aún no hay proyectos destacados.
              </p>
            )}
          </section>


          {/* CONTACTO */}
          <section>
              <Link
                to="/contacto"
                className="block bg-[var(--bg-surface)]/80 border border-[var(--border-light)] rounded-2xl p-10 text-center cursor-pointer 
                          transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,27,109,0.25)] 
                          shadow-[0_0_25px_rgba(255,27,109,0.08)] group print:bg-white print:text-black print:shadow-none print:border"
              >
                <p className="text-2xl md:text-3xl font-semibold text-white mb-2 group-hover:text-[var(--accent)] transition-colors duration-300 print:text-black">
                  ¿Querés contactarme?
                </p>
                <p className="text-[var(--text-secondary)] text-lg print:text-black/80">
                  Hacé clic aquí para ir a la página de contacto
                </p>
              </Link>
          </section>
        </div>
      </section>
    </div>
  );
}

export default CV;
