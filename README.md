# Laboratorio #1 — Landing Page Responsiva

**Curso:** ISW-521 Programación en Ambiente Web I  
**Universidad:** Universidad Técnica Nacional (UTN)  
**Docente:** Bryan Miguel Chaves Salas  
**Porcentaje:** 15% de la nota final  

---

## 📋 Descripción

Landing page responsiva y accesible para **Amaretto's Café**, negocio real ubicado en Ciudad Quesada, San Carlos, Costa Rica. Construida con HTML5 semántico, CSS3 nativo y JavaScript vanilla, sin frameworks externos.

---

## 🏗️ Estructura del proyecto

```
laboratorio-01/
├── index.html          # Documento principal
├── README.md           # Este archivo
├── css/
│   └── style.css       # Estilos — Flexbox + Grid + Variables CSS
├── js/
│   └── main.js         # JavaScript nativo — Web Storage + accesibilidad
└── img/                # ~55 imágenes reales del café
```

---

## ✅ Requerimientos técnicos cumplidos

### HTML5 Semántico
- `<!DOCTYPE html>` con `lang="es"`
- Etiquetas estructurales: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`, `<figcaption>`
- Sin tablas para layout
- Validado en [validator.w3.org](https://validator.w3.org)

### CSS3 Nativo — Flexbox y Grid

**Flexbox** aplicado en:
- Navbar (`.navbar`) — logo · links · acciones
- Stats (`.stats-flex`) — estadísticas en fila
- Testimonios (`.testi-flex`) — tarjetas en fila
- Features en Nosotros (`.about-features`)
- Redes sociales (`.social-links`)
- Panel de accesibilidad (`.a11y-menu`)

**CSS Grid** aplicado en:
- Panel del menú (`.panel-layout`) — imagen + contenido
- Items del menú (`.menu-grid-items`) — 3 columnas
- Sección Nosotros (`.about-inner`) — imagen + texto
- Sección Contacto (`.contact-inner`) — info + mapa

**Media queries — dos breakpoints funcionales:**
- `@media (max-width: 960px)` — tablet
- `@media (max-width: 600px)` — móvil

Sin frameworks CSS externos (sin Bootstrap, Tailwind, Bulma, etc.)

### Accesibilidad Web — WCAG 2.1 Nivel A
- Atributos `alt` descriptivos en todas las imágenes (31 imágenes)
- ARIA: `aria-label` (39x), `aria-expanded`, `aria-controls`, `aria-selected`, `aria-live="polite"`, `aria-atomic`
- `role="tab"`, `role="tabpanel"`, `role="tablist"` en el menú de tabs
- `role="region"` en el panel de accesibilidad flotante
- `:focus-visible` para navegación por teclado
- Skip link "Saltar al contenido principal"
- Modo oscuro con clase en `<html>` (`html.dark`)
- Alto contraste activable (`html.high-contrast`)

### Web Storage — localStorage

Cuatro funcionalidades con `localStorage`:

**1. Tema oscuro/claro** — clave `amarettos_dark_mode`
- Detecta `prefers-color-scheme` del sistema al cargar
- El botón manual guarda la preferencia y tiene prioridad sobre el sistema
- Persiste al recargar y al cerrar el navegador

**2. Tamaño de fuente** — clave `amarettos_font_size`
- Panel flotante con A+ (3 niveles: 120%, 140%, 165%)
- Aplica escala con variable CSS `--a11y-scale`
- Persiste entre sesiones

**3. Alto contraste** — clave `amarettos_high_contrast`
- Activa `html.high-contrast` con amarillo sobre negro
- Persiste entre sesiones

**4. Idioma** — clave `amarettos_lang`
- Traducción completa ES / EN (80+ claves)
- Persiste entre sesiones

> **localStorage vs sessionStorage:** `localStorage` persiste aunque se cierre el navegador. `sessionStorage` se borra al cerrar la pestaña. Se eligió `localStorage` para demostrar persistencia real entre sesiones.

---

## 📱 Responsividad

| Dispositivo | Breakpoint | Comportamiento |
|---|---|---|
| Desktop | > 960px | Layout completo, 3 slides en carrusel, 3 cols en menú |
| Tablet | ≤ 960px | Navbar hamburguesa, paneles en columna, 2 slides |
| Móvil | ≤ 600px | 1 slide, tabs con scroll horizontal, columna única |

---

## ♿ Accesibilidad — Panel Flotante

Botón con ícono universal de accesibilidad (♿) en esquina inferior derecha:
- **A+ (3 niveles)** — aumenta el tamaño del texto al 120%, 140% o 165%
- **A (reset)** — vuelve al tamaño normal
- **Alto contraste** — amarillo sobre negro (WCAG AAA)
- **Lector de voz** — Web Speech API, lee sección por sección

---

## 🎨 Sistema de diseño

Variables CSS semánticas en `:root`:

```css
--color-primary    /* Naranja marca: #E8521A */
--color-accent     /* Café claro:    #8B5E3C */
--color-dark       /* Café oscuro:   #3B1F0A */
--color-bg         /* Blanco:        #FFFFFF */
--color-text       /* Texto:         #1A1A1A */
--font-display     /* Cormorant Garamond (serif elegante) */
--font-body        /* DM Sans (sans-serif legible) */
--a11y-scale       /* Escala de fuente para accesibilidad */
```

---

## 🚀 Cómo ejecutar

1. Clonar o descargar el repositorio
2. Abrir `index.html` directamente en el navegador

No requiere servidor, dependencias ni instalación.

---

## 🔍 Funcionalidades

- **Carrusel infinito** — 22 fotos reales del café, loop continuo, autoplay, swipe táctil
- **Tabs del menú** — 6 categorías con precios reales actualizados
- **Menú 3 columnas** — cuadro destacado siempre al centro
- **Navbar oculto** — desaparece al bajar, aparece al subir
- **Botón volver arriba** — aparece al bajar 400px
- **Modo oscuro persistente** — detecta preferencia del sistema
- **ES / EN** — traducción completa, persiste en localStorage
- **Google Maps** — coordenadas exactas del local (10.3223354, -84.4304091)
- **Scroll animations** — `IntersectionObserver`

---

## 📚 Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica, ARIA |
| CSS3 | Flexbox, Grid, Custom Properties, animaciones, media queries |
| JavaScript ES6+ | Web Storage (4 claves), DOM, IntersectionObserver, Web Speech API |
| Google Fonts | Cormorant Garamond + DM Sans |

---

*Laboratorio desarrollado para el curso ISW-521 — UTN Sede San Carlos*
