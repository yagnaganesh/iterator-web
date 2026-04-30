"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/data";
import { MotionSection } from "@/components/motion-section";

export function Features() {
  return (
    <MotionSection id="features" className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-600 dark:text-amber-200">Explore</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Everything worth booking, arranged around the life you want to have.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                className="glass-panel group rounded-md p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.05, duration: 0.55 }}
                whileHover={{ y: -6, borderColor: "rgba(255, 189, 74, 0.42)" }}
              >
                <div className="mb-7 grid size-12 place-items-center rounded-md border border-amber-500/25 dark:border-amber-200/25 bg-amber-500/10 dark:bg-amber-300/15 text-amber-600 dark:text-amber-100 transition group-hover:bg-amber-400 group-hover:text-white dark:group-hover:bg-amber-200 dark:group-hover:text-slate-950">
                  <Icon aria-hidden="true" size={22} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
