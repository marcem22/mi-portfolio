import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import avatarImg from '../assets/avatar.webp';
import nuevoAvatar from "../assets/nuevoAvatar.webp";

function HomeHero({ isVisible }) {
  const { t, i18n } = useTranslation();

  const languages = ['es', 'en', 'fr', 'pt', 'it'];
  const flags = { es: "🇪🇸", en: "🇬🇧", fr: "🇫🇷", pt: "🇧🇷", it: "🇮🇹" };
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  const [isLangOpen, setIsLangOpen] = useState(false); 
  const [avatarKey, setAvatarKey] = useState(0);
  const [showNewAvatar, setShowNewAvatar] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]); 
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const carouselPhrases = [
    t('home.carousel.dev'),
    t('home.carousel.creative'),
    t('home.carousel.creator'),
    t('home.carousel.tech')
  ];

  useEffect(() => {
    if (isVisible) {
      setShowNewAvatar(false);
      setAvatarKey((k) => k + 1);

      const startTimer = setTimeout(() => {
        const t = setTimeout(() => setShowNewAvatar(true), 3000);
        return () => clearTimeout(t);
      }, 800);

      return () => clearTimeout(startTimer);
    }
  }, [isVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % carouselPhrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [carouselPhrases.length]);

  return (
    <>
      <div className="absolute top-6 left-4 md:top-8 md:left-8 z-[100]">
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="group flex items-center gap-2 px-3 py-2 bg-[#121212]/80 backdrop-blur-sm border border-[var(--primary)] rounded-full shadow-[0_0_15px_rgba(217,82,94,0.3)] hover:shadow-[0_0_20px_rgba(217,82,94,0.6)] transition-all duration-300"
            title="Cambiar idioma / Change language"
          >
            <svg className="w-4 h-4 text-[var(--primary)] group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
            <span className="text-sm leading-none drop-shadow-md">
              {flags[i18n.language?.substring(0, 2)] || "🇪🇸"}
            </span>
          </button>

          <AnimatePresence>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 left-0 flex flex-col gap-1 bg-[#1A1A1A]/95 backdrop-blur-md border border-[var(--border)] p-2 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,0.5)] min-w-[110px]"
              >
                {languages.map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-[#2A2A2A] hover:translate-x-1 ${
                      i18n.language?.startsWith(lng) 
                        ? 'bg-[var(--primary)]/20 border border-[var(--primary)]' 
                        : 'border border-transparent'
                    }`}
                  >
                    <span className="text-xl leading-none drop-shadow-md">{flags[lng]}</span>
                    <span className="text-xs font-black uppercase text-white tracking-widest">{lng}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>


      <motion.div 
        className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16 mb-10 w-full mt-8 md:mt-12"
        style={{ y: heroY, opacity: heroOpacity }} 
        >
        <div className="flex-1 text-center lg:text-left min-w-0 flex flex-col items-center lg:items-start relative z-10">
          <h1 
            className="font-black uppercase mb-6 flex justify-center lg:justify-start w-full" 
            style={{ lineHeight: "0.8" }}
          >
            <div className="flex flex-col items-center lg:items-start">
              <span
                style={{
                  fontSize: "clamp(0.9rem, 2vw, 1.2rem)", 
                  color: "rgba(255, 255, 255, 0.5)", 
                  letterSpacing: "0.5em", 
                  marginLeft: "0",
                  marginBottom: "1rem",
                  fontWeight: "500",
                  paddingRight: "0.5em" 
                }}
              >
                {t('home.greeting')}
              </span>

              <span
                translate="no"
                className="notranslate"
                style={{
                  fontSize: "clamp(6rem, 16vw, 11rem)", 
                  color: "var(--primary)",
                  letterSpacing: "-0.04em",
                  textShadow: "4px 4px 0px rgba(0,0,0,0.8)" 
                }}
              >
                Marce
              </span>
            </div>
          </h1>

          <div className="relative h-8 flex items-center justify-center lg:justify-start w-full mb-8 max-w-4xl px-4 lg:px-0 overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.p
        key={phraseIndex}
        initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        
        className="font-normal uppercase absolute w-full text-center lg:text-left whitespace-normal sm:whitespace-nowrap tracking-[0.15em] sm:tracking-[0.38em] px-2"
        style={{ 
          fontSize: "clamp(0.75rem, 1.6vw, 1.1rem)",
          color: 'rgba(255,255,255,0.58)', 
        }}
      >
        {carouselPhrases[phraseIndex]}
      </motion.p>
      </AnimatePresence>
          </div>
        </div>

        <div className="flex-shrink-0 lg:-mt-8 relative z-20">
          <div className="relative group" key={avatarKey}>
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(217, 82, 94, 0.4) 0%, transparent 60%)',
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
              }}
            />

            <div
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-[3px] transition-all duration-300"
              style={{
                backgroundColor: "#1A1A1A",
                borderColor: "var(--primary)",
                boxShadow: "20px 20px 0px rgba(0, 0, 0, 0.3)", 
                animation: "scaleIn 1s ease-out",
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = -(y / rect.height - 0.5) * 20;
                const rotateY = (x / rect.width - 0.5) * 20;

                e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
              }}
            >
              <img
                src={avatarImg}
                alt="Avatar anterior"
                loading="eager"
                className="absolute w-full h-full object-cover object-center"
                style={{
                  zIndex: showNewAvatar ? 1 : 3,
                  opacity: showNewAvatar ? 0 : 1,
                  transform: showNewAvatar ? "scale(0.95)" : "scale(1)",
                  transition: "opacity 1.5s ease-in-out, transform 1.5s ease",
                }}
              />

              <img
                src={nuevoAvatar}
                alt="Nuevo avatar"
                loading="eager"
                className="absolute w-full h-full object-cover object-center"
                style={{
                  zIndex: 2,
                  opacity: showNewAvatar ? 1 : 0,
                  transform: showNewAvatar ? "scale(1)" : "scale(1.05)",
                  transition: "opacity 1.8s ease-in-out, transform 1.8s ease",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default HomeHero;