import type { MetadataRoute } from "next";
import { GUIDE_SLUGS } from "@/lib/format";
import { getBrands, getProductSlugs } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteUrl();
  const [slugs, brands] = await Promise.all([
    getProductSlugs().catch(() => [] as string[]),
    getBrands().catch(() => [] as { slug: string }[]),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: origin, changeFrequency: "weekly", priority: 1 },
    { url: `${origin}/robots`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${origin}/comparar`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${origin}/marcas`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${origin}/afiliacion`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${origin}/aviso-legal`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${origin}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productRoutes = slugs.map((slug) => ({
    url: `${origin}/robots/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const brandRoutes = brands.map((brand) => ({
    url: `${origin}/marcas/${brand.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const guideRoutes = GUIDE_SLUGS.map((slug) => ({
    url: `${origin}/guias/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...brandRoutes, ...guideRoutes];
}
