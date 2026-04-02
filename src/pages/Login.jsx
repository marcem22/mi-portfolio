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
      const userCredential = await signInWithEmailAndPassword(auth, email, pw);
      console.log("✅ Login correcto:", userCredential.user);
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-dark)] text-[var(--text-primary)]">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--bg-surface)] border border-[var(--border-light)] p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] w-full max-w-sm relative"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--text-primary)]">Acceso Admin</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full mb-4 p-4 rounded-xl bg-[var(--bg-dark)] border border-[var(--border)] focus:border-[var(--primary)] outline-none transition-all text-[var(--text-primary)]"
        />

        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Contraseña"
          required
          className="w-full mb-6 p-4 rounded-xl bg-[var(--bg-dark)] border border-[var(--border)] focus:border-[var(--primary)] outline-none transition-all text-[var(--text-primary)]"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] py-3 rounded-xl font-semibold hover:scale-[1.03] transition-all shadow-[0_0_20px_rgba(217,82,94,0.4)] text-white"
        >
          Entrar
        </button>

        {error && (
          <p className="text-[var(--primary)] text-sm mt-4 text-center font-medium">{error}</p>
        )}
      </form>
    </div>
  );
}

export default Login;