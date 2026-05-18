import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

function HackerConsole() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [consoleInput, setConsoleInput] = useState("");
  
  const [gameState, setGameState] = useState({ active: false, target: 0, attempts: 0 });

  const isEn = i18n.language?.startsWith("en");

  const [consoleHistory, setConsoleHistory] = useState(() => {
    const currentIsEn = i18n.language?.startsWith("en");
    return currentIsEn ? [
      "Welcome to MarcelaOS (Linux Mint Environment v2.6)",
      "System status: ONLINE | Secure Connection Established.",
      "Type 'help' to see the list of executable commands.",
      ""
    ] : [
      "Bienvenido a MarcelaOS (Entorno Linux Mint v2.6)",
      "Estado del sistema: EN LÍNEA | Conexión segura establecida.",
      "Escribe 'help' para ver la lista de comandos ejecutables.",
      ""
    ];
  });
  
  const terminalEndRef = useRef(null);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!isOpen) {
        setShowHint(true);
      }
    }, 20000);

    return () => clearTimeout(showTimer);
  }, [isOpen]);

  useEffect(() => {
    let hideTimer;
    if (showHint) {
      hideTimer = setTimeout(() => {
        setShowHint(false);
      }, 8000);
    }
    return () => clearTimeout(hideTimer);
  }, [showHint]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F2" || e.key === "Escape" || e.key === "º" || e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) setShowHint(false);
          return !prev;
        });
      }
    };

    const handleCustomOpen = () => {
      setShowHint(false);
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-console", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-console", handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (terminalEndRef.current && isOpen) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleHistory, isOpen]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const inputClean = consoleInput.trim();
    if (!inputClean) return;

    let response = [];
    response.push(`marcela@mint-portfolio:~$ ${inputClean}`);

    if (gameState.active) {
      handleGameLogic(inputClean, response);
      return;
    }

    const args = inputClean.toLowerCase().split(/\s+/);
    const command = args[0];
    const arg1 = args[1];
    const currentPath = window.location.pathname;

    switch (command) {
      case "help":
        if (isEn) {
          response.push(
            "Available core commands:",
            "  home      - Navigate to Home section",
            "  projects  - View active digital assets repository",
            "  cv        - Open interactive curriculum vitae",
            "  contact   - Initialize contact terminal gateway",
            "  skills    - Print technical core capabilities ledger",
            "  lang [es|en] - Switch global portfolio language setup",
            "  play      - Launch a retro terminal mini-game",
            "  clear     - Wipe console buffer data",
            "  exit      - Close active terminal layer",
            "  sudo hire - [CRITICAL] Execute smart contract integration"
          );
        } else {
          response.push(
            "Comandos principales disponibles:",
            "  home      - Navegar a la sección de Inicio",
            "  projects  - Ver el repositorio de proyectos activos",
            "  cv        - Abrir el currículum vitae interactivo",
            "  contact   - Iniciar la pasarela de contacto",
            "  skills    - Mostrar registro de habilidades técnicas principales",
            "  lang [es|en] - Cambiar la configuración de idioma del portfolio",
            "  play      - Iniciar un mini-juego retro en la terminal",
            "  clear     - Limpiar el búfer de la consola",
            "  exit      - Cerrar la capa de la terminal activa",
            "  sudo hire - [CRÍTICO] Ejecutar integración de contrato de contratación"
          );
        }
        break;
      case "clear":
        setConsoleHistory([]);
        setConsoleInput("");
        return;
      case "exit":
      case "quit":
        setIsOpen(false);
        setConsoleInput("");
        return;
      case "play":
      case "game":
        const secretNum = Math.floor(Math.random() * 50) + 1;
        setGameState({ active: true, target: secretNum, attempts: 0 });
        if (isEn) {
          response.push(
            " [MINI-GAME INITIALIZED] — GUESS THE NUMBER",
            "I have generated a secret number between 1 and 50.",
            "Enter your first guess (or type 'abort' to stop playing):"
          );
        } else {
          response.push(
            "[MINI-JUEGO INICIALIZADO] — ADIVINA EL NÚMERO",
            "He generado un número secreto entre 1 y 50.",
            "Ingresa tu primer intento (o escribe 'abort' para salir):"
          );
        }
        break;
      case "lang":
        if (arg1 === "en") {
          i18n.changeLanguage("en");
          response.push("Language environment successfully updated to English.");
        } else if (arg1 === "es") {
          i18n.changeLanguage("es");
          response.push("Entorno de idioma actualizado correctamente a Español.");
        } else {
          response.push(
            isEn ? `Current language locale: ${i18n.language.toUpperCase()}` : `Configuración de idioma actual: ${i18n.language.toUpperCase()}`,
            isEn ? "Usage rule: lang [en|es]" : "Uso correcto: lang [en|es]"
          );
        }
        break;
      case "home":
        response.push(isEn ? "Redirecting to root node..." : "Redireccionando al nodo raíz...");
        if (currentPath === "/") setIsOpen(false);
        else navigate("/");
        break;
      case "projects":
        response.push(isEn ? "Redirecting to /proyectos subsystem..." : "Redireccionando al subsistema /proyectos...");
        if (currentPath === "/proyectos") setIsOpen(false);
        else navigate("/proyectos");
        break;
      case "cv":
        response.push(isEn ? "Opening profiles.cv database layout..." : "Abriendo base de datos profiles.cv...");
        if (currentPath === "/cv") setIsOpen(false);
        else navigate("/cv");
        break;
      case "contact":
        response.push(isEn ? "Initializing communication protocol channel..." : "Inicializando el canal de comunicación...");
        if (currentPath === "/contacto") setIsOpen(false);
        else navigate("/contacto");
        break;
      case "skills":
        if (isEn) {
          response.push(
            "--- MARCELA MANCINI STACK CORE ---",
            "  [Frontend]: React, Svelte, JavaScript (ES6+), CSS3/SCSS, TailwindUI",
            "  [Backend] : Python, FastAPI, Node.js, PHP, Java, REST APIs",
            "  [3D/AR]   : Three.js, WebXR, MindAR, Blender Engine, Unity"
          );
        } else {
          response.push(
            "--- NÚCLEO DE TECNOLOGÍAS - MARCELA MANCINI ---",
            "  [Frontend]: React, Svelte, JavaScript (ES6+), CSS3/SCSS, TailwindUI",
            "  [Backend] : Python, FastAPI, Node.js, PHP, Java, APIs REST",
            "  [3D/AR]   : Three.js, WebXR, MindAR, Blender Engine, Unity"
          );
        }
        break;
      case "sudo hire":
        if (isEn) {
          response.push(
            "[ACCESS GRANTED] — ROOT EXECUTION PRIVILEGES TRIGGERED.",
            " Initializing Marcela Mancini integration sequence into your workspace...",
            "Smart contract signed. Preparing onboarding environment. Welcome aboard!"
          );
        } else {
          response.push(
            " [ACCESO CONCEDIDO] — PRIVILEGIOS DE EJECUCIÓN ROOT ACTIVADOS.",
            "Iniciando secuencia de integración de Marcela Mancini en tu espacio de trabajo...",
            " Contrato firmado. Preparando entorno de incorporación. ¡Bienvenido a bordo!"
          );
        }
        break;
      default:
        response.push(isEn 
          ? `bash: ${command}: command not found. Type 'help' for options.`
          : `bash: ${command}: comando no encontrado. Escribe 'help' para ver las opciones.`
        );
    }

    setConsoleHistory((prev) => [...prev, ...response, ""]);
    setConsoleInput("");
  };

  const handleGameLogic = (input, response) => {
    const guessClean = input.toLowerCase().trim();

    if (guessClean === "abort" || guessClean === "exit") {
      setGameState({ active: false, target: 0, attempts: 0 });
      response.push(isEn ? "❌ Process aborted. Returning to terminal environment." : "❌ Proceso abortado. Volviendo al entorno de la terminal.");
      setConsoleHistory((prev) => [...prev, ...response, ""]);
      setConsoleInput("");
      return;
    }

    const guessNum = parseInt(guessClean, 10);

    if (isNaN(guessNum)) {
      response.push(isEn ? "⚠ Invalid entry. Please write a numeric value or 'abort'." : "⚠ Entrada inválida. Por favor escribe un número o 'abort'.");
      setConsoleHistory((prev) => [...prev, ...response, ""]);
      setConsoleInput("");
      return;
    }

    const nextAttempts = gameState.attempts + 1;

    if (guessNum === gameState.target) {
      if (isEn) {
        response.push(
          ` EXCELLENT! You guessed it. The number was indeed ${gameState.target}.`,
          `Total system cycles used: ${nextAttempts} attempts.`,
          "Returning to core terminal console..."
        );
      } else {
        response.push(
          ` ¡EXCELENTE! Lo adivinaste. El número era efectivamente el ${gameState.target}.`,
          `Ciclos de sistema utilizados: ${nextAttempts} intentos.`,
          "Volviendo a la consola principal..."
        );
      }
      setGameState({ active: false, target: 0, attempts: 0 });
    } else if (guessNum < gameState.target) {
      response.push(isEn ? " Too LOW! Try a higher value:" : " ¡Muy BAJO! Intenta con un número más alto:");
      setGameState((prev) => ({ ...prev, attempts: nextAttempts }));
    } else {
      response.push(isEn ? " Too HIGH! Try a lower value:" : " ¡Muy ALTO! Intenta con un número más bajo:");
      setGameState((prev) => ({ ...prev, attempts: nextAttempts }));
    }

    setConsoleHistory((prev) => [...prev, ...response, ""]);
    setConsoleInput("");
  };

  return (
    <>
      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={() => {
              setShowHint(false);
              setIsOpen(true);
            }}
            className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[9999] max-w-xs bg-[#0b0b0b]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer group hover:border-[var(--primary)]/50 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-1.5 animate-pulse shadow-[0_0_10px_var(--primary)] shrink-0" />
              <div>
                <h4 className="text-white font-black uppercase text-[11px] tracking-widest mb-1 group-hover:text-[var(--primary)] transition-colors">
                  {isEn ? "DID YOU KNOW THERE'S A CONSOLE?" : "¿SABÍAS QUE HAY UNA CONSOLA?"}
                </h4>
                <p className="text-gray-400 font-mono text-[10px] leading-relaxed">
                  {isEn 
                    ? <>This portfolio hides an interactive terminal. Press <span className="text-white font-bold bg-white/10 px-1 py-0.5 rounded">F2</span> or click here to activate DevMode.</>
                    : <>Este portfolio oculta una terminal interactiva. Presioná <span className="text-white font-bold bg-white/10 px-1 py-0.5 rounded">F2</span> o hacé clic acá para activar el DevMode.</>
                  }
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99999] flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl h-[400px] max-h-[85vh] rounded-2xl flex flex-col overflow-hidden border border-white/10"
              style={{
                background: "linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.92) 100%)",
                boxShadow: "0 30px 70px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)"
              }}
            >
              <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex items-center justify-between shrink-0">
                <div className="flex gap-2">
                  <div onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-[#d9525e] cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-white/40 tracking-wider uppercase truncate max-w-[180px] sm:max-w-none">
                  terminal - marcela@mint-portfolio
                </span>
                <div className="w-4" />
              </div>

              <div className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-[11px] sm:text-xs text-green-400 leading-relaxed selection:bg-green-500/30 whitespace-pre-wrap break-words">
                {consoleHistory.map((line, index) => (
                  <div 
                    key={index} 
                    className={
                      line.startsWith("marcela@") 
                        ? "text-white font-bold break-all" 
                        : line.startsWith("📡") || line.startsWith("  [") || line.startsWith("🎮") 
                        ? "text-[var(--primary)] font-bold" 
                        : "text-green-400/90"
                    }
                  >
                    {line}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              <form 
                onSubmit={handleCommandSubmit}
              
                className="bg-black/40 border-t border-white/5 p-3 sm:p-4 flex items-center gap-2 shrink-0 font-mono text-[11px] sm:text-xs w-full overflow-hidden"
              >

                <span className="text-[var(--primary)] font-bold shrink-0 select-none">
                  <span className="hidden sm:inline">marcela@mint-portfolio</span>
                  <span className="inline sm:hidden">marcela</span>:~$
                </span>
                <input
                  autoFocus
                  type="text"
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-white/20 min-w-0 text-[11px] sm:text-xs"
                  placeholder={isEn ? "command (try 'help')..." : "comando (prueba 'help')..."}
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HackerConsole;