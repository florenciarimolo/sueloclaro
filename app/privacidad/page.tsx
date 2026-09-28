import type { Metadata } from "next";
import { JsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getSiteUrl, SITE_OWNER } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Política de privacidad de SueloClaro.",
  alternates: {
    canonical: "/privacidad",
  },
};

export default function PrivacidadPage() {
  const origin = getSiteUrl();
  return (
    <main className="max-w-2xl">
      <JsonLd
        data={webPageJsonLd({
          name: "Privacidad | SueloClaro",
          description: "Política de privacidad de SueloClaro.",
          path: "/privacidad",
          origin,
        })}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        Privacidad
      </h1>
      <div className="mt-4 space-y-4 text-stone-700">
        <p>
          SueloClaro no crea cuentas de usuario, no guarda favoritos y no pide
          un formulario de contacto en esta versión. Las fichas se leen de la
          base propia del sitio.
        </p>
        <p>
          No se rastrea el importe de un producto ni se envían avisos cuando
          cambia en Amazon. Si más adelante se usan cookies o una herramienta de
          medición, se actualizará esta página antes de activarlas.
        </p>
        <p>
          Al pulsar «Ver en Amazon» sales de SueloClaro y aplican las políticas
          de Amazon.es. El alojamiento del sitio puede registrar datos técnicos
          habituales (por ejemplo la dirección IP) para servir las páginas.
        </p>
        <p>
          Responsable: {SITE_OWNER.name}. NIF: {SITE_OWNER.nif}. Domicilio:{" "}
          {SITE_OWNER.address}. Correo:{" "}
          <a href={`mailto:${SITE_OWNER.email}`} className="text-teal-800 hover:underline">
            {SITE_OWNER.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
