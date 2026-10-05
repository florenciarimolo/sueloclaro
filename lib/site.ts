const CANONICAL_ORIGIN = "https://www.sueloclaro.com";

export const SITE_OWNER = {
  name: "Florencia Rímolo Figueira",
  nif: "49931843Q",
  address: "Carrer del Drac 2, 08911 Badalona",
  email: "info@sueloclaro.com",
  domain: "sueloclaro.com",
} as const;

export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || CANONICAL_ORIGIN).replace(/\/$/, "");
  // El apex responde 308 hacia www. Una canónica en el apex no se puede indexar.
  if (raw === "https://sueloclaro.com" || raw === "http://sueloclaro.com") {
    return CANONICAL_ORIGIN;
  }
  return raw;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
