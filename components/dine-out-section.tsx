"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Utensils, ArrowRight } from "lucide-react";

export function DineOutSection() {
  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-black">
      {/* Background Image with subtle movement */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/lifestyle-1.png" // Using existing verified image
          alt="Dine Out"
          fill
          className="object-cover opacity-40 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 border border-amber-500/30">
              <Utensils size={14} />
              Dine Out
            </div>
            
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-6">
              Reserve your table <br />
              at the city's finest.
            </h2>

            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed">
              From rooftop bistros to hidden neighbourhood gems — discover and instantly book the perfect dining experience.
            </p>

            <button className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 shadow-xl">
              Book a Table
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
