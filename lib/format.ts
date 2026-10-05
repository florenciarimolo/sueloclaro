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
    listingHref: "/robots?piso=1",
  },
};

export function productSearchTitle(name: string): string {
  return `${name}: para quién es`;
}

export function clipMetaDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim();
  return `${trimmed}…`;
}

export function productMetaDescription(product: {
  summary: string;
  for_whom: string;
}): string {
  return clipMetaDescription(`${product.summary} ${product.for_whom}`);
}

export const GUIDE_FAQ: Record<GuideSlug, { question: string; answer: string }[]> = {
  "como-elegir-robot-aspirador-gama-media": [
    {
      question: "¿Qué miro primero al elegir un robot aspirador de gama media?",
      answer:
        "La base, no la cifra de succión. Solo carga, autovaciado, o una estación que vacía, lava y seca cambian el trabajo diario más que unos miles de pascales.",
    },
    {
      question: "¿Los robots de esta gama aspiran y friegan?",
      answer:
        "Los Roborock, Dreame y Xiaomi de este catálogo, entre 250 y 600 euros, aspiran y friegan. La diferencia está en la base, el pelo, las alfombras y la altura.",
    },
  ],
  "robot-aspirador-con-mascotas": [
    {
      question: "¿Qué robot aspirador sirve si hay pelo de perro o gato?",
      answer:
        "Uno con cepillo que no trence el pelo, base que vacíe el depósito y mopa que se levante en la alfombra. Un modo llamado mascotas no sustituye esas tres cosas.",
    },
    {
      question: "¿Hace falta mucha succión por el pelo de mascota?",
      answer:
        "Ayuda en alfombra, pero un cepillo que se empasta no se arregla con unos miles de pascales más. En el catálogo hay modelos de pelo desde 10.000 Pa.",
    },
  ],
  "robot-aspirador-alfombras": [
    {
      question: "¿Un robot aspirador puede fregar si hay alfombras?",
      answer:
        "Sí, si levanta la mopa al detectarlas. Si la mopa sigue húmeda sobre el tejido, deja una franja oscura.",
    },
    {
      question: "¿Más pascales significan mejor resultado en alfombra?",
      answer:
        "La alfombra pide más succión que la baldosa, pero una mopa que no se levanta estropea el resultado aunque la succión sea alta.",
    },
  ],
  "robot-aspirador-piso-pequeno": [
    {
      question: "¿Cabe la estación de un robot aspirador en un piso pequeño?",
      answer:
        "A menudo no. Una torre que vacía, lava y seca necesita ancho, alto y un enchufe. Si el hueco no da, un modelo que solo se carga ocupa menos.",
    },
    {
      question: "¿Qué modelo del catálogo está pensado para poco espacio?",
      answer:
        "El Dreame L10s Pro Gen 3. Solo vuelve a cargarse y está marcado para piso pequeño. Mide 97 mm de alto.",
    },
  ],
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
