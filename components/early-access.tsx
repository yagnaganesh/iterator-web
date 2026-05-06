"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, CheckCircle2 } from "lucide-react";

type Errors = {
  name?: string;
  email?: string;
};

export function EarlyAccess() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formRef = event.currentTarget;
    const form = new FormData(formRef);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const interest = String(form.get("interest") || "").trim();
    
    const nextErrors: Errors = {};
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email.";

    setErrors(nextErrors);
    
    if (Object.keys(nextErrors).length === 0) {
      setLoading(true);
      const formData = new URLSearchParams();
      formData.append("formType", "EarlyAccess");
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", `Interest: ${interest || "General Early Access"}`);

      try {
        await fetch("https://script.google.com/macros/s/AKfycby_LN3bJAlqf_1gIt2Eua0aD1yOJJ6WyIWM-TplreTazFkJjx-QHazyOC5KcKbBUgw/exec", {
          method: "POST",
          mode: "no-cors",
          body: formData,
        });
        setSubmitted(true);
        formRef.reset();
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }

  const inputClass = "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-950/50 px-4 py-3 text-slate-900 dark:text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 dark:focus:border-cyan-400/50";
  const labelClass = "text-sm font-bold text-slate-700 dark:text-slate-300";

  return (
    <div className="relative overflow-hidden pt-32 pb-40 bg-slate-50 dark:bg-[#05080f]">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-6"
          >
            <Sparkles size={14} />
            Limited Beta
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl mb-6 leading-[1.1]"
          >
            Get Early Access <br /> to <span className="accent-text">Iterator.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-700 dark:text-slate-400 font-medium leading-relaxed"
          >
            Join the waitlist to be among the first to experience curated lifestyle bookings, 
            exclusive venues, and a seamless travel itinerary builder.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto max-w-xl"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/20 via-amber-500/20 to-transparent blur-2xl -z-10" />
            <form
              onSubmit={onSubmit}
              className="relative p-8 sm:p-12 rounded-[2rem] bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-white/10 backdrop-blur-xl shadow-2xl"
            >
              <div className="space-y-6">
                <label className="block">
                  <span className={labelClass}>Your Name</span>
                  <input name="name" className={inputClass} placeholder="Your name" />
                  {errors.name && <span className="mt-1.5 block text-xs font-medium text-rose-500">{errors.name}</span>}
                </label>

                <label className="block">
                  <span className={labelClass}>Email Address</span>
                  <input name="email" type="email" className={inputClass} placeholder="you@example.com" />
                  {errors.email && <span className="mt-1.5 block text-xs font-medium text-rose-500">{errors.email}</span>}
                </label>

                <label className="block">
                  <span className={labelClass}>What interests you most? (Optional)</span>
                  <select name="interest" className={inputClass}>
                    <option value="">Select an option</option>
                    <option value="curated-dining">Curated Dining</option>
                    <option value="unique-stays">Unique Stays</option>
                    <option value="itinerary-planning">Itinerary Planning</option>
                    <option value="business-partnerships">Business Partnerships</option>
                  </select>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-10 group relative w-full h-14 overflow-hidden rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-white dark:border-slate-300 dark:border-t-slate-900" />
                      Adding to list...
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                      <Send size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center"
                >
                  <div className="flex justify-center mb-3">
                    <CheckCircle2 className="text-emerald-500" size={32} />
                  </div>
                  <h4 className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">You&apos;re on the list!</h4>
                  <p className="mt-1 text-sm text-emerald-600/80 dark:text-emerald-400/80 font-medium leading-relaxed">
                    We&apos;ve reserved your spot. Watch your inbox for a special invite coming soon.
                  </p>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
