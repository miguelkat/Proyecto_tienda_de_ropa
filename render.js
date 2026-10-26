// ── RENDERIZADO MODULAR Y DINÁMICO DEL DOM ──────────────────────────────

/**
 * Genera la tarjeta HTML para una prenda del catálogo
 */
function crearTarjeta(producto) {
  const articulo = document.createElement("article");
  articulo.classList.add("tarjeta");
  
  const estaAgotado = !producto.disponible || producto.stock === 0;
  if (estaAgotado) {
    articulo.classList.add("agotado");
  }

  // Atributos de datos para búsqueda, filtrado y pedidos
  articulo.dataset.nombre = producto.nombre;
  articulo.dataset.categoria = producto.categoria;
  articulo.dataset.id = producto.id;
  articulo.dataset.precio = producto.precio;

  articulo.innerHTML = `
    <div class="tarjeta-cabecera">
      <span class="categoria-tag">${producto.categoria.toUpperCase()}</span>
      ${estaAgotado ? '<span class="badge-agotado">Agotado</span>' : '<span class="badge-disponible">En Stock</span>'}
    </div>
    ${
      producto.imagen
        ? `<figure class="tarjeta-imagen">
             <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
           </figure>`
        : ""
    }
    <h3>${producto.nombre}</h3>
    <p class="descripcion-corta">${producto.descripcion || "Prenda nueva de confección de primera mano en La Paz."}</p>
    <div class="precio-contenedor">
      <p class="precio">Bs ${producto.precio.toFixed(2)}</p>
      <span class="tag-mayorista">🔥 15% desc. x mayor (≥6 unid.)</span>
    </div>
    <p class="stock">${!estaAgotado ? `Disponible: ${producto.stock} unidades` : "Sin stock por el momento"}</p>
    ${
      !estaAgotado
        ? `<button type="button" class="btn-seleccionar" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Pedir esta prenda</button>`
        : `<button type="button" class="btn-agotado" disabled>No disponible</button>`
    }
  `;

  return articulo;
}

/**
 * Renderiza la lista de productos en el contenedor principal usando DocumentFragment
 */
function render(lista) {
  const destino = document.querySelector("#lista-productos");
  const elementoResultado = document.querySelector("#resultado");

  if (!destino) return;

  destino.innerHTML = "";

  if (!lista || lista.length === 0) {
    destino.innerHTML = `
      <article class="tarjeta sin-resultados" style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1.5rem;">
        <h3>No se encontraron prendas</h3>
        <p>Intenta con otra palabra clave o selecciona otra categoría en los filtros superiores.</p>
      </article>
    `;
    if (elementoResultado) {
      elementoResultado.textContent = "Mostrando 0 prendas coincidentes";
    }
    return;
  }

  const fragmento = document.createDocumentFragment();
  lista.forEach(producto => {
    fragmento.appendChild(crearTarjeta(producto));
  });
  destino.appendChild(fragmento);

  if (elementoResultado && typeof productos !== "undefined") {
    elementoResultado.textContent = `Mostrando ${lista.length} de ${productos.length} prendas registradas`;
  }
}

// Exponer en el ámbito global
window.render = render;
window.crearTarjeta = crearTarjeta;

// Inicializar cuando el DOM esté disponible
function inicializarRender() {
  if (typeof productos !== "undefined" && Array.isArray(productos)) {
    render(productos);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarRender);
} else {
  inicializarRender();
}
