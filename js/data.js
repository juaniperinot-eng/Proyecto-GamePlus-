'use strict';

/* =============================================
   MÓDULO: data.js
   Responsabilidad: datos estáticos del catálogo.

   Por qué existe: separar los datos de la lógica
   permite reemplazar el array por una API en el
   futuro sin tocar ningún otro módulo.

   Exporta: JUEGOS (array), ETIQUETAS_GENERO (objeto)
   No importa ningún otro módulo — es la base de todo.
   ============================================= */

/* CLASE 2 — Catálogo de juegos
   Consigna: array de objetos con título, precio,
   categoría e imagen para cada artículo del catálogo */
export const JUEGOS = [
  { id:  1, img: 'battlefield6.jpg',   imgHero: 'heroes/battlefield6_hero.jpg',   titulo: 'Battlefield 6',                  dev: 'EA DICE',                anio: 2025, genero: 'shooter',       precio: 59.99,                         rating: 4, descripcion: 'El último capítulo de la saga eleva los combates con mapas destructibles, 64 jugadores en pantalla y gráficos de nueva generación.' },
  { id:  2, img: 'codmw.jpg',           imgHero: 'heroes/codmw_hero.jpg',           titulo: 'Call of Duty: Modern Warfare',   dev: 'Activision',             anio: 2019, genero: 'shooter',       precio: 39.99,                         rating: 5, descripcion: 'El reboot que redefinió el shooter moderno. Campaña cinematográfica y multijugador competitivo de primer nivel.' },
  { id:  3, img: 'acshadows.jpg',       imgHero: 'heroes/acshadows_hero.jpg',       titulo: "Assassin's Creed Shadows",       dev: 'Ubisoft',                anio: 2025, genero: 'accion',        precio: 69.99,                         rating: 4, descripcion: 'Explorá el Japón feudal con dos protagonistas: Naoe, una shinobi ágil, y Yasuke, el legendario samurái africano.' },
  { id:  4, img: 'cyberpunk2077.jpg',   imgHero: 'heroes/cyberpunk2077_hero.jpg',   titulo: 'Cyberpunk 2077',                 dev: 'CD Projekt RED',         anio: 2020, genero: 'rpg',           precio: 29.99, precioOriginal: 59.99, rating: 5, descripcion: 'Night City: una megalópolis obsesionada con el poder. Un RPG de mundo abierto donde cada decisión importa.' },
  { id:  5, img: 'devilmaycry5.jpg',    imgHero: 'heroes/devilmaycry5_hero.jpg',    titulo: 'Devil May Cry 5',                dev: 'Capcom',                 anio: 2019, genero: 'accion',        precio: 19.99, precioOriginal: 39.99, rating: 5, descripcion: 'La caza de demonios más estilizada de la historia. Tres protagonistas y un sistema de combate que redefine el hack & slash.' },
  { id:  6, img: 'metroexodus.jpg',     imgHero: 'heroes/metroexodus_hero.jpg',     titulo: 'Metro Exodus',                   dev: '4A Games',               anio: 2019, genero: 'shooter',       precio: 24.99, precioOriginal: 49.99, rating: 4, descripcion: 'Abandoná los túneles de Moscú y viajá por la Rusia post-apocalíptica en un tren a vapor. Shooter semiabierto con atmósfera brutal.' },
  { id:  7, img: 'metalgearv.jpg',      imgHero: 'heroes/metalgearv_hero.jpg',      titulo: 'Metal Gear Solid V',             dev: 'Konami',                 anio: 2015, genero: 'accion',        precio: 14.99, precioOriginal: 29.99, rating: 5, descripcion: 'La obra maestra de Hideo Kojima. Infiltraciones en mundo abierto, IA adaptativa y narrativa que desafía la cuarta pared.' },
  { id:  8, img: 'sonsoftheforest.jpg', imgHero: 'heroes/sonsoftheforest_hero.jpg', titulo: 'Sons of the Forest',             dev: 'Endnight Games',         anio: 2023, genero: 'supervivencia', precio: 29.99,                         rating: 4, descripcion: 'Sobreviví en una isla habitada por caníbales mutantes. Construí refugios, fabricá herramientas y descubrí oscuros secretos.' },
  { id:  9, img: 'revillage.jpg',       imgHero: 'heroes/revillage_hero.jpg',       titulo: 'Resident Evil Village',          dev: 'Capcom',                 anio: 2021, genero: 'horror',        precio: 34.99,                         rating: 5, descripcion: 'Ethan Winters llega a una aldea de Europa del Este donde el terror adopta formas imposibles. Horror en primera persona con acción frenética.' },
  { id: 10, img: 'witcher3.jpg',        imgHero: 'heroes/witcher3_hero.jpg',        titulo: 'The Witcher 3: Wild Hunt',       dev: 'CD Projekt RED',         anio: 2015, genero: 'rpg',           precio: 19.99, precioOriginal: 39.99, rating: 5, descripcion: 'Considerado uno de los mejores RPGs de la historia. Un mundo vivo, decisiones con consecuencias reales y más de 200 horas de contenido.' },
  { id: 11, img: 'deadbydaylight.jpg',  imgHero: 'heroes/deadbydaylight_hero.jpg',  titulo: 'Dead by Daylight',               dev: 'Behaviour Interactive',  anio: 2016, genero: 'horror',        precio:  9.99, precioOriginal: 19.99, rating: 3, descripcion: 'Horror asimétrico: 4 supervivientes vs. 1 asesino. Una experiencia de terror único cada partida con decenas de personajes icónicos.' },
  { id: 12, img: 'r6siege.jpg',         imgHero: 'heroes/r6siege_hero.jpg',         titulo: 'Rainbow Six Siege',              dev: 'Ubisoft',                anio: 2015, genero: 'shooter',       precio: 14.99, precioOriginal: 29.99, rating: 4, descripcion: 'El shooter táctico de referencia. Destrucción de entornos en tiempo real y operadores con habilidades únicas.' },
  { id: 13, img: 'arcraiders.jpg',      imgHero: 'heroes/arcraiders_hero.jpg',      titulo: 'Arc Raiders',                    dev: 'Embark Studios',         anio: 2025, genero: 'shooter',       precio: 39.99,                         rating: 4, descripcion: 'Shooter de extracción cooperativo ambientado en un mundo post-apocalíptico bajo el asedio de máquinas alienígenas.' },
  { id: 14, img: 'acvalhalla.jpg',      imgHero: 'heroes/acvalhalla_hero.jpg',      titulo: "Assassin's Creed Valhalla",      dev: 'Ubisoft',                anio: 2020, genero: 'accion',        precio: 29.99, precioOriginal: 59.99, rating: 4, descripcion: 'Liderá incursiones vikingas en la Inglaterra del siglo IX. El RPG más grande de la franquicia con más de 100 horas de contenido.' },
  { id: 15, img: 'codmw3.jpg',          imgHero: 'heroes/codmw3_hero.jpg',          titulo: 'Call of Duty: Modern Warfare 3', dev: 'Activision',             anio: 2023, genero: 'shooter',       precio: 49.99,                         rating: 3, descripcion: 'Campaña de gran escala, mapas clásicos remasterizados y el modo Zombies de mundo abierto más ambicioso de la saga.' },
  { id: 16, img: 'diablo4.jpg',         imgHero: 'heroes/diablo4_hero.jpg',         titulo: 'Diablo IV',                      dev: 'Blizzard Entertainment', anio: 2023, genero: 'rpg',           precio: 44.99,                         rating: 4, descripcion: 'Regreso al horror oscuro de la saga. Mundo abierto compartido, cinco clases jugables y el sistema de loot más adictivo del género.' },
  { id: 17, img: 'starfield.jpg',       imgHero: 'heroes/starfield_hero.jpg',       titulo: 'Starfield',                      dev: 'Bethesda Game Studios',  anio: 2023, genero: 'rpg',           precio: 39.99, precioOriginal: 69.99, rating: 3, descripcion: 'La primera IP original de Bethesda en 25 años. Explorá más de 1000 planetas, construí naves y elegí tu camino en el cosmos.' },
  { id: 18, img: 'gowragnarok.jpg',     imgHero: 'heroes/gowragnarok_hero.jpg',     titulo: 'God of War: Ragnarök',           dev: 'Santa Monica Studio',    anio: 2022, genero: 'accion',        precio: 49.99,                         rating: 5, descripcion: 'Kratos y Atreus recorren los Nueve Reinos en una aventura épica que cierra una de las mejores trilogías del videojuego.' },
  { id: 19, img: 'gtav.jpg',            imgHero: 'heroes/gtav_hero.jpg',            titulo: 'GTA V',                          dev: 'Rockstar Games',         anio: 2013, genero: 'accion',        precio: 29.99, precioOriginal: 39.99, rating: 5, descripcion: 'Tres protagonistas, un mundo criminal sin fin. Los Ángeles reimaginada con campaña icónica y GTA Online, el multijugador más jugado de todos los tiempos.' },
  { id: 20, img: 'outlasttrials.jpg',   imgHero: 'heroes/outlasttrials_hero.jpg',   titulo: 'The Outlast Trials',             dev: 'Red Barrels',            anio: 2024, genero: 'horror',        precio: 29.99,                         rating: 4, descripcion: 'Horror cooperativo para hasta 4 jugadores. Sobreviví experimentos psicológicos de la Guerra Fría donde la cordura es el recurso más valioso.' },
  { id: 21, img: 'eldenring.jpg',       imgHero: 'heroes/eldenring_hero.jpg',       titulo: 'Elden Ring',                     dev: 'FromSoftware',           anio: 2022, genero: 'rpg',           precio: 49.99,                         rating: 5, descripcion: 'Juego del año 2022. George R.R. Martin y Miyazaki crearon el RPG de mundo abierto más desafiante y gratificante de la última década.' },
  { id: 22, img: 'baldursgate3.jpg',    imgHero: 'heroes/baldursgate3_hero.jpg',    titulo: "Baldur's Gate 3",                dev: 'Larian Studios',         anio: 2023, genero: 'rpg',           precio: 59.99,                         rating: 5, descripcion: 'El RPG más premiado de los últimos años. D&D 5e llevado al videojuego con libertad narrativa sin precedentes y miles de horas de contenido.' },
  { id: 23, img: 'alanwake2.jpg',       imgHero: 'heroes/alanwake2_hero.jpg',       titulo: 'Alan Wake 2',                    dev: 'Remedy Entertainment',   anio: 2023, genero: 'horror',        precio: 49.99,                         rating: 5, descripcion: 'Una experiencia narrativa que mezcla película y videojuego. Remedy rompe los límites del medio con una historia que se devora a sí misma.' },
  { id: 24, img: 're4remake.jpg',       imgHero: 'heroes/re4remake_hero.jpg',       titulo: 'Resident Evil 4 Remake',         dev: 'Capcom',                 anio: 2023, genero: 'horror',        precio: 39.99,                         rating: 5, descripcion: 'El remake definitivo de uno de los juegos más influyentes de la historia. León Kennedy regresa con controles modernos y visuales impresionantes.' },
];

/* Mapa de géneros → etiqueta visible al usuario */
export const ETIQUETAS_GENERO = {
  shooter:       'Shooter',
  rpg:           'RPG',
  accion:        'Acción',
  horror:        'Horror',
  supervivencia: 'Supervivencia',
};
