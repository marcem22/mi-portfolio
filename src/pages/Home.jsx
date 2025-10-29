import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackgroundEffects from '../components/BackgroundEffects';
import Parallax3D from '../components/Parallax3D';
import SkillsCube3D from '../components/SkillsCube3D'; 
import SplashScreen from "../components/SplashScreen";
import avatarImg from '../assets/avatar.png';
import nuevoAvatar from "../assets/nuevoAvatar.png";
import '../pages/Home.css';



function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [avatarKey, setAvatarKey] = useState(0);
  const [showSplash, setShowSplash] = useState(() => {
  return !sessionStorage.getItem("splashShown");
});

  const [showNewAvatar, setShowNewAvatar] = useState(false);
// 🧠 Control del SplashScreen + transición de avatares + visibilidad
useEffect(() => {
  // ✅ Solo configurar la marca si aún no existe
  const splashWasShown = sessionStorage.getItem("splashShown");

  if (!splashWasShown) {
    // Primera vez → dejamos que se muestre el splash
    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("splashShown", "true"); // lo marcamos después de verlo
    }, 9500); // ⏱️ el tiempo de duración del splash

    return () => clearTimeout(timer);
  } else {
    // Ya fue mostrado → no mostrar splash otra vez
    setShowSplash(false);
  }
}, []);

// 🔁 Transición entre avatares y aparición del contenido
useEffect(() => {
  if (!showSplash) {
    setIsVisible(true);

    // Arranca mostrando el avatar original con una leve entrada 3D
    setShowNewAvatar(false);
    setAvatarKey((k) => k + 1);

    const startTimer = setTimeout(() => {
      const t = setTimeout(() => setShowNewAvatar(true), 3000);
      return () => clearTimeout(t);
    }, 800);

    return () => clearTimeout(startTimer);
  }
}, [showSplash]);



  const roles = [
    "Desarrolladora Web",
    "Diseñadora Creativa",
    "Creadora de Experiencias",
    "Futura Técnica en Programación"
  ];

  const funFacts = [
    { icon: "💖", text: "Obsesionada con el rosa", color: "#FF8FD6" },
    { icon: "⚽", text: "Hincha de River Plate", color: "#FF6B9D" },
    { icon: "🐕", text: "Mamá de Buddy", color: "#FFB3E6" },
    { icon: "✈️", text: "Adicta a viajar", color: "#FFC8E9" },
    { icon: "👩‍🍳", text: "Amante de la cocina", color: "#FF8FD6" },
    { icon: "🍺", text: "Team cerveza", color: "#FF6B9D" },
    { icon: "🎨", text: "Odio dibujar", color: "#FFB3E6" },
    { icon: "🌙", text: "Nunca descanso", color: "#FFC8E9" },
  ];

  const timeline = [
    {
      year: "2022",
      title: "Inicio en la Tecnicatura Universitaria",
      icon: "🎓",
      description: "Comienzo mis estudios en Desarrollo de Software y escribo mi primera línea de código.",
    },
    {
      year: "2023",
      title: "Primer proyecto web académico",
      icon: "🌐",
      description: "Desarrollo del front-end para un sitio de una entidad gubernamental como parte de una materia.",
    },
    {
      year: "2024",
      title: "Proyectos con PHP y bases de datos",
      icon: "🧩",
      description: "Implementación de sitios dinámicos con PHP, MySQL y buenas prácticas de desarrollo.",
    },
    {
      year: "2025",
      title: "Explorando la Realidad Aumentada",
      icon: "🚀",
      description: "Primer empleo como desarrolladora, aplicando AR.js y tecnologías 3D en proyectos educativos.",
    },
  ];


  // Efecto typing
  useEffect(() => {
    const currentText = roles[currentRole];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText.length < currentText.length) {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      } else if (!isDeleting && displayedText.length === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRole, roles]);



  const menuItems = [
    {
      to: "/proyectos",
      icon: "⚡",
      text: "Proyectos",
      description: "Mis creaciones"
    },
    {
      to: "/cv",
      icon: "📋",
      text: "CV",
      description: "Mi experiencia"
    },
    {
      to: "/contacto",
      icon: "💬",
      text: "Contacto",
      description: "Hablemos"
    }
  ];

  return (
  <>
    {showSplash ? (
      <SplashScreen onFinish={() => setShowSplash(false)} />
    ) : (
      <div
        className="relative overflow-hidden font-sans"
        style={{
          backgroundColor: "var(--fondo-principal)",
          color: "var(--texto-principal)",
          opacity: 1, 
          transition: "opacity 1s ease"
        }}
      >
        {/* 🌸 Efectos de fondo */}
        <BackgroundEffects />
        <Parallax3D />

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
          @keyframes slideInLeft {
            0% { transform: translateX(-50px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
        `}</style>

      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-5" 
          style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5" 
          style={{ background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 p-8 pt-20 pb-12">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="p-8 max-w-6xl mx-auto">

            {/* HERO SECTION */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-16">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="font-extrabold mb-8 tracking-tight leading-tight">
                  <span className="block relative inline-block" style={{ 
                    fontSize: '4rem', 
                    color: 'var(--texto-principal)' 
                  }}>
                    Hola, soy
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-0.5" 
                      style={{ 
                        backgroundColor: '#FF8FD6',
                        boxShadow: '0 0 20px rgba(255, 143, 214, 0.8)'
                      }} />
                  </span>
                  <span className="block mt-2 relative inline-block" 
                    style={{ 
                      fontSize: '5rem',
                      color: '#FF8FD6',
                      textShadow: '0 0 60px rgba(255, 143, 214, 0.6)'
                    }}>
                    Marcela
                    <div className="absolute -bottom-2 left-0 right-0 h-1 rounded-full" 
                      style={{ 
                        background: 'linear-gradient(90deg, #FF8FD6, #FFB3E6, #FF8FD6)',
                        boxShadow: '0 0 30px rgba(255, 143, 214, 0.8)',
                        animation: 'shimmer 3s ease-in-out infinite'
                      }} />
                  </span>
                </h1>

                <div className="text-xl md:text-2xl mb-6 font-medium h-10 flex items-center justify-center lg:justify-start" 
                  style={{ color: '#FFFFFF' }}>
                  <span className="inline-flex items-center">
                    {displayedText}
                    <span className="inline-block w-1 h-7 ml-1 animate-pulse" 
                      style={{ backgroundColor: 'var(--primary)' }} />
                  </span>
                </div>

                <p className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0" 
                  style={{ color: 'var(--text-secondary)' }}>
                  Diseño experiencias que conectan desde lo profundo y dicen lo que las palabras no alcanzan.
                  <span className="font-semibold" style={{ color: 'var(--texto-principal)' }}> ¿Tenés una idea? Hagámosla sentir de verdad.</span>
                </p>
                
                {/* Botones Hero */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
            {[
              { to: "/cv", label: "Ver CV" },
              { to: "/proyectos", label: "Proyectos" },
              { to: "/contacto", label: "Contacto" },
            ].map((btn) => (
              <Link
                key={btn.to}
                to={btn.to}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,143,214,0.6)]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1.5px solid #FF8FD6",
                  backdropFilter: "blur(10px)",
                }}
              >
                {btn.label}
              </Link>
            ))}
          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <div className="relative group" key={avatarKey}>
                            <div
                              className="absolute inset-0 rounded-full animate-pulse"
                              style={{
                                background: 'radial-gradient(circle, rgba(255, 179, 230, 0.3) 0%, transparent 70%)',
                                filter: 'blur(30px)',
                                transform: 'scale(1.2)',
                              }}
                            />

                          <div
            className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 transition-all duration-500 hover:scale-105"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#FFB3E6",
              boxShadow: "0 0 40px rgba(255, 179, 230, 0.5)",
              animation: "scaleIn 1s ease-out",
              perspective: "1000px",
            }}
          >
            {/* Avatar anterior */}
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
                transition:
                  "opacity 1.5s ease-in-out, transform 1.5s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
              }}
            />

            {/* Nuevo avatar */}
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
                transition:
                  "opacity 1.8s ease-in-out, transform 1.8s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
              }}
            />
          </div>

                </div>
              </div>
            </div>

            {/* CURRENTLY WORKING ON */}
            <div className="mb-24">
              <div className="flex items-center justify-center mb-8">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50" />
                <h2
                  className="text-3xl font-bold mb-6 relative inline-block"
                  style={{ color: 'var(--texto-principal)' }}
                >
                  Trabajando en:
                  <div
                    className="absolute -bottom-1 left-0 w-20 h-0.5"
                    style={{
                      backgroundColor: '#FF8FD6',
                      boxShadow: '0 0 15px rgba(255, 143, 214, 0.6)',
                    }}
                  />
                </h2>
                
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50" />
              </div>

              <div
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '2px solid var(--border)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Barra superior animada */}
                <div
                  className="absolute top-0 left-0 w-full h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      'linear-gradient(90deg, #FF8FD6, #FFB3E6, #FFC8E9, #FFB3E6, #FF8FD6)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                />

                <div className="flex flex-col lg:flex-row gap-10 p-10">
                  {/* Visual 3D - Bombilla */}
                  <div className="lg:w-2/5 flex-shrink-0 flex items-center justify-center">
                    <div
                      className="relative w-64 h-64 rounded-2xl flex items-center justify-center"
                      style={{
                        background:
                          'radial-gradient(circle at 40% 40%, #FFB3E6 0%, #FF8FD6 40%, #141414 100%)',
                        boxShadow: '0 12px 40px rgba(255, 143, 214, 0.3)',
                        transformStyle: 'preserve-3d',
                        animation: 'float 4s ease-in-out infinite',
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background:
                            'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(0,0,0,0.2))',
                          mixBlendMode: 'overlay',
                        }}
                      />
                      <div
                        className="text-7xl"
                        style={{
                          transform: 'translateZ(25px)',
                          textShadow: '0 0 35px rgba(255,255,255,1)',
                        }}
                      >
                        💡
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="lg:w-3/5 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: 'rgba(255, 143, 214, 0.15)',
                          color: '#FF8FD6',
                          border: '1px solid #FF8FD6',
                        }}
                      >
                        🚀 Proyecto Actual
                      </span>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: 'rgba(255, 179, 230, 0.15)',
                          color: '#FFB3E6',
                          border: '1px solid #FFB3E6',
                        }}
                      >
                        💼 Desarrollo Web 3D
                      </span>
                    </div>

                    <h3
                      className="text-3xl font-bold mb-3"
                      style={{ color: 'var(--texto-principal)' }}
                    >
                      App de Realidad Aumentada
                    </h3>

                    <p
                      className="text-lg leading-relaxed mb-8"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Creación de una experiencia web inmersiva con AR.js, donde la
                      interacción 3D y el aprendizaje se fusionan para explorar nuevas
                      formas de enseñar y descubrir.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                      {['AR.js', 'JavaScript', 'WebGL', '3D UI'].map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-lg text-sm font-semibold"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            color: 'var(--texto-principal)',
                            border: '1px solid rgba(255, 143, 214, 0.3)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">👥</span>
                        <span style={{ color: 'var(--text-secondary)' }}>3 devs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">⏳</span>
                        <span style={{ color: 'var(--text-secondary)' }}>En progreso</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           {/* SEPARADOR */}
            <div className="flex items-center justify-center my-10">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50" />
              <div className="mx-4 text-2xl" style={{ color: '#FF8FD6' }}>
                ✦
              </div>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50" />
            </div>

            {/* CUBO 3D + TIMELINE */}
            <div className="flex flex-col lg:flex-row gap-10 items-start mb-16">
              {/* Cubo 3D */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                <SkillsCube3D />
              </div>

              {/* Timeline */}
              <div className="w-full lg:w-1/2">
                <h2
                  className="text-3xl font-bold mb-8 relative inline-block"
                  style={{ color: 'var(--texto-principal)' }}
                >
                  Mi Recorrido
                  <div
                    className="absolute -bottom-1 left-0 w-20 h-0.5"
                    style={{
                      backgroundColor: '#FF8FD6',
                      boxShadow: '0 0 15px rgba(255, 143, 214, 0.6)',
                    }}
                  />
                </h2>

                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      className="group relative flex items-start gap-4 transition-all duration-300"
                      style={{
                        animation: `slideInLeft 0.6s ease-out ${index * 0.1}s both`,
                      }}
                    >
                      {/* Línea conectora */}
                      {index !== timeline.length - 1 && (
                        <div
                          className="absolute left-[42px] top-[60px] w-0.5 h-[calc(100%+0px)]"
                          style={{
                            background:
                              'linear-gradient(to bottom, rgba(255, 143, 214, 0.5), rgba(255, 143, 214, 0.2))',
                          }}
                        />
                      )}

                      {/* Icon bubble */}
                      <div
                        className="relative flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{
                          backgroundColor: 'rgba(255, 143, 214, 0.1)',
                          border: '2px solid rgba(255, 143, 214, 0.3)',
                          boxShadow: '0 4px 15px rgba(255, 143, 214, 0.2)',
                        }}
                      >
                        {item.icon}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              'radial-gradient(circle, rgba(255, 143, 214, 0.3) 0%, transparent 70%)',
                            filter: 'blur(10px)',
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <div
                          className="text-sm font-bold mb-1"
                          style={{ color: '#FF8FD6' }}
                        >
                          {item.year}
                        </div>
                        <h3
                          className="text-xl font-bold mb-1"
                          style={{ color: 'var(--texto-principal)' }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-20">
              <div className="flex items-center justify-center mb-8">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50" />
                <h2
                  className="mx-6 text-2xl font-bold"
                  style={{ color: 'var(--texto-principal)' }}
                >
                  Un poco sobre mí
                </h2>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {funFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-default"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '2px solid transparent',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                      animation: `scaleIn 0.5s ease-out ${index * 0.05}s both`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = fact.color;
                      e.currentTarget.style.boxShadow = `0 8px 25px ${fact.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.boxShadow =
                        '0 4px 15px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    {/* Ícono principal */}
                    <div className="text-4xl mb-2 transition-transform duration-300 group-hover:scale-125">
                      {fact.icon}
                    </div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: 'var(--texto-principal)' }}
                    >
                      {fact.text}
                    </p>
{/* Tooltip con animación y triángulo */}
<div
  className="absolute left-1/2 bottom-full mb-3 w-max max-w-[160px] sm:max-w-[180px]
             -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none
             transform translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-out
             overflow-visible"
  style={{
    backgroundColor: "rgba(0,0,0,0.85)",
    color: "white",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "0.75rem",
    boxShadow: `0 0 10px ${fact.color}60`,
    whiteSpace: "normal",
  }}
>
  {/* Texto del tooltip */}
  {fact.text === "Hincha de River Plate" && (
  <span className="flex items-center justify-center gap-2">
    Llevo una banda roja en el alma
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_River_Plate.png"
      alt="Escudo River Plate"
      className="w-5 h-5 object-contain inline-block brightness-110 contrast-125"
      style={{ filter: "drop-shadow(0 0 4px rgba(255,27,109,0.5))" }}
    />
  </span>
)}
  {fact.text === "Obsesionada con el rosa" && "Literal, hasta el código tiene rosa 💖"}
  {fact.text === "Mamá de Buddy" && "Mi perro cree que soy una diosa del teclado 🐶"}
  {fact.text === "Adicta a viajar" && "El mundo también se explora en HTML ✈️"}
  {fact.text === "Amante de la cocina" && "Me encanta cocinar tanto como programar 👩‍🍳"}
  {fact.text === "Team cerveza" && "🍺 + código = a veces buena idea"}
  {fact.text === "Odio dibujar" && "Pero amo diseñar interfaces 🎨"}
  {fact.text === "Nunca descanso" && "Compilando sueños a medianoche 🌙"}

  {/* Triángulo */}
  <div
    className="absolute left-1/2 translate-x-[-50%] top-full w-0 h-0"
    style={{
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent",
      borderTop: `6px solid rgba(0,0,0,0.85)`,
      filter: `drop-shadow(0 0 4px ${fact.color}60)`,
    }}
  />
</div>

                  </div>
                ))}
              </div>
            </div>


            {/* SEPARADOR */}
            <div className="flex items-center justify-center my-16">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50" />
              <div className="mx-4 text-2xl" style={{ color: '#FF8FD6' }}>✦</div>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50" />
            </div>

            {/* TARJETAS DE NAVEGACIÓN */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center relative inline-block w-full">
                <span style={{ color: 'var(--texto-principal)' }}>Explorá mi trabajo</span>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5" 
                  style={{ 
                    backgroundColor: '#FF8FD6',
                    boxShadow: '0 0 15px rgba(255, 143, 214, 0.6)'
                  }} />
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menuItems.map((item, index) => (
                  <Link
                    to={item.to}
                    key={item.to}
                    className="group relative overflow-visible rounded-xl transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 card-magnetic block"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', 
                      animationDelay: `${index * 100}ms`,
                      filter: 'drop-shadow(0 0 0px rgba(255, 27, 109, 0))',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'drop-shadow(0 0 25px rgba(255, 27, 109, 0.5))'; 
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(255, 27, 109, 0))';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-t-xl"
                      style={{
                        background: 'linear-gradient(90deg, transparent, var(--primary), transparent)'
                      }} />

                    <div className="relative p-6 h-full z-10 flex flex-col items-center text-center"> 
                      <div className="relative flex-shrink-0 mb-4">
                        <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out" 
                            style={{
                              color: index === 0 ? 'var(--primary)' 
                                    : index === 1 ? 'var(--secondary)'
                                    : 'var(--accent)',
                              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
                            }}>
                          {item.icon}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-xl mb-2 transition-colors duration-300" 
                          style={{ color: 'var(--text-primary)' }}>
                          {item.text}
                        </h3>

                        <p className="transition-colors duration-300 text-sm" 
                          style={{ color: 'var(--text-secondary)' }}>
                          {item.description}
                        </p>

                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                          <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                            Ver más →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* QUOTE FINAL */}
            <div className="text-center mt-16">
              <p className="text-sm italic font-medium" 
                style={{ color: 'var(--text-muted)' }}>
                "El diseño no es solo cómo se ve, sino cómo funciona y cómo hace sentir"
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