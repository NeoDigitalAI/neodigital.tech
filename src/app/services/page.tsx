"use client";

import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import Link from "next/link";
import {
  Smartphone, Brain, BarChart3, Users, Video, Coins, Sparkles,
  ArrowRight,
} from "lucide-react";

const services: CardStackItem[] = [
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    description: "Custom iOS & Android applications built with cutting-edge AI integration",
    imageSrc: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    href: "/services/mobile-apps",
    tag: "Development",
  },
  {
    id: "business-ai-tools",
    title: "Business AI Tools",
    description: "Intelligent automation, analytics, and forecasting to streamline operations",
    imageSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    href: "/services/business-ai-tools",
    tag: "Automation",
  },
  {
    id: "intelligent-marketing",
    title: "Intelligent Marketing",
    description: "SEO, AI-powered content, social automation, and results-driven strategies",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    href: "/services/intelligent-marketing",
    tag: "Growth",
  },
  {
    id: "ai-avatars",
    title: "AI Avatars",
    description: "Hyper-realistic digital personas, voice AI, and podcast avatars",
    imageSrc: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    href: "/services/ai-avatars",
    tag: "AI Solutions",
  },
  {
    id: "ai-ugc-content-studio",
    title: "AI UGC Content Studio",
    description: "Scalable user-generated content powered by AI for authentic brand storytelling",
    imageSrc: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
    href: "/services/ai-ugc-content-studio",
    tag: "Content",
  },
  {
    id: "ai-crypto-automation",
    title: "AI Crypto Automation",
    description: "Automated trading bots, portfolio management, and blockchain intelligence",
    imageSrc: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    href: "/services/ai-crypto-automation",
    tag: "Crypto",
  },
  {
    id: "custom-ai-agent-systems",
    title: "Custom AI Agent Systems",
    description: "Autonomous AI agents tailored to your business workflows and decision-making",
    imageSrc: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80",
    href: "/services/custom-ai-agent-systems",
    tag: "AI Agents",
  },
];

const servicesMeta = [
  { slug: "mobile-apps", icon: Smartphone, iconColor: "text-sky-400", iconBg: "bg-sky-500/10 group-hover:bg-sky-500/20", borderHover: "hover:border-sky-500/30", linkColor: "text-sky-400" },
  { slug: "business-ai-tools", icon: Brain, iconColor: "text-indigo-400", iconBg: "bg-indigo-500/10 group-hover:bg-indigo-500/20", borderHover: "hover:border-indigo-500/30", linkColor: "text-indigo-400" },
  { slug: "intelligent-marketing", icon: BarChart3, iconColor: "text-emerald-400", iconBg: "bg-emerald-500/10 group-hover:bg-emerald-500/20", borderHover: "hover:border-emerald-500/30", linkColor: "text-emerald-400" },
  { slug: "ai-avatars", icon: Users, iconColor: "text-purple-400", iconBg: "bg-purple-500/10 group-hover:bg-purple-500/20", borderHover: "hover:border-purple-500/30", linkColor: "text-purple-400" },
  { slug: "ai-ugc-content-studio", icon: Video, iconColor: "text-orange-400", iconBg: "bg-orange-500/10 group-hover:bg-orange-500/20", borderHover: "hover:border-orange-500/30", linkColor: "text-orange-400" },
  { slug: "ai-crypto-automation", icon: Coins, iconColor: "text-cyan-400", iconBg: "bg-cyan-500/10 group-hover:bg-cyan-500/20", borderHover: "hover:border-cyan-500/30", linkColor: "text-cyan-400" },
  { slug: "custom-ai-agent-systems", icon: Sparkles, iconColor: "text-rose-400", iconBg: "bg-rose-500/10 group-hover:bg-rose-500/20", borderHover: "hover:border-rose-500/30", linkColor: "text-rose-400" },
];

export default function ServicesPage() {
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* Hero + Card Stack */}
      <section className="relative flex flex-col items-center justify-center min-h-screen py-20 px-4">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-600/10 blur-[120px]" />
        </div>

        <div className="relative z-10 text-center mb-12">
          <p className="text-purple-400 font-semibold tracking-widest uppercase text-sm mb-4">
            Our Services
          </p>
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            AI-Powered Solutions
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
              Built for Growth
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From custom apps to intelligent marketing — every service is engineered to drive measurable business results.
          </p>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
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

      {/* Grid Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Each service works independently or as part of an integrated growth strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, idx) => {
              const meta = servicesMeta[idx];
              if (!meta) return null;
              const Icon = meta.icon;
              return (
                <Link
                  key={s.id}
                  href={`/services/${meta.slug}`}
                  className={`group bg-gray-900/50 border border-white/5 rounded-2xl p-8 ${meta.borderHover} transition-all duration-300 hover:-translate-y-2`}
                >
                  <div className={`w-14 h-14 ${meta.iconBg} rounded-xl flex items-center justify-center mb-6 transition-colors`}>
                    <Icon className={`w-7 h-7 ${meta.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-xl text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.description}</p>
                  <span className={`${meta.linkColor} text-sm font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform`}>
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-sky-700" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="font-bold text-3xl sm:text-4xl text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto">
            Book a free strategy call and discover which AI solutions will drive the most growth for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-purple-700 px-10 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all duration-200 hover:scale-105 shadow-xl"
          >
            Book Your Free Strategy Call
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
