import React, { useState, useEffect } from 'react';
import './Proyectos.css';
import { Link } from 'react-router-dom';
import teassistImage from '../assets/images/teassist.png';
import habitosImage from '../assets/images/habitos.png';
import gobiernoImage from '../assets/images/gobierno.png';
import QuickNav from '../components/QuickNav';
import BackgroundEffects from '../components/BackgroundEffects';

function Proyectos() {
    const [isVisible, setIsVisible] = useState(false);

    const [selectedFilter] = useState('todos');

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
    }, []);

    const filteredProjects = selectedFilter === 'todos'
        ? proyectos
        : proyectos.filter(project => project.category === selectedFilter);
    return (
        <div className="min-h-screen relative bg-light text-dark overflow-hidden font-sans">
            <BackgroundEffects />
            {/* Contenido principal */}
            <div className="relative z-10 min-h-screen p-8 pt-20">
                <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 main-title">
                            Mis Proyectos
                        </h1>
                        <p className="text-xl max-w-2xl mx-auto leading-relaxed text-dark">
                            Cada proyecto es una historia única. Una combinación de código, diseño y emoción
                            <span className="accent-text"> que busca conectar.</span>
                        </p>
                    </div>
                    <QuickNav />

                    {/* Grid de proyectos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`group relative overflow-hidden rounded-2xl hover-lift project-card ${project.featured ? 'lg:col-span-2' : ''}`}
                                style={{
                                    animationDelay: `${index * 200}ms`
                                }}
                            >
                                {/* Contenido */}
                                <div className="relative h-full p-8">
                                    {/* Área de imagen responsive */}
                                    <div className={`mb-6 overflow-hidden rounded-xl border-2 image-container ${project.featured
                                        ? 'h-32 sm:h-52 md:h-56 lg:h-64 xl:h-72'
                                        : 'h-32 sm:h-48 md:h-48 lg:h-48'
                                        }`}>
                                        <img
                                            src={project.image}
                                            alt={`Captura de ${project.title}`}
                                            className="w-full h-full object-cover object-top antialiased"
                                        />
                                    </div>

                                    {/* Información del proyecto */}
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-xl font-bold text-dark group-hover:text-magenta transition-all duration-300">
                                                {project.title}
                                            </h3>
                                            {project.featured && (
                                                <span className="px-3 py-1 text-white text-xs rounded-full font-medium border-2 featured-badge">
                                                    Destacado
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray text-sm leading-relaxed group-hover:text-dark transition-colors duration-300">
                                            {project.description}
                                        </p>

                                        {/* Tecnologías */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="tech-tag px-3 py-1 text-white text-xs rounded-full border transition-all duration-300 hover:scale-105"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Enlaces */}
                                        <div className="flex space-x-4 pt-4">
                                            {project.link && project.link !== "#" ? (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-ver-proyecto z-20"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <span>🔗</span>
                                                    <span>Ver proyecto</span>
                                                </a>
                                            ) : (
                                                <Link
                                                    to="/teassist"
                                                    className="btn-ver-proyecto z-20"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <span>🔗</span>
                                                    <span>Ver proyecto</span>
                                                </Link>
                                            )}


                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-codigo z-20"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <span>💻</span>
                                                <span>Código</span>
                                            </a>
                                        </div>

                                        {/* Efectos decorativos */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute top-4 right-4 w-2 h-2 rounded-full animate-ping particle-magenta"></div>
                                            <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full animate-pulse particle-teal"></div>
                                            <div className="absolute top-1/2 left-4 w-1.5 h-1.5 rounded-full animate-bounce particle-lime"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section mejorada */}
                    <div className="text-center">
                        <div className="cta-container">
                            <h2 className="cta-title">¿Tenés una idea?</h2>
                            <p className="cta-text">
                                Me encanta trabajar en proyectos únicos y desafiantes. Si tenés una idea, hablemos y
                                hagámosla realidad juntos.
                            </p>
                            <Link
                                to="/contacto"
                                className="btn-trabajar-juntos"
                            >
                                Trabajemos juntos
                            </Link>
                        </div>
                    </div>

                    {/* Frase motivacional mejorada */}
                    <div className="text-center mt-12">
                        <p className="motivational-text text-sm italic">
                            "Cada línea de código es una oportunidad para crear algo extraordinario"
                        </p>
                    </div>
                </div>
            </div>

            {/* Elementos decorativos con nueva paleta */}
            <div className="absolute top-10 left-10 w-4 h-4 rounded-full animate-pulse opacity-30 particle-magenta"></div>
            <div className="absolute bottom-10 right-10 w-6 h-6 rounded-full animate-bounce opacity-20 particle-teal"></div>
            <div className="absolute top-1/3 right-20 w-3 h-3 rounded-full animate-ping opacity-25 particle-lime"></div>
            <div className="absolute bottom-1/4 left-16 w-2 h-2 rounded-full animate-pulse opacity-20 particle-olive"></div>
            <div className="mt-12 text-center z-20 relative">
            </div>
        </div>
    );
}
export default Proyectos;