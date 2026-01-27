import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Three.js 3D Animation of badminton rackets hitting a shuttlecock
 * Full 3D rendering with realistic materials and lighting
 */
export function BadmintonThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(isPlaying);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 1, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Ground (court)
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x228b22,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Net
    const netGroup = createNet();
    scene.add(netGroup);

    // Create rackets
    const leftRacket = createRacket();
    leftRacket.position.set(-3, 1.5, 0);
    scene.add(leftRacket);

    const rightRacket = createRacket();
    rightRacket.position.set(3, 1.5, 0);
    rightRacket.rotation.y = Math.PI;
    scene.add(rightRacket);

    // Create shuttlecock
    const shuttlecock = createShuttlecock();
    shuttlecock.position.set(-2, 2, 0);
    scene.add(shuttlecock);

    // Animation
    let time = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (isPlayingRef.current) {
        time += 0.02;

        // Shuttlecock movement (parabolic arc between rackets)
        const t = (Math.sin(time * 2) + 1) / 2; // 0 to 1
        shuttlecock.position.x = THREE.MathUtils.lerp(-2.5, 2.5, t);
        shuttlecock.position.y = 2 + Math.sin(t * Math.PI) * 1.5;
        shuttlecock.rotation.y = t * Math.PI * 4;
        shuttlecock.rotation.z = t < 0.5 ? -0.5 : 0.5;

        // Left racket swing
        const leftSwing = Math.sin(time * 2);
        leftRacket.rotation.z = -0.3 + leftSwing * 0.5;
        leftRacket.rotation.y = 0.3 - leftSwing * 0.4;
        leftRacket.position.x = -3 + (leftSwing > 0 ? leftSwing * 0.8 : 0);

        // Right racket swing (offset phase)
        const rightSwing = Math.sin(time * 2 + Math.PI);
        rightRacket.rotation.z = 0.3 - rightSwing * 0.5;
        rightRacket.rotation.y = Math.PI - 0.3 + rightSwing * 0.4;
        rightRacket.position.x = 3 - (rightSwing > 0 ? rightSwing * 0.8 : 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 rounded-lg shadow-lg text-sm font-medium hover:bg-white transition-colors"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}

function createRacket(): THREE.Group {
  const racket = new THREE.Group();

  // Handle
  const handleGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.8, 8);
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.6,
  });
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.position.y = -0.4;
  handle.castShadow = true;
  racket.add(handle);

  // Throat
  const throatGeometry = new THREE.CylinderGeometry(0.05, 0.03, 0.15, 8);
  const throatMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.4,
  });
  const throat = new THREE.Mesh(throatGeometry, throatMaterial);
  throat.position.y = 0.08;
  throat.castShadow = true;
  racket.add(throat);

  // Head frame (torus for oval shape)
  const frameShape = new THREE.Shape();
  frameShape.ellipse(0, 0, 0.35, 0.45, 0, Math.PI * 2, false, 0);

  const frameGeometry = new THREE.ExtrudeGeometry(frameShape, {
    depth: 0.03,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,
  });
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.3,
    metalness: 0.2,
  });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.rotation.x = Math.PI / 2;
  frame.position.y = 0.6;
  frame.position.z = -0.015;
  frame.castShadow = true;
  racket.add(frame);

  // Strings (simplified grid)
  const stringMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });

  // Horizontal strings
  for (let i = -4; i <= 4; i++) {
    const y = i * 0.08;
    const halfWidth = Math.sqrt(1 - (y / 0.45) ** 2) * 0.35;
    if (halfWidth > 0) {
      const points = [new THREE.Vector3(-halfWidth, 0.6 + y * 0.8, 0), new THREE.Vector3(halfWidth, 0.6 + y * 0.8, 0)];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, stringMaterial);
      racket.add(line);
    }
  }

  // Vertical strings
  for (let i = -3; i <= 3; i++) {
    const x = i * 0.09;
    const halfHeight = Math.sqrt(1 - (x / 0.35) ** 2) * 0.45;
    if (halfHeight > 0) {
      const points = [
        new THREE.Vector3(x, 0.6 - halfHeight * 0.8, 0),
        new THREE.Vector3(x, 0.6 + halfHeight * 0.8, 0),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, stringMaterial);
      racket.add(line);
    }
  }

  return racket;
}

function createShuttlecock(): THREE.Group {
  const shuttlecock = new THREE.Group();

  // Cork base
  const corkGeometry = new THREE.SphereGeometry(0.12, 16, 16);
  const corkMaterial = new THREE.MeshStandardMaterial({
    color: 0xdaa520,
    roughness: 0.8,
  });
  const cork = new THREE.Mesh(corkGeometry, corkMaterial);
  cork.castShadow = true;
  shuttlecock.add(cork);

  // Feathers (cone shape)
  const featherCount = 16;
  for (let i = 0; i < featherCount; i++) {
    const angle = (i / featherCount) * Math.PI * 2;
    const featherGeometry = new THREE.ConeGeometry(0.02, 0.35, 4);
    const featherMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      side: THREE.DoubleSide,
    });
    const feather = new THREE.Mesh(featherGeometry, featherMaterial);

    feather.position.x = Math.cos(angle) * 0.15;
    feather.position.z = Math.sin(angle) * 0.15;
    feather.position.y = 0.2;

    feather.rotation.x = 0.3;
    feather.rotation.z = -Math.cos(angle) * 0.3;
    feather.rotation.y = angle;

    feather.castShadow = true;
    shuttlecock.add(feather);
  }

  // Skirt base
  const skirtGeometry = new THREE.ConeGeometry(0.18, 0.15, 16, 1, true);
  const skirtMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  const skirt = new THREE.Mesh(skirtGeometry, skirtMaterial);
  skirt.position.y = 0.1;
  skirt.castShadow = true;
  shuttlecock.add(skirt);

  return shuttlecock;
}

function createNet(): THREE.Group {
  const netGroup = new THREE.Group();

  // Posts
  const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
  const postMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

  const leftPost = new THREE.Mesh(postGeometry, postMaterial);
  leftPost.position.set(0, 1, -3);
  leftPost.castShadow = true;
  netGroup.add(leftPost);

  const rightPost = new THREE.Mesh(postGeometry, postMaterial);
  rightPost.position.set(0, 1, 3);
  rightPost.castShadow = true;
  netGroup.add(rightPost);

  // Net mesh
  const netMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });

  // Horizontal lines
  for (let y = 0.2; y <= 1.8; y += 0.15) {
    const points = [new THREE.Vector3(0, y, -3), new THREE.Vector3(0, y, 3)];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, netMaterial);
    netGroup.add(line);
  }

  // Vertical lines
  for (let z = -3; z <= 3; z += 0.3) {
    const points = [new THREE.Vector3(0, 0.2, z), new THREE.Vector3(0, 1.8, z)];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, netMaterial);
    netGroup.add(line);
  }

  return netGroup;
}

export default BadmintonThree;
