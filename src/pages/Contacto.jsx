import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import QuickNav from '../components/QuickNav';
import BackgroundEffects from '../components/BackgroundEffects';

import './Contacto.css';


function Contacto() {
    const [isVisible, setIsVisible] = useState(false);
   
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: '',
        tipoProyecto: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    
    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: <FaLinkedin />,
            url: 'https://www.linkedin.com/in/marcela-mancini-dev',
            color: '#3703A6',
            description: 'Conectemos profesionalmente'
        },
        {
            name: 'GitHub',
            icon: <FaGithub />,
            url: 'https://github.com/marcem22',
            color: '#0D0D0D',
            description: 'Mirá mi código'
        },
        {
            name: "Telegram",
            url: "https://t.me/TU_USUARIO",
            icon: <FaTelegramPlane />,
            color: '#3703A6',
            description: "Canal o chat de Telegram"
        },
        {
            name: 'Instagram',
            icon: <FaInstagram />,
            url: 'https://www.instagram.com/marcemancinid',
            color: '#F2138E',
            description: 'Mi lado más creativo'
        },
        {
            name: "WhatsApp",
            url: "https://wa.me/5492644825831",
            icon: <FaWhatsapp />,
            color: '#2C04BF',
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
            // Simulando envío para el demo
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitStatus('success');
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
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error en el envío:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    
    return (
        <div style={{ backgroundColor: '#0D0D0D' }} className="min-h-screen relative text-white overflow-hidden font-sans">
           <BackgroundEffects />
          
            
            {/* Efectos de fondo con partículas */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 6 + 4}px`,
                            height: `${Math.random() * 6 + 4}px`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${Math.random() * 10 + 10}s`
                        }}
                    />
                ))}
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 min-h-screen p-8 pt-20">
                <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text" style={{ color: '#F2138E' }}>
                            Hablemos
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            ¿Tenés una idea increíble? Me encanta colaborar en proyectos únicos.
                            <span style={{ color: '#2C04BF' }} className="font-medium"> Contame tu visión y hagámosla realidad juntos.</span>
                        </p>
                    </div>
                     <QuickNav />

                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Formulario de contacto */}
                        <div className="space-y-8">
                            <div className="glass-morphism rounded-2xl p-8 hover-lift">
                                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                                    <span className="mr-3">📝</span>
                                    Contame tu proyecto
                                </h2>

                                <div className="space-y-6">
                                    {/* Nombre */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Tu nombre
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            className="form-input w-full px-4 py-3 rounded-xl placeholder-gray-400"
                                            placeholder="¿Cómo te llamas?"
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="form-input w-full px-4 py-3 rounded-xl placeholder-gray-400"
                                            placeholder="tu@email.com"
                                            required
                                        />
                                    </div>

                                    {/* Tipo de proyecto */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Tipo de proyecto
                                        </label>
                                        <select
                                            name="tipoProyecto"
                                            value={formData.tipoProyecto}
                                            onChange={handleInputChange}
                                            className="form-input w-full px-4 py-3 rounded-xl"
                                            required
                                        >
                                            <option value="" disabled>Selecciona el tipo de proyecto</option>
                                            {tiposProyecto.map((tipo) => (
                                                <option key={tipo.value} value={tipo.value} style={{ backgroundColor: '#0D0D0D', color: 'white' }}>
                                                    {tipo.icon} {tipo.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Asunto */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Asunto
                                        </label>
                                        <input
                                            type="text"
                                            name="asunto"
                                            value={formData.asunto}
                                            onChange={handleInputChange}
                                            className="form-input w-full px-4 py-3 rounded-xl placeholder-gray-400"
                                            placeholder="¿De qué querés hablar?"
                                            required
                                        />
                                    </div>

                                    {/* Mensaje */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Mensaje
                                        </label>
                                        <textarea
                                            name="mensaje"
                                            value={formData.mensaje}
                                            onChange={handleInputChange}
                                            rows={5}
                                            className="form-input w-full px-4 py-3 rounded-xl placeholder-gray-400 resize-none"
                                            placeholder="Contame más sobre tu proyecto, tus ideas, objetivos..."
                                            required
                                        />
                                    </div>

                                    {/* Botón de envío */}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${isSubmitting
                                            ? 'bg-gray-600 cursor-not-allowed'
                                            : submitStatus === 'success'
                                                ? 'btn-success'
                                                : 'btn-primary hover-lift'
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
                        </div>

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
                                            className="group relative overflow-hidden rounded-xl p-4 glass-morphism social-link cursor-pointer"
                                            style={{
                                                animationDelay: `${index * 100}ms`,
                                            }}
                                        >
                                            <div 
                                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                                style={{ backgroundColor: social.color }}
                                            ></div>

                                            <div className="relative flex items-center space-x-3">
                                                <div className="text-2xl" style={{ color: social.color }}>{social.icon}</div>
                                                <div>
                                                    <h3 className="font-semibold text-white group-hover:text-white transition-all duration-300">
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
                                        <div className="contact-info-badge w-12 h-12 rounded-full flex items-center justify-center">
                                            <span className="text-xl">✨</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Disponibilidad</h3>
                                            <p className="text-gray-400">Lista para nuevos desafíos</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F2138E' }}>
                                            <span className="text-xl">🌍</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Modalidad</h3>
                                            <p className="text-gray-400">Remoto o presencial en San Juan</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2C04BF' }}>
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
            <div className="decorative-element-1 absolute top-10 left-10 w-4 h-4 rounded-full animate-pulse opacity-50"></div>
            <div className="decorative-element-2 absolute bottom-10 right-10 w-6 h-6 rounded-full animate-bounce opacity-60"></div>
            <div className="decorative-element-3 absolute top-1/3 right-20 w-3 h-3 rounded-full animate-ping opacity-50"></div>
            <div className="decorative-element-1 absolute bottom-1/3 left-20 w-2 h-2 rounded-full animate-pulse opacity-50"></div>

        </div>
    );
}

export default Contacto;