# Briefing MVP: SueloClaro

Fecha del briefing: 25 de septiembre de 2026.  
Mercado: España. Idioma: español.  
Stack: Next.js (App Router) + Supabase.  
Monetización de la primera versión: ninguna hasta que Amazon acepte la cuenta. Después, solo Amazon Afiliados España.

## Decisión

La web es un catálogo especializado de **robots aspiradores de gama media (250–600 €)** de Roborock, Dreame y Xiaomi. Cada ficha explica para quién sirve el modelo y enlaza a su página de Amazon.

No es un comparador de tiendas. No guarda un histórico de precios ni avisa, ni a ti ni al público, cuando un precio cambia. El programa de Amazon Afiliados, salvo autorización escrita, prohíbe en el sitio el seguimiento de precios y las alertas, y limita a 24 horas la caché del contenido de producto.

Los modelos no se quedan fijos. Entran y salen de la gama. Por eso no hay comparativas escritas modelo contra modelo. Hay un comparador en `/comparar`: eliges dos fichas publicadas y la tabla sale de sus datos. Si un modelo deja de estar publicado, desaparece del selector.

El objetivo operativo de esta versión es otro: publicar un sitio original, solicitar el alta y conseguir **3 ventas cualificadas de otras personas en 180 días**.

## Nombre

**SueloClaro.**

- Title de la home: `SueloClaro: robots aspiradores de gama media`.
- Description mientras no haya precio en la web: `Fichas de robots aspiradores Roborock, Dreame y Xiaomi de gama media, y para quién encaja cada modelo.`
- Description cuando el precio salga de la API: `Fichas de robots aspiradores Roborock, Dreame y Xiaomi de gama media, con el precio actual en Amazon y para quién encaja cada modelo.`
- El dominio se comprueba antes de implementar. No usar `amazon`, `roborock`, `dreame` ni `xiaomi` en el dominio ni en el ID de afiliado.
- Si `sueloclaro.es` no está libre, alternativas en este orden: `sueloclaro.com`, `fichasuelo.es`, `robotgama.es`.

## Qué entra en el MVP

1. Home con el criterio de la gama y accesos a marcas, guías y fichas.
2. Listado de modelos filtrable por marca, mascotas, alfombras y tipo de base.
3. Ficha por modelo, no por color. Los colores son variantes del mismo modelo.
4. Páginas de marca: Roborock, Dreame, Xiaomi.
5. Cuatro guías propias. Junto con las fichas, pasan de 10 publicaciones originales, que es la referencia que Amazon usa al revisar la solicitud.
6. Un comparador en `/comparar` con dos selectores. Solo ofrece modelos `published`. La comparación se calcula con los campos del producto. No hay una página redactada por pareja.
7. Aviso de afiliación, aviso legal (LSSI) y privacidad.
8. Sitemap, metadatos y datos estructurados.
9. Seed en Supabase con los modelos de este briefing, revalidados el día de la carga.

## Qué no entra

- Histórico de precios, mínimo histórico, gráfico, “comprar ahora o esperar”.
- Alertas de precio, también internas: email, Telegram, contador de días fuera de gama y página de revisión. El programa prohíbe en el sitio el seguimiento de precios y las alertas, salvo autorización escrita de Amazon.
- Páginas estáticas del tipo `/comparar/modelo-a-vs-modelo-b`.
- Otras tiendas, Awin, PcComponentes, Leroy Merlin o MediaMarkt.
- Robots de menos de 250 € o de más de 600 €, salvo el Dreame D20 Pro Plus si el día de la carga sigue junto al suelo del rango.
- Marcas sin recorrido en esta gama: Lefant, genéricos y cupones de “precio oficial 1.200 €”.
- Roomba, Saros, Qrevo Curv 2 Pro y S8 Pro Ultra: están por encima del rango o no son el núcleo.
- Recambios, bolsas, filtros y mopas.
- Cuentas de usuario, favoritos y comentarios.
- Blog abierto. Las guías son páginas fijas.
- Scraping de Amazon. El precio, cuando exista, sale de Creators API o PA API, después del alta.

## Orden de publicación

1. El sitio se publica con enlaces normales a la ficha de Amazon (`https://www.amazon.es/dp/ASIN`), sin etiqueta de afiliado y **sin mostrar un precio**. El botón dice “Ver en Amazon”.
2. Con el sitio público se solicita el alta en [Amazon Afiliados España](https://afiliados.amazon.es/).
3. Amazon entrega el ID con la solicitud todavía pendiente. En ese momento, y no después de la aceptación, se sustituyen los enlaces por enlaces de afiliado. Sin esa etiqueta no hay ventas que contar. Empiezan los 180 días y las 3 ventas. Sigue sin mostrarse un precio.
4. El precio solo se muestra cuando la API esté concedida. Sale de Creators API o de la PA API, se refresca cada hora y no se enseña si el dato tiene más de 24 horas. Lleva fecha, hora, `Europe/Madrid` y los dos avisos de la licencia.
5. Las compras propias, de familiares o de amigos no cuentan como ventas cualificadas.

## Catálogo a promocionar

Criterio de entrada, los cuatro a la vez:

- Marca Roborock, Dreame o Xiaomi.
- Precio habitual en Amazon.es entre 250 y 600 €. Se mira el día de la carga, no el de este briefing.
- Aspiración y fregado. La base de autovaciado es preferible, no obligatoria en el límite bajo del rango.
- Ficha viva en Amazon.es: ASIN localizable y oferta de vendedor, o sin stock solo si el modelo sigue siendo la referencia de la gama.

Los precios de abajo son fotos de fichas y comparadores consultados el 25 de septiembre de 2026. Varios ASIN aparecieron sin oferta destacada. **No se publica un modelo cuyo precio no se haya vuelto a abrir en Amazon.es ese día.** Si se sale del rango, se sustituye por otro de la misma marca que sí entre.

### Verificados con ASIN en Amazon.es

| Modelo | ASIN | GTIN | Señal de precio | Encaje | Estado |
| --- | --- | --- | --- | --- | --- |
| Roborock Qrevo S5V, blanco | [B0DSMQRZFY](https://www.amazon.es/dp/B0DSMQRZFY) | 00810125543654 | Nuevos desde 499,99 € en la ficha consultada | Núcleo del MVP. 12.000 Pa, doble mopa elevable, autovaciado y rellenado. Número de modelo QV 35A | Publicar si sigue entre 250 y 600 € |
| Roborock Qrevo S5V, negro | [B0DT13JGY2](https://www.amazon.es/dp/B0DT13JGY2) | 00810125544057 | Misma familia. No es otra ficha SEO | Variante de color del S5V | Una sola URL de modelo. El blanco es el ASIN principal |
| Dreame L40 Ultra AE | [B0F53MJY8T](https://www.amazon.es/dp/B0F53MJY8T) | No consta en la ficha leída | 549 € en VacuumSpain y 649 € en una ficha de Amazon, a veces sin stock | Techo de la gama. 19.000 Pa y estación todo en uno | Publicar solo si el precio del día es ≤ 600 € |
| Roborock Qrevo Curv S5X | [B0DPHPZ366](https://www.amazon.es/dp/B0DPHPZ366) | 00810125543265 | Sin oferta destacada el día de la lectura. 18.500 Pa | Solo entra si el precio real cae en el rango | Comprobar antes de escribir la ficha |

### Con presencia razonable y ASIN pendiente de confirmar

Estos modelos aparecen en fichas de Amazon.es o en precios atribuidos a Amazon, pero este briefing no fija un ASIN. La fase de investigación del plan tiene que abrir la ficha y copiar ASIN, GTIN y precio.

| Modelo | Señal | Encaje |
| --- | --- | --- |
| Xiaomi Robot Vacuum X20+ | Un comparador lo lista vendido por Amazon a 351 €, con PVP cercano a 400 €. 6.000 Pa y base que lava y seca la mopa | Primera compra de la gama. Prioridad alta |
| Xiaomi X20 Max | VacuumSpain lo anota a 435,99 € en Amazon | Alternativa al X20+ si la base y el fregado justifican la diferencia. No publicar los dos si son el mismo producto con otro nombre |
| Dreame D20 Pro Plus | VacuumSpain lo anota a 249 €. 13.000 Pa y autovaciado | Suelo del rango. Publicar si ese día está entre 250 y 320 €. Si está por debajo, queda fuera |
| Dreame L10s Pro Gen 3 | Aparece como producto relacionado en fichas de Amazon.es. 13.000 Pa | Incluir si el precio en España cae dentro del rango |
| Roborock Qrevo 5AE | PcComponentes lo tuvo a 399 € frente a un PVP de 799 €. 12.000 Pa y base de autovaciado | Prioridad alta si existe ficha en Amazon.es dentro del rango. El precio de PcComponentes no se muestra en la web |

### Quedan fuera aunque se hayan visto en la búsqueda

| Modelo | Motivo |
| --- | --- |
| Roborock Qrevo Curv 2 Pro, ASIN B0FFGQ7L2T | Ficha con 899 €. Por encima del rango |
| Roborock Saros 10R, ASIN B0DJ3284BS | Gama alta. Ofertas vistas desde unos 799 € |
| Roborock S8 Pro Ultra | Por encima del rango en las fuentes consultadas |
| iRobot Roomba 415 Combo y Roomba Plus 575 Combo | Otra marca y otro tipo de compra. No forman el núcleo |
| Lefant M5 Pro | Precio de cupón poco fiable. Fuera de las tres marcas |

### Huecos que la investigación de la fase 1 debe cerrar

Hacen falta **12 modelos publicables**, no 12 nombres tentativos. Si la revalidación deja menos de 8, se buscan en Amazon.es, dentro de Roborock Qrevo, Dreame L10/L20/L40 y Xiaomi X20, los siguientes que cumplan el criterio. No se rellena con genéricos.

Cada modelo que entre en Supabase lleva: nombre comercial estable, marca, ASIN principal, GTIN si existe, URL limpia, precio visto ese día y tienda del pantallazo (solo en una nota interna, no en la web), succión en Pa, navegación, tipo de mopa, si la base vacía, lava o seca, altura, idoneidad para pelo de mascota, y una frase de “para quién es”. Esos datos se copian de la ficha del fabricante o de la ficha de Amazon y se reescriben. No se pega el texto comercial.

## Páginas

| URL | Tipo | Indexar |
| --- | --- | --- |
| `/` | Home | Sí |
| `/robots` | Listado | Sí |
| `/robots/roborock-qrevo-s5v` | Ficha. El patrón es marca y modelo en minúsculas, sin color | Sí |
| `/marcas/roborock`, `/marcas/dreame`, `/marcas/xiaomi` | Marca | Sí |
| `/guias/como-elegir-robot-aspirador-gama-media` | Guía | Sí |
| `/guias/robot-aspirador-con-mascotas` | Guía | Sí |
| `/guias/robot-aspirador-alfombras` | Guía | Sí |
| `/guias/robot-aspirador-piso-pequeno` | Guía | Sí |
| `/comparar` | Comparador de ficha técnica. No compara precios de otras tiendas | Sí, solo la herramienta. La pareja concreta va en la query y no se indexa |
| `/afiliacion` | Divulgación | Sí |
| `/aviso-legal` | LSSI | Sí |
| `/privacidad` | Privacidad | Sí |

Una ficha contiene, en este orden: para quién es, para quién no, ficha técnica corta, enlace a `/comparar` con ese modelo ya elegido, variantes de color con su ASIN, y el botón a Amazon. El texto es de SueloClaro. No es la descripción del fabricante.

El comparador muestra succión, navegación, mopa, base, mascotas, alfombras, piso pequeño y altura. No escribe un texto nuevo por pareja. Si uno de los dos deja de estar `published`, el selector ya no lo ofrece. La query `?a=&b=` sigue sin indexarse. La fase 8 de `docs/mvp-planes.md` abre, aparte, una lista cerrada de parejas de modelos hermanos en `/comparar/{slug-a}-o-{slug-b}`. Esa lista no autoriza una página por cada combinación del catálogo.

Las guías responden a una búsqueda, no a “los 10 mejores de 2026”. Ejemplo de título de guía: `Robot aspirador para pelo de mascota entre 250 y 600 euros`.

## SEO

- Un H1 por página. El H1 de la ficha es el nombre del modelo, sin “oferta” y sin “barato”.
- Title de ficha, mientras no haya precio: `{Modelo} | SueloClaro`. Cuando el precio venga de la API: `{Modelo}: precio en Amazon | SueloClaro`. No uses la palabra precio en el title antes de mostrar un precio real. Máximo aproximado 60 caracteres.
- Canonical en todas las URLs indexables. Los colores no tienen canonical propio.
- `sitemap.xml` solo con páginas indexables. `robots.txt` permite el rastreo.
- JSON-LD `Product` solo cuando haya precio de la API. Antes del alta, `Article` o `WebPage`, nunca un precio inventado.
- JSON-LD `BreadcrumbList` en ficha, marca y guía. En `/comparar` también. Las URLs con `?a=` y `?b=` llevan `noindex`.
- Enlazado interno: cada ficha enlaza a su marca, a una guía y al comparador. Cada guía enlaza a fichas `published` que cumplan su criterio, no a una lista de modelos escrita a mano.
- No perseguir `mejor robot aspirador 2026`. Esa búsqueda está en medios. Las URLs persiguen el modelo y la situación (mascotas, alfombras, piso pequeño, tipo de base).
- Imágenes: fotos propias o esquemas propios. No guardar imágenes de la PA API. Si más adelante se usa una imagen de la API, solo se guarda el enlace y se refresca en 24 horas.
- Idioma `es-ES`. Sin versión en inglés.

## Precio y afiliación, cuando toque

Hasta la aceptación y la API:

- Botón “Ver en Amazon”.
- URL `https://www.amazon.es/dp/{ASIN}` sin tag.
- Ningún número de precio en HTML, JSON-LD ni capturas.

Con el ID de afiliado, aunque la solicitud siga pendiente:

- Tag en todos los enlaces de producto. El destino sigue siendo la ficha de Amazon, sin acortador.
- Sigue sin precio hasta tener la API.
- Identificación como sitio afiliado en el pie y en `/afiliacion`.
- No incentivar el clic.

Con la API concedida:

- Precio y disponibilidad solo desde Creators API o PA API. El enlace de ese contenido va a la ficha de Amazon, no a otra tienda.
- Refresco cada hora. Si falla, no se pinta un precio de más de 24 horas: se vuelve al botón “Ver en Amazon” sin cifra.
- Junto al precio, fecha, hora y `Europe/Madrid`, más este aviso, visible o tras “Detalles”: `Los precios y la disponibilidad del producto son precisos en la fecha/hora indicados y están sujetos a cambios. Se aplicará a la compra del producto el precio e información de disponibilidad mostrados en Amazon.es en el momento de la compra.`
- En las páginas que muestren contenido de la API, este texto: `Parte del contenido de este sitio procede de Amazon Europe Core S.à r.l. Ese contenido se ofrece tal cual y puede cambiar o retirarse en cualquier momento.`
- En Supabase solo queda el último precio de cada producto, con `fetched_at`. Cada refresco sustituye la fila. No hay serie, no hay contador de días, no hay página de revisión.
- Límite inicial de la PA API: 1 solicitud por segundo. Con 12 modelos sobra. Las llamadas van por servidor. La clave no se expone al cliente. No se usa la API para analizar ni reutilizar el catálogo más allá de mostrar el precio actual.
- Imágenes de la API: no se guardan. Como mucho un enlace, renovado antes de 24 horas. El MVP usa fotos o esquemas propios y así se evita esa caché.

Sustituir un modelo no lo hace la web. Tú ves el precio en la ficha, o me pides una revisión. Yo miro Amazon.es ese día y te propongo otro de Roborock, Dreame o Xiaomi dentro de la gama, con ASIN y precio. No entra hasta que lo aceptes. Esa revisión no se programa dentro del sitio.

Comisión esperada si Amazon clasifica el robot como electrodoméstico: 2,5 %. No hace falta otra red para el MVP.

## Supabase

Tablas mínimas:

- `brands`: slug, name.
- `products`: slug, brand_id, name, asin, gtin, pa_suction, navigation, mop_type, dock (enum: none, empty, wash_dry), pet_hair (bool), carpets (bool), small_flat (bool), height_mm, for_whom, not_for_whom, summary, status (`draft` o `published`). La ficha técnica es texto propio, no una copia guardada de la API.
- `product_variants`: product_id, color, asin. No generan URL.
- `guides`: slug, title, description, body (markdown), status. El cuerpo no depende de una pareja fija de modelos. Los modelos relacionados se leen de los campos booleanos.
- `price_snapshots`: product_id, amount_cents, currency, availability, fetched_at. Una fila vigente por producto. La escritura empieza en la fase de API, no antes. No hay tabla de comparativas.

RLS: lectura pública de lo `published`. Escritura solo con la service role del servidor. Sin login de visitantes.

## Next.js

- App Router, TypeScript, React Server Components.
- Estilos simples. Una columna de lectura en ficha y guía. Listado en rejilla.
- `generateMetadata` por página. Nada de títulos duplicados.
- Datos leídos en el servidor desde Supabase.
- Sin estado global de cliente salvo el filtro del listado y los dos selectores del comparador.
- Variable `AFFILIATE_TAG` vacía en el primer despliegue. El helper de URL la añade solo si tiene valor.
- Variable `SHOW_PRICES=false` hasta la fase de API.

## Diseño

Sobrio. Fondo claro, texto oscuro, un solo acento. El nombre SueloClaro se lee entero en la cabecera. No parece un cuponero: no hay cuentas atrás, no hay “chollo”, no hay porcentajes de descuento. En móvil, el botón de Amazon queda visible al final de la ficha, no fijo tapando el texto.

## Medición del MVP

Hecho cuando se cumple todo esto:

- 12 fichas publicadas, o las que sigan vivas tras el filtro, con un mínimo de 8.
- 4 guías publicadas, escritas desde cero.
- `/comparar` funcionando solo con modelos `published`. No existe `/interno/revision` ni un contador de días fuera de gama.
- Aviso legal, privacidad y página de afiliación.
- Sitemap válido y páginas indexables sin precio inventado.
- Despliegue público en el dominio elegido.
- Enlaces sin tag. `AFFILIATE_TAG` vacío. `SHOW_PRICES=false`.
- Lista interna, fuera de la web, con ASIN, precio visto y captura del día, para pedir el alta con conocimiento del catálogo.

No está hecho si falta el alta de Amazon. Eso es el paso siguiente, manual, fuera del código.

## Skills y límites de los agents

Cada agent trabaja una fase del archivo `docs/mvp-planes.md` y no se adelanta.

Conocimiento que deben tener presente:

- Next.js App Router y TypeScript.
- Supabase: esquema, seed, RLS y lectura desde servidor.
- SEO técnico básico: metadata, canonical, sitemap, JSON-LD.
- Español claro, sin relleno comercial y sin copiar fichas de Amazon o del fabricante.
- Reglas de Amazon Afiliados citadas en este briefing. En concreto: no seguimiento de precios, no alertas, no precio antes de la API, no caché de precio de más de 24 horas, no imágenes guardadas de la API, no compras propias para completar las 3 ventas, etiqueta de afiliado en cuanto exista el ID.

No hace falta un agent de Awin, de scraping ni de alertas. Si una fase pide ampliar el alcance, se detiene y lo deja escrito.
