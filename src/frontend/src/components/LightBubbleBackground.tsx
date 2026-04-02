import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  color: string;
  drift: number;
  phase: number;
}

// Pastel multicolor palette — soft on white background
const BUBBLE_COLORS = [
  "220, 160, 240", // soft lavender
  "180, 210, 255", // sky blue
  "160, 240, 200", // mint green
  "255, 200, 180", // peach pink
  "255, 220, 150", // warm yellow
  "200, 230, 255", // light cyan
  "255, 180, 220", // rose pink
  "180, 255, 210", // pastel green
];

function createBubble(width: number, height: number): Bubble {
  return {
    x: Math.random() * width,
    y: height + Math.random() * height,
    radius: 20 + Math.random() * 80,
    speed: 0.2 + Math.random() * 0.5,
    opacity: 0.15 + Math.random() * 0.25,
    color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
    drift: (Math.random() - 0.5) * 0.4,
    phase: Math.random() * Math.PI * 2,
  };
}

export default function LightBubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      bubblesRef.current = Array.from({ length: 18 }, () =>
        createBubble(canvas.width, canvas.height),
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.005;

      for (const bubble of bubblesRef.current) {
        // Float upward
        bubble.y -= bubble.speed;
        // Gentle horizontal drift (sinusoidal)
        bubble.x += Math.sin(timeRef.current + bubble.phase) * bubble.drift;

        // Reset when off top
        if (bubble.y + bubble.radius < -50) {
          bubble.y = canvas.height + bubble.radius + Math.random() * 200;
          bubble.x = Math.random() * canvas.width;
        }

        // Keep within horizontal bounds
        if (bubble.x < -bubble.radius) bubble.x = canvas.width + bubble.radius;
        if (bubble.x > canvas.width + bubble.radius) bubble.x = -bubble.radius;

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${bubble.color}, ${bubble.opacity})`;
        ctx.fill();

        // Subtle inner highlight
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.radius * 0.25,
          bubble.y - bubble.radius * 0.25,
          bubble.radius * 0.35,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.5})`;
        ctx.fill();
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
