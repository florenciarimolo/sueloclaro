import Link from "next/link";
import type { Metadata } from "next";
import { CompareSelectors } from "@/components/CompareSelectors";
import { RobotSchematic } from "@/components/RobotSchematic";
import type { ProductWithBrand } from "@/lib/database.types";
import {
  formatDock,
  formatHeight,
  formatSuction,
  formatYesNo,
} from "@/lib/format";
import { breadcrumbJsonLd, JsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getProductsBySlugs, getProductsForCompare } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

type SearchParams = Promise<{ a?: string; b?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const hasPair = Boolean(params.a || params.b);
  return {
    title: "Comparar robots",
    description:
      "Compara la ficha técnica de dos robots aspiradores publicados en SueloClaro.",
    alternates: {
      canonical: "/comparar",
    },
    robots: hasPair ? { index: false, follow: true } : undefined,
  };
}

function cell(product: ProductWithBrand | undefined, value: string) {
  if (!product) return "—";
  return value;
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const options = await getProductsForCompare();
  const selected = [params.a, params.b].filter(
    (slug): slug is string => Boolean(slug),
  );
  const products = await getProductsBySlugs(selected);
  const bySlug = new Map(products.map((product) => [product.slug, product]));
  const left = params.a ? bySlug.get(params.a) : undefined;
  const right = params.b ? bySlug.get(params.b) : undefined;
  const origin = getSiteUrl();

  const rows: { label: string; a: string; b: string }[] = [
    {
      label: "Succión",
      a: cell(left, left ? formatSuction(left.pa_suction) : ""),
      b: cell(right, right ? formatSuction(right.pa_suction) : ""),
    },
    {
      label: "Navegación",
      a: cell(left, left?.navigation ?? ""),
      b: cell(right, right?.navigation ?? ""),
    },
    {
      label: "Mopa",
      a: cell(left, left?.mop_type ?? ""),
      b: cell(right, right?.mop_type ?? ""),
    },
    {
      label: "Base",
      a: cell(left, left ? formatDock(left.dock) : ""),
      b: cell(right, right ? formatDock(right.dock) : ""),
    },
    {
      label: "Mascotas",
      a: cell(left, left ? formatYesNo(left.pet_hair) : ""),
      b: cell(right, right ? formatYesNo(right.pet_hair) : ""),
    },
    {
      label: "Alfombras",
      a: cell(left, left ? formatYesNo(left.carpets) : ""),
      b: cell(right, right ? formatYesNo(right.carpets) : ""),
    },
    {
      label: "Piso pequeño",
      a: cell(left, left ? formatYesNo(left.small_flat) : ""),
      b: cell(right, right ? formatYesNo(right.small_flat) : ""),
    },
    {
      label: "Altura",
      a: cell(left, left ? formatHeight(left.height_mm) : ""),
      b: cell(right, right ? formatHeight(right.height_mm) : ""),
    },
  ];

  return (
    <main>
      <JsonLd
        data={[
          webPageJsonLd({
            name: "Comparar robots | SueloClaro",
            description:
              "Compara la ficha técnica de dos robots aspiradores publicados.",
            path: "/comparar",
            origin,
          }),
          breadcrumbJsonLd(
            [
              { name: "Inicio", path: "/" },
              { name: "Comparar", path: "/comparar" },
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
            Comparar
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        Comparar robots
      </h1>
      <p className="mt-3 text-stone-700">
        Elige dos modelos publicados. La tabla sale de sus fichas técnicas. No
        compara precios.
      </p>

      <div className="mt-6">
        <CompareSelectors products={options} a={params.a} b={params.b} />
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200">
              <th className="w-40 px-5 py-4 align-bottom font-medium text-stone-500">Campo</th>
              {[left, right].map((product, index) => (
                <th key={index} className="px-5 py-4 align-bottom font-medium text-stone-900">
                  {product ? (
                    <>
                      <RobotSchematic dock={product.dock} className="mb-3 h-20 w-auto" />
                      <span className="block text-xs font-medium uppercase tracking-wider text-teal-800">
                        {product.brands?.name}
                      </span>
                      <Link
                        href={`/robots/${product.slug}`}
                        className="text-base font-semibold hover:text-teal-800"
                      >
                        {product.name}
                      </Link>
                    </>
                  ) : (
                    <span className="flex h-20 items-end text-stone-400">
                      {index === 0 ? "Modelo A" : "Modelo B"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-stone-100 align-top last:border-0 even:bg-stone-50/60">
                <th className="px-5 py-3 font-medium text-stone-500">{row.label}</th>
                <td className="px-5 py-3 text-stone-800">{row.a}</td>
                <td className="px-5 py-3 text-stone-800">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
