"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Utensils,
  Gamepad2,
  Clapperboard,
  TentTree,
  LayoutGrid,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { MotionSection } from "@/components/motion-section";

const businessTypes = [
  { value: "restaurant", label: "Restaurant / Café", icon: Utensils },
  { value: "activity", label: "Activity Centre", icon: TentTree },
  { value: "gamezone", label: "Game Zone / Arcade", icon: Gamepad2 },
  { value: "theatre", label: "Theatre / Shows", icon: Clapperboard },
  { value: "other", label: "Other Business", icon: LayoutGrid },
];

const benefits = [
  {
    title: "Premium Discoverability",
    desc: "Join an elite collection of the city's finest venues and get seen by high-intent customers.",
    icon: TrendingUp,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    title: "Verified Trust",
    desc: "Every listing on Iterator is verified by our team, ensuring quality and trust for our users.",
    icon: ShieldCheck,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    title: "Instant Sync",
    desc: "Manage your bookings and availability in real-time with our seamless partner dashboard.",
    icon: Zap,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
];

type Errors = Partial<Record<
  "businessName" | "businessType" | "address" | "contactName" | "email" | "phone" | "visitDate" | "visitTime",
  string
>>;

export function BusinessContact() {
  const [selected, setSelected] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate(form: FormData): Errors {
    const errs: Errors = {};
    const businessName = String(form.get("businessName") || "").trim();
    const businessType = String(form.get("businessType") || "").trim();
    const address = String(form.get("address") || "").trim();
    const contactName = String(form.get("contactName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const visitDate = String(form.get("visitDate") || "").trim();
    const visitTime = String(form.get("visitTime") || "").trim();

    if (businessName.length < 2) errs.businessName = "Enter your business name.";
    if (!businessType) errs.businessType = "Select a business type.";
    if (address.length < 5) errs.address = "Enter your business address.";
    if (contactName.length < 2) errs.contactName = "Enter contact person's name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email.";
    if (phone && !/^[+\d\s\-().]{7,}$/.test(phone)) errs.phone = "Enter a valid phone number.";
    if (!visitDate) errs.visitDate = "Choose a preferred visit date.";
    if (!visitTime) errs.visitTime = "Choose a preferred visit time.";
    return errs;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formRef = e.currentTarget;
    const form = new FormData(formRef);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      try {
        const formData = new URLSearchParams();
        formData.append("formType", "Business");
        formData.append("name", String(form.get("businessName") || ""));
        formData.append("email", String(form.get("email") || ""));
        formData.append("address", String(form.get("address") || ""));
        formData.append("message", `
Category: ${selected || "Not Selected"}
Contact Person: ${form.get("contactName")}
Phone: ${form.get("phone")}
Preferred Visit: ${form.get("visitDate")} at ${form.get("visitTime")}
        `.trim());

        // Send to Google Apps Script
        await fetch("https://script.google.com/macros/s/AKfycby_LN3bJAlqf_1gIt2Eua0aD1yOJJ6WyIWM-TplreTazFkJjx-QHazyOC5KcKbBUgw/exec", {
          method: "POST",
          mode: "no-cors",
          body: formData,
        });

        setSubmitted(true);
        formRef.reset();
        setSelected("");
      } catch (error: any) {
        console.error("Submission error:", error);
        alert(`Form submission failed: ${error.message || "Unknown Error"}. Please check your internet connection or try again later.`);
      } finally {
        setLoading(false);
      }
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-lg border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/50 px-4 py-3 text-slate-900 dark:text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 dark:focus:border-cyan-400/50";
  const errorClass = "mt-1.5 block text-xs text-rose-600 dark:text-rose-400 font-medium";
  const labelClass = "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="relative overflow-hidden pt-24 pb-32 bg-slate-50 dark:bg-[#05080f]">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400 mb-4"
          >
            For Visionary Partners
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl mb-6 leading-[1.1]"
          >
            Your business, <br />
            <span className="accent-text">elevated by design.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
          >
            Iterator brings your venue to the fingertips of the city&apos;s most active audience. 
            List for free, get verified, and start accepting premium bookings.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-slate-200 dark:bg-slate-900/40 dark:border-white/10 shadow-sm"
            >
              <div className={`w-12 h-12 rounded-xl ${benefit.bg} flex items-center justify-center mb-6`}>
                <benefit.icon className={benefit.color} size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{benefit.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Form Section */}
        <div className="grid gap-16 lg:grid-cols-[1fr_1.8fr]">
          {/* Left Column: Selector */}
          <div className="space-y-8">
            <div className="sticky top-32">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Partner Details</h2>
              <p className="text-slate-700 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                Select your business category to begin. Our team will visit your venue for a professional shoot and verification.
              </p>
              
              <div className="space-y-3">
                {businessTypes.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setSelected(value);
                      setErrors((prev) => ({ ...prev, businessType: undefined }));
                    }}
                    className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                      selected === value
                        ? "border-cyan-500/50 bg-cyan-500/10 text-slate-900 dark:text-white shadow-lg shadow-cyan-500/5"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/10"
                    }`}
                  >
                    <div className={`grid size-12 place-items-center rounded-lg border transition-colors ${
                      selected === value ? "border-cyan-500/20 bg-cyan-500/20 text-cyan-600 dark:text-cyan-300" : "border-slate-200 bg-slate-50 text-slate-400 dark:border-white/10 dark:bg-white/5 group-hover:text-slate-900 dark:group-hover:text-white"
                    }`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${selected === value ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}>{label}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Onboard in 48 hours</p>
                    </div>
                    {selected === value && <CheckCircle2 size={18} className="text-cyan-500 dark:text-cyan-400 animate-in zoom-in" />}
                  </button>
                ))}
              </div>
              {errors.businessType && <span className={errorClass}>{errors.businessType}</span>}
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-amber-500/20 via-cyan-500/20 to-transparent blur-2xl -z-10" />
            <form
              onSubmit={onSubmit}
              className="relative p-8 sm:p-12 rounded-[1.5rem] bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-white/10 backdrop-blur-xl"
            >
              <input type="hidden" name="businessType" value={selected} />
              
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Business Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input name="businessName" className={`${fieldClass} pl-12`} placeholder="Your business name" />
                  </div>
                  {errors.businessName && <span className={errorClass}>{errors.businessName}</span>}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Business Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input name="address" className={`${fieldClass} pl-12`} placeholder="Your business address" />
                  </div>
                  {errors.address && <span className={errorClass}>{errors.address}</span>}
                </div>

                <div>
                  <label className={labelClass}>Contact Person</label>
                  <input name="contactName" className={fieldClass} placeholder="Your name" />
                  {errors.contactName && <span className={errorClass}>{errors.contactName}</span>}
                </div>

                <div>
                  <label className={labelClass}>Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input name="phone" className={`${fieldClass} pl-12`} placeholder="+91 98765..." />
                  </div>
                  {errors.phone && <span className={errorClass}>{errors.phone}</span>}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Business Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input name="email" type="email" className={`${fieldClass} pl-12`} placeholder="you@example.com" />
                  </div>
                  {errors.email && <span className={errorClass}>{errors.email}</span>}
                </div>

                <div>
                  <label className={labelClass}>Preferred Visit Date</label>
                  <input name="visitDate" type="date" className={`${fieldClass} [color-scheme:dark]`} />
                  {errors.visitDate && <span className={errorClass}>{errors.visitDate}</span>}
                </div>

                <div>
                  <label className={labelClass}>Preferred Time</label>
                  <input name="visitTime" type="time" className={`${fieldClass} [color-scheme:dark]`} />
                  {errors.visitTime && <span className={errorClass}>{errors.visitTime}</span>}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-12 group relative w-full h-14 overflow-hidden rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-white dark:border-slate-300 dark:border-t-slate-900" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Partner with Iterator
                      <Send size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center"
                >
                  <p className="text-emerald-500 font-bold text-sm">
                    Success! Our partnership team will contact you shortly.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
