/* ═════════════════════════════════════════════════════════════════════════
   COMPONENTES INTERACTIVOS JQUERY - ANGELICA BOUTIQUE
   Menú móvil accesible, acordeón de preguntas y efectos interactivos
   ═════════════════════════════════════════════════════════════════════════ */

$(function () {
  // ── 1. MENÚ MÓVIL ACCESIBLE ─────────────────────────────────────────────
  $("#menu-toggle").on("click", function () {
    const $menu = $("#menu-movil");
    $menu.stop(true, true).slideToggle(250);

    const abierto = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", !abierto);
  });

  // Cerrar el menú móvil automáticamente al hacer clic en cualquier enlace
  $("#menu-movil a").on("click", function () {
    $("#menu-movil").slideUp(200);
    $("#menu-toggle").attr("aria-expanded", "false");
  });

  // ── 2. ACORDEÓN DE PREGUNTAS FRECUENTES ─────────────────────────────────
  $("#acordeon").on("click", ".titulo", function () {
    const $titulo = $(this);
    const $cuerpo = $titulo.next(".cuerpo");

    $cuerpo.stop(true, true).slideToggle(250);

    const expandido = $titulo.attr("aria-expanded") === "true";
    $titulo.attr("aria-expanded", !expandido);

    // Acordeón exclusivo: plegar las demás preguntas
    $("#acordeon .cuerpo").not($cuerpo).stop(true, true).slideUp(200);
    $("#acordeon .titulo").not($titulo).attr("aria-expanded", "false");
  });

  // ── 3. FUNCIÓN ENCADENABLE DE RESALTADO VISUAL ──────────────────────────
  function resaltar($seleccion, milisegundos = 1500) {
    $seleccion.addClass("resaltado");
    setTimeout(() => $seleccion.removeClass("resaltado"), milisegundos);
    return $seleccion;
  }

  window.resaltar = resaltar;
});
