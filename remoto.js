/* ═════════════════════════════════════════════════════════════════════════
   ANGELICA BOUTIQUE – Día 12: Ajax, fetch y JSON
   (remoto.js)

   Módulo de consulta asíncrona de inventario en tiempo real desde el archivo
   datos.json utilizando fetch (async/await) y jQuery.getJSON. Permite al cliente
   consultar y actualizar el stock disponible sin recargar la página web.
   ═════════════════════════════════════════════════════════════════════════ */

const $estado = document.querySelector("#estado");
const listaRemota = document.querySelector("#lista-remota");

// ── 1. JSON ─────────────────────────────────────────────────────────────
// JSON es el formato estándar de texto para intercambio de datos.
const textoJson = '{"nombre":"Chompa de lana tejida","precio":28,"disponible":true}';
const objeto = JSON.parse(textoJson);
console.log("JSON cargado:", objeto.nombre, "Precio:", objeto.precio);

// ── 2. ESTADOS DE LA CONSULTA (CARGANDO, ÉXITO, ERROR) ───────────────────
function mostrarEstado(texto, tipo = "info") {
  if (!$estado) return;
  $estado.textContent = texto;
  $estado.className = tipo;
}

// Renderiza las prendas recibidas del inventario en tarjetas del catálogo
function pintarRemoto(prendas) {
  if (!listaRemota) return;
  listaRemota.innerHTML = "";

  if (!prendas || prendas.length === 0) {
    listaRemota.innerHTML = "<p>No se encontraron prendas registradas en el inventario.</p>";
    return;
  }

  prendas.forEach((p, index) => {
    const art = document.createElement("article");
    art.classList.add("tarjeta");
    art.style.setProperty("--i", index);
    art.dataset.nombre = p.nombre;
    art.dataset.precio = p.precio;
    art.dataset.imagen = p.imagen || "";
    art.dataset.talla = p.talla || "Estándar";
    art.dataset.colores = p.colores || "";

    if (!p.disponible) {
      art.classList.add("agotado");
      art.draggable = false;
    } else {
      art.draggable = true;
    }

    art.innerHTML = `
      <div class="tarjeta-cabecera">
        <span class="categoria-tag">${p.categoria.toUpperCase()}</span>
        ${!p.disponible ? '<span class="badge-agotado">Agotado</span>' : '<span class="badge-arrastrable" title="Arrastra esta prenda a Mi bandeja">⠿ Arrastrar a bandeja</span>'}
      </div>
      ${
        p.imagen
          ? `<figure class="tarjeta-imagen">
               <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" draggable="false">
             </figure>`
          : ""
      }
      <h3>${p.nombre}</h3>
      ${
        p.talla
          ? `<p class="prenda-detalles" style="font-size:0.84rem; margin:0.3rem 0; color:var(--color-suave);">
               <strong>Talla:</strong> ${p.talla} ${p.colores ? `· <strong>Color:</strong> ${p.colores}` : ""}
             </p>`
          : ""
      }
      <p class="precio">Bs ${p.precio.toFixed(2)} / ${p.unidad}</p>
      <p class="stock">${p.disponible ? `Disponible: ${p.stock} unidades en almacén` : "Sin stock por el momento"}</p>
      ${p.proveedor ? `<p class="descripcion-corta">Confección: ${p.proveedor}</p>` : ""}
      ${
        p.disponible
          ? `<div class="tarjeta-acciones">
               <button type="button" class="btn-agregar-carrito"
                 data-nombre="${p.nombre}"
                 data-precio="${p.precio}">➕ Agregar a mi bandeja</button>
               <button type="button" class="btn-seleccionar btn-pedir-secundario" data-nombre="${p.nombre}">Pedir directo</button>
             </div>`
          : `<button type="button" class="btn-agotado" disabled>Agotado</button>`
      }
    `;
    listaRemota.appendChild(art);
  });
}

// ── 3. FETCH Y ASYNC/AWAIT ──────────────────────────────────────────────
async function cargarConFetch(url = "datos.json") {
  mostrarEstado("Consultando almacén de prendas en línea...", "cargando");

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`Servidor de inventario respondió con error ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    pintarRemoto(datos.productos);
    mostrarEstado(`✔ Se actualizaron ${datos.productos.length} prendas disponibles de ${datos.negocio.nombre}`, "ok");

  } catch (error) {
    mostrarEstado(`✖ No se pudo sincronizar el stock en este momento. ${error.message}`, "error");
    if (listaRemota) listaRemota.innerHTML = "";
  }
}

// ── 4. EVENTOS DE CONTROL ───────────────────────────────────────────────
function iniciarControlesRemotos() {
  document.querySelector("#cargar-fetch")
    ?.addEventListener("click", () => cargarConFetch());

  // Simulación de falla de red o archivo inexistente para verificar el manejo de errores
  document.querySelector("#cargar-roto")
    ?.addEventListener("click", () => cargarConFetch("no-existe.json"));

  // Opción con jQuery $.getJSON
  if (typeof $ !== "undefined") {
    $("#cargar-jquery").on("click", function () {
      mostrarEstado("Sincronizando inventario con respuesta rápida...", "cargando");

      $.getJSON("datos.json")
        .done(function (datos) {
          pintarRemoto(datos.productos);
          mostrarEstado(`✔ Sincronizadas ${datos.productos.length} prendas con stock garantizado`, "ok");
        })
        .fail(function (jqXHR) {
          mostrarEstado(`✖ Falló la sincronización: Código ${jqXHR.status}`, "error");
        })
        .always(function () {
          console.log("Consulta de inventario completada.");
        });
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarControlesRemotos);
} else {
  iniciarControlesRemotos();
}
