import type { Metadata } from "next";
import { JsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Afiliación",
  description:
    "Los enlaces de SueloClaro a Amazon podrán ser de afiliado. Eso no cambia el importe que pagas al comprar.",
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
          SueloClaro enlaza solo a fichas de producto en Amazon.es, con el
          patrón https://www.amazon.es/dp/ y el ASIN del modelo. Hoy esos
          enlaces no llevan etiqueta de afiliado.
        </p>
        <p>
          Cuando el sitio forme parte del programa de afiliados de Amazon, los
          enlaces a Amazon podrán ser de afiliado. Eso no cambia el precio para
          quien compra.
        </p>
        <p>
          SueloClaro no muestra importes en la web mientras no haya datos de
          la API de Amazon autorizada. No usa otras redes de afiliación ni
          enlaza a otras tiendas.
        </p>
      </div>
    </main>
  );
}
