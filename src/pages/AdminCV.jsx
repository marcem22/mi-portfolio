import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import SideNavbar from "../components/SideNavbar";

function AdminCV() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  

  const initialForm = {
    name: "",
    image: "",
    summary_es: "",
    summary_en: "",
    stack: "", 
    link: "",
    github: "",
    demoLink: "",
    featured: false
  };
  
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const snap = await getDoc(doc(db, "profile", "main"));
      if (snap.exists()) {
        const data = snap.data();
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error("Error al cargar datos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleEdit = (index) => {
    const proj = projects[index];
    setFormData({
      ...proj,
      stack: proj.stack ? proj.stack.join(", ") : "", 
      summary_es: proj.summary_es || proj.summary || "", 
      summary_en: proj.summary_en || "",
     
    });
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (index) => {
    if (!window.confirm("¿Seguro que querés borrar este proyecto?")) return;
    
    const updatedProjects = projects.filter((_, i) => i !== index);
    try {
      await updateDoc(doc(db, "profile", "main"), { projects: updatedProjects });
      setProjects(updatedProjects);
    } catch (err) {
      console.error("Error al borrar:", err);
      alert("Hubo un error al borrar el proyecto.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const projectToSave = {
      ...formData,
      stack: formData.stack.split(",").map(s => s.trim()).filter(s => s !== "")
    };

    let updatedProjects = [...projects];
    if (editingIndex !== null) {
      updatedProjects[editingIndex] = projectToSave;
    } else {
      updatedProjects.push(projectToSave);
    }

    try {
      await updateDoc(doc(db, "profile", "main"), { projects: updatedProjects });
      setProjects(updatedProjects);
      setFormData(initialForm);
      setEditingIndex(null);
      alert("¡Proyecto guardado con éxito!");
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Hubo un error al guardar el proyecto.");
    }
  };

  const cancelEdit = () => {
    setFormData(initialForm);
    setEditingIndex(null);
  };

  if (loading) return <div className="text-white text-center mt-20">Cargando panel...</div>;

  return (
    <div className="relative min-h-screen bg-[var(--bg-dark)] text-white p-6 md:p-12 ml-0 md:ml-20">
      <SideNavbar />
      
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-black uppercase text-[var(--primary)] mb-8 tracking-widest">
          Panel de Control - Proyectos
        </h1>

        {/* FORMULARIO DE CARGA/EDICIÓN */}
        <div className="bg-[#121212] p-6 border border-white/10 shadow-xl mb-12">
          <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">
            {editingIndex !== null ? "✏️ Editar Proyecto" : "➕ Nuevo Proyecto"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Nombre del Proyecto</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-2 bg-[#1A1A1A] border border-gray-700 text-white outline-none focus:border-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">URL de la Imagen</label>
                <input type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full p-2 bg-[#1A1A1A] border border-gray-700 text-white outline-none focus:border-[var(--primary)]" placeholder="https://..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[var(--primary)] mb-1">Resumen (ESPAÑOL)</label>
                <textarea name="summary_es" value={formData.summary_es} onChange={handleInputChange} rows="3" required className="w-full p-2 bg-[#1A1A1A] border border-gray-700 text-white outline-none focus:border-[var(--primary)] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-blue-400 mb-1">Resumen (INGLÉS)</label>
                <textarea name="summary_en" value={formData.summary_en} onChange={handleInputChange} rows="3" className="w-full p-2 bg-[#1A1A1A] border border-gray-700 text-white outline-none focus:border-blue-400 resize-none" />
              </div>
            </div>

           
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Stack (Separado por comas)</label>
              <input type="text" name="stack" value={formData.stack} onChange={handleInputChange} className="w-full p-2 bg-[#1A1A1A] border border-gray-700 text-white outline-none focus:border-[var(--primary)]" placeholder="React, Node.js, Tailwind..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Link Web</label>
                <input type="text" name="link" value={formData.link} onChange={handleInputChange} className="w-full p-2 bg-[#1A1A1A] border border-gray-700 text-white outline-none focus:border-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Link GitHub</label>
                <input type="text" name="github" value={formData.github} onChange={handleInputChange} className="w-full p-2 bg-[#1A1A1A] border border-gray-700 text-white outline-none focus:border-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Link Demo (Video)</label>
                <input type="text" name="demoLink" value={formData.demoLink} onChange={handleInputChange} className="w-full p-2 bg-[#1A1A1A] border border-gray-700 text-white outline-none focus:border-[var(--primary)]" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="w-4 h-4 accent-[var(--primary)]" />
              <label htmlFor="featured" className="text-sm font-bold uppercase tracking-widest text-[var(--primary)] cursor-pointer">Destacar en Portfolio</label>
            </div>

            <div className="flex gap-4 pt-6">
              <button type="submit" className="px-6 py-2 bg-[var(--primary)] text-black font-bold uppercase tracking-widest hover:brightness-110">
                {editingIndex !== null ? "Guardar Cambios" : "Agregar Proyecto"}
              </button>
              {editingIndex !== null && (
                <button type="button" onClick={cancelEdit} className="px-6 py-2 border border-gray-500 text-gray-400 font-bold uppercase tracking-widest hover:bg-gray-800">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>


        <div>
          <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">📂 Proyectos Cargados ({projects.length})</h2>
          <div className="space-y-4">
            {projects.map((proj, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-between p-4 bg-[#121212] border border-white/5 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-[#1A1A1A] flex items-center justify-center overflow-hidden border border-gray-700">
                    {proj.image ? <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" /> : <span className="text-xs text-gray-600">&lt;/&gt;</span>}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      {proj.name} {proj.featured && <span className="text-[10px] bg-[var(--primary)] text-black px-2 py-0.5 rounded-full">Destacado</span>}
                    </h3>
                    <p className="text-xs text-gray-400 truncate max-w-xs">{proj.summary_es || proj.summary}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(i)} className="px-4 py-2 border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 text-xs font-bold uppercase transition-colors">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(i)} className="px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase transition-colors">
                    Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminCV;