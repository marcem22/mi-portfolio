import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import SkillsCube3D from "./SkillsCube3D";

function HomeSkills() {
  const { t } = useTranslation();
  const [activeFace, setActiveFace] = useState("frontend");

  const cubeData = {
    frontend: {
      title: "Lógica & Frontend",
      desc: "Construcción de interfaces interactivas y dinámicas enfocadas en el rendimiento.",
      tools: ["React", "Svelte", "JavaScript", "CSS3", "Tailwind"],
      color: "var(--primary)"
    },
    backend: {
      title: "Backend & APIs",
      desc: "Estructuración de servidores, bases de datos y creación de APIs robustas.",
      tools: ["Python", "FastAPI", "Node.js", "Git"],
      color: "#ffffff"
    },
    layout: {
      title: "3D & Experiencia",
      desc: "Integración de modelos tridimensionales, animaciones fluidas y realidad aumentada.",
      tools: ["Blender", "Three.js", "HTML5", "WebXR"],
      color: "#A64149"
    }
  };

  const currentInfo = cubeData[activeFace] || cubeData.frontend;

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 mb-14 px-4">
      
      {/* Título exclusivo para celulares */}
      <div className="block lg:hidden justify-center text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[3.2rem] sm:text-[4.5rem] font-extrabold uppercase tracking-tight select-none"
          style={{
            lineHeight: "0.8",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
            backgroundImage: "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.6) 70%, transparent 100%)",
            WebkitBackgroundClip: "text"
          }}
        >
          {t("home.skillsTitle")}
        </motion.h2>
      </div>

      {/* Títulos de sección para pantallas grandes */}
      <div className="hidden lg:flex flex-row gap-8 w-full mb-8">
        <div className="w-1/2 flex justify-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[3rem] xl:text-[4.5rem] font-extrabold uppercase tracking-tight select-none"
            style={{
              lineHeight: "0.8",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
              backgroundImage: "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.6) 70%, transparent 100%)",
              WebkitBackgroundClip: "text"
            }}
          >
            {t("home.skillsTitle")}
          </motion.h2>
        </div>
        <div className="w-1/2 flex justify-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-[3rem] xl:text-[4.5rem] font-extrabold uppercase tracking-tight select-none"
            style={{
              lineHeight: "0.8",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
              backgroundImage: "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.6) 70%, transparent 100%)",
              WebkitBackgroundClip: "text"
            }}
          >
            {t("home.journeyTitle")}
          </motion.h2>
        </div>
      </div>

      {/* Contenedor del Cubo e Info-Card */}
      <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-8 items-center justify-center w-full">
        
        {/* El Cubo 3D */}
        <div className="w-full lg:w-1/2 flex items-center justify-center h-[420px] relative z-10">
          <SkillsCube3D onFaceHover={setActiveFace} />
        </div>

        {/* AJUSTE DE LONGITUD: HILO BRILLANTE VERTICAL EXTENDIDO PARA CELULARES */}
        <div className="block lg:hidden relative w-full h-0 pointer-events-none z-20">
          {/* Subimos a -top-24 y estiramos a h-36 para garantizar que toque el borde de la tarjeta */}
          <div className="absolute left-1/2 -top-24 -translate-x-1/2 h-36 w-[20px] flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFace}
                initial={{ height: "0%", opacity: 1 }}
                animate={{ height: "100%", opacity: [1, 1, 0] }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-[2px] relative"
                style={{
                  background: `linear-gradient(180deg, transparent, ${currentInfo.color}80, #ffffff)`,
                  boxShadow: `0 0 15px ${currentInfo.color}`
                }}
              >
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" 
                  style={{ boxShadow: "0 0 12px 3px #fff" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Línea conectora animada original (HORIZONTAL PARA ESCRITORIO) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[20px] items-center pointer-events-none z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFace}
              initial={{ width: "0%", opacity: 1 }}
              animate={{ width: "100%", opacity: [1, 1, 0] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-[2px] relative"
              style={{
                background: `linear-gradient(90deg, transparent, ${currentInfo.color}80, #ffffff)`,
                boxShadow: `0 0 15px ${currentInfo.color}`
              }}
            >
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" 
                style={{ boxShadow: "0 0 12px 3px #fff" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tarjeta de Información Lateral */}
        <div className="w-full lg:w-1/2 flex items-center justify-center h-[360px] sm:h-[420px] relative z-10">
          <div className="w-[95%] sm:w-full max-w-[380px] h-[300px] rounded-[32px] flex flex-col justify-center p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-[#121212]/96 to-[#1E1E1E]/92 border border-white/5 shadow-2xl backdrop-blur-xl">
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ background: "radial-gradient(circle at top right, rgba(217,82,94,0.1), transparent 70%)" }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFace}
                initial={{ opacity: 0, x: 15, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -15, filter: "blur(6px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col h-full justify-center z-10 w-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-1.5 h-8 rounded-full flex-shrink-0" 
                    style={{ 
                      background: currentInfo.color, 
                      boxShadow: `0 0 10px ${currentInfo.color}` 
                    }} 
                  />
                  <h3 className="text-xl font-black uppercase tracking-widest text-white drop-shadow-md">
                    {currentInfo.title}
                  </h3>
                </div>
                
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium mb-6">
                  {currentInfo.desc}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {currentInfo.tools.map((tool, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-white/90"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomeSkills;