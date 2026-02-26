"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import ShaderBackground from "@/components/ui/shader-background";
import { Tabs } from "@/components/ui/vercel-tabs";
import { FlowButton } from "@/components/ui/flow-button";
import { Footerdemo } from "@/components/ui/footer-section";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import {
  ArrowRight, Zap, Globe, Smartphone, Brain, Code, BarChart3, Rocket,
  Mail, MapPin, Phone, ChevronRight, Star, Shield, Clock, Users,
  Sparkles, ExternalLink, Menu, X, CheckCircle2, BookOpen, Calendar,
} from "lucide-react";
import { LangProvider, useLang } from "@/lib/lang-context";
import { ChatWidget } from "@/components/ui/chat-widget";
import { TextScramble } from "@/components/ui/text-scramble";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { FocusRail } from "@/components/ui/focus-rail";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { FeatureCarousel, type ImageSet } from "@/components/ui/animated-feature-carousel";
import { LangCode } from "@/lib/translations";

/* ═══════════════════════════════════════════════════
   DIGITAL SERENITY EFFECTS — integrated from component
   ═══════════════════════════════════════════════════ */

function WordReveal({ children, delay = 0, className = "" }: { children: string; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => {
      el.style.animation = "word-appear 0.8s ease-out forwards";
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span
      ref={ref}
      className={`inline-block opacity-0 mx-[0.12em] transition-all duration-300 hover:text-purple-300 hover:-translate-y-0.5 cursor-default ${className}`}
      onMouseEnter={(e) => { (e.target as HTMLElement).style.textShadow = "0 0 25px rgba(168,85,247,0.5)"; }}
      onMouseLeave={(e) => { (e.target as HTMLElement).style.textShadow = "none"; }}
    >
      {children}
    </span>
  );
}

function MouseGradient() {
  const [pos, setPos] = useState({ x: 0, y: 0, o: 0 });
  useEffect(() => {
    const m = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY, o: 1 });
    const l = () => setPos((p) => ({ ...p, o: 0 }));
    document.addEventListener("mousemove", m);
    document.addEventListener("mouseleave", l);
    return () => { document.removeEventListener("mousemove", m); document.removeEventListener("mouseleave", l); };
  }, []);
  return (
    <div className="fixed pointer-events-none rounded-full w-72 h-72 md:w-[500px] md:h-[500px] blur-3xl z-[1]"
      style={{ left: pos.x, top: pos.y, opacity: pos.o * 0.7, transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(139,92,246,0.1), rgba(99,102,241,0.06), transparent 70%)",
        transition: "left 70ms linear, top 70ms linear, opacity 300ms ease-out" }} />
  );
}

function ClickRipples() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const r = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((p) => [...p, r]);
      setTimeout(() => setRipples((p) => p.filter((x) => x.id !== r.id)), 900);
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);
  return <>{ripples.map((r) => (
    <div key={r.id} className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999]"
      style={{ left: r.x, top: r.y, transform: "translate(-50%,-50%)",
        background: "rgba(168,85,247,0.6)", animation: "ripple-out 0.9s ease-out forwards" }} />
  ))}</>;
}

function SVGGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="neo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(139,92,246,0.04)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#neo-grid)" />
      {/* Serenity grid lines */}
      <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: "0.5s" }} />
      <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: "1s" }} />
      <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: "1.5s" }} />
      <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: "2s" }} />
      {/* Intersection dots */}
      <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3s" }} />
      <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "2.7s" }} />
      <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.4s" }} />
      <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.6s" }} />
      <circle cx="50%" cy="50%" r="1.5" className="detail-dot" style={{ animationDelay: "4s" }} />
    </svg>
  );
}

function FloatingDots() {
  const dots = [
    { top: "12%", left: "8%", d: "0s" }, { top: "28%", left: "88%", d: "1.2s" },
    { top: "45%", left: "4%", d: "2.1s" }, { top: "68%", left: "92%", d: "0.7s" },
    { top: "82%", left: "12%", d: "1.8s" }, { top: "38%", left: "96%", d: "2.8s" },
    { top: "55%", left: "2%", d: "3.2s" }, { top: "92%", left: "82%", d: "1.5s" },
    { top: "18%", left: "50%", d: "0.3s" }, { top: "72%", left: "45%", d: "2.5s" },
  ];
  return <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
    {dots.map((d, i) => (
      <div key={i} className="absolute w-[2px] h-[2px] rounded-full bg-purple-400/40"
        style={{ top: d.top, left: d.left, animation: `float-dot 5s ease-in-out infinite`, animationDelay: d.d }} />
    ))}
  </div>;
}

function CornerElements() {
  return <>
    {[
      "top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8",
      "top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8",
      "bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8",
      "bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8",
    ].map((pos, i) => (
      <div key={i} className={`absolute w-10 h-10 border border-white/[0.1] opacity-0 z-[2] ${pos}`}
        style={{ animation: "word-appear 0.6s ease-out forwards", animationDelay: `${4 + i * 0.2}s` }}>
        <div className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
          style={{ [i < 2 ? "top" : "bottom"]: 0, [i % 2 === 0 ? "left" : "right"]: 0 }} />
      </div>
    ))}
  </>;
}

/* ═══════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════ */

function ScrollReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`transition-all duration-700 ease-out ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>{children}</div>;
}

function AnimatedCounter({ end, suffix = "", label, duration = 2200 }: { end: number; suffix?: string; label: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const s = Date.now();
        const tick = () => { const p = Math.min((Date.now() - s) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end)); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <div ref={ref} className="text-center">
    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">{count}{suffix}</div>
    <div className="text-sm text-white/55 mt-2 font-medium">{label}</div>
  </div>;
}

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════
   AI LANGUAGE SWITCHER
   ═══════════════════════════════════════════════════ */

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [translating, setTranslating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { lang, setLang } = useLang();
  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLang = (l: typeof LANGUAGES[0]) => {
    setOpen(false);
    setTranslating(true);
    setLang(l.code as LangCode);
    setTimeout(() => setTranslating(false), 400);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-purple-500/30 transition-all group"
        title="AI Translate"
      >
        {translating ? (
          <div className="w-5 h-5 relative">
            <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 border-t-purple-400 animate-spin" />
          </div>
        ) : (
          <span className="text-base leading-none">{current.flag}</span>
        )}
        <Globe className="w-3.5 h-3.5 text-white/60 group-hover:text-purple-400 transition-colors" />
        <svg className={`w-3 h-3 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#0c0a1a]/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-purple-900/20 overflow-hidden z-[200] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-white/[0.1] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider">AI Translate</span>
          </div>
          <div className="py-1.5">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLang(lang)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all hover:bg-white/[0.05] ${
                  current.code === lang.code ? "text-purple-300 bg-purple-500/[0.08]" : "text-white/60 hover:text-white"
                }`}
              >
                <span className="text-lg leading-none">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {current.code === lang.code && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 ml-auto" />
                )}
              </button>
            ))}
          </div>
          <div className="px-4 py-2.5 border-t border-white/[0.1] flex items-center gap-1.5">
            <Brain className="w-3 h-3 text-purple-400/50" />
            <span className="text-[10px] text-white/45 font-medium">Powered by NeoDigital AI</span>
          </div>
        </div>
      )}
    </div>
  );
}

function useTranslatedData() {
  const { t } = useLang();
  const navTabs = [
    { id: "home", label: t("navHome") }, { id: "services", label: t("navServices") },
    { id: "work", label: t("navPortfolio") }, { id: "process", label: t("navProcess") },
    { id: "about", label: t("navAbout") }, { id: "contact", label: t("navContact") },
  ];
  const services: CardStackItem[] = [
    { id: 1, title: "Custom AI Agent Systems", description: "Autonomous AI agents that work 24/7 handling customer support, sales, HR and operations.", href: "/services/custom-ai-agent-systems", imageSrc: "/images/custom-ai-agents.jpg" },
    { id: 2, title: "Mobile Apps", description: "High-performance custom iOS and Android apps built for real business growth.", href: "/services/mobile-apps", imageSrc: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80" },
    { id: 3, title: "AI Avatars", description: "Hyper-realistic avatars and voice agents that look and sound completely human.", href: "/services/ai-avatars", imageSrc: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&q=80" },
    { id: 4, title: "AI UGC Content Studio", description: "Authentic UGC-style photos, videos and testimonials that build real trust.", href: "/services/ai-ugc-content-studio", imageSrc: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80" },
    { id: 5, title: "Intelligent Marketing", description: "AI-powered strategies, content creation and automation that actually convert.", href: "/services/intelligent-marketing", imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
    { id: 6, title: "Business AI Tools", description: "Smart automation tools and analytics that save time and drive better decisions.", href: "/services/business-ai-tools", imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
    { id: 7, title: "AI Crypto Automation", description: "Intelligent trading bots and portfolio management that work 24/7.", href: "/services/ai-crypto-automation", imageSrc: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80" },
  ];
  const projects = [
    { title: "SmartScan AI", tag: "Mobile App", desc: t("smartscanDesc"), gradient: "from-purple-600/40 to-indigo-700/40", icon: "/icons/smartscan.png?v=2" },
    { title: "BetAI Pro", tag: "AI Analytics", desc: t("betaiDesc"), gradient: "from-fuchsia-600/40 to-pink-600/40", icon: "/icons/betai.png?v=2" },
    { title: "QR Pro", tag: "Utility App", desc: t("qrDesc"), gradient: "from-violet-600/40 to-purple-700/40", icon: "/icons/qrpro.png?v=2" },
  ];
  const processSteps = [
    { num: "01", title: t("proc1"), desc: t("proc1Desc"), icon: Users },
    { num: "02", title: t("proc2"), desc: t("proc2Desc"), icon: Sparkles },
    { num: "03", title: t("proc3"), desc: t("proc3Desc"), icon: Code },
    { num: "04", title: t("proc4"), desc: t("proc4Desc"), icon: Rocket },
  ];
  const testimonials = [
    { text: t("test1"), author: "Alexandru M.", role: "CEO, TechStart SRL" },
    { text: t("test2"), author: "Maria C.", role: "Marketing Director, InnovateCo" },
    { text: t("test3"), author: "Dan P.", role: "Fondator, InnovateTech" },
  ];
  return { navTabs, services, projects, processSteps, testimonials, t };
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */

export default function Home() {
  return <LangProvider><HomeInner /></LangProvider>;
}

function HomeInner() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const scrollTo = (id: string) => { setMobileMenu(false); if (id === "about") { window.location.href = "/about"; return; } document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const { navTabs, services, projects, processSteps, testimonials, t } = useTranslatedData();

  return (
    <div className="relative min-h-screen text-white font-[family-name:var(--font-geist-sans)] overflow-x-hidden">
      {/* Layers: Shader → SVG Grid → Floating → Corner → Content */}
      <ShaderBackground />
      <MouseGradient />
      <ClickRipples />

      {/* ═══ NAVIGATION ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
            <svg className="w-8 h-8 drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]" viewBox="0 0 220 240" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" /><stop offset="60%" stopColor="#7b2ff7" /><stop offset="100%" stopColor="#5a1fd6" />
                </linearGradient>
              </defs>
              <path d="M30 220V30c0-8 6-14 14-14h12c6 0 11 3 14 8l80 146V30c0-8 6-14 14-14h16c8 0 14 6 14 14v190c0 8-6 14-14 14h-12c-6 0-11-3-14-8L74 80v140c0 8-6 14-14 14H44c-8 0-14-6-14-14z" fill="url(#logoGrad)"/>
            </svg>
            <span className="font-bold tracking-tight text-xl">NeoDigital<span className="text-purple-400">.tech</span></span>
          </div>
          <Tabs tabs={navTabs} onTabChange={(id) => scrollTo(id)} className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button onClick={() => scrollTo("contact")}
              className="hidden sm:flex px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/25 items-center gap-2 hover:-translate-y-0.5">
              {t("contactBtn")} <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="lg:hidden border-t border-white/[0.08] bg-black/90 backdrop-blur-xl">
            <div className="px-6 py-4 space-y-1">
              {navTabs.map((tab) => (
                <button key={tab.id} onClick={() => scrollTo(tab.id)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">{tab.label}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ═══ HERO — with ALL Digital Serenity effects ═══ */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 md:pt-20 text-center overflow-hidden">
        <SVGGrid />
        <FloatingDots />
        {/* CornerElements removed — Marius found them distracting */}

        {/* Top subtitle badge */}
        <div className="relative z-10 mb-8">
          <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm opacity-0"
            style={{ animation: "word-appear 0.5s ease-out forwards", animationDelay: "0.2s" }}>
            <span className="text-xs sm:text-sm font-mono text-white/60 uppercase tracking-[0.15em]">{t("badge")}</span>
          </div>
        </div>

        {/* Main heading */}
        <div className="relative z-10 max-w-5xl space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-center px-2">
            <div className="mb-1 md:mb-2">
              {t("heroLine1").split(" ").map((word, i) => (
                <WordReveal key={`h1-${i}`} delay={400 + i * 100}
                  className={word === "AI" || word === t("heroHighlight1") ? "!mx-[0.08em] bg-gradient-to-r from-purple-400 via-pink-300 to-slate-300 bg-clip-text text-transparent" : ""}
                >{word}</WordReveal>
              ))}
            </div>
            <div className="mb-1 md:mb-2">
              {t("heroLine2").split(" ").map((word, i) => (
                <WordReveal key={`h2-${i}`} delay={1000 + i * 100}
                  className={word === t("heroHighlight2") || word === t("heroHighlight3") ? "!mx-[0.08em] bg-gradient-to-r from-slate-300 via-pink-300 to-purple-400 bg-clip-text text-transparent" : ""}
                >{word}</WordReveal>
              ))}
            </div>
          </h1>

          {/* Subtitle */}
          <div className="text-base sm:text-lg md:text-xl text-purple-100/80 max-w-2xl mx-auto leading-relaxed pt-2 opacity-0 text-center px-4 font-bold"
            style={{ animation: "word-appear 0.6s ease-out forwards", animationDelay: "1.6s" }}>
            {t("subtitle")}
          </div>

          {/* CTA — fade in */}
          <div className="flex justify-center pt-8 opacity-0"
            style={{ animation: "word-appear 0.6s ease-out forwards", animationDelay: "2.1s" }}>
            <ShinyButton onClick={() => scrollTo("contact")}>
              Schedule a Consultation
            </ShinyButton>
          </div>

          {/* Built by Humans • Powered by AI — Text Scramble */}
          <div className="flex justify-center pt-10 opacity-0 text-center px-4"
            style={{ animation: "word-appear 0.6s ease-out forwards", animationDelay: "2.3s" }}>
            <TextScramble
              className="font-mono text-[10px] sm:text-[11px] uppercase text-white/55 tracking-[0.1em] sm:tracking-[0.15em] text-center"
              duration={2}
              speed={0.03}
              delay={2500}
            >
              Built by Human Experts • Powered by Intelligent AI
            </TextScramble>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="absolute bottom-16 z-10 text-center">
          <div className="mb-3 w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
          <div className="mt-4 flex justify-center space-x-3 opacity-0" style={{ animation: "word-appear 0.6s ease-out forwards", animationDelay: "2.7s" }}>
            <div className="w-1 h-1 bg-purple-400 rounded-full opacity-30" />
            <div className="w-1 h-1 bg-purple-400 rounded-full opacity-50" />
            <div className="w-1 h-1 bg-purple-400 rounded-full opacity-30" />
          </div>
        </div>

        {/* Side detail lines — Serenity style */}
        <div className="absolute -left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-r from-purple-400/30 to-transparent opacity-0 z-10"
          style={{ animation: "word-appear 0.6s ease-out forwards", animationDelay: "2.5s" }} />
        <div className="absolute -right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-l from-purple-400/30 to-transparent opacity-0 z-10"
          style={{ animation: "word-appear 0.6s ease-out forwards", animationDelay: "2.6s" }} />
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">Our AI Solutions</h2>
              <p className="mt-4 max-w-4xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-purple-100/70 px-4">AI solutions built to make your work easier and your business better. We create custom tools that automate the repetitive stuff, turn your data into clear insights, and help you make smarter decisions every day.</p>
            </div>
          </ScrollReveal>
          <CardStack
            items={services}
            initialIndex={0}
            autoAdvance
            intervalMs={3000}
            pauseOnHover
            showDots
            cardWidth={520}
            cardHeight={320}
          />
        </div>
      </section>

      {/* ═══ WHY NEODIGITAL — FOCUS RAIL ═══ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-mono">{t("whyUsLabel")}</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">{t("bentoTitle")}</h2>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-bold leading-relaxed italic">
                {t("bentoSubtitle")}
              </p>
              <p className="text-base text-purple-100/60 max-w-3xl mx-auto leading-relaxed mt-4">
                At NeoDigital, we build AI-powered digital solutions that help your business grow efficiently. We integrate AI into custom apps, web platforms, and transformations, providing practical tools that work better than standard options from other agencies.
              </p>
              <p className="text-xl font-bold mt-10 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">What Sets Us Apart:</p>
            </div>
          </ScrollReveal>
          <FocusRail
            items={[
              { id: 1, title: "AI Integration", description: "We use machine learning to make solutions smarter and more adaptive – giving you better efficiency without the complexity.", videoSrc: "/videos/ai-integration.mp4", posterSrc: "/videos/ai-integration-poster.jpg", duration: 7000 },
              { id: 2, title: "Client Focus", description: "We create tailored plans with regular input from you – building true partnerships, not just one-off projects.", videoSrc: "/videos/client-focus.mp4", posterSrc: "/videos/client-focus-poster.jpg", duration: 6000 },
              { id: 3, title: "Fast Delivery", description: "Our agile process delivers quality results quickly with modern tools – saving you time and money compared to slower methods.", videoSrc: "/videos/fast-delivery.mp4", posterSrc: "/videos/fast-delivery-poster.jpg", duration: 7000 },
              { id: 4, title: "Real Results", description: "We prioritize measurable improvements in revenue and user engagement, with designs that scale as you need.", videoSrc: "/videos/real-results.mp4", posterSrc: "/videos/real-results-poster.jpg", duration: 7000 },
              { id: 5, title: "Expert Support", description: "We offer reliable, cost-effective services based on years of experience across industries.", videoSrc: "/videos/expert-support.mp4", posterSrc: "/videos/expert-support-poster.jpg", duration: 7000 },
            ]}
            autoPlayInterval={5000}
          />
        </div>
      </section>

      {/* ═══ PORTFOLIO ═══ */}
      <section id="work" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20 space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-mono">{t("portfolioLabel")}</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">{t("portfolioTitle")}</h2>
              <p className="text-white/50 max-w-xl mx-auto text-lg">{t("portfolioSubtitle")}</p>
            </div>
          </ScrollReveal>
          <div className="flex justify-center">
            <CircularTestimonials
              testimonials={[
                {
                  quote: "Intelligent document scanner with AI text recognition and smart organization.",
                  name: "Mobile App",
                  designation: "SmartScan AI",
                  src: "/icons/smartscan.png",
                },
                {
                  quote: "Sports analytics platform and predictions powered by artificial intelligence.",
                  name: "AI Analytics",
                  designation: "BetAI Pro",
                  src: "/icons/betai-logo.jpg",
                  href: "https://apps.apple.com/ie/app/betai-pro/id6745175027",
                },
                {
                  quote: "Professional QR code scanner and generator with batch processing.",
                  name: "Utility App",
                  designation: "QR Pro",
                  src: "/icons/qrpro.png",
                },
              ]}
              autoplay
              colors={{
                name: "#FFFFFF",
                designation: "#A78BFA",
                testimony: "#94A3B8",
                arrowBackground: "transparent",
                arrowForeground: "#A78BFA",
                arrowHoverBackground: "#7C3AED",
              }}
              fontSizes={{
                name: "28px",
                designation: "20px",
                quote: "20px",
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section id="process" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-mono">{t("processLabel")}</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{t("processTitle")}</h2>
              <p className="text-white/50 max-w-xl mx-auto text-lg">{t("processSubtitle")}</p>
            </div>
          </ScrollReveal>
          <FeatureCarousel
            singleImage
            image={{
              alt: "NeoDigital process",
              step1: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
              step2: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1200&auto=format&fit=crop",
              step3: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop",
              step4: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
              step1img1: "", step1img2: "", step2img1: "", step2img2: "", step3img: "", step4img: "",
            }}
          />
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative z-10 py-20 px-6">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto rounded-3xl bg-white/[0.04] border border-white/[0.08] p-12 md:p-16 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <AnimatedCounter end={50} suffix="+" label={t("statProjects")} />
              <AnimatedCounter end={10} suffix="+" label={t("statClients")} />
              <AnimatedCounter end={99} suffix="%" label={t("statRating")} />
              <AnimatedCounter end={24} suffix="/7" label={t("bentoSupport")} />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20 space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-mono">{t("testimonialsLabel")}</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight lowercase">{t("testimonialsTitle")}</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((tm, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="h-full p-7 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/20 transition-all duration-500 flex flex-col group">
                  <div className="flex gap-1 mb-5">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-purple-400/60 text-purple-400/60" />)}</div>
                  <p className="text-white/55 leading-relaxed italic flex-1 text-[14px] font-light">&ldquo;{tm.text}&rdquo;</p>
                  <div className="mt-6 pt-5 border-t border-white/[0.08]">
                    <div className="font-medium text-sm text-white/60">{tm.author}</div>
                    <div className="text-xs text-white/60 mt-0.5">{tm.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative z-10 py-32 px-6">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center rounded-3xl bg-gradient-to-br from-purple-600/15 to-indigo-600/15 border border-purple-500/15 p-12 md:p-20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("ctaTitle")}</h2>
              <p className="text-lg text-white/55 mb-8 max-w-xl mx-auto">{t("ctaSubtitle")}</p>
              <button onClick={() => scrollTo("contact")}
                className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-2xl font-semibold transition-all inline-flex items-center gap-2 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/40 hover:-translate-y-0.5">
                {t("ctaButton")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20 space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-mono">{t("contactLabel")}</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{t("contactWorkTitle")}</h2>
              <p className="text-white/50 max-w-xl mx-auto text-lg">{t("contactWorkSubtitle")}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="space-y-4">
                {[
                  { icon: Mail, value: "office@neodigital.tech", href: "mailto:office@neodigital.tech", sub: t("emailSub") },
                  { icon: Phone, value: "+40 799 977 755", href: "tel:+40799977755", sub: t("phoneSub") },
                  { icon: MapPin, value: t("locationValue"), href: "#", sub: t("locationSub") },
                ].map((c) => (
                  <a key={c.value} href={c.href}
                    className="group flex items-start gap-5 p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.04] hover:border-purple-500/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 flex items-center justify-center shrink-0 group-hover:shadow-lg group-hover:shadow-purple-500/10 transition-all">
                      <c.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold mb-0.5">{c.value}</div>
                      <div className="text-sm text-white/45">{c.sub}</div>
                    </div>
                  </a>
                ))}

                {/* Why choose us */}
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] mt-6">
                  <h4 className="font-semibold mb-4 text-sm text-purple-400">{t("whyNeo")}</h4>
                  <div className="space-y-3">
                    {t("whyItems").split("|").map((r) => (
                      <div key={r} className="flex items-center gap-3 text-sm text-white/55">
                        <CheckCircle2 className="w-4 h-4 text-purple-400/60 shrink-0" />{r}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <form className="p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-5 h-full"
                onSubmit={(e) => { e.preventDefault(); window.location.href = "mailto:office@neodigital.tech"; }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-white/55 mb-2 block">{t("formName")}</label>
                    <input type="text" placeholder={t("formNamePh")} className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/55 focus:border-purple-500/40 focus:outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="text-sm text-white/55 mb-2 block">{t("formEmail")}</label>
                    <input type="email" placeholder={t("formEmailPh")} className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/55 focus:border-purple-500/40 focus:outline-none transition-colors text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-white/55 mb-2 block">{t("formSubject")}</label>
                  <input type="text" placeholder={t("formSubjectPh")} className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/55 focus:border-purple-500/40 focus:outline-none transition-colors text-sm" />
                </div>
                <div>
                  <label className="text-sm text-white/55 mb-2 block">{t("formMessage")}</label>
                  <textarea rows={5} placeholder={t("contactMessage")} className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/55 focus:border-purple-500/40 focus:outline-none transition-colors resize-none text-sm" />
                </div>
                <button type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 hover:-translate-y-0.5">
                  {t("contactSend")} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <div className="relative z-10">
        <Footerdemo />
      </div>

      {/* AI Chat Assistant */}
      <ChatWidget />
    </div>
  );
}
