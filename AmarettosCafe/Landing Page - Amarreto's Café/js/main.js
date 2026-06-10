/* =============================================
   Amaretto's Café — main.js
   ISW-521 Laboratorio #1
   JavaScript nativo — sin librerías externas
   Implementa:
     1. localStorage — tema oscuro/claro
     2. localStorage — nombre del visitante
     3. Menú hamburguesa (móvil)
     4. Tabs del menú (accesibles)
     5. Scroll animations (IntersectionObserver)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     1. WEB STORAGE — TEMA (localStorage)
     Clave: "amarettos_dark_mode"
     Persiste entre sesiones al recargar la página.
  ================================================ */
  const themeBtn  = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const THEME_KEY = 'amarettos_dark_mode';

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      themeIcon.textContent = '☀️';
      themeBtn.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
      document.body.classList.remove('dark-mode');
      themeIcon.textContent = '🌙';
      themeBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
  }

  // Recuperar del localStorage al cargar (persistencia real)
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme !== null) {
    applyTheme(savedTheme === 'true');
  } else {
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    applyTheme(!isDark);
    localStorage.setItem(THEME_KEY, String(!isDark)); // guardar en localStorage
  });


  /* ================================================
     2. WEB STORAGE — NOMBRE VISITANTE (localStorage)
     Clave: "amarettos_visitor_name"
     Se recupera y muestra al recargar la página.
     Diferencia vs sessionStorage: persiste aunque
     se cierre el navegador.
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

  // Recuperar del localStorage al cargar (persistencia real)
  showWelcome(localStorage.getItem(NAME_KEY));

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const name = visitorInput ? visitorInput.value.trim() : '';
      if (name) {
        localStorage.setItem(NAME_KEY, name); // guardar en localStorage
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
      localStorage.removeItem(NAME_KEY); // eliminar del localStorage
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
     3. MENÚ HAMBURGUESA — móvil
     Controla aria-expanded y clase "open".
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
     4. TABS DEL MENÚ — accesibles con ARIA
  ================================================ */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');

      // Desactivar todos
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });

      // Activar el seleccionado
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');
        target.hidden = false;
        // Re-disparar animaciones del panel
        target.querySelectorAll('[data-animate]').forEach(el => {
          el.classList.remove('visible');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => el.classList.add('visible'));
          });
        });
      }
    });
  });


  /* ================================================
     5. SCROLL ANIMATIONS — IntersectionObserver
     Añade clase "visible" cuando el elemento
     entra en el viewport.
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
