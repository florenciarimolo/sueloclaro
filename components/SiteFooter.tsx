import Link from "next/link";
import { SITE_OWNER } from "@/lib/site";

const links = [
  { href: "/afiliacion", label: "Afiliación" },
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/privacidad", label: "Privacidad" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-stone-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-stone-600">
        <p>SueloClaro: fichas de robots aspiradores de gama media.</p>
        <p>
          SueloClaro participa en el programa de afiliados de Amazon. Los
          enlaces a Amazon son de afiliado. Eso no cambia lo que pagas al
          comprar. Detalle en{" "}
          <Link href="/afiliacion" className="hover:text-teal-800">
            Afiliación
          </Link>
          .
        </p>
        <nav aria-label="Legal" className="flex flex-wrap gap-4">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-teal-800">
              {item.label}
            </Link>
          ))}
          <a href={`mailto:${SITE_OWNER.email}`} className="hover:text-teal-800">
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
}
