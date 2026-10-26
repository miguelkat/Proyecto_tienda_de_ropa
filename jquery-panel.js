/* ═════════════════════════════════════════════════════════════════════════
   DEMO DEL DÍA 11 - jQuery: eventos, efectos y funciones
   Adaptado para Angelica Boutique: menú móvil, acordeón y avisos de temporada.
   ═════════════════════════════════════════════════════════════════════════ */

$(function () {
  // ── 1. .on() ES LA FORMA ÚNICA ──────────────────────────────────────────
  // Menú móvil desplegable con slideToggle
  $("#menu-toggle").on("click", function () {
    const $menu = $("#menu-movil");

    // slideToggle: si está oculto lo despliega, si está visible lo pliega (200ms)
    $menu.slideToggle(200);

    // Reflejar el estado accesible en aria-expanded
    const abierto = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", !abierto);
  });

  // ── 2. DELEGACIÓN DE EVENTOS EN ACORDEÓN ─────────────────────────────────
  // Despliegue de preguntas y políticas de tienda con animación controlada
  $("#acordeon").on("click", ".titulo", function () {
    const $titulo = $(this);
    const $cuerpo = $titulo.next(".cuerpo"); // el hermano siguiente

    // .stop(true, true) vacía la cola de animaciones para evitar acumulaciones
    $cuerpo.stop(true, true).slideToggle(200);

    const expandido = $titulo.attr("aria-expanded") === "true";
    $titulo.attr("aria-expanded", !expandido);

    // Acordeón exclusivo: cerrar los demás paneles abiertos
    $("#acordeon .cuerpo").not($cuerpo).stop(true, true).slideUp(200);
    $("#acordeon .titulo").not($titulo).attr("aria-expanded", "false");
  });

  // ── 3. EFECTOS ESCALONADOS CON .each() Y .delay() ──────────────────────
  // Mostrar avisos y ofertas de temporada de a poco
  $("#mostrar-avisos").on("click", function () {
    const $boton = $(this);

    if ($boton.data("estado") === "visible") {
      // Si ya están visibles, ocultarlos
      $("#avisos li").stop(true, true).fadeOut(200);
      $boton.text("Ver avisos de temporada").data("estado", "oculto");
    } else {
      // Si están ocultos, mostrarlos de forma escalonada
      $("#avisos li").each(function (indice) {
        $(this).stop(true, true).delay(indice * 120).fadeIn(250);
      });
      $boton.text("Ocultar avisos de temporada").data("estado", "visible");
    }
  });

  // ── 4. FUNCIÓN PROPIA QUE DEVUELVE LA SELECCIÓN (CHAINING) ──────────────
  function resaltar($seleccion, milisegundos = 1400) {
    $seleccion.addClass("resaltado");
    setTimeout(() => $seleccion.removeClass("resaltado"), milisegundos);
    return $seleccion; // devolver la selección para permitir encadenamiento
  }

  // Ejemplo de encadenamiento aplicado a la cabecera de panel
  resaltar($("#panel h2")).css("letter-spacing", "0.5px");
});
