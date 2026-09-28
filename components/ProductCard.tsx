import Link from "next/link";
import type { ProductWithBrand } from "@/lib/database.types";
import { formatDock, formatSuction } from "@/lib/format";
import { DockIcon, SuctionIcon } from "./icons";
import { FeatureBadges } from "./FeatureBadges";
import { RobotSchematic } from "./RobotSchematic";

export function ProductCard({ product }: { product: ProductWithBrand }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:shadow-md">
      <div className="bg-gradient-to-b from-stone-50 to-white px-6 pt-5">
        <RobotSchematic dock={product.dock} className="mx-auto h-28 w-auto" />
      </div>
      <div className="flex flex-1 flex-col p-5 pt-3">
        <p className="text-xs font-medium uppercase tracking-wider text-teal-800">
          {product.brands?.name}
        </p>
        <h2 className="mt-1 text-lg font-semibold leading-snug text-stone-900">
          <Link
            href={`/robots/${product.slug}`}
            className="after:absolute after:inset-0 group-hover:text-teal-800"
          >
            {product.name}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 text-sm text-stone-600">{product.summary}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-stone-100 pt-4 text-sm">
          <div className="flex items-start gap-2">
            <SuctionIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
            <div>
              <dt className="text-xs text-stone-500">Succión</dt>
              <dd className="font-medium text-stone-800">{formatSuction(product.pa_suction)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <DockIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
            <div>
              <dt className="text-xs text-stone-500">Base</dt>
              <dd className="font-medium text-stone-800">{formatDock(product.dock)}</dd>
            </div>
          </div>
        </dl>
        <FeatureBadges product={product} className="mt-4" />
      </div>
    </article>
  );
}
