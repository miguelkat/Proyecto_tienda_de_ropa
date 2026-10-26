// ── FUNCIONES UTILITARIAS Y DE CÁLCULO COMERCIAL ─────────────────────────

/**
 * Calcula el subtotal multiplicando precio unitario por cantidad
 */
function calcularTotal(precio, cantidad) {
  const p = Number(precio) || 0;
  const c = Number(cantidad) || 0;
  return p * c;
}

/**
 * Aplica un porcentaje de descuento a un monto dado
 */
function aplicarDescuento(total, porcentaje) {
  const t = Number(total) || 0;
  const p = Number(porcentaje) || 0;
  const montoDescuento = t * (p / 100);
  return Math.max(0, t - montoDescuento);
}

/**
 * Aplica descuento por compra mayorista (15% a partir de 6 unidades)
 */
function calcularDescuentoMayorista(cantidad, subtotal) {
  const cant = Number(cantidad) || 0;
  const sub = Number(subtotal) || 0;
  const minUnidades = (window.CONFIG_TIENDA && window.CONFIG_TIENDA.minimoMayoristaUnidades) || 6;
  const porcentaje = (window.CONFIG_TIENDA && window.CONFIG_TIENDA.descuentoMayoristaPorcentaje) || 15;

  if (cant >= minUnidades) {
    const ahorro = sub * (porcentaje / 100);
    return {
      aplica: true,
      porcentaje,
      ahorro,
      totalConDescuento: sub - ahorro
    };
  }

  return {
    aplica: false,
    porcentaje: 0,
    ahorro: 0,
    totalConDescuento: sub
  };
}

/**
 * Formato estándar de moneda para Bolivia (Bs XX.XX)
 */
function formatearMoneda(monto) {
  const m = Number(monto) || 0;
  return `Bs ${m.toFixed(2)}`;
}

/**
 * Cálculo de precio con impuesto (13% IVA oficial de Bolivia)
 */
function conImpuesto(monto, tasa = 13) {
  return Number(monto) * (1 + tasa / 100);
}

/**
 * Construye el mensaje preformateado y enlace a la API de WhatsApp
 */
function generarEnlaceWhatsApp({ nombre, telefono, producto, cantidad, subtotal, total, fecha, notas }) {
  const numeroTienda = (window.CONFIG_TIENDA && window.CONFIG_TIENDA.whatsapp) || "59170124198";
  
  const mensaje = [
    `🛍️ *NUEVO PEDIDO - ANGELICA BOUTIQUE*`,
    `──────────────────────────`,
    `👤 *Cliente:* ${nombre || "No especificado"}`,
    `📞 *Teléfono:* ${telefono || "No especificado"}`,
    `👗 *Prenda:* ${producto}`,
    `📦 *Cantidad:* ${cantidad} unidad(es)`,
    `💰 *Total estimado:* ${formatearMoneda(total)}`,
    `📅 *Fecha de entrega/recojo:* ${fecha || "A coordinar"}`,
    notas ? `📝 *Detalles/Tallas:* ${notas}` : "",
    `──────────────────────────`,
    `_Enviado desde el catálogo web de Angelica Boutique_`
  ].filter(Boolean).join("\n");

  return `https://wa.me/${numeroTienda}?text=${encodeURIComponent(mensaje)}`;
}

// Exponer funciones utilitarias en el ámbito global
window.calcularTotal = calcularTotal;
window.aplicarDescuento = aplicarDescuento;
window.calcularDescuentoMayorista = calcularDescuentoMayorista;
window.formatearMoneda = formatearMoneda;
window.conImpuesto = conImpuesto;
window.generarEnlaceWhatsApp = generarEnlaceWhatsApp;
