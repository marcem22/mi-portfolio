import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from "react-icons/fa";

function SideNavbar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (location.pathname !== "/cv") {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const cvContent = document.getElementById("cv-content");
      if (cvContent) {
        if (cvContent.getBoundingClientRect().top < window.innerHeight * 0.7) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(window.scrollY > 300);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const getNavLinks = () => {
    const path = location.pathname;

    if (path === "/cv") {
      return [
        { to: "/", label: "Inicio", icon: <FaHome /> },
        { to: "/proyectos", label: "Proyectos", icon: <FaProjectDiagram /> },
        { to: "/contacto", label: "Contacto", icon: <FaEnvelope /> },
      ];
    }

    if (path === "/proyectos") {
      return [
        { to: "/", label: "Inicio", icon: <FaHome /> },
        { to: "/cv", label: "CV", icon: <FaUser /> },
        { to: "/contacto", label: "Contacto", icon: <FaEnvelope /> },
      ];
    }

    if (path === "/contacto") {
      return [
        { to: "/", label: "Inicio", icon: <FaHome /> },
        { to: "/cv", label: "CV", icon: <FaUser /> },
        { to: "/proyectos", label: "Proyectos", icon: <FaProjectDiagram /> },
      ];
    }

    return [
      { to: "/cv", label: "CV", icon: <FaUser /> },
      { to: "/proyectos", label: "Proyectos", icon: <FaProjectDiagram /> },
      { to: "/contacto", label: "Contacto", icon: <FaEnvelope /> },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <>
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className={`desktop-nav fixed top-1/2 left-4 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6
                   bg-[var(--bg-dark)]/70 backdrop-blur-lg p-4 rounded-2xl
                   border border-[var(--border-light)] shadow-[0_0_20px_rgba(255,255,255,0.1)]
                   ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex flex-col items-center text-sm transition-all ${
              location.pathname === link.to
                ? "text-[var(--primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <div className="text-2xl mb-1">{link.icon}</div>
            <span>{link.label}</span>
          </Link>
        ))}
      </motion.nav>

      <nav
        className="mobile-nav fixed bottom-0 left-0 right-0 z-[9999] md:hidden flex items-center justify-around
                   bg-[var(--bg-dark)]/95 backdrop-blur-md border-t border-[var(--border-light)]
                   shadow-[0_-2px_15px_rgba(255,255,255,0.1)]
                   px-4 py-3 text-sm"
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex flex-col items-center justify-center text-[0.75rem] transition-all ${
              location.pathname === link.to
                ? "text-[var(--primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <div className="text-lg mb-1">{link.icon}</div>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}

export default SideNavbar;