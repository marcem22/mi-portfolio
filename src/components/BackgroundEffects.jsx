import React, { useState, useEffect } from 'react';

const BackgroundEffects = ({ showCursor = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const generateParticles = () => {
      // Tu paleta vibrante personal
      const colors = ['#F2138E', '#D91494', '#3703A6', '#2C04BF', '#FF4DB3'];
      const newParticles = Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.25 + 0.1,
        color: colors[i % colors.length],
      }));
      setParticles(newParticles);
    };

    if (showCursor) window.addEventListener('mousemove', handleMouseMove);
    generateParticles();

    return () => {
      if (showCursor) window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showCursor]);

  return (
    <>
      {/* Fondo base */}
      <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'var(--fondo-principal)' }}>

        {/* Burbujas decorativas con tu paleta personal */}
        {[
          { size: 'w-96 h-96', top: '-15%', left: '-15%', color: 'rgba(242, 19, 142, 0.12)' },
          { size: 'w-80 h-80', bottom: '-10%', right: '-10%', color: 'rgba(217, 20, 148, 0.10)', delay: '2s' },
          { size: 'w-64 h-64', top: '33%', left: '25%', color: 'rgba(55, 3, 166, 0.08)', delay: '1s' },
          { size: 'w-48 h-48', top: '66%', right: '33%', color: 'rgba(44, 4, 191, 0.06)' },
          { size: 'w-56 h-56', top: '25%', right: '25%', color: 'rgba(242, 19, 142, 0.08)' },
          { size: 'w-32 h-32', top: '50%', left: '16%', color: 'rgba(217, 20, 148, 0.10)', delay: '1.5s' },
          { size: 'w-40 h-40', bottom: '25%', left: '66%', color: 'rgba(55, 3, 166, 0.07)', delay: '2.5s' },
        ].map((bubble, index) => (
          <div
            key={index}
            className={`absolute rounded-full blur-3xl animate-pulse ${bubble.size}`}
            style={{
              backgroundColor: bubble.color,
              top: bubble.top,
              bottom: bubble.bottom,
              left: bubble.left,
              right: bubble.right,
              animationDuration: '10s',
              animationDelay: bubble.delay || '0s',
            }}
          />
        ))}
      </div>

      {/* Partículas */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            backgroundColor: p.color,
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: `particleFloat ${6 + p.id * 0.4}s ease-in-out infinite`,
            animationDelay: `${p.id * 0.5}s`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}30`,
          }}
        />
      ))}

      {/* Cursor actualizado */}
      {showCursor && (
        <div
          className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
            opacity: mousePosition.x > 0 ? 1 : 0,
          }}
        >
          <div
            className="w-10 h-10 rounded-full border-2 relative"
            style={{
              backgroundColor: 'rgba(217, 20, 148, 0.15)',
              borderColor: '#D91494',
              filter: 'blur(0.5px)',
            }}
          >
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-40 border-2"
              style={{
                borderColor: '#F2138E',
                animationDuration: '2s',
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: '#3703A6' }}
            />
          </div>
        </div>
      )}

      {/* Keyframes */}
      <style >{`
        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-10px) translateX(5px) rotate(90deg) scale(1.05);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-20px) translateX(-3px) rotate(180deg) scale(0.95);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-10px) translateX(-5px) rotate(270deg) scale(1.02);
            opacity: 0.12;
          }
        }
      `}</style>
    </>
  );
};

export default BackgroundEffects;