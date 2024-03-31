import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Card: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // إعداد المشهد
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);

      // إعداد المخرج
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);

      // إنشاء الهندسة
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // تحريك الكاميرا لعرض الكائن
      camera.position.z = 5;

      // دالة الرسم
      const animate = () => {
        requestAnimationFrame(animate);

        // تحريك الكائن
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // رسم المشهد
        renderer.render(scene, camera);
      };

      // بدء الرسم
      animate();
    }
  }, []);

  return <div ref={containerRef} style={{ width: '400px', height: '300px' }}></div>;
};

export default Card;
