import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

      console.log("🔥 Guardando perfil completo:", newProfile);

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

      {message && (
        <div className="mb-4 text-center text-lg font-semibold text-[var(--accent)]">
          {message}
        </div>
      )}

      {/* PERFIL PROFESIONAL */}
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

      {/* EXPERIENCIA */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Experiencia</h2>

        {profile.experience.length > 0 ? (
          profile.experience.map((exp, i) => (
            <div
              key={i}
              className="mb-6 p-4 border border-[var(--border-light)] rounded-xl bg-[var(--bg-surface)]/60"
            >
              <input
                type="text"
                placeholder="Cargo o rol"
                value={exp.role || ""}
                onChange={(e) => updateExperienceField(i, "role", e.target.value)}
                className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
              />

              <input
                type="text"
                placeholder="Empresa o institución"
                value={exp.company || ""}
                onChange={(e) => updateExperienceField(i, "company", e.target.value)}
                className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
              />

              <div className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Inicio (ej: Jun 2024)"
                  value={exp.startDate || ""}
                  onChange={(e) =>
                    updateExperienceField(i, "startDate", e.target.value)
                  }
                  className="flex-1 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                />
                <input
                  type="text"
                  placeholder="Fin (ej: Presente)"
                  value={exp.endDate || ""}
                  onChange={(e) =>
                    updateExperienceField(i, "endDate", e.target.value)
                  }
                  className="flex-1 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                />
              </div>

              <textarea
                placeholder="Descripción o resumen"
                value={exp.summary || ""}
                onChange={(e) =>
                  updateExperienceField(i, "summary", e.target.value)
                }
                className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                rows={3}
              />

              <button
                onClick={() => {
                  setProfile((prev) => ({
                    ...prev,
                    experience: prev.experience.filter((_, idx) => idx !== i),
                  }));
                }}
                className="text-sm text-red-400 hover:text-red-300 mt-2"
              >
                🗑️ Eliminar
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mb-4">No hay experiencias agregadas.</p>
        )}

        <button
          onClick={() => {
            setProfile((prev) => ({
              ...prev,
              experience: [
                ...prev.experience,
                { role: "", company: "", startDate: "", endDate: "", summary: "" },
              ],
            }));
          }}
          className="px-5 py-2 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--accent)] transition-all duration-300"
        >
          ➕ Agregar experiencia
        </button>
      </section>

      {/* FORMACIÓN */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Formación</h2>

        {profile.education && profile.education.length > 0 ? (
          profile.education.map((edu, i) => (
            <div
              key={i}
              className="mb-6 p-4 border border-[var(--border-light)] rounded-xl bg-[var(--bg-surface)]/60"
            >
              {/* Carrera o título */}
              <input
                type="text"
                placeholder="Carrera o título (ej: Tecnicatura Universitaria en Programación Web)"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...profile.education];
                  newEdu[i].degree = e.target.value;
                  setProfile({ ...profile, education: newEdu });
                }}
                className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
              />

              {/* Institución */}
              <input
                type="text"
                placeholder="Institución (ej: UNSJ - Universidad Nacional de San Juan)"
                value={edu.institution}
                onChange={(e) => {
                  const newEdu = [...profile.education];
                  newEdu[i].institution = e.target.value;
                  setProfile({ ...profile, education: newEdu });
                }}
                className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
              />

              <div className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Inicio (ej: 2022)"
                  value={edu.startYear}
                  onChange={(e) => {
                    const newEdu = [...profile.education];
                    newEdu[i].startYear = e.target.value;
                    setProfile({ ...profile, education: newEdu });
                  }}
                  className="flex-1 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                />
                <input
                  type="text"
                  placeholder="Fin (ej: En curso)"
                  value={edu.endYear}
                  onChange={(e) => {
                    const newEdu = [...profile.education];
                    newEdu[i].endYear = e.target.value;
                    setProfile({ ...profile, education: newEdu });
                  }}
                  className="flex-1 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                />
              </div>

              <textarea
                placeholder="Detalles o descripción"
                value={edu.details}
                onChange={(e) => {
                  const newEdu = [...profile.education];
                  newEdu[i].details = e.target.value;
                  setProfile({ ...profile, education: newEdu });
                }}
                className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                rows={3}
              />

              <button
                onClick={() => {
                  const updated = profile.education.filter((_, idx) => idx !== i);
                  setProfile({ ...profile, education: updated });
                }}
                className="text-sm text-red-400 hover:text-red-300 mt-2"
              >
                🗑️ Eliminar
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mb-4">No hay formaciones agregadas.</p>
        )}

        <button
          onClick={() => {
            const nueva = {
              degree: "",
              institution: "",
              startYear: "",
              endYear: "",
              details: "",
            };
            setProfile({
              ...profile,
              education: [...(profile.education || []), nueva],
            });
          }}
          className="px-5 py-2 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--accent)] transition-all duration-300"
        >
          ➕ Agregar formación
        </button>
      </section>
      {/* PROYECTOS */}
    <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Proyectos</h2>

        {profile.projects && profile.projects.length > 0 ? (
            profile.projects.map((proj, i) => (
            <div
                key={i}
                className="mb-6 p-4 border border-[var(--border-light)] rounded-xl bg-[var(--bg-surface)]/60"
            >
                {/* Nombre del proyecto */}
                <input
                type="text"
                placeholder="Nombre del proyecto (ej: TEAssist)"
                value={proj.name || ""}
                onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[i].name = e.target.value;
                    setProfile({ ...profile, projects: newProjects });
                }}
                className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                />

                {/* Descripción */}
                <textarea
                placeholder="Descripción breve del proyecto"
                value={proj.summary || ""}
                onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[i].summary = e.target.value;
                    setProfile({ ...profile, projects: newProjects });
                }}
                rows={3}
                className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                />

                {/* Tecnologías */}
                <input
                type="text"
                placeholder="Tecnologías (separadas por coma, ej: React, Node.js, MySQL)"
                value={proj.stack ? proj.stack.join(", ") : ""}
                onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[i].stack = e.target.value
                    .split(",")
                    .map((s) => s.trim());
                    setProfile({ ...profile, projects: newProjects });
                }}
                className="w-full mb-2 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                />

                {/* Enlaces */}
                <div className="flex flex-col md:flex-row gap-4 mb-2">
                <input
                    type="text"
                    placeholder="Link al proyecto (ej: https://...)"
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
                    placeholder="Repositorio (GitHub, GitLab, etc)"
                    value={proj.github || ""}
                    onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[i].github = e.target.value;
                    setProfile({ ...profile, projects: newProjects });
                    }}
                    className="flex-1 px-3 py-2 rounded bg-[var(--bg-hover)] text-white"
                />
                </div>

                {/* Checkbox destacado */}
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
                Marcar como proyecto destacado (se mostrará en el CV)
                </label>

                {/* Botón eliminar */}
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

        {/* Botón agregar nuevo proyecto */}
        <button
            onClick={() => {
            const nuevo = {
                name: "",
                summary: "",
                stack: [],
                link: "",
                github: "",
                featured: false,
            };
            setProfile({
                ...profile,
                projects: [...(profile.projects || []), nuevo],
            });
            }}
            className="px-5 py-2 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--accent)] transition-all duration-300"
        >
            ➕ Agregar proyecto
        </button>
    </section>


      {/* BOTÓN GUARDAR */}
      <button
            onClick={handleSave}
            disabled={saving}
            className={`mt-4 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
            saving
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[var(--primary)] hover:bg-[var(--accent)] text-white"
            }`}
        >
            {saving ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}

export default AdminCV;
