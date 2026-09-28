import type { Product } from "@/lib/database.types";
import { CarpetIcon, PetIcon, SmallFlatIcon } from "./icons";

type Flags = Pick<Product, "pet_hair" | "carpets" | "small_flat">;

export function FeatureBadges({
  product,
  className = "",
}: {
  product: Flags;
  className?: string;
}) {
  const badges = [
    product.pet_hair && { label: "Mascotas", Icon: PetIcon },
    product.carpets && { label: "Alfombras", Icon: CarpetIcon },
    product.small_flat && { label: "Piso pequeño", Icon: SmallFlatIcon },
  ].filter(Boolean) as { label: string; Icon: typeof PetIcon }[];

  if (badges.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Indicado para">
      {badges.map(({ label, Icon }) => (
        <li
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-900"
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </li>
      ))}
    </ul>
  );
}
