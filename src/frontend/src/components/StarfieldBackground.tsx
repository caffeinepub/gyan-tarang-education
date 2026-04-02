import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  opacityDelta: number;
  color: string;
}

const COLORS = [
  "255,255,255", // white
  "255,255,255", // white (more common)
  "255,255,255",
  "0,230,255", // neon cyan
  "0,230,255",
  "100,255,120", // neon green
];

function createStar(width: number, height: number): Star {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: 0.5 + Math.random() * 2,
    speed: 0.05 + Math.random() * 0.3,
    opacity: Math.random(),
    opacityDelta:
      (Math.random() > 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.008),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Re-init stars on resize
      starsRef.current = Array.from({ length: 150 }, () =>
        createStar(canvas.width, canvas.height),
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        // Update twinkle
        star.opacity += star.opacityDelta;
        if (star.opacity >= 1) {
          star.opacity = 1;
          star.opacityDelta = -Math.abs(star.opacityDelta);
        } else if (star.opacity <= 0.1) {
          star.opacity = 0.1;
          star.opacityDelta = Math.abs(star.opacityDelta);
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`;
        ctx.fill();

        // Subtle glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${star.opacity * 0.15})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 0 }}
    />
  );
}
