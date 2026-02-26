"use client";

import { useEffect, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function MouseGradient() {
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY, opacity: 1 });
    const leave = () => setPos((p) => ({ ...p, opacity: 0 }));
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none rounded-full w-80 h-80 md:w-96 md:h-96 blur-3xl z-0"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: pos.opacity,
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle, rgba(139,92,246,0.08), rgba(99,102,241,0.05), transparent 70%)",
        transition: "left 80ms linear, top 80ms linear, opacity 300ms ease-out",
      }}
    />
  );
}

export function ClickRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const r = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((p) => [...p, r]);
      setTimeout(() => setRipples((p) => p.filter((x) => x.id !== r.id)), 800);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {ripples.map((r) => (
        <div
          key={r.id}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999]"
          style={{
            left: r.x,
            top: r.y,
            transform: "translate(-50%, -50%)",
            background: "rgba(168, 85, 247, 0.6)",
            animation: "ripple-out 0.8s ease-out forwards",
          }}
        />
      ))}
    </>
  );
}

export function GridOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="neo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(139,92,246,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#neo-grid)" />
    </svg>
  );
}

export function FloatingDots() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[
        { top: "15%", left: "10%", delay: "0s", size: 3 },
        { top: "25%", left: "85%", delay: "1s", size: 2 },
        { top: "45%", left: "5%", delay: "2s", size: 2 },
        { top: "65%", left: "90%", delay: "0.5s", size: 3 },
        { top: "80%", left: "15%", delay: "1.5s", size: 2 },
        { top: "35%", left: "95%", delay: "2.5s", size: 2 },
        { top: "55%", left: "3%", delay: "3s", size: 3 },
        { top: "90%", left: "80%", delay: "1.8s", size: 2 },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-purple-400"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            animation: `float-dot 6s ease-in-out infinite`,
            animationDelay: dot.delay,
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  );
}
