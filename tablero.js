/* ═════════════════════════════════════════════════════════════════════════
   DEMO DEL DÍA 14 - "Arma tu surtido" (Carrito de Bandeja Interactivo)
   ARCHIVO: tablero.js
   PROYECTO: Angelica Boutique - Tienda de Ropa en La Paz
   PROPÓSITO: Tablero y Carrito de Bandeja interactivo de 12 casillas donde
              el cliente arrastra prendas o usa los botones «Agregar» y
              «Quitar», ve llenarse visualmente las 12 casillas de su
              bandeja, desbloquea 15% de descuento mayorista en la 6.ª
              prenda, recibe consejos de estilo y visualiza el gráfico
              dinámico en Canvas 2D.
   ═════════════════════════════════════════════════════════════════════════ */

const CLAVE_SURTIDO = "angelica-boutique:surtido";
const CAPACIDAD_MAXIMA = 12;
const MINIMO_MAYORISTA = 6;
const PORCENTAJE_MAYORISTA = 15;

// Catálogo oficial de prendas para "Prendas de hoy"
const PRENDAS_DE_HOY = [
  { id: "polera-blanca", nombre: "Polera de algodón Blanca", detalle: "Talla M · Blanco", precio: 30.00, imagen: "imagenes/polera-blanca.jpg" },
  { id: "polera-kaki", nombre: "Polera de algodón Kaki", detalle: "Tallas M, L · Kaki", precio: 30.00, imagen: "imagenes/polera-kaki.jpg" },
  { id: "pantalon-lana", nombre: "Pantalón de lana", detalle: "Tallas S a XL · 4 colores", precio: 35.00, imagen: "imagenes/pantalon-lana.jpg" },
  { id: "chompa-lana", nombre: "Chompa de lana tejida", detalle: "Talla M/L · Azul, Café, Vino", precio: 28.00, imagen: "imagenes/chompa-lana.jpg" },
  { id: "pijama-2p", nombre: "Pijama conjunto 2 piezas", detalle: "Talla Estándar · Algodón", precio: 60.00, imagen: "imagenes/pijama-conjunto.jpg" },
  { id: "pijama-termica", nombre: "Pijama térmica afelpada", detalle: "Talla M/L · Polar térmico", precio: 65.00, imagen: "imagenes/pijama-termica.jpg" },
  { id: "pijama-camison", nombre: "Pijama camisón liviano", detalle: "Talla M · Perla, Lavanda", precio: 45.00, imagen: "imagenes/pijama-conjunto.jpg" }
];

// Consejos de combinación de ropa según la prenda agregada a la bandeja
const CONSEJOS_POR_ID = {
  "polera-blanca": {
    titulo: "✨ Tip para tu Polera Blanca (Talla M)",
    consejo: "El algodón blanco es ideal como primera capa en La Paz: fresca al mediodía y perfecta debajo de la Chompa de lana tejida por la tarde.",
    sugeridoId: "pantalon-lana",
    textoBoton: "➕ Combinar con Pantalón de lana (Bs 35)"
  },
  "polera-kaki": {
    titulo: "🌿 Estilo con tu Polera Kaki (Tallas M y L)",
    consejo: "El tono Kaki combina de maravilla con nuestro Pantalón de lana en color Negro o Café espresso para un look moderno y abrigado.",
    sugeridoId: "pantalon-lana",
    textoBoton: "➕ Combinar con Pantalón de lana (Bs 35)"
  },
  "pantalon-lana": {
    titulo: "🔥 Abrigo con tu Pantalón de Lana (S a XL)",
    consejo: "Disponible en Azul, Negro, Café y Plomo. Su tejido térmico retiene el calor sin picar. Llévalo con una Polera de algodón Kaki o Blanca.",
    sugeridoId: "polera-kaki",
    textoBoton: "➕ Combinar con Polera Kaki (Bs 30)"
  },
  "chompa-lana": {
    titulo: "🧶 Cuidado de tu Chompa de Lana Tejida",
    consejo: "Úsala sobre la Polera de algodón Blanca para mayor suavidad en el cuello. Lávala en agua fría y sécala en plano para conservar su tejido.",
    sugeridoId: "polera-blanca",
    textoBoton: "➕ Combinar con Polera Blanca (Bs 30)"
  },
  "pijama-2p": {
    titulo: "🌙 Descanso con Pijama 2 Piezas",
    consejo: "Algodón suave y transpirable para todo el año. Para noches de invierno intenso en La Paz, suma también nuestra Pijama térmica afelpada.",
    sugeridoId: "pijama-termica",
    textoBoton: "➕ Sumar Pijama Térmica (Bs 65)"
  },
  "pijama-termica": {
    titulo: "❄️ Máximo Abrigo Nocturno",
    consejo: "Su interior polar hipoalergénico conserva el calor desde el primer minuto. Combínala con una Chompa de lana para estar en casa.",
    sugeridoId: "chompa-lana",
    textoBoton: "➕ Sumar Chompa de lana (Bs 28)"
  },
  "pijama-camison": {
    titulo: "🌸 Frescura y Comodidad",
    consejo: "De caída ligera en tonos Perla y Lavanda. Ideal para combinar con una Chompa de lana tejida al levantarte por la mañana.",
    sugeridoId: "chompa-lana",
    textoBoton: "➕ Combinar con Chompa de lana (Bs 28)"
  }
};

const CONSEJOS_GENERALES = [
  {
    titulo: "🧥 Regla de las 2 Capas en La Paz",
    consejo: "Usa una Polera 100% algodón (Blanca o Kaki) como base transpirable y suma una Chompa o Pantalón de lana para conservar el calor.",
    sugeridoId: "polera-kaki",
    textoBoton: "➕ Agregar Polera Kaki a mi bandeja"
  },
  {
    titulo: "🏷️ Ahorro Mayorista (15% de Descuento)",
    consejo: "Al juntar 6 o más prendas en «Mi bandeja» (puedes mezclar poleras, pantalones de lana y pijamas), recibes 15% de descuento automático.",
    sugeridoId: "pantalon-lana",
    textoBoton: "➕ Agregar Pantalón de lana a mi bandeja"
  },
  {
    titulo: "🎨 Combinación de Colores Unisex",
    consejo: "El Pantalón de lana Plomo y Azul marino resalta con la Polera Blanca (Talla M), mientras que el Negro y Café van genial con la Polera Kaki.",
    sugeridoId: "polera-blanca",
    textoBoton: "➕ Agregar Polera Blanca a mi bandeja"
  }
];

let indiceTipGeneral = 0;
let idSugeridoActual = "pantalon-lana";
let timerBurbuja = null;

// Estado de "Mi bandeja": arreglo de { id, nombre, precio, cantidad }
let miBandeja = cargarBandeja();

// ── 1. PERSISTENCIA EN LOCALSTORAGE ──────────────────────────────────────
function cargarBandeja() {
  try {
    const guardado = localStorage.getItem(CLAVE_SURTIDO);
    if (guardado) {
      const parseado = JSON.parse(guardado);
      if (Array.isArray(parseado)) return parseado;
    }
  } catch (e) {
    console.warn("No se pudo leer el surtido de localStorage:", e);
  }
  return [
    { id: "polera-kaki", nombre: "Polera de algodón Kaki", precio: 30.00, cantidad: 3 },
    { id: "pantalon-lana", nombre: "Pantalón de lana", precio: 35.00, cantidad: 2 },
    { id: "polera-blanca", nombre: "Polera de algodón Blanca", precio: 30.00, cantidad: 1 }
  ];
}

function guardarBandeja() {
  try {
    localStorage.setItem(CLAVE_SURTIDO, JSON.stringify(miBandeja));
  } catch (e) {
    console.warn("No se pudo guardar el surtido en localStorage:", e);
  }
}

function buscarPrendaPorIdONombre(identificador) {
  if (!identificador) return null;
  const limpio = String(identificador).toLowerCase().trim();
  return (
    PRENDAS_DE_HOY.find(p => p.id === limpio) ||
    PRENDAS_DE_HOY.find(p => p.nombre.toLowerCase() === limpio) ||
    PRENDAS_DE_HOY.find(p => p.nombre.toLowerCase().includes(limpio) || limpio.includes(p.nombre.toLowerCase())) ||
    null
  );
}

// ── 2. CÁLCULO FINANCIERO DE "MI BANDEJA" ────────────────────────────────
function calcularResumenBandeja() {
  const ocupadas = miBandeja.reduce((suma, item) => suma + item.cantidad, 0);
  const subtotal = miBandeja.reduce((suma, item) => {
    if (typeof calcularTotal === "function") {
      return suma + calcularTotal(item.precio, item.cantidad);
    }
    return suma + item.precio * item.cantidad;
  }, 0);

  const aplicaMayorista = ocupadas >= MINIMO_MAYORISTA;
  const totalPagar = aplicaMayorista
    ? (typeof aplicarDescuento === "function"
        ? aplicarDescuento(subtotal, PORCENTAJE_MAYORISTA)
        : subtotal * (1 - PORCENTAJE_MAYORISTA / 100))
    : subtotal;

  const ahorro = subtotal - totalPagar;

  return {
    ocupadas,
    restantes: Math.max(0, CAPACIDAD_MAXIMA - ocupadas),
    lleno: ocupadas >= CAPACIDAD_MAXIMA,
    porcentajeLlenado: Math.min(100, (ocupadas / CAPACIDAD_MAXIMA) * 100),
    subtotal,
    aplicaMayorista,
    ahorro,
    totalPagar
  };
}

// ── 3. ANIMACIÓN DE VUELO Y SACUDIDA DEL CARRITO DE BANDEJA ──────────────
function sacudirBandejaTop() {
  const btnTop = document.querySelector("#btn-toggle-drawer");
  const iconoTop = document.querySelector("#carrito-icono-top");
  const badgeTop = document.querySelector("#carrito-contador-top");

  [btnTop, iconoTop, badgeTop].forEach(el => {
    if (!el) return;
    el.classList.remove("anim-carrito-sacudir");
    void el.offsetWidth;
    el.classList.add("anim-carrito-sacudir");
  });
}

function animarVueloABandeja(elementoOrigen, urlImagen) {
  const btnTop = document.querySelector("#btn-toggle-drawer");
  if (!elementoOrigen || !btnTop) {
    sacudirBandejaTop();
    return;
  }

  const rectOrigen = elementoOrigen.getBoundingClientRect();
  const rectDestino = btnTop.getBoundingClientRect();

  const clon = document.createElement("div");
  clon.className = "prenda-voladora";
  if (urlImagen) {
    clon.style.backgroundImage = `url("${urlImagen}")`;
  } else {
    clon.textContent = "👕";
  }

  const startX = rectOrigen.left + rectOrigen.width / 2 - 28;
  const startY = rectOrigen.top + rectOrigen.height / 2 - 28;
  const endX = rectDestino.left + rectDestino.width / 2 - 18;
  const endY = rectDestino.top + rectDestino.height / 2 - 18;

  clon.style.left = `${startX}px`;
  clon.style.top = `${startY}px`;
  document.body.appendChild(clon);

  requestAnimationFrame(() => {
    clon.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0.28) rotate(14deg)`;
    clon.style.opacity = "0.2";
  });

  setTimeout(() => {
    clon.remove();
    sacudirBandejaTop();
  }, 560);
}

// ── 4. CONSEJOS DE ROPA DE ANGELICA BOUTIQUE ─────────────────────────────
function actualizarConsejoRopa(idPrenda, mostrarBurbujaTop = false) {
  const tip =
    CONSEJOS_POR_ID[idPrenda] ||
    CONSEJOS_GENERALES[indiceTipGeneral % CONSEJOS_GENERALES.length];

  idSugeridoActual = tip.sugeridoId || "pantalon-lana";

  const elTitulo = document.querySelector("#surtido-consejo-titulo");
  const elTexto = document.querySelector("#surtido-consejo-texto");
  const btnSug = document.querySelector("#surtido-btn-sugerido");

  if (elTitulo) elTitulo.textContent = tip.titulo;
  if (elTexto) elTexto.textContent = tip.consejo;
  if (btnSug) {
    btnSug.hidden = false;
    btnSug.textContent = tip.textoBoton || "➕ Agregar prenda recomendada";
  }

  const burbuja = document.querySelector("#carrito-burbuja-consejo");
  const drawer = document.querySelector("#carrito-drawer");
  const bTitulo = document.querySelector("#burbuja-titulo");
  const bTexto = document.querySelector("#burbuja-texto");
  const bBtnSug = document.querySelector("#btn-agregar-sugerido");

  if (bTitulo) bTitulo.textContent = tip.titulo;
  if (bTexto) bTexto.textContent = tip.consejo;
  if (bBtnSug) {
    bBtnSug.hidden = false;
    bBtnSug.textContent = tip.textoBoton || "➕ Agregar prenda recomendada";
  }

  const drawerAbierto = drawer && !drawer.hidden;
  if (mostrarBurbujaTop && burbuja && !drawerAbierto) {
    burbuja.hidden = false;
    burbuja.classList.remove("anim-burbuja");
    void burbuja.offsetWidth;
    burbuja.classList.add("anim-burbuja");

    if (timerBurbuja) clearTimeout(timerBurbuja);
    timerBurbuja = setTimeout(() => {
      burbuja.hidden = true;
    }, 7500);
  }
}

// ── 5. OPERACIONES: AGREGAR, QUITAR Y VACIAR EN "MI BANDEJA" ─────────────
function agregarABandeja(identificador, elementoOrigen = null, mostrarBurbuja = false) {
  const prendaBase = buscarPrendaPorIdONombre(identificador);
  if (!prendaBase) return;

  const resumen = calcularResumenBandeja();
  if (resumen.lleno) {
    mostrarAvisoCapacidad();
    sacudirBandejaTop();
    return;
  }

  const existente = miBandeja.find(item => item.id === prendaBase.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    miBandeja.push({
      id: prendaBase.id,
      nombre: prendaBase.nombre,
      precio: prendaBase.precio,
      cantidad: 1
    });
  }

  guardarBandeja();
  renderTablero();

  if (elementoOrigen) {
    animarVueloABandeja(elementoOrigen, prendaBase.imagen);
  } else {
    sacudirBandejaTop();
  }

  actualizarConsejoRopa(prendaBase.id, mostrarBurbuja);
}

function quitarDeBandeja(identificador) {
  const prendaBase = buscarPrendaPorIdONombre(identificador);
  const idBuscado = prendaBase ? prendaBase.id : identificador;

  const idx = miBandeja.findIndex(item => item.id === idBuscado);
  if (idx === -1) return;

  if (miBandeja[idx].cantidad > 1) {
    miBandeja[idx].cantidad -= 1;
  } else {
    miBandeja.splice(idx, 1);
  }

  guardarBandeja();
  renderTablero();
  sacudirBandejaTop();
}

function vaciarBandeja() {
  miBandeja = [];
  guardarBandeja();
  renderTablero();
  sacudirBandejaTop();
}

function mostrarAvisoCapacidad() {
  const elTotalBandeja = document.querySelector("#total-bandeja");
  if (!elTotalBandeja) return;
  elTotalBandeja.textContent = `⚠️ Bandeja llena (${CAPACIDAD_MAXIMA}/${CAPACIDAD_MAXIMA})`;
  elTotalBandeja.classList.add("limite-alcanzado");
}

// ── 6. RENDERIZAR CASILLAS VISUALES DE LA BANDEJA (12 COMPARTIMENTOS) ────
function renderCasillasVisuales() {
  const contenedorSlots = document.querySelector("#bandeja-slots-visuales");
  const contenedorMini = document.querySelector("#drawer-slots-mini");

  // Desglosar miBandeja en hasta 12 unidades individuales para las casillas
  const unidadesPlanas = [];
  miBandeja.forEach((item) => {
    const info = buscarPrendaPorIdONombre(item.id);
    const img = info?.imagen || "imagenes/polera-blanca.jpg";
    for (let k = 0; k < item.cantidad; k++) {
      if (unidadesPlanas.length < CAPACIDAD_MAXIMA) {
        unidadesPlanas.push({
          id: item.id,
          nombre: item.nombre,
          imagen: img
        });
      }
    }
  });

  if (contenedorSlots) {
    contenedorSlots.innerHTML = "";
    for (let i = 0; i < CAPACIDAD_MAXIMA; i++) {
      const unidad = unidadesPlanas[i];
      const slot = document.createElement("button");
      slot.type = "button";
      slot.className = `bandeja-slot ${unidad ? "ocupado" : "vacio"} ${i === MINIMO_MAYORISTA - 1 ? "slot-hito" : ""}`;

      if (unidad) {
        slot.dataset.accion = "quitar-slot";
        slot.dataset.id = unidad.id;
        slot.title = `${unidad.nombre} (Clic para quitar 1 de la bandeja)`;
        slot.innerHTML = `
          <img src="${unidad.imagen}" alt="${unidad.nombre}" draggable="false">
          <span class="slot-quitar-badge" aria-hidden="true">✕</span>
          ${i === MINIMO_MAYORISTA - 1 ? '<span class="slot-etiqueta-hito">-15%</span>' : ""}
        `;
      } else {
        slot.disabled = true;
        slot.title = i === MINIMO_MAYORISTA - 1
          ? "Casilla 6: ¡Al llenarla activas el 15% de descuento mayorista!"
          : `Casilla disponible #${i + 1}`;
        slot.innerHTML = `
          <span class="slot-numero">${i + 1}</span>
          ${i === MINIMO_MAYORISTA - 1 ? '<span class="slot-etiqueta-hito">-15%</span>' : ""}
        `;
      }
      contenedorSlots.appendChild(slot);
    }
  }

  // Mini indicador de 12 puntos en el drawer superior derecho
  if (contenedorMini) {
    contenedorMini.innerHTML = "";
    for (let i = 0; i < CAPACIDAD_MAXIMA; i++) {
      const punto = document.createElement("span");
      punto.className = `mini-slot ${i < unidadesPlanas.length ? "lleno" : ""} ${i === MINIMO_MAYORISTA - 1 ? "hito" : ""}`;
      contenedorMini.appendChild(punto);
    }
  }
}

// ── 7. PINTAR EL TABLERO ("Prendas de hoy" y "Mi bandeja") + DRAWER TOP ──
function renderTablero() {
  const colDisponibles = document.querySelector('[data-columna="disponibles"]');
  const colBandeja = document.querySelector('[data-columna="bandeja"]');
  if (!colDisponibles || !colBandeja) return;

  const listaDisponibles = colDisponibles.querySelector(".lista-columna");
  const listaBandeja = colBandeja.querySelector(".lista-columna");
  const totalDispEl = document.querySelector("#total-disponibles");
  const totalBandEl = document.querySelector("#total-bandeja");

  const resumen = calcularResumenBandeja();

  // Actualizar barra de progreso y casillas de la bandeja
  const barraRelleno = document.querySelector("#bandeja-barra-relleno");
  const chipProgreso = document.querySelector("#bandeja-contador-progreso");
  if (barraRelleno) {
    barraRelleno.style.width = `${resumen.porcentajeLlenado}%`;
    barraRelleno.classList.toggle("mayorista-activo", resumen.aplicaMayorista);
  }
  if (chipProgreso) {
    chipProgreso.textContent = `${resumen.ocupadas} / ${CAPACIDAD_MAXIMA} prendas`;
    chipProgreso.classList.toggle("mayorista-activo", resumen.aplicaMayorista);
  }

  renderCasillasVisuales();

  // Contadores en barra superior y widget flotante
  const contadorNav = document.querySelector("#carrito-contador");
  const contadorTop = document.querySelector("#carrito-contador-top");
  const totalTop = document.querySelector("#carrito-total-top");

  if (contadorNav) {
    contadorNav.textContent = `${resumen.ocupadas}/${CAPACIDAD_MAXIMA}`;
    contadorNav.classList.toggle("activo", resumen.ocupadas > 0);
  }
  if (contadorTop) {
    contadorTop.textContent = `${resumen.ocupadas}/${CAPACIDAD_MAXIMA}`;
  }
  if (totalTop) {
    totalTop.textContent = `Bs ${resumen.totalPagar.toFixed(2)}`;
  }

  // A) Pintar columna izquierda: "Prendas de hoy" con miniatura fotográfica y detalles
  if (listaDisponibles) {
    listaDisponibles.innerHTML = "";
    PRENDAS_DE_HOY.forEach((prenda) => {
      const li = document.createElement("li");
      li.className = "ficha ficha-disponible";
      li.draggable = !resumen.lleno;
      li.dataset.origen = "disponibles";
      li.dataset.id = prenda.id;

      li.innerHTML = `
        <div class="ficha-contenido-izq">
          <img src="${prenda.imagen}" alt="${prenda.nombre}" class="ficha-foto" draggable="false">
          <div class="ficha-textos">
            <span class="ficha-etiqueta">${prenda.nombre} · <strong>Bs ${prenda.precio.toFixed(2)}</strong></span>
            <span class="ficha-subdetalle">${prenda.detalle}</span>
          </div>
        </div>
        <button type="button" class="btn-ficha-agregar" data-accion="agregar" data-id="${prenda.id}" ${resumen.lleno ? "disabled" : ""}>
          Agregar
        </button>
      `;

      listaDisponibles.append(li);
    });
  }

  if (totalDispEl) {
    totalDispEl.textContent = `${PRENDAS_DE_HOY.length} modelos disponibles para combinar hoy`;
  }

  // B) Pintar columna derecha: "Mi bandeja" con foto, multiplicador, subtotal y botones
  if (listaBandeja) {
    listaBandeja.innerHTML = "";

    if (miBandeja.length === 0) {
      const vacio = document.createElement("li");
      vacio.className = "ficha-vacia";
      vacio.innerHTML = `
        <span class="ficha-vacia-icono" aria-hidden="true">🛍️</span>
        <strong>Tu bandeja está lista para llenarse</strong>
        <span>Arrastra aquí tus prendas favoritas o pulsa el botón «Agregar»</span>
      `;
      listaBandeja.append(vacio);
    } else {
      miBandeja.forEach((item) => {
        const info = buscarPrendaPorIdONombre(item.id);
        const img = info?.imagen || "imagenes/polera-blanca.jpg";
        const subtotalItem = item.precio * item.cantidad;

        const li = document.createElement("li");
        li.className = "ficha ficha-bandeja";
        li.draggable = true;
        li.dataset.origen = "bandeja";
        li.dataset.id = item.id;

        li.innerHTML = `
          <div class="ficha-contenido-izq">
            <img src="${img}" alt="${item.nombre}" class="ficha-foto" draggable="false">
            <div class="ficha-textos">
              <span class="ficha-etiqueta">${item.nombre} <strong class="ficha-multiplicador">× ${item.cantidad}</strong></span>
              <span class="ficha-subdetalle">Bs ${subtotalItem.toFixed(2)} (${item.precio.toFixed(2)} c/u)</span>
            </div>
          </div>
          <div class="ficha-acciones-der">
            <button type="button" class="btn-ficha-mas" data-accion="agregar" data-id="${item.id}" title="Sumar 1 unidad" ${resumen.lleno ? "disabled" : ""}>+</button>
            <button type="button" class="btn-ficha-quitar" data-accion="quitar" data-id="${item.id}">Quitar</button>
          </div>
        `;

        listaBandeja.append(li);
      });
    }
  }

  if (totalBandEl) {
    totalBandEl.classList.remove("limite-alcanzado");
    totalBandEl.textContent = `${resumen.ocupadas} de ${CAPACIDAD_MAXIMA} prendas (${resumen.restantes} libres)`;
  }

  // C) Pintar el Drawer superior derecho (#carrito-drawer-items)
  const drawerItems = document.querySelector("#carrito-drawer-items");
  const drawerUnidades = document.querySelector("#drawer-unidades");
  const drawerDescFila = document.querySelector("#drawer-descuento-fila");
  const drawerDesc = document.querySelector("#drawer-descuento");
  const drawerTotal = document.querySelector("#drawer-total");
  const drawerIrPedido = document.querySelector("#drawer-ir-pedido");

  if (drawerItems) {
    drawerItems.innerHTML = "";
    if (miBandeja.length === 0) {
      drawerItems.innerHTML = `
        <div class="drawer-vacio">
          <p>🛍️ <strong>Tu bandeja está vacía (0/12)</strong></p>
          <p>Arrastra o presiona prendas del catálogo para llenar tu bandeja.</p>
        </div>
      `;
    } else {
      miBandeja.forEach((item) => {
        const info = buscarPrendaPorIdONombre(item.id);
        const img = info?.imagen || "imagenes/polera-blanca.jpg";
        const fila = document.createElement("div");
        fila.className = "drawer-item";
        fila.innerHTML = `
          <img src="${img}" alt="${item.nombre}" class="drawer-item-img">
          <div class="drawer-item-info">
            <h4>${item.nombre} × ${item.cantidad}</h4>
            <span class="drawer-item-meta">Bs ${(item.precio * item.cantidad).toFixed(2)}</span>
          </div>
          <div class="drawer-item-qty">
            <button type="button" class="btn-qty-mini" data-accion="quitar-drawer" data-id="${item.id}" title="Quitar 1">−</button>
            <button type="button" class="btn-qty-mini" data-accion="agregar-drawer" data-id="${item.id}" title="Sumar 1" ${resumen.lleno ? "disabled" : ""}>+</button>
          </div>
        `;
        drawerItems.appendChild(fila);
      });
    }
  }
  if (drawerUnidades) drawerUnidades.textContent = `${resumen.ocupadas} de ${CAPACIDAD_MAXIMA} prendas`;
  if (drawerDescFila && drawerDesc) {
    drawerDescFila.style.display = resumen.aplicaMayorista ? "flex" : "none";
    drawerDesc.textContent = `- Bs ${resumen.ahorro.toFixed(2)}`;
  }
  if (drawerTotal) drawerTotal.textContent = `Bs ${resumen.totalPagar.toFixed(2)}`;
  if (drawerIrPedido) drawerIrPedido.disabled = miBandeja.length === 0;

  // D) Actualizar Banner y Resumen Financiero con Descuento Mayorista (15%)
  const elBanner = document.querySelector("#surtido-banner-descuento");
  const elSubtotal = document.querySelector("#surtido-subtotal");
  const elDescFila = document.querySelector("#surtido-descuento-fila");
  const elDescMonto = document.querySelector("#surtido-descuento");
  const elTotal = document.querySelector("#surtido-total");
  const btnPasarPedido = document.querySelector("#surtido-pasar-pedido");
  const btnWa = document.querySelector("#surtido-whatsapp");
  const btnVaciar = document.querySelector("#surtido-vaciar");

  if (elBanner) {
    if (resumen.ocupadas === 0) {
      elBanner.innerHTML = "💡 Lleva <strong>6 o más prendas</strong> en tu bandeja y desbloquea el <strong>15% de descuento mayorista</strong>.";
    } else if (resumen.aplicaMayorista) {
      elBanner.innerHTML = `🎉 <strong>¡Descuento mayorista del ${PORCENTAJE_MAYORISTA}% activo!</strong> Ahorras <strong>Bs ${resumen.ahorro.toFixed(2)}</strong> en tu bandeja.`;
    } else {
      const faltan = MINIMO_MAYORISTA - resumen.ocupadas;
      elBanner.innerHTML = `✨ Te ${faltan === 1 ? "falta <strong>1 prenda</strong>" : `faltan <strong>${faltan} prendas</strong>`} para activar el <strong>${PORCENTAJE_MAYORISTA}% de descuento mayorista</strong>.`;
    }
  }

  if (elSubtotal) elSubtotal.textContent = `Bs ${resumen.subtotal.toFixed(2)}`;
  if (elDescFila && elDescMonto) {
    elDescFila.style.display = resumen.aplicaMayorista ? "flex" : "none";
    elDescMonto.textContent = `- Bs ${resumen.ahorro.toFixed(2)}`;
  }
  if (elTotal) elTotal.textContent = `Bs ${resumen.totalPagar.toFixed(2)}`;

  const vacia = miBandeja.length === 0;
  if (btnPasarPedido) btnPasarPedido.disabled = vacia;
  if (btnVaciar) btnVaciar.disabled = vacia;

  if (btnWa) {
    if (vacia) {
      btnWa.classList.add("deshabilitado");
      btnWa.href = "#tablero-zona";
    } else {
      btnWa.classList.remove("deshabilitado");
      const lineas = miBandeja.map(
        i => `- ${i.nombre} × ${i.cantidad} = Bs ${(i.precio * i.cantidad).toFixed(2)}`
      );
      let textoWa = `Hola Angelica Boutique, armé mi bandeja de prendas en la web:\n\n${lineas.join("\n")}\n\nTotal prendas: ${resumen.ocupadas} de ${CAPACIDAD_MAXIMA}`;
      if (resumen.aplicaMayorista) {
        textoWa += `\nSubtotal: Bs ${resumen.subtotal.toFixed(2)}\nDescuento Mayorista (15%): -Bs ${resumen.ahorro.toFixed(2)}`;
      }
      textoWa += `\n*PRECIO TOTAL A PAGAR: Bs ${resumen.totalPagar.toFixed(2)}*`;
      btnWa.href = `https://wa.me/59170124198?text=${encodeURIComponent(textoWa)}`;
    }
  }

  dibujarGrafico();
}

// ── 8. TRANSFERIR "MI BANDEJA" AL FORMULARIO DE PEDIDO (#Pedido) ─────────
function pasarBandejaAPedido() {
  if (miBandeja.length === 0) return;

  const drawer = document.querySelector("#carrito-drawer");
  if (drawer) drawer.hidden = true;

  const resumen = calcularResumenBandeja();
  const selectProducto = document.querySelector("#producto");
  const inputCantidad = document.querySelector("#cantidad");
  const textareaNotas = document.querySelector("#notas");
  const seccionPedido = document.querySelector("#Pedido");

  if (selectProducto && miBandeja.length > 0) {
    const primera = miBandeja[0].nombre;
    let encontrada = false;
    for (let i = 0; i < selectProducto.options.length; i++) {
      if (selectProducto.options[i].value.toLowerCase() === primera.toLowerCase() ||
          selectProducto.options[i].text.toLowerCase().includes(primera.toLowerCase())) {
        selectProducto.selectedIndex = i;
        encontrada = true;
        break;
      }
    }
    if (!encontrada) {
      selectProducto.add(new Option(primera, primera, true, true));
    }
  }

  if (inputCantidad) {
    inputCantidad.value = String(resumen.ocupadas);
  }

  if (textareaNotas) {
    const desglose = miBandeja
      .map(i => `${i.nombre} × ${i.cantidad} (Bs ${(i.precio * i.cantidad).toFixed(2)})`)
      .join(" | ");
    textareaNotas.value = `Mi bandeja (${resumen.ocupadas}/${CAPACIDAD_MAXIMA} prendas): ${desglose}. Total a pagar: Bs ${resumen.totalPagar.toFixed(2)}${resumen.aplicaMayorista ? " (incluye 15% descuento mayorista)" : ""}.`;
  }

  if (seccionPedido) {
    seccionPedido.scrollIntoView({ behavior: "smooth" });
    const fieldset = seccionPedido.querySelector("fieldset");
    if (fieldset) {
      fieldset.classList.remove("pedido-resaltado");
      void fieldset.offsetWidth;
      fieldset.classList.add("pedido-resaltado");
    }
    document.querySelector("#nombre")?.focus();
  }
}

// ── 9. EVENTOS DE TABLERO, CASILLAS, CATÁLOGO Y DRAG & DROP ──────────────
const elTablero = document.querySelector("#tablero");

if (elTablero) {
  elTablero.addEventListener("click", (event) => {
    const boton = event.target.closest("button[data-accion]");
    if (!boton) return;

    const accion = boton.dataset.accion;
    const id = boton.dataset.id;

    if (accion === "agregar") {
      agregarABandeja(id, boton, false);
    } else if (accion === "quitar") {
      quitarDeBandeja(id);
    }
  });

  elTablero.addEventListener("dragstart", (event) => {
    const ficha = event.target.closest(".ficha");
    if (!ficha) return;

    event.dataTransfer.setData("text/plain", JSON.stringify({
      origen: ficha.dataset.origen,
      id: ficha.dataset.id
    }));
    event.dataTransfer.effectAllowed = "move";
    ficha.classList.add("arrastrando");
  });

  elTablero.addEventListener("dragend", (event) => {
    const ficha = event.target.closest(".ficha");
    if (ficha) ficha.classList.remove("arrastrando");
    document.querySelectorAll(".columna").forEach(c => c.classList.remove("encima"));
  });

  elTablero.addEventListener("dragover", (event) => {
    const columna = event.target.closest(".columna");
    if (!columna) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    columna.classList.add("encima");
  });

  elTablero.addEventListener("dragleave", (event) => {
    const columna = event.target.closest(".columna");
    if (columna && !columna.contains(event.relatedTarget)) {
      columna.classList.remove("encima");
    }
  });

  elTablero.addEventListener("drop", (event) => {
    const columna = event.target.closest(".columna");
    if (!columna) return;

    event.preventDefault();
    columna.classList.remove("encima");

    const destino = columna.dataset.columna;
    const raw = event.dataTransfer.getData("text/plain");
    if (!raw) return;

    try {
      const datos = JSON.parse(raw);
      if (datos.origen === "disponibles" && destino === "bandeja") {
        agregarABandeja(datos.id, null, false);
      } else if (datos.origen === "bandeja" && destino === "disponibles") {
        quitarDeBandeja(datos.id);
      } else if (datos.tipo === "prenda-catalogo" && destino === "bandeja") {
        agregarABandeja(datos.nombre, null, false);
      }
    } catch (e) {
      console.error("Error al soltar prenda en el tablero:", e);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Clic en las 12 casillas visuales para quitar una prenda con un toque
  document.querySelector("#bandeja-slots-visuales")?.addEventListener("click", (event) => {
    const slot = event.target.closest("button[data-accion='quitar-slot']");
    if (!slot) return;
    quitarDeBandeja(slot.dataset.id);
  });

  // Abrir / cerrar el Carrito de Bandeja en la esquina superior derecha
  const btnToggleDrawer = document.querySelector("#btn-toggle-drawer");
  const drawer = document.querySelector("#carrito-drawer");
  const cerrarDrawer = document.querySelector("#cerrar-drawer");
  const burbuja = document.querySelector("#carrito-burbuja-consejo");

  function alternarDrawer(forzar) {
    if (!drawer || !btnToggleDrawer) return;
    const abrir = typeof forzar === "boolean" ? forzar : drawer.hidden;
    drawer.hidden = !abrir;
    btnToggleDrawer.setAttribute("aria-expanded", String(abrir));
    if (abrir && burbuja) burbuja.hidden = true;
  }

  btnToggleDrawer?.addEventListener("click", () => alternarDrawer());
  cerrarDrawer?.addEventListener("click", () => alternarDrawer(false));
  document.querySelector("#btn-abrir-carrito-burbuja")?.addEventListener("click", () => alternarDrawer(true));
  document.querySelector("#drawer-ir-tablero")?.addEventListener("click", () => alternarDrawer(false));

  // Botones + y - dentro del drawer superior derecho
  document.querySelector("#carrito-drawer-items")?.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-accion]");
    if (!btn) return;
    if (btn.dataset.accion === "agregar-drawer") {
      agregarABandeja(btn.dataset.id, null, false);
    } else if (btn.dataset.accion === "quitar-drawer") {
      quitarDeBandeja(btn.dataset.id);
    }
  });

  // Botones de acción de Mi bandeja
  document.querySelector("#surtido-pasar-pedido")?.addEventListener("click", pasarBandejaAPedido);
  document.querySelector("#drawer-ir-pedido")?.addEventListener("click", pasarBandejaAPedido);
  document.querySelector("#surtido-vaciar")?.addEventListener("click", vaciarBandeja);

  // Botones de Consejos de Ropa
  document.querySelector("#surtido-otro-consejo")?.addEventListener("click", () => {
    const tip = CONSEJOS_GENERALES[indiceTipGeneral % CONSEJOS_GENERALES.length];
    indiceTipGeneral++;
    idSugeridoActual = tip.sugeridoId;
    actualizarConsejoRopa(tip.sugeridoId, false);
  });

  document.querySelector("#surtido-btn-sugerido")?.addEventListener("click", (e) => {
    agregarABandeja(idSugeridoActual, e.currentTarget, false);
  });

  document.querySelector("#btn-agregar-sugerido")?.addEventListener("click", (e) => {
    agregarABandeja(idSugeridoActual, e.currentTarget, true);
  });

  document.querySelector("#cerrar-burbuja")?.addEventListener("click", () => {
    if (burbuja) burbuja.hidden = true;
  });

  // Clic en "➕ Agregar a mi bandeja" o en la foto de cualquier tarjeta del catálogo
  document.addEventListener("click", (event) => {
    const btnAgregar = event.target.closest(".btn-agregar-carrito");
    if (btnAgregar) {
      const tarjeta = btnAgregar.closest(".tarjeta");
      const imgEl = tarjeta?.querySelector("img") || btnAgregar;
      const nombre = btnAgregar.dataset.nombre;
      agregarABandeja(nombre, imgEl, true);

      const textoOriginal = btnAgregar.innerHTML;
      btnAgregar.classList.add("agregado");
      btnAgregar.innerHTML = "✔ En mi bandeja";
      setTimeout(() => {
        btnAgregar.classList.remove("agregado");
        btnAgregar.innerHTML = textoOriginal;
      }, 1000);
      return;
    }

    const tarjetaProducto = event.target.closest("#lista-productos .tarjeta, #lista-remota .tarjeta");
    if (tarjetaProducto && !event.target.closest("button") && !tarjetaProducto.classList.contains("agotado")) {
      const nombre = tarjetaProducto.dataset.nombre || tarjetaProducto.querySelector("h3")?.textContent?.trim();
      const imgEl = tarjetaProducto.querySelector("img") || tarjetaProducto;
      if (nombre) {
        agregarABandeja(nombre, imgEl, true);
      }
    }
  });

  // Arrastrar una tarjeta del catálogo hacia el botón superior derecho o hacia "Mi bandeja"
  document.addEventListener("dragstart", (event) => {
    const tarjeta = event.target.closest("#lista-productos .tarjeta, #lista-remota .tarjeta");
    if (!tarjeta || tarjeta.classList.contains("agotado")) return;

    const nombre = tarjeta.dataset.nombre || tarjeta.querySelector("h3")?.textContent?.trim();
    if (!nombre) return;

    event.dataTransfer.setData("text/plain", JSON.stringify({
      tipo: "prenda-catalogo",
      nombre
    }));
    event.dataTransfer.effectAllowed = "copy";
    tarjeta.classList.add("arrastrando-prenda");
    document.body.classList.add("arrastrando-al-carrito");
  });

  document.addEventListener("dragend", (event) => {
    const tarjeta = event.target.closest(".tarjeta");
    if (tarjeta) tarjeta.classList.remove("arrastrando-prenda");
    document.body.classList.remove("arrastrando-al-carrito");
    document.querySelectorAll(".carrito-destino-activo").forEach(el => {
      el.classList.remove("carrito-destino-activo");
    });
  });

  const SELECTOR_DESTINOS_TOP = "#carrito-widget-top, #btn-toggle-drawer, #carrito-dropzone-top, #carrito-drawer, .nav-link-carrito, #bandeja-slots-visuales";

  document.addEventListener("dragover", (event) => {
    const destino = event.target.closest(SELECTOR_DESTINOS_TOP);
    if (!destino) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    destino.classList.add("carrito-destino-activo");
  });

  document.addEventListener("dragleave", (event) => {
    const destino = event.target.closest(SELECTOR_DESTINOS_TOP);
    if (destino && !destino.contains(event.relatedTarget)) {
      destino.classList.remove("carrito-destino-activo");
    }
  });

  document.addEventListener("drop", (event) => {
    const destino = event.target.closest(SELECTOR_DESTINOS_TOP);
    if (!destino) return;

    event.preventDefault();
    document.body.classList.remove("arrastrando-al-carrito");
    document.querySelectorAll(".carrito-destino-activo").forEach(el => {
      el.classList.remove("carrito-destino-activo");
    });

    const raw = event.dataTransfer.getData("text/plain");
    if (!raw) return;

    try {
      const datos = JSON.parse(raw);
      if (datos.tipo === "prenda-catalogo" && datos.nombre) {
        agregarABandeja(datos.nombre, null, true);
      } else if (datos.id) {
        agregarABandeja(datos.id, null, false);
      }
    } catch (e) {
      console.warn("Dato arrastrado no reconocido:", e);
    }
  });
});

// ── 10. CANVAS 2D: GRÁFICO DEL SURTIDO EN "MI BANDEJA" ──────────────────
const canvas = document.querySelector("#grafico");
const ctx = canvas ? canvas.getContext("2d") : null;

function dibujarGrafico() {
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const margen = 42;
  const alturaUtil = canvas.height - margen * 2;

  const estilo = getComputedStyle(document.body);
  const colorPrincipal = estilo.getPropertyValue("--color-principal").trim() || "#1e3a5f";
  const colorAcento = estilo.getPropertyValue("--color-acento").trim() || "#b85d38";
  const colorSalvia = estilo.getPropertyValue("--color-salvia").trim() || "#2e6f65";
  const colorTexto = estilo.getPropertyValue("--color-texto").trim() || "#1f2933";
  const colorSuave = estilo.getPropertyValue("--color-suave").trim() || "#64748b";
  const colorBorde = estilo.getPropertyValue("--borde").trim() || "#cbd5e1";

  const paleta = [colorAcento, colorPrincipal, colorSalvia];

  if (miBandeja.length === 0) {
    ctx.fillStyle = colorSuave;
    ctx.font = "600 15px 'Plus Jakarta Sans', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Agrega prendas a «Mi bandeja» para ver aquí el gráfico de tu surtido", canvas.width / 2, canvas.height / 2);
    return;
  }

  const maximo = Math.max(...miBandeja.map(i => i.cantidad), 4);
  const n = miBandeja.length;
  const anchoDisponible = canvas.width - margen * 2;
  const pasoX = anchoDisponible / n;
  const anchoBarra = Math.min(85, Math.max(36, pasoX * 0.58));

  ctx.beginPath();
  ctx.strokeStyle = colorBorde;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  for (let p = 0.25; p <= 1; p += 0.25) {
    const yG = canvas.height - margen - alturaUtil * p;
    ctx.moveTo(margen - 8, yG);
    ctx.lineTo(canvas.width - margen + 8, yG);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  miBandeja.forEach((item, i) => {
    const x = margen + i * pasoX + (pasoX - anchoBarra) / 2;
    const alto = (item.cantidad / maximo) * alturaUtil;
    const y = canvas.height - margen - alto;

    ctx.fillStyle = paleta[i % paleta.length];
    ctx.fillRect(x, y, anchoBarra, alto);

    const nombreCorto = item.nombre
      .replace("Polera de algodón ", "Polera ")
      .replace("Pijama conjunto ", "Pijama ");

    ctx.fillStyle = colorTexto;
    ctx.font = "600 12px 'Plus Jakarta Sans', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(nombreCorto, x + anchoBarra / 2, canvas.height - margen + 20);

    ctx.font = "700 13px 'Outfit', system-ui, sans-serif";
    ctx.fillText(`× ${item.cantidad}`, x + anchoBarra / 2, y - 7);
  });

  ctx.beginPath();
  ctx.moveTo(margen - 8, canvas.height - margen);
  ctx.lineTo(canvas.width - margen + 8, canvas.height - margen);
  ctx.strokeStyle = colorTexto;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

document.addEventListener("preferencias:cambiadas", () => {
  dibujarGrafico();
});

renderTablero();
