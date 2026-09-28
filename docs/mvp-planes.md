# Planes para ejecutar el MVP de SueloClaro

Cada bloque es un prompt cerrado. Se ejecuta en orden. El agent no empieza la fase siguiente. El documento de referencia es `docs/mvp-briefing.md`.

No crear histórico de precios, alertas, ni enlaces a otras tiendas. No inventar ASIN, precios ni GTIN. Si un dato no está en la ficha abierta ese día, se marca como pendiente y el modelo no se publica.

---

## Fase 1. Cerrar el catálogo

```text
Lee docs/mvp-briefing.md. Tu única entrega es docs/catalogo-validado.md.

Abre Amazon.es y comprueba, uno a uno, los modelos de las tablas "Verificados con ASIN" y "ASIN pendiente de confirmar". Para cada candidato anota: nombre comercial, ASIN, GTIN si la ficha lo muestra, precio que ves, si hay oferta, URL limpia https://www.amazon.es/dp/ASIN y si entra en 250–600 €.

Reglas:
- Un modelo, una ficha. El color es variante.
- Publicable solo si hoy hay oferta y el precio de esa oferta está entre 250 y 600 €. Si no hay oferta, no se publica con un precio antiguo.
- Si un candidato se sale, no lo fuerces. Busca en Roborock Qrevo, Dreame L10, L20 o L40 y Xiaomi X20 otro modelo que cumpla el criterio hasta tener 12 publicables. Mínimo aceptable: 8.
- No incluyas Lefant, genéricos, Roomba, Saros, Qrevo Curv 2 Pro ni S8 Pro Ultra.
- No copies la descripción comercial. En cada modelo escribe cinco líneas propias: para quién es, succión, navegación, mopa, qué hace la base.
- Separa "publicables" y "descartados", con el motivo del descarte.
- Cita la URL de cada ficha. No inventes precios de memoria.
```

---

## Fase 2. Proyecto y datos

```text
Lee docs/mvp-briefing.md y docs/catalogo-validado.md. Monta el esqueleto de SueloClaro.

Stack: Next.js App Router, TypeScript, Supabase. Elige el estilo más simple que ya uses en el proyecto. Si no hay proyecto, créalo en la raíz del repo.

Haz solo esto:
- Esquema de brands, products, product_variants, guides y price_snapshots, como en el briefing. No crees tabla de comparativas ni columna de días fuera de gama. price_snapshots se crea vacía y no se usa todavía. status solo admite draft y published.
- RLS: el anon puede leer filas published. La escritura queda en la service role.
- Seed solo con los modelos publicables del catálogo validado. Status published. No metas precios en la web ni en campos visibles.
- Helper de enlace a Amazon que usa https://www.amazon.es/dp/{asin}. AFFILIATE_TAG vacío. SHOW_PRICES=false. Si alguien pasa un tag vacío, la URL no lleva parámetros de afiliado.
- Variables de ejemplo en .env.example, sin secretos.
- No construyas páginas más allá de una home temporal que liste los slugs, para comprobar que el seed lee. El diseño llega en la fase 3.

Al terminar, deja el comando de migración y de seed escrito en el README, en pocas líneas.
```

---

## Fase 3. Páginas, SEO y diseño

```text
Lee docs/mvp-briefing.md. Sobre el proyecto de la fase 2, construye la web pública sin redactar todavía las guías largas.

Páginas: home, /robots con filtros por marca, mascotas, alfombras y tipo de base, ficha /robots/[slug], /marcas/[slug], /comparar, avisos /afiliacion, /aviso-legal y /privacidad. No crees /interno/revision. Las guías pueden existir vacías o con un párrafo de "en preparación" y noindex hasta la fase 4. No las incluyas en el sitemap hasta que tengan texto propio.

/comparar tiene dos selectores con los productos published. Al elegir, la tabla compara los campos del briefing: succión, navegación, mopa, base, mascotas, alfombras, piso pequeño y altura. No compara precios. La pareja vive en la query (?a=&b=) y esa URL lleva noindex. No crees rutas /comparar/modelo-a-vs-modelo-b. La ficha enlaza al comparador con ese modelo ya puesto en ?a=.

Contenido de la ficha, en este orden: para quién es, para quién no, ficha técnica corta, variantes de color como enlaces al ASIN correspondiente, botón "Ver en Amazon". Sin precio. Sin la palabra precio en el title. Sin la palabra chollo. Sin cuenta atrás.

SEO: un H1, title "{Modelo} | SueloClaro", description de la home sin prometer un precio actual, canonical, breadcrumbs, sitemap solo de lo indexable, robots.txt, lang es-ES. JSON-LD Product prohibido mientras SHOW_PRICES sea false. Usa WebPage o Article.

Diseño: fondo claro, una columna de lectura, cabecera con el nombre SueloClaro, botón de Amazon al final de la ficha. Tiene que poder usarse en el móvil. No imites un cuponero.

Comprueba en local que ninguna página publicada muestra un número en euros.
```

---

## Fase 4. Guías

```text
Lee docs/mvp-briefing.md y el catálogo validado. Escribe en español, desde cero, las cuatro guías del briefing. No escribas comparativas de parejas: eso ya lo hace /comparar.

Cada guía responde a una situación: cómo elegir en esta gama, pelo de mascota, alfombras, piso pequeño. Los modelos que cita salen de una consulta a productos published con el booleano que toque (pet_hair, carpets, small_flat). Si más adelante dejas un modelo en draft, desaparece de la guía sin editar el texto. No uses "el mejor de 2026" como H1. No copies fichas de Amazon ni del fabricante. No inventes pruebas de laboratorio ni cifras de succión que no estén en el catálogo validado.

Quita el noindex de las guías, mételas en el sitemap y comprueba que fichas más guías pasan de 10 URLs con texto propio.

Sigue sin precios y sin etiqueta de afiliado.
```

---

## Fase 5. Cierre del MVP publicable

```text
Lee docs/mvp-briefing.md. Cierra la versión que se puede poner en internet antes de pedir el alta de Amazon.

Revisa:
- AFFILIATE_TAG vacío y SHOW_PRICES=false.
- Aviso legal, privacidad y /afiliacion coherentes con un sitio que todavía no enlaza como afiliado, pero que lo hará. La página de afiliación debe decir que los enlaces a Amazon podrán ser de afiliado y que eso no cambia el precio para quien compra.
- Sitemap, canonical y títulos sin duplicados.
- Ningún precio, ningún gráfico histórico, ninguna alerta, ningún enlace a otra tienda.
- Mínimo 8 fichas, 4 guías y /comparar operativo solo con published. Ninguna página de seguimiento de precios.

No despliegues tú si no hay dominio ni credenciales. Deja en el README los pasos exactos de despliegue y una lista de comprobación. El alta en Amazon la hace la propietaria del sitio, a mano, cuando la URL sea pública.
```

---

## Fase 6. Etiqueta de afiliado, en cuanto exista el ID

```text
Esta fase solo se ejecuta cuando la propietaria confirme que ya tiene el ID de afiliado. No hace falta que Amazon haya aceptado la cuenta: las 3 ventas se cuentan con la solicitud pendiente.

Lee docs/mvp-briefing.md. Pon AFFILIATE_TAG y añade la etiqueta a los enlaces de producto. El destino sigue siendo https://www.amazon.es/dp/{asin} más el tag, sin acortador. SHOW_PRICES sigue en false. Identifica el sitio como afiliado en el pie y en /afiliacion.

No muestres precios. No llames a la API. No crees alertas ni seguimiento.
```

---

## Fase 7. Precio actual, solo con la API

```text
Esta fase solo se ejecuta cuando la propietaria confirme por escrito que Creators API o la PA API están concedidas.

Lee docs/mvp-briefing.md. Muestra el precio actual solo con datos de esa API. Guarda una única fila vigente por producto en price_snapshots, con fetched_at. Refresca cada hora y sustituye esa fila. Si el dato tiene más de 24 horas, no lo pintes: deja el botón "Ver en Amazon" sin cifra. Junto a un precio visible, pon fecha, hora, Europe/Madrid y los dos avisos literales del briefing. Cambia el title de la ficha a "{Modelo}: precio en Amazon | SueloClaro" y la description de la home a la versión que menciona el precio actual.

No guardes serie histórica. No cuentes días fuera de gama. No crees /interno/revision. No envíes email ni Telegram. No guardes imágenes de la API. La clave se queda en el servidor. JSON-LD Product solo en fichas con precio vivo. No abras otros programas de afiliados.
```
