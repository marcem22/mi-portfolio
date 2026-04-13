import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SideNavbar from "../components/SideNavbar";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaTelegramPlane,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { useTranslation } from "react-i18next"; // <-- ¡Importamos el traductor!

function Contacto() {
  const { t } = useTranslation(); // <-- ¡Activamos el traductor!
  const [showForm, setShowForm] = useState(false);
  const [displayText, setDisplayText] = useState("");
  
  // Guardamos la palabra traducida en una variable
  const text = t('contact.together'); 
  
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const mainEnvelopeRef = useRef(null);
  const socialRefs = useRef([]);
  const [lineCoords, setLineCoords] = useState([]);

  // Este useEffect reinicia la animación si el usuario cambia el idioma
  useEffect(() => {
    setDisplayText("");
    setIndex(0);
  }, [text]);

  // Efecto de máquina de escribir
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  useEffect(() => {
    window.onSubmit = function (token) {
      document.getElementById("contactForm").submit();
    };
  }, []);

  useEffect(() => {
    const calculateLines = () => {
      if (!mainEnvelopeRef.current || !socialRefs.current.length || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const envelopeRect = mainEnvelopeRef.current.getBoundingClientRect();

      const mainEnvelopeCenter = {
        x: envelopeRect.left - containerRect.left + envelopeRect.width / 2,
        y: envelopeRect.top - containerRect.top + envelopeRect.height / 2,
      };

      const coords = socialRefs.current.map((ref) => {
        if (!ref) return null;
        const socialRect = ref.getBoundingClientRect();
        return {
          x1: mainEnvelopeCenter.x,
          y1: mainEnvelopeCenter.y,
          x2: socialRect.left - containerRect.left + socialRect.width / 2,
          y2: socialRect.top - containerRect.top + socialRect.height / 2,
        };
      }).filter(Boolean);

      setLineCoords(coords);
    };

    calculateLines();
    window.addEventListener("resize", calculateLines);
    return () => window.removeEventListener("resize", calculateLines);
  }, []);

  const blinkStyle = { animation: "blink 1s infinite" };

  const socials = [
    { name: "LinkedIn", icon: <FaLinkedin />, color: "#0077B5", url: "https://linkedin.com/in/marcela-mancini-dev" },
    { name: "GitHub", icon: <FaGithub />, color: "#3D3C40", url: "https://github.com/marcem22" },
    { name: "WhatsApp", icon: <FaWhatsapp />, color: "#25D366", url: "https://wa.me/5492644825831" },
    { name: "Instagram", icon: <FaInstagram />, color: "#D9525E", url: "https://www.instagram.com/marcemancinid" },
    { name: "Telegram", icon: <FaTelegramPlane />, color: "#2C98F0", url: "https://t.me/Marce22m" },
  ];

  return (
    <div className="relative min-h-[100dvh] w-screen overflow-hidden bg-[var(--bg-dark)] text-white flex flex-col justify-start">
      <SideNavbar />

      <section ref={containerRef} className="relative z-[30] flex flex-col items-center justify-start text-center w-full min-h-[100dvh] p-0 m-0 pt-16 md:pt-0 md:justify-center">
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: "drop-shadow(0 0 8px rgba(217,82,94,0.3))" }}>
          {lineCoords.map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                delay: 1 + i * 0.15,
                duration: 0.8,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        <div className="relative w-full bg-[var(--bg-dark)] py-6 sm:py-8 md:py-8 z-20 mt-10">
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
                marginBottom: "0.2em"
              }}
            >
              {t('contact.createSomething')}
            </span>
            <span
              style={{
                fontSize: "clamp(4.5rem, 14vw, 9rem)",
                color: "var(--primary)",
                letterSpacing: "-0.06em",
              }}
            >
              {displayText}
              <span style={blinkStyle} className="ml-2 text-[#FFFFFF] font-light">|</span>
            </span>
          </motion.h1>
        </div>

        <div className="relative flex flex-col items-center justify-center w-full flex-1 z-20 pb-12 mt-6">
          <motion.div
            ref={mainEnvelopeRef}
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex items-center justify-center rounded-full cursor-pointer
                      bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]
                      shadow-[0_0_40px_rgba(217,82,94,0.5)] border border-[var(--primary)]/50
                      w-[7rem] h-[7rem] sm:w-[8rem] sm:h-[8rem] md:w-[9rem] md:h-[9rem] hover:shadow-[0_0_60px_rgba(217,82,94,0.7)] transition-shadow duration-300"
          >
            <FaEnvelope className="text-4xl sm:text-5xl md:text-6xl text-white" />
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-12 w-full max-w-3xl px-6">
            {socials.map((s, i) => (
              <motion.a
                key={s.name}
                ref={(el) => (socialRefs.current[i] = el)}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 + i * 0.1,
                  duration: 0.6,
                  type: "spring",
                  bounce: 0.4,
                }}
                whileHover={{ scale: 1.15, y: -5 }}
                className="flex items-center justify-center rounded-full text-white
                          shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-white/10"
                style={{
                  width: "4rem",
                  height: "4rem",
                  fontSize: "1.8rem",
                  backgroundColor: s.color,
                }}
                title={s.name}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-[var(--bg-surface)] border border-[var(--border-light)] p-8 rounded-3xl max-w-lg w-full text-left relative shadow-[0_0_50px_rgba(217,82,94,0.15)]"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-5 right-5 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-2xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-3xl font-extrabold mb-6 text-[var(--text-primary)]">
              {t('contact.writeMeA')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">{t('contact.message')}</span>
            </h2>

            <form
              id="contactForm"
              action="https://formspree.io/f/xblkrnee"
              method="POST"
              className="space-y-5"
            >
              <input
                type="text"
                name="nombre"
                placeholder={t('contact.form.name')}
                required
                className="w-full p-4 rounded-xl bg-[var(--bg-dark)] border border-[var(--border)] focus:border-[var(--primary)] text-[var(--text-primary)] outline-none transition-all shadow-inner"
              />
              <input
                type="email"
                name="email"
                placeholder={t('contact.form.email')}
                required
                className="w-full p-4 rounded-xl bg-[var(--bg-dark)] border border-[var(--border)] focus:border-[var(--primary)] text-[var(--text-primary)] outline-none transition-all shadow-inner"
              />
              <input
                type="text"
                name="asunto"
                placeholder={t('contact.form.subject')}
                required
                className="w-full p-4 rounded-xl bg-[var(--bg-dark)] border border-[var(--border)] focus:border-[var(--primary)] text-[var(--text-primary)] outline-none transition-all shadow-inner"
              />
              <select
                name="tipoProyecto"
                required
                className="w-full p-4 rounded-xl bg-[var(--bg-dark)] border border-[var(--border)] text-[var(--text-secondary)] focus:border-[var(--primary)] outline-none transition-all shadow-inner"
              >
                <option value="">{t('contact.form.projectTypeDefault')}</option>
                <option value="Desarrollo Web">{t('contact.form.projectWeb')}</option>
                <option value="App Mobile">{t('contact.form.projectMobile')}</option>
                <option value="Diseño UI/UX">{t('contact.form.projectDesign')}</option>
                <option value="Branding">{t('contact.form.projectBranding')}</option>
                <option value="Consultoría">{t('contact.form.projectConsulting')}</option>
                <option value="Otro">{t('contact.form.projectOther')}</option>
              </select>

              <textarea
                name="mensaje"
                placeholder={t('contact.form.messagePlaceholder')}
                rows={4}
                required
                className="w-full p-4 rounded-xl bg-[var(--bg-dark)] border border-[var(--border)] text-[var(--text-primary)] resize-none focus:border-[var(--primary)] outline-none transition-all shadow-inner"
              ></textarea>

              <input
                type="text"
                name="_gotcha"
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />

              <button
                className="g-recaptcha w-full py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white text-lg font-bold hover:scale-[1.02] transition-all shadow-[0_10px_20px_rgba(217,82,94,0.4)] hover:shadow-[0_15px_25px_rgba(217,82,94,0.6)]"
                data-sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
                data-callback="onSubmit"
                data-action="submit"
              >
                {t('contact.form.submit')}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default Contacto;