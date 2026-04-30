"use client";

import { motion } from "framer-motion";
import { CalendarHeart, ConciergeBell, WandSparkles } from "lucide-react";
import { MotionSection } from "@/components/motion-section";

const pillars = [
  { label: "Discover", icon: WandSparkles },
  { label: "Reserve", icon: CalendarHeart },
  { label: "Arrive", icon: ConciergeBell },
];

export function About() {
  return (
    <MotionSection id="about" className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="relative mx-auto max-w-xl md:mx-0 md:max-w-none">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-600 dark:text-amber-200">Why Iterator</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance text-slate-900 dark:text-white sm:text-4xl">
            A beautiful booking layer for modern lifestyle plans.
          </h2>
        </div>

        <div className="glass-panel rounded-md p-6 sm:p-8">
          <p className="text-lg leading-8 text-slate-200">
            Iterator blends curated discovery with real-time reservations, flexible planning, and concierge-level
            support. It is built for people who want their free time to feel intentional, social, restorative, and easy.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <motion.div
                  key={pillar.label}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Icon aria-hidden="true" className="text-amber-200" size={22} />
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                    {pillar.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
