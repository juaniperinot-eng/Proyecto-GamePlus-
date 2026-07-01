'use strict';

/*
  main.js — punto de entrada de la aplicación.
*/

// 1. Importamos la nueva función conectora
const { cargarJuegosDesdeAirtable } = await import('./data.js'); 

const { cargarEstado }         = await import('./storage.js');
const { renderizarJuegos }     = await import('./catalog.js');
const { actualizarBtnComprar } = await import('./carrito.js');
const { initCarousel }         = await import('./carousel.js');
await import('./eventos.js');

// 2. SECUENCIA DE ARRANQUE ESTRICTA
await cargarJuegosDesdeAirtable(); // BLOQUEO: Espera a que lleguen los datos de internet
cargarEstado();                    // Restaura el carrito
actualizarBtnComprar();            // Habilita botones
renderizarJuegos();                // Pinta la grilla con los datos ya descargados
initCarousel();                    // Inicia el carrusel