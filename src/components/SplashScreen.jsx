import React, { useEffect, useRef, useState } from "react";
import "../pages/SplashScreen.css";

function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const onFinishRef = useRef(onFinish);

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
    <div id="splash" className={fadeOut ? "fadeout" : ""}>
      
      <div className="splash-header">
        <span className="status-dot"></span>
        SYS.BOOT_SEQUENCE // V.1.0
      </div>

      <div className="modern-intro-container">
        <p className="intro-line" id="line1"><span className="prefix">&gt;</span> Iniciando sistema...</p>
        <p className="intro-line" id="line2"><span className="prefix">&gt;</span> Cargando módulos creativos...</p>
        <p className="intro-line" id="line3"><span className="prefix">&gt;</span> Recuperando los últimos proyectos ..</p>
        <p className="intro-line" id="line4"><span className="prefix">&gt;</span> marcelam-portfolio listo <span className="highlight">✔️</span></p>
        <p className="intro-line final" id="line5">Bienvenido/a al Universo Dev </p>
      </div>

      <div className="loading-wrapper">
        <div className="loading-text">{progress}%</div>
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
      </div>

    </div>
  );
}

export default SplashScreen;