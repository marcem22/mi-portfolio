import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../pages/SplashScreen.css";

function SplashScreen({ onFinish }) {
  const { i18n } = useTranslation();
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const onFinishRef = useRef(onFinish);

  const isEn = i18n.language?.startsWith("en");

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 4500);
    const finishTimer = setTimeout(() => onFinishRef.current?.(), 5000);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40); 

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="splash" className={fadeOut ? "fadeout" : ""} style={{ position: "relative" }}>
      
      {/* 1. EL TOQUECITO: Brillo ambiental de fondo con pulso sutil */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#D9525E]/10 blur-[140px] rounded-full pointer-events-none select-none"
        style={{ animation: "pulse 4s ease-in-out infinite" }}
      />

      {/* CABECERA CON PUNTO LUMINOSO */}
      <div className="splash-header">
        <span 
          className="status-dot" 
          style={{ boxShadow: "0 0 10px #D9525E, 0 0 4px #D9525E" }}
        />
        {isEn ? "MARCELA_OS // CORE_SYSTEM_v2.6" : "MARCELA_OS // SISTEMA_CORE_v2.6"}
      </div>

      {/* CONTENIDO CENTRAL */}
      <div className="modern-intro-container">
        
        <p className="intro-line" id="line1">
          <span className="prefix" style={{ textShadow: "0 0 8px #D9525E", color: "#D9525E", fontWeight: "bold" }}>&gt;</span>
          {isEn ? " Initializing user interface layout..." : " Inicializando interfaz de usuario..."}
        </p>
        
        <p className="intro-line" id="line2">
          <span className="prefix" style={{ textShadow: "0 0 8px #D9525E", color: "#D9525E", fontWeight: "bold" }}>&gt;</span>
          {isEn ? " Loading immersive 3D render environments..." : " Cargando entornos de renderizado 3D..."}
        </p>
        
        <p className="intro-line" id="line3">
          <span className="prefix" style={{ textShadow: "0 0 8px #D9525E", color: "#D9525E", fontWeight: "bold" }}>&gt;</span>
          {isEn ? " Synchronizing core development stack..." : " Sincronizando núcleo de desarrollo..."}
        </p>
        
        <p className="intro-line" id="line4">
          <span className="prefix" style={{ textShadow: "0 0 8px #D9525E", color: "#D9525E", fontWeight: "bold" }}>&gt;</span>
          marcela@mint-portfolio {isEn ? "ready" : "listo"}{" "}
          <span className="highlight" style={{ textShadow: "0 0 10px #D9525E" }}>✔️</span>
        </p>
        
        <p 
          className="intro-line final" 
          id="line5"
          style={{ textShadow: "0 0 20px rgba(255,255,255,0.4)" }}
        >
          {isEn ? "Welcome to the Dev Universe" : "Bienvenido/a al Universo Dev"}
        </p>

      </div>

      {/* 2. EL TOQUECITO: Contador y Barra de carga con destello de Neón */}
      <div className="loading-wrapper">
        <div 
          className="loading-text"
          style={{ textShadow: "0 0 8px rgba(217,82,94,0.4)" }}
        >
          {progress}%
        </div>
        <div className="loading-bar-container">
          <div 
            className="loading-bar" 
            style={{ 
              width: `${progress}%`, 
              animation: "none",
              boxShadow: "0 0 14px #D9525E, 0 0 4px #D9525E",
              backgroundColor: "#D9525E",
              transition: "width 40ms linear"
            }} 
          />
        </div>
      </div>

    </div>
  );
}

export default SplashScreen;