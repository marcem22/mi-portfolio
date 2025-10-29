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
    let initialDistance = null; // 👉 Para detectar zoom táctil

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

      // 🏷️ Etiquetas limpias: icono + nombre en negro
      const createLabel = (skill) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        canvas.width = 512;
        canvas.height = 256;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const iconSize = 52;
        const textSize = 38;

        // Icono
        ctx.font = `bold ${iconSize}px sans-serif`;
        ctx.fillStyle = skill.color || "#F2138E";
        const iconWidth = skill.icon ? ctx.measureText(skill.icon).width : 0;

        // Nombre
        ctx.font = `bold ${textSize}px 'Poppins', sans-serif`;
        const nameWidth = ctx.measureText(skill.name).width;
        const totalWidth = iconWidth + (skill.icon ? 30 : 0) + nameWidth;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        if (skill.icon) {
          ctx.font = `bold ${iconSize}px sans-serif`;
          ctx.fillStyle = skill.color || "#F2138E";
          ctx.fillText(skill.icon, centerX - totalWidth / 2 + iconWidth / 2, centerY);
        }

        ctx.font = `bold ${textSize}px 'Poppins', sans-serif`;
        ctx.fillStyle = "#000000";
        ctx.fillText(
          skill.name,
          centerX + (skill.icon ? totalWidth / 2 - nameWidth / 2 : 0),
          centerY
        );

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(mat);
        sprite.scale.set(2.6, 1.2, 1);

        return sprite;
      };

      // 🔸 Etiquetas para las 6 caras
      const labels = skills.map(createLabel);
      const offset = cubeSize / 2 + 0.05;
      const placements = [
        [0, 0, offset, 0, 0, 0], // Frente
        [0, 0, -offset, 0, Math.PI, 0], // Atrás
        [-offset, 0, 0, 0, Math.PI / 2, 0], // Izquierda
        [offset, 0, 0, 0, -Math.PI / 2, 0], // Derecha
        [0, offset, 0, -Math.PI / 3, 0, 0], // Arriba
        [0, -offset, 0, Math.PI / 3, 0, 0], // Abajo
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

      // 🎞️ Animación
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

      // 🖱️ / 📱 Interacción
      const getClientPos = (e) => {
        if (e.touches && e.touches.length > 0) {
          return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else {
          return { x: e.clientX, y: e.clientY };
        }
      };

      const onPointerDown = (e) => {
        e.preventDefault();
        isDragging = true;
        autoRotate = false;
        const pos = getClientPos(e);
        previousMousePosition = { x: pos.x, y: pos.y };

        // 📱 Detectar inicio de gesto de zoom
        if (e.touches && e.touches.length === 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          initialDistance = Math.sqrt(dx * dx + dy * dy);
        }
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;

        // 📱 Zoom multitáctil
        if (e.touches && e.touches.length === 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          const newDistance = Math.sqrt(dx * dx + dy * dy);
          if (initialDistance) {
            const zoomFactor = newDistance / initialDistance;
            camera.position.z = Math.min(Math.max(2, camera.position.z / zoomFactor), 10);
          }
          initialDistance = newDistance;
          return;
        }

        // 🖱️ / ☝️ Rotación
        const pos = getClientPos(e);
        const deltaX = pos.x - previousMousePosition.x;
        const deltaY = pos.y - previousMousePosition.y;
        targetRotation.y += deltaX * 0.005;
        targetRotation.x += deltaY * 0.005;
        previousMousePosition = pos;
      };

      const onPointerUp = () => {
        isDragging = false;
        initialDistance = null;
        setTimeout(() => (autoRotate = true), 3000);
      };

      // ✅ Escuchar mouse + touch
      container.addEventListener("mousedown", onPointerDown);
      container.addEventListener("mousemove", onPointerMove);
      container.addEventListener("mouseup", onPointerUp);

      container.addEventListener("touchstart", onPointerDown, { passive: true });
      container.addEventListener("touchmove", onPointerMove, { passive: true });
      container.addEventListener("touchend", onPointerUp);

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
        container.removeEventListener("mousedown", onPointerDown);
        container.removeEventListener("mousemove", onPointerMove);
        container.removeEventListener("mouseup", onPointerUp);
        container.removeEventListener("touchstart", onPointerDown);
        container.removeEventListener("touchmove", onPointerMove);
        container.removeEventListener("touchend", onPointerUp);
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
        style={{ color: "var(--texto-principal)" }}
      >
        Mis Habilidades
        <div
          className="absolute -bottom-1 left-0 w-20 h-0.5"
          style={{
            backgroundColor: "#FF8FD6",
            boxShadow: "0 0 15px rgba(255, 143, 214, 0.6)",
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
          touchAction: "none", // 🔒 evita conflicto con scroll en móvil
        }}
      />
    </div>
  );
}

export default SkillsCube3D;
