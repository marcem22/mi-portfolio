import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Mail, Phone, MapPin, Github, Linkedin, Globe, Calendar, Award, Code, Palette, Users, Zap, Lightbulb, MessageSquare,Layout, FolderOpen, FileText} from 'lucide-react';
import './CV.css';


function CV() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [currentSkill, setCurrentSkill] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const quickNav = [
        { id: 'home', name: 'Inicio', icon: Layout, route: '/' },
        { id: 'proyectos', name: 'Proyectos', icon: FolderOpen, route: '/proyectos' },
        { id: 'cv', name: 'Curriculum', icon: FileText, route: '/cv' },
        { id: 'contacto', name: 'Contacto', icon: Mail, route: '/contacto' }
    ];

  const skills = [
    { name: "C#", level: 80, color: "from-blue-400 to-indigo-400" },
    { name: "PHP", level: 75, color: "from-indigo-400 to-purple-400" },
    { name: "React", level: 70, color: "from-blue-400 to-cyan-400" },
    { name: "Python", level: 75, color: "from-yellow-400 to-orange-400" },
    { name: "Node.js", level: 75, color: "from-green-400 to-emerald-400" },
    { name: "JavaScript", level: 75, color: "from-yellow-400 to-orange-400" },
    { name: "CSS/SCSS", level: 85, color: "from-pink-400 to-rose-400" },
    { name: "HTML5", level: 95, color: "from-orange-400 to-red-400" },
    { name: "Git", level: 80, color: "from-purple-400 to-violet-400" },
    { name: "Figma", level: 80, color: "from-indigo-400 to-blue-400" },
    { name: "Canva", level: 90, color: "from-cyan-400 to-teal-400" }


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
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.2,
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

  
  return (
    <div className="min-h-screen relative bg-slate-900 text-white overflow-hidden">
      

      {/* Fondo dinámico */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900/20 to-pink-900/20">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full filter blur-3xl animate-pulse top-[-10%] left-[-10%]"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full filter blur-3xl animate-pulse bottom-[-10%] right-[-10%]"></div>
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

      {/* Cursor personalizado */}
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

      {/* Header */}
      <div className="relative z-10 p-8">
        <div className="flex items-center justify-between mb-8">
          <a
            href="/docs/CV - Marcela Mancini - Desarrolladora Web.pdf"
            download
            className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover-lift"
          >
            <Download className="w-5 h-5" />
            <span>Descargar CV</span>
          </a>
        </div>

        {/* Título principal */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent glow-text">
            Curriculum Vitae
          </h1>
          <p className="text-xl text-gray-300">
            Desarrolladora Web • Diseñadora Creativa • Futura Técnica en Programación
          </p>
        </div>

                               {/* Filtros */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {quickNav
                            .filter(nav => location.pathname !== nav.route) // 👈 Esta línea filtra la vista actual
                            .map((nav, index) => {
                                return (
                                    <button
                                        key={nav.id}
                                        onClick={() => navigate(nav.route)}
                                       className="group relative overflow-hidden rounded-2xl px-6 py-3 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-gradient-to-br from-white/15 to-slate-800/20 backdrop-blur-md border border-white/25 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 hover:shadow-xl hover:shadow-purple-500/20"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <nav.icon className="w-5 h-5" />
                                            <span className="font-medium">{nav.name}</span>
                                        </div>
                                    </button>
                                );
                            })}
                    </div>
        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna izquierda - Información personal */}
          <div className="space-y-6">

            {/* Contacto */}
            <div className="glass-morphism rounded-2xl p-6 hover-lift slide-in-left">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-pink-400" />
                Contacto
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>marcelamancinidiaz@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span>+54 9 264 4825831</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>San Juan, Argentina</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-purple-400" />
                  <span>github.com/marcem22</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-purple-400" />
                  <span>linkedin.com/in/marcela-mancini-dev</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="glass-morphism rounded-2xl p-6 hover-lift slide-in-left" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code className="w-6 h-6 text-pink-400" />
                Habilidades
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color} skill-bar`}
                        style={{
                          width: `${skill.level}%`,
                          boxShadow: currentSkill === index ? '0 0 10px rgba(255, 126, 185, 0.5)' : 'none'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Idiomas */}
            <div className="glass-morphism rounded-2xl p-6 hover-lift slide-in-left" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-pink-400" />
                Idiomas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white">Español</span>
                  <span className="text-pink-400 font-medium">Nativo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Inglés</span>
                  <span className="text-purple-400 font-medium">Intermedio</span>
                </div>

              </div>
            </div>
          </div>

          {/* Columna central y derecha - Experiencia y Educación */}
          <div className="lg:col-span-2 space-y-8">

            {/* Experiencia */}
            <div className="glass-morphism rounded-2xl p-6 hover-lift slide-in-right">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-pink-400" />
                Experiencia Profesional
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="timeline-item border-l-2 border-purple-500/30 pl-8 pb-6 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-pink-400 font-medium mb-2">{exp.company}</p>
                    <p className="text-gray-300 mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.achievements.map((achievement, i) => (
                        <span key={i} className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
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
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-pink-400" />
                Educación
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="timeline-item border-l-2 border-purple-500/30 pl-8 pb-6 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="text-xl font-bold text-white">{edu.title}</h4>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-pink-400 font-medium mb-2">{edu.institution}</p>
                    <p className="text-gray-300">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fortalezas */}
            <div className="glass-morphism rounded-2xl p-6 hover-lift slide-in-right" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-pink-400" />
                Fortalezas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <Palette className="w-5 h-5" />, title: "Creatividad", desc: "Soluciones innovadoras y diseños únicos" },
                  { icon: <Code className="w-5 h-5" />, title: "Código Limpio", desc: "Desarrollo estructurado y mantenible" },
                  { icon: <Users className="w-5 h-5" />, title: "Trabajo en Equipo", desc: "Colaboración efectiva y comunicación clara" },
                  { icon: <Zap className="w-5 h-5" />, title: "Adaptabilidad", desc: "Rápido aprendizaje de nuevas tecnologías" },
                  { icon: <MessageSquare className="w-5 h-5" />, title: "Comunicación efectiva", desc: "Capacidad para transmitir ideas con claridad" },
                  { icon: <Lightbulb className="w-5 h-5" />, title: "Resolución de problemas", desc: "Diagnóstico y solución rápida de desafíos técnicos" }
                ].map((strength, index) => (

                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <div className="text-pink-400 mt-1">
                      {strength.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">{strength.title}</h4>
                      <p className="text-sm text-gray-300">{strength.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-300 text-sm italic">
            "El código es poesía, el diseño es música, y juntos crean experiencias que trascienden"
          </p>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-6 h-6 bg-pink-400 rounded-full animate-bounce opacity-30"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-40"></div>

    </div>
  );
}

export default CV;