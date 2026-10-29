# MEMORIA TÉCNICA DEL PROYECTO
# TIENDA DE ROPA "ANGELICA BOUTIQUE"

---

## 1. INFORMACIÓN GENERAL DEL PROYECTO

- **Nombre del Proyecto:** Angelica Boutique - Plataforma Web Comercial
- **Estudiante / Desarrollador:** Miguel Angel Kato Ortiz
- **Cliente / Negocio:** Sra. Angelica Ortiz Choquehuanca
- **Ubicación:** La Paz, Bolivia
- **Fecha:** Octubre de 2026
- **Área:** Desarrollo Web Front-End (HTML5, CSS3, JavaScript ES6+, jQuery, Canvas 2D, Drag & Drop)

---

## 2. INTRODUCCIÓN Y OBJETIVOS

### 2.1 Contexto
**Angelica Boutique** es un emprendimiento de comercialización de prendas de vestir nuevas de primera mano, tanto por mayor como por menor, establecido en la ciudad de La Paz. Su catálogo incluye ropa térmica y tejida de lana (pantalones de lana en tallas S, M, L y XL en colores Azul, Negro, Café y Plomo; chompas tejidas), pijamas de dos piezas y térmicas, y poleras 100% algodón (talla M en blanco y tallas M y L en color kaki).

### 2.2 Problema que resuelve
Anteriormente, la exhibición de modelos y la toma de pedidos se realizaba de manera informal o presencial. El objetivo principal de este proyecto es:
1. **Digitalizar el catálogo de productos** mediante una interfaz moderna, visual, rápida e interactiva.
2. **Facilitar la cotización, pedidos y planificación de stock** tanto para clientes individuales como para comerciantes mayoristas.
3. **Optimizar la atención al cliente** con información clara sobre horarios, precios referenciales, ubicación GPS en vivo, preguntas frecuentes y canales directos de comunicación (WhatsApp y redes sociales).

---

## 3. ARQUITECTURA Y ORGANIZACIÓN DEL CÓDIGO (ALINEADA AL DÍA 14)

El proyecto sigue una estricta separación de responsabilidades (*Separation of Concerns*), organizando la estructura semántica, los estilos, los datos, el renderizado, los eventos y los componentes interactivos en archivos independientes y modulares:

```text
Proyecto tienda de ropa/
├── index.html              # Estructura semántica completa (HTML5)
├── estilos.css             # Hoja de estilos centralizada (CSS3, Flexbox, Grid, Custom Properties, Tema Oscuro)
├── app.js                  # Inicialización general, configuración y metadatos (Día 5)
├── funciones.js            # Funciones puras de cálculo, utilidades y closures (Día 6)
├── datos.js                # Modelo de datos, catálogo oficial de prendas y clases ES6 (Día 7)
├── render.js               # Creación de tarjetas del DOM (crearTarjeta) y patrón render(lista) (Día 8)
├── eventos.js              # Controlador de eventos: búsqueda, filtros, orden y validación de formulario (Día 9)
├── jquery-comparado.js     # Panel interactivo de beneficios comerciales (Vanilla JS vs. jQuery - Día 10)
├── jquery-panel.js         # Módulos interactivos jQuery (menú móvil, acordeón y avisos - Día 11)
├── remoto.js               # Consulta de inventario asíncrona con fetch (async/await) y $.getJSON (Día 12)
├── datos.json              # Fuente de datos JSON para consulta asíncrona de inventario
├── preferencias.js         # Persistencia en localStorage (tema y orden) y Geolocalización Haversine (Día 13)
├── tablero.js              # Tablero Drag & Drop de prendas y gráfico de barras en Canvas 2D (Día 14)
├── README.md               # Documentación y ficha técnica del repositorio
├── MEMORIA.md              # Memoria técnica completa y detallada del proyecto
├── tienda.png              # Fotografía representativa del local y exhibición
├── Captura-Escritorio.PNG  # Captura de pantalla de la vista de escritorio
└── imagenes/               # Catálogo de fotografías de productos
    ├── polera-blanca.jpg   # Polera de algodón talla M color Blanco
    ├── polera-kaki.jpg     # Polera de algodón tallas M y L color Kaki
    ├── pantalon-lana.jpg   # Pantalón de lana tallas S, M, L, XL (Azul, Negro, Café, Plomo)
    ├── chompa-lana.jpg     # Chompa de lana tejida
    ├── pijama-conjunto.jpg # Conjunto de pijama de 2 piezas
    └── polera-estampada.jpg# Polera de respaldo en galería
```

---

## 4. DESCRIPCIÓN TÉCNICA DE LOS COMPONENTES

### 4.1 Estructura Semántica (`index.html`)
Se utilizó HTML5 estándar priorizando la semántica, el SEO y la accesibilidad web:
- **`<header>` y `<nav>`:** Cabecera con marca, subtítulo dinámico, navegación de escritorio y botón accesible con `aria-expanded` para desplegar el menú móvil `#menu-movil`.
- **`<main>`:**
  - **`#Catalogo`:** Sección principal equipada con panel de preferencias `#Preferencias`, barra de búsqueda `#buscador`, grupo de filtros por categoría `#filtros`, texto de estado `#resultado` (`aria-live="polite"`) y el contenedor dinámico `#lista-productos`.
  - **`#Promociones`:** Ofertas de temporada en poleras de algodón y pantalones de lana, acompañadas de avisos escalonados `#avisos`.
  - **`#panel`:** Panel de preguntas frecuentes implementado en acordeón accesible.
  - **`#Horarios`:** Tabla estructurada con `<caption>`, `<thead>`, `<tbody>` detallando tallas, colores y precios referenciales, más `<figure>` y `<figcaption>`.
  - **`#Pedido`:** Formulario dividido en `<fieldset>` y `<legend>` con validación nativa y personalizada.
  - **`#tablero-zona` (Día 14):** Tablero interactivo de tres columnas (`vitrina`, `reponer`, `pausa`) para organizar lotes de prendas mediante Drag & Drop, acompañado de `<canvas id="grafico" width="600" height="220">` con texto alternativo accesible.
  - **`#Ubicacion` (Día 13):** Dirección física en La Paz y cálculo de distancia GPS en tiempo real con tiempos estimados a pie y en vehículo.
  - **`#CatalogoOnline` (Día 12):** Consulta interactiva de stock disponible en almacén conectado vía `fetch` asíncrono y jQuery (`datos.json`).
  - **`#GarantiaCalidad` (Día 10):** Módulo interactivo de beneficios comerciales y garantía de confección textil.

---

### 4.2 Renderizado del DOM (`render.js`) y Eventos (`eventos.js`)
- **`render.js`:** Separa la responsabilidad de construir las tarjetas (`crearTarjeta(producto)`) y actualizar el contenedor `#lista-productos` siguiendo el patrón de tres pasos: vaciar, recorrer e insertar (`render(lista)`).
- **`eventos.js`:** Gestiona la búsqueda por texto, el filtrado por categoría con delegación de eventos, el ordenamiento según las preferencias del usuario y la validación del formulario de pedidos (`reportValidity()`, `setCustomValidity()`).

---

### 4.3 Tablero Drag & Drop y Gráfico en Canvas 2D (`tablero.js` - Día 14)
- **Estado separado del DOM:** El objeto `tablero` mantiene los lotes de prendas clasificados en tres columnas (`vitrina`, `reponer`, `pausa`).
- **HTML5 Drag & Drop con delegación:** Escucha `dragstart` (serializando origen e índice en `event.dataTransfer`), `dragover` (invocando `event.preventDefault()` para permitir soltar y aplicando la clase `.encima`), `dragleave`, `drop` (actualizando el estado y llamando a `renderTablero()`) y `dragend`. Incluye además un botón accesible (`⇄`) en cada ficha para dispositivos móviles táctiles y teclado.
- **Gráfico dinámico en `<canvas>`:** La función `dibujarGrafico()` utiliza el contexto 2D (`canvas.getContext("2d")`), limpia el lienzo con `clearRect`, lee los colores activos del tema mediante `getComputedStyle(document.body)` y dibuja barras proporcionales con totales y etiquetas que se actualizan al instante tras cada movimiento o cambio a modo oscuro.

---

## 5. CONCLUSIÓN

El proyecto **Angelica Boutique** integra de forma completa y coherente todos los módulos hasta el **Día 14**, combinando una estética unisex moderna con funcionalidades reales de catálogo, pedidos, geolocalización, persistencia en `localStorage`, consulta asíncrona de inventario, planificación interactiva con **Drag & Drop** y visualización gráfica en **Canvas 2D**.
