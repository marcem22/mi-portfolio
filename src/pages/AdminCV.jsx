import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

function AdminCV() {
  const [profile, setProfile] = useState({
    summary: "",
    experience: [],
    education: [],
    projects: [],
    skillsLanguages: [],
    skillsFrameworks: [],
    skillsTools: [],
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "profile", "main"));
        if (snap.exists()) {
          const data = snap.data();
          setProfile({
            summary: data.summary || "",
            experience: data.experience || [],
            education: data.education || [],
            projects: data.projects || [],
            skillsLanguages: data.skillsLanguages || [],
            skillsFrameworks: data.skillsFrameworks || [],
            skillsTools: data.skillsTools || [],
          });
        }
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const updateExperienceField = (index, field, value) => {
    setProfile((prev) => {
      const newExp = [...prev.experience];
      newExp[index] = { ...newExp[index], [field]: value };
      return { ...prev, experience: newExp };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const newProfile = {
        ...profile,
        experience: profile.experience.filter(
          (exp) => exp.role || exp.company || exp.summary
        ),
      };
      await setDoc(doc(db, "profile", "main"), newProfile, { merge: true });
      setMessage("✅ Cambios guardados correctamente");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error al guardar:", err);
      setMessage("❌ Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center text-white mt-20">Cargando...</p>;

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-[var(--accent)]">
        Panel de administración del CV
      </h1>
      <button
        onClick={() => signOut(auth)}
        className="absolute top-6 right-6 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--secondary)] transition-all"
      >
        Cerrar sesión
      </button>

      {message && (
        <div className="mb-4 text-center text-lg font-semibold text-[var(--accent)]">
          {message}
        </div>
      )}

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Perfil profesional</h2>
        <textarea
          name="summary"
          value={profile.summary}
          onChange={handleChange}
          rows={5}
          className="w-full p-4 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl"
          placeholder="Describe tu perfil profesional..."
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Proyectos</h2>

        {profile.projects && profile.projects.length > 0 ? (
            profile.projects.map((proj, i) => (
            <div key={i} className="mb-6 p-4 border border-[var(--border-light)] rounded-xl bg-[var(--bg-surface)]/60">
                
                <input
                  type="text"
                  placeholder="Nombre del proyecto (ej: TEAssist)"
                  value={proj.name || ""}
                  onChange={(e) => {
                      const newProjects = [...profile.projects];
                      newProjects[i].name = e.target.value;
                      setProfile({ ...profile, projects: newProjects });
                  }}
                  className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white font-bold"
                />

                <input
                  type="text"
                  placeholder="URL de la imagen de portada (ej: https://... o /imagen.png)"
                  value={proj.image || ""}
                  onChange={(e) => {
                      const newProjects = [...profile.projects];
                      newProjects[i].image = e.target.value;
                      setProfile({ ...profile, projects: newProjects });
                  }}
                  className="w-full mb-2 px-3 py-2 rounded border border-[var(--accent)] bg-[var(--bg-hover)] text-white"
                />

                <textarea
                  placeholder="Descripción general del proyecto"
                  value={proj.summary || ""}
                  onChange={(e) => {
                      const newProjects = [...profile.projects];
                      newProjects[i].summary = e.target.value;
                      setProfile({ ...profile, projects: newProjects });
                  }}
                  rows={2}
                  className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                />

                <textarea
                  placeholder="Desafíos Técnicos (Ideal para destacar la arquitectura, seguridad, etc.)"
                  value={proj.challenges || ""}
                  onChange={(e) => {
                      const newProjects = [...profile.projects];
                      newProjects[i].challenges = e.target.value;
                      setProfile({ ...profile, projects: newProjects });
                  }}
                  rows={4}
                  className="w-full mb-2 px-3 py-2 rounded border border-[var(--primary)] bg-[var(--bg-hover)] text-white"
                />

                <input
                  type="text"
                  placeholder="Tecnologías (separadas por coma)"
                  value={proj.stack ? proj.stack.join(", ") : ""}
                  onChange={(e) => {
                      const newProjects = [...profile.projects];
                      newProjects[i].stack = e.target.value.split(",").map((s) => s.trim());
                      setProfile({ ...profile, projects: newProjects });
                  }}
                  className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                />

                <div className="flex flex-col md:flex-row gap-4 mb-2">
                  <input
                      type="text"
                      placeholder="Link web (ej: https://...)"
                      value={proj.link || ""}
                      onChange={(e) => {
                      const newProjects = [...profile.projects];
                      newProjects[i].link = e.target.value;
                      setProfile({ ...profile, projects: newProjects });
                      }}
                      className="flex-1 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                  />
                  
                  <input
                      type="text"
                      placeholder="Link de Video/Demo en YouTube"
                      value={proj.demoLink || ""}
                      onChange={(e) => {
                      const newProjects = [...profile.projects];
                      newProjects[i].demoLink = e.target.value;
                      setProfile({ ...profile, projects: newProjects });
                      }}
                      className="flex-1 px-3 py-2 rounded bg-[var(--bg-hover)] text-white border border-[var(--accent)]"
                  />
                  <input
                      type="text"
                      placeholder="Repositorio (Dejar vacío si es privado)"
                      value={proj.github || ""}
                      onChange={(e) => {
                      const newProjects = [...profile.projects];
                      newProjects[i].github = e.target.value;
                      setProfile({ ...profile, projects: newProjects });
                      }}
                      className="flex-1 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                  />
                </div>

                <label className="flex items-center gap-2 mt-2 text-sm text-[var(--text-muted)]">
                  <input
                      type="checkbox"
                      checked={proj.featured || false}
                      onChange={(e) => {
                      const newProjects = [...profile.projects];
                      newProjects[i].featured = e.target.checked;
                      setProfile({ ...profile, projects: newProjects });
                      }}
                      className="accent-[var(--accent)] w-4 h-4"
                  />
                  Destacar este proyecto
                </label>

                <button
                  onClick={() => {
                      const updated = profile.projects.filter((_, idx) => idx !== i);
                      setProfile({ ...profile, projects: updated });
                  }}
                  className="text-sm text-red-400 hover:text-red-300 mt-3"
                >
                  🗑️ Eliminar proyecto
                </button>
            </div>
            ))
        ) : (
            <p className="text-gray-400 mb-4">No hay proyectos agregados.</p>
        )}

        <button
            onClick={() => {
            const nuevo = { name: "", summary: "", challenges: "", image: "", demoLink: "", stack: [], link: "", github: "", featured: false };
            setProfile({ ...profile, projects: [...(profile.projects || []), nuevo] });
            }}
            className="px-5 py-2 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--secondary)] transition-all duration-300"
        >
            ➕ Agregar proyecto
        </button>
      </section>

      <button onClick={handleSave} disabled={saving} className={`mt-4 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${saving ? "bg-[var(--bg-hover)] cursor-not-allowed text-[var(--text-muted)]" : "bg-[var(--primary)] hover:bg-[var(--secondary)] text-white"}`}>
            {saving ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}

export default AdminCV;