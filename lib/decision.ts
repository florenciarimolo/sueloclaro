import type { DockKind } from "@/lib/database.types";

type DecisionProduct = {
  slug: string;
  name: string;
  dock: DockKind;
  pet_hair: boolean;
  carpets: boolean;
  small_flat: boolean;
  pa_suction: number;
  height_mm: number | null;
  brands?: { slug: string } | null;
};

export type Alternative = {
  slug: string;
  name: string;
  reason: string;
};

export function alternativeFor(
  product: DecisionProduct,
  catalog: DecisionProduct[],
): Alternative | null {
  const others = catalog.filter((item) => item.slug !== product.slug);
  const named = (slug: string) => others.find((item) => item.slug === slug);

  if (!product.pet_hair) {
    const pet =
      others.find((item) => item.pet_hair && item.brands?.slug === product.brands?.slug) ??
      named("roborock-qrevo-s5v") ??
      others.find((item) => item.pet_hair);
    if (pet) {
      return {
        slug: pet.slug,
        name: pet.name,
        reason: "Si hay pelo de mascota, este modelo sí está pensado para eso.",
      };
    }
  }

  if (product.dock === "wash_dry") {
    const compact = named("dreame-l10s-pro-gen-3") ?? others.find((item) => item.dock === "none");
    if (compact) {
      return {
        slug: compact.slug,
        name: compact.name,
        reason:
          "Si la estación no cabe, este modelo solo vuelve a cargarse y cabe mejor en un piso pequeño.",
      };
    }
  }

  if (product.dock === "none") {
    const station =
      named("dreame-l10s-ultra-gen-2") ??
      others.find((item) => item.dock === "wash_dry" && item.pet_hair);
    if (station) {
      return {
        slug: station.slug,
        name: station.name,
        reason:
          "Si quieres que la base vacíe, lave y seque la mopa, esta estación lo hace y vale si hay pelo.",
      };
    }
  }

  return null;
}
