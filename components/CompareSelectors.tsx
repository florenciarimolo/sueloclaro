"use client";

import { useRouter } from "next/navigation";

type Option = { slug: string; name: string };

type Props = {
  products: Option[];
  a?: string;
  b?: string;
};

export function CompareSelectors({ products, a, b }: Props) {
  const router = useRouter();

  function update(nextA: string, nextB: string) {
    const params = new URLSearchParams();
    if (nextA) params.set("a", nextA);
    if (nextB) params.set("b", nextB);
    const query = params.toString();
    router.push(query ? `/comparar?${query}` : "/comparar");
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block text-sm">
        <span className="text-stone-600">Modelo A</span>
        <select
          value={a ?? ""}
          onChange={(event) => update(event.target.value, b ?? "")}
          className="mt-1 w-full rounded border border-stone-300 bg-white px-2 py-2"
        >
          <option value="">Elige un modelo</option>
          {products.map((product) => (
            <option key={product.slug} value={product.slug}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-stone-600">Modelo B</span>
        <select
          value={b ?? ""}
          onChange={(event) => update(a ?? "", event.target.value)}
          className="mt-1 w-full rounded border border-stone-300 bg-white px-2 py-2"
        >
          <option value="">Elige un modelo</option>
          {products.map((product) => (
            <option key={product.slug} value={product.slug}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
