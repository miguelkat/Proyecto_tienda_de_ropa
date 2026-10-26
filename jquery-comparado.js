// ── 1. COMPROBAR QUE CARGÓ JQUERY ───────────────────────────────────────
if (typeof $ !== "undefined") {
  console.log("jQuery versión:", $.fn.jquery);
}

// ── 2. COMPARATIVA VANILLA JS VS JQUERY ──────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const vanillaP = document.querySelector("#salida-vanilla");
  const jqueryP = $("#salida-jquery");

  if (vanillaP && jqueryP.length) {
    console.log("vanilla es un elemento:", vanillaP instanceof HTMLElement);
    console.log("jQuery es una colección de", jqueryP.length);
    console.log("mismo elemento:", $(vanillaP)[0] === vanillaP);

    // ── 4. LEER Y ESCRIBIR CONTENIDO ────────────────────────────────────
    vanillaP.textContent = "Cambiado con vanilla: document.querySelector + textContent";
    jqueryP.text("Cambiado con jQuery: $() + .text()");

    // ── 6. EVENTOS ──────────────────────────────────────────────────────
    const botonVanilla = document.querySelector("#boton-vanilla");
    if (botonVanilla) {
      botonVanilla.addEventListener("click", () => {
        vanillaP.classList.toggle("resaltado");
      });
    }

    $("#boton-jquery").on("click", function () {
      $(this).closest("section").find("#salida-jquery").toggleClass("resaltado");
    });

    // ── 7. CHAINING ─────────────────────────────────────────────────────
    $("#salida-jquery")
      .addClass("destacado")
      .attr("data-origen", "jquery")
      .css("cursor", "pointer");

    vanillaP.classList.add("destacado");
    vanillaP.setAttribute("data-origen", "vanilla");
    vanillaP.style.cursor = "pointer";
  }

  // ── 8. COMPARACIÓN DE TARJETAS EN EL DOM ──────────────────────────────
  console.log("Tarjetas que ve jQuery:", $(".tarjeta").length);
  console.log("Tarjetas que ve vanilla:", document.querySelectorAll(".tarjeta").length);
});
