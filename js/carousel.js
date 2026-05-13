'use strict';

/* =============================================
   MÓDULO: carousel.js
   Responsabilidad: hero carousel — navegación por
   slides, autoplay, dots, swipe táctil y pausa
   al cambiar de pestaña.

   Por qué existe: el carousel tiene su propio estado
   interno (slideActual, autoPlayTimer, variables de
   touch) que no necesitan ser compartidos. Al agrupar
   el estado Y los eventos del carousel en un solo
   módulo, el módulo se autogestiona completamente:
   eventos.js no necesita saber nada del carousel.

   Exporta: iniciarAutoplay, detenerAutoplay, initCarousel

   Importa:
     dom.js — carouselTrack, dotsContainer, btnPrev,
              btnNext, heroSection
   ============================================= */

import { carouselTrack, dotsContainer, btnPrev, btnNext, heroSection } from './dom.js';

/* CLASE 5 y 7 — Carousel
   Responsive con position absolute y JavaScript */

const TOTAL_SLIDES = 4;
const AUTOPLAY_MS  = 5000;

/* Estado privado del carousel — no se exporta */
let slideActual  = 0;
let autoPlayTimer = null;
let touchStartX   = 0;
let isDragging    = false;

function irASlide(n) {
  /* Bucle infinito: vuelve al principio al pasar del último */
  slideActual = ((n % TOTAL_SLIDES) + TOTAL_SLIDES) % TOTAL_SLIDES;
  carouselTrack.style.transform = `translateX(-${slideActual * 100}%)`;
  actualizarDots();
}

function actualizarDots() {
  dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('dot--activo', i === slideActual);
  });
}

function siguienteSlide() { irASlide(slideActual + 1); }
function anteriorSlide()  { irASlide(slideActual - 1); }

export function iniciarAutoplay() {
  detenerAutoplay();
  autoPlayTimer = setInterval(siguienteSlide, AUTOPLAY_MS);
}

export function detenerAutoplay() {
  clearInterval(autoPlayTimer);
}

/* Registra todos los eventos del carousel e inicia el autoplay.
   Se llama una sola vez desde main.js. */
export function initCarousel() {
  btnPrev.addEventListener('click', () => { anteriorSlide(); iniciarAutoplay(); });
  btnNext.addEventListener('click', () => { siguienteSlide(); iniciarAutoplay(); });

  dotsContainer.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      irASlide(Number(dot.dataset.slide));
      iniciarAutoplay();
    });
  });

  /* Pausa al pasar el mouse por encima */
  heroSection.addEventListener('mouseenter', detenerAutoplay);
  heroSection.addEventListener('mouseleave', iniciarAutoplay);

  /* Swipe táctil */
  heroSection.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    isDragging  = true;
    detenerAutoplay();
  }, { passive: true });

  heroSection.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 50) deltaX > 0 ? siguienteSlide() : anteriorSlide();
    iniciarAutoplay();
  }, { passive: true });

  /* Pausa cuando la pestaña está oculta — ahorra CPU */
  document.addEventListener('visibilitychange', () => {
    document.hidden ? detenerAutoplay() : iniciarAutoplay();
  });

  iniciarAutoplay();
}
