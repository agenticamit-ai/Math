import Link from "next/link";

type NavItem = { href: string; label: string };

export function Shell({
  children,
  nav = [],
  right,
  width = "max-w-5xl",
}: {
  children: React.ReactNode;
  nav?: NavItem[];
  right?: React.ReactNode;
  width?: string;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-paper/90 backdrop-blur">
        <div className={`mx-auto flex ${width} items-center gap-4 px-4 py-3`}>
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-brand-dark">
            <svg aria-hidden viewBox="0 0 64 64" className="h-7 w-7">
              <rect width="64" height="64" rx="14" fill="#2F6F6A" />
              <path d="M14 20c7-3 13-2 18 2v26c-5-4-11-5-18-2z" fill="#FBF8F2" />
              <path d="M50 20c-7-3-13-2-18 2v26c5-4 11-5 18-2z" fill="#E3F0EE" />
              <path d="M32 12l6 7h-4v6h-4v-6h-4z" fill="#E9A23B" />
            </svg>
            ReadUp
          </Link>
          <nav className="flex flex-1 items-center gap-1 overflow-x-auto text-sm font-semibold">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-lg px-3 py-2 text-muted hover:bg-card hover:text-ink">
                {n.label}
              </Link>
            ))}
          </nav>
          {right}
        </div>
      </header>
      <main className={`mx-auto ${width} px-4 py-6 sm:py-8`}>{children}</main>
    </div>
  );
}

export const READER_NAV: NavItem[] = [
  { href: "/home", label: "Home" },
  { href: "/progress", label: "Progress" },
  { href: "/vocab", label: "Words" },
];

export const PARENT_NAV: NavItem[] = [
  { href: "/parent", label: "Dashboard" },
  { href: "/parent/settings", label: "Settings" },
];
