import './Home.css';
import React, { useState, useEffect } from 'react';
import avatarImg from '../assets/avatar.png';
import { Link } from 'react-router-dom';
import BackgroundEffects from '../components/BackgroundEffects';

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    "Desarrolladora Web",
    "Diseñadora Creativa",
    "Futura Técnica en Programación",
    "Creadora de Experiencias"
  ];

  useEffect(() => {
    setIsVisible(true);

    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(roleInterval);
  }, [roles.length]);

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
    <div className="min-h-screen relative overflow-hidden font-sans" style={{ backgroundColor: 'var(--fondo-principal)', color: 'var(--texto-principal)' }}>
      <BackgroundEffects />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="p-8 max-w-4xl mx-auto">

            <div className="flex justify-center mb-12">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full gentle-float" style={{
                  backgroundColor: 'var(--acento-primario)',
                  opacity: 0.15,
                  filter: 'blur(8px)'
                }}></div>
                <div className="relative rounded-full p-1">
                  <div
                    className="w-52 h-52 rounded-full overflow-hidden flex items-center justify-center border-4"
                    style={{
                      backgroundColor: '#ffffff',
                      borderColor: 'var(--magenta-intenso)',
                      boxShadow: '0 0 25px rgba(242, 19, 142, 0.6), 0 0 50px rgba(55, 3, 166, 0.3)',
                    }}
                  >
                    <img
                      src={avatarImg}
                      alt="Avatar de Marcela"
                      className="w-48 h-48 rounded-full object-cover object-center shadow-lg transition-transform duration-500 hover:scale-105"
                      style={{
                        filter: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-12">
              <h1
                className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight hover:scale-105 transition-transform duration-300"
                style={{ color: 'var(--texto-principal)' }}
              >
                ¡Hola! Soy Marcela
              </h1>

              <div className="text-2xl md:text-3xl mb-4 font-light" style={{ color: 'var(--magenta-intenso)' }}>
                <span className="writing-effect inline-block">
                  {roles[currentRole]}
                </span>
              </div>

              <p className="text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--texto-secundario)' }}>
                Diseño experiencias que conectan desde lo profundo y dicen lo que las palabras no alcanzan. ¿Tenés una idea?
                <span className="font-medium glow-text" style={{ color: 'var(--texto-principal)' }}> Hagámosla sentir de verdad.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {menuItems.map((item, index) => (
                <Link
                  to={item.to}
                  key={item.to}
                  className="group relative overflow-hidden rounded-[28px] transition-all duration-700 ease-out transform hover:scale-105 hover:-rotate-1 card-magnetic"
                  style={{
                    background: 'linear-gradient(135deg, rgba(242, 19, 142, 0.08), rgba(217, 20, 148, 0.12), rgba(55, 3, 166, 0.06))',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid rgba(242, 19, 142, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(242, 19, 142, 0.15)',
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  {/* Efectos de fondo dinámicos */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div 
                      className="absolute top-0 left-0 w-full h-full rounded-[28px]"
                      style={{
                        background: 'radial-gradient(circle at 30% 20%, rgba(44, 4, 191, 0.25), transparent 50%), radial-gradient(circle at 70% 80%, rgba(44, 4, 191, 0.2), transparent 50%)'
                      }}
                    />
                  </div>

                  {/* Línea decorativa superior - todas azul cósmico en hover */}
                  <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-t-[28px]"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #2C04BF, transparent)'
                    }}
                  />

                  <div className="relative p-8 h-full z-10">
                    <div className="text-center">
                      {/* Icono mejorado con efectos */}
                      <div className="relative mb-6">
                        <div 
                          className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 relative z-10"
                          style={{
                            filter: `drop-shadow(0 0 20px ${
                              index === 0 ? 'rgba(34, 197, 94, 0.4)' 
                              : index === 1 ? 'rgba(249, 115, 22, 0.4)'
                              : 'rgba(168, 85, 247, 0.4)'
                            })`,
                            textShadow: `0 0 30px ${
                              index === 0 ? '#22c55e' 
                              : index === 1 ? '#f97316'
                              : '#a855f7'
                            }`
                          }}
                        >
                          {item.icon}
                        </div>
                        
                        {/* Círculo de resplandor detrás del icono */}
                        <div 
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700 animate-pulse"
                          style={{
                            backgroundColor: '#2C04BF',
                            filter: 'blur(15px)'
                          }}
                        />
                      </div>

                      <h3 className="font-bold text-2xl mb-3 transition-all duration-500" style={{ color: 'var(--texto-principal)' }}>
                        <span 
                          className="group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500"
                         
                        >
                          {item.text}
                        </span>
                      </h3>

                      <p className="transition-all duration-300 text-base font-medium" style={{ color: 'var(--texto-secundario)' }}>
                        {item.description}
                      </p>

                      {/* Botón CTA dinámico */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                        <div 
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: 'rgba(44, 4, 191, 0.2)',
                            color: '#2C04BF',
                            border: '1px solid rgba(44, 4, 191, 0.4)'
                          }}
                        >
                          Explorar →
                        </div>
                      </div>
                    </div>

                    {/* Partículas decorativas */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div 
                        className="absolute top-6 right-6 w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: '#2C04BF' }}
                      />
                      <div 
                        className="absolute bottom-8 left-8 w-1 h-1 rounded-full animate-pulse"
                        style={{ backgroundColor: '#3703A6' }}
                      />
                      <div 
                        className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full animate-bounce"
                        style={{ backgroundColor: '#2C04BF' }}
                      />
                      <div 
                        className="absolute bottom-1/3 right-8 w-1 h-1 rounded-full animate-pulse"
                        style={{ backgroundColor: '#6B47FF' }}
                      />
                    </div>

                    {/* Borde brillante en hover */}
                    <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 20px rgba(44, 4, 191, 0.15)'
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-sm italic font-medium subtle-glow-light" style={{ color: 'var(--texto-secundario)' }}>
                "El diseño no es solo cómo se ve, sino cómo funciona y cómo hace sentir"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-4 h-4 rounded-full animate-pulse opacity-30" style={{ backgroundColor: '#D91494' }}></div>
      <div className="absolute bottom-10 right-10 w-6 h-6 rounded-full animate-bounce opacity-20" style={{ backgroundColor: '#F2138E' }}></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 rounded-full animate-ping opacity-25" style={{ backgroundColor: '#3703A6' }}></div>
    </div>
  );
}

export default Home;