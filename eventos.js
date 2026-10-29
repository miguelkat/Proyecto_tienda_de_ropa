/* ═════════════════════════════════════════════════════════════════════════
   ARCHIVO: eventos.js (Día 9 / Referencia Día 14 - Eventos y Formularios)
   PROYECTO: Angelica Boutique - Tienda de Ropa en La Paz
   PROPÓSITO: Escuchar buscador, botones de categoría, ordenamiento y
              validación del formulario de pedidos usando render() de render.js.
   ═════════════════════════════════════════════════════════════════════════ */

// ── 1. ELEMENTOS QUE SE VAN A ESCUCHAR ──────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.querySelector("#buscador");
  const filtros = document.querySelector("#filtros");
  const resultado = document.querySelector("#resultado");
  const contenedorLista = document.querySelector("#lista-productos");
  const formulario = document.querySelector("#Pedido form") || document.querySelector("form");

  let categoriaActiva = "todos";
  let textoBuscado = "";

  // ── 2. FUNCIÓN ACTUALIZAR: FILTRAR, ORDENAR Y LLAMAR A RENDER() ────────
  function obtenerCriterioOrden() {
    if (typeof preferencias !== "undefined" && preferencias && preferencias.orden) {
      return preferencias.orden;
    }
    const selectOrden = document.querySelector("#orden");
    return selectOrden ? selectOrden.value : "nombre";
  }

  function ordenarProductos(lista, criterio) {
    const copia = [...lista];
    switch (criterio) {
      case "precio-asc":
      case "precio":
        return copia.sort((a, b) => a.precio - b.precio);
      case "precio-desc":
        return copia.sort((a, b) => b.precio - a.precio);
      case "stock":
        return copia.sort((a, b) => b.stock - a.stock);
      case "nombre":
      default:
        return copia.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    }
  }

  function actualizar() {
    if (typeof productos === "undefined") {
      console.warn("El arreglo 'productos' no se ha cargado todavía.");
      return;
    }

    const filtrados = productos
      .filter(p => categoriaActiva === "todos" || p.categoria === categoriaActiva)
      .filter(p =>
        p.nombre.toLowerCase().includes(textoBuscado.toLowerCase()) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(textoBuscado.toLowerCase())) ||
        (p.talla && p.talla.toLowerCase().includes(textoBuscado.toLowerCase()))
      );

    const visibles = ordenarProductos(filtrados, obtenerCriterioOrden());

    // Llama a render() definido en render.js
    if (typeof render === "function") {
      render(visibles);
    }

    if (resultado) {
      resultado.textContent = `Mostrando ${visibles.length} de ${productos.length} prendas registradas`;
    }
  }

  // Escuchar cambios de preferencias (ej. cambio en #orden o restablecimiento)
  document.addEventListener("preferencias:cambiadas", () => {
    actualizar();
  });

  // Inicialización de la vista
  actualizar();

  // ── 3. EVENTO INPUT EN BUSCADOR ───────────────────────────────────────
  if (buscador) {
    buscador.addEventListener("input", (event) => {
      textoBuscado = event.target.value.trim();
      actualizar();
    });
  }

  // ── 4. DELEGACIÓN DE EVENTOS EN BOTONES DE FILTRO ─────────────────────
  if (filtros) {
    filtros.addEventListener("click", (event) => {
      const boton = event.target.closest("button");
      if (!boton) return;

      categoriaActiva = boton.dataset.categoria || "todos";

      filtros.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");

      actualizar();
    });
  }

  // ── 5. SELECCIÓN DE PRENDA DIRECTO AL FORMULARIO ───────────────────────
  if (contenedorLista) {
    contenedorLista.addEventListener("click", (event) => {
      const boton = event.target.closest(".btn-seleccionar");
      if (!boton) return;

      const nombrePrenda = boton.dataset.nombre;
      const selectProducto = document.querySelector("#producto");
      const seccionPedido = document.querySelector("#Pedido");

      if (selectProducto) {
        let encontrada = false;
        for (let i = 0; i < selectProducto.options.length; i++) {
          if (selectProducto.options[i].value.toLowerCase() === nombrePrenda.toLowerCase() ||
            selectProducto.options[i].text.toLowerCase().includes(nombrePrenda.toLowerCase())) {
            selectProducto.selectedIndex = i;
            encontrada = true;
            break;
          }
        }
        if (!encontrada) {
          const nuevaOpcion = new Option(nombrePrenda, nombrePrenda, true, true);
          selectProducto.add(nuevaOpcion);
        }

        if (seccionPedido) {
          seccionPedido.scrollIntoView({ behavior: "smooth" });
          const fieldset = seccionPedido.querySelector("fieldset");
          if (fieldset) {
            fieldset.classList.remove("pedido-resaltado");
            void fieldset.offsetWidth;
            fieldset.classList.add("pedido-resaltado");
          }
          const inputCantidad = document.querySelector("#cantidad");
          if (inputCantidad) inputCantidad.focus();
        }
      }
    });
  }

  // ── 6. EL EVENTO SUBMIT Y PREVENTDEFAULT EN EL PEDIDO ─────────────────
  if (formulario) {
    formulario.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!formulario.reportValidity()) {
        return;
      }

      // Validación de fecha de entrega
      const inputFecha = formulario.querySelector("#fecha");
      if (inputFecha && inputFecha.value) {
        const hoy = new Date().toISOString().slice(0, 10);
        if (inputFecha.value < hoy) {
          inputFecha.setCustomValidity("La fecha de entrega no puede ser anterior al día de hoy.");
          inputFecha.reportValidity();
          inputFecha.addEventListener("input", () => inputFecha.setCustomValidity(""), { once: true });
          return;
        }
      }

      // Validación de teléfono
      const inputTelefono = formulario.querySelector("#telefono");
      if (inputTelefono && inputTelefono.value) {
        const patronTel = /^[0-9]{7,8}$/;
        if (!patronTel.test(inputTelefono.value.trim())) {
          inputTelefono.setCustomValidity("Ingresa un número telefónico válido de 7 u 8 dígitos.");
          inputTelefono.reportValidity();
          inputTelefono.addEventListener("input", () => inputTelefono.setCustomValidity(""), { once: true });
          return;
        }
      }

      // Procesar datos del formulario
      const datos = Object.fromEntries(new FormData(formulario));
      console.log("Pedido recibido en Angelica Boutique:", datos);

      let mensajeExito = document.querySelector("#mensaje-confirmacion-pedido");
      if (!mensajeExito) {
        mensajeExito = document.createElement("div");
        mensajeExito.id = "mensaje-confirmacion-pedido";
        mensajeExito.className = "alerta-exito";
        formulario.prepend(mensajeExito);
      }

      mensajeExito.innerHTML = `
        <strong>¡Pedido recibido con éxito!</strong><br>
        Gracias <em>${datos.nombre}</em>. Tu solicitud para <strong>${datos.cantidad} unidad(es) de ${datos.producto}</strong> ha sido registrada.
        Nos comunicaremos al <strong>${datos.telefono}</strong> para coordinar la entrega programada para el <strong>${datos.fecha}</strong>.
      `;
      mensajeExito.style.display = "block";

      if (resultado) {
        resultado.textContent = `Último pedido registrado: ${datos.nombre} (${datos.producto})`;
      }

      formulario.reset();

      setTimeout(() => {
        if (mensajeExito) mensajeExito.style.display = "none";
      }, 8000);
    });
  }
});

// ── 7. EXPRESIONES REGULARES DE REFERENCIA ──────────────────────────────
const PATRONES = {
  telefono: /^[0-9]{7,8}$/,
  correo: /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i,
  ci: /^[0-9]{5,10}(-[0-9A-Za-z]{1,3})?$/
};
