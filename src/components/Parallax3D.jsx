import React, { useEffect, useRef } from 'react';

function Parallax3D() {
  const containerRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      layersRef.current.forEach((layer, index) => {
        if (layer) {
          const depth = (index + 1) * 50; 
          const x = moveX * depth;
          const y = moveY * depth;
          
          layer.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      layersRef.current.forEach((layer, index) => {
        if (layer) {
          const speed = (index + 1) * 0.3; 
          layer.style.transform = `translateY(${scrollY * speed}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const shapes = [
    { size: 400, color: 'rgba(217, 82, 94, 0.12)', blur: 60, top: '5%', left: '10%', shape: 'circle' },
    { size: 300, color: 'rgba(166, 65, 73, 0.15)', blur: 50, top: '50%', right: '5%', shape: 'circle' },
    
    { size: 350, color: 'rgba(164, 165, 166, 0.12)', blur: 55, top: '25%', right: '15%', shape: 'circle' },
    { size: 280, color: 'rgba(217, 82, 94, 0.1)', blur: 45, bottom: '15%', left: '20%', shape: 'circle' },
    
    { size: 500, color: 'rgba(61, 60, 64, 0.4)', blur: 70, top: '40%', left: '35%', shape: 'circle' },
    { size: 250, color: 'rgba(166, 65, 73, 0.12)', blur: 40, top: '75%', right: '25%', shape: 'circle' },
    
    { size: 200, color: 'rgba(217, 82, 94, 0.15)', blur: 25, top: '10%', right: '35%', shape: 'square', rotate: 45 },
    { size: 150, color: 'rgba(164, 165, 166, 0.15)', blur: 20, bottom: '25%', right: '10%', shape: 'square', rotate: 30 },
    { size: 180, color: 'rgba(166, 65, 73, 0.15)', blur: 22, top: '60%', left: '5%', shape: 'square', rotate: 60 },
  ];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {shapes.map((shape, index) => (
        <div
          key={index}
          ref={(el) => (layersRef.current[Math.floor(index / 3)] = el)}
          className="absolute transition-transform duration-200 ease-out"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            background: shape.color,
            filter: `blur(${shape.blur}px)`,
            borderRadius: shape.shape === 'circle' ? '50%' : '20%',
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            transform: shape.rotate ? `rotate(${shape.rotate}deg)` : 'none',
            willChange: 'transform',
          }}
        />
      ))}

      <svg className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: -1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#D9525E', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: '#A64149', stopOpacity: 0.1 }} />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#A4A5A6', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: '#3D3C40', stopOpacity: 0.2 }} />
          </linearGradient>
        </defs>
        
        <line x1="5%" y1="15%" x2="45%" y2="85%" stroke="url(#lineGradient)" strokeWidth="3" />
        <line x1="55%" y1="5%" x2="95%" y2="65%" stroke="url(#lineGradient2)" strokeWidth="3" />
        <line x1="15%" y1="75%" x2="75%" y2="25%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="80%" y1="80%" x2="30%" y2="40%" stroke="url(#lineGradient2)" strokeWidth="2" />
        
        <circle cx="20%" cy="30%" r="3" fill="#D9525E" opacity="0.4" />
        <circle cx="70%" cy="20%" r="4" fill="#A4A5A6" opacity="0.5" />
        <circle cx="85%" cy="70%" r="2" fill="#A64149" opacity="0.4" />
        <circle cx="15%" cy="85%" r="3" fill="#D9D9D9" opacity="0.3" />
      </svg>
    </div>
  );
}

export default Parallax3D;