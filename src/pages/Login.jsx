import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✅ Formulario enviado");
    try {
      // Espera login
      const userCredential = await signInWithEmailAndPassword(auth, email, pw);
      console.log("✅ Login correcto:", userCredential.user);
      
      // Navega a admin
      navigate("/admin");
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err);
      if (err.code === "auth/invalid-email") {
        setError("El correo no es válido.");
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("Credenciales incorrectas.");
      } else if (err.code === "auth/user-not-found") {
        setError("Usuario no encontrado.");
      } else {
        setError("Ocurrió un error al iniciar sesión.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-dark)] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--bg-surface)] p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Acceso Admin</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full mb-4 p-3 rounded bg-[var(--bg-hover)]"
        />

        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Contraseña"
          required
          className="w-full mb-4 p-3 rounded bg-[var(--bg-hover)]"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#F2138E] to-[#2C04BF] py-3 rounded-xl font-semibold hover:scale-[1.03] transition-all"
        >
          Entrar
        </button>

        {error && (
          <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
