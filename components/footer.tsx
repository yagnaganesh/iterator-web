import Link from "next/link";
import { navItems } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Iterator.</p>
        <div className="flex flex-wrap gap-5">
          {navItems.map((item) => {
            if (item.href.startsWith("mailto:") || item.href.startsWith("http")) {
              // eslint-disable-next-line @next/next/no-html-link-for-pages
              return (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.label} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
