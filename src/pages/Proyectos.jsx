import React, { useState, useEffect } from 'react';
import './Proyectos.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, FolderOpen, FileText, Mail } from 'lucide-react';
import teassistImage from '../assets/images/teassist.png';
import habitosImage from '../assets/images/habitos.png';
import gobiernoImage from '../assets/images/gobierno.png';

function Proyectos() {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const [selectedFilter] = useState('todos');
    const location = useLocation();
    const navigate = useNavigate();

    const quickNav = [
        { id: 'home', name: 'Inicio', icon: Layout, route: '/' },
        { id: 'proyectos', name: 'Proyectos', icon: FolderOpen, route: '/proyectos' },
        { id: 'cv', name: 'Curriculum', icon: FileText, route: '/cv' },
        { id: 'contacto', name: 'Contacto', icon: Mail, route: '/contacto' }
    ];

    // Aquí se agregarán los proyectos reales
    const proyectos = [
        {
            id: 1,
            title: "TEAssist",
            description: "Plataforma integral de seguimiento y asistencia para pacientes con autismo, desarrollada con React y backend personalizado.Ofrece herramientas especializadas para pacientes y terapeutas, facilitando el monitoreo del progreso y la gestión de terapias personalizadas.",
            category: "web",
            image: teassistImage,
            technologies: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS", "Vite", "JavaScript"],
            link: "#",
            github: "https://github.com/eormeno/teassist/tree/mancini",
            featured: true
        },
        {
            id: 2,
            title: "Hábitos +",
            description: "Plataforma web para crear y seguir hábitos saludables de forma visual y motivadora. Los usuarios pueden establecer metas personalizadas, registrar su progreso diario y visualizar su evolución a través de una interfaz intuitiva que hace del cambio de hábitos una experiencia atractiva.",
            category: "web",
            image: habitosImage,
            technologies: [".NET 9", "C#", "JavaScript", "Bootstrap", "Vite", "MySQL"],
            link: "https://marcem22.github.io/Habitos-/",
            github: "https://github.com/marcem22/Habitos-",
            featured: false
        },
        {
            id: 3,
            title: "SJ Gobierno",
            description: "Proyecto final desde Figma con diseño responsive y accesibilidad.",
            category: "web",
            image: gobiernoImage,
            technologies: ["Bootstrap", "CSS", "Html"],
            link: "https://marcem22.github.io/final-dise-o-web-I/",
            github: "https://github.com/marcem22/final-dise-o-web-I",
            featured: false
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
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.4 + 0.1,
                });
            }
            setParticles(newParticles);
        };

        window.addEventListener('mousemove', handleMouseMove);
        generateParticles();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const filteredProjects = selectedFilter === 'todos'
        ? proyectos
        : proyectos.filter(project => project.category === selectedFilter);

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
                        animationDelay: `${particle.id * 0.7}s`,
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

            {/* Contenido principal */}
            <div className="relative z-10 min-h-screen p-8 pt-20">
                <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-pink-500 glow-text">
                            Mis Proyectos
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Cada proyecto es una historia única. Una combinación de código, diseño y emoción
                            <span className="text-pink-400 font-medium"> que busca conectar.</span>
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

                    {/* Grid de proyectos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`group relative overflow-hidden rounded-2xl hover-lift  ${project.featured ? 'lg:col-span-2' : ''
                                    }`}
                                style={{
                                    animationDelay: `${index * 200}ms`,
                                }}
                            >
                                {/* Fondo base con glassmorphism */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-black/40 backdrop-blur-xl border border-white/10 rounded-2xl"></div>

                                {/* Borde animado */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-rose-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                                <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/80 backdrop-blur-xl"></div>

                                {/* Contenido */}
                                <div className="relative h-full p-8">
                                    {/* Área de imagen */}
                                    <div className="mb-6 h-48 overflow-hidden rounded-xl border border-white/10 bg-black flex items-center justify-center">
                                        <img
                                            src={project.image}
                                            alt={`Captura de ${project.title}`}
                                            className="h-full w-full object-cover object-top antialiased"
                                        />
                                    </div>

                                    {/* Información del proyecto */}
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                                                {project.title}
                                            </h3>
                                            {project.featured && (
                                                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-medium">
                                                    Destacado
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                            {project.description}
                                        </p>

                                        {/* Tecnologías */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 bg-slate-800/50 text-purple-300 text-xs rounded-full border border-purple-500/30"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Enlaces */}
                                        <div className="flex space-x-4 pt-4">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm z-20"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <span>🔗</span>
                                                <span>Ver proyecto</span>
                                            </a>

                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm relative z-20"
                                                onClick={(e) => {
                                                    console.log('CLICK FUNCIONA');
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <span>💻</span>
                                                <span>Código</span>
                                            </a>
                                        </div>


                                        {/* Efectos decorativos */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>

                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
                                            <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))} {/* <-- Aquí se cierra el map */}
                    </div> {/* Fin del grid */}

                    {/* CTA Section */}
                    <div className="text-center">
                        <div className="glass-morphism rounded-2xl p-8 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-4 text-pink-500">¿Tenés una idea?</h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Me encanta trabajar en proyectos únicos y desafiantes. Si tenés una idea, hablemos y
                                hagámosla realidad juntos.
                            </p>
                            <Link
                                to="/contacto"
                                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover-lift"
                            >
                                Trabajemos juntos
                            </Link>
                        </div>
                    </div>



                    {/* Frase motivacional */}
                    <div className="text-center mt-12">
                        <p className="text-gray-300 text-sm italic">
                            "Cada línea de código es una oportunidad para crear algo extraordinario"
                        </p>
                    </div>
                </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
            <div className="absolute bottom-10 right-10 w-6 h-6 bg-pink-400 rounded-full animate-bounce opacity-30"></div>
            <div className="absolute top-1/3 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
            <div className="mt-12 text-center z-20 relative">

            </div>



        </div>

    );
}

export default Proyectos;