export function amazonProductUrl(asin: string, affiliateTag?: string): string {
  const url = `https://www.amazon.es/dp/${asin}`;
  const tag = (affiliateTag ?? process.env.AFFILIATE_TAG ?? "").trim();
  if (!tag) return url;
  return `${url}?tag=${encodeURIComponent(tag)}`;
}
