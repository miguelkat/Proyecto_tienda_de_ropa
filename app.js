// ── 1. CONSTANTES ───────────────────────────────────────────────────────
const negocio = "Angelica Boutique";
const anioFundacion = 2020;
const ciudad = "La Paz, Bolivia";

// ── 2. VARIABLES ────────────────────────────────────────────────────────
let prendasEnVitrina = 45;
prendasEnVitrina = 40; // Se actualiza conforme a las ventas del día

// ── 3. TIPOS DE DATOS ───────────────────────────────────────────────────
const precioPromedio = 35.0;
const abiertoHoy = true;
const promocionDelDia = "2x1 en busos de lana por temporada";
let telefonoContacto = "70124198";

console.log("Tipos:", typeof negocio, typeof precioPromedio, typeof abiertoHoy);
console.log("Promoción activa:", promocionDelDia, "| Teléfono:", telefonoContacto);

// ── 4. TEMPLATE LITERAL ─────────────────────────────────────────────────
const resumen = `${negocio} (La Paz) fue establecida en ${anioFundacion}. Actualmente cuenta con ${prendasEnVitrina} prendas listas en vitrina.`;
console.log(resumen);

// ── 5. COMPARACIÓN ──────────────────────────────────────────────────────
console.log("35" == precioPromedio);   // true (coerción implícita)
console.log("35" === precioPromedio);  // false (comparación estricta de tipo y valor)

// ── 6. INTERACCIÓN CON EL DOM ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const subtitulo = document.querySelector("header p");
  if (subtitulo) {
    subtitulo.textContent = `Venta de ropa nueva por mayor y menor en la ciudad de La Paz. ¡${prendasEnVitrina} prendas disponibles hoy!`;
  }
});
