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
    let initialDistance = null; 

    try {
      scene = new THREE.Scene();

      // Las luces ahora solo afectarán a las partículas
      scene.add(new THREE.AmbientLight(0xffffff, 0.8)); 
      
      const frontLight = new THREE.PointLight(0xffffff, 2.5, 10);
      frontLight.position.set(0, 0, 4); 
      scene.add(frontLight);

      const accentLight = new THREE.PointLight(0xd9525e, 1.5, 10);
      accentLight.position.set(2, 3, -2);
      scene.add(accentLight);

      // === LA CLAVE AQUÍ: Si el div no cargó el tamaño, forzamos 420px ===
      const width = container.clientWidth || 520;
      const height = container.clientHeight || 420;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 4.5;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const skills = [
        { name: "React", iconUrl: "/assets/textures/react-icon.png" },
        { name: "JavaScript", iconUrl: "/assets/textures/js-icon.png" },
        { name: "CSS", iconUrl: "/assets/textures/css-icon.png" },
        { name: "HTML", iconUrl: "/assets/textures/html-icon.png" },
        { name: "Node.js", iconUrl: "/assets/textures/node-icon.png" },
        { name: "Git", iconUrl: "/assets/textures/git-icon.png" },
      ];

      const cubeSize = 2;
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      
      const materials = Array(6)
        .fill()
        .map(
          () =>
            new THREE.MeshBasicMaterial({
              color: 0xA64149, // === CAMBIO AQUÍ: Ahora las caras son del color de las aristas ===
              transparent: true,
              opacity: 0.9, 
            })
        );

      cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);

      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: 0xA64149, 
          transparent: true,
          linewidth: 4, 
          opacity: 1, 
        })
      );
      cube.add(line);

      const createLabel = (skill) => {
        if (!skill.iconUrl) return null;
        
        const texture = new THREE.TextureLoader().load(skill.iconUrl);
        texture.minFilter = THREE.LinearFilter;
        
        const mat = new THREE.MeshBasicMaterial({ 
            map: texture, 
            transparent: true,
            opacity: 0, 
            depthWrite: false 
        });

        const planeGeo = new THREE.PlaneGeometry(1.2, 1.2);
        const mesh = new THREE.Mesh(planeGeo, mat);

        return mesh;
      };

      const labels = skills.map(createLabel).filter(Boolean);
      const offset = cubeSize / 2 + 0.01;

      const placements = [
        [0, 0, offset, 0, 0, 0],                            
        [0, 0, -offset, 0, Math.PI, 0],                     
        [-offset, 0, 0, 0, -Math.PI / 2, 0],                
        [offset, 0, 0, 0, Math.PI / 2, 0],                  
        [0, offset, 0, -Math.PI / 2, 0, 0],                 
        [0, -offset, 0, Math.PI / 2, 0, 0],                 
      ];

      placements.forEach((placement, i) => {
        const [x, y, z, rx, ry, rz] = placement;
        const mesh = labels[i % labels.length];
        mesh.position.set(x, y, z);
        mesh.rotation.set(rx, ry, rz);
        cube.add(mesh);
      });

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
        color: 0xd9525e,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      let ry = 0;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (autoRotate) ry += 0.004;
        
        cube.rotation.y = ry + targetRotation.y;
        cube.rotation.x += (targetRotation.x - cube.rotation.x) * 0.1;
        particles.rotation.y += 0.0008;

        labels.forEach((label) => {
          if (!label) return;
          const worldPos = new THREE.Vector3();
          label.getWorldPosition(worldPos);

          let opacity = (worldPos.z - 0.4) / 0.8; 
          opacity = Math.max(0, Math.min(1, opacity)); 
          
          label.material.opacity = opacity;
        });

        renderer.render(scene, camera);
      };
      animate();

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

        if (e.touches && e.touches.length === 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          initialDistance = Math.sqrt(dx * dx + dy * dy);
        }
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;

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

        const pos = getClientPos(e);
        const deltaX = pos.x - previousMousePosition.x;
        const deltaY = pos.y - previousMousePosition.y;
        targetRotation.y += deltaX * 0.008;
        targetRotation.x += deltaY * 0.008;
        previousMousePosition = pos;
      };

      const onPointerUp = () => {
        isDragging = false;
        initialDistance = null;
        setTimeout(() => (autoRotate = true), 2000);
      };

      container.addEventListener("mousedown", onPointerDown);
      container.addEventListener("mousemove", onPointerMove);
      container.addEventListener("mouseup", onPointerUp);
      container.addEventListener("mouseleave", onPointerUp); 

      container.addEventListener("touchstart", onPointerDown, { passive: true });
      container.addEventListener("touchmove", onPointerMove, { passive: true });
      container.addEventListener("touchend", onPointerUp);

      const handleResize = () => {
        if (!container) return;
        const newWidth = container.clientWidth || 520;
        const newHeight = container.clientHeight || 420;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        container.removeEventListener("mousedown", onPointerDown);
        container.removeEventListener("mousemove", onPointerMove);
        container.removeEventListener("mouseup", onPointerUp);
        container.removeEventListener("mouseleave", onPointerUp);
        container.removeEventListener("touchstart", onPointerDown);
        container.removeEventListener("touchmove", onPointerMove);
        container.removeEventListener("touchend", onPointerUp);
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div
        ref={mountRef}
        style={{
          width: "100%",
          maxWidth: "520px",
          height: "420px",
          background: "transparent",
          cursor: "grab",
          touchAction: "none",
        }}
      />
    </div>
  );
}

export default SkillsCube3D;