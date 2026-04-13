import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkillsCube3D from '../components/SkillsCube3D'; 
import SplashScreen from "../components/SplashScreen";
import avatarImg from '../assets/avatar.png';
import nuevoAvatar from "../assets/nuevoAvatar.png";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import '../pages/Home.css';

function Home() {
  const { t, i18n } = useTranslation();
  
  // Configuraciones del idioma y banderas
  const languages = ['es', 'en', 'fr', 'pt', 'it'];
  const flags = { es: "🇪🇸", en: "🇬🇧", fr: "🇫🇷", pt: "🇧🇷", it: "🇮🇹" }; // Podés cambiar 🇬🇧 por 🇺🇸 o 🇧🇷 por 🇵🇹 si preferís
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false); // Cierra el menú al elegir
  };
  
  const [isLangOpen, setIsLangOpen] = useState(false); // Estado para abrir/cerrar las banderas
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); 
  const [avatarKey, setAvatarKey] = useState(0);
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("splashShown");
  });
  const [showNewAvatar, setShowNewAvatar] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Arrays mapeados con el traductor
  const carouselPhrases = [
    t('home.carousel.dev'),
    t('home.carousel.creative'),
    t('home.carousel.creator'),
    t('home.carousel.tech')
  ];

  const funFacts = [
    { id: "code", icon: "💖", text: t('home.aboutMe.fact1'), desc: t('home.aboutMe.fact1Desc'), color: "#D9525E" },
    { id: "river", icon: "⚽", text: t('home.aboutMe.fact2'), desc: t('home.aboutMe.fact2Desc'), color: "#A64149" },
    { id: "dog", icon: "🐕", text: t('home.aboutMe.fact3'), desc: t('home.aboutMe.fact3Desc'), color: "#A4A5A6" },
    { id: "travel", icon: "✈️", text: t('home.aboutMe.fact4'), desc: t('home.aboutMe.fact4Desc'), color: "#D9D9D9" },
    { id: "cook", icon: "👩‍🍳", text: t('home.aboutMe.fact5'), desc: t('home.aboutMe.fact5Desc'), color: "#D9525E" },
    { id: "beer", icon: "🍺", text: t('home.aboutMe.fact6'), desc: t('home.aboutMe.fact6Desc'), color: "#A64149" },
    { id: "draw", icon: "🎨", text: t('home.aboutMe.fact7'), desc: t('home.aboutMe.fact7Desc'), color: "#A4A5A6" },
    { id: "rest", icon: "🌙", text: t('home.aboutMe.fact8'), desc: t('home.aboutMe.fact8Desc'), color: "#D9D9D9" },
  ];

  const timeline = [
    {
      year: "2022",
      title: t('home.timeline.step1.title'),
      iconUrl: "/startAvatar.png",
      description: t('home.timeline.step1.desc'),
    },
    {
      year: "2023",
      title: t('home.timeline.step2.title'),
      iconUrl: "/codeando.png",
      description: t('home.timeline.step2.desc'),
    },
    {
      year: "2024",
      title: t('home.timeline.step3.title'),
      iconUrl: "/haciendophp.png",
      description: t('home.timeline.step3.desc'),
    },
    {
      year: "2025",
      title: t('home.timeline.step4.title'),
      iconUrl: "/haciendorealidadAumentada.png",
      description: t('home.timeline.step4.desc'),
    },
    {
      year: "2026",
      title: t('home.timeline.step5.title'),
      iconUrl: "/graduadaBitch.png", 
      description: t('home.timeline.step5.desc'),
    },
  ];

  const menuItems = [
    { to: "/proyectos", icon: "⚡", text: t('home.explore.projects'), description: t('home.explore.projDesc') },
    { to: "/cv", icon: "📋", text: t('home.explore.cv'), description: t('home.explore.cvDesc') },
    { to: "/contacto", icon: "💬", text: t('home.explore.contact'), description: t('home.explore.contactDesc') }
  ];

  const nextStep = () => setCurrentStep((prev) => (prev === timeline.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const autoProgressInterval = setInterval(() => {
      nextStep();
    }, 6000);
    return () => clearInterval(autoProgressInterval);
  }, [currentStep]); 

  useEffect(() => {
    const splashWasShown = sessionStorage.getItem("splashShown");

    if (!splashWasShown) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("splashShown", "true"); 
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, []);

  useEffect(() => {
    if (!showSplash) {
      setIsVisible(true);
      setShowNewAvatar(false);
      setAvatarKey((k) => k + 1);

      const startTimer = setTimeout(() => {
        const t = setTimeout(() => setShowNewAvatar(true), 3000);
        return () => clearTimeout(t);
      }, 800);

      return () => clearTimeout(startTimer);
    }
  }, [showSplash]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % carouselPhrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [t]); 

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <div
          className="relative overflow-hidden font-sans min-h-screen"
          style={{
            backgroundColor: "var(--fondo-principal)",
            color: "var(--texto-principal)",
            opacity: 1, 
            transition: "opacity 1s ease"
          }}
        >
          <style>{`
            @keyframes shimmer {
              0%, 100% { opacity: 0.8; transform: scaleX(1); }
              50% { opacity: 1; transform: scaleX(1.05); }
            }
            @keyframes scaleIn {
              0% { transform: scale(0.8); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
          `}</style>

          {/* SELECTOR DE IDIOMAS (MICRO Y PRO) */}
          <div className="absolute top-6 left-4 md:top-8 md:left-8 z-[100]">
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="group flex items-center gap-2 px-3 py-2 bg-[#121212]/80 backdrop-blur-sm border border-[var(--primary)] rounded-full shadow-[0_0_15px_rgba(217,82,94,0.3)] hover:shadow-[0_0_20px_rgba(217,82,94,0.6)] transition-all duration-300"
                title="Cambiar idioma / Change language"
              >
                {/* Ícono universal de traducción */}
                <svg className="w-4 h-4 text-[var(--primary)] group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                </svg>
                {/* Bandera activa */}
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
          {/* FIN SELECTOR DE IDIOMAS */}

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-5" 
              style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }} />
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5" 
              style={{ background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)' }} />
          </div>
          
          <div className="relative z-10 px-4 md:px-8 pt-20 pb-12">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
              <div className="w-full max-w-6xl mx-auto">
                
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16 mb-16 w-full mt-4 md:mt-0">
                  <div className="flex-1 text-center lg:text-left min-w-0 flex flex-col items-center lg:items-start">
                    <h1 
                      className="font-black uppercase mb-8 flex justify-center lg:justify-start w-full" 
                      style={{ lineHeight: "0.8" }}
                    >
                      <div className="flex flex-col items-start">
                        <span
                          style={{
                            fontSize: "clamp(1.2rem, 3vw, 2rem)",
                            color: "#FFFFFF",
                            letterSpacing: "0.3em",
                            marginLeft: "0",
                            opacity: "0.9"
                          }}
                        >
                          {t('home.greeting')}
                        </span>
                        <span
                          translate="no"
                          className="notranslate"
                          style={{
                            fontSize: "clamp(5rem, 14vw, 9rem)",
                            color: "var(--primary)",
                            letterSpacing: "-0.06em",
                          }}
                        >
                          Marce
                        </span>
                      </div>
                    </h1>

                    <div className="relative h-16 sm:h-20 lg:h-24 flex items-center justify-center lg:justify-start w-full mb-12 max-w-4xl px-4 lg:px-0 overflow-hidden">
                        <AnimatePresence mode="popLayout">
                            <motion.p
                            key={phraseIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            className="font-black uppercase absolute w-full text-center lg:text-left whitespace-nowrap"
                            style={{ 
                                fontSize: "clamp(1.2rem, 3.5vw, 2.0rem)",
                                color: '#FFFFFF',
                                textShadow: "2px 2px 0px var(--primary)",
                            }}
                            >
                            {carouselPhrases[phraseIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 md:gap-8 justify-center lg:justify-start w-full mt-2 px-4 lg:px-0">
                      <Link
                        to="/cv"
                        className="px-8 py-3 rounded-none text-sm font-bold uppercase tracking-widest transition-transform duration-200 hover:-translate-y-1 hover:translate-x-1"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "#121212",
                          border: "2px solid var(--primary)",
                          boxShadow: "-4px 4px 0px #FFFFFF",
                        }}
                      >
                        {t('home.buttons.cv')}
                      </Link>
                      
                      <Link
                        to="/proyectos"
                        className="px-8 py-3 rounded-none text-sm font-bold uppercase tracking-widest transition-transform duration-200 hover:-translate-y-1 hover:translate-x-1"
                        style={{
                          backgroundColor: "transparent",
                          color: "#FFFFFF",
                          border: "2px solid #FFFFFF",
                          boxShadow: "-4px 4px 0px var(--primary)",
                        }}
                      >
                        {t('home.buttons.projects')}
                      </Link>

                      <Link
                        to="/contacto"
                        className="px-8 py-3 rounded-none text-sm font-bold uppercase tracking-widest transition-transform duration-200 hover:-translate-y-1 hover:translate-x-1"
                        style={{
                          backgroundColor: "#121212",
                          color: "var(--primary)",
                          border: "2px solid var(--primary)",
                          boxShadow: "-4px 4px 0px var(--primary)",
                        }}
                      >
                        {t('home.buttons.contact')}
                      </Link>
                    </div>
                  </div>

                  <div className="flex-shrink-0 lg:-mt-18">
                    <div className="relative group" key={avatarKey}>
                      <div
                        className="absolute inset-0 rounded-full animate-pulse"
                        style={{
                          background: 'radial-gradient(circle, rgba(217, 82, 94, 0.2) 0%, transparent 70%)',
                          filter: 'blur(30px)',
                          transform: 'scale(1.2)',
                        }}
                      />

                      <div
                        className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 transition-all duration-500 hover:scale-105"
                        style={{
                          backgroundColor: "#1A1A1A",
                          borderColor: "var(--primary)",
                          boxShadow: "0 0 40px rgba(217, 82, 94, 0.4)",
                          animation: "scaleIn 1s ease-out",
                          perspective: "1000px",
                        }}
                      >
                        <img
                          src={avatarImg}
                          alt="Avatar anterior"
                          className="absolute w-full h-full object-cover object-center"
                          style={{
                            zIndex: showNewAvatar ? 1 : 3,
                            opacity: showNewAvatar ? 0 : 1,
                            transform: showNewAvatar
                              ? "scale(0.95) rotateY(10deg)"
                              : "scale(1) rotateY(0deg)",
                            transition: "opacity 1.5s ease-in-out, transform 1.5s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
                          }}
                        />
                        <img
                          src={nuevoAvatar}
                          alt="Nuevo avatar"
                          className="absolute w-full h-full object-cover object-center"
                          style={{
                            zIndex: 2,
                            opacity: showNewAvatar ? 1 : 0,
                            transform: showNewAvatar
                              ? "scale(1) rotateY(0deg)"
                              : "scale(1.05) rotateY(-10deg)",
                            transition: "opacity 1.8s ease-in-out, transform 1.8s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              
                <div className="mb-16 md:mb-24 mt-12 md:mt-20 w-full">
                  <div className="flex items-center justify-center w-full mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-center tracking-tight text-[var(--text-secondary)]">
                      {t('home.workingOn.title')}
                    </h2>
                  </div>

                  <div
                    className="group relative rounded-none overflow-hidden transition-all duration-500 w-[calc(100%-16px)] mx-auto md:w-full"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '2px solid var(--border)',
                      boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 w-full h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: 'linear-gradient(90deg, var(--secondary), var(--primary), var(--secondary), var(--primary))',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s ease-in-out infinite',
                      }}
                    />

                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 p-5 md:p-8 lg:p-10">
                      <div className="lg:w-2/5 flex-shrink-0 flex items-center justify-center">
                        <div
                          className="relative w-28 h-28 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-none flex items-center justify-center border-2 border-[var(--primary)]"
                          style={{
                            background: 'radial-gradient(circle at 40% 40%, var(--primary) 0%, var(--secondary) 40%, #1A1A1A 100%)',
                            boxShadow: '0 12px 40px rgba(217, 82, 94, 0.3)',
                            transformStyle: 'preserve-3d',
                            animation: 'float 4s ease-in-out infinite',
                          }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))',
                              mixBlendMode: 'overlay',
                            }}
                          />
                          <div
                            className="text-5xl md:text-6xl lg:text-7xl"
                            style={{
                              transform: 'translateZ(25px)',
                              textShadow: '0 0 35px rgba(255,255,255,0.8)',
                            }}
                          >
                            💡
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-3/5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3 mb-4 lg:mb-5">
                          <span
                            className="px-2 py-1 md:px-3 md:py-1 rounded-none text-[10px] md:text-xs font-bold uppercase tracking-wider text-center"
                            style={{
                              backgroundColor: 'rgba(217, 82, 94, 0.1)',
                              color: 'var(--primary)',
                              border: '1px solid var(--primary)',
                            }}
                          >
                            {t('home.workingOn.badge1')}
                          </span>
                          <span
                            className="px-2 py-1 md:px-3 md:py-1 rounded-none text-[10px] md:text-xs font-bold uppercase tracking-wider text-center"
                            style={{
                              backgroundColor: 'rgba(166, 65, 73, 0.1)',
                              color: 'var(--secondary)',
                              border: '1px solid var(--secondary)',
                            }}
                          >
                            {t('home.workingOn.badge2')}
                          </span>
                        </div>

                        <h3
                          className="text-xl md:text-2xl lg:text-4xl font-black uppercase mb-2 lg:mb-3"
                          style={{ color: 'var(--texto-principal)' }}
                        >
                          {t('home.workingOn.projectTitle')}
                        </h3>

                        <p
                          className="text-sm md:text-base lg:text-lg leading-snug lg:leading-relaxed mb-6 lg:mb-16 font-medium"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {t('home.workingOn.projectDesc')}
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                          {['AR.js', 'JavaScript', 'WebGL', '3D UI'].map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 md:px-4 md:py-2 rounded-none text-[10px] md:text-sm font-bold uppercase tracking-widest"
                              style={{
                                backgroundColor: 'var(--bg-dark)',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border)',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-16 md:mb-24 mt-12 md:mt-20 w-full">
                  <div className="hidden lg:flex flex-row gap-10 mb-12">
                    <div className="w-1/2 flex justify-center">
                      <div className="w-full max-w-[340px] text-center lg:text-left">
                        <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-[var(--text-secondary)]">
                          {t('home.skillsTitle')}
                        </h2>
                      </div>
                    </div>
                    
                    <div className="w-1/2 flex justify-center">
                      <div className="w-full max-w-[460px] text-center lg:text-left">
                        <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-[var(--text-secondary)]">
                          {t('home.journeyTitle')}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 items-center justify-center">
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-[300px] md:min-h-[420px]">
                      <h2 className="lg:hidden text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 md:mb-12 text-center text-[var(--primary)]">
                        {t('home.skillsTitle')}
                      </h2>
                      
                      <div className="w-full flex justify-center items-center">
                        <SkillsCube3D />
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col items-center">
                      <h2 className="lg:hidden text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 md:mb-12 mt-4 md:mt-10 text-center text-[var(--primary)]">
                        {t('home.journeyTitle')}
                      </h2>

                      <div 
                        className="w-[90%] sm:w-full max-w-[460px] mx-auto min-h-[250px] bg-[#121212] rounded-none border-none relative overflow-hidden flex flex-col justify-between p-4 sm:p-6"
                        style={{
                          boxShadow: "0 0 60px rgba(217, 82, 94, 0.6), 0 0 100px rgba(217, 82, 94, 0.2)",
                          animation: "float 6s ease-in-out infinite"
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: -20 }} 
                            animate={{ opacity: 1, y: 0 }}   
                            exit={{ opacity: 0, y: 20 }}     
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative z-10 w-full flex flex-col gap-4" 
                          >
                            <div className="relative w-full flex flex-col sm:flex-row items-center justify-center min-h-[90px] mb-2 sm:mb-1 mt-2 gap-4 sm:gap-0">
                              {timeline[currentStep].iconUrl && (
                                <div className="relative sm:absolute sm:left-0 w-16 h-16 sm:w-20 sm:h-20 bg-[#1A1A1A] border border-[var(--primary)] rounded-none p-1 shadow-[0_0_15px_rgba(217,82,94,0.4)] z-10 flex items-center justify-center">
                                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[var(--primary)]" />
                                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[var(--primary)]" />
                                  <img 
                                    src={timeline[currentStep].iconUrl} 
                                    alt={timeline[currentStep].year} 
                                    className="w-full h-full object-cover rounded-none" 
                                  />
                                </div>
                              )}
                              
                              <div className="text-center relative z-0">
                                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-widest drop-shadow-[0_0_15px_var(--primary)]">
                                  {timeline[currentStep].year}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-center justify-center text-center">
                              <h4 className="text-white font-bold text-base sm:text-lg mb-2 leading-tight uppercase tracking-wider">
                                {timeline[currentStep].title}
                              </h4>
                              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[95%] mx-auto font-medium">
                                {timeline[currentStep].description}
                              </p>
                            </div>

                            <div className="w-full mt-2 px-2">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-[var(--primary)] font-black italic tracking-widest text-xs sm:text-sm drop-shadow-[0_0_5px_var(--primary)]">{t('home.xp')}</span>
                                <div className="flex-1 h-2 sm:h-3 bg-black border border-gray-700 p-[2px] rounded-none overflow-hidden">
                                  <div 
                                    className="h-full bg-[var(--primary)] rounded-none transition-all duration-700 ease-out shadow-[0_0_15px_var(--primary)]"
                                    style={{ width: `${((currentStep + 1) / timeline.length) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        <div className="mt-6 flex justify-center gap-2 z-20 relative px-2 sm:px-4">
                          {timeline.map((_, idx) => (
                            <button 
                              key={idx} 
                              onClick={() => setCurrentStep(idx)} 
                              className={`h-1.5 rounded-none transition-all duration-300 ${
                                currentStep === idx 
                                ? "w-6 sm:w-8 bg-white shadow-[0_0_10px_white]" 
                                : "w-2 bg-gray-600 hover:bg-gray-400"
                              }`} 
                              aria-label={`Ir al paso ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-24 mt-20 w-full">
                  <div className="flex items-center justify-center w-full mb-12">
                    <h2 className="text-3xl md:text-4xl font-black uppercase text-center tracking-tight text-[var(--text-secondary)]">
                      {t('home.aboutMe.title')}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-0">
                    {funFacts.map((fact, index) => (
                      <div
                        key={index}
                        className="group relative rounded-none p-4 text-center transition-all duration-300 hover:-translate-y-2 cursor-default"
                        style={{
                          backgroundColor: 'var(--bg-surface)',
                          border: '2px solid var(--border)',
                          boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.5)',
                          animation: `scaleIn 0.5s ease-out ${index * 0.05}s both`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = fact.color;
                          e.currentTarget.style.boxShadow = `6px 6px 0px ${fact.color}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border)';
                          e.currentTarget.style.boxShadow = '4px 4px 0px rgba(0, 0, 0, 0.5)';
                        }}
                      >
                        <div
                          className={`absolute bottom-full mb-3 w-max max-w-[160px] sm:max-w-[180px]
                                      opacity-0 group-hover:opacity-100 pointer-events-none
                                      transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out
                                      overflow-visible tooltip z-50
                                      ${
                                        index >= 4
                                          ? "right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
                                          : "left-0 sm:left-1/2 sm:-translate-x-1/2"
                                      }`}
                          style={{
                            backgroundColor: "#1A1A1A",
                            color: "white",
                            padding: "10px 14px",
                            borderRadius: "0px",
                            border: `2px solid var(--primary)`,
                            fontSize: "0.80rem",
                            boxShadow: `-4px 4px 0px var(--primary)`,
                            whiteSpace: "normal",
                          }}
                        >
                          {/* El tooltip con lógica arreglada por ID */}
                          {fact.id === "river" ? (
                            <span className="flex flex-col items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs">
                              {fact.desc}
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_River_Plate.png"
                                alt="Escudo River Plate"
                                className="w-6 h-6 object-contain inline-block brightness-110 contrast-125"
                                style={{ filter: "drop-shadow(0 0 4px rgba(255,27,109,0.5))" }}
                              />
                            </span>
                          ) : (
                            <span className="font-bold uppercase text-xs">{fact.desc}</span>
                          )}

                          <div
                            className={`absolute top-full w-0 h-0
                                        ${
                                          index >= 4
                                            ? "right-6 sm:left-1/2 sm:-translate-x-1/2"
                                            : "left-6 sm:left-1/2 sm:-translate-x-1/2"
                                        }`}
                            style={{
                              borderLeft: "6px solid transparent",
                              borderRight: "6px solid transparent",
                              borderTop: `6px solid var(--primary)`,
                            }}
                          />
                        </div>

                        <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-125">
                          {fact.icon}
                        </div>
                        <p
                          className="text-sm font-black uppercase tracking-wide"
                          style={{ color: 'var(--texto-principal)' }}
                        >
                          {fact.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="max-w-4xl mx-auto mt-24 w-full">
                  <div className="flex items-center justify-center w-full mb-12">
                    <h2 className="text-3xl md:text-4xl font-black uppercase text-center tracking-tight text-[var(--text-secondary)]">
                      {t('home.explore.title')}
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
                    {menuItems.map((item, index) => (
                      <Link
                        to={item.to}
                        key={item.to}
                        className="group relative overflow-visible rounded-none transition-all duration-300 ease-out transform hover:-translate-y-2 block"
                        style={{
                          backgroundColor: 'var(--bg-surface)',
                          border: '2px solid var(--border)',
                          boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.5)', 
                          animationDelay: `${index * 100}ms`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--primary)'; 
                          e.currentTarget.style.boxShadow = '6px 6px 0px var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border)';
                          e.currentTarget.style.boxShadow = '6px 6px 0px rgba(0, 0, 0, 0.5)';
                        }}
                      >
                        <div className="relative p-6 h-full z-10 flex flex-col items-center text-center"> 
                          <div className="relative flex-shrink-0 mb-4">
                            <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out" 
                                style={{
                                  color: 'var(--primary)', 
                                  filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.8))'
                                }}>
                              {item.icon}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-black uppercase text-xl mb-2 transition-colors duration-300 tracking-wider" 
                              style={{ color: 'var(--text-primary)' }}>
                              {item.text}
                            </h3>

                            <p className="transition-colors duration-300 text-sm font-medium" 
                              style={{ color: 'var(--text-secondary)' }}>
                              {item.description}
                            </p>

                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                              <span className="text-sm font-black uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                                {t('home.explore.viewMore')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-20">
                  <p className="text-lg font-black uppercase tracking-widest" 
                    style={{ color: 'var(--text-muted)' }}>
                    {t('home.quote')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;