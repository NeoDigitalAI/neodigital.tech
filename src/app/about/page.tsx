"use client";

import { LangProvider, useLang } from "@/lib/lang-context";
import { LanguageSwitcher } from "@/app/page";
import { ArrowLeft, Sparkles } from "lucide-react";

function AboutContent() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#030014] text-white font-[family-name:var(--font-geist-sans)]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <defs>
                <linearGradient id="ng" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00d4ff"/>
                  <stop offset="50%" stopColor="#7b2ff7"/>
                  <stop offset="100%" stopColor="#5a1fd6"/>
                </linearGradient>
              </defs>
              <path d="M8 34V6h5l14 20V6h5v28h-5L13 14v20H8z" fill="url(#ng)"/>
            </svg>
            <span className="font-bold tracking-tight text-xl">NeoDigital<span className="text-purple-400">.tech</span></span>
          </a>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-sm font-medium transition-all hover:-translate-y-0.5">
              <ArrowLeft className="w-4 h-4" /> {t("navHome")}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-mono uppercase tracking-[0.2em]">
            <Sparkles className="w-4 h-4" /> {t("aboutLabel")}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent lowercase leading-tight">
            {t("aboutTitle")}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-32">
        <div className="max-w-3xl mx-auto relative">
          {/* Decorative line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent hidden md:block" />

          <div className="space-y-12 md:pl-20">
            <div className="relative">
              <div className="hidden md:block absolute -left-[3.25rem] top-2 w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">
                {t("aboutText1")}
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute -left-[3.25rem] top-2 w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                {t("aboutText2")}
              </p>
            </div>

            <div className="relative py-8">
              <div className="hidden md:block absolute -left-[3.25rem] top-10 w-3 h-3 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50" />
              <p className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {t("aboutText3")}
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute -left-[3.25rem] top-2 w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                {t("aboutText4")}
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute -left-[3.25rem] top-2 w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                {t("aboutText5")}
              </p>
            </div>

            <div className="relative pt-8">
              <div className="hidden md:block absolute -left-[3.25rem] top-10 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50" />
              <div className="text-center md:text-left">
                <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
                  {t("aboutText6")}
                </p>
                <div className="mt-8 flex justify-center md:justify-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" style={{ animationDelay: "200ms" }} />
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" style={{ animationDelay: "400ms" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-20 text-center">
          <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-2xl font-semibold transition-all shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/35 hover:-translate-y-0.5 text-white">
            {t("ctaContact")} <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8 px-6 text-center text-white/30 text-sm">
        <p>© 2026 INNOVATEX NEST TREND S.R.L. All rights reserved.</p>
        <a href="/" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">← NeoDigital.tech</a>
      </footer>
    </div>
  );
}

export default function AboutPage() {
  return (
    <LangProvider>
      <AboutContent />
    </LangProvider>
  );
}
