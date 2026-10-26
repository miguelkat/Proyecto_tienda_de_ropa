// ── CONTROLADOR DE EVENTOS E INTERACCIÓN DE LA TIENDA ───────────────────
document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.querySelector("#buscador");
  const filtros = document.querySelector("#filtros");
  const resultado = document.querySelector("#resultado");
  const contenedorLista = document.querySelector("#lista-productos");
  const formulario = document.querySelector("#Pedido form") || document.querySelector("form");
  const selectProducto = document.querySelector("#producto");
  const inputCantidad = document.querySelector("#cantidad");
  const contenedorResumen = document.querySelector("#resumen-pedido");
  const btnWhatsAppDirecto = document.querySelector("#btn-whatsapp-directo");

  let categoriaActiva = "todos";
  let textoBuscado = "";

  // ── 1. CARGA DINÁMICA DEL SELECT DE PRENDAS ────────────────────────────
  function inicializarSelectProductos() {
    if (!selectProducto || typeof productos === "undefined") return;

    // Mantener la opción por defecto
    selectProducto.innerHTML = '<option value="">-- Elige una prenda del catálogo --</option>';

    productos.forEach(p => {
      const option = document.createElement("option");
      option.value = p.nombre;
      option.textContent = `${p.nombre} (${typeof formatearMoneda === "function" ? formatearMoneda(p.precio) : "Bs " + p.precio})`;
      option.dataset.precio = p.precio;
      option.dataset.disponible = p.disponible;
      if (!p.disponible || p.stock === 0) {
        option.textContent += " [Agotado]";
        option.disabled = true;
      }
      selectProducto.appendChild(option);
    });
  }

  inicializarSelectProductos();

  // ── 2. CÁLCULO Y RESUMEN EN VIVO DEL PEDIDO ────────────────────────────
  function actualizarResumenPedido() {
    if (!contenedorResumen || !selectProducto) return;

    const nombreSeleccionado = selectProducto.value;
    const cantidad = parseInt(inputCantidad ? inputCantidad.value : 1, 10) || 1;

    if (!nombreSeleccionado || typeof productos === "undefined") {
      contenedorResumen.innerHTML = `
        <h4>Resumen de tu Pedido</h4>
        <p style="margin: 0; font-size: 0.9rem; color: var(--color-suave);">
          Selecciona una prenda arriba para calcular el total y descuentos mayoristas en vivo.
        </p>
      `;
      return;
    }

    const prod = productos.find(p => p.nombre === nombreSeleccionado);
    const precioUnitario = prod ? prod.precio : 0;
    const subtotal = precioUnitario * cantidad;

    // Descuento mayorista: 15% para 6 o más unidades
    const resultadoMayorista = typeof calcularDescuentoMayorista === "function"
      ? calcularDescuentoMayorista(cantidad, subtotal)
      : { aplica: cantidad >= 6, ahorro: cantidad >= 6 ? subtotal * 0.15 : 0, totalConDescuento: cantidad >= 6 ? subtotal * 0.85 : subtotal };

    const fmt = typeof formatearMoneda === "function" ? formatearMoneda : (val) => `Bs ${Number(val).toFixed(2)}`;

    contenedorResumen.innerHTML = `
      <h4>
        <span>📋 Resumen de tu Pedido</span>
        ${resultadoMayorista.aplica ? '<span class="badge-mayorista">¡15% Descuento Mayorista!</span>' : ''}
      </h4>
      <div class="resumen-linea">
        <span>Prenda seleccionada:</span>
        <strong>${nombreSeleccionado}</strong>
      </div>
      <div class="resumen-linea">
        <span>Precio unitario:</span>
        <span>${fmt(precioUnitario)}</span>
      </div>
      <div class="resumen-linea">
        <span>Cantidad:</span>
        <span>${cantidad} unidad(es)</span>
      </div>
      <div class="resumen-linea">
        <span>Subtotal:</span>
        <span>${fmt(subtotal)}</span>
      </div>
      ${
        resultadoMayorista.aplica
          ? `<div class="resumen-linea ahorro">
               <span>Descuento por mayor (15%):</span>
               <span>-${fmt(resultadoMayorista.ahorro)}</span>
             </div>`
          : `<div class="resumen-linea" style="font-size: 0.85rem; color: var(--color-suave);">
               <span>Descuento mayorista:</span>
               <span>Agrega ${Math.max(0, 6 - cantidad)} más para obtener 15% desc.</span>
             </div>`
      }
      <div class="resumen-total">
        <span>Total a pagar:</span>
        <span>${fmt(resultadoMayorista.totalConDescuento)}</span>
      </div>
    `;
  }

  if (selectProducto) {
    selectProducto.addEventListener("change", actualizarResumenPedido);
  }
  if (inputCantidad) {
    inputCantidad.addEventListener("input", actualizarResumenPedido);
  }

  // Ejecución inicial del resumen
  actualizarResumenPedido();

  // ── 3. ACTUALIZACIÓN DE BÚSQUEDA Y FILTROS EN EL CATÁLOGO ───────────────
  function actualizarCatalogo() {
    if (typeof productos === "undefined" || typeof window.render !== "function") return;

    const visibles = productos
      .filter(p => categoriaActiva === "todos" || p.categoria === categoriaActiva)
      .filter(p => {
        const query = textoBuscado.toLowerCase();
        return p.nombre.toLowerCase().includes(query) ||
               (p.descripcion && p.descripcion.toLowerCase().includes(query));
      });

    window.render(visibles);

    if (resultado) {
      resultado.textContent = `Mostrando ${visibles.length} de ${productos.length} prendas registradas`;
    }
  }

  if (buscador) {
    buscador.addEventListener("input", (event) => {
      textoBuscado = event.target.value.trim();
      actualizarCatalogo();
    });
  }

  if (filtros) {
    filtros.addEventListener("click", (event) => {
      const boton = event.target.closest("button");
      if (!boton) return;

      categoriaActiva = boton.dataset.categoria || "todos";
      filtros.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");

      actualizarCatalogo();
    });
  }

  // ── 4. SELECCIÓN DE PRENDA DIRECTO DESDE LA TARJETA DEL CATÁLOGO ─────────
  if (contenedorLista) {
    contenedorLista.addEventListener("click", (event) => {
      const boton = event.target.closest(".btn-seleccionar");
      if (!boton) return;

      const nombrePrenda = boton.dataset.nombre;
      if (!selectProducto) return;

      // Buscar la opción en el select
      let encontrada = false;
      for (let i = 0; i < selectProducto.options.length; i++) {
        if (selectProducto.options[i].value === nombrePrenda) {
          selectProducto.selectedIndex = i;
          encontrada = true;
          break;
        }
      }

      actualizarResumenPedido();

      const seccionPedido = document.querySelector("#Pedido");
      if (seccionPedido) {
        seccionPedido.scrollIntoView({ behavior: "smooth" });
        if (inputCantidad) {
          inputCantidad.focus();
        }
      }
    });
  }

  // ── 5. BOTÓN DIRECTO DE WHATSAPP CON DATOS DEL FORMULARIO ───────────────
  if (btnWhatsAppDirecto) {
    btnWhatsAppDirecto.addEventListener("click", () => {
      if (!formulario) return;

      const datos = Object.fromEntries(new FormData(formulario));
      if (!datos.producto) {
        alert("Por favor selecciona una prenda en el formulario antes de enviar por WhatsApp.");
        if (selectProducto) selectProducto.focus();
        return;
      }

      const prod = typeof productos !== "undefined" ? productos.find(p => p.nombre === datos.producto) : null;
      const precioUnitario = prod ? prod.precio : 0;
      const subtotal = precioUnitario * (parseInt(datos.cantidad, 10) || 1);
      const resultadoMayorista = typeof calcularDescuentoMayorista === "function"
        ? calcularDescuentoMayorista(datos.cantidad, subtotal)
        : { totalConDescuento: subtotal };

      const urlWhatsApp = typeof generarEnlaceWhatsApp === "function"
        ? generarEnlaceWhatsApp({
            nombre: datos.nombre,
            telefono: datos.telefono,
            producto: datos.producto,
            cantidad: datos.cantidad || 1,
            subtotal,
            total: resultadoMayorista.totalConDescuento,
            fecha: datos.fecha,
            notas: datos.notas
          })
        : `https://wa.me/59170124198?text=${encodeURIComponent("Hola Angelica Boutique, deseo pedir: " + datos.producto)}`;

      window.open(urlWhatsApp, "_blank");
    });
  }

  // ── 6. VALIDACIÓN Y PROCESAMIENTO DEL FORMULARIO (SUBMIT) ────────────────
  if (formulario) {
    formulario.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!formulario.reportValidity()) return;

      // Validación de fecha no pasada
      const inputFecha = formulario.querySelector("#fecha");
      if (inputFecha && inputFecha.value) {
        const hoy = new Date().toISOString().slice(0, 10);
        if (inputFecha.value < hoy) {
          inputFecha.setCustomValidity("La fecha de entrega o recojo no puede ser anterior a hoy.");
          inputFecha.reportValidity();
          inputFecha.addEventListener("input", () => inputFecha.setCustomValidity(""), { once: true });
          return;
        }
      }

      // Validación de formato telefónico boliviano (7 u 8 dígitos)
      const inputTel = formulario.querySelector("#telefono");
      if (inputTel && inputTel.value) {
        const patronTel = /^[0-9]{7,8}$/;
        if (!patronTel.test(inputTel.value.trim())) {
          inputTel.setCustomValidity("Ingresa un número telefónico boliviano válido de 7 u 8 dígitos.");
          inputTel.reportValidity();
          inputTel.addEventListener("input", () => inputTel.setCustomValidity(""), { once: true });
          return;
        }
      }

      const datos = Object.fromEntries(new FormData(formulario));
      const prod = typeof productos !== "undefined" ? productos.find(p => p.nombre === datos.producto) : null;
      const subtotal = (prod ? prod.precio : 0) * (parseInt(datos.cantidad, 10) || 1);
      const mayorista = typeof calcularDescuentoMayorista === "function"
        ? calcularDescuentoMayorista(datos.cantidad, subtotal)
        : { aplica: false, totalConDescuento: subtotal };

      const fmt = typeof formatearMoneda === "function" ? formatearMoneda : (v) => `Bs ${Number(v).toFixed(2)}`;

      let mensajeExito = document.querySelector("#mensaje-confirmacion-pedido");
      if (!mensajeExito) {
        mensajeExito = document.createElement("div");
        mensajeExito.id = "mensaje-confirmacion-pedido";
        mensajeExito.className = "alerta-exito";
        formulario.prepend(mensajeExito);
      }

      mensajeExito.innerHTML = `
        <strong>🎉 ¡Pedido registrado con éxito en Angelica Boutique!</strong><br>
        Estimado/a <strong>${datos.nombre}</strong>, tu solicitud para <strong>${datos.cantidad}x ${datos.producto}</strong> ha sido guardada.<br>
        ${mayorista.aplica ? `<span class="badge-mayorista">15% Descuento Mayorista aplicado</span><br>` : ''}
        <strong>Total a pagar:</strong> ${fmt(mayorista.totalConDescuento)}.<br>
        Coordinaremos la entrega programada para el <strong>${datos.fecha}</strong> vía WhatsApp al <strong>${datos.telefono}</strong>.
      `;
      mensajeExito.style.display = "block";

      formulario.reset();
      actualizarResumenPedido();

      mensajeExito.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => {
        if (mensajeExito) mensajeExito.style.display = "none";
      }, 10000);
    });
  }
});
