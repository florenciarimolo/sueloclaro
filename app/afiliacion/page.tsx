import type { Metadata } from "next";
import { JsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Afiliación",
  description:
    "SueloClaro participa en el programa de afiliados de Amazon. Los enlaces a Amazon son de afiliado y eso no cambia el importe que pagas al comprar.",
  alternates: {
    canonical: "/afiliacion",
  },
};

export default function AfiliacionPage() {
  const origin = getSiteUrl();
  return (
    <main className="max-w-2xl">
      <JsonLd
        data={webPageJsonLd({
          name: "Afiliación | SueloClaro",
          description:
            "Información sobre los enlaces a Amazon en SueloClaro.",
          path: "/afiliacion",
          origin,
        })}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        Afiliación
      </h1>
      <div className="mt-4 space-y-4 text-stone-700">
        <p>
          SueloClaro participa en el programa de afiliados de Amazon.es. Los
          enlaces de producto van a la ficha en https://www.amazon.es/dp/ más
          el ASIN del modelo, e incluyen la etiqueta de afiliado.
        </p>
        <p>
          Esos enlaces son de afiliado. Eso no cambia el precio para quien
          compra.
        </p>
        <p>
          SueloClaro no usa otras redes de afiliación ni enlaza a otras tiendas.
        </p>
      </div>
    </main>
  );
}
