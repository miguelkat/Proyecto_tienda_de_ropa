/* ═════════════════════════════════════════════════════════════════════════
   ARCHIVO: render.js (Día 8 / Referencia Día 14 - El DOM)
   PROYECTO: Angelica Boutique - Tienda de Ropa en La Paz
   PROPÓSITO: Transformar el arreglo de objetos de `datos.js` en tarjetas
              HTML interactivas y arrastrables dentro de `#lista-productos`.
   ═════════════════════════════════════════════════════════════════════════ */

// ── 1. SELECCIONAR ELEMENTOS DEL DOM ─────────────────────────────────────
const contenedor = document.querySelector("#lista-productos");
const titulos = document.querySelectorAll("h2");

console.log("El contenedor de catálogo existe:", contenedor !== null);
console.log("Hay", titulos.length, "encabezados h2 en la página");

// ── 2. CREAR ELEMENTOS: UNA TARJETA POR PRENDA ───────────────────────────
/**
 * Construye un elemento <article class="tarjeta"> a partir de un objeto producto.
 * @param {Object} producto - Objeto prenda proveniente de datos.js
 * @param {number} [index=0] - Índice para escalonar la animación de entrada
 * @returns {HTMLElement} Elemento <article> listo para insertar en el DOM
 */
function crearTarjeta(producto, index = 0) {
  const articulo = document.createElement("article");
  const estaDisponible = producto.disponible !== undefined ? producto.disponible : producto.stock > 0;

  articulo.classList.add("tarjeta");
  if (!estaDisponible || producto.stock === 0) {
    articulo.classList.add("agotado");
    articulo.draggable = false;
  } else {
    // Habilita Drag & Drop nativo de HTML5 para arrastrar la prenda al carrito
    articulo.draggable = true;
  }

  const coloresTexto = Array.isArray(producto.colores)
    ? producto.colores.join(", ")
    : producto.colores || "";

  // Atributos data-* para recordar a qué prenda corresponde al arrastrarla
  articulo.dataset.nombre = producto.nombre;
  articulo.dataset.precio = producto.precio;
  articulo.dataset.imagen = producto.imagen || "";
  articulo.dataset.talla = producto.talla || "Estándar";
  articulo.dataset.colores = coloresTexto;
  articulo.dataset.stock = producto.stock;
  articulo.dataset.categoria = producto.categoria;
  articulo.style.setProperty("--i", index);

  articulo.innerHTML = `
    <div class="tarjeta-cabecera">
      <span class="categoria-tag">${producto.categoria.toUpperCase()}</span>
      ${!estaDisponible || producto.stock === 0
      ? '<span class="badge-agotado">Agotado</span>'
      : '<span class="badge-arrastrable" title="Arrastra esta prenda a Mi bandeja">⠿ Arrastrar a bandeja</span>'
    }
    </div>
    ${producto.imagen
      ? `<figure class="tarjeta-imagen">
             <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" draggable="false">
           </figure>`
      : ""
    }
    <h3>${producto.nombre}</h3>
    <p class="descripcion-corta">${producto.descripcion || "Prenda de primera calidad confeccionada en La Paz."}</p>
    ${producto.talla
      ? `<p class="prenda-detalles" style="font-size:0.84rem; margin:0.3rem 0; color:var(--color-suave);">
             <strong>Talla:</strong> ${producto.talla} ${coloresTexto ? `· <strong>Color:</strong> ${coloresTexto}` : ''}
           </p>`
      : ""
    }
    <p class="precio">Bs ${producto.precio.toFixed(2)}</p>
    <p class="stock">${estaDisponible && producto.stock > 0 ? `Disponible: ${producto.stock} unidades` : "Agotado temporalmente"}</p>
    ${estaDisponible && producto.stock > 0
      ? `<div class="tarjeta-acciones">
             <button type="button" class="btn-agregar-carrito"
               data-nombre="${producto.nombre}"
               data-precio="${producto.precio}">➕ Agregar a mi bandeja</button>
             <button type="button" class="btn-seleccionar btn-pedir-secundario" data-nombre="${producto.nombre}">Pedir directo</button>
           </div>`
      : `<button type="button" class="btn-agotado" disabled>No disponible</button>`
    }
  `;

  return articulo;
}

// ── 3. PATRÓN RENDER: VACIAR -> RECORRER -> INSERTAR ─────────────────────
/**
 * Renderiza una lista de prendas en el contenedor #lista-productos.
 * @param {Array} lista - Arreglo de objetos de prendas a mostrar
 */
function render(lista) {
  const destino = contenedor || document.querySelector("#lista-productos");
  if (!destino) return;

  // 1. Vaciar el contenedor para evitar duplicados
  destino.innerHTML = "";

  // Caso vacío
  if (!lista || lista.length === 0) {
    destino.innerHTML = `
      <article class="tarjeta sin-resultados" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
        <h3>No hay prendas que coincidan con tu búsqueda</h3>
        <p>Intenta con otra palabra clave (ej. polera, kaki, pantalón, lana) o selecciona otra categoría.</p>
      </article>
    `;
    return;
  }

  // 2. Recorrer los datos y 3. Insertar cada tarjeta
  lista.forEach((producto, index) => {
    destino.append(crearTarjeta(producto, index));
  });
}

// ── 4. PINTADO INICIAL ───────────────────────────────────────────────────
if (typeof productos !== "undefined" && contenedor) {
  render(productos);
}
