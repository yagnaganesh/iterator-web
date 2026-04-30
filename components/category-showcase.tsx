"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useInView } from "framer-motion";
import { Utensils, Scissors, Popcorn, TentTree, Ticket } from "lucide-react";
import { useTheme } from "next-themes";
import type { LucideIcon } from "lucide-react";

type Cat = {
  key: string;
  num: string;
  label: string;
  headline: string;
  desc: string;
  Icon: LucideIcon;
  accent: string;
  glow: string;
  glow2: string;
  glowL: string;
  glow2L: string;
  ambient: any;
  entrance: { x?: number; y?: number; scale?: number; rotate?: number; opacity?: number };
};

const CATS: Cat[] = [
  {
    key: "dine",
    num: "01",
    label: "Dine Out",
    headline: "Reserve your table at the city's finest.",
    desc: "From rooftop bistros to hidden neighbourhood gems — discover and instantly book the perfect dining experience.",
    Icon: Utensils,
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.22)",
    glow2: "rgba(234,88,12,0.12)",
    glowL: "rgba(245,158,11,0.18)",
    glow2L: "rgba(234,88,12,0.10)",
    ambient: { y: [0, -12, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
    entrance: { y: 80, opacity: 0 },
  },
  {
    key: "spa",
    num: "02",
    label: "Saloon & Spa",
    headline: "Relax. Rejuvenate. Repeat.",
    desc: "Book haircuts, massages, facials, and full wellness rituals — all with instant confirmation.",
    Icon: Scissors,
    accent: "#db2777",
    glow: "rgba(244,114,182,0.22)",
    glow2: "rgba(168,85,247,0.12)",
    glowL: "rgba(219,39,119,0.14)",
    glow2L: "rgba(168,85,247,0.09)",
    ambient: { scale: [1, 1.1, 1], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
    entrance: { x: 100, opacity: 0 },
  },
  {
    key: "movies",
    num: "03",
    label: "Movies & Shows",
    headline: "Your next blockbuster night starts here.",
    desc: "Browse showtimes, pick your seats, and book in seconds — for movies, live theatre, and concerts.",
    Icon: Popcorn,
    accent: "#2563eb",
    glow: "rgba(96,165,250,0.22)",
    glow2: "rgba(139,92,246,0.14)",
    glowL: "rgba(37,99,235,0.14)",
    glow2L: "rgba(139,92,246,0.09)",
    ambient: { rotate: [0, 10, -10, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } },
    entrance: { scale: 0.5, opacity: 0 },
  },
  {
    key: "parks",
    num: "04",
    label: "Parks & Outings",
    headline: "Escape the city. Find your adventure.",
    desc: "Curated parks, nature trails, and city escapes — planned and ready to book in one tap.",
    Icon: TentTree,
    accent: "#059669",
    glow: "rgba(52,211,153,0.22)",
    glow2: "rgba(16,185,129,0.12)",
    glowL: "rgba(5,150,105,0.15)",
    glow2L: "rgba(16,185,129,0.09)",
    ambient: { x: [-8, 8, -8], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } },
    entrance: { rotate: -15, opacity: 0, x: -100 },
  },
  {
    key: "events",
    num: "05",
    label: "Events & Games",
    headline: "Level up your weekend.",
    desc: "Bowling alleys, escape rooms, arcades, live events — discover what's happening and grab your spot.",
    Icon: Ticket,
    accent: "#7c3aed",
    glow: "rgba(167,139,250,0.22)",
    glow2: "rgba(236,72,153,0.12)",
    glowL: "rgba(124,58,237,0.14)",
    glow2L: "rgba(236,72,153,0.09)",
    ambient: { y: [0, -5, 0], x: [0, 5, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } },
    entrance: { y: -100, opacity: 0 },
  },
];

/* ── per-category slide ─────────────────────────────────── */
function Slide({ cat, isDark, forceTrigger }: { cat: Cat; isDark: boolean; forceTrigger?: boolean }) {
  const { Icon } = cat;
  const glow  = isDark ? cat.glow  : cat.glowL;
  const glow2 = isDark ? cat.glow2 : cat.glow2L;

  return (
    <motion.div
      key={cat.key}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 lg:flex-row lg:items-center lg:gap-20 lg:px-20"
      initial={cat.entrance}
      animate={forceTrigger !== false ? { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 } : cat.entrance}
      exit={{ opacity: 0, filter: "blur(15px)", scale: 1.1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Background decoration ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.3, opacity: 0 }}
          animate={forceTrigger !== false ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Icon
            size={500}
            style={{ color: cat.accent, opacity: isDark ? 0.03 : 0.04 }}
            strokeWidth={0.4}
          />
        </motion.div>
      </div>

      {/* ── Text Content ── */}
      <div className="relative z-10 max-w-3xl text-center lg:text-left">
        <motion.div
          className="flex flex-col items-center lg:items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={forceTrigger !== false ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Large, powerful category name in neutral color */}
          <h1
            className="text-5xl font-black tracking-tighter sm:text-6xl lg:text-8xl"
            style={{ lineHeight: 0.9, color: cat.accent }}
          >
            {cat.label}
          </h1>
          
          {/*catchy phrase in neutral color and italic, slightly smaller and offset */}
          <motion.p
            className="mt-4 text-xl font-semibold italic text-slate-500 dark:text-slate-400 sm:text-2xl lg:text-3xl"
            initial={{ opacity: 0, x: -10 }}
            animate={forceTrigger !== false ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {cat.headline}
          </motion.p>

          <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent lg:via-slate-300 lg:to-transparent" 
               style={{ backgroundImage: `linear-gradient(to right, transparent, ${cat.accent}66, transparent)` }} />
        </motion.div>

        <motion.p
          className="mt-8 max-w-xl text-base leading-[1.8] text-slate-600 dark:text-slate-400 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={forceTrigger !== false ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {cat.desc}
        </motion.p>
      </div>

      {/* ── Visual Element ── */}
      <div className="relative z-10 mt-14 flex items-center justify-center lg:mt-0">
        <div className="absolute h-[340px] w-[340px] rounded-full bg-gradient-to-br from-transparent to-transparent opacity-20 blur-3xl" 
             style={{ background: `radial-gradient(circle, ${cat.accent}33 0%, transparent 70%)` }} />
             
        {[340, 240, 160].map((size, i) => (
          <motion.div
            key={size}
            className={`absolute rounded-full border ${i === 2 ? 'border-dashed' : ''}`}
            style={{ 
              width: size, 
              height: size, 
              borderColor: `${cat.accent}${isDark ? (35 - i * 8) : (45 - i * 8)}` 
            }}
            animate={i === 2 ? { rotate: 360 } : { scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        ))}

        <motion.div
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm shadow-2xl"
          style={{
            border: `1px solid ${cat.accent}44`,
            boxShadow: `0 0 40px ${cat.accent}22`,
          }}
          animate={forceTrigger !== false ? cat.ambient : {}}
        >
          <Icon size={44} style={{ color: cat.accent }} aria-hidden="true" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── main export ────────────────────────────────────────── */
export function CategoryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * CATS.length), CATS.length - 1);
      setActiveIdx(idx);
    });
  }, [scrollYProgress]);

  const cat = CATS[activeIdx];
  const glow  = isDark ? cat.glow  : cat.glowL;
  const glow2 = isDark ? cat.glow2 : cat.glow2L;

  return (
    <div ref={containerRef} style={{ height: `${CATS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-white dark:bg-[#05080f]">

        {/* ── Global background glow ── */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{
            background: `radial-gradient(ellipse 70% 60% at 80% 40%, ${glow}, transparent 75%),
                         radial-gradient(ellipse 50% 50% at 20% 80%, ${glow2}, transparent 70%)`,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* ── category slides ── */}
        <AnimatePresence mode="wait">
          <Slide key={cat.key} cat={cat} isDark={isDark} forceTrigger={isInView} />
        </AnimatePresence>

        {/* ── Progress indicators ── */}
        <div className="absolute right-10 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-6">
          {CATS.map((c, i) => (
            <div key={c.key} className="relative flex flex-col items-center">
               <motion.div
                className="h-12 w-[1px] bg-slate-300 dark:bg-white/10"
                animate={{ opacity: i === activeIdx ? 1 : 0.3 }}
              >
                <motion.div
                  className="h-full w-full origin-top"
                  style={{ background: c.accent }}
                  animate={{ scaleY: i === activeIdx ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
