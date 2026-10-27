/* ═════════════════════════════════════════════════════════════════════════
   ANGELICA BOUTIQUE – Día 12: Ajax, fetch y JSON
   (remoto.js)

   Hasta ayer los datos estaban en datos.js, dentro del proyecto.
   Hoy llegan de afuera via fetch, y eso cambia una cosa fundamental: TARDAN.

   QUÉ SIGNIFICA ASÍNCRONO. El código no se detiene a esperar. Pide los datos,
   sigue ejecutando las líneas siguientes, y cuando la respuesta llega, el
   navegador ejecuta la función que se dejó preparada.

   Por eso la página no se congela mientras carga. Y por eso no se puede
   escribir así:

       const datos = pedirDatos();   // NO: cuando esta línea termina,
       console.log(datos);            // los datos todavía no llegaron

   AJAX es el nombre histórico de esta técnica (Asynchronous JavaScript And
   XML). Hoy se usa JSON casi siempre con fetch o $.getJSON de jQuery.
   ═════════════════════════════════════════════════════════════════════════ */

const $estado = document.querySelector("#estado");
const listaRemota = document.querySelector("#lista-remota");

// ── 1. JSON ─────────────────────────────────────────────────────────────
// JSON es un formato de TEXTO para intercambiar datos. Se parece a un objeto
// de JavaScript, pero no es lo mismo:
//
//   en JSON                          en un objeto de JavaScript
//   ─────────────────────────        ──────────────────────────
//   las claves van entre comillas    no hace falta
//   dobles "                         simples o dobles, da igual
//   solo texto, número, booleano,    cualquier cosa, incluidas
//   null, arreglo y objeto           funciones y fechas
//   sin comentarios                  con comentarios
//   sin coma final                   la coma final se tolera
//
// Dos funciones, y son inversas:
//   JSON.parse(texto)     texto  -> objeto
//   JSON.stringify(obj)   objeto -> texto
const textoJson = '{"nombre":"Chompa de lana tejida","precio":28,"disponible":true}';
const objeto = JSON.parse(textoJson);
console.log(objeto.precio, typeof objeto.precio);      // 28 "number"
console.log(JSON.stringify(objeto));                    // vuelve a texto

// ── 2. LOS TRES ESTADOS ─────────────────────────────────────────────────
// Cualquier cosa que venga de la red está SIEMPRE en uno de tres estados:
// cargando, éxito o error. Los tres se muestran al usuario.
function mostrarEstado(texto, tipo = "info") {
  if (!$estado) return;
  $estado.textContent = texto;
  $estado.className = tipo;
}

// Renderiza las prendas recibidas del JSON en tarjetas del catálogo
function pintarRemoto(prendas) {
  if (!listaRemota) return;
  listaRemota.innerHTML = "";

  if (!prendas || prendas.length === 0) {
    listaRemota.innerHTML = "<p>No se encontraron prendas en los datos.</p>";
    return;
  }

  prendas.forEach((p, index) => {
    const art = document.createElement("article");
    art.classList.add("tarjeta");
    art.style.setProperty("--i", index);
    if (!p.disponible) art.classList.add("agotado");

    art.innerHTML = `
      <div class="tarjeta-cabecera">
        <span class="categoria-tag">${p.categoria.toUpperCase()}</span>
        ${!p.disponible ? '<span class="badge-agotado">Agotado</span>' : ''}
      </div>
      <h3>${p.nombre}</h3>
      <p class="precio">Bs ${p.precio.toFixed(2)} / ${p.unidad}</p>
      <p class="stock">${p.disponible ? `${p.stock} en stock` : "Sin stock disponible"}</p>
      ${p.proveedor ? `<p class="descripcion-corta">Proveedor: ${p.proveedor}</p>` : ""}
    `;
    listaRemota.appendChild(art);
  });
}

// ── 3. fetch Y async/await ──────────────────────────────────────────────
// fetch es la forma actual, y viene en el navegador: no hay que instalar nada.
//
// async/await deja leer código asíncrono como si fuera secuencial:
//   await   "espera aquí a que esto termine, sin congelar la página"
//   async   marca la función como asíncrona; solo dentro de una se puede usar await
//
// ⚠️ EL ERROR QUE TODOS COMETEN LA PRIMERA VEZ:
// fetch NO lanza un error con un 404 ni con un 500. Por eso hay que
// comprobar response.ok a mano.
async function cargarConFetch(url = "datos.json") {
  mostrarEstado("Cargando prendas...", "cargando");

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {                            // <- la comprobación
      throw new Error(`El servidor respondió ${respuesta.status}`);
    }

    const datos = await respuesta.json();           // también tarda: await
    pintarRemoto(datos.productos);
    mostrarEstado(`✔ ${datos.productos.length} prendas cargadas de ${datos.negocio.nombre}`, "ok");

  } catch (error) {
    mostrarEstado(`✖ No se pudieron cargar los datos. ${error.message}`, "error");
    if (listaRemota) listaRemota.innerHTML = "";
  }
}

document.querySelector("#cargar-fetch")
  ?.addEventListener("click", () => cargarConFetch());

// Un archivo que no existe, para ver el camino del error de verdad
document.querySelector("#cargar-roto")
  ?.addEventListener("click", () => cargarConFetch("no-existe.json"));

// ── 4. LO MISMO CON jQuery ──────────────────────────────────────────────
// jQuery trae $.getJSON que devuelve un objeto con .done(), .fail(), .always()
// A diferencia de fetch, jQuery SÍ considera un 404 como fallo y entra en .fail()
if (typeof $ !== "undefined") {
  $("#cargar-jquery").on("click", function () {
    mostrarEstado("Cargando con jQuery...", "cargando");

    $.getJSON("datos.json")
      .done(function (datos) {
        pintarRemoto(datos.productos);
        mostrarEstado(`✔ ${datos.productos.length} prendas (vía jQuery)`, "ok");
      })
      .fail(function (jqXHR) {
        mostrarEstado(`✖ Falló la carga: HTTP ${jqXHR.status}`, "error");
      })
      .always(function () {
        console.log("La petición jQuery terminó, con éxito o sin él.");
      });
  });
}

// ── 5. QUÉ ES UNA PROMESA ───────────────────────────────────────────────
// fetch devuelve una promesa. await es la forma de decir "espera a que esta
// promesa se resuelva y dame el valor".
//
// Sin await, la forma antigua es .then():
//
//     fetch("datos.json")
//       .then(r => r.json())
//       .then(datos => pintarRemoto(datos.productos))
//       .catch(error => mostrarEstado(error.message, "error"));
//
// async/await se lee mejor cuando hay varios pasos encadenados.
