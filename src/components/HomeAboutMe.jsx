import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function HomeAboutMe() {
  const { t } = useTranslation();

  const funFacts = [
    { id: "code", icon: "💖", text: t('home.aboutMe.fact1'), desc: t('home.aboutMe.fact1Desc'), color: "#D9525E" },
    { id: "river", icon: "⚽", text: t('home.aboutMe.fact2'), desc: t('home.aboutMe.fact2Desc'), color: "#A64149" },
    { id: "dog", icon: "🐕", text: t('home.aboutMe.fact3'), desc: t('home.aboutMe.fact3Desc'), color: "#A4A5A6" },
    { id: "travel", icon: "✈️", text: t('home.aboutMe.fact4'), desc: t('home.aboutMe.fact4Desc'), color: "#D9D9D9" },
    { id: "cook", icon: "👩‍🍳", text: t('home.aboutMe.fact5'), desc: t('home.aboutMe.fact5Desc'), color: "#D9525E" },
    { id: "beer", icon: "🍺", text: t('home.aboutMe.fact6'), desc: t('home.aboutMe.fact6Desc'), color: "#A64149" },
    { id: "draw", icon: "🎨", text: t('home.aboutMe.fact7'), desc: t('home.aboutMe.fact7Desc'), color: "#A4A5A6" },
    { id: "rest", icon: "🌙", text: t('home.aboutMe.fact8'), desc: t('home.aboutMe.fact8Desc'), color: "#D9D9D9" },
  ];

  return (
    <div className="mb-14 mt-10 w-full overflow-x-hidden">
      <div className="flex items-center justify-center w-full mb-4">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-extrabold uppercase text-center tracking-tight select-none z-10"
          style={{
            lineHeight: "0.8",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
            backgroundImage: "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.6) 70%, transparent 100%)",
            WebkitBackgroundClip: "text"
          }}
        >
          {t('home.aboutMe.title')}
        </motion.h2>
      </div>

      <div className="relative w-full max-w-6xl mx-auto pb-16 pt-16 group/board">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,82,94,0.05)_0%,transparent_70%)] pointer-events-none" />

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {}
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-16 relative z-10 w-full"
        >
          {funFacts.map((fact, index) => {
            const nodeColor = index % 2 === 0 ? 'var(--primary)' : '#ffffff';
            const nextNodeColor = (index + 1) % 2 === 0 ? 'var(--primary)' : '#ffffff';
            const bottomNodeColor = (index + 4) % 2 === 0 ? 'var(--primary)' : '#ffffff';
            const bottomNodeMobile = (index + 2) % 2 === 0 ? 'var(--primary)' : '#ffffff';

            const mobileCol = index % 2;   
            const desktopCol = index % 4;  

            let tooltipXClass = "";
            let arrowXClass = "";

            if (mobileCol === 0) {
              tooltipXClass = "left-1/2 -translate-x-1/2";
              arrowXClass = "left-1/2 -translate-x-1/2";
              
              if (desktopCol === 0) {
                tooltipXClass += " md:left-0 md:translate-x-0 md:right-auto";
                arrowXClass += " md:left-12 md:translate-x-0 md:right-auto";
              }
            } else {
              tooltipXClass = "right-0 left-auto translate-x-0";
              arrowXClass = "right-10 left-auto translate-x-0";
              
              if (desktopCol === 1 || desktopCol === 2) {
                tooltipXClass += " md:right-auto md:left-1/2 md:-translate-x-1/2";
                arrowXClass += " md:right-auto md:left-1/2 md:-translate-x-1/2";
              } else if (desktopCol === 3) {
                tooltipXClass += " md:right-0 md:left-auto md:translate-x-0";
                arrowXClass += " md:right-12 md:left-auto md:translate-x-0";
              }
            }

            const nodeVariants = {
              hidden: { opacity: 0, scale: 0.3, filter: "blur(10px)" },
              visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.4, duration: 0.6 } }
            };
            const lineXVariants = {
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.5, ease: "easeOut" } }
            };
            const lineYVariants = {
              hidden: { scaleY: 0 },
              visible: { scaleY: 1, transition: { duration: 0.5, ease: "easeOut" } }
            };

            return (
              <div key={index} className="relative flex flex-col items-center justify-start w-full h-full">
                
                {index % 4 !== 3 && (
                  <motion.div
                    variants={lineXVariants}
                    className="hidden md:block absolute top-[48px] left-[50%] w-full h-[2px] origin-left z-0"
                    style={{
                      background: `linear-gradient(90deg, ${nodeColor}, ${nextNodeColor})`,
                      boxShadow: `0 0 10px ${nodeColor}66`
                    }}
                  />
                )}
                {index < 4 && (
                  <motion.div
                    variants={lineYVariants}
                    className="hidden md:block absolute top-[48px] left-[50%] w-[2px] h-[calc(100%+4rem)] origin-top z-0"
                    style={{
                      background: `linear-gradient(180deg, ${nodeColor}, ${bottomNodeColor})`,
                      boxShadow: `0 0 10px ${nodeColor}66`
                    }}
                  />
                )}

                {index % 2 !== 1 && (
                  <motion.div
                    variants={lineXVariants}
                    className="block md:hidden absolute top-[40px] left-[50%] w-full h-[2px] origin-left z-0"
                    style={{
                      background: `linear-gradient(90deg, ${nodeColor}, ${nextNodeColor})`,
                      boxShadow: `0 0 10px ${nodeColor}66`
                    }}
                  />
                )}
                {index < 6 && (
                  <motion.div
                    variants={lineYVariants}
                    className="block md:hidden absolute top-[40px] left-[50%] w-[2px] h-[calc(100%+3rem)] origin-top z-0"
                    style={{
                      background: `linear-gradient(180deg, ${nodeColor}, ${bottomNodeMobile})`,
                      boxShadow: `0 0 10px ${nodeColor}66`
                    }}
                  />
                )}

                <motion.div
                  variants={nodeVariants}
                  className="group relative flex flex-col items-center justify-start text-center cursor-default transition-all duration-500 opacity-100 group-hover/board:opacity-20 hover:!opacity-100 hover:scale-110 z-10 hover:z-[60] px-2"
                >
                  
                  <div
                    className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-5 rounded-full transition-all duration-500 ease-out z-10 bg-[#0d0d0d]"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                      border: `2px solid ${nodeColor}40`,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = nodeColor;
                      e.currentTarget.style.boxShadow = `0 0 30px ${nodeColor}66, inset 0 1px 0 rgba(255,255,255,0.2)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${nodeColor}40`;
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.1)';
                    }}
                  >
                    
                    <div
                      className={`absolute bottom-full mb-4 w-max max-w-[165px] md:max-w-[210px]
                                  opacity-0 group-hover:opacity-100 pointer-events-none
                                  transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out z-[100] ${tooltipXClass}`}
                      style={{
                        background: "linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(20,20,20,0.98) 100%)",
                        backdropFilter: "blur(10px)",
                        color: "white",
                        padding: "12px 14px",
                        borderRadius: "16px",
                        border: `1px solid ${nodeColor}66`,
                        boxShadow: `0 15px 35px ${nodeColor}40`,
                        fontSize: "0.80rem",
                        whiteSpace: "normal",
                      }}
                    >
                      {fact.id === "river" ? (
                        <span className="flex flex-row items-center justify-between gap-2 font-bold uppercase tracking-wider text-[11px] text-left leading-tight">
                          <span>{fact.desc}</span>
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_River_Plate.png"
                            alt="Escudo River Plate"
                            className="w-5 h-5 object-contain flex-shrink-0 brightness-110 contrast-125"
                            style={{ filter: "drop-shadow(0 0 5px rgba(255,27,109,0.5))" }}
                          />
                        </span>
                      ) : (
                        <span className="font-bold uppercase text-xs leading-relaxed">{fact.desc}</span>
                      )}

                      <div
                        className={`absolute top-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent ${arrowXClass}`}
                        style={{
                          borderTop: `8px solid ${nodeColor}99`,
                        }}
                      />
                    </div>

                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl rounded-full pointer-events-none"
                      style={{ background: nodeColor }} 
                    />

                    <div 
                      className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                      style={{ color: nodeColor, filter: `drop-shadow(0 0 10px ${nodeColor}88)` }}
                    >
                      {(() => {
                        switch(fact.id) {
                          case 'code': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
                          case 'river': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
                          case 'dog': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><path d="M12 5c.67 0 1.5-.33 2.5-1A5.5 5.5 0 0 1 17 6c0 .73-.18 1.5-.5 2.1L12 12l-4.5-3.9C7.18 7.5 7 6.73 7 6c0-.85.83-2 2.5-2 .67 0 1.5.33 2.5 1Z"></path><circle cx="12" cy="16" r="2"></circle></svg>;
                          case 'travel': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>;
                          case 'cook': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>;
                          case 'beer': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><path d="M17 10a4 4 0 0 1 4 4v5a2 2 0 0 1-2 2h-1"></path><rect x="4" y="6" width="13" height="15" rx="2" ry="2"></rect><path d="M4 10h13"></path><path d="M4 14h13"></path></svg>;
                          case 'draw': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.58 7.58"></path></svg>;
                          case 'rest': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
                          default: return <span className="text-3xl md:text-4xl">{fact.icon}</span>;
                        }
                      })()}
                    </div>
                  </div>

                  <h3 
                    className="font-extrabold uppercase text-[10px] md:text-xs tracking-[0.25em]"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: `0.5px ${nodeColor}`,
                      backgroundImage: `linear-gradient(to bottom, ${nodeColor} 0%, rgba(255, 255, 255, 0.7) 100%)`,
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    {fact.text}
                  </h3>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default HomeAboutMe;