import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, FolderOpen, FileText, Mail } from 'lucide-react';

import './Contacto.css';


function Contacto() {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: '',
        tipoProyecto: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const quickNav = [
        { id: 'home', name: 'Inicio', icon: Layout, route: '/' },
        { id: 'proyectos', name: 'Proyectos', icon: FolderOpen, route: '/proyectos' },
        { id: 'cv', name: 'Curriculum', icon: FileText, route: '/cv' },
        { id: 'contacto', name: 'Contacto', icon: Mail, route: '/contacto' }
    ];

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: <FaLinkedin />,
            url: 'https://www.linkedin.com/in/marcela-mancini-dev',
            color: 'from-blue-500 to-blue-700',
            description: 'Conectemos profesionalmente'
        },
        {
            name: 'GitHub',
            icon: <FaGithub />,
            url: 'https://github.com/marcem22',
            color: 'from-gray-400 to-gray-800',
            description: 'Mirá mi código'
        },
        {
            name: "Telegram",
            url: "https://t.me/TU_USUARIO",
            icon: <FaTelegramPlane />,
            color: "from-blue-200 to-blue-600",
            description: "Canal o chat de Telegram"
        },
        {
            name: 'Instagram',
            icon: <FaInstagram />,
            url: 'https://www.instagram.com/marcemancinid',
            color: 'from-pink-500 to-rose-500',
            description: 'Mi lado más creativo'
        },
        {
            name: "WhatsApp",
            url: "https://wa.me/5492644825831",
            icon: <FaWhatsapp />,
            color: "from-green-400 to-green-600",
            description: "Contacto directo"
        }
    ];

    const tiposProyecto = [
        { value: 'web', label: 'Desarrollo Web', icon: '🌐' },
        { value: 'design', label: 'Diseño UI/UX', icon: '🎨' },
        { value: 'mobile', label: 'App Mobile', icon: '📱' },
        { value: 'branding', label: 'Branding', icon: '✨' },
        { value: 'consultoria', label: 'Consultoría', icon: '💡' },
        { value: 'otro', label: 'Otro', icon: '🚀' }
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
            for (let i = 0; i < 12; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 4 + 2,
                    speedX: (Math.random() - 0.5) * 0.4,
                    speedY: (Math.random() - 0.5) * 0.4,
                    opacity: Math.random() * 0.5 + 0.2,
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/xblkrnee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    email: formData.email,
                    asunto: formData.asunto,
                    mensaje: formData.mensaje,
                    tipoProyecto: formData.tipoProyecto
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                // Reset form after success
                setTimeout(() => {
                    setFormData({
                        nombre: '',
                        email: '',
                        asunto: '',
                        mensaje: '',
                        tipoProyecto: ''
                    });
                    setSubmitStatus('');
                }, 3000);
            } else {
                setSubmitStatus('error');
                console.error('Error en el envío:', data);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error en el fetch:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


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
                        animationDelay: `${particle.id * 0.8}s`,
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
                            Hablemos
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            ¿Tenés una idea increíble? Me encanta colaborar en proyectos únicos.
                            <span className="text-pink-400 font-medium"> Contame tu visión y hagámosla realidad juntos.</span>
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                        {/* Formulario de contacto */}
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="glass-morphism rounded-2xl p-8 hover-lift">
                                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                                    <span className="mr-3">📝</span>
                                    Contame tu proyecto
                                </h2>

                                <div className="space-y-6">
                                    {/* Nombre */}
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Tu nombre
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                            placeholder="¿Cómo te llamas?"
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                            placeholder="tu@email.com"
                                            required
                                        />
                                    </div>

                                    {/* Tipo de proyecto */}
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Tipo de proyecto
                                        </label>
                                        <select
                                            name="tipoProyecto"
                                            value={formData.tipoProyecto}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                            required
                                        >
                                            <option value="" disabled>Selecciona el tipo de proyecto</option>
                                            {tiposProyecto.map((tipo) => (
                                                <option key={tipo.value} value={tipo.value}>
                                                    {tipo.icon} {tipo.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Asunto */}
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Asunto
                                        </label>
                                        <input
                                            type="text"
                                            name="asunto"
                                            value={formData.asunto}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                            placeholder="¿De qué querés hablar?"
                                            required
                                        />
                                    </div>

                                    {/* Mensaje */}
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Mensaje
                                        </label>
                                        <textarea
                                            name="mensaje"
                                            value={formData.mensaje}
                                            onChange={handleInputChange}
                                            rows={5}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                                            placeholder="Contame más sobre tu proyecto, tus ideas, objetivos..."
                                            required
                                        />
                                    </div>

                                    {/* Botón de envío */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${isSubmitting
                                            ? 'bg-slate-600 cursor-not-allowed'
                                            : submitStatus === 'success'
                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover-lift'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3"></div>
                                                Enviando...
                                            </div>
                                        ) : submitStatus === 'success' ? (
                                            <div className="flex items-center justify-center">
                                                <span className="mr-2">✅</span>
                                                ¡Mensaje enviado!
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <span className="mr-2">🚀</span>
                                                Enviar mensaje
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>


                        {/* Información de contacto y redes */}
                        <div className="space-y-8">

                            {/* Redes sociales */}
                            <div className="glass-morphism rounded-2xl p-8 hover-lift">
                                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                                    <span className="mr-3">🌐</span>
                                    Conectemos
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative overflow-hidden rounded-xl p-4 glass-morphism hover-lift cursor-pointer"
                                            style={{
                                                animationDelay: `${index * 100}ms`,
                                            }}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>

                                            <div className="relative flex items-center space-x-3">
                                                <div className="text-2xl">{social.icon}</div>
                                                <div>
                                                    <h3 className="font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                                                        {social.name}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm">{social.description}</p>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            {/* Información de contacto */}
                            <div className="glass-morphism rounded-2xl p-8 hover-lift">
                                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                                    <span className="mr-3">💬</span>
                                    Información de contacto
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                            <span className="text-xl">✨</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Disponibilidad</h3>
                                            <p className="text-gray-400">Lista para nuevos desafíos</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                            <span className="text-xl">🌍</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Modalidad</h3>
                                            <p className="text-gray-400">Remoto o presencial en San Juan</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                            <span className="text-xl">⚡</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Respuesta</h3>
                                            <p className="text-gray-400">En el menor tiempo posible</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Call to action */}
                            <div className="glass-morphism rounded-2xl p-8 text-center">
                                <div className="mb-4">
                                    <span className="text-4xl">💡</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    ¿Tenés una idea?
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    No importa si es grande o pequeña,
                                    toda gran idea empieza con una conversación.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Frase motivacional */}
                    <div className="text-center mt-16">
                        <p className="text-gray-300 text-sm italic">
                            "La mejor manera de predecir el futuro es crearlo juntos"
                        </p>
                    </div>
                </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
            <div className="absolute bottom-10 right-10 w-6 h-6 bg-pink-400 rounded-full animate-bounce opacity-30"></div>
            <div className="absolute top-1/3 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
            <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-rose-400 rounded-full animate-pulse opacity-40"></div>


        </div>
    );
}


export default Contacto;