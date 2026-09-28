type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(
  items: BreadcrumbItem[],
  origin: string,
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function webPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  origin: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: `${input.origin}${input.path === "/" ? "" : input.path}`,
    inLanguage: "es-ES",
  };
}

export function articleJsonLd(input: {
  name: string;
  description: string;
  path: string;
  origin: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.name,
    description: input.description,
    url: `${input.origin}${input.path === "/" ? "" : input.path}`,
    inLanguage: "es-ES",
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
