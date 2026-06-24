/* =============================================
   Amaretto's Café — main.js v8
   ISW-521 Laboratorio #1
   Funcionalidades:
     1. localStorage — tema oscuro/claro
     2. localStorage — nombre visitante
     3. localStorage — tamaño fuente
     4. localStorage — alto contraste
     5. localStorage — idioma (ES/EN)
     6. Navbar oculto al bajar, visible al subir
     7. Menú hamburguesa
     8. Tabs del menú
     9. Carrusel infinito (Flexbox)
    10. Lector de voz (Web Speech API)
    11. Botón volver arriba
    12. Panel de accesibilidad flotante
    13. Scroll animations (IntersectionObserver)
   ============================================= */

/* ================================================
   TRADUCCIONES ES / EN
================================================ */
const i18n = {
  es: {
    'nav.inicio':'Inicio','nav.menu':'Menú','nav.galeria':'Galería','nav.nosotros':'Nosotros','nav.contacto':'Contacto',
    'hero.eyebrow':'Ciudad Quesada · San Carlos · Costa Rica',
    'hero.title1':'Más que café.','hero.title2':'Momentos que se quedan.',
    'hero.sub':'Repostería 100% artesanal, cafés de especialidad, desayunos y almuerzos. Donde el buen sabor es la costumbre.',
    'marquee.1':'Desayunos Amarettos','marquee.2':'Cafés de Especialidad','marquee.3':'Repostería 100% Artesanal',
    'marquee.4':'Almuerzos 12md–3pm','marquee.5':'Crepas & Postres','marquee.6':'Special Shakes','marquee.7':'Bowl de Salmón','marquee.8':'Emparedados & Pitas',
    'stats.heading':'Datos de Amaretto\'s Café','stats.1':'Años de trayectoria','stats.2':'Clientes felices','stats.3':'De servicio diario','stats.4':'Opciones en menú',
    'menu.tag':'Lo que ofrecemos','menu.heading':'Nuestro Menú','menu.sub':'Precios en colones costarricenses (₡). Menú sujeto a cambios según disponibilidad.',
    'tab.bebidas':'Bebidas','tab.desayuno':'Desayunos','tab.emparedados':'Emparedados','tab.almuerzo':'Almuerzos','tab.postres':'Postres','tab.antojitos':'Antojitos',
    'badge.bebidas':'¿Cuál es el tuyo?','badge.desayuno':'¡Empieza el día excelente!','badge.emparedados':'Pan blanco o integral',
    'badge.almuerzo':'Almuerzos · 12md – 3pm','badge.postres':'Repostería 100% artesanal','badge.antojitos':'Cada mordisco vale.',
    'mcat.calientes':'Bebidas Calientes','mcat.frias':'Bebidas Frías','mcat.naturales':'Bebidas Naturales',
    'mcat.tipicos':'Nuestros Típicos','mcat.cafecito':'Para acompañar tu café',
    'mcat.emparedados':'Emparedados','mcat.pitas':'Pitas','mcat.infantil':'Menú Infantil',
    'mcat.casados':'Casados · ₡4,000','mcat.casados.desc':'Arroz · Frijoles · Picadillo · Ensalada · Plátano · Bebida incluida',
    'mcat.platos':'Platos Fuertes','mcat.ensaladas':'Ensaladas & Bowls',
    'mcat.queques':'Nuestros Queques','mcat.postres':'Postres','mcat.crepas':'Crepas',
    'mcat.antojitos':'Antojitos','mcat.compartir':'Para Compartir',
    'gallery.tag':'Nuestros platos','gallery.title1':'Hecho con amor,','gallery.title2':'servido con orgullo.',
    'about.tag':'Quiénes somos','about.title1':'Un café con alma','about.title2':'quesadeña.',
    'about.p1':'Nacimos en el corazón de Ciudad Quesada con una sola misión: ser ese lugar donde cada persona se sienta en casa. A solo <strong>25 metros al sur de la Catedral</strong>, somos el punto de encuentro de familias, trabajadores y visitantes de San Carlos.',
    'about.p2':'Más de <strong>12 años</strong> preparando los mejores cafés, desayunos, almuerzos y postres. Siempre con ingredientes frescos y amor en cada preparación.',
    'about.f1':'Repostería 100% artesanal','about.f2':'Cafés de especialidad','about.f3':'Desayunos, almuerzos y cenas','about.f4':'Ambiente acogedor y limpio',
    'testi.tag':'Opiniones reales','testi.heading':'Lo que dicen nuestros clientes',
    'testi.1':'"Comida increíble, postres deliciosos y excelente servicio. Un gran lugar para una pausa de café."',
    'testi.2':'"Llevamos 12 años siendo clientes. El queque de zanahoria y el arreglado son los mejores de San Carlos."',
    'testi.3':'"Un lugar ameno y agradable. Ricos emparedados y el mejor ambiente para trabajar con un buen café."',
    'contact.tag':'Visitanos','contact.title1':'Encuéntranos en','contact.title2':'Ciudad Quesada.',
    'contact.redes':'Redes Sociales',
    'contact.form.title':'¿Primera vez por aquí?','contact.form.sub':'Dejanos tu nombre y te damos la bienvenida 😊',
    'contact.form.label':'Tu nombre','contact.form.hint':'Lo guardamos en tu navegador para recordarte 🧡',
    'contact.form.save':'Guardar','contact.form.forget':'Olvidar',
    'contact.horario':'Lun–Sáb · 8:00 a.m. – 7:00 p.m.',
    'contact.direccion':'25 metros al sur de la Catedral, Ciudad Quesada, San Carlos',
    'footer.loc':'Ciudad Quesada, San Carlos · Costa Rica',
    'footer.copy':'© 2024 Amaretto\'s Café. Todos los derechos reservados.'
  },
  en: {
    'nav.inicio':'Home','nav.menu':'Menu','nav.galeria':'Gallery','nav.nosotros':'About','nav.contacto':'Contact',
    'hero.eyebrow':'Quesada City · San Carlos · Costa Rica',
    'hero.title1':'More than coffee.','hero.title2':'Moments that stay with you.',
    'hero.sub':'100% artisan pastries, specialty coffees, breakfasts and lunches. Where great flavor is the tradition.',
    'marquee.1':'Amarettos Breakfasts','marquee.2':'Specialty Coffees','marquee.3':'100% Artisan Pastries',
    'marquee.4':'Lunches 12pm–3pm','marquee.5':'Crepes & Desserts','marquee.6':'Special Shakes','marquee.7':'Salmon Bowl','marquee.8':'Sandwiches & Pitas',
    'stats.heading':'About Amaretto\'s Café','stats.1':'Years of experience','stats.2':'Happy customers','stats.3':'Daily service hours','stats.4':'Menu options',
    'menu.tag':'What we offer','menu.heading':'Our Menu','menu.sub':'Prices in Costa Rican colones (₡). Menu subject to change based on availability.',
    'tab.bebidas':'Drinks','tab.desayuno':'Breakfast','tab.emparedados':'Sandwiches','tab.almuerzo':'Lunch','tab.postres':'Desserts','tab.antojitos':'Snacks',
    'badge.bebidas':'Which one is yours?','badge.desayuno':'Start your day right!','badge.emparedados':'White or whole wheat bread',
    'badge.almuerzo':'Lunch · 12pm – 3pm','badge.postres':'100% artisan pastries','badge.antojitos':'Every bite is worth it.',
    'mcat.calientes':'Hot Drinks','mcat.frias':'Cold Drinks','mcat.naturales':'Natural Drinks',
    'mcat.tipicos':'Our Classics','mcat.cafecito':'Perfect with your coffee',
    'mcat.emparedados':'Sandwiches','mcat.pitas':'Pitas','mcat.infantil':'Kids Menu',
    'mcat.casados':'Set Meals · ₡4,000','mcat.casados.desc':'Rice · Beans · Hash · Salad · Plantain · Drink included',
    'mcat.platos':'Main Dishes','mcat.ensaladas':'Salads & Bowls',
    'mcat.queques':'Our Cakes','mcat.postres':'Desserts','mcat.crepas':'Crepes',
    'mcat.antojitos':'Snacks','mcat.compartir':'To Share',
    'gallery.tag':'Our dishes','gallery.title1':'Made with love,','gallery.title2':'served with pride.',
    'about.tag':'Who we are','about.title1':'A café with a','about.title2':'Quesada soul.',
    'about.p1':'We were born in the heart of Ciudad Quesada with one mission: to be the place where everyone feels at home. Just <strong>25 meters south of the Cathedral</strong>, we are the meeting point for families, workers and visitors of San Carlos.',
    'about.p2':'More than <strong>12 years</strong> preparing the best coffees, breakfasts, lunches and desserts. Always with fresh ingredients and love in every preparation.',
    'about.f1':'100% artisan pastries','about.f2':'Specialty coffees','about.f3':'Breakfast, lunch and dinner','about.f4':'Cozy and clean atmosphere',
    'testi.tag':'Real reviews','testi.heading':'What our customers say',
    'testi.1':'"Incredible food, delicious desserts and excellent service. A great place for an afternoon coffee break."',
    'testi.2':'"We\'ve been customers for 12 years. The carrot cake and the empanadas are the best in San Carlos."',
    'testi.3':'"A pleasant and agreeable place. Great sandwiches and the best atmosphere to work with a good coffee."',
    'contact.tag':'Visit us','contact.title1':'Find us in','contact.title2':'Ciudad Quesada.',
    'contact.redes':'Social Media',
    'contact.form.title':'First time here?','contact.form.sub':'Leave your name and we\'ll welcome you every visit 😊',
    'contact.form.label':'Your name','contact.form.hint':'We save it in your browser to remember you 🧡',
    'contact.form.save':'Save','contact.form.forget':'Forget',
    'contact.horario':'Mon–Sat · 8:00 a.m. – 7:00 p.m.',
    'contact.direccion':'25 meters south of the Cathedral, Ciudad Quesada, San Carlos',
    'footer.loc':'Ciudad Quesada, San Carlos · Costa Rica',
    'footer.copy':'© 2024 Amaretto\'s Café. All rights reserved.'
  }
};

let currentLang = 'es';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = i18n[lang][key];
    if (val !== undefined) el.innerHTML = val;
  });
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.id === 'lang' + lang.charAt(0).toUpperCase() + lang.slice(1)));
  document.querySelector('#visitorName')?.setAttribute('placeholder', lang === 'en' ? 'Write your name...' : 'Escribe tu nombre...');
  localStorage.setItem('amarettos_lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {

  /* 1. TEMA */
  const themeBtn  = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const THEME_KEY = 'amarettos_dark_mode';
  function applyTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme !== null) applyTheme(savedTheme === 'true');
  else applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem(THEME_KEY) === null) applyTheme(e.matches);
  });
  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(!isDark);
    localStorage.setItem(THEME_KEY, String(!isDark));
  });

  /* 2. NOMBRE VISITANTE — localStorage (requisito ISW-521)
     Se guarda en background sin formulario visible.
     El dato persiste entre sesiones (vs sessionStorage). */
  const NAME_KEY = 'amarettos_visitor_name';
  // Guardar nombre automáticamente si no existe
  if (!localStorage.getItem(NAME_KEY)) {
    localStorage.setItem(NAME_KEY, 'visitante');
  }

  /* 3. TAMAÑO FUENTE */
  const FONT_KEY  = 'amarettos_font_size';
  const fontSizes = ['normal', 'font-lg', 'font-xl', 'font-xxl'];
  function applyFontSize(size) {
    document.documentElement.classList.remove('font-lg','font-xl','font-xxl');
    if (size !== 'normal') document.documentElement.classList.add(size);
    localStorage.setItem(FONT_KEY, size);
  }
  applyFontSize(localStorage.getItem(FONT_KEY) || 'normal');
  document.getElementById('fontIncrease')?.addEventListener('click', () => {
    const cur = localStorage.getItem(FONT_KEY) || 'normal';
    const idx = fontSizes.indexOf(cur);
    if (idx < fontSizes.length - 1) applyFontSize(fontSizes[idx + 1]);
  });
  document.getElementById('fontDecrease')?.addEventListener('click', () => {
    const cur = localStorage.getItem(FONT_KEY) || 'normal';
    const idx = fontSizes.indexOf(cur);
    if (idx > 0) applyFontSize(fontSizes[idx - 1]);
  });
  document.getElementById('fontReset')?.addEventListener('click', () => applyFontSize('normal'));

  /* 4. ALTO CONTRASTE */
  const CONTRAST_KEY = 'amarettos_high_contrast';
  const contrastBtn  = document.getElementById('contrastBtn');
  function applyContrast(on) {
    document.documentElement.classList.toggle('high-contrast', on);
    if (contrastBtn) contrastBtn.classList.toggle('active', on);
    localStorage.setItem(CONTRAST_KEY, String(on));
  }
  applyContrast(localStorage.getItem(CONTRAST_KEY) === 'true');
  contrastBtn?.addEventListener('click', () => {
    applyContrast(!document.documentElement.classList.contains('high-contrast'));
  });

  /* 5. IDIOMA */
  const LANG_KEY = 'amarettos_lang';
  const savedLang = localStorage.getItem(LANG_KEY) || 'es';
  applyLang(savedLang);
  document.getElementById('langEs')?.addEventListener('click', () => applyLang('es'));
  document.getElementById('langEn')?.addEventListener('click', () => applyLang('en'));

  /* 6. PANEL ACCESIBILIDAD FLOTANTE */
  const a11yToggle = document.getElementById('a11yToggle');
  const a11yMenu   = document.getElementById('a11yMenu');
  a11yToggle?.addEventListener('click', () => {
    const open = a11yMenu.hidden;
    a11yMenu.hidden = !open;
    a11yToggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', e => {
    if (a11yMenu && !a11yMenu.hidden && !a11yMenu.contains(e.target) && !a11yToggle.contains(e.target)) {
      a11yMenu.hidden = true;
      a11yToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* 7. LECTOR DE VOZ (Web Speech API) */
  const readerBtn = document.getElementById('readerBtn');
  let isSpeaking  = false;
  let uttQueue    = [];

  function buildReadingText() {
    const parts = [];

    // Hero
    const hero = document.getElementById('inicio');
    if (hero) {
      const eyebrow = hero.querySelector('.hero-eyebrow')?.textContent || '';
      const title   = hero.querySelector('.hero-title')?.textContent || '';
      const sub     = hero.querySelector('.hero-sub')?.textContent || '';
      parts.push(eyebrow + '. ' + title + '. ' + sub);
    }

    // Stats
    const stats = document.querySelectorAll('.stat-item');
    if (stats.length) {
      const statText = Array.from(stats).map(s =>
        (s.querySelector('.stat-n abbr')?.getAttribute('title') || s.querySelector('.stat-n')?.textContent || '') + ': ' +
        (s.querySelector('.stat-l')?.textContent || '')
      ).join('. ');
      parts.push(statText);
    }

    // Menú — leer el tab activo
    const activePanel = document.querySelector('.tab-panel.active');
    if (activePanel) {
      const tabLabel = document.querySelector('.tab-btn.active')?.textContent?.trim() || 'Menú';
      let menuText   = tabLabel + '. ';
      activePanel.querySelectorAll('.mcat').forEach(cat => {
        const catTitle = cat.querySelector('h3')?.textContent || '';
        const items    = Array.from(cat.querySelectorAll('li')).map(li => {
          const spans = li.querySelectorAll('span');
          return spans.length === 2
            ? spans[0].textContent + ', ' + spans[1].textContent
            : li.textContent;
        }).join('. ');
        menuText += catTitle + ': ' + items + '. ';
      });
      parts.push(menuText);
    }

    // Nosotros
    const about = document.getElementById('nosotros');
    if (about) {
      const h2 = about.querySelector('h2')?.textContent || '';
      const ps = Array.from(about.querySelectorAll('.about-text p')).map(p => p.textContent).join(' ');
      const afs = Array.from(about.querySelectorAll('.af')).map(a => a.textContent).join(', ');
      parts.push(h2 + '. ' + ps + '. ' + afs);
    }

    // Testimonios
    const testis = document.querySelectorAll('.tcard');
    if (testis.length) {
      const testiText = Array.from(testis).map(t => {
        const q    = t.querySelector('blockquote p')?.textContent || '';
        const cite = t.querySelector('cite')?.textContent || '';
        return q + ' ' + cite;
      }).join('. ');
      parts.push('Opiniones de clientes. ' + testiText);
    }

    // Contacto
    const contact = document.getElementById('contacto');
    if (contact) {
      const rows = Array.from(contact.querySelectorAll('.cinfo-row')).map(r =>
        r.querySelector('.cinfo-text')?.textContent || ''
      ).join('. ');
      parts.push('Contacto. ' + rows);
    }

    return parts.join(' ... ');
  }

  readerBtn?.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta el lector de voz.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      readerBtn.classList.remove('active');
      readerBtn.innerHTML = readerBtn.innerHTML.replace('Detener', 'Leer página');
      return;
    }
    const text = buildReadingText();
    const utt  = new SpeechSynthesisUtterance(text);
    utt.lang   = currentLang === 'en' ? 'en-US' : 'es-CR';
    utt.rate   = 0.88;
    utt.pitch  = 1;
    utt.onend  = () => {
      isSpeaking = false;
      readerBtn.classList.remove('active');
      readerBtn.innerHTML = readerBtn.innerHTML.replace('Detener', 'Leer página');
    };
    window.speechSynthesis.speak(utt);
    isSpeaking = true;
    readerBtn.classList.add('active');
    readerBtn.innerHTML = readerBtn.innerHTML.replace('Leer página', 'Detener');
  });

  /* 8. NAVBAR: ocultar al bajar, mostrar al subir */
  const header = document.getElementById('site-header');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastY && currentY > 120) {
      header?.classList.add('hidden');
    } else {
      header?.classList.remove('hidden');
    }
    lastY = currentY;
  }, { passive: true });

  /* 9. MENÚ HAMBURGUESA */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', e => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* 10. TABS */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('aria-controls');
    tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    tabPanels.forEach(p => { p.classList.remove('active'); p.hidden = true; });
    btn.classList.add('active'); btn.setAttribute('aria-selected','true');
    const target = document.getElementById(targetId);
    if (target) {
      target.classList.add('active'); target.hidden = false;
      target.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.remove('visible');
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
      });
      // Scroll a Nosotros si el panel queda tapado
      setTimeout(() => {
        const rect = document.getElementById('menu')?.getBoundingClientRect();
        if (rect && rect.bottom > window.innerHeight) {
          document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }));

  /* 11. CARRUSEL INFINITO */
  const track       = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn     = document.getElementById('carouselPrev');
  const nextBtn     = document.getElementById('carouselNext');

  if (track) {
    const realSlides = Array.from(track.querySelectorAll('.carousel-slide'));
    const total      = realSlides.length;
    let visible      = getSlidesVisible();
    let current      = 0;
    let isJumping    = false;

    function getSlidesVisible() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 960) return 2;
      return 3;
    }

    function buildClones() {
      track.querySelectorAll('.carousel-clone').forEach(c => c.remove());
      for (let i = 0; i < visible; i++) {
        const clone = realSlides[i % total].cloneNode(true);
        clone.classList.add('carousel-clone');
        clone.removeAttribute('data-animate');
        track.appendChild(clone);
      }
      for (let i = visible - 1; i >= 0; i--) {
        const clone = realSlides[((total - 1 - (visible - 1 - i)) % total + total) % total].cloneNode(true);
        clone.classList.add('carousel-clone');
        clone.removeAttribute('data-animate');
        track.prepend(clone);
      }
    }

    function getSlideWidth() {
      const slide = track.querySelector('.carousel-slide');
      if (!slide) return 0;
      const gap = parseInt(getComputedStyle(track).gap) || 16;
      return slide.offsetWidth + gap;
    }

    function moveTo(idx, animate = true) {
      const offset = (idx + visible) * getSlideWidth();
      track.style.transition = animate ? 'transform .5s cubic-bezier(.4,0,.2,1)' : 'none';
      track.style.transform  = `translateX(-${offset}px)`;
    }

    function updateDots(idx) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) =>
        dot.classList.toggle('active', i === ((idx % total) + total) % total));
    }

    function goTo(idx, animate = true) {
      current = idx;
      moveTo(current, animate);
      updateDots(((current % total) + total) % total);
    }

    track.addEventListener('transitionend', () => {
      if (isJumping) return;
      if (current >= total) { isJumping = true; current -= total; moveTo(current, false); requestAnimationFrame(() => requestAnimationFrame(() => { isJumping = false; })); }
      else if (current < 0) { isJumping = true; current += total; moveTo(current, false); requestAnimationFrame(() => requestAnimationFrame(() => { isJumping = false; })); }
      updateDots(((current % total) + total) % total);
    });

    function buildDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Ir a foto ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function init() {
      visible = getSlidesVisible();
      buildClones();
      buildDots();
      requestAnimationFrame(() => { moveTo(0, false); updateDots(0); });
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    let autoPlay = setInterval(() => goTo(current + 1), 4000);
    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.parentElement.addEventListener('mouseleave', () => { autoPlay = setInterval(() => goTo(current + 1), 4000); });

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; clearInterval(autoPlay); }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
      autoPlay = setInterval(() => goTo(current + 1), 4000);
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { visible = getSlidesVisible(); init(); }, 200);
    });

    init();
  }

  /* 12. BOTÓN VOLVER ARRIBA */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
      backToTop.hidden = window.scrollY <= 400;
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* 13. SCROLL ANIMATIONS */
  const animEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    animEls.forEach(el => observer.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }

});
