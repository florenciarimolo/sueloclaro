import Link from "next/link";
import type { DockKind } from "@/lib/database.types";

type Props = {
  brands: { slug: string; name: string }[];
  current: {
    marca?: string;
    mascotas?: string;
    alfombras?: string;
    base?: string;
    piso?: string;
  };
};

function buildHref(current: Props["current"], patch: Record<string, string | undefined>) {
  const next = { ...current, ...patch };
  const params = new URLSearchParams();
  if (next.marca) params.set("marca", next.marca);
  if (next.mascotas === "1") params.set("mascotas", "1");
  if (next.alfombras === "1") params.set("alfombras", "1");
  if (next.piso === "1") params.set("piso", "1");
  if (next.base) params.set("base", next.base);
  const query = params.toString();
  return query ? `/robots?${query}` : "/robots";
}

const dockOptions: { value: DockKind | ""; label: string }[] = [
  { value: "", label: "Cualquier base" },
  { value: "wash_dry", label: "Vacía, lava y seca" },
  { value: "none", label: "Solo carga" },
];

export function RobotFilters({ brands, current }: Props) {
  return (
    <form className="rounded-2xl border border-stone-200 bg-white p-5" method="get">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        <label className="block text-sm">
          <span className="text-stone-600">Marca</span>
          <select
            name="marca"
            defaultValue={current.marca ?? ""}
            className="mt-1 w-full rounded border border-stone-300 bg-white px-2 py-2"
          >
            <option value="">Todas</option>
            {brands.map((brand) => (
              <option key={brand.slug} value={brand.slug}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-stone-600">Tipo de base</span>
          <select
            name="base"
            defaultValue={current.base ?? ""}
            className="mt-1 w-full rounded border border-stone-300 bg-white px-2 py-2"
          >
            {dockOptions.map((option) => (
              <option key={option.value || "any"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            name="mascotas"
            value="1"
            defaultChecked={current.mascotas === "1"}
            className="size-4 rounded border-stone-300"
          />
          Apto para pelo de mascota
        </label>
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            name="alfombras"
            value="1"
            defaultChecked={current.alfombras === "1"}
            className="size-4 rounded border-stone-300"
          />
          Apto para alfombras
        </label>
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            name="piso"
            value="1"
            defaultChecked={current.piso === "1"}
            className="size-4 rounded border-stone-300"
          />
          Piso pequeño
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded bg-teal-800 px-4 py-2 text-sm font-medium text-white hover:bg-teal-900"
        >
          Filtrar
        </button>
        <Link href={buildHref({}, {})} className="rounded px-4 py-2 text-sm text-stone-600 hover:text-teal-800">
          Limpiar
        </Link>
      </div>
    </form>
  );
}
