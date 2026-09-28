import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { notFound } from "next/navigation";
import { FeatureBadges } from "@/components/FeatureBadges";
import {
  ArrowRightIcon,
  CarpetIcon,
  CompareIcon,
  DockIcon,
  HeightIcon,
  MopIcon,
  NavigationIcon,
  PetIcon,
  SmallFlatIcon,
  SuctionIcon,
} from "@/components/icons";
import { RobotSchematic } from "@/components/RobotSchematic";
import { amazonProductUrl } from "@/lib/amazon";
import { alternativeFor } from "@/lib/decision";
import {
  formatDock,
  formatHeight,
  formatSuction,
  GUIDE_META,
  relatedGuideForProduct,
} from "@/lib/format";
import { breadcrumbJsonLd, JsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getProductBySlug, getProductSlugs, getProducts } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

type Props = PageProps<"/robots/[slug]">;
type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export async function generateStaticParams() {
  try {
    const slugs = await getProductSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Modelo no encontrado" };
  return {
    title: product.name,
    description: product.summary,
    alternates: {
      canonical: `/robots/${product.slug}`,
    },
  };
}

function SpecRow({ Icon, label, children }: { Icon: Icon; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
        <Icon className="h-5 w-5" />
      </span>
      <div className="grid flex-1 gap-0.5 sm:grid-cols-[9rem_1fr] sm:gap-3">
        <dt className="text-sm text-stone-500">{label}</dt>
        <dd className="text-sm font-medium text-stone-900">{children}</dd>
      </div>
    </div>
  );
}

function yesOrNot(value: boolean) {
  return value ? "Sí" : "No destacado";
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, catalog] = await Promise.all([getProductBySlug(slug), getProducts()]);
  if (!product) notFound();
  const alternative = alternativeFor(product, catalog);

  const origin = getSiteUrl();
  const guideSlug = relatedGuideForProduct(product);
  const amazonUrl = amazonProductUrl(product.asin);
  const variants =
    product.product_variants.length > 0
      ? product.product_variants
      : [{ id: 0, product_id: product.id, color: "Principal", asin: product.asin }];

  const keyStats: { Icon: Icon; label: string; value: string }[] = [
    { Icon: SuctionIcon, label: "Succión", value: formatSuction(product.pa_suction) },
    { Icon: DockIcon, label: "Base", value: formatDock(product.dock) },
    { Icon: HeightIcon, label: "Altura", value: formatHeight(product.height_mm) },
  ];

  return (
    <main className="max-w-4xl">
      <JsonLd
        data={[
          webPageJsonLd({
            name: `${product.name} | SueloClaro`,
            description: product.summary,
            path: `/robots/${product.slug}`,
            origin,
          }),
          breadcrumbJsonLd(
            [
              { name: "Inicio", path: "/" },
              { name: "Robots", path: "/robots" },
              { name: product.name, path: `/robots/${product.slug}` },
            ],
            origin,
          ),
        ]}
      />

      <nav aria-label="Migas" className="mb-5 text-sm text-stone-500">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-teal-800">
              Inicio
            </Link>
            <span aria-hidden="true"> / </span>
          </li>
          <li>
            <Link href="/robots" className="hover:text-teal-800">
              Robots
            </Link>
            <span aria-hidden="true"> / </span>
          </li>
          <li aria-current="page" className="text-stone-700">
            {product.name}
          </li>
        </ol>
      </nav>

      <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white">
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            {product.brands ? (
              <Link
                href={`/marcas/${product.brands.slug}`}
                className="text-xs font-medium uppercase tracking-wider text-teal-800 hover:underline"
              >
                {product.brands.name}
              </Link>
            ) : null}
            <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-stone-600">{product.summary}</p>
            <FeatureBadges product={product} className="mt-5" />
          </div>
          <figure className="rounded-2xl bg-gradient-to-b from-stone-50 to-teal-50/60 p-6">
            <RobotSchematic dock={product.dock} className="mx-auto h-36 w-auto" />
            <figcaption className="mt-3 text-center text-xs text-stone-500">
              Esquema orientativo, no es una foto del modelo
            </figcaption>
          </figure>
        </div>
        <dl className="grid grid-cols-1 divide-y divide-stone-200 border-t border-stone-200 bg-stone-50/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {keyStats.map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-6 py-4">
              <Icon className="h-6 w-6 shrink-0 text-teal-700" />
              <div>
                <dt className="text-xs text-stone-500">{label}</dt>
                <dd className="font-semibold text-stone-900">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border border-teal-200 bg-teal-50/50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-700 text-sm text-white" aria-hidden="true">
              ✓
            </span>
            Para quién es
          </h2>
          <p className="mt-3 text-stone-700">{product.for_whom}</p>
        </section>
        <section className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-300 text-sm text-stone-700" aria-hidden="true">
              ✕
            </span>
            Para quién no
          </h2>
          <p className="mt-3 text-stone-700">{product.not_for_whom}</p>
        </section>
      </div>

      {alternative ? (
        <p className="mt-5 text-stone-700">
          {alternative.reason}{" "}
          <Link href={`/robots/${alternative.slug}`} className="font-medium text-teal-800 hover:underline">
            {alternative.name}
          </Link>
          .
        </p>
      ) : null}

      <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-900">Ficha técnica</h2>
        <dl className="mt-2 divide-y divide-stone-100">
          <SpecRow Icon={SuctionIcon} label="Succión">
            {formatSuction(product.pa_suction)}
          </SpecRow>
          <SpecRow Icon={NavigationIcon} label="Navegación">
            {product.navigation}
          </SpecRow>
          <SpecRow Icon={MopIcon} label="Mopa">
            {product.mop_type}
          </SpecRow>
          <SpecRow Icon={DockIcon} label="Base">
            {formatDock(product.dock)}
          </SpecRow>
          <SpecRow Icon={HeightIcon} label="Altura">
            {formatHeight(product.height_mm)}
          </SpecRow>
          <SpecRow Icon={PetIcon} label="Mascotas">
            {yesOrNot(product.pet_hair)}
          </SpecRow>
          <SpecRow Icon={CarpetIcon} label="Alfombras">
            {yesOrNot(product.carpets)}
          </SpecRow>
          <SpecRow Icon={SmallFlatIcon} label="Piso pequeño">
            {yesOrNot(product.small_flat)}
          </SpecRow>
        </dl>
      </section>

      <nav aria-label="Seguir leyendo" className="mt-8 grid gap-3 sm:grid-cols-3">
        <Link
          href={`/comparar?a=${product.slug}`}
          className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 text-sm font-medium text-stone-800 hover:border-teal-600 hover:text-teal-800"
        >
          <CompareIcon className="h-5 w-5 shrink-0 text-teal-700" />
          Comparar con otro modelo
        </Link>
        <Link
          href={`/guias/${guideSlug}`}
          className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 text-sm font-medium text-stone-800 hover:border-teal-600 hover:text-teal-800"
        >
          <ArrowRightIcon className="h-5 w-5 shrink-0 text-teal-700" />
          {GUIDE_META[guideSlug].title}
        </Link>
        {product.brands ? (
          <Link
            href={`/marcas/${product.brands.slug}`}
            className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 text-sm font-medium text-stone-800 hover:border-teal-600 hover:text-teal-800"
          >
            <ArrowRightIcon className="h-5 w-5 shrink-0 text-teal-700" />
            Más de {product.brands.name}
          </Link>
        ) : null}
      </nav>

      <section className="mt-10 rounded-3xl border border-stone-200 bg-gradient-to-br from-white to-teal-50 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-stone-900">Colores</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {variants.map((variant) => (
            <li key={`${variant.color}-${variant.asin}`}>
              <a
                href={amazonProductUrl(variant.asin)}
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-800 hover:border-teal-700 hover:text-teal-800"
              >
                {variant.color} en Amazon
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-600">
            La disponibilidad y las condiciones se consultan en Amazon.
          </p>
          <a
            href={amazonUrl}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-800 px-6 py-3 text-sm font-medium text-white hover:bg-teal-900"
          >
            Ver en Amazon
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
