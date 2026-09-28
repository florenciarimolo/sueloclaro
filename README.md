# SueloClaro

Catálogo de robots aspiradores de gama media (Roborock, Dreame y Xiaomi). Enlaza a Amazon.es con la etiqueta de afiliado. En esta versión no se muestran importes.

La base es el proyecto remoto de SueloClaro en RimoByte: `https://rnlmxwyjnlfoofcuuxsy.supabase.co`. No uses una instancia local.

El esquema está en `supabase/migrations` y los modelos en `supabase/seed.sql`. Se aplican en ese proyecto remoto.

## Variables de entorno

Copia `.env.example` a `.env.local`.

| Variable | Valor en el MVP publicable |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto remoto |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave publicable. Nunca la service role |
| `SUPABASE_SERVICE_ROLE_KEY` | Vacía en el cliente y en el despliegue público |
| `NEXT_PUBLIC_SITE_URL` | Origen canónico, por defecto `https://sueloclaro.com` |
| `AFFILIATE_TAG` | `sueloclaro-21` |
| `SHOW_PRICES` | `false` |

Con la etiqueta, el enlace es `https://www.amazon.es/dp/{ASIN}?tag=sueloclaro-21`. Si `AFFILIATE_TAG` está vacío, la URL no lleva parámetros.

```bash
npm run dev
```

Rutas públicas: `/`, `/robots`, `/robots/[slug]`, `/marcas/[slug]`, `/comparar`, `/guias/...`, `/afiliacion`, `/aviso-legal`, `/privacidad`.

## Despliegue

No se despliega desde este repositorio hasta tener dominio y cuenta de alojamiento. Pasos cuando existan:

1. Comprueba en local `npm run build` y `npm run start`.
2. Crea un proyecto Next.js en Vercel (u otro alojamiento Node) enlazado a este repositorio.
3. Define las mismas variables que `.env.example`. `AFFILIATE_TAG=sueloclaro-21`. `SHOW_PRICES=false`. No subas `SUPABASE_SERVICE_ROLE_KEY`.
4. Pon `NEXT_PUBLIC_SITE_URL` al dominio público final, sin barra al final (`https://sueloclaro.com`).
5. Asigna el dominio y espera HTTPS.
6. Abre `/sitemap.xml` y `https://sueloclaro.com/robots.txt` y comprueba que el origen coincide.
7. Comprueba en `/aviso-legal` titular, NIF, domicilio y correo.
8. La etiqueta de afiliado ya está en los enlaces. No actives `SHOW_PRICES` hasta tener la API (fase 7).

## Lista de comprobación del MVP publicable

- [ ] `AFFILIATE_TAG=sueloclaro-21` y los botones «Ver en Amazon» van a `amazon.es/dp/{ASIN}?tag=sueloclaro-21`.
- [ ] `SHOW_PRICES=false`. Ninguna ficha, guía ni JSON-LD muestra un importe ni el signo €.
- [ ] Al menos 8 fichas publicadas, 4 guías con texto propio y `/comparar` solo con modelos `published`.
- [ ] No existe `/interno/revision`, ni gráfico histórico, ni alertas, ni enlaces a otras tiendas.
- [ ] El pie y `/afiliacion` identifican el sitio como afiliado y dicen que eso no cambia el precio para quien compra.
- [ ] Sitemap, `canonical` y títulos: un title por URL, sin duplicar el canónico de la home en el resto.
- [ ] JSON-LD `Product` ausente. Guías con `Article` o fichas con `WebPage`.
- [ ] Titular, NIF, domicilio y correo en `/aviso-legal`.
- [ ] Alta de Amazon: manual, fuera del código, cuando la URL esté en internet.
