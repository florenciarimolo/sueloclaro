import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { RobotFilters } from "@/components/RobotFilters";
import type { DockKind } from "@/lib/database.types";
import { JsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getBrands, getProducts } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Robots aspiradores",
  description:
    "Listado de robots aspiradores Roborock, Dreame y Xiaomi de gama media, filtrable por marca, mascotas, alfombras y tipo de base.",
  alternates: {
    canonical: "/robots",
  },
};

type SearchParams = Promise<{
  marca?: string;
  mascotas?: string;
  alfombras?: string;
  piso?: string;
  base?: string;
}>;

function parseDock(value?: string): DockKind | undefined {
  if (value === "none" || value === "empty" || value === "wash_dry") return value;
  return undefined;
}

export default async function RobotsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const brands = await getBrands();
  const brandSlugs = new Set(brands.map((brand) => brand.slug));
  const marca =
    params.marca && brandSlugs.has(params.marca) ? params.marca : undefined;
  const dock = parseDock(params.base);
  const products = await getProducts({
    brand: marca,
    pet_hair: params.mascotas === "1" ? true : undefined,
    carpets: params.alfombras === "1" ? true : undefined,
    small_flat: params.piso === "1" ? true : undefined,
    dock,
  });
  const origin = getSiteUrl();

  return (
    <main>
      <JsonLd
        data={webPageJsonLd({
          name: "Robots aspiradores | SueloClaro",
          description:
            "Listado de robots aspiradores Roborock, Dreame y Xiaomi de gama media.",
          path: "/robots",
          origin,
        })}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        Robots aspiradores
      </h1>
      <p className="mt-3 text-stone-700">
        Robots aspiradores de Roborock, Dreame y Xiaomi. Filtra por marca,
        mascotas, alfombras, piso pequeño o tipo de base. En este catálogo no
        hay un modelo que solo autovacíe.
      </p>
      <div className="mt-6">
        <RobotFilters
          brands={brands}
          current={{
            marca,
            mascotas: params.mascotas === "1" ? "1" : undefined,
            alfombras: params.alfombras === "1" ? "1" : undefined,
            piso: params.piso === "1" ? "1" : undefined,
            base: dock,
          }}
        />
      </div>
      <p className="mt-4 text-sm text-stone-500">
        {`${products.length} modelo${products.length === 1 ? "" : "s"}`}
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      {products.length === 0 ? (
        <p className="mt-6 text-stone-600">
          No hay modelos con esos filtros. Prueba a quitar alguno.
        </p>
      ) : null}
    </main>
  );
}
