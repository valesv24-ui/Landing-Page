/* =============================================
   Amaretto's Café — main.js v7
   ISW-521 Laboratorio #1
   Funcionalidades:
     1. localStorage — tema oscuro/claro (html.dark)
     2. localStorage — nombre visitante
     3. localStorage — tamaño de fuente (accesibilidad)
     4. Menú hamburguesa (aria-expanded)
     5. Tabs del menú (role="tab" + aria-selected)
     6. Carrusel con dots (Flexbox transform)
     7. Scroll animations (IntersectionObserver)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     1. TEMA OSCURO/CLARO — localStorage
     Clave: "amarettos_dark_mode"
     - Al cargar: respeta la preferencia del sistema
       (prefers-color-scheme) si el usuario no ha
       elegido manualmente
     - Si el usuario usa el botón: guarda su elección
       en localStorage y esa tiene prioridad
     - Clase html.dark afecta TODA la página a través
       de las variables CSS en :root
  ================================================ */
  const themeBtn  = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const THEME_KEY = 'amarettos_dark_mode';

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      themeIcon.textContent = '☀️';
      themeBtn.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
      document.documentElement.classList.remove('dark');
      themeIcon.textContent = '🌙';
      themeBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
  }

  // Prioridad 1: preferencia guardada manualmente por el usuario
  // Prioridad 2: preferencia del sistema operativo (prefers-color-scheme)
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme !== null) {
    // El usuario ya eligió manualmente → respetar su elección
    applyTheme(savedTheme === 'true');
  } else {
    // Sin elección manual → seguir la preferencia del sistema
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  // Escuchar cambios en la preferencia del sistema en tiempo real
  // (solo si el usuario no ha elegido manualmente)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem(THEME_KEY) === null) {
      applyTheme(e.matches);
    }
  });

  // Botón manual: guarda en localStorage y tiene prioridad sobre el sistema
  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(!isDark);
    localStorage.setItem(THEME_KEY, String(!isDark));
  });


  /* ================================================
     2. NOMBRE DEL VISITANTE — localStorage
     Clave: "amarettos_visitor_name"
     Persiste entre sesiones (vs sessionStorage
     que se borra al cerrar la pestaña)
  ================================================ */
  const visitorInput = document.getElementById('visitorName');
  const saveBtn      = document.getElementById('saveNameBtn');
  const clearBtn     = document.getElementById('clearNameBtn');
  const welcomeMsg   = document.getElementById('welcome-msg');
  const NAME_KEY     = 'amarettos_visitor_name';

  function showWelcome(name) {
    if (!welcomeMsg) return;
    if (name && name.trim()) {
      welcomeMsg.textContent = `¡Bienvenido/a de vuelta, ${name.trim()}! 🧡 ¡Te esperamos!`;
      welcomeMsg.classList.add('visible');
      if (visitorInput) visitorInput.value = name.trim();
    } else {
      welcomeMsg.textContent = '';
      welcomeMsg.classList.remove('visible');
    }
  }

  // Recuperar al cargar (persistencia real)
  showWelcome(localStorage.getItem(NAME_KEY));

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const name = visitorInput ? visitorInput.value.trim() : '';
      if (name) {
        localStorage.setItem(NAME_KEY, name);
        showWelcome(name);
      } else {
        welcomeMsg.textContent = '⚠️ Escribí tu nombre primero.';
        welcomeMsg.classList.add('visible');
      }
    });
  }

  if (visitorInput) {
    visitorInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && saveBtn) saveBtn.click();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem(NAME_KEY);
      if (visitorInput) visitorInput.value = '';
      welcomeMsg.textContent = '✔ Nombre eliminado.';
      welcomeMsg.classList.add('visible');
      setTimeout(() => {
        welcomeMsg.textContent = '';
        welcomeMsg.classList.remove('visible');
      }, 3000);
    });
  }


  /* ================================================
     3. TAMAÑO DE FUENTE — localStorage (inclusión)
     Clave: "amarettos_font_size"
     Cicla entre 3 tamaños: normal → grande → extra grande
     Se aplica con clases en <html>: font-lg, font-xl
     Persiste al recargar la página
  ================================================ */
  const fontBtn   = document.getElementById('fontSizeBtn');
  const FONT_KEY  = 'amarettos_font_size';
  const fontSizes = ['normal', 'font-lg', 'font-xl'];
  const fontLabels= ['Tamaño normal', 'Texto grande', 'Texto extra grande'];

  function applyFontSize(size) {
    document.documentElement.classList.remove('font-lg', 'font-xl');
    if (size !== 'normal') {
      document.documentElement.classList.add(size);
    }
    // Actualizar aria-label del botón
    const idx = fontSizes.indexOf(size);
    const next = fontSizes[(idx + 1) % fontSizes.length];
    if (fontBtn) {
      fontBtn.setAttribute('aria-label', `${fontLabels[idx]} — clic para cambiar`);
      fontBtn.setAttribute('title', `Tamaño actual: ${fontLabels[idx]}`);
      // Indicador visual en el botón
      fontBtn.style.background = size === 'normal' ? '' : 'var(--color-primary)';
      fontBtn.style.color      = size === 'normal' ? '' : '#fff';
      fontBtn.style.borderColor= size === 'normal' ? '' : 'var(--color-primary)';
    }
  }

  // Recuperar del localStorage al cargar
  const savedFont = localStorage.getItem(FONT_KEY) || 'normal';
  applyFontSize(savedFont);

  if (fontBtn) {
    fontBtn.addEventListener('click', () => {
      const current = localStorage.getItem(FONT_KEY) || 'normal';
      const idx     = fontSizes.indexOf(current);
      const next    = fontSizes[(idx + 1) % fontSizes.length];
      applyFontSize(next);
      localStorage.setItem(FONT_KEY, next); // persistir
    });
  }


  /* ================================================
     4. MENÚ HAMBURGUESA — aria-expanded
     Clase #6, Slide 24
  ================================================ */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú de navegación');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      });
    });

    document.addEventListener('click', e => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ================================================
     5. TABS DEL MENÚ — aria-selected
     Clase #6, Slide 23
  ================================================ */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      tabPanels.forEach(p => { p.classList.remove('active'); p.hidden = true; });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');
        target.hidden = false;
        target.querySelectorAll('[data-animate]').forEach(el => {
          el.classList.remove('visible');
          requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
        });
      }
    });
  });


  /* ================================================
     6. CARRUSEL INFINITO — Flexbox transform
     Técnica: clonar slides al inicio y al final.
     El track tiene: [clones-fin | slides reales | clones-inicio]
     Cuando llega a los clones, salta instantáneamente
     (sin transición) al lado real equivalente.
  ================================================ */
  const track       = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn     = document.getElementById('carouselPrev');
  const nextBtn     = document.getElementById('carouselNext');

  if (track) {
    const realSlides  = Array.from(track.querySelectorAll('.carousel-slide'));
    const total       = realSlides.length;

    function getSlidesVisible() {
      if (window.innerWidth <= 600)  return 1;
      if (window.innerWidth <= 960)  return 2;
      return 3;
    }

    let visible  = getSlidesVisible();
    let current  = 0; // índice real (0 = primer slide real)
    let isJumping = false;

    // Clonar slides para el loop infinito
    // Al inicio del track: copias de los ÚLTIMOS slides
    // Al final del track:  copias de los PRIMEROS slides
    function buildClones() {
      // Quitar clones previos
      track.querySelectorAll('.carousel-clone').forEach(c => c.remove());

      // Clones al final (copias de los primeros `visible` slides)
      for (let i = 0; i < visible; i++) {
        const clone = realSlides[i % total].cloneNode(true);
        clone.classList.add('carousel-clone');
        clone.removeAttribute('data-animate');
        track.appendChild(clone);
      }

      // Clones al inicio (copias de los últimos `visible` slides)
      for (let i = visible - 1; i >= 0; i--) {
        const clone = realSlides[(total - 1 - (visible - 1 - i) + total) % total].cloneNode(true);
        clone.classList.add('carousel-clone');
        clone.removeAttribute('data-animate');
        track.prepend(clone);
      }
    }

    // Obtener ancho de slide + gap
    function getSlideWidth() {
      const slide = track.querySelector('.carousel-slide');
      if (!slide) return 0;
      const gap = parseInt(getComputedStyle(track).gap) || 16;
      return slide.offsetWidth + gap;
    }

    // Mover al índice real `idx` con o sin transición
    function moveTo(idx, animate = true) {
      const slideW  = getSlideWidth();
      // Los clones al inicio ocupan `visible` posiciones
      const offset  = (idx + visible) * slideW;

      if (!animate) {
        track.style.transition = 'none';
      } else {
        track.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1)';
      }
      track.style.transform = `translateX(-${offset}px)`;
    }

    // Actualizar dots
    function updateDots(idx) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === ((idx % total) + total) % total);
      });
    }

    // Ir a slide real idx (puede ser negativo o mayor que total — se corrige)
    function goTo(idx, animate = true) {
      current = idx;
      moveTo(current, animate);
      updateDots(((current % total) + total) % total);
      track.parentElement.setAttribute('aria-label',
        `Foto ${(((current % total) + total) % total) + 1} de ${total}`);
    }

    // Al terminar la transición, si estamos en zona de clones → saltar al real
    track.addEventListener('transitionend', () => {
      if (isJumping) return;
      if (current >= total) {
        isJumping = true;
        current = current - total;
        moveTo(current, false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { isJumping = false; });
        });
      } else if (current < 0) {
        isJumping = true;
        current = current + total;
        moveTo(current, false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { isJumping = false; });
        });
      }
      updateDots(((current % total) + total) % total);
    });

    // Construir dots
    function buildDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Ir a foto ${i + 1}`);
        dot.setAttribute('role', 'tab');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    // Init
    function init() {
      visible = getSlidesVisible();
      buildClones();
      buildDots();
      // Posicionar sin animación en el primer slide real
      requestAnimationFrame(() => {
        moveTo(0, false);
        updateDots(0);
      });
    }

    // Botones
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-avance cada 4s
    let autoPlay = setInterval(() => goTo(current + 1), 4000);

    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.parentElement.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => goTo(current + 1), 4000);
    });

    // Swipe táctil
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      clearInterval(autoPlay);
    }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
      autoPlay = setInterval(() => goTo(current + 1), 4000);
    });

    // Recalcular al redimensionar
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        visible = getSlidesVisible();
        init();
      }, 200);
    });

    init();
  }


  /* ================================================
     7. SCROLL ANIMATIONS — IntersectionObserver
     Activa clase "visible" al entrar al viewport.
  ================================================ */
  const animEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    animEls.forEach(el => observer.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }

});
