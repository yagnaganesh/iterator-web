"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { showcases } from "@/lib/data";
import { MotionSection } from "@/components/motion-section";

export function Showcase() {
  return (
    <MotionSection id="showcase" className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-200">Experiences</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Pick a vibe. Iterator builds the rest of the plan around it.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {showcases.map((item, index) => (
            <motion.article
              key={item.label}
              className="group relative min-h-[330px] overflow-hidden rounded-md border border-white/10 bg-slate-950/55 p-6"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,191,255,0.15),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,215,0,0.15),transparent_38%),linear-gradient(135deg,rgba(0,80,158,0.1),rgba(212,175,55,0.1))] opacity-90 transition group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_top_right,rgba(0,191,255,0.25),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,215,0,0.25),transparent_38%),linear-gradient(135deg,rgba(0,80,158,0.15),rgba(212,175,55,0.15))]" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">{item.label}</p>
                    <ArrowUpRight aria-hidden="true" className="text-slate-500 dark:text-white/70 transition group-hover:text-cyan-600 dark:group-hover:text-white" size={20} />
                  </div>
                  <h3 className="mt-8 text-2xl font-bold leading-snug text-slate-900 dark:text-white">{item.title}</h3>
                </div>

                <div className="mt-10">
                  <p className="text-5xl font-semibold text-slate-900 dark:text-white">{item.metric}</p>
                  <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{item.caption}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
