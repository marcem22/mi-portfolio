import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function SkillsCube3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer, camera, scene, cube, particles, animationFrameId;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let autoRotate = true;

    try {
      // 🎬 Escena
      scene = new THREE.Scene();

      // 💡 Luces suaves
      scene.add(new THREE.AmbientLight(0xffffff, 1));
      const pointLight = new THREE.PointLight(0xffb3e6, 1.6);
      pointLight.position.set(2, 3, 4);
      scene.add(pointLight);

      // 📷 Cámara
      camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.z = 4.5;

      // 🧊 Render
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // 🎨 Skills
      const skills = [
        { name: "React", color: "#61DAFB", icon: "⚛️" },
        { name: "JavaScript", color: "#F7DF1E", icon: "🟨" },
        { name: "CSS", color: "#1572B6", icon: "🎨" },
        { name: "HTML", color: "#E34F26", icon: "📄" },
        { name: "Node.js", color: "#339933", icon: "🟢" },
        { name: "Git", color: "#F05032", icon: "📦" },
      ];

      // 🔹 Cubo de color rosa translúcido
      const cubeSize = 2;
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const baseColor = new THREE.Color("#FF8FD6");
      const materials = Array(6)
        .fill()
        .map(
          () =>
            new THREE.MeshPhongMaterial({
              color: baseColor,
              emissive: baseColor.clone().multiplyScalar(0.25),
              shininess: 90,
              transparent: true,
              opacity: 0.7,
            })
        );

      cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);

      // 🌐 Wireframe
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.6,
        })
      );
      cube.add(line);

// 🏷️ Etiquetas limpias: icono + nombre en negro, sin fondo ni efectos
const createLabel = (skill) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Tamaño del lienzo
  canvas.width = 512;
  canvas.height = 256;

  // Fondo completamente transparente
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Configuración de texto
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Estilo del icono (si el skill lo tiene)
  ctx.font = "bold 52px sans-serif";
  ctx.fillStyle = skill.color || "#F2138E";
  const iconWidth = skill.icon ? ctx.measureText(skill.icon).width : 0;

  // Estilo del nombre
  ctx.font = "bold 38px 'Poppins', sans-serif";
  const nameWidth = ctx.measureText(skill.name).width;

  // Calcular posición combinada
  const totalWidth = iconWidth + (skill.icon ? 30 : 0) + nameWidth;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Dibujar icono si existe
  if (skill.icon) {
    ctx.font = "bold 52px sans-serif";
    ctx.fillStyle = skill.color || "#F2138E";
    ctx.fillText(skill.icon, centerX - totalWidth / 2 + iconWidth / 2, centerY);
  }

  // Dibujar nombre (en negro)
  ctx.font = "bold 38px 'Poppins', sans-serif";
  ctx.fillStyle = "#0000000";
  ctx.fillText(skill.name, centerX + (skill.icon ? totalWidth / 2 - nameWidth / 2 : 0), centerY);

  // Crear textura y sprite
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(2.6, 1.2, 1);

  return sprite;
};



      // 🔸 Crear etiquetas para las 6 caras (sin repetir)
      const labels = skills.map(createLabel);
      const offset = cubeSize / 2 + 0.05;

      // ✅ Colocamos las etiquetas con leve inclinación en top y bottom para visibilidad
      const placements = [
        [0, 0, offset, 0, 0, 0], // Frente
        [0, 0, -offset, 0, Math.PI, 0], // Atrás
        [-offset, 0, 0, 0, Math.PI / 2, 0], // Izquierda
        [offset, 0, 0, 0, -Math.PI / 2, 0], // Derecha
        [0, offset, 0, -Math.PI / 3, 0, 0], // Arriba (inclinada)
        [0, -offset, 0, Math.PI / 3, 0, 0], // Abajo (inclinada)
      ];

      placements.forEach((placement, i) => {
        const [x, y, z, rx, ry, rz] = placement;
        const sprite = labels[i % labels.length];
        sprite.position.set(x, y, z);
        sprite.rotation.set(rx, ry, rz);
        cube.add(sprite);
      });

      // ✨ Partículas flotantes
      const pGeo = new THREE.BufferGeometry();
      const count = 100;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 1.5;
        const t = Math.random() * Math.PI * 2;
        const p = Math.random() * Math.PI;
        pos[i * 3] = r * Math.sin(p) * Math.cos(t);
        pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
        pos[i * 3 + 2] = r * Math.cos(p);
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xffb3e6,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      // 🎞️ Animación con rotación manual + automática
      let ry = 0;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (autoRotate) ry += 0.004;
        cube.rotation.y = ry + targetRotation.y;
        cube.rotation.x += (targetRotation.x - cube.rotation.x) * 0.1;
        particles.rotation.y += 0.0008;
        renderer.render(scene, camera);
      };
      animate();

      // 🖱️ Rotación manual
      const onMouseDown = (e) => {
        isDragging = true;
        autoRotate = false;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotation.y += deltaX * 0.005;
        targetRotation.x += deltaY * 0.005;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onMouseUp = () => {
        isDragging = false;
        setTimeout(() => (autoRotate = true), 3000);
      };

      container.addEventListener("mousedown", onMouseDown);
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseup", onMouseUp);

      // 📏 Resize
      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      // 🧹 Cleanup
      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        container.removeEventListener("mousedown", onMouseDown);
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseup", onMouseUp);
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.error("❌ Error en SkillsCube3D:", err);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2
        className="text-3xl font-bold mb-8 relative inline-block"
                  style={{ color: 'var(--texto-principal)' }}
      >
        Mis Habilidades
        <div
                    className="absolute -bottom-1 left-0 w-20 h-0.5"
                    style={{
                      backgroundColor: '#FF8FD6',
                      boxShadow: '0 0 15px rgba(255, 143, 214, 0.6)',
                    }}
       />
      </h2>

      <div
        ref={mountRef}
        style={{
          width: "100%",
          maxWidth: "520px",
          height: "420px",
          background: "transparent",
          cursor: "grab",
        }}
      />
    </div>
  );
}

export default SkillsCube3D;