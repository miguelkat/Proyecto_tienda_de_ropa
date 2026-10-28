# [TIENDA DE ROPA "ANGELICA BOUTIQUE"]

**Estudiante:** Miguel Angel Kato Ortiz  
**Cliente:** Angelica Ortiz Choquehuanca  
**Ciudad:** La Paz, Bolivia  
**URL publicada:** [DESPUES, PROXIMA SEMANA]

## Qué resuelve
- Ayuda en la parte de venta de ropas nuevas por mayor y menor.
- Permite hacer pedidos y cotizaciones de manera fácil y rápida mediante un catálogo interactivo con filtros y formulario validado.

## Cómo está construido
- **Semántica HTML5:** Documento estructurado con `<!DOCTYPE html>`, `<html lang="es">`, `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<table>`, `<figure>`, `<form>`, `<fieldset>`, `<legend>`, `<aside>`, `<footer>` y `<address>`.
- **Layout y CSS:** 
  - **Flexbox:** Distribución de cabecera, barra de navegación, controles de filtro y alineaciones de tarjetas.
  - **CSS Grid:** Distribución de tarjetas dinámicas en el catálogo (`#lista-productos`) y la maqueta general del sitio en pantallas grandes con `grid-template-areas`.
  - **Custom Properties (Variables CSS):** Paleta unificada con azul corporativo (`--color-principal`), terracota cálido (`--color-acento`), fondos neutros y sombras suaves.
- **JavaScript y jQuery (Archivos del proyecto):**
  - [datos.js](file:///c:/Users/Personal/Documents/Proyecto%20tienda%20de%20ropa/datos.js): Catálogo de prendas de vestir (ropa de lana, pijamas, poleras), métodos de arreglos (`map`, `filter`, `reduce`), destructuring y clases (`Producto`, `ProductoConDescuento`).
  - [funciones.js](file:///c:/Users/Personal/Documents/Proyecto%20tienda%20de%20ropa/funciones.js): Funciones de cálculo de totales, descuentos, tasas y closures (contadores de ventas de prendas).
  - [app.js](file:///c:/Users/Personal/Documents/Proyecto%20tienda%20de%20ropa/app.js): Configuración principal de Angelica Boutique, tipos y actualización dinámica del subtítulo en cabecera.
  - [eventos.js](file:///c:/Users/Personal/Documents/Proyecto%20tienda%20de%20ropa/eventos.js): Búsqueda en vivo (`input`), filtro por categorías con delegación de eventos, renderizado dinámico de tarjetas (`render()`), botón para preseleccionar la prenda directo al formulario, y validación estricta de fecha y teléfono en el formulario de pedido.
  - [jquery-panel.js](file:///c:/Users/Personal/Documents/Proyecto%20tienda%20de%20ropa/jquery-panel.js): Menú móvil desplegable con `.slideToggle()`, panel acordeón interactivo de preguntas frecuentes con animación `.stop()` y `.slideToggle()`, lista escalonada de avisos de temporada con `.delay()` y `.fadeIn()`, y función encadenable `resaltar()`.
  - [remoto.js](file:///c:/Users/Personal/Documents/Proyecto%20tienda%20de%20ropa/remoto.js) y [datos.json](file:///c:/Users/Personal/Documents/Proyecto%20tienda%20de%20ropa/datos.json): Carga remota asíncrona mediante `fetch` (`async`/`await`) y `$.getJSON` de jQuery con manejo de estados (`cargando`, `ok`, `error`).
  - [preferencias.js](file:///c:/Users/Personal/Documents/Proyecto%20tienda%20de%20ropa/preferencias.js): Persistencia de preferencias del usuario en `localStorage` (modo claro/oscuro y criterio de ordenamiento sincronizado con el catálogo) con manejo seguro `try/catch`, y cálculo de distancia en tiempo real hacia la tienda con `navigator.geolocation` y fórmula de Haversine.
  - [jquery-comparado.js](file:///c:/Users/Personal/Documents/Proyecto%20tienda%20de%20ropa/jquery-comparado.js): Pruebas comparativas entre Vanilla JavaScript y jQuery para manipulación del DOM y eventos.

## Capturas
![Escritorio](Captura-Escritorio.PNG)  
![Móvil 375px](ruta/a/captura-movil.png) DESPUES, PROXIMA SEMANA

## Lo más difícil
La alineación y adaptabilidad de los componentes dinámicos con CSS Grid y Flexbox, la unificación de los datos del catálogo para que se integren directamente con el formulario de pedidos, y la integración de eventos jQuery para el menú móvil y el acordeón interactivo sin conflictos de scripts.
