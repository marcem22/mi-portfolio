import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Icon from "./Icon";

function HomeExplore() {
  const { t } = useTranslation();

  const menuItems = [
    { to: "/proyectos", icon: "cube", text: t('home.explore.projects') },
    { to: "/cv", icon: "layout", text: t('home.explore.cv') },
    { to: "/contacto", icon: "nodes", text: t('home.explore.contact') }
  ];

  return (
    <div className="w-full mt-14 mb-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center w-full mb-12 md:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative text-[4.5rem] sm:text-[6rem] md:text-[10rem] lg:text-[24rem] font-extrabold uppercase text-center tracking-tight select-none z-10"
          style={{
            lineHeight: "0.8",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
            backgroundImage: "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.6) 70%, transparent 100%)",
            WebkitBackgroundClip: "text"
          }}
        >
          {t('home.explore.title')}
        </motion.h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {menuItems.map((item, index) => (
          <Link
            to={item.to}
            key={item.to}
            className="group relative overflow-hidden rounded-[28px] transition-all duration-700 ease-out flex flex-col h-full"
            style={{
              background: "linear-gradient(135deg, rgba(18,18,18,0.96) 0%, rgba(30,30,30,0.92) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              backdropFilter: "blur(18px)",
              transformStyle: "preserve-3d",
              animationDelay: `${index * 100}ms`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(217,82,94,0.4)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.45), 0 0 30px rgba(217,82,94,0.15), inset 0 1px 0 rgba(255,255,255,0.05)';
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)';
              e.currentTarget.style.transform = 'translateY(0px) scale(1)';
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
              style={{
                background: "radial-gradient(circle at top right, rgba(217,82,94,0.18), transparent 60%)",
              }}
            />

            <div className="relative px-6 py-8 z-10 flex flex-col items-center justify-center text-center flex-grow w-full"> 
              <div className="relative flex-shrink-0 mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                <div className="text-[var(--primary)] drop-shadow-[0_0_15px_rgba(217,82,94,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(217,82,94,0.6)] transition-all duration-500">
                  <Icon name={item.icon} size="w-10 h-10" />
                </div>
              </div>
              
              <div className="flex flex-col w-full items-center">
                <h3 
                  className="font-extrabold uppercase text-lg md:text-xl mb-2 tracking-tight transition-transform duration-300 group-hover:scale-105"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
                    backgroundImage: "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)",
                    WebkitBackgroundClip: "text"
                  }}
                >
                  {item.text}
                </h3>

                <p className="transition-colors duration-300 text-xs md:text-sm font-medium text-gray-400 group-hover:text-gray-300 max-w-[90%]">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 overflow-hidden h-5 flex justify-center">
                <div className="flex items-center justify-center gap-2 text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-xs font-black uppercase tracking-[0.25em]">
                    {t('home.explore.viewMore')}
                  </span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeExplore;