import React, { useState, useEffect } from "react";
import SplashScreen from "../components/SplashScreen";
import HackerConsole from "../components/HackerConsole";
import HomeHero from "../components/HomeHero";
import HomeWorkingOn from "../components/HomeWorkingOn";
import HomeSkills from "../components/HomeSkills";
import HomeAboutMe from "../components/HomeAboutMe";
import HomeExplore from "../components/HomeExplore";
import { useTranslation } from "react-i18next";
import "../pages/Home.css";

function Home() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem("splashShown"));

  useEffect(() => {
    const splashWasShown = sessionStorage.getItem("splashShown");
    if (!splashWasShown) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("splashShown", "true");
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, []);

  useEffect(() => {
    if (!showSplash) {
      setIsVisible(true);
    }
  }, [showSplash]);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <div
          className="relative w-full min-h-screen overflow-x-hidden font-sans"
          style={{
            backgroundColor: "var(--fondo-principal)",
            color: "var(--texto-principal)",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1s ease"
          }}
        >
          
          <div className="w-full overflow-hidden min-h-screen relative flex flex-col">
            
            <HackerConsole />

            <div className="relative z-10 px-4 md:px-8 pt-20 pb-12 w-full max-w-6xl mx-auto flex flex-col items-center flex-grow">
              <HomeHero isVisible={isVisible} />
              <HomeWorkingOn />
              <HomeSkills />
              <HomeAboutMe />
              <HomeExplore />

              <div className="flex items-center justify-center w-full mt-32 mb-16 px-4">
                <p
                  className="relative text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[1rem] font-extrabold uppercase text-center tracking-tight select-none z-10"
                  style={{
                    lineHeight: "0.8", 
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
                    backgroundImage: "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.6) 70%, transparent 100%)",
                    WebkitBackgroundClip: "text",
                    filter: "drop-shadow(0 15px 25px rgba(255, 255, 255, 0.05))"
                  }}
                >
                  {t('home.quote')}
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;