import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { ProductCard } from "@/components/ProductCard";
import {
  GUIDE_FILTERS,
  GUIDE_META,
  GUIDE_SLUGS,
  type GuideSlug,
} from "@/lib/format";
import { articleJsonLd, breadcrumbJsonLd, JsonLd } from "@/lib/json-ld";
import { publishedSpan } from "@/lib/decision";
import { getProducts } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

type Props = PageProps<"/guias/[slug]">;

function isGuideSlug(slug: string): slug is GuideSlug {
  return (GUIDE_SLUGS as readonly string[]).includes(slug);
}

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isGuideSlug(slug)) return { title: "Guía no encontrada" };
  const meta = GUIDE_META[slug];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/guias/${slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  if (!isGuideSlug(slug)) notFound();

  const meta = GUIDE_META[slug];
  const origin = getSiteUrl();
  const related = await getProducts(GUIDE_FILTERS[slug]);
  const span = publishedSpan(related);

  return (
    <main className="max-w-2xl">
      <JsonLd
        data={[
          articleJsonLd({
            name: meta.title,
            description: meta.description,
            path: `/guias/${slug}`,
            origin,
          }),
          breadcrumbJsonLd(
            [
              { name: "Inicio", path: "/" },
              { name: meta.title, path: `/guias/${slug}` },
            ],
            origin,
          ),
        ]}
      />

      <nav aria-label="Migas" className="mb-4 text-sm text-stone-500">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-teal-800">
              Inicio
            </Link>
            <span aria-hidden="true"> / </span>
          </li>
          <li aria-current="page" className="text-stone-700">
            {meta.title}
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        {meta.title}
      </h1>
      <p className="mt-3 text-stone-600">{meta.description}</p>

      <div className="mt-6">
        <GuideArticle slug={slug} />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-stone-900">
          Modelos publicados que encajan
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          {span ? `${span} ` : null}
          La lista sale de los robots publicados ahora mismo. Si un modelo
          pasa a borrador, deja de aparecer aquí.
        </p>
        {related.length === 0 ? (
          <p className="mt-4 text-stone-600">
            No hay modelos publicados con este criterio.
          </p>
        ) : (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {related.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
        {meta.listingHref ? (
          <p className="mt-6">
            <Link
              href={meta.listingHref}
              className="font-medium text-teal-800 hover:underline"
            >
              Ver el listado
            </Link>
            {" · "}
            <Link href="/comparar" className="font-medium text-teal-800 hover:underline">
              Comparar dos fichas
            </Link>
          </p>
        ) : null}
      </section>
    </main>
  );
}
