import React, { useState, useEffect } from 'react';
import { Download, Mail, Phone, MapPin, Github, Linkedin, Globe, Calendar, Award, Code, Palette, Users, Zap, Lightbulb, MessageSquare} from 'lucide-react';
import QuickNav from '../components/QuickNav';
import './CV.css';


function CV() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [currentSkill, setCurrentSkill] = useState(0);
  
  const skills = [
    { name: "C#", level: 80, color: "#2C04BF", icon: "🔷" },
    { name: "PHP", level: 75, color: "#F2138E", icon: "🐘" },
    { name: "React", level: 70, color: "#3703A6", icon: "⚛️" },
    { name: "Python", level: 75, color: "#2C04BF", icon: "🐍" },
    { name: "Node.js", level: 75, color: "#3703A6", icon: "🟢" },
    { name: "JavaScript", level: 75, color: "#F2138E", icon: "🟨" },
    { name: "CSS/SCSS", level: 85, color: "#2C04BF", icon: "🎨" },
    { name: "HTML5", level: 95, color: "#F2138E", icon: "📄" },
    { name: "Git", level: 80, color: "#3703A6", icon: "🌿" },
    { name: "Figma", level: 80, color: "#2C04BF", icon: "🎯" },
    { name: "Canva", level: 90, color: "#F2138E", icon: "✨" }
  ];

  const experiences = [
    {
      title: "Desarrolladora Web RA (Realidad Aumentada)",
      company: "Universidad / Proyecto académico",
      period: "Junio 2025 - Presente",
      description: "Desarrollo de una aplicación web interactiva basada en RA con MindAR y Three.js, enfocada en educación mediante el uso del Merge Cube.",
      achievements: [
        "Integración de RA sobre navegador sin apps externas",
        "Escenarios 3D interactivos con Three.js",
        "Enfoque didáctico y diseño de interfaz accesible"
      ]
    }
  ];

  const education = [
    {
      title: "Técnicatura Universitaria en Programación Web",
      institution: "UNSJ - Universidad Nacional de San Juan",
      period: "2022 - En curso",
      description: "Desarrollo de aplicaciones web y móviles con formación en bases de datos, redes y arquitectura de sistemas."
    },
    {
      title: "Licenciatura en Ciencias de la Computación",
      institution: "UNSJ - Universidad Nacional de San Juan",
      period: "2023 - En curso",
      description: "Formación complementaria en ciencias de la computación cursada en paralelo con la tecnicatura."
    }
  ];

  useEffect(() => {
    setIsVisible(true);

    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Generar partículas
    const generateParticles = () => {
      const newParticles = [];
      const colors = ['#F2138E', '#2C04BF', '#3703A6'];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setParticles(newParticles);
    };

    // Animación de skills
    const skillInterval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2000);

    window.addEventListener('mousemove', handleMouseMove);
    generateParticles();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(skillInterval);
    };
  }, [skills.length]);

  const strengthsData = [
    { icon: <Palette className="w-6 h-6" />, title: "Creatividad", desc: "Soluciones innovadoras y diseños únicos", color: "#2C04BF", particles: "✨" },
    { icon: <Code className="w-6 h-6" />, title: "Código Limpio", desc: "Desarrollo estructurado y mantenible", color: "#F2138E", particles: "⚡" },
    { icon: <Users className="w-6 h-6" />, title: "Trabajo en Equipo", desc: "Colaboración efectiva y comunicación clara", color: "#3703A6", particles: "🤝" },
    { icon: <Zap className="w-6 h-6" />, title: "Adaptabilidad", desc: "Rápido aprendizaje de nuevas tecnologías", color: "#2C04BF", particles: "🚀" },
    { icon: <MessageSquare className="w-6 h-6" />, title: "Comunicación efectiva", desc: "Capacidad para transmitir ideas con claridad", color: "#F2138E", particles: "💬" },
    { icon: <Lightbulb className="w-6 h-6" />, title: "Resolución de problemas", desc: "Diagnóstico y solución rápida de desafíos técnicos", color: "#3703A6", particles: "🧠" }
  ];
  
  return (
    <>
     
      
      <div className="min-h-screen relative text-white overflow-hidden" style={{ backgroundColor: '#0D0D0D' }}>
        {/* Fondo dinámico */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute w-96 h-96 rounded-full filter blur-3xl animate-pulse top-[-10%] left-[-10%] opacity-30"
            style={{ backgroundColor: '#3703A6' }}
          ></div>
          <div 
            className="absolute w-96 h-96 rounded-full filter blur-3xl animate-pulse bottom-[-10%] right-[-10%] opacity-20"
            style={{ backgroundColor: '#F2138E' }}
          ></div>
          <div 
            className="absolute w-64 h-64 rounded-full filter blur-2xl animate-bounce top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-15"
            style={{ backgroundColor: '#2C04BF' }}
          ></div>
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
              backgroundColor: particle.color,
              animationDelay: `${particle.id * 0.5}s`,
            }}
          />
        ))}

        {/* Cursor personalizado */}
        <div
          className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen transition-all duration-300 ease-out"
          style={{
            backgroundColor: '#F2138E',
            transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
            opacity: mousePosition.x > 0 ? 1 : 0,
            filter: 'blur(1px)',
          }}
        >
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ backgroundColor: '#F2138E' }}
          ></div>
        </div>

        {/* Header */}
        <div className="relative z-10 p-8">
          <div className="flex items-center justify-between mb-8">
            <a
              href="/docs/CV - Marcela Mancini - Desarrolladora Web.pdf"
              download
              className="flex items-center gap-3 px-6 py-3 rounded-full hover:opacity-80 transition-all duration-300 hover-lift text-white"
              style={{ backgroundColor: '#F2138E' }}
            >
              <Download className="w-5 h-5" />
              <span>Descargar CV</span>
            </a>
          </div>

          {/* Título principal */}
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-text" style={{ color: '#F2138E' }}>
              Curriculum Vitae
            </h1>
            <p className="text-xl" style={{ color: '#FFFFFF' }}>
              Desarrolladora Web • Diseñadora Creativa • Futura Técnica en Programación
            </p>
          </div>
          <QuickNav />
          {/* Contenido principal */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Columna izquierda - Información personal */}
            <div className="space-y-6">

              {/* Contacto */}
              <div className="glass-morphism rounded-2xl p-6 hover-lift slide-in-left">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: '#F2138E' }}>
                  <Mail className="w-6 h-6" />
                  Contacto
                </h3>
                <div className="space-y-3" style={{ color: '#FFFFFF' }}>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                    <span>marcelamancinidiaz@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                    <span>+54 9 264 4825831</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                    <span>San Juan, Argentina</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                    <span>github.com/marcem22</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                    <span>linkedin.com/in/marcela-mancini-dev</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="glass-morphism rounded-2xl p-6 hover-lift slide-in-left" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#F2138E' }}>
                  <Code className="w-6 h-6" />
                  Habilidades
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="group relative">
                      <div 
                        className="relative overflow-hidden rounded-xl p-4 border transition-all duration-300 hover:scale-105"
                        style={{ 
                          backgroundColor: `${skill.color}10`,
                          borderColor: `${skill.color}40`,
                          boxShadow: currentSkill === index ? `0 0 20px ${skill.color}40` : 'none'
                        }}
                      >
                        {/* Efecto de brillo */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                          style={{ backgroundColor: skill.color }}
                        />
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{skill.icon}</span>
                              <span className="font-medium text-white">{skill.name}</span>
                            </div>
                            <span 
                              className="text-sm font-bold px-2 py-1 rounded-full"
                              style={{ 
                                color: skill.color,
                                backgroundColor: `${skill.color}20`
                              }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                          
                          {/* Barra de progreso circular */}
                          <div className="relative w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#0D0D0D' }}>
                            <div
                              className="absolute top-0 left-0 h-full rounded-full skill-bar transition-all duration-1000 ease-out"
                              style={{
                                width: `${skill.level}%`,
                                backgroundColor: skill.color,
                                boxShadow: `0 0 10px ${skill.color}60`,
                                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`
                              }}
                            />
                            
                            {/* Efecto de brillo en la barra */}
                            <div 
                              className="absolute top-0 left-0 h-full w-full opacity-30"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${skill.color}40, transparent)`,
                                animation: currentSkill === index ? 'skill-shine 2s ease-in-out infinite' : 'none'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Idiomas */}
              <div className="glass-morphism rounded-2xl p-6 hover-lift slide-in-left" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: '#F2138E' }}>
                  <Globe className="w-6 h-6" />
                  Idiomas
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Español</span>
                    <span className="font-medium" style={{ color: '#2C04BF' }}>Nativo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Inglés</span>
                    <span className="font-medium" style={{ color: '#3703A6' }}>Intermedio</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna central y derecha - Experiencia y Educación */}
            <div className="lg:col-span-2 space-y-8">

              {/* Experiencia */}
              <div className="glass-morphism rounded-2xl p-6 hover-lift slide-in-right">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#F2138E' }}>
                  <Zap className="w-6 h-6" />
                  Experiencia Profesional
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={index} className="timeline-item pl-8 pb-6 last:pb-0" style={{ borderLeft: `2px solid #3703A6` }}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                        <span className="text-sm flex items-center gap-1" style={{ color: '#2C04BF' }}>
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                      </div>
                      <p className="font-medium mb-2" style={{ color: '#F2138E' }}>{exp.company}</p>
                      <p className="mb-3" style={{ color: '#2C04BF' }}>{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.achievements.map((achievement, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-3 py-1 rounded-full border text-white"
                            style={{ 
                              backgroundColor: '#3703A6',
                              borderColor: '#2C04BF'
                            }}
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Educación */}
              <div className="glass-morphism rounded-2xl p-6 hover-lift slide-in-right" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#F2138E' }}>
                  <Award className="w-6 h-6" />
                  Educación
                </h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="timeline-item pl-8 pb-6 last:pb-0" style={{ borderLeft: `2px solid #3703A6` }}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h4 className="text-xl font-bold text-white">{edu.title}</h4>
                        <span className="text-sm flex items-center gap-1" style={{ color: '#2C04BF' }}>
                          <Calendar className="w-4 h-4" />
                          {edu.period}
                        </span>
                      </div>
                      <p className="font-medium mb-2" style={{ color: '#F2138E' }}>{edu.institution}</p>
                      <p style={{ color: '#2C04BF' }}>{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fortalezas */}
              <div className="glass-morphism rounded-2xl p-6 hover-lift slide-in-right" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#F2138E' }}>
                  <Users className="w-6 h-6" />
                  Fortalezas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {strengthsData.map((strength, index) => (
                    <div 
                      key={index} 
                      className="group relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-1"
                      style={{ 
                        backgroundColor: `${strength.color}08`,
                        border: `2px solid ${strength.color}30`,
                        animationDelay: `${index * 150}ms`
                      }}
                    >
                      {/* Fondo animado al hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500"
                        style={{ 
                          background: `radial-gradient(circle at center, ${strength.color}40, transparent 70%)`
                        }}
                      />
                      
                      {/* Partículas flotantes */}
                      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce">
                        <span className="text-sm">{strength.particles}</span>
                      </div>
                      
                      <div className="relative z-10 text-center">
                        {/* Icono compacto */}
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundColor: `${strength.color}20`,
                            border: `1px solid ${strength.color}40`,
                            boxShadow: `0 0 15px ${strength.color}20`
                          }}
                        >
                          <div style={{ color: strength.color }}>
                            {React.cloneElement(strength.icon, { className: "w-5 h-5" })}
                          </div>
                        </div>
                        
                        {/* Contenido compacto */}
                        <div>
                          <h4 
                            className="font-bold text-sm mb-2 transition-all duration-300 group-hover:text-white"
                            style={{ color: strength.color }}
                          >
                            {strength.title}
                          </h4>
                          <p 
                            className="text-xs leading-relaxed transition-all duration-300"
                            style={{ color: '#E8E8E8' }}
                          >
                            {strength.desc}
                          </p>
                        </div>
                        
                        {/* Indicador de progreso decorativo */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div 
                            className="h-full w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
                            style={{ 
                              background: `linear-gradient(90deg, transparent, ${strength.color}, transparent)`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t" style={{ borderColor: '#3703A6' }}>
            <p className="text-sm italic" style={{ color: '#FFFFFF' }}>
              "El código es poesía, el diseño es música, y juntos crean experiencias que trascienden"
            </p>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div 
          className="absolute top-10 left-10 w-4 h-4 rounded-full animate-pulse opacity-50"
          style={{ backgroundColor: '#3703A6' }}
        ></div>
        <div 
          className="absolute bottom-10 right-10 w-6 h-6 rounded-full animate-bounce opacity-30"
          style={{ backgroundColor: '#F2138E' }}
        ></div>
        <div 
          className="absolute top-1/3 right-20 w-3 h-3 rounded-full animate-ping opacity-40"
          style={{ backgroundColor: '#2C04BF' }}
        ></div>
      </div>
    </>
  );
}

export default CV;