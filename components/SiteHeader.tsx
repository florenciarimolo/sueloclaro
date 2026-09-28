import Link from "next/link";

const nav = [
  { href: "/robots", label: "Robots" },
  { href: "/comparar", label: "Comparar" },
  { href: "/guias/como-elegir-robot-aspirador-gama-media", label: "Guías" },
  { href: "/marcas/roborock", label: "Marcas" },
];

function Logo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
      <circle cx="16" cy="16" r="14" className="fill-teal-700" />
      <circle cx="16" cy="16" r="9" className="fill-teal-50" />
      <circle cx="16" cy="16" r="3.5" className="fill-teal-700" />
      <rect x="12.5" y="4" width="7" height="4" rx="2" className="fill-teal-50" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight text-stone-900"
        >
          <Logo />
          SueloClaro
        </Link>
        <nav aria-label="Principal" className="flex flex-wrap gap-1 text-sm text-stone-700">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 hover:bg-teal-50 hover:text-teal-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
