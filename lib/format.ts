import type { DockKind } from "@/lib/database.types";

export function formatSuction(pa: number): string {
  return `${pa.toLocaleString("es-ES", { useGrouping: "always" })} Pa`;
}

export function formatHeight(heightMm: number | null): string {
  if (heightMm == null) return "No consta";
  return `${heightMm} mm`;
}

export function formatDock(dock: DockKind): string {
  switch (dock) {
    case "none":
      return "Solo carga";
    case "empty":
      return "Autovaciado";
    case "wash_dry":
      return "Vacía, lava y seca";
  }
}

export function formatYesNo(value: boolean): string {
  return value ? "Sí" : "No";
}

export const GUIDE_SLUGS = [
  "como-elegir-robot-aspirador-gama-media",
  "robot-aspirador-con-mascotas",
  "robot-aspirador-alfombras",
  "robot-aspirador-piso-pequeno",
] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export const GUIDE_FILTERS: Record<
  GuideSlug,
  { pet_hair?: boolean; carpets?: boolean; small_flat?: boolean }
> = {
  "como-elegir-robot-aspirador-gama-media": {},
  "robot-aspirador-con-mascotas": { pet_hair: true },
  "robot-aspirador-alfombras": { carpets: true },
  "robot-aspirador-piso-pequeno": { small_flat: true },
};

export const GUIDE_META: Record<
  GuideSlug,
  { title: string; description: string; listingHref?: string }
> = {
  "como-elegir-robot-aspirador-gama-media": {
    title: "Cómo elegir un robot aspirador de gama media",
    description:
      "Criterios para elegir un robot aspirador Roborock, Dreame o Xiaomi entre 250 y 600 euros.",
    listingHref: "/robots",
  },
  "robot-aspirador-con-mascotas": {
    title: "Robot aspirador para pelo de mascota",
    description:
      "Qué mirar en un robot aspirador de gama media si hay pelo de mascota en casa.",
    listingHref: "/robots?mascotas=1",
  },
  "robot-aspirador-alfombras": {
    title: "Robot aspirador para alfombras",
    description:
      "Qué mirar en un robot aspirador de gama media si hay alfombras en casa.",
    listingHref: "/robots?alfombras=1",
  },
  "robot-aspirador-piso-pequeno": {
    title: "Robot aspirador para piso pequeño",
    description:
      "Qué mirar en un robot aspirador de gama media si el piso es pequeño o mediano.",
    listingHref: "/robots",
  },
};

export function relatedGuideForProduct(flags: {
  pet_hair: boolean;
  carpets: boolean;
  small_flat: boolean;
}): GuideSlug {
  if (flags.pet_hair) return "robot-aspirador-con-mascotas";
  if (flags.carpets) return "robot-aspirador-alfombras";
  if (flags.small_flat) return "robot-aspirador-piso-pequeno";
  return "como-elegir-robot-aspirador-gama-media";
}
