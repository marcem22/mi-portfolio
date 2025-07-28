import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, FolderOpen, FileText, Mail } from 'lucide-react';

const QuickNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const quickNav = [
    { id: 'home', name: 'Inicio', icon: Layout, route: '/' },
    { id: 'proyectos', name: 'Proyectos', icon: FolderOpen, route: '/proyectos' },
    { id: 'cv', name: 'Curriculum', icon: FileText, route: '/cv' },
    { id: 'contacto', name: 'Contacto', icon: Mail, route: '/contacto' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {quickNav
        .filter(nav => location.pathname !== nav.route)
        .map((nav, index) => {
          return (
            <button
              key={nav.id}
              onClick={() => navigate(nav.route)}
              className="group relative overflow-hidden rounded-2xl px-6 py-3 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-md border-2 hover:shadow-xl quicknav-button"
              style={{
                backgroundColor: 'rgba(13, 13, 13, 0.6)',
                borderColor: '#3703A6',
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Efecto de brillo al hover */}
              <div 
                className="quicknav-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(242, 19, 142, 0.3) 50%, transparent 70%)',
                  transform: 'translateX(-100%)',
                  animation: 'shimmer 2s infinite'
                }}
              />
              
              {/* Borde interno brillante */}
              <div 
                className="quicknav-border absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border" 
                style={{ borderColor: '#F2138E' }}
              />

              <div className="flex items-center space-x-2 relative z-10">
                <nav.icon 
                  className="w-5 h-5 transition-all duration-300 group-hover:scale-110 quicknav-icon" 
                  style={{ color: '#2C04BF' }}
                />
                <span 
                  className="transition-all duration-300 quicknav-text"
                  style={{ color: '#FFFFFF' }}
                >
                  {nav.name}
                </span>
              </div>

              {/* Partículas decorativas con la nueva paleta */}
              <div 
                className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse particle-lime" 
                style={{ backgroundColor: '#2C04BF' }}
              />
              <div 
                className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping particle-teal" 
                style={{ backgroundColor: '#3703A6' }}
              />
              <div 
                className="absolute top-1/2 left-1 w-0.5 h-0.5 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-700 animate-bounce particle-magenta" 
                style={{ backgroundColor: '#F2138E' }}
              />
            </button>
          );
        })}
    </div>
  );
};

// Animación shimmer para el CSS adicional
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;
document.head.appendChild(style);

export default QuickNav;