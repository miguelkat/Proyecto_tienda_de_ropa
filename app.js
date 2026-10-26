// ── CONFIGURACIÓN GENERAL Y METADATOS DE TIENDA ─────────────────────────
const CONFIG_TIENDA = {
  negocio: "Angelica Boutique",
  anioFundacion: 2020,
  ciudad: "La Paz, Bolivia",
  telefono: "70124198",
  whatsapp: "59170124198",
  direccion: "Av. Principal 145, zona central, La Paz - Bolivia",
  descuentoMayoristaPorcentaje: 15,
  minimoMayoristaUnidades: 6
};

// Exponer la configuración globalmente
window.CONFIG_TIENDA = CONFIG_TIENDA;

// ── ACTUALIZACIÓN DINÁMICA DE CABECERA ──────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const subtitulo = document.querySelector("header p");
  if (subtitulo && typeof productos !== "undefined") {
    const totalDisponibles = productos.filter(p => p.disponible).length;
    subtitulo.textContent = `Venta de ropa nueva por mayor y menor en la ciudad de La Paz. ¡${totalDisponibles} modelos disponibles hoy!`;
  }
});
