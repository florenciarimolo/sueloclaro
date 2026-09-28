import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { breadcrumbJsonLd, JsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getBrandBySlug, getBrands, getProducts } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

type Props = PageProps<"/marcas/[slug]">;

export async function generateStaticParams() {
  try {
    const brands = await getBrands();
    return brands.map((brand) => ({ slug: brand.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: "Marca no encontrada" };
  return {
    title: `Robots ${brand.name}`,
    description: `Fichas de robots aspiradores ${brand.name} de gama media en SueloClaro.`,
    alternates: {
      canonical: `/marcas/${brand.slug}`,
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) notFound();

  const products = await getProducts({ brand: brand.slug });
  const origin = getSiteUrl();

  return (
    <main>
      <JsonLd
        data={[
          webPageJsonLd({
            name: `Robots ${brand.name} | SueloClaro`,
            description: `Fichas de robots aspiradores ${brand.name} de gama media.`,
            path: `/marcas/${brand.slug}`,
            origin,
          }),
          breadcrumbJsonLd(
            [
              { name: "Inicio", path: "/" },
              { name: "Marcas", path: "/marcas" },
              { name: brand.name, path: `/marcas/${brand.slug}` },
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
          <li>
            <Link href="/marcas" className="hover:text-teal-800">
              Marcas
            </Link>
            <span aria-hidden="true"> / </span>
          </li>
          <li aria-current="page" className="text-stone-700">
            {brand.name}
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        Robots {brand.name}
      </h1>
      <p className="mt-3 text-stone-700">
        Modelos {brand.name} de gama media.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  );
}
