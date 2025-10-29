import React, { useEffect, useRef, useState } from "react";
import "../pages/SplashScreen.css";

function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    console.log("🟢 SplashScreen montado");

    const fadeTimer = setTimeout(() => {
      console.log("⚪ Iniciando fade out");
      setFadeOut(true);
    }, 9000);

    const finishTimer = setTimeout(() => {
      console.log("🔵 Ejecutando onFinish()");
      onFinishRef.current?.();
    }, 10500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      console.log("🧹 Limpieza del SplashScreen");
    };
  }, []);

  return (
    <div
      id="splash"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1s ease-in-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div className="terminal">
        <p id="line1">&gt; Iniciando el sistema del Portafolio...</p>
        <p id="line2">&gt; Cargando módulos creativos...</p>
        <p id="line3">&gt; Recuperando los últimos proyectos desde GitHub...</p>
        <p id="line4">&gt; mi-portfoliomm.vercel.app iniciado correctamente ✔️</p>
        <p id="line5" className="final">💻 Bienvenido/a al Universo Dev de Marce</p>
      </div>
    </div>
  );
}

export default SplashScreen;
