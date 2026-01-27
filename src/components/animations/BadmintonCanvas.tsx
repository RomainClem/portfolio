import { useEffect, useRef, useState } from "react";

/**
 * HTML Canvas 3D Animation with manual perspective projection
 * A custom 3D engine approach using 2D canvas with depth calculations
 */
export function BadmintonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(isPlaying);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Keep a reference to the context that TypeScript knows is non-null
    const context = ctx;

    // Set canvas size
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height;
    const centerX = width / 2;
    const centerY = height / 2;

    // 3D projection settings
    const focalLength = 400;
    const cameraZ = 300;

    // Project 3D point to 2D
    function project(x: number, y: number, z: number): { x: number; y: number; scale: number } {
      const scale = focalLength / (focalLength + z + cameraZ);
      return {
        x: centerX + x * scale,
        y: centerY - y * scale,
        scale,
      };
    }

    // Draw racket at 3D position with rotation
    function drawRacket(
      x: number,
      y: number,
      z: number,
      rotationY: number,
      rotationZ: number,
      color: string
    ) {
      context.save();

      const headCenter = project(x, y + 40, z);
      const handleBottom = project(x, y - 50, z);

      // Calculate apparent rotation effect
      const perspectiveSkew = Math.cos(rotationY) * 0.8;
      const swingOffset = Math.sin(rotationZ) * 30;

      // Handle
      context.beginPath();
      context.strokeStyle = "#8B4513";
      context.lineWidth = 8 * headCenter.scale;
      context.lineCap = "round";
      context.moveTo(handleBottom.x + swingOffset * 0.5, handleBottom.y);
      context.lineTo(headCenter.x + swingOffset, headCenter.y);
      context.stroke();

      // Head frame
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = 5 * headCenter.scale;
      context.ellipse(
        headCenter.x + swingOffset,
        headCenter.y - 30 * headCenter.scale,
        35 * headCenter.scale * Math.abs(perspectiveSkew),
        45 * headCenter.scale,
        0,
        0,
        Math.PI * 2
      );
      context.stroke();

      // Strings
      context.strokeStyle = "rgba(255, 255, 255, 0.6)";
      context.lineWidth = 1;

      const stringCenterX = headCenter.x + swingOffset;
      const stringCenterY = headCenter.y - 30 * headCenter.scale;
      const radiusX = 30 * headCenter.scale * Math.abs(perspectiveSkew);
      const radiusY = 40 * headCenter.scale;

      // Horizontal strings
      for (let i = -4; i <= 4; i++) {
        const offsetY = i * 8 * headCenter.scale;
        const widthAtY = Math.sqrt(1 - (offsetY / radiusY) ** 2) * radiusX;
        if (widthAtY > 0) {
          context.beginPath();
          context.moveTo(stringCenterX - widthAtY, stringCenterY + offsetY);
          context.lineTo(stringCenterX + widthAtY, stringCenterY + offsetY);
          context.stroke();
        }
      }

      // Vertical strings
      for (let i = -3; i <= 3; i++) {
        const offsetX = i * 8 * headCenter.scale * Math.abs(perspectiveSkew);
        const heightAtX = radiusX > 0 ? Math.sqrt(Math.max(0, 1 - (offsetX / radiusX) ** 2)) * radiusY : 0;
        if (heightAtX > 0) {
          context.beginPath();
          context.moveTo(stringCenterX + offsetX, stringCenterY - heightAtX);
          context.lineTo(stringCenterX + offsetX, stringCenterY + heightAtX);
          context.stroke();
        }
      }

      context.restore();
    }

    // Draw shuttlecock
    function drawShuttlecock(x: number, y: number, z: number, rotation: number) {
      const pos = project(x, y, z);

      context.save();
      context.translate(pos.x, pos.y);
      context.rotate(rotation);

      // Feathers (cone shape)
      const featherLength = 40 * pos.scale;
      const featherWidth = 25 * pos.scale;

      // Draw feather cone
      context.beginPath();
      context.fillStyle = "rgba(255, 255, 255, 0.9)";
      context.moveTo(0, -featherLength);
      context.lineTo(-featherWidth / 2, 0);
      context.lineTo(featherWidth / 2, 0);
      context.closePath();
      context.fill();

      // Feather lines
      context.strokeStyle = "rgba(200, 200, 200, 0.5)";
      context.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        const startX = (i / 3) * (featherWidth / 2);
        context.beginPath();
        context.moveTo(0, -featherLength);
        context.lineTo(startX, 0);
        context.stroke();
      }

      // Cork base
      const corkRadius = 10 * pos.scale;
      const gradient = context.createRadialGradient(
        -corkRadius * 0.3,
        corkRadius * 0.3,
        0,
        0,
        0,
        corkRadius
      );
      gradient.addColorStop(0, "#f5e6c8");
      gradient.addColorStop(0.5, "#daa520");
      gradient.addColorStop(1, "#8b7355");

      context.beginPath();
      context.fillStyle = gradient;
      context.arc(0, corkRadius * 0.5, corkRadius, 0, Math.PI * 2);
      context.fill();

      context.restore();
    }

    // Draw net
    function drawNet() {
      context.save();
      context.strokeStyle = "rgba(255, 255, 255, 0.4)";
      context.lineWidth = 1;

      // Net posts
      const leftPost = project(0, 0, -150);
      const leftPostTop = project(0, 80, -150);
      const rightPost = project(0, 0, 150);
      const rightPostTop = project(0, 80, 150);

      context.strokeStyle = "#333";
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(leftPost.x, leftPost.y);
      context.lineTo(leftPostTop.x, leftPostTop.y);
      context.stroke();

      context.beginPath();
      context.moveTo(rightPost.x, rightPost.y);
      context.lineTo(rightPostTop.x, rightPostTop.y);
      context.stroke();

      // Net mesh
      context.strokeStyle = "rgba(255, 255, 255, 0.3)";
      context.lineWidth = 1;

      // Horizontal lines
      for (let h = 10; h <= 70; h += 10) {
        const left = project(0, h, -150);
        const right = project(0, h, 150);
        context.beginPath();
        context.moveTo(left.x, left.y);
        context.lineTo(right.x, right.y);
        context.stroke();
      }

      // Vertical lines
      for (let d = -150; d <= 150; d += 20) {
        const bottom = project(0, 10, d);
        const top = project(0, 70, d);
        context.beginPath();
        context.moveTo(bottom.x, bottom.y);
        context.lineTo(top.x, top.y);
        context.stroke();
      }

      context.restore();
    }

    // Draw court/ground
    function drawCourt() {
      context.save();

      // Draw perspective floor
      const corners = [
        project(-200, -50, -200),
        project(200, -50, -200),
        project(200, -50, 200),
        project(-200, -50, 200),
      ];

      const gradient = context.createLinearGradient(0, height * 0.6, 0, height);
      gradient.addColorStop(0, "#228b22");
      gradient.addColorStop(1, "#1a6b1a");

      context.beginPath();
      context.fillStyle = gradient;
      context.moveTo(corners[0].x, corners[0].y);
      corners.forEach((c) => context.lineTo(c.x, c.y));
      context.closePath();
      context.fill();

      // Court lines
      context.strokeStyle = "rgba(255, 255, 255, 0.5)";
      context.lineWidth = 2;

      // Center line
      const centerNear = project(0, -50, -150);
      const centerFar = project(0, -50, 150);
      context.beginPath();
      context.moveTo(centerNear.x, centerNear.y);
      context.lineTo(centerFar.x, centerFar.y);
      context.stroke();

      context.restore();
    }

    // Animation loop
    let time = 0;

    function animate() {
      animationRef.current = requestAnimationFrame(animate);

      // Clear and draw sky
      const skyGradient = context.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, "#87ceeb");
      skyGradient.addColorStop(1, "#b0e0e6");
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, width, height);

      if (isPlayingRef.current) {
        time += 0.03;
      }

      // Draw scene (back to front)
      drawCourt();
      drawNet();

      // Shuttlecock position (parabolic arc)
      const t = (Math.sin(time * 2) + 1) / 2;
      const shuttleX = -150 + t * 300;
      const shuttleY = 60 + Math.sin(t * Math.PI) * 80;
      const shuttleZ = Math.sin(t * Math.PI * 2) * 30;
      const shuttleRotation = t < 0.5 ? -0.5 : 0.5;

      // Left racket
      const leftSwing = Math.sin(time * 2);
      const leftRotY = 0.3 - leftSwing * 0.4;
      const leftRotZ = leftSwing * 0.5;
      const leftX = -130 + (leftSwing > 0 ? leftSwing * 40 : 0);
      drawRacket(leftX, 50, 0, leftRotY, leftRotZ, "#1a1a1a");

      // Shuttlecock
      drawShuttlecock(shuttleX, shuttleY, shuttleZ, shuttleRotation);

      // Right racket
      const rightSwing = Math.sin(time * 2 + Math.PI);
      const rightRotY = -0.3 + rightSwing * 0.4;
      const rightRotZ = -rightSwing * 0.5;
      const rightX = 130 - (rightSwing > 0 ? rightSwing * 40 : 0);
      drawRacket(rightX, 50, 0, rightRotY, rightRotZ, "#1a1a1a");
    }

    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 rounded-lg shadow-lg text-sm font-medium hover:bg-white transition-colors"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}

export default BadmintonCanvas;
