"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type TestimonialItem = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  href?: string;
};

export type CircularTestimonialsProps = {
  testimonials: TestimonialItem[];
  autoplay?: boolean;
  intervalMs?: number;
  colors?: {
    name?: string;
    designation?: string;
    testimony?: string;
    arrowBackground?: string;
    arrowForeground?: string;
    arrowHoverBackground?: string;
  };
  fontSizes?: {
    name?: string;
    designation?: string;
    quote?: string;
  };
};

export function CircularTestimonials({
  testimonials,
  autoplay = false,
  intervalMs = 4000,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) {
  const [active, setActive] = React.useState(0);
  const len = testimonials.length;

  const next = React.useCallback(() => {
    setActive((a) => (a + 1) % len);
  }, [len]);

  const prev = React.useCallback(() => {
    setActive((a) => (a - 1 + len) % len);
  }, [len]);

  React.useEffect(() => {
    if (!autoplay || len <= 1) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [autoplay, intervalMs, next, len]);

  const item = testimonials[active]!;

  const nameColor = colors.name || "#0F172A";
  const designationColor = colors.designation || "#0284C8";
  const testimonyColor = colors.testimony || "#475569";
  const arrowBg = colors.arrowBackground || "#F8FAFC";
  const arrowFg = colors.arrowForeground || "#0284C8";
  const arrowHoverBg = colors.arrowHoverBackground || "#1E40AF";

  const nameSize = fontSizes.name || "28px";
  const designationSize = fontSizes.designation || "20px";
  const quoteSize = fontSizes.quote || "20px";

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-5xl w-full">
      {/* Image Stack */}
      <div className="relative flex-shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]">
        {/* Next image (peeking behind right) */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-white/10 shadow-lg bg-black/80"
          style={{ transform: "rotate(8deg) scale(0.97) translate(28px, -10px)", opacity: 0.7 }}
        >
          <img
            src={testimonials[(active + 1) % len]?.src}
            alt=""
            className="w-full h-full object-contain p-6"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Previous image (peeking behind left) */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-white/10 shadow-lg bg-black/80"
          style={{ transform: "rotate(-6deg) scale(0.97) translate(-24px, -6px)", opacity: 0.55 }}
        >
          <img
            src={testimonials[(active - 1 + len) % len]?.src}
            alt=""
            className="w-full h-full object-contain p-6"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Active image */}
        {item.href ? (
          <a href={item.href} target="_blank" rel="noreferrer" className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl z-10 bg-black block hover:border-white/30 transition-colors">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={item.src}
                alt={item.designation}
                className="w-full h-full object-contain p-6"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                draggable={false}
              />
            </AnimatePresence>
          </a>
        ) : (
          <div className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl z-10 bg-black">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={item.src}
                alt={item.designation}
                className="w-full h-full object-contain p-6"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                draggable={false}
              />
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 text-center md:text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <p
              className="leading-relaxed mb-8 font-light"
              style={{ color: testimonyColor, fontSize: quoteSize }}
            >
              &ldquo;{item.quote}&rdquo;
            </p>
            <h3
              className="font-bold tracking-tight"
              style={{ color: nameColor, fontSize: nameSize }}
            >
              {item.designation}
            </h3>
            <p
              className="font-medium mt-1"
              style={{ color: designationColor, fontSize: designationSize }}
            >
              {item.name}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <div className="flex gap-3 mt-8 justify-center md:justify-start">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group"
            style={{ backgroundColor: arrowBg, border: `2px solid ${arrowFg}` }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = arrowHoverBg;
              const svg = e.currentTarget.querySelector("svg");
              if (svg) svg.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = arrowBg;
              const svg = e.currentTarget.querySelector("svg");
              if (svg) svg.style.color = arrowFg;
            }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: arrowFg }} />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group"
            style={{ backgroundColor: arrowBg, border: `2px solid ${arrowFg}` }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = arrowHoverBg;
              const svg = e.currentTarget.querySelector("svg");
              if (svg) svg.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = arrowBg;
              const svg = e.currentTarget.querySelector("svg");
              if (svg) svg.style.color = arrowFg;
            }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: arrowFg }} />
          </button>
        </div>
      </div>
    </div>
  );
}
