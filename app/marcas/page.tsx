import Link from "next/link";
import type { Metadata } from "next";
import { breadcrumbJsonLd, JsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getBrands, getProducts } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marcas de robots aspiradores",
  description:
    "Robots aspiradores Roborock, Dreame y Xiaomi de gama media, entre 250 y 600 euros.",
  alternates: {
    canonical: "/marcas",
  },
};

export default async function BrandsPage() {
  const [brands, products] = await Promise.all([getBrands(), getProducts()]);
  const origin = getSiteUrl();

  return (
    <main>
      <JsonLd
        data={[
          webPageJsonLd({
            name: "Marcas de robots aspiradores | SueloClaro",
            description:
              "Robots aspiradores Roborock, Dreame y Xiaomi de gama media, entre 250 y 600 euros.",
            path: "/marcas",
            origin,
          }),
          breadcrumbJsonLd(
            [
              { name: "Inicio", path: "/" },
              { name: "Marcas", path: "/marcas" },
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
            Marcas
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        Marcas de robots aspiradores
      </h1>
      <p className="mt-3 max-w-2xl text-stone-700">
        Roborock, Dreame y Xiaomi, entre 250 y 600 euros. Cada marca abre sus modelos.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {brands.map((brand) => {
          const count = products.filter((product) => product.brands?.slug === brand.slug).length;
          return (
            <li key={brand.slug}>
              <Link
                href={`/marcas/${brand.slug}`}
                className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 hover:border-teal-600"
              >
                <span className="text-lg font-semibold text-stone-900">{brand.name}</span>
                <span className="mt-1 text-sm text-stone-600">
                  {`${count} modelo${count === 1 ? "" : "s"}`}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
