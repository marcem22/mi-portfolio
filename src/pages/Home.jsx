import './Home.css';
import React, { useState, useEffect } from 'react';
import avatarImg from '../assets/avatar.png';
import { Link } from 'react-router-dom';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);
  const [particles, setParticles] = useState([]);

  const roles = [
    "Desarrolladora Web",
    "Diseñadora Creativa",
    "Futura Técnica en Programación",
    "Creadora de Experiencias"
  ];

  useEffect(() => {
    setIsVisible(true);

    // Animación de roles
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Generar partículas
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
      setParticles(newParticles);
    };

    window.addEventListener('mousemove', handleMouseMove);
    generateParticles();

    return () => {
      clearInterval(roleInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [roles.length]);

  const menuItems = [
    {
      to: "/proyectos",
      icon: "⚡",
      text: "Proyectos",
      color: "from-purple-500 via-pink-500 to-rose-500",
      description: "Mis creaciones"
    },
    {
      to: "/cv",
      icon: "📋",
      text: "CV",
      color: "from-purple-500 via-pink-500 to-rose-500",
      description: "Mi experiencia"
    },
    {
      to: "/contacto",
      icon: "💬",
      text: "Contacto",
      color: "from-purple-500 via-pink-500 to-rose-500",
      description: "Hablemos"
    }
  ];

  return (

    <div className="min-h-screen relative bg-slate-900 text-white overflow-hidden font-sans">


      {/* Fondo dinámico */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900/20 to-pink-900/20">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full filter blur-3xl animate-pulse top-[-10%] left-[-10%]"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full filter blur-3xl animate-pulse bottom-[-10%] right-[-10%] animation-delay-1000"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-2xl animate-bounce top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Partículas flotantes */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDelay: `${particle.id * 0.5}s`,
          }}
        />
      ))}

      {/* Cursor personalizado mejorado */}
      <div
        className="fixed w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-screen transition-all duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
          opacity: mousePosition.x > 0 ? 1 : 0,
          filter: 'blur(1px)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-30"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          <div className="p-8 max-w-4xl mx-auto">
            {/* Avatar con efectos mejorados */}
            <div className="flex justify-center mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pulse-ring"></div>
                <div className="relative glass-morphism rounded-full p-1 hover-lift">
                  <div className="w-52 h-52 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-rose-500/30 flex items-center justify-center border-2 border-white/20">
                    <img
                      src={avatarImg}
                      alt="Avatar de Marcela"
                      className="w-48 h-48 rounded-full object-cover object-center shadow-2xl filter brightness-110 contrast-105 saturate-105 group-hover:brightness-125 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Texto principal con efectos */}
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-pink-500">
                ¡Hola! Soy Marcela
              </h1>
              <div className="text-2xl md:text-3xl text-gray-400 mb-4 font-light">
                <span className="writing-effect inline-block">

                  {roles[currentRole]}
                </span>
              </div>
              <p className="text-xl text-white leading-relaxed max-w-2xl mx-auto">
                Diseño experiencias que conectan desde lo profundo y dicen lo que las palabras no alcanzan. ¿Tenés una idea?
                <span className="font-medium">Hagámosla sentir de verdad.</span>
              </p>
            </div>

            {/* Menú renovado */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {menuItems.map((item, index) => (
                <Link
                  to={item.to}
                  key={item.to}
                  className="group relative overflow-hidden rounded-2xl hover-lift"
                  style={{
                    animationDelay: `${index * 300}ms`,
                  }}
                >
                  {/* Fondo base con glassmorphism */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-black/40 backdrop-blur-xl border border-white/10 rounded-2xl"></div>

                  {/* Efecto de brillo sutil */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl"></div>

                  {/* Borde animado */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-rose-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/80 backdrop-blur-xl"></div>

                  {/* Contenido */}
                  <div className="relative p-8 h-full transition-all duration-500">
                    <div className="text-center">
                      <div className="text-5xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter group-hover:drop-shadow-[0_0_15px_rgba(255,126,185,0.8)]">
                        {item.icon}
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                        {item.text}
                      </h3>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>

                    {/* Efecto de barrido sutil */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>

                    {/* Partículas en hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-rose-400 rounded-full animate-bounce"></div>
                    </div>

                    {/* Resplandor en hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-radial from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Indicador de scroll mejorado */}
            <div className="flex justify-center">
              <div className="animate-bounce">
                <div className="w-8 h-12 border-2 border-gradient-to-r from-purple-400 to-pink-400 rounded-full flex justify-center relative overflow-hidden">
                  <div className="w-2 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>

            {/* Frase motivacional */}
            <div className="text-center mt-12">
              <p className="text-gray-300 text-sm italic">
                "El diseño no es solo cómo se ve, sino cómo funciona y cómo hace sentir"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos adicionales */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-6 h-6 bg-pink-400 rounded-full animate-bounce opacity-30"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
    </div>
  );
}
export default Home;