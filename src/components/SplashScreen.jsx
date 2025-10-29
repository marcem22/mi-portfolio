import React, { useEffect, useRef, useState } from "react";
import "../pages/SplashScreen.css";

function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 9500);
    const finishTimer = setTimeout(() => onFinishRef.current?.(), 10500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div id="splash" className={fadeOut ? "fadeout" : ""}>
      <div className="terminal">
        <p id="line1">&gt; Iniciando sistema...</p>
        <p id="line2">&gt; Cargando módulos creativos...</p>
        <p id="line3">&gt; Recuperando los últimos proyectos ..</p>
        <p id="line4">&gt; marcelam-portfolio listo ✔️</p>
        <p id="line5" className="final">Bienvenido/a al Universo Dev </p>

      </div>
    </div>
  );
}

export default SplashScreen;
