"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { navItems } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header 
      id="iterator-header-v2" 
      className="fixed inset-x-0 top-0 z-[100] backdrop-blur-xl transition-colors bg-white/70 dark:bg-black/70 border-b border-[#F5F5F7]/10 dark:border-white/5"
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 w-full max-w-[1500px] items-center justify-between px-6 sm:px-10"
      >
        {/* Branding - Responsive Massive Logo + Seamlessly Integrated Name */}
        <Link href="/" className="flex items-center gap-0 group" aria-label="Iterator home">
          <div className="relative h-10 w-12 sm:h-12 sm:w-16 lg:h-16 lg:w-24 transition-transform group-hover:scale-110">
            <Image 
              src="/brand-logo.png" 
              alt="Iterator Logo" 
              fill
              className="object-contain" 
              priority
            />
          </div>
          <span
            className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-clip-text text-transparent animate-gradient-x -ml-1 sm:-ml-2"
            style={{
              backgroundImage: "linear-gradient(90deg, #D99A10, #1B5FCC, #D99A10)",
              backgroundSize: "200% auto",
            }}
          >
            Iterator
          </span>
        </Link>

        {/* Navigation Links - Apple Style (Small, Crisp, Premium) */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isExperienceMore = item.label === "Experience More";
            
            if (item.href.startsWith("mailto:") || item.href.startsWith("http")) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative text-[13px] font-semibold tracking-wide transition-all hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] ${
                    isExperienceMore 
                    ? "bg-clip-text text-transparent animate-gradient-x font-bold" 
                    : "text-[#86868B]"
                  }`}
                  style={isExperienceMore ? {
                    backgroundImage: "linear-gradient(90deg, #D99A10, #1B5FCC, #D99A10)",
                    backgroundSize: "200% auto",
                  } : {}}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-[13px] font-semibold tracking-wide transition-all hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] group ${
                  isExperienceMore 
                  ? "bg-clip-text text-transparent animate-gradient-x font-bold" 
                  : "text-[#86868B]"
                }`}
                style={isExperienceMore ? {
                  backgroundImage: "linear-gradient(90deg, #D99A10, #1B5FCC, #D99A10)",
                  backgroundSize: "200% auto",
                } : {}}
              >
                {item.label}
                {!isExperienceMore && (
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#1D1D1F] dark:bg-[#F5F5F7] transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link 
            href="/early-access"
            className="hidden sm:inline-flex rounded-full bg-[#0071E3] px-4 py-1.5 text-[12px] font-bold text-white transition-all hover:bg-[#0077ED] hover:scale-105 active:scale-95"
          >
            Get Early Access
          </Link>
        </div>
      </nav>
    </header>
  );
}
