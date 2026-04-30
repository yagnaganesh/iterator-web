"use client";

import { motion } from "framer-motion";
import { Utensils, Scissors, Popcorn, TentTree, Ticket, ArrowRight, Star } from "lucide-react";
import { PhoneMockup } from "@/components/phone-mockup";

const heroCats = [
  { label: "Dine Out",        icon: Utensils,  color: "#f59e0b" },
  { label: "Saloon & Spa",    icon: Scissors,  color: "#ec4899" },
  { label: "Movies & Shows",  icon: Popcorn,   color: "#3b82f6" },
  { label: "Parks & Outings", icon: TentTree,  color: "#10b981" },
  { label: "Events & Games",  icon: Ticket,    color: "#8b5cf6" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-24 sm:px-8 lg:px-12">

      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-32 h-[700px] w-[700px] rounded-full bg-[#1E6FD9]/[0.05] blur-[160px]" />
        <div className="absolute -bottom-32 -left-32 h-[600px] w-[600px] rounded-full bg-[#F5B41A]/[0.05] blur-[140px]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1fr_auto]">

        {/* ── Left: text ── */}
        <div className="flex max-w-2xl flex-col">

          {/* Eyebrow badge */}
          <motion.div {...fadeUp(0)}
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5"
            style={{
              background: "linear-gradient(90deg, rgba(245,180,26,0.06) 0%, rgba(30,111,217,0.06) 100%)",
              borderColor: "rgba(245,180,26,0.2)",
            }}>
            <Star size={10} className="text-[#F5B41A]" fill="currentColor" />
            <span className="text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              India&apos;s #1 Lifestyle Booking App
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 {...fadeUp(0.06)}
            className="font-black tracking-tight text-slate-900 dark:text-white"
            style={{ fontSize: "clamp(3.2rem, 7vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#1E6FD9" }}>Plan &amp; Book</span>
            <br />
            <span className="text-slate-900 dark:text-white">with </span>
            <span style={{ color: "#F5B41A" }}>Absolute Ease</span>
            <span className="text-slate-400 dark:text-slate-500">.</span>
          </motion.h1>

          {/* Accent divider */}
          <motion.div {...fadeUp(0.12)} className="mt-8 mb-8 h-[2px] w-12 rounded-full"
            style={{ background: "linear-gradient(90deg, #F5B41A, #1E6FD9)" }} />

          {/* Sub-copy */}
          <motion.p {...fadeUp(0.15)}
            className="text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            style={{ maxWidth: "42ch" }}>
            <span className="accent-text font-bold">Iterator</span> unifies restaurants, spas, movies, games &amp; city outings into{" "}
            <strong className="font-semibold text-slate-800 dark:text-white">one beautifully designed app</strong>{" "}
            — so you live more and scroll less.
          </motion.p>

          {/* CTA row */}
          <motion.div {...fadeUp(0.22)} className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.03] active:scale-95"
              style={{
                backgroundColor: "#1E6FD9",
                boxShadow: "0 4px 20px rgba(30,111,217,0.35)",
              }}>
              Get Early Access <ArrowRight size={15} />
            </a>
            <a href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-7 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-white/5">
              See How It Works
            </a>
          </motion.div>

          {/* Category chips */}
          <motion.div {...fadeUp(0.30)} className="mt-10 flex flex-wrap gap-2.5">
            {heroCats.map(({ label, icon: Icon, color }) => (
              <span key={label}
                className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold backdrop-blur-sm transition-all hover:scale-105"
                style={{
                  borderColor: `${color}30`,
                  background: `${color}0d`,
                  color: color,
                }}>
                <Icon size={11} aria-hidden /> {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: phone ── */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <PhoneMockup />
        </motion.div>

      </div>
    </section>
  );
}
