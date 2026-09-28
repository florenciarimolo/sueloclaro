import type { Metadata } from "next";
import { JsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getSiteUrl, SITE_OWNER } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal de SueloClaro conforme a la LSSI.",
  alternates: {
    canonical: "/aviso-legal",
  },
};

export default function AvisoLegalPage() {
  const origin = getSiteUrl();
  return (
    <main className="max-w-2xl">
      <JsonLd
        data={webPageJsonLd({
          name: "Aviso legal | SueloClaro",
          description: "Aviso legal de SueloClaro.",
          path: "/aviso-legal",
          origin,
        })}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        Aviso legal
      </h1>
      <div className="mt-4 space-y-4 text-stone-700">
        <p>
          SueloClaro es un catálogo informativo de robots aspiradores de gama
          media. No es una tienda: no vende productos ni compara importes entre
          comercios. Los únicos enlaces de compra apuntan a Amazon.es.
        </p>
        <p>
          Titular: {SITE_OWNER.name}. NIF: {SITE_OWNER.nif}. Domicilio:{" "}
          {SITE_OWNER.address}. Correo:{" "}
          <a href={`mailto:${SITE_OWNER.email}`} className="text-teal-800 hover:underline">
            {SITE_OWNER.email}
          </a>
          . Sitio web: {origin}.
        </p>
        <p>
          Las fichas y las guías son texto propio de SueloClaro. Las
          especificaciones y la disponibilidad en Amazon.es pueden cambiar. Esta
          web no hace seguimiento de importes ni envía avisos cuando un dato
          cambia en Amazon.
        </p>
      </div>
    </main>
  );
}
