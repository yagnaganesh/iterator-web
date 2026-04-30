"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { useContactStore } from "@/store/contact-store";

type Errors = {
  name?: string;
  email?: string;
};

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const submitted = useContactStore((state) => state.submitted);
  const setSubmitted = useContactStore((state) => state.setSubmitted);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const nextErrors: Errors = {};

    if (name.length < 2) nextErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      event.currentTarget.reset();
    }
  }

  return (
    <div className="relative overflow-hidden pt-24 pb-32 bg-slate-50 dark:bg-[#05080f]">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="text-center lg:text-left">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400"
            >
              Get in Touch
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            >
              We&apos;d love to <br /> hear from you.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700 dark:text-slate-400 font-medium"
            >
              Whether you have a question about our curated bookings, need help with an experience, or just want to say hi — our team is here for you.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-amber-500/10 to-cyan-500/10 blur-2xl -z-10" />
            <form
              onSubmit={onSubmit}
              className="relative p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-white/10 shadow-xl backdrop-blur-xl"
              noValidate
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</span>
                  <input
                    name="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-950/50 px-4 py-3 text-slate-900 dark:text-white outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 dark:focus:border-amber-400/50"
                    placeholder="Maya Shah"
                  />
                  {errors.name ? (
                    <span id="name-error" className="mt-2 block text-xs font-medium text-rose-600 dark:text-rose-400">
                      {errors.name}
                    </span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</span>
                  <input
                    name="email"
                    type="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-950/50 px-4 py-3 text-slate-900 dark:text-white outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 dark:focus:border-amber-400/50"
                    placeholder="maya@company.com"
                  />
                  {errors.email ? (
                    <span id="email-error" className="mt-2 block text-xs font-medium text-rose-600 dark:text-rose-400">
                      {errors.email}
                    </span>
                  ) : null}
                </label>
              </div>

              <label className="mt-6 block">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">How can we help?</span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-950/50 px-4 py-3 text-slate-900 dark:text-white outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 dark:focus:border-amber-400/50"
                  placeholder="Tell us what's on your mind..."
                />
              </label>

              <button
                type="submit"
                className="mt-8 group relative w-full h-14 overflow-hidden rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Send Message
                  <Send aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center"
                >
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    Success! We&apos;ll get back to you shortly.
                  </p>
                </motion.div>
              ) : null}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
