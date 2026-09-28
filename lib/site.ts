const DEFAULT_SITE_URL = "https://sueloclaro.com";

export const SITE_OWNER = {
  name: "Florencia Rímolo Figueira",
  nif: "49931843Q",
  address: "Carrer del Drac 2, 08911 Badalona",
  email: "info@sueloclaro.com",
  domain: "sueloclaro.com",
} as const;

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
