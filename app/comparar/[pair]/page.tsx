import Link from "next/link";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { RobotSchematic } from "@/components/RobotSchematic";
import type { ProductWithBrand } from "@/lib/database.types";
import {
  formatDock,
  formatHeight,
  formatSuction,
  formatYesNo,
} from "@/lib/format";
import { breadcrumbJsonLd, JsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getProductSlugs, getProductsBySlugs } from "@/lib/queries";
import { matchSiblingPair, pairPath, pairResolution, publishedPairSegments } from "@/lib/sibling-pairs";
import { getSiteUrl } from "@/lib/site";

type Props = PageProps<"/comparar/[pair]">;

export const dynamicParams = true;

function pairTitle(left: ProductWithBrand, right: ProductWithBrand) {
  return `${left.name} o ${right.name}`;
}

function pairDescription(left: ProductWithBrand, right: ProductWithBrand) {
  return `En qué se diferencian ${left.name} y ${right.name}, y para qué casa encaja cada uno.`;
}

function differenceLines(left: ProductWithBrand, right: ProductWithBrand): string[] {
  const lines: string[] = [];

  if (left.pa_suction !== right.pa_suction) {
    lines.push(
      `La succión anunciada no coincide: ${left.name} figura con ${formatSuction(left.pa_suction)} y ${right.name} con ${formatSuction(right.pa_suction)}.`,
    );
  }
  if (left.navigation !== right.navigation) {
    lines.push(
      `La navegación es distinta. ${left.name}: ${left.navigation}. ${right.name}: ${right.navigation}.`,
    );
  }
  if (left.mop_type !== right.mop_type) {
    lines.push(`La mopa cambia. ${left.name}: ${left.mop_type}. ${right.name}: ${right.mop_type}.`);
  }
  if (left.dock !== right.dock) {
    lines.push(
      `La base no es la misma: ${left.name} tiene ${formatDock(left.dock).toLowerCase()} y ${right.name} tiene ${formatDock(right.dock).toLowerCase()}.`,
    );
  }

  const flags: { label: string; left: boolean; right: boolean }[] = [
    { label: "pelo de mascota", left: left.pet_hair, right: right.pet_hair },
    { label: "alfombras", left: left.carpets, right: right.carpets },
    { label: "piso pequeño", left: left.small_flat, right: right.small_flat },
  ];
  for (const flag of flags) {
    if (flag.left === flag.right) continue;
    const marked = flag.left ? left.name : right.name;
    const unmarked = flag.left ? right.name : left.name;
    lines.push(
      `${marked} está marcado para ${flag.label}. ${unmarked} deja ese criterio sin marcar.`,
    );
  }

  if (left.height_mm !== right.height_mm) {
    lines.push(
      `La altura del cuerpo: ${left.name}, ${formatHeight(left.height_mm)}; ${right.name}, ${formatHeight(right.height_mm)}.`,
    );
  }

  return lines;
}

async function loadPair(segment: string) {
  const match = matchSiblingPair(segment);
  if (!match) notFound();

  const products = await getProductsBySlugs([match.slugA, match.slugB]);
  const resolution = pairResolution(
    segment,
    products.map((product) => product.slug),
  );
  if (resolution.action === "not-found") notFound();
  if (resolution.action === "redirect") permanentRedirect(resolution.path);

  const left = products.find((product) => product.slug === resolution.slugA);
  const right = products.find((product) => product.slug === resolution.slugB);
  if (!left || !right) notFound();
  return { left, right };
}

export async function generateStaticParams() {
  try {
    const slugs = await getProductSlugs();
    return publishedPairSegments(slugs).map((pair) => ({ pair }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const { left, right } = await loadPair(pair);
  return {
    title: pairTitle(left, right),
    description: pairDescription(left, right),
    alternates: {
      canonical: pairPath(left.slug, right.slug),
    },
  };
}

export default async function SiblingComparePage({ params }: Props) {
  const { pair } = await params;
  const { left, right } = await loadPair(pair);
  const origin = getSiteUrl();
  const path = pairPath(left.slug, right.slug);
  const title = pairTitle(left, right);
  const description = pairDescription(left, right);
  const lines = differenceLines(left, right);

  const rows: { label: string; a: string; b: string }[] = [
    { label: "Succión", a: formatSuction(left.pa_suction), b: formatSuction(right.pa_suction) },
    { label: "Navegación", a: left.navigation, b: right.navigation },
    { label: "Mopa", a: left.mop_type, b: right.mop_type },
    { label: "Base", a: formatDock(left.dock), b: formatDock(right.dock) },
    { label: "Mascotas", a: formatYesNo(left.pet_hair), b: formatYesNo(right.pet_hair) },
    { label: "Alfombras", a: formatYesNo(left.carpets), b: formatYesNo(right.carpets) },
    { label: "Piso pequeño", a: formatYesNo(left.small_flat), b: formatYesNo(right.small_flat) },
    { label: "Altura", a: formatHeight(left.height_mm), b: formatHeight(right.height_mm) },
  ];

  return (
    <main>
      <JsonLd
        data={[
          webPageJsonLd({
            name: `${title} | SueloClaro`,
            description,
            path,
            origin,
          }),
          breadcrumbJsonLd(
            [
              { name: "Inicio", path: "/" },
              { name: "Comparar", path: "/comparar" },
              { name: title, path },
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
            <Link href="/comparar" className="hover:text-teal-800">
              Comparar
            </Link>
            <span aria-hidden="true"> / </span>
          </li>
          <li aria-current="page" className="text-stone-700">
            {title}
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">{title}</h1>
      <p className="mt-3 text-stone-700">
        {left.name} y {right.name} se confunden porque son de la misma familia. Aquí se
        lee en qué se diferencian y para qué casa encaja cada uno, con los datos ya
        guardados en cada ficha.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-stone-900">En qué se diferencian</h2>
        {lines.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700">
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-stone-700">
            Succión, navegación, mopa, base, mascotas, alfombras, piso pequeño y altura
            coinciden. La diferencia está en para qué casa está escrito cada uno.
          </p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-stone-900">Para qué casa</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {[left, right].map((product) => (
            <article key={product.slug} className="rounded-2xl border border-stone-200 bg-white p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-teal-800">
                {product.brands?.name}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-stone-900">
                <Link href={`/robots/${product.slug}`} className="hover:text-teal-800">
                  {product.name}
                </Link>
              </h3>
              <h4 className="mt-4 text-sm font-semibold text-stone-900">Para quién es</h4>
              <p className="mt-1 text-stone-700">{product.for_whom}</p>
              <h4 className="mt-4 text-sm font-semibold text-stone-900">Para quién no</h4>
              <p className="mt-1 text-sm text-stone-600">{product.not_for_whom}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200">
              <th className="w-40 px-5 py-4 align-bottom font-medium text-stone-500">Campo</th>
              {[left, right].map((product) => (
                <th key={product.slug} className="px-5 py-4 align-bottom font-medium text-stone-900">
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
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-stone-100 align-top last:border-0 even:bg-stone-50/60"
              >
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
