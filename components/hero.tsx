"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

// Parent stagger container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.45, 0.32, 0.9] as [number, number, number, number],
    },
  },
};

export function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Individual tile springs for specific vertical offsets
  const y1 = useSpring(y, { stiffness: 35, damping: 20 });
  const y2 = useSpring(y, { stiffness: 45, damping: 22 });
  const y3 = useSpring(y, { stiffness: 25, damping: 18 });
  const y4 = useSpring(y, { stiffness: 45, damping: 22 });
  const y5 = useSpring(y, { stiffness: 35, damping: 20 });

  function onMouseMove(event: React.MouseEvent) {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    x.set((clientX - innerWidth / 2) / 50);
    y.set((clientY - innerHeight / 2) / 50);
  }

  return (
    <section 
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FBFBFD] dark:bg-[#000000]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-500/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-center min-h-[90vh]">
          
          {/* Left Content - Premium Typography */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-lg mx-auto lg:mx-0 z-20"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/[0.03] dark:bg-white/[0.05] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-slate-900/5 dark:border-white/10">
                <Sparkles size={14} className="text-amber-500" />
                The Future of Lifestyle Booking
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-[clamp(40px,6vw,72px)] font-black tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-[1.05]"
            >
              Plan Less. <br />
              <span 
                className="bg-clip-text text-transparent animate-gradient-x"
                style={{
                  backgroundImage: "linear-gradient(90deg, #D99A10, #1B5FCC, #D99A10)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  willChange: "background-position",
                }}
              >
                Experience More.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="mt-8 text-lg sm:text-xl font-medium text-[#86868B] dark:text-slate-400 leading-relaxed max-w-md"
            >
              Curated dining, exclusive activities, and seamless itineraries. 
              The all-in-one app for your best life.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="mt-10 flex flex-col items-center gap-6 sm:flex-row"
            >
              <Link
                href="/early-access"
                className="group relative flex items-center gap-2 rounded-full bg-[#0071E3] px-10 py-4 text-lg font-bold text-white transition-all hover:bg-[#0077ED] hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
              >
                Join the Waitlist
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/business"
                className="text-[#0066CC] dark:text-[#2997FF] text-lg font-semibold hover:underline flex items-center gap-1"
              >
                For Businesses <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Gallery - Apple-Style Gallery Cluster */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9], delay: 0.2 }}
            className="relative w-full h-full flex items-center justify-center overflow-visible will-change-transform"
          >
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-center w-full max-w-4xl mx-auto py-10 lg:py-0 h-auto">
              
              {/* Column 1 - Left Column */}
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 -translate-y-8 lg:-translate-y-12">
                <motion.div 
                  style={{ y: y1 }}
                  className="group relative aspect-square rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 dark:border-white/5 will-change-transform"
                >
                  <Image src="/lifestyle-4.png" alt="Spa" fill className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform" priority />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="rounded-full bg-white/90 dark:bg-black/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white backdrop-blur-md">Spa</span>
                  </div>
                </motion.div>
                <motion.div 
                  style={{ y: y2 }}
                  className="group relative aspect-[3/2.2] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 dark:border-white/5 will-change-transform"
                >
                  <Image src="/lifestyle-2.png" alt="Movies" fill className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform" priority />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="rounded-full bg-white/90 dark:bg-black/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white backdrop-blur-md">Movies</span>
                  </div>
                </motion.div>
              </div>

              {/* Column 2 - Middle Column */}
              <div className="flex flex-col">
                <motion.div 
                  style={{ y: y3 }}
                  className="group relative aspect-[3/5] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] dark:shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/20 dark:border-white/5 will-change-transform"
                >
                  <Image src="/lifestyle-1.png" alt="Dining" fill className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="rounded-full bg-white/95 dark:bg-white/10 px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white backdrop-blur-xl border border-white/20">Dining</span>
                  </div>
                </motion.div>
              </div>

              {/* Column 3 - Right Column */}
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 translate-y-8 lg:translate-y-12">
                <motion.div 
                  style={{ y: y4 }}
                  className="group relative aspect-[3/2.2] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 dark:border-white/5 will-change-transform"
                >
                  <Image src="/lifestyle-sports.png" alt="Sports" fill className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform" priority />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="rounded-full bg-white/90 dark:bg-black/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white backdrop-blur-md">Sports</span>
                  </div>
                </motion.div>
                <motion.div 
                  style={{ y: y5 }}
                  className="group relative aspect-square rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 dark:border-white/5 will-change-transform"
                >
                  <Image src="/lifestyle-3.png" alt="Games" fill className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform" priority />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="rounded-full bg-white/90 dark:bg-black/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white backdrop-blur-md">Games</span>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#86868B] pointer-events-none">
        <ChevronDown className="animate-bounce" size={24} />
      </div>
    </section>
  );
}
