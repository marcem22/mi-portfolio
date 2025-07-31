// src/pages/TeAssistNotice.jsx
import { Link } from 'react-router-dom';


const TeAssistNotice = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden"
      style={{
        background: 'var(--negro-absoluto)',
        color: 'var(--texto-principal)'
      }}
    >
      {/* Efectos de fondo futuristas */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: `radial-gradient(circle, var(--magenta-intenso) 0%, transparent 70%)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-700"
          style={{
            background: `radial-gradient(circle, var(--purpura-electrico) 0%, transparent 70%)`
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            background: `radial-gradient(circle, var(--azul-cosmico) 0%, transparent 70%)`
          }}
        ></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-2xl">
        {/* Título principal con glow */}
        <h1 
          className="text-4xl md:text-5xl font-bold mb-6 relative"
          style={{
            color: 'var(--texto-principal)',
            
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.02em'
          }}
        >
          Proyecto no disponible
        </h1>
          
        {/* Línea decorativa */}
        <div 
          className="w-32 h-0.5 mx-auto mb-8 relative"
          style={{
            background: `linear-gradient(90deg, transparent, var(--magenta-intenso), var(--purpura-electrico), var(--azul-cosmico), transparent)`,
            boxShadow: `0 0 10px var(--magenta-intenso)`
          }}
        ></div>

        {/* Descripción con glassmorphism */}
        <div 
          className="p-8 rounded-2xl mb-8 backdrop-blur-sm border border-opacity-20 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, 
              rgba(242, 19, 142, 0.1) 0%,
              rgba(55, 3, 166, 0.1) 50%,
              rgba(44, 4, 191, 0.1) 100%)`,
            borderColor: 'var(--magenta-intenso)',
            boxShadow: `
              0 8px 32px rgba(242, 19, 142, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          {/* Efecto de brillo interno */}
          <div 
            className="absolute top-0 left-0 w-full h-0.5 opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, var(--magenta-intenso), transparent)`
            }}
          ></div>
          
          <p 
            className="text-lg leading-relaxed mb-6"
            style={{ color: 'var(--texto-secundario)' }}
          >
            El proyecto <strong style={{ color: 'var(--magenta-intenso)' }}>TEAssist</strong> aún no está desplegado online. 
            Podés consultar el código fuente en GitHub mientras tanto.
          </p>

          {/* Botón GitHub con efectos avanzados */}
          <a
            href="https://github.com/eormeno/teassist/tree/mancini"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
            style={{
              background: `linear-gradient(135deg, var(--azul-cosmico), var(--purpura-electrico))`,
              color: 'var(--texto-principal)',
              boxShadow: `
                0 4px 20px rgba(44, 4, 191, 0.4),
                0 0 20px rgba(44, 4, 191, 0.2)
              `,
              border: `1px solid rgba(44, 4, 191, 0.3)`
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = `
                0 6px 30px rgba(44, 4, 191, 0.6),
                0 0 40px rgba(44, 4, 191, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `;
              e.target.style.background = `linear-gradient(135deg, var(--azul-cosmico), var(--magenta-intenso))`;
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = `
                0 4px 20px rgba(44, 4, 191, 0.4),
                0 0 20px rgba(44, 4, 191, 0.2)
              `;
              e.target.style.background = `linear-gradient(135deg, var(--azul-cosmico), var(--purpura-electrico))`;
            }}
          >
            {/* Efecto de brillo animado */}
            <div 
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`
              }}
            ></div>
            
            <svg 
              className="w-5 h-5 mr-3" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" 
                clipRule="evenodd" 
              />
            </svg>
            Ver repositorio en GitHub
          </a>
        </div>

        {/* Link de regreso con estilo futurista */}
        <Link 
          to="/" 
          className="inline-flex items-center text-sm transition-all duration-300 hover:scale-105 relative group"
          style={{
            color: 'var(--texto-secundario)',
            textShadow: '0 0 10px rgba(232, 232, 232, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = 'var(--magenta-intenso)';
            e.target.style.textShadow = '0 0 15px var(--magenta-intenso)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'var(--texto-secundario)';
            e.target.style.textShadow = '0 0 10px rgba(232, 232, 232, 0.3)';
          }}
        >
          <svg 
            className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Volver al inicio
        </Link>
      </div>

      {/* Partículas flotantes decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-40 animate-bounce"
            style={{
              background: i % 3 === 0 ? 'var(--magenta-intenso)' : 
                         i % 3 === 1 ? 'var(--purpura-electrico)' : 'var(--azul-cosmico)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              boxShadow: `0 0 10px currentColor`
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TeAssistNotice;
