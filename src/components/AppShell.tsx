"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/contest", label: "Contest" },
  { href: "/notes", label: "Parent Notes" },
  { href: "/progress", label: "Progress" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-16 pt-4 sm:px-6">
      <header className="sticky top-0 z-20 -mx-4 mb-6 border-b border-[#f0e0d0]/80 bg-cream/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="group flex items-center gap-3 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sunflower text-2xl shadow-pop" aria-hidden>
              ∑
            </span>
            <span>
              <span className="block font-display text-2xl leading-none text-ink">Math Quest</span>
              <span className="text-sm font-bold text-cocoa">Kiaan’s contest notebook</span>
            </span>
          </Link>
          <nav aria-label="Main" className="flex flex-wrap gap-2">
            {LINKS.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 font-display text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral ${
                    active ? "bg-ink text-cream" : "bg-white text-ink ring-2 ring-[#eadccb]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-12 text-base text-cocoa">
        Original contest-style practice for Kiaan. Problems in this app were written for Math Quest.
      </footer>
    </div>
  );
}
