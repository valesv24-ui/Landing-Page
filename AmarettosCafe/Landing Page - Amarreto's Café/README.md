# ☕ Amaretto's Café — Landing Page

**Laboratorio #1 · ISW-521 Programación en Ambiente Web I**  
Universidad Técnica Nacional · Sede San Carlos

---

## 📋 Descripción

Landing page para **Amaretto's Café**, negocio local ubicado en Ciudad Quesada, San Carlos, Costa Rica. El proyecto fue desarrollado como parte del Laboratorio #1 del curso ISW-521, aplicando los conceptos de HTML5 semántico, CSS con Flexbox/Grid, JavaScript nativo y accesibilidad web (WCAG 2.1).

---

## 🗂️ Estructura del proyecto

```
Amarettos Cafe/
└── Landing Page - Amarretto's Café/
    ├── index.html        # Documento principal
    ├── README.md
    ├── css/
    │   └── style.css     # Estilos (Flexbox, Grid, responsive, dark mode)
    ├── js/
    │   └── main.js       # JavaScript nativo sin librerías externas
    └── img/
        ├── logo.jpg
        ├── hero-banner.jpg
        └── ...           # Imágenes reales del negocio
```

---

## ✨ Funcionalidades implementadas

### HTML5 & CSS
- Estructura semántica con `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- **Navbar** con Flexbox + menú hamburguesa para móvil
- **Hero section** con imagen de fondo y overlay
- **Marquee animado** con productos destacados
- **Menú por pestañas** (Desayunos, Almuerzos, Emparedados, Bebidas, Postres)
- **Galería** con CSS Grid responsive
- **Sección Nosotros** y **Contacto**
- Diseño **responsive** con breakpoints para móvil, tablet y escritorio
- **Dark mode / Light mode** con toggle

### JavaScript (sin frameworks)
| # | Funcionalidad | Mecanismo |
|---|---|---|
| 1 | Persistencia del tema oscuro/claro | `localStorage` |
| 2 | Saludo personalizado al visitante | `localStorage` |
| 3 | Menú hamburguesa (móvil) | DOM events |
| 4 | Pestañas del menú (accesibles) | `role="tablist"` + ARIA |
| 5 | Animaciones al hacer scroll | `IntersectionObserver` |

### Accesibilidad (WCAG 2.1)
- Atributos `aria-label`, `aria-controls`, `aria-expanded`, `role`
- Navegación por teclado en pestañas del menú
- `alt` descriptivo en imágenes
- Contraste de colores adecuado en ambos temas

---

## 🛠️ Tecnologías

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties, animaciones)
- JavaScript ES6+ (nativo, sin librerías)
- Google Fonts: *Cormorant Garamond* + *DM Sans*
- Web Storage API (`localStorage`)

---

## 🚀 Cómo abrir el proyecto

1. Clonar o descargar el repositorio
2. Abrir el archivo `Amarettos Cafe/Landing Page - Amarretto's Café/index.html` en cualquier navegador moderno
3. No requiere servidor ni dependencias adicionales

```bash
git clone https://github.com/valesv24-ui/Laboratorio01-LP.git
cd "tu-repo/Amarettos Cafe/Landing Page - Amarretto's Café"
# Abrir index.html en el navegador
```

---

## 📍 Sobre el negocio

**Amaretto's Café** es una cafetería real ubicada en Ciudad Quesada, San Carlos, Costa Rica.

- 📞 2462-4343  
- 🕐 Lunes a Sábado · 8:00 am – 7:00 pm

---

## 👩‍💻 Autora

Proyecto desarrollado para el curso **ISW-521 · Programación en Ambiente Web I**  
Profesor: Prof. Bryan Miguel Chaves Salas  
UTN Sede San Carlos · 2026
