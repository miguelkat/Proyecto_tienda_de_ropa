// ── 1. COMPROBAR DISPONIBILIDAD DE JQUERY ───────────────────────────────
if (typeof $ !== "undefined") {
  console.log("jQuery activo:", $.fn.jquery);
}

// ── 2. INTERACTIVIDAD EN SECCIÓN DE GARANTÍA Y COMPROMISO ────────────────
document.addEventListener("DOMContentLoaded", () => {
  const vanillaP = document.querySelector("#salida-vanilla");
  const jqueryP = $("#salida-jquery");

  if (vanillaP && jqueryP.length) {
    const textoOriginalVanilla = vanillaP.textContent;
    const textoOriginalJquery = jqueryP.text();

    // Botón 1: Interacción con Vanilla JS
    const botonVanilla = document.querySelector("#boton-vanilla");
    if (botonVanilla) {
      botonVanilla.addEventListener("click", () => {
        vanillaP.classList.toggle("resaltado");
        if (vanillaP.classList.contains("resaltado")) {
          vanillaP.textContent = "⭐ ¡Prendas seleccionadas! Costuras reforzadas, acabado suave y máxima durabilidad térmica.";
          botonVanilla.textContent = "✔ Beneficio activado";
        } else {
          vanillaP.textContent = textoOriginalVanilla;
          botonVanilla.textContent = "✨ Destacar beneficio";
        }
      });
    }

    // Botón 2: Interacción con jQuery
    $("#boton-jquery").on("click", function () {
      const $parrafo = $("#salida-jquery");
      $parrafo.toggleClass("resaltado");

      if ($parrafo.hasClass("resaltado")) {
        $parrafo.text("🔥 Descuento por mayor aplicado: 15% menos al llevar 6 o más prendas para comerciantes y familias.");
        $(this).text("✔ Condiciones activas");
      } else {
        $parrafo.text(textoOriginalJquery);
        $(this).text("🏷️ Ver condiciones");
      }
    });
  }
});
