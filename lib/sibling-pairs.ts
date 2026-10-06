export const SIBLING_PAIRS = [
  ["xiaomi-robot-vacuum-x20-plus", "xiaomi-robot-vacuum-x20-max"],
  ["xiaomi-robot-vacuum-x20-plus", "xiaomi-robot-vacuum-x20-pro"],
  ["xiaomi-robot-vacuum-x20-max", "xiaomi-robot-vacuum-x20-pro"],
  ["dreame-l10s-ultra-gen-2", "dreame-l10s-ultra-gen-3"],
  ["dreame-l40-ultra-a", "dreame-l40-ultra-ae"],
  ["roborock-qrevo-s5v", "roborock-qrevo-s-pro"],
  ["roborock-qrevo-5ae", "roborock-qv-35a"],
  ["roborock-qrevo-edget", "roborock-qrevo-s5v"],
] as const;

export type SiblingSlug = (typeof SIBLING_PAIRS)[number][number];

export function pairSegment(slugA: string, slugB: string): string {
  return `${slugA}-o-${slugB}`;
}

export function pairPath(slugA: string, slugB: string): string {
  return `/comparar/${pairSegment(slugA, slugB)}`;
}

export type SiblingMatch =
  | { kind: "canonical"; slugA: string; slugB: string }
  | { kind: "inverse"; slugA: string; slugB: string };

export function matchSiblingPair(segment: string): SiblingMatch | null {
  for (const [slugA, slugB] of SIBLING_PAIRS) {
    if (segment === pairSegment(slugA, slugB)) {
      return { kind: "canonical", slugA, slugB };
    }
    if (segment === pairSegment(slugB, slugA)) {
      return { kind: "inverse", slugA, slugB };
    }
  }
  return null;
}

export type PairResolution =
  | { action: "render"; slugA: string; slugB: string }
  | { action: "redirect"; path: string }
  | { action: "not-found" };

export function pairResolution(
  segment: string,
  publishedSlugs: Iterable<string>,
): PairResolution {
  const match = matchSiblingPair(segment);
  if (!match) return { action: "not-found" };

  const published = new Set(publishedSlugs);
  if (!published.has(match.slugA) || !published.has(match.slugB)) {
    return { action: "not-found" };
  }
  if (match.kind === "inverse") {
    return { action: "redirect", path: pairPath(match.slugA, match.slugB) };
  }
  return { action: "render", slugA: match.slugA, slugB: match.slugB };
}

const pairSegments = new Set<string>();
for (const [slugA, slugB] of SIBLING_PAIRS) {
  if (slugA === slugB || slugA.includes("-o-") || slugB.includes("-o-")) {
    throw new Error(`Pareja ambigua: ${slugA} / ${slugB}`);
  }
  for (const segment of [pairSegment(slugA, slugB), pairSegment(slugB, slugA)]) {
    if (pairSegments.has(segment)) throw new Error(`Segmento repetido: ${segment}`);
    pairSegments.add(segment);
  }
}

export function publishedPairSegments(publishedSlugs: Iterable<string>): string[] {
  const published = new Set(publishedSlugs);
  return SIBLING_PAIRS.filter(([slugA, slugB]) => published.has(slugA) && published.has(slugB)).map(
    ([slugA, slugB]) => pairSegment(slugA, slugB),
  );
}

export function siblingPagesFor(
  slug: string,
  catalog: { slug: string; name: string }[],
): { href: string; title: string }[] {
  const bySlug = new Map(catalog.map((item) => [item.slug, item.name]));
  if (!bySlug.has(slug)) return [];

  return SIBLING_PAIRS.flatMap(([slugA, slugB]) => {
    if (slugA !== slug && slugB !== slug) return [];
    const nameA = bySlug.get(slugA);
    const nameB = bySlug.get(slugB);
    if (!nameA || !nameB) return [];
    return [{ href: pairPath(slugA, slugB), title: `${nameA} o ${nameB}` }];
  });
}
