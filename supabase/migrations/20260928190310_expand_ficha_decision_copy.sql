update public.products set height_mm = 97,
  for_whom = 'Para un piso con pelo y alfombras de pelo bajo, cuando quieres dejar de vaciar el depósito a mano. La base vacía, lava y seca. El cuerpo mide 97 mm: bajo un sofá más bajo no entra.',
  not_for_whom = 'No encaja si no cabe una estación grande. Si el hueco es el límite, mira el Dreame L10s Pro Gen 3, que solo carga y está marcado como piso pequeño.'
where slug = 'roborock-qrevo-s5v';

update public.products set
  for_whom = 'Para una casa con mascotas en la que quieres que la base vacíe, lave y seque. El cuerpo mide 97 mm.',
  not_for_whom = 'No encaja si la estación no cabe o si el hueco bajo los muebles es menor de 97 mm. Para pasar más bajo, el Qrevo EdgeT mide 80 mm y también está marcado para pelo.'
where slug = 'roborock-qrevo-s-pro';

update public.products set
  for_whom = 'Para quien quiere una estación que vacía, rellena, lava y seca y se queda en 8.000 Pa. No está marcado para pelo ni para alfombras. La altura del cuerpo no consta.',
  not_for_whom = 'No encaja si hay mascota o si buscas la succión de un Qrevo de 18.500 Pa. Si hay pelo, mira el Roborock Qrevo S5V.'
where slug = 'roborock-qv-35a';

update public.products set
  for_whom = 'Para un piso con muebles bajos y pelo de mascota, si cabe una base grande. A 80 mm entra donde un cuerpo de 97 mm no. La estación vacía, lava y seca.',
  not_for_whom = 'No encaja si la estación no cabe. En ese caso mira el Dreame L10s Pro Gen 3, de solo carga. Esta ficha no está marcada para alfombras.'
where slug = 'roborock-qrevo-edget';

update public.products set
  for_whom = 'Para quien quiere 25.000 Pa y una base que vacía, lava y seca, sobre todo con alfombra: sube la potencia en el tejido y la mopa puede elevarse hasta 15 mm. El cuerpo mide 97 mm.',
  not_for_whom = 'No encaja bajo muebles de menos de 97 mm ni si buscas una ficha marcada para pelo. Si hay mascota y quieres pasar más bajo, mira el Qrevo EdgeT.'
where slug = 'roborock-qrevo-2-pro';

update public.products set height_mm = 97,
  for_whom = 'Para quien quiere el Qrevo 5AE con base que vacía, lava, seca y rellena el agua, y acepta un vendedor que no es la tienda oficial. El cuerpo mide 97 mm. No está marcado para pelo ni para alfombras.',
  not_for_whom = 'No encaja si necesitas la ficha en español de la tienda oficial, o si hay pelo. Para pelo y alfombra de pelo bajo, mira el Qrevo S5V.'
where slug = 'roborock-qrevo-5ae';

update public.products set
  for_whom = 'Para un piso grande con alfombras y mascotas, si cabe la PowerDock. Esa base vacía, lava a 75 °C y seca con aire caliente. La altura del robot no consta en esta ficha.',
  not_for_whom = 'No encaja en un piso pequeño. Si no cabe la estación, mira el Dreame L10s Pro Gen 3, de solo carga.'
where slug = 'dreame-l40-ultra-ae';

update public.products set
  for_whom = 'Para quien quiere un L40 de 24.000 Pa con base que vacía, lava y seca al aire, y no necesita el secado con aire caliente del AE. No está marcado para pelo ni para alfombras. La altura del robot no consta.',
  not_for_whom = 'No encaja si buscas secado con aire caliente o si hay mascota. Para pelo, alfombra y aire caliente, mira el L40 Ultra AE.'
where slug = 'dreame-l40-ultra-a';

update public.products set
  for_whom = 'Para alfombras y pelo, con 25.000 Pa y una estación que vacía, lava, seca y rellena agua y detergente. La altura del robot no consta; la estación es grande.',
  not_for_whom = 'No encaja en un piso pequeño. Si el hueco manda, mira el L10s Pro Gen 3, que solo carga y mide 97 mm. Si te basta con 10.000 Pa, el Gen 2 también tiene estación y está marcado para pelo.'
where slug = 'dreame-l10s-ultra-gen-3';

update public.products set height_mm = 97,
  for_whom = 'Para quien quiere una estación que vacía, lava y seca, con mascota, en 10.000 Pa. El cuerpo mide 97 mm.',
  not_for_whom = 'No encaja si necesitas la succión del Gen 3 o si la estación no cabe. Si no cabe, mira el L10s Pro Gen 3.'
where slug = 'dreame-l10s-ultra-gen-2';

update public.products set height_mm = 97,
  for_whom = 'Para un piso pequeño o mediano que quiere aspirar y fregar sin dejar el recibidor a una torre. La base solo carga: el depósito y la mopa los atiendes tú. El cuerpo mide 97 mm y la base de carga mide 9,3 cm de alta.',
  not_for_whom = 'No encaja si quieres que la base vacíe, lave o seque la mopa. Si cabe la estación y hay pelo, mira el L10s Ultra Gen 2.'
where slug = 'dreame-l10s-pro-gen-3';

update public.products set height_mm = 97,
  for_whom = 'Para una primera estación de esta gama: vacía, lava y seca, con 6.000 Pa y alfombras en las que la mopa se levanta. El cuerpo mide 97 mm. No está marcado para pelo.',
  not_for_whom = 'No encaja si necesitas más succión o si hay mascota. El X20 Max sube a 8.000 Pa y alarga el brazo de la mopa. También mide 97 mm.'
where slug = 'xiaomi-robot-vacuum-x20-plus';

update public.products set height_mm = 97,
  for_whom = 'Para quien el X20+ se queda en 6.000 Pa y quiere 8.000 Pa más el brazo de la mopa, que sale hasta 4 cm y se levanta en la alfombra. La estación lava en caliente y seca. El cuerpo mide 97 mm. No está marcado para pelo.',
  not_for_whom = 'No encaja si buscas el X20+ más sencillo, ni si hay mascota. Para pelo en esta gama, mira el Qrevo S5V.'
where slug = 'xiaomi-robot-vacuum-x20-max';

update public.products set height_mm = 97,
  for_whom = 'Para quien quiere la estación con agua caliente y se queda en 7.000 Pa, entre el X20+ y el Max. El cuerpo mide 97 mm. No está marcado para pelo ni para alfombras.',
  not_for_whom = 'No encaja si quieres el brazo extensible del X20 Max o si hay alfombra que haya que tratar. El Max sí está marcado para alfombras.'
where slug = 'xiaomi-robot-vacuum-x20-pro';
