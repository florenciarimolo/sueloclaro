"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const nav = [
  { href: "/robots", label: "Robots" },
  { href: "/comparar", label: "Comparar" },
  { href: "/guias/como-elegir-robot-aspirador-gama-media", label: "Guías" },
  { href: "/marcas", label: "Marcas" },
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const setOpen = (next: boolean | ((value: boolean) => boolean)) => {
    const value = typeof next === "function" ? next(open) : next;
    setOpenOnPath(value ? pathname : null);
  };

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenOnPath(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="relative z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight text-stone-900"
        >
          <Logo />
          SueloClaro
        </Link>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-stone-800 hover:bg-teal-50 hover:text-teal-800 md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <MenuIcon open={open} />
        </button>
        <nav aria-label="Principal" className="hidden gap-1 text-sm text-stone-700 md:flex">
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
      {open ? (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-full h-dvh bg-stone-900/20 md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
      {open ? (
        <nav
          id={menuId}
          aria-label="Principal"
          className="absolute inset-x-0 top-full border-y border-stone-200 bg-white px-4 py-3 shadow-lg md:hidden"
        >
          <ul className="flex flex-col gap-1 text-base text-stone-800">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 hover:bg-teal-50 hover:text-teal-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
