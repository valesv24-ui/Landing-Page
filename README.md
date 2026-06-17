# Laboratorio #1 — Landing Page Responsiva

**Curso:** ISW-521 Programación en Ambiente Web I  
**Universidad:** Universidad Técnica Nacional (UTN)  
**Docente:** Bryan Miguel Chaves Salas  
**Estudiante:** Valery  
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
└── img/
    ├── logo.jpg
    ├── hero-banner.jpg
    ├── barista-latte.jpg
    ├── club-sandwich.jpg
    ├── brownie-helado.jpg
    ├── empanadas.jpg
    ├── deditos-pollo.jpg
    ├── taquitos-pescado.jpg
    ├── desayuno-gallo.jpg
    ├── hamburguesa.jpg
    ├── arroz-pollo.jpg
    ├── cafes-frios.jpg
    ├── menu-portada.jpg
    ├── menu-bebidas.jpg
    ├── menu-postres.jpg
    ├── menu-desayunos.jpg
    └── menu-emparedados.jpg
```

---

## ✅ Requerimientos técnicos cumplidos

### HTML5 Semántico
- Declaración correcta `<!DOCTYPE html>` con `lang="es"`
- Etiquetas estructurales: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`, `<figcaption>`, `<blockquote>`, `<cite>`
- Sin tablas para layout
- Validado en [validator.w3.org](https://validator.w3.org)

### CSS3 Nativo — Flexbox y Grid

**Flexbox** aplicado en:
- Navbar (`.navbar`) — distribución logo / links / acciones
- Estadísticas (`.stats-flex`)
- Tarjetas de testimonios (`.testi-flex`)
- Features en Nosotros (`.about-features`)
- Filas de contacto (`.cinfo-list`)

**CSS Grid** aplicado en:
- Panel del menú (`.panel-layout`) — imagen + contenido
- Items del menú (`.menu-grid-items`) — 2 columnas
- Galería (`.gallery-grid`) — grid asimétrico con `grid-row` y `grid-column`
- Sección Nosotros (`.about-inner`)
- Sección Contacto (`.contact-inner`)

**Media queries** — dos breakpoints funcionales:
- `@media (max-width: 960px)` — tablet
- `@media (max-width: 600px)` — móvil

Sin frameworks CSS externos (sin Bootstrap, Tailwind, etc.)

### Accesibilidad Web — WCAG 2.1 Nivel A
- Atributos `alt` descriptivos en todas las imágenes
- ARIA: `aria-label`, `aria-expanded`, `aria-controls`, `aria-selected`, `aria-live="polite"`, `aria-atomic`, `aria-labelledby`
- Contraste texto/fondo ≥ 4.5:1
- `:focus-visible` visible para navegación por teclado
- `role="tab"`, `role="tabpanel"`, `role="tablist"` en el menú de tabs
- Modo oscuro con clase en `<html>` (`html.dark`)

### Web Storage — localStorage

Dos funcionalidades con `localStorage`:

**1. Tema oscuro/claro** — clave `amarettos_dark_mode`
- Persiste la preferencia al recargar
- Respeta `prefers-color-scheme` si no hay dato guardado

**2. Nombre del visitante** — clave `amarettos_visitor_name`
- Guarda el nombre ingresado en Contacto
- Al recargar muestra saludo personalizado
- Botón "Olvidar" elimina el dato con `localStorage.removeItem()`

> **localStorage vs sessionStorage:** `localStorage` persiste aunque se cierre el navegador. `sessionStorage` se borra al cerrar la pestaña. Se eligió `localStorage` para demostrar persistencia real entre sesiones.

---

## 📱 Responsividad

| Dispositivo | Breakpoint | Comportamiento |
|---|---|---|
| Desktop | > 960px | Layout completo, galería 4 columnas |
| Tablet | ≤ 960px | Menú hamburguesa, paneles en columna única |
| Móvil | ≤ 600px | Galería 2 columnas, tabs compactos |

---

## 🎨 Sistema de diseño

Variables CSS semánticas en `:root`:

```css
--color-primary   /* Naranja marca: #E8521A */
--color-accent    /* Café claro:    #8B5E3C */
--color-bg        /* Crema:         #FDF5EC */
--color-text      /* Texto:         #1E1E1E */
--font-display    /* Cormorant Garamond */
--font-body       /* DM Sans */
--space-*         /* Escala de espaciado */
--radius-*        /* Radios de borde */
```

---

## 🚀 Cómo ejecutar

1. Clonar o descargar el repositorio
2. Descomprimir si viene en ZIP
3. Abrir `index.html` en el navegador

No requiere servidor, dependencias ni instalación.

---

## 🔍 Funcionalidades destacadas

- **Tabs del menú** — 6 categorías con precios reales del café
- **Galería asimétrica** — CSS Grid con spans personalizados
- **Scroll animations** — `IntersectionObserver` activa animaciones al entrar al viewport
- **Modo oscuro persistente** — toggle con `localStorage`
- **Marquee animado** — banda de categorías en movimiento continuo
- **Menú hamburguesa accesible** — `aria-expanded` actualizado en cada estado

---

## 📚 Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| CSS3 | Estilos, Flexbox, Grid, animaciones, custom properties |
| JavaScript ES6+ | Web Storage, DOM, IntersectionObserver |
| Google Fonts | Cormorant Garamond + DM Sans |

---

*Laboratorio desarrollado para el curso ISW-521 — UTN Sede San Carlos*
