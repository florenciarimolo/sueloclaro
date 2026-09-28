import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowRightIcon,
  CarpetIcon,
  CompareIcon,
  DockIcon,
  PetIcon,
  SmallFlatIcon,
} from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { HeroSchematic, RobotSchematic } from "@/components/RobotSchematic";
import type { DockKind } from "@/lib/database.types";
import { formatDock, GUIDE_META, GUIDE_SLUGS } from "@/lib/format";
import { JsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getBrands, getProducts } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "SueloClaro: robots aspiradores de gama media",
  },
  description:
    "Fichas de robots aspiradores Roborock, Dreame y Xiaomi de gama media, y para quién encaja cada modelo.",
  alternates: {
    canonical: "/",
  },
};

const needs: {
  href: string;
  title: string;
  text: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    href: "/robots?mascotas=1",
    title: "Tengo mascotas",
    text: "Modelos que en su ficha constan como aptos para pelo.",
    Icon: PetIcon,
  },
  {
    href: "/robots?alfombras=1",
    title: "Tengo alfombras",
    text: "Modelos que en su ficha constan como aptos para alfombras.",
    Icon: CarpetIcon,
  },
  {
    href: "/guias/robot-aspirador-piso-pequeno",
    title: "Vivo en un piso pequeño",
    text: "Hay un modelo de solo carga. La guía dice qué medir si quieres una estación.",
    Icon: SmallFlatIcon,
  },
  {
    href: "/robots?base=wash_dry",
    title: "Quiero olvidarme de la mopa",
    text: "Estaciones que vacían, lavan y secan solas.",
    Icon: DockIcon,
  },
];

const docks: { kind: DockKind; text: string }[] = [
  { kind: "none", text: "Solo carga. Vacías el depósito a mano." },
  { kind: "empty", text: "Vacía el depósito en una bolsa durante semanas." },
  { kind: "wash_dry", text: "Además lava y seca la mopa con agua limpia." },
];

export default async function Home() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  const preferred = [
    "dreame-l10s-pro-gen-3",
    "roborock-qrevo-edget",
    "dreame-l10s-ultra-gen-2",
    "roborock-qrevo-2-pro",
    "xiaomi-robot-vacuum-x20-plus",
    "roborock-qv-35a",
  ];
  const picked = preferred.flatMap((slug) => {
    const product = products.find((item) => item.slug === slug);
    return product ? [product] : [];
  });
  const featured = [
    ...picked,
    ...products.filter((product) => !picked.some((item) => item.slug === product.slug)),
  ].slice(0, 6);
  const publishedDocks = docks.filter((dock) => products.some((product) => product.dock === dock.kind));
  const origin = getSiteUrl();

  return (
    <main>
      <JsonLd
        data={webPageJsonLd({
          name: "SueloClaro: robots aspiradores de gama media",
          description:
            "Fichas de robots aspiradores Roborock, Dreame y Xiaomi de gama media, y para quién encaja cada modelo.",
          path: "/",
          origin,
        })}
      />

      <section className="relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br from-white via-white to-teal-50 px-6 py-10 sm:px-10 sm:py-14">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-medium text-teal-800">
              {products.length} modelos de Roborock, Dreame y Xiaomi
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl">
              Robots aspiradores de gama media
            </h1>
            <p className="mt-4 max-w-xl text-lg text-stone-600">
              Fichas propias que explican para quién sirve cada modelo y para
              quién no, entre 250 y 600 euros.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/robots"
                className="inline-flex items-center gap-2 rounded-full bg-teal-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-900"
              >
                Ver todos los modelos
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/comparar"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-800 hover:border-teal-700 hover:text-teal-800"
              >
                <CompareIcon className="h-4 w-4" />
                Comparar dos
              </Link>
            </div>
          </div>
          <HeroSchematic className="mx-auto w-full max-w-sm" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
          Empieza por tu casa
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {needs.map(({ href, title, text, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-teal-600 hover:shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-800 group-hover:bg-teal-100">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="mt-4 font-semibold text-stone-900">{title}</span>
                <span className="mt-1 text-sm text-stone-600">{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
          La base que hay en el catálogo
        </h2>
        <p className="mt-2 max-w-2xl text-stone-600">
          Casi todos los modelos de aquí vacían, lavan y secan la mopa. Hay
          uno de solo carga. No hay ninguno que solo autovacíe: esa diferencia
          se explica en{" "}
          <Link href="/guias/como-elegir-robot-aspirador-gama-media" className="text-teal-800 hover:underline">
            cómo elegir
          </Link>
          .
        </p>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {publishedDocks.map(({ kind, text }) => (
            <li key={kind}>
              <Link
                href={`/robots?base=${kind}`}
                className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-teal-600 hover:shadow-sm"
              >
                <RobotSchematic dock={kind} className="h-24 w-auto self-start" />
                <span className="mt-4 font-semibold text-stone-900">{formatDock(kind)}</span>
                <span className="mt-1 text-sm text-stone-600">{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
            Algunos modelos
          </h2>
          <Link
            href="/robots"
            className="inline-flex items-center gap-1 text-sm font-medium text-teal-800 hover:underline"
          >
            Ver todos
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-stone-900">Guías</h2>
          <ul className="mt-4 divide-y divide-stone-100">
            {GUIDE_SLUGS.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/guias/${slug}`}
                  className="flex items-center justify-between gap-3 py-3 text-stone-800 hover:text-teal-800"
                >
                  {GUIDE_META[slug].title}
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-stone-400" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-stone-900">Marcas</h2>
          <ul className="mt-4 divide-y divide-stone-100">
            {brands.map((brand) => {
              const count = products.filter((p) => p.brands?.slug === brand.slug).length;
              return (
                <li key={brand.slug}>
                  <Link
                    href={`/marcas/${brand.slug}`}
                    className="flex items-center justify-between gap-3 py-3 text-stone-800 hover:text-teal-800"
                  >
                    <span>{brand.name}</span>
                    <span className="text-sm text-stone-500">
                      {`${count} modelo${count === 1 ? "" : "s"}`}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
