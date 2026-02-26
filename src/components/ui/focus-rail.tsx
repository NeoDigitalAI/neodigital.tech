"use client";

import * as React from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  videoSrc: string;
  posterSrc?: string;
  duration?: number;
  href?: string;
  meta?: string;
};

/* ─── helpers ─── */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* ─── card variants ─── */
/* eslint-disable @typescript-eslint/no-explicit-any */
const cardVariants: any = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    scale: 0.85,
    opacity: 0,
    rotateY: dir > 0 ? 25 : -25,
    z: -200,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    rotateY: 0,
    z: 0,
    transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 300 : -300,
    scale: 0.85,
    opacity: 0,
    rotateY: dir < 0 ? 25 : -25,
    z: -200,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  }),
};

/* ─── side card positions ─── */
function getSideStyle(offset: number, total: number) {
  if (offset === 0) return null;
  const absOff = Math.abs(offset);
  const sign = offset > 0 ? 1 : -1;
  return {
    x: sign * (260 + (absOff - 1) * 100),
    scale: Math.max(0.55, 0.78 - (absOff - 1) * 0.1),
    opacity: Math.max(0, 0.5 - (absOff - 1) * 0.2),
    rotateY: sign * -12,
    z: -100 * absOff,
  };
}

/* ─── main component ─── */
export function FocusRail({
  items,
  autoPlayInterval = 5000,
  className,
}: {
  items: FocusRailItem[];
  autoPlayInterval?: number;
  className?: string;
}) {
  const [[page, direction], setPage] = React.useState([0, 0]);
  const [isPaused, setIsPaused] = React.useState(false);
  const index = wrap(0, items.length, page);

  const paginate = React.useCallback(
    (dir: number) => setPage(([p]) => [p + dir, dir]),
    []
  );

  // Auto-advance — always runs, only paused on active mouse hover (desktop)
  React.useEffect(() => {
    if (isPaused) return;
    const currentItem = items[index];
    const delay = currentItem.duration || autoPlayInterval;
    const id = setTimeout(() => paginate(1), delay);
    return () => clearTimeout(id);
  }, [isPaused, autoPlayInterval, paginate, page, index, items]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) paginate(1);
    else if (info.offset.x > threshold) paginate(-1);
  };

  const current = items[index];

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Blurred background video */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${current.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={current.posterSrc}
              className="h-full w-full object-cover scale-110 blur-3xl opacity-30"
              src={current.videoSrc}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center py-12 md:py-20 px-4">
        {/* 3D Card Rail */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ perspective: "1200px", height: "clamp(280px, 45vw, 420px)" }}
        >
          {/* Side cards */}
          {items.map((item, i) => {
            const offset = i - index;
            const wrapped =
              offset > items.length / 2
                ? offset - items.length
                : offset < -items.length / 2
                ? offset + items.length
                : offset;
            if (wrapped === 0 || Math.abs(wrapped) > 2) return null;
            const style = getSideStyle(wrapped, items.length);
            if (!style) return null;
            return (
              <motion.div
                key={`side-${item.id}`}
                className="absolute rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                style={{
                  width: "clamp(200px, 32vw, 320px)",
                  height: "clamp(260px, 42vw, 400px)",
                  transformStyle: "preserve-3d",
                }}
                animate={style}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => paginate(wrapped)}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={item.posterSrc}
                  className="h-full w-full object-cover"
                  src={item.videoSrc}
                />
                <div className="absolute inset-0 bg-black/50" />
              </motion.div>
            );
          })}

          {/* Center card */}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={`center-${page}`}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              className="absolute rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(168,85,247,0.35)] cursor-grab active:cursor-grabbing ring-1 ring-white/10"
              style={{
                width: "clamp(240px, 38vw, 360px)",
                height: "clamp(300px, 48vw, 440px)",
                transformStyle: "preserve-3d",
                zIndex: 10,
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={current.posterSrc}
                className="h-full w-full object-cover"
                src={current.videoSrc}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                  {current.title}
                </h3>
                {current.meta && (
                  <p className="text-xs text-purple-300/80 font-mono mb-2">
                    {current.meta}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${current.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-6 md:mt-8 max-w-lg text-center text-sm md:text-base text-purple-100/60 leading-relaxed px-4"
          >
            {current.description}
          </motion.p>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => paginate(-1)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/30 transition-all duration-300"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-white/70" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i - index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "bg-purple-400 w-6"
                    : "bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/30 transition-all duration-300"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </div>
    </div>
  );
}
