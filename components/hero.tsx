"use client";

import { motion } from "framer-motion";
import { Utensils, Scissors, Popcorn, TentTree, Ticket, ArrowRight, Star } from "lucide-react";
import { PhoneMockup } from "@/components/phone-mockup";

const heroCats = [
  { label: "Dine Out",        icon: Utensils,  cls: "text-amber-500  border-amber-500/20  bg-amber-500/8"     },
  { label: "Saloon & Spa",    icon: Scissors,  cls: "text-pink-500   border-pink-500/20   bg-pink-500/8"      },
  { label: "Movies & Shows",  icon: Popcorn,   cls: "text-blue-500   border-blue-500/20   bg-blue-500/8"      },
  { label: "Parks & Outings", icon: TentTree,  cls: "text-emerald-500 border-emerald-500/20 bg-emerald-500/8" },
  { label: "Events & Games",  icon: Ticket,    cls: "text-violet-500 border-violet-500/20  bg-violet-500/8"   },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-20 sm:px-6 lg:px-8">

      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 right-1/4 h-[560px] w-[560px] rounded-full bg-amber-400/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.04] blur-[100px]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">

        {/* ── Left: text ── */}
        <div className="flex flex-col">

          {/* Eyebrow badge */}
          <motion.div {...fadeUp(0)} className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5"
            style={{
              background: "linear-gradient(90deg, rgba(255,215,0,0.08) 0%, rgba(0,191,255,0.08) 100%)",
              borderColor: "rgba(255,215,0,0.25)",
            }}>
            <Star size={11} className="text-amber-400" fill="currentColor" />
            <span className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-300">
              India's #1 Lifestyle Booking App
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 {...fadeUp(0.08)}
            className="text-balance font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white"
            style={{ fontSize: "clamp(2.8rem, 6vw, 4rem)" }}>
            Plan &amp; Book<br />
            with Absolute Ease.
          </motion.h1>

          {/* Divider */}
          <motion.div {...fadeUp(0.14)} className="my-6 h-px w-16"
            style={{ background: "linear-gradient(90deg, rgba(255,215,0,0.6), rgba(0,191,255,0.6))" }} />

          {/* Sub-copy */}
          <motion.p {...fadeUp(0.16)}
            className="max-w-md text-[1.05rem] leading-7 text-slate-600 dark:text-slate-300">
            <span className="accent-text font-bold">Iterator</span> brings restaurants, spas, movies, games &amp; weekend outings
            into <strong className="font-semibold text-slate-800 dark:text-white">one beautifully designed app</strong> — so you can stop
            switching and start experiencing.
          </motion.p>

          {/* CTA row */}
          <motion.div {...fadeUp(0.28)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(90deg, rgba(255,215,0,0.85) 0%, rgba(0,191,255,0.85) 100%)",
                boxShadow: "0 4px 18px rgba(0,191,255,0.25)",
              }}>
              Get Early Access <ArrowRight size={14} />
            </a>
            <a href="#features"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5"
              style={{ borderColor: "rgba(148,163,184,0.3)" }}>
              See How It Works
            </a>
          </motion.div>

          {/* Category chips */}
          <motion.div {...fadeUp(0.34)} className="mt-8 flex flex-wrap gap-2">
            {heroCats.map(({ label, icon: Icon, cls }) => (
              <span key={label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur-sm ${cls}`}>
                <Icon size={11} aria-hidden /> {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: phone ── */}
        <motion.div className="flex justify-center"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}
