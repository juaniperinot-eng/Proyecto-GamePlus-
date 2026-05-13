'use strict';

/* =============================================
   MÓDULO: eventos.js
   Responsabilidad: registrar todos los event
   listeners de la aplicación.

   Por qué existe: separar "qué hace la app" (lógica
   en los otros módulos) de "cuándo lo hace" (eventos
   aquí) es el principio de separación de preocupaciones.
   Con todos los listeners en un solo lugar es fácil
   ver de un vistazo todas las interacciones posibles
   del usuario con la UI.

   No exporta nada: su efecto es registrar los listeners
   como efecto secundario al ser importado por main.js.

   Importa: prácticamente todos los demás módulos,
   porque es la capa de "cableado" entre UI y lógica.
   ============================================= */

import { carrito, estado } from './state.js';
import {
  grilla,
  btnBuscar, btnCerrarBusqueda, inputBusqueda,
  btnAbrirCarrito, btnCerrarCarrito, btnComprar,
  btnAbrirFavoritos, btnCerrarFavoritos, btnAgregarTodos,
  btnCerrarHistorial,
  overlay, carritoSidebar, favoritosSidebar, historialSidebar,
  modalJuego, panelBusqueda, modalCerrar, modalBtnAgregar, modalBtnFavorito,
  filtrosNav, selectOrden,
  btnHamburger, menuMobile,
  headerEl,
} from './dom.js';
import { renderizarJuegos } from './catalog.js';
import { agregarAlCarrito, procesarCompra } from './carrito.js';
import { toggleFavorito, agregarTodosAlCarrito } from './favoritos.js';
import { abrirCarrito, cerrarCarrito, abrirFavoritos, cerrarFavoritos, abrirHistorial, cerrarHistorial } from './paneles.js';
import { abrirBusqueda, cerrarBusqueda, mostrarResultadosBusqueda } from './busqueda.js';
import { abrirModal, cerrarModal, actualizarModalBtns } from './modal.js';

/* CLASE 3 y 6 — Eventos y listeners
   Consigna: addEventListener para manejar
   interacciones del usuario con el DOM */

/* --- Búsqueda --- */
btnBuscar.addEventListener('click', () => {
  cerrarCarrito(false);
  cerrarFavoritos(false);
  abrirBusqueda();
});

btnCerrarBusqueda.addEventListener('click', cerrarBusqueda);

let debounceTimer = null;
inputBusqueda.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => mostrarResultadosBusqueda(inputBusqueda.value), 150);
});

/* --- Carrito --- */
btnAbrirCarrito.addEventListener('click', abrirCarrito);
btnCerrarCarrito.addEventListener('click', cerrarCarrito);

btnComprar.addEventListener('click', () => {
  procesarCompra();
  cerrarCarrito();
});

/* --- Favoritos --- */
btnAbrirFavoritos.addEventListener('click', abrirFavoritos);
btnCerrarFavoritos.addEventListener('click', cerrarFavoritos);
btnAgregarTodos.addEventListener('click', agregarTodosAlCarrito);

/* --- Historial --- */
btnCerrarHistorial.addEventListener('click', cerrarHistorial);

document.querySelectorAll('.link-mis-juegos').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); abrirHistorial(); });
});

/* --- Overlay: cierra el panel lateral abierto --- */
overlay.addEventListener('click', () => {
  if (carritoSidebar.classList.contains('abierto'))   cerrarCarrito();
  if (favoritosSidebar.classList.contains('abierto')) cerrarFavoritos();
  if (historialSidebar.classList.contains('abierto')) cerrarHistorial();
});

/* --- Escape: cierra lo que esté abierto (modal tiene prioridad) --- */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!modalJuego.hidden)                             { cerrarModal();     return; }
  if (panelBusqueda.classList.contains('abierto'))    { cerrarBusqueda();  return; }
  if (carritoSidebar.classList.contains('abierto'))   { cerrarCarrito();   return; }
  if (favoritosSidebar.classList.contains('abierto')) { cerrarFavoritos(); return; }
  if (historialSidebar.classList.contains('abierto')) { cerrarHistorial(); return; }
});

/* --- Modal --- */
modalCerrar.addEventListener('click', cerrarModal);
modalJuego.addEventListener('click', e => { if (e.target === modalJuego) cerrarModal(); });

modalBtnAgregar.addEventListener('click', () => {
  if (!estado.juegoModalActual) return;
  agregarAlCarrito(estado.juegoModalActual.id);
  actualizarModalBtns();
});

modalBtnFavorito.addEventListener('click', () => {
  if (!estado.juegoModalActual) return;
  toggleFavorito(estado.juegoModalActual.id);
  actualizarModalBtns();
});

/* --- Grilla: delegación de eventos en un solo listener --- */
grilla.addEventListener('click', e => {
  const btnFav     = e.target.closest('.btn-favorito');
  const btnAgregar = e.target.closest('.btn-agregar');
  const tarjeta    = e.target.closest('.tarjeta--clickable');

  if (btnFav) {
    toggleFavorito(Number(btnFav.dataset.id));
    return;
  }

  if (btnAgregar) {
    const id = Number(btnAgregar.dataset.id);
    /* Si ya está en el carrito, abrimos el panel en lugar de agregar de nuevo */
    if (carrito.has(id)) {
      abrirCarrito();
    } else {
      agregarAlCarrito(id);
    }
    return;
  }

  if (tarjeta) {
    abrirModal(Number(tarjeta.dataset.id));
  }
});

/* --- Filtros de género --- */
filtrosNav.forEach(item => {
  item.addEventListener('click', () => {
    filtrosNav.forEach(el => el.classList.remove('filtro-activo'));
    item.classList.add('filtro-activo');
    estado.filtroActual = item.dataset.filtro;
    renderizarJuegos();
  });
});

/* --- Ordenamiento --- */
selectOrden.addEventListener('change', () => {
  estado.ordenActual = selectOrden.value;
  renderizarJuegos(estado.terminoActual);
});

/* --- Menú hamburguesa --- */
btnHamburger.addEventListener('click', function () {
  const abierto = menuMobile.classList.toggle('abierto');
  this.setAttribute('aria-expanded', String(abierto));
  this.innerHTML = abierto ? '&#10005;' : '&#9776;';
});

menuMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuMobile.classList.remove('abierto');
    btnHamburger.setAttribute('aria-expanded', 'false');
    btnHamburger.innerHTML = '&#9776;';
  });
});

/* --- Header scroll: clase "scrolled" para efecto premium --- */
window.addEventListener('scroll', () => {
  headerEl.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });
