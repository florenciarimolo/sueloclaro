import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        Página no encontrada
      </h1>
      <p className="mt-3 text-stone-700">
        Esa URL no existe o el modelo ya no está publicado.
      </p>
      <p className="mt-6">
        <Link href="/robots" className="text-teal-800 hover:underline">
          Ver robots publicados
        </Link>
      </p>
    </main>
  );
}
