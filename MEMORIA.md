# MEMORIA TÉCNICA DEL PROYECTO
# TIENDA DE ROPA "ANGELICA BOUTIQUE"

---

## 1. INFORMACIÓN GENERAL DEL PROYECTO

- **Nombre del Proyecto:** Angelica Boutique - Plataforma Web Comercial
- **Estudiante / Desarrollador:** Miguel Angel Kato Ortiz
- **Cliente / Negocio:** Sra. Angelica Ortiz Choquehuanca
- **Ubicación:** La Paz, Bolivia
- **Fecha:** Octubre de 2026
- **Área:** Desarrollo Web Front-End (HTML5, CSS3, JavaScript ES6+, jQuery)

---

## 2. INTRODUCCIÓN Y OBJETIVOS

### 2.1 Contexto
**Angelica Boutique** es un emprendimiento de comercialización de prendas de vestir nuevas de primera mano, tanto por mayor como por menor, establecido en la ciudad de La Paz. Su catálogo incluye ropa térmica y tejida de lana (ideal para el clima andino), pijamas de dos piezas y térmicas, y poleras de algodón con diseños contemporáneos.

### 2.2 Problema que resuelve
Anteriormente, la exhibición de modelos y la toma de pedidos se realizaba de manera informal o presencial. El objetivo principal de este proyecto es:
1. **Digitalizar el catálogo de productos** mediante una interfaz moderna, visual, rápida e interactiva.
2. **Facilitar la cotización y pedidos** tanto para clientes individuales como para comerciantes mayoristas.
3. **Optimizar la atención al cliente** con información clara sobre horarios, precios referenciales, preguntas frecuentes y canales directos de comunicación (WhatsApp y Facebook).

---

## 3. ARQUITECTURA Y ORGANIZACIÓN DEL CÓDIGO

El proyecto sigue una estricta separación de responsabilidades (*Separation of Concerns*), organizando la estructura semántica, los estilos, los datos, las funciones y los componentes interactivos en archivos independientes y modulares:

```text
Proyecto tienda de ropa/
├── index.html              # Estructura semántica completa (HTML5)
├── estilos.css             # Hoja de estilos centralizada (CSS3, Flexbox, Grid, Custom Properties)
├── datos.js                # Modelo de datos, catálogo oficial de prendas y clases ES6
├── funciones.js            # Funciones puras de cálculo, utilidades y closures
├── app.js                  # Inicialización general, configuración y metadatos
├── render.js               # Renderizado del DOM: selección, creación de tarjetas y recorrido de nodos
├── eventos.js              # Controlador del DOM: búsqueda, filtros y formulario de pedidos
├── jquery-panel.js         # Módulos interactivos jQuery (menú móvil y acordeón)
├── README.md               # Documentación y ficha técnica del repositorio
├── MEMORIA.md              # Memoria técnica completa y detallada del proyecto
├── tienda.png              # Fotografía representativa del local y exhibición
├── Captura-Escritorio.PNG  # Captura de pantalla de la vista de escritorio
└── imagenes/               # Catálogo de fotografías de productos en alta resolución
    ├── chompa-lana.jpg     # Chompa de lana tejida
    ├── pantalon-lana.jpg   # Pantalón de tejido de lana
    ├── buso-lana.jpg       # Buso térmico de lana
    ├── pijama-conjunto.jpg # Conjunto de pijama de 2 piezas
    └── polera-estampada.jpg# Polera de algodón con diseño primavera
```

---

## 4. DESCRIPCIÓN TÉCNICA DE LOS COMPONENTES

### 4.1 Estructura Semántica (`index.html`)
Se utilizó HTML5 estándar priorizando la semántica, el SEO y la accesibilidad web:
- **Metadatos y Accesibilidad:** Declaración `lang="es"`, meta `viewport` responsivo (`width=device-width, initial-scale=1.0`), meta descripción comercial y títulos jerárquicos de nivel `<h1>` a `<h3>`.
- **`<header>` y `<nav>`:** Cabecera con marca, subtítulo dinámico, navegación de escritorio y botón accesible con `aria-expanded` para desplegar el menú móvil `#menu-movil`.
- **`<main>`:**
  - **`#Catalogo`:** Sección principal equipada con barra de búsqueda `#buscador`, grupo de filtros por categoría `#filtros`, texto de estado en vivo `#resultado` (`aria-live="polite"`) y el contenedor dinámico `#lista-productos`.
  - **`#Promociones`:** Ofertas de temporada con tarjetas descriptivas, imágenes en alta resolución y chips de beneficios comerciales (descuentos mayoristas y envíos).
  - **`#panel`:** Panel de atención al cliente que aloja el componente de preguntas frecuentes implementado en acordeón.
  - **`#Horarios`:** Tabla estructurada con `<caption>`, `<thead>`, `<tbody>` y filas con horarios de atención continua y modalidades de entrega, más una figura ilustrativa con `<figure>` y `<figcaption>`.
  - **`#Pedido`:** Formulario dividido semánticamente en `<fieldset>` y `<legend>` (Datos de contacto y Detalle del pedido), con cotizador en vivo (`#resumen-pedido`), confirmación en pantalla y botón de checkout directo por WhatsApp.
  - **`#Ubicacion`:** Dirección física en La Paz.
- **`<aside>`:** Información complementaria y de confianza para el comprador (*¿Sabías que?*).
- **`<footer>`:** Datos de contacto con `<address>`, enlace a llamada telefónica directa, enlaces con `target="_blank"` a redes sociales (WhatsApp, Instagram y Facebook) y derechos de autor.

---

### 4.2 Sistema de Diseño y Estilos (`estilos.css`)
El diseño fue elaborado con **CSS moderno puro (Vanilla CSS)**, sin sobrecargar librerías externas:
- **Custom Properties (Variables CSS):**
  - `--color-principal: #1a4a7a;` (Azul ultramar elegante, formal e unisex).
  - `--color-acento: #c25e2e;` (Terracota cálido para llamadas a la acción y ofertas).
  - `--color-fondo: #f4f6f9;` y `--color-superficie: #ffffff;` (Contraste equilibrado y descanso visual).
  - Variables de espaciado, radios de curvatura (`--radio: 8px;`) y sombras suaves (`--sombra-sm`, `--sombra-md`).
- **Flexbox (1 Dimensión):**
  - Distribución de la cabecera y alineación de enlaces del menú.
  - Barra de controles del catálogo (alineación flexible entre buscador y botones de categoría).
  - Distribución interna de las tarjetas (`display: flex; flex-direction: column; justify-content: space-between`).
- **CSS Grid (2 Dimensiones):**
  - Catálogo responsivo en `#lista-productos`: `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));` con ajuste automático al ancho de la pantalla sin necesidad de media queries complejas.
  - Maquetación general en pantallas de escritorio (`@media (min-width: 62rem)`): uso de `grid-template-areas` distribuyendo las áreas `"cabecera cabecera"`, `"principal lateral"`, `"pie pie"`.
- **Microinteracciones y Efectos:**
  - Elevación de tarjetas de producto con `transform: translateY(-3px)` y sombra al pasar el cursor (`:hover`).
  - Zoom suave en las fotografías de producto (`.tarjeta-imagen img:hover { transform: scale(1.05); }`).
  - Estados de foco accesibles con `focus-visible`.

---

### 4.3 Modelo de Datos y Orientación a Objetos (`datos.js`)
- **Estructura del Catálogo:** Arreglo `productos` que contiene objetos con propiedades tipadas: `id`, `nombre`, `precio`, `categoria`, `stock`, `disponible`, `imagen` y `descripcion`.
- **Métodos Funcionales de Arreglos:**
  - `.forEach()` para iteración controlada.
  - `.map()` para extracción de nombres y listas de precios.
  - `.filter()` para obtener prendas disponibles y categorización.
  - `.find()` para búsqueda de prendas premium.
  - `.some()` y `.every()` para comprobaciones lógicas de stock e integridad de precios.
  - `.sort()` para ordenamiento ascendente por precio sin mutar el arreglo original (mediante spread operator `[...productos]`).
  - `.reduce()` para el cálculo acumulado del valor monetario total del inventario.
- **Programación Orientada a Objetos (POO):**
  - Clase base `Producto` con métodos `estaDisponible()` y `valorEnStock()`.
  - Clase derivada `ProductoConDescuento` que hereda mediante `extends` y `super()`, calculando precios promocionales con `precioFinal()`.

---

### 4.4 Funciones y Lógica de Negocio (`funciones.js`)
- **Coerción y Valores Falsy:** Manejo seguro de conversiones de tipos numéricos.
- **Sintaxis de Funciones:** Demostración de funciones declaradas, funciones por expresión y funciones flecha (*arrow functions*).
- **Cálculo Comercial:** Funciones para aplicar porcentajes de descuento y cálculo de impuestos comerciales (IVA 13%).
- **Funciones de Orden Superior:** Función `aplicarATodos()` que recibe colecciones y funciones callback para transformar datos.
- **Closures (Ámbitos Léxicos):** Implementación de la fábrica `crearContadorVentas(nombreProducto)` para llevar el conteo aislado de prendas vendidas en tienda.

---

### 4.5 Interacción, Renderizado Dinámico y Validaciones (`eventos.js`)
- **Renderizado Dinámico (`render(lista)`):** Construye en el DOM las tarjetas de producto a partir de los datos en memoria, incluyendo su imagen, etiquetas de categoría, precio formateado y badge condicional de "Agotado".
- **Búsqueda en Tiempo Real:** Escucha el evento `input` en el buscador `#buscador` para filtrar coincidencias por nombre o descripción de forma inmediata.
- **Filtrado por Categorías:** Escucha mediante delegación de eventos el clic en los botones de `#filtros`, aplicando la clase `.activo` al botón seleccionado y actualizando la vista.
- **Conexión Directa Catálogo-Pedido:** Cada tarjeta cuenta con un botón *"Pedir esta prenda"*. Al pulsarlo, el script busca la opción en el elemento `<select id="producto">`, la preselecciona automáticamente, realiza un scroll suave hacia la sección `#Pedido` y sitúa el cursor en el campo de cantidad.
- **Validaciones en Formulario (`submit` con `preventDefault`):**
  - Validación de fecha mínima: Verifica que la fecha de entrega solicitada no sea anterior al día actual.
  - Validación de teléfono: Verifica mediante expresión regular (`/^[0-9]{7,8}$/`) que el teléfono ingresado coincida con la numeración telefónica boliviana (7 u 8 dígitos).
  - Alerta de confirmación visual (`#mensaje-confirmacion-pedido`) con detalles del pedido y auto-cierre temporizado.

---

### 4.6 Efectos y Componentes jQuery (`jquery-panel.js`)
- **Garantía DOM Ready:** Envoltorio `$(function () { ... })` para ejecución segura tras la carga del documento.
- **Menú Móvil Desplegable:** Uso de `.on("click")` y animación suave con `.slideToggle(200)` sincronizando `aria-expanded`.
- **Acordeón Exclusivo:** Delegación de eventos sobre `#acordeon .titulo`. Emplea `.stop(true, true)` para limpiar la cola de animaciones (evitando el clásico bug de encolamiento por clics repetidos) y cierra automáticamente los paneles hermanos no seleccionados con `.not()`.
- **Avisos Escalonados de Temporada:** Uso conjunto de `.each()`, `.delay(indice * 120)` y `.fadeIn(250)` para hacer aparecer los avisos uno tras otro de forma secuencial.
- **Chaining (Encadenamiento):** Función utilitaria `resaltar($seleccion)` que devuelve la selección jQuery permitiendo encadenar métodos posteriores como `.css()`.

---

## 5. HISTORIAL DE REFACTORIZACIÓN Y MEJORAS

Durante el proceso de integración se detectaron y resolvieron los siguientes aspectos críticos:
1. **Limpieza de Archivos Duplicados:** Se eliminaron las versiones redundantes `app(1).js`, `datos(1).js`, `funciones(1).js`, `estilos(1).css` y `eventos(1).js`, consolidando una base de código limpia y unificada.
2. **Corrección de Metadatos y Sintaxis HTML:** Se reparó el atributo `viewport` mal escrito y se corrigieron etiquetas `<article>` desalineadas en el catálogo estático inicial.
3. **Migración Conceptual de Datos:** Se reemplazaron por completo los datos de muestra heredados de ejercicios anteriores (panadería) por artículos legítimos de la boutique de ropa.
4. **Adición de Fotografía de Productos:** Se crearon y vincularon imágenes reales en la carpeta `imagenes/`, dotando a la tienda de un aspecto comercial auténtico y profesional.
5. **Sincronización Total:** Se garantizó que los scripts se comuniquen armónicamente sin lanzar errores en la consola (incorporando chequeos de existencia de elementos en el DOM).

---

## 6. CONCLUSIÓN

El proyecto **Angelica Boutique** cumple a cabalidad con los estándares modernos de desarrollo web front-end. Presenta una arquitectura robusta, semántica limpia, diseño visual adaptativo para computadoras y teléfonos móviles, y una experiencia de usuario ágil potenciada por JavaScript moderno y efectos jQuery. La plataforma está lista para su despliegue y puesta en producción.
