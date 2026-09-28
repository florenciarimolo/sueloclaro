import Link from "next/link";
import type { GuideSlug } from "@/lib/format";

export function GuideArticle({ slug }: { slug: GuideSlug }) {
  switch (slug) {
    case "como-elegir-robot-aspirador-gama-media":
      return <HowToChoose />;
    case "robot-aspirador-con-mascotas":
      return <Pets />;
    case "robot-aspirador-alfombras":
      return <Carpets />;
    case "robot-aspirador-piso-pequeno":
      return <SmallFlat />;
  }
}

function HowToChoose() {
  return (
    <article className="prose-guia">
      <p>
        En esta gama no se elige por un ranking anual. Se elige por lo que
        quieres dejar de hacer a mano y por el espacio que tiene la casa. Un
        robot Roborock, Dreame o Xiaomi entre 250 y 600 euros suele aspirar y
        fregar. La diferencia útil está en la base, en cómo trata el pelo y las
        alfombras, y en si el cuerpo cabe bajo los muebles.
      </p>

      <h2>Empieza por la base, no por los pascales</h2>
      <p>
        La succión se lee en pascales y sirve para comparar fichas, pero no
        decide sola. La base sí cambia el día a día. En SueloClaro hay tres
        tipos:
      </p>
      <ul>
        <li>
          <Link href="/robots?base=none">Solo carga</Link>: el robot vuelve a
          enchufarse. El depósito y la mopa los atiendes tú.
        </li>
        <li>
          <Link href="/robots?base=empty">Autovaciado</Link>: deja el polvo en
          una bolsa de la estación durante varias semanas.
        </li>
        <li>
          <Link href="/robots?base=wash_dry">Vacía, lava y seca</Link>: además
          lava la mopa y la deja seca para el siguiente ciclo.
        </li>
      </ul>
      <p>
        Si lo que te pesa es fregar a mano, una estación que lava y seca ahorra
        más trabajo que un número más alto de succión. Si vives en un piso
        estrecho, esa misma estación puede no caber. Entonces un modelo de solo
        carga sigue teniendo sentido.
      </p>

      <h2>Succión, navegación y mopa</h2>
      <p>
        Los pascales cubren un intervalo amplio: hay
        modelos de 6.000 Pa y otros de 25.000 Pa. Esa cifra sale de cada ficha,
        no de una prueba propia. Sirve para ordenar, no para garantizar un suelo
        concreto. En pelo largo y en alfombra densa suele importar más el
        cepillo y que la mopa se levante que un salto pequeño de succión.
      </p>
      <p>
        La navegación marca si el robot recorre en líneas o si se pierde entre
        sillas. En esta gama es habitual el mapa por láser o LiDAR, a veces con
        luz estructurada o cámara para cables y zapatos.
      </p>
      <p>
        El fregado suele ser con mopa giratoria. Lo que cambia es si llega al
        rodapié, si sube la mopa al detectar alfombra y cuántos milímetros sube.
        Sin esa elevación, la mopa arrastra humedad sobre el tejido.
      </p>

      <h2>Tres preguntas de casa</h2>
      <p>
        Antes de abrir dos fichas en el{" "}
        <Link href="/comparar">comparador</Link>, responde esto:
      </p>
      <ul>
        <li>
          ¿Hay perro o gato? Entonces mira{" "}
          <Link href="/guias/robot-aspirador-con-mascotas">
            pelo de mascota
          </Link>
          .
        </li>
        <li>
          ¿Hay alfombras que quieres aspirar, no rodear? Entonces mira{" "}
          <Link href="/guias/robot-aspirador-alfombras">alfombras</Link>.
        </li>
        <li>
          ¿El recibidor o el baño no admiten una torre? Entonces mira{" "}
          <Link href="/guias/robot-aspirador-piso-pequeno">piso pequeño</Link>.
        </li>
      </ul>
      <p>
        Un mismo modelo puede servir para más de una de estas casas.
      </p>

      <h2>Cómo usar las fichas</h2>
      <p>
        Cada ficha dice para quién es y para quién no. Léelos antes de la
        tabla. La succión, la base y la altura sirven para comparar, no para
        coronar un ganador.
      </p>
    </article>
  );
}

function Pets() {
  return (
    <article className="prose-guia">
      <p>
        El pelo no se comporta como el polvo fino. Se enreda en el cepillo,
        atasca el conducto y llena el depósito en dos o tres pases. En un piso
        con perro o gato, el robot útil es el que puedes dejar trabajar varios
        días sin desmontarlo cada tarde.
      </p>

      <h2>Qué importa más que un modo “mascotas” en el menú</h2>
      <p>
        Un modo con ese nombre ayuda a subir potencia o a pasar más veces, pero
        no sustituye tres cosas de la máquina:
      </p>
      <ul>
        <li>
          Un cepillo que no trence el pelo, o que lo corte. Si la ficha habla de
          un cepillo de goma o de uno que corta, léelo en la ficha técnica, no
          en el eslogan.
        </li>
        <li>
          Una base que vacíe el depósito. Con pelo, el cubo interno se llena
          antes. Autovaciado o estación completa evitan que el robot pare a
          media casa.
        </li>
        <li>
          Que la mopa se levante en la alfombra. El pelo se queda en el tejido;
          si la mopa va húmeda, lo apelmaza.
        </li>
      </ul>
      <p>
        La succión cuenta, sobre todo en alfombra, pero un salto de unos miles
        de pascales no compensa un cepillo que se empasta. En el catálogo hay
        modelos de pelo con 10.000 Pa y otros con 19.000 Pa o más; la ficha
        concreta da la cifra.
      </p>

      <h2>Pelo largo, pelo corto y varios animales</h2>
      <p>
        El pelo corto de un labrador llena el filtro. El pelo largo de un gato
        o de un golden se enrolla en el rodillo. Si conviven los dos, mira
        primero el cepillo y el vaciado. Un piso pequeño con un solo animal
        puede vivir con menos succión si vacías a menudo; un piso grande con
        dos perros no.
      </p>
      <p>
        La navegación también importa: cables de rascador, comedero y juguetes
        son obstáculos fijos. Luz estructurada o cámara ayudan a no empujarlos
        bajo el sofá. Si la ficha no describe elusión, no asumas que la tiene.
      </p>

      <h2>Qué no promete esta guía</h2>
      <p>
        Las fichas de abajo son las que encajan si hay pelo. Para ver dos a dos
        succión, mopa y base, usa el{" "}
        <Link href="/comparar">comparador</Link>.
      </p>
    </article>
  );
}

function Carpets() {
  return (
    <article className="prose-guia">
      <p>
        Una alfombra de pelo bajo en el salón no es lo mismo que un felpudo
        grueso en la entrada. El robot de esta gama puede con la primera si
        sube la succión y levanta la mopa. Con la segunda, a veces es más
        honesto decirle que la evite.
      </p>

      <h2>Mopa arriba, succión arriba</h2>
      <p>
        Si friegas y aspiras en el mismo pase, la mopa húmeda sobre la
        alfombra deja una franja oscura y un olor a cerrado. Por eso las fichas
        de esta guía destacan modelos que elevan la mopa: hay elevaciones de
        7 mm, 10 mm, 10,5 mm o 15 mm.
      </p>
      <p>
        La succión en alfombra pide más que en baldosa. Hay modelos de 6.000 Pa
        y otros de 25.000 Pa. El de menos pascales puede valer en
        una alfombra fina si la mopa se levanta; el de más pascales no arregla
        una mopa que arrastra.
      </p>

      <h2>Detección y mapas</h2>
      <p>
        Algunos robots suben potencia al notar el tejido. Otros dejan marcar
        zonas en el mapa. Si tienes una alfombra que no quieres mojar, esa zona
        prohibida vale más que un modo automático. La navegación por láser
        ayuda a no cruzar la misma franja diez veces; no sustituye un borde
        bien dibujado en la aplicación.
      </p>
      <p>
        El borde de la alfombra es un escalón pequeño. Un robot bajo pasa
        mejor. Si la ficha da altura del cuerpo, úsala: 8 cm no es lo mismo que
        casi 10 cm bajo un aparador, y tampoco es lo mismo para un ruedo
        grueso.
      </p>

      <h2>Felpudos y moquetas</h2>
      <p>
        El felpudo de fibra larga y la moqueta de pared a pared no son el caso
        de esta guía. Ahí el robot o se queda o se come el fleco. Las fichas de
        abajo hablan de alfombras domésticas de pelo bajo o medio. Si el modelo
        permite “evitar alfombras”,
        úsalo en las que no quieras tratar.
      </p>
      <p>
        Para cruzar succión, elevación de mopa y tipo de base de dos fichas,
        el{" "}
        <Link href="/comparar">comparador</Link> muestra esos campos.
      </p>
    </article>
  );
}

function SmallFlat() {
  return (
    <article className="prose-guia">
      <p>
        En un piso de un dormitorio el robot cabe. La estación, a veces no. El
        error habitual es elegir primero la torre que lava y seca y descubrir
        que ocupa el único rincón libre junto al cuadro eléctrico.
      </p>

      <h2>Mide el hueco de la base</h2>
      <p>
        Una estación que vacía, lava y seca es ancha y alta. Necesita aire
        alrededor, un enchufe y un suelo nivelado. En un recibidor estrecho
        suele ganar un robot que solo vuelve a cargarse: la base es una rampa
        baja. El fregado sigue existiendo; el depósito de agua y la mopa los
        atiendes tú, a cambio de no ceder medio metro de pasillo.
      </p>
      <p>
        Si aun así quieres autovaciado, coloca la estación donde ya dejas el
        cubo: lavadero, terraza interior, hueco de armario. No la pongas
        detrás de una puerta que se abre a tope.
      </p>

      <h2>Altura bajo sofá y cama</h2>
      <p>
        En piso pequeño el polvo se esconde bajo los pocos muebles que hay. Si
        la ficha da altura del robot, compárala con el hueco real: un cuerpo de
        unos 8 cm entra donde uno de 9,65 cm no. Si la ficha no da la altura,
        mídela en casa antes de comprar.
      </p>
      <p>
        Un mapa de varias plantas sirve menos si solo hay una. Sirve más que el
        robot no se atasque entre las sillas de un salón-comedor. Ahí la
        elusión de obstáculos pesa más que guardar un segundo piso.
      </p>

      <h2>Menos metros, más frecuencia</h2>
      <p>
        Un piso pequeño se ensucia igual de rápido si hay calle o mascota, pero
        el robot tarda menos en un ciclo. Puedes programar un pase diario corto
        en vez de uno largo semanal. Eso reduce la necesidad de una estación
        enorme, siempre que aceptes vaciar el depósito.
      </p>
      <p>
        Las fichas de abajo son las que encajan cuando hay poco sitio para la
        base. No es un ranking de tamaño. Para comparar
        altura y tipo de base de dos modelos, usa el{" "}
        <Link href="/comparar">comparador</Link>.
      </p>
    </article>
  );
}
