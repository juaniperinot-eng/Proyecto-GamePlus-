# GamePlus+

Tienda de videojuegos digitales para PC.

**Proyecto académico · 1er Cuatrimestre 2026**

---

## Descripción general

GamePlus+ simula una plataforma de e-commerce de videojuegos digitales inspirada en Steam y PlayStation Store.

El usuario puede:

- Explorar un catálogo de 24 títulos obtenidos dinámicamente desde la API REST de Airtable, incluyendo imagen, género, rating, descripción y precio.
- Filtrar por género y ordenar por precio, nombre o fecha.
- Buscar juegos en tiempo real desde el header.
- Agregar juegos al carrito de compras.
- Marcar juegos como favoritos.
- Ver el detalle de cada juego en un modal.
- Registrar y consultar el historial de compras.

Los datos del catálogo se obtienen dinámicamente desde la API REST de Airtable, mientras que la información del usuario (carrito, favoritos e historial) se persiste en el navegador mediante `localStorage`.

---

## Funcionalidades

| Funcionalidad | Detalle |
|---|---|
| Catálogo dinámico | Obtención de datos desde Airtable mediante API REST y renderizado dinámico del catálogo |
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
- **JavaScript ES2022** — módulos nativos, `Map`, `Set`, `Promises`, `async/await`, `fetch()` y `localStorage`
- **Airtable REST API** — Backend as a Service (BaaS) utilizado como fuente de datos del catálogo de videojuegos.

> Sin dependencias externas · Sin frameworks · Sin bundlers

---

## Arquitectura técnica

La aplicación utiliza una arquitectura modular en JavaScript Vanilla con una clara separación de responsabilidades entre la obtención de datos, el manejo del estado y la interfaz de usuario.

### Flujo de inicialización (`main.js`)

```text
index.html  (DOM listo al cargar)
    ↓
data.js     cargarJuegosDesdeAirtable() — obtiene los datos del catálogo mediante la API REST de Airtable
    ↓
storage.js  cargarEstado()              — restaura carrito, favoritos e historial desde localStorage
    ↓
carrito.js  actualizarBtnComprar()      — sincroniza el estado del botón de compra
    ↓
catalog.js  renderizarJuegos()          — renderiza dinámicamente la grilla con los datos obtenidos
    ↓
carousel.js initCarousel()              — inicia el carrusel hero
    ↓
eventos.js                              — registra todos los listeners de la aplicación
```

---

## Estructura del proyecto

```text
index.html          Página principal de la aplicación
js/
  main.js           Punto de entrada e inicialización
  data.js           Consumo de la API REST de Airtable y transformación de datos
  state.js          Estado compartido (carrito, favoritos e historial)
  dom.js            Referencias a elementos del DOM
  helpers.js        Funciones utilitarias (precios, estrellas, etc.)
  storage.js        Persistencia en localStorage
  catalog.js        Renderizado del catálogo y filtros
  carrito.js        Lógica del carrito de compras
  favoritos.js      Gestión de favoritos
  historial.js      Registro del historial de compras
  paneles.js        Apertura y cierre de paneles laterales
  busqueda.js       Búsqueda en tiempo real
  carousel.js       Carrusel hero (autoplay + navegación manual)
  modal.js          Modal de detalle del videojuego
  eventos.js        Registro centralizado de eventos
css/
  base.css          Variables, reset y estilos globales
  header.css        Encabezado y navegación
  hero.css          Carrusel principal
  cards.css         Tarjetas del catálogo
  paneles.css       Paneles laterales y modal
  footer.css        Pie de página
  responsive.css    Adaptación para tablet y desktop
img/
  heroes/           Imágenes del carrusel
  juegos/           Portadas de videojuegos
  logos/            Recursos gráficos del sitio
```

---

## Integración con Airtable

El catálogo de videojuegos se obtiene dinámicamente desde una base de datos alojada en Airtable mediante su API REST.

Flujo general de datos:

```text
Base de datos Airtable
          ↓
      API REST
          ↓
fetch() + async/await
          ↓
Respuesta JSON
          ↓
Transformación de datos
          ↓
Renderizado dinámico del catálogo
```

Esta arquitectura permite desacoplar la información de la interfaz, facilitando la actualización del catálogo sin modificar el código fuente de la aplicación.

---

## Contenidos académicos aplicados

### Consumo de APIs y asincronismo

- Consumo de la API REST de Airtable mediante peticiones HTTP utilizando `fetch()`.
- Manejo de operaciones asíncronas mediante `Promises` y `async/await`.
- Conversión de respuestas JSON en objetos JavaScript.
- Procesamiento y renderizado dinámico de la información obtenida desde la API.

### Estructuras de datos

- `Map` para la administración del carrito de compras.
- `Set` para la gestión de videojuegos favoritos.

### Manipulación del DOM

- Creación dinámica de elementos con `createElement`.
- Actualización dinámica de la interfaz según los datos recibidos desde la API.
- Delegación de eventos para elementos generados dinámicamente.

### Eventos

- Manejo de eventos (`click`, `input`, `change`).
- Delegación de eventos sobre contenedores dinámicos.
- Centralización de listeners en `eventos.js`.

### Modularización

- Separación del código por responsabilidades.
- Uso de ES Modules (`import` / `export`).
- Estado compartido centralizado mediante `state.js`.
- Separación entre la capa de acceso a datos y la capa de presentación.

### Persistencia local

La información propia del usuario se mantiene entre sesiones utilizando `localStorage`:

- Carrito de compras.
- Favoritos.
- Historial de compras.

### Diseño responsive

- Enfoque Mobile First.
- Adaptación para tablet (≥768 px).
- Adaptación para escritorio (≥1024 px).
- Uso de Flexbox y CSS Grid para la distribución de componentes.

---

## Instalación y ejecución

> El proyecto requiere un servidor local, ya que los ES Modules no funcionan correctamente mediante `file://`.

> Para visualizar el catálogo es necesario contar con conexión a Internet, ya que los datos se obtienen dinámicamente desde la API REST de Airtable.

### Live Server (recomendado)

1. Abrir el proyecto en Visual Studio Code.
2. Hacer clic derecho sobre `index.html`.
3. Seleccionar **Open with Live Server**.

### Node.js

```bash
npx serve .
```

### Python

```bash
python -m http.server 8080
```

---

## Demo en línea

https://juaniperinot-eng.github.io/Proyecto-GamePlus-/

---

## Información académica

| Campo | Detalle |
|---|---|
| Materia | Aplicaciones Web Cliente |
| Comisión | 86795 |
| Cuatrimestre | 1.er Cuatrimestre 2026 |
| Proyecto | Segundo Parcial |
| Autor | Juan Ignacio Perinot |

---

## Objetivos académicos alcanzados

- Desarrollo de una Single Page Application (SPA) utilizando JavaScript Vanilla.
- Modularización completa del código mediante ES Modules.
- Consumo de una API REST externa utilizando `fetch()`.
- Implementación de programación asíncrona mediante `Promises` y `async/await`.
- Integración de una base de datos en la nube utilizando Airtable.
- Persistencia local mediante `localStorage`.
- Manipulación dinámica del DOM.
- Aplicación de diseño responsive Mobile First.
- Organización del proyecto siguiendo buenas prácticas de separación de responsabilidades.