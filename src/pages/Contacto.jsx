import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaTelegramPlane,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import Parallax3D from "../components/Parallax3D";
import BackgroundEffects from "../components/BackgroundEffects";
import SideNavbar from "../components/SideNavbar";

function Contacto() {
  const [showForm, setShowForm] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const text = "Creemos algo juntos...";
  const [index, setIndex] = useState(0);

  // efecto de tipeo
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 55);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);
  useEffect(() => {
  window.onSubmit = function (token) {
    document.getElementById("contactForm").submit();
      };
  }, []);


  const blinkStyle = { animation: "blink 1s infinite" };

  const socials = [
    { name: "LinkedIn", icon: <FaLinkedin />, color: "#0077B5", url: "https://linkedin.com/in/marcela-mancini-dev" },
    { name: "GitHub", icon: <FaGithub />, color: "#0a0a0a", url: "https://github.com/marcem22" },
    { name: "WhatsApp", icon: <FaWhatsapp />, color: "#25D366", url: "https://wa.me/5492644825831" },
    { name: "Instagram", icon: <FaInstagram />, color: "#F2138E", url: "https://www.instagram.com/marcemancinid" },
    { name: "Telegram", icon: <FaTelegramPlane />, color: "#2C98F0", url: "https://t.me/Marce22m" },
  ];

  return (
    <div className="relative min-h-[100dvh] w-screen overflow-hidden bg-[var(--bg-dark)] text-white flex flex-col justify-start">
      <BackgroundEffects />
      <Parallax3D />
      <SideNavbar />

      {/* === HERO CON FONDO NEGRO + CÍRCULOS + FRASE FINAL === */}
      <section className="relative z-[30] flex flex-col items-center justify-center text-center w-screen h-[100dvh] overflow-hidden p-0 m-0">
        
        {/* 🔹 HERO */}
        <div className="relative w-full bg-[var(--bg-dark)] py-6 sm:py-8 md:py-8 z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-extrabold tracking-tight leading-tight text-white drop-shadow-[0_0_35px_rgba(255,27,109,0.4)]"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}
          >
            {displayText}
            <span style={blinkStyle} className="ml-1">|</span>
          </motion.h1>
        </div>

        {/* 🔹 CÍRCULOS */}
        <div
          className="relative flex items-center justify-center w-full flex-1 overflow-visible"
          style={{
            marginTop: "1.5rem",
          }}
        >
          {/* Círculo central */}
          <motion.div
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.07 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="relative z-20 flex items-center justify-center rounded-full cursor-pointer
                      bg-gradient-to-br from-[#F2138E] to-[#2C04BF]
                      shadow-[0_0_50px_rgba(242,19,142,0.7)] border border-[#F2138E]/50
                      w-[7rem] h-[7rem] sm:w-[8rem] sm:h-[8rem] md:w-[10rem] md:h-[10rem]"
          >
            <FaEnvelope className="text-3xl sm:text-4xl md:text-5xl" />
          </motion.div>

          {/* Íconos orbitando */}
          {socials.map((s, i) => {
            const angle = (i / socials.length) * 2 * Math.PI;
            const w = typeof window !== "undefined" ? window.innerWidth : 1024;

            const radius =
              w < 380 ? 90 :
              w < 480 ? 110 :
              w < 640 ? 125 :
              w < 768 ? 145 :
              w < 1024 ? 165 : 190; // 💡 más separación

            const size =
              w < 380 ? 46 :
              w < 480 ? 54 :
              w < 640 ? 60 :
              w < 768 ? 68 :
              w < 1024 ? 72 : 80;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                transition={{
                  delay: 0.4 + i * 0.2,
                  duration: 1,
                  type: "spring",
                }}
                whileHover={{ scale: 1.15 }}
                className="absolute z-10 flex items-center justify-center rounded-full
                          shadow-[0_0_25px_rgba(255,255,255,0.3)] border border-white/10"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  fontSize: size < 50 ? "1rem" : "1.2rem",
                  backgroundColor: s.color,
                }}
              >
                {s.icon}
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* === MODAL === */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-[var(--bg-surface)] border border-[var(--border-light)] p-8 rounded-2xl max-w-lg w-full text-left relative shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-white">Escribime un mensaje</h2>

            <form
              id="contactForm"
              action="https://formspree.io/f/xblkrnee"
              method="POST"
              className="space-y-6"
            >
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                required
                className="w-full p-4 rounded-xl bg-[var(--bg-dark)] border border-gray-600 focus:border-[#F2138E] outline-none transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Tu email"
                required
                className="w-full p-4 rounded-xl bg-[var(--bg-dark)] border border-gray-600 focus:border-[#F2138E] outline-none transition-all"
              />
              <input
                type="text"
                name="asunto"
                placeholder="Asunto"
                required
                className="w-full p-4 rounded-xl bg-[var(--bg-dark)] border border-gray-600 focus:border-[#F2138E] outline-none transition-all"
              />
              <select
                name="tipoProyecto"
                required
                className="w-full p-4 rounded-xl bg-[var(--bg-dark)] border border-gray-600 text-gray-300 focus:border-[#F2138E] outline-none transition-all"
              >
                <option value="">Seleccioná el tipo de proyecto</option>
                <option value="Desarrollo Web">🌐 Desarrollo Web</option>
                <option value="App Mobile">📱 App Mobile</option>
                <option value="Diseño UI/UX">🎨 Diseño UI/UX</option>
                <option value="Branding">✨ Branding</option>
                <option value="Consultoría">💡 Consultoría</option>
                <option value="Otro">🚀 Otro</option>
              </select>

              <textarea
                name="mensaje"
                placeholder="Tu mensaje..."
                rows={5}
                required
                className="w-full p-4 rounded-xl bg-[var(--bg-dark)] border border-gray-600 resize-none focus:border-[#F2138E] outline-none transition-all"
              ></textarea>

              {/* Honeypot invisible */}
              <input
                type="text"
                name="_gotcha"
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />

              {/* Botón con reCAPTCHA */}
              <button
                className="g-recaptcha w-full py-3 rounded-xl bg-gradient-to-r from-[#F2138E] to-[#2C04BF] font-semibold hover:scale-[1.03] transition-all shadow-[0_0_25px_rgba(242,19,142,0.6)]"
                data-sitekey="6LfaRvwrAAAAAEVqCKWHRVVNvvSC2oLTOou6ghpV"
                data-callback="onSubmit"
                data-action="submit"
              >
                Enviar
              </button>
            </form>
          </motion.div>
        </div>
      )}


      {/* 🔹 Animación cursor */}
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

