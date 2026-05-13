# GamePlus+

Tienda de videojuegos digitales para PC.

**Proyecto académico · 1er Cuatrimestre 2026**

---

## Descripción general

GamePlus+ simula una plataforma de e-commerce de videojuegos digitales inspirada en Steam y PlayStation Store.

El usuario puede:

- Explorar un catálogo de 24 títulos con imagen, género, rating y precio.
- Filtrar por género y ordenar por precio, nombre o fecha.
- Buscar juegos en tiempo real desde el header.
- Agregar juegos al carrito de compras.
- Marcar juegos como favoritos.
- Ver el detalle de cada juego en un modal.
- Registrar y consultar el historial de compras.

Toda la información se persiste en el navegador mediante `localStorage`.

---

## Funcionalidades

| Funcionalidad | Detalle |
|---|---|
| Catálogo de juegos | 24 títulos con imagen, descripción, género, precio y rating |
| Filtros y búsqueda | Filtrado por género, ordenamiento y búsqueda en tiempo real |
| Carrito de compras | Alta, baja y vaciado; badge con conteo; persistencia entre sesiones |
| Favoritos | Guardado de juegos preferidos con badge independiente |
| Historial de compras | Registro cronológico de compras realizadas |
| Modal de detalle | Vista ampliada de cada juego con información completa |
| Carrusel hero | Presentación destacada con navegación manual y automática |
| Toasts | Feedback visual no intrusivo para acciones del usuario |
| Precios con descuento | Precio original tachado + precio promocional |
| Diseño responsive | Mobile-first con soporte tablet y desktop |

---

## Tecnologías utilizadas

- **HTML5** — estructura semántica completa en `index.html`
- **CSS3** — Flexbox, Grid, variables CSS y diseño responsive mobile-first
- **JavaScript ES2022** — módulos nativos, `Map`, `Set`, `async/await`, `localStorage`

> Sin dependencias externas · Sin frameworks · Sin bundlers

---

## Arquitectura técnica

La aplicación usa una arquitectura modular en JavaScript vanilla con separación estricta de responsabilidades.

Flujo de inicialización (`main.js`):

```
index.html  (HTML completo, DOM listo al cargar)
    ↓
storage.js  cargarEstado()        — restaura carrito/favoritos del localStorage
    ↓
carrito.js  actualizarBtnComprar() — sincroniza estado del botón de compra
    ↓
catalog.js  renderizarJuegos()    — pinta la grilla con los datos del catálogo
    ↓
carousel.js initCarousel()        — inicia el carrusel hero
    ↓
eventos.js                        — registra todos los listeners de la app
```

---

## Estructura del proyecto

```
index.html          Página única — todo el HTML está aquí
js/
  main.js           Punto de entrada e inicialización
  data.js           Catálogo de juegos (array de objetos)
  state.js          Estado compartido (carrito, favoritos, historial)
  dom.js            Referencias a elementos del DOM
  helpers.js        Funciones utilitarias (formato de precio, estrellas, etc.)
  storage.js        Lectura y escritura en localStorage
  catalog.js        Renderizado de la grilla de juegos y filtros
  carrito.js        Lógica del carrito de compras
  favoritos.js      Lógica de favoritos
  historial.js      Lógica del historial de compras
  paneles.js        Apertura y cierre de paneles laterales
  busqueda.js       Búsqueda en tiempo real
  carousel.js       Carrusel hero (autoplay + navegación manual)
  modal.js          Modal de detalle de juego
  eventos.js        Registro centralizado de todos los event listeners
css/
  base.css          Reset, variables y estilos globales
  header.css        Header, nav y menú mobile
  hero.css          Carrusel hero
  cards.css         Tarjetas de juego y sección tienda
  paneles.css       Paneles laterales y modal
  footer.css        Footer
  responsive.css    Media queries (tablet y desktop)
img/
  heroes/           Imágenes de fondo para el carrusel
  juegos/           Portadas de los juegos del catálogo
  logos/            Logo del sitio
```

---

## Contenidos académicos aplicados

### Estructuras de datos

- `Map` — carrito de compras (id → cantidad/precio)
- `Set` — sistema de favoritos

### Manipulación del DOM

- Creación dinámica de elementos con `createElement`
- Renderizado del catálogo en tiempo real
- Delegación de eventos para elementos generados dinámicamente

### Eventos

- Manejo de eventos de usuario (`click`, `input`, `change`)
- Delegación de eventos en contenedores dinámicos
- Centralización de listeners en `eventos.js`

### Modularización

- Código separado por responsabilidades
- ES Modules (`import`/`export`)
- Estado centralizado en `state.js`, sin acoplamiento entre módulos

### Persistencia

`localStorage` para guardar y restaurar entre sesiones:

- Carrito
- Favoritos
- Historial de compras

### Diseño responsive

- Mobile-first
- Adaptación a tablet (≥768 px) y desktop (≥1024 px)
- Flexbox y Grid

---

## Instalación y ejecución

> El proyecto requiere servidor local (ES Modules no funcionan en `file://`)

**Live Server (recomendado)**

1. Abrir proyecto en VS Code
2. Click derecho en `index.html`
3. "Open with Live Server"

**Node.js**

```bash
npx serve .
```

**Python**

```bash
python -m http.server 8080
```

---

## Demo

[https://juaniperinot-eng.github.io/Proyecto-GamePlus-](https://juaniperinot-eng.github.io/Proyecto-GamePlus-)

---

## Información académica

| Campo | Detalle |
|---|---|
| Materia | Aplicaciones Web Cliente |
| Comisión | 86795 |
| Cuatrimestre | 1er Cuatrimestre 2026 |
| Autor | Juan Perinot |
