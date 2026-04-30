import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header id="iterator-header-v2" className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-[#040810]/70 backdrop-blur-xl transition-colors">
      {/* Theme-colour bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, rgba(255,215,0,0.5) 0%, rgba(0,191,255,0.5) 100%)" }} />
      <nav
        aria-label="Primary navigation"
        className="flex h-16 w-full items-center justify-between px-4 sm:px-6"
      >
        <Link href="/" className="flex items-center gap-0 group" aria-label="Iterator home">
          <Image src="/brand-logo.png" alt="Iterator Logo" width={100} height={100} className="object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover:scale-105" />
          <span className="text-2xl font-bold tracking-tight -ml-3"><span className="accent-text">Iterator</span></span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 transition hover:text-slate-900 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
