import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function HomeWorkingOn() {
  const { t } = useTranslation();

  return (
    <div className="mb-14 mt-10 w-full">
      
      {/* Título de la Sección */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex justify-center w-full mb-4 md:mb-8"
      >
        <div className="relative inline-flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative text-[4.2rem] sm:text-[9rem] md:text-[13rem] lg:text-[17rem] font-extrabold uppercase text-center select-none z-10 tracking-tight"
            style={{
              lineHeight: "0.75",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
              backgroundImage: "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.6) 70%, transparent 100%)",
              WebkitBackgroundClip: "text"
            }}
          >
            {t("home.workingOn.title")}
          </motion.h2>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scaleX: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mt-4 h-[2px] w-40 rounded-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"
          />
        </div>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        
        className="group relative overflow-hidden transition-all duration-700 w-[92%] sm:w-full mx-auto rounded-[36px] bg-gradient-to-br from-[#121212]/96 to-[#1E1E1E]/92 border border-white/5 shadow-2xl backdrop-blur-xl"
      >
        <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-14 p-6 md:p-10 lg:p-14 z-10">
          
          {/* Lado Izquierdo: Visualizador del modelo abstract.glb */}
          <div className="lg:w-2/5 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-56 h-56 md:w-80 md:h-80 flex items-center justify-center"
            >
              <div 
                className="absolute inset-0 rounded-full opacity-40"
                style={{
                  background: "radial-gradient(circle, rgba(217,82,94,0.35) 0%, transparent 70%)",
                  filter: "blur(30px)"
                }}
              />
              <model-viewer
                src="/models/abstract.glb"
                auto-rotate
                camera-controls
                disable-zoom
                style={{ width: "100%", height: "100%", background: "transparent" }}
              />
            </motion.div>
          </div>

          {/* Lado Derecho: Textos y badges */}
          <div className="lg:w-3/5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              <span className="px-4 py-2 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] bg-[#D9525E]/10 text-[var(--primary)] border border-[#D9525E]/35 backdrop-blur-md">
                {t("home.workingOn.badge1")}
              </span>
              <span className="px-4 py-2 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] bg-white/5 text-white border border-white/10">
                {t("home.workingOn.badge2")}
              </span>
            </div>

            <h3 className="text-4xl md:text-6xl font-black uppercase leading-none mb-6 text-white tracking-tighter">
              {t("home.workingOn.projectTitle")}
            </h3>
            <p className="text-sm md:text-lg leading-relaxed mb-8 max-w-2xl text-white/70">
              {t("home.workingOn.projectDesc")}
            </p>

            {/* Pastillas de tecnologías */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {["AR.js", "JavaScript", "WebGL", "3D UI"].map((tech, i) => (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="px-4 py-2 rounded-2xl text-xs font-semibold tracking-wider bg-white/5 border border-white/5 text-white/80 backdrop-blur-md"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default HomeWorkingOn;