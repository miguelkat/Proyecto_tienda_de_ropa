/* ═════════════════════════════════════════════════════════════════════════
   ANGELICA BOUTIQUE – Día 13: Almacenamiento Web y Geolocalización
   (preferencias.js)

   Este módulo administra las preferencias persistentes del usuario mediante
   localStorage (tema claro/oscuro y criterio de ordenamiento del catálogo)
   y calcula la distancia en tiempo real hacia la tienda en La Paz usando
   la API de Geolocalización del navegador y la fórmula de Haversine.
   ═════════════════════════════════════════════════════════════════════════ */

// ── 1. localStorage Y sessionStorage ────────────────────────────────────
// localStorage guarda pares clave/valor como TEXTO y persiste aunque se
// cierre el navegador. sessionStorage solo dura mientras la pestaña esté abierta.
const CLAVE = "angelica-boutique:preferencias";

const PREFERENCIAS_POR_DEFECTO = { tema: "claro", orden: "nombre" };

// ── 2. LEER Y GUARDAR CON try/catch ─────────────────────────────────────
// JSON.parse puede fallar si alguien editó localStorage manualmente, y
// setItem puede fallar en modo incógnito restringido o con cuota llena.
function leerPreferencias() {
  try {
    const texto = localStorage.getItem(CLAVE);
    if (!texto) return { ...PREFERENCIAS_POR_DEFECTO };

    const guardado = JSON.parse(texto);

    return { ...PREFERENCIAS_POR_DEFECTO, ...guardado };
  } catch (error) {
    console.warn("Preferencias corruptas, se usan las por defecto:", error.message);
    return { ...PREFERENCIAS_POR_DEFECTO };
  }
}

function guardarPreferencias(prefs) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.warn("No se pudo guardar:", error.message);
    return false;
  }
}

// ── 3. APLICAR LO GUARDADO AL CARGAR ────────────────────────────────────
let preferencias = leerPreferencias();

const ETIQUETAS_ORDEN = {
  "nombre": "nombre (A-Z)",
  "precio-asc": "menor precio",
  "precio-desc": "mayor precio",
  "stock": "mayor disponibilidad"
};

function aplicarPreferencias() {
  const esOscuro = preferencias.tema === "oscuro";
  document.body.classList.toggle("tema-oscuro", esOscuro);

  const boton = document.querySelector("#tema-toggle");
  if (boton) {
    boton.setAttribute("aria-pressed", String(esOscuro));
    boton.textContent = esOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
  }

  const selectOrden = document.querySelector("#orden");
  if (selectOrden) {
    selectOrden.value = preferencias.orden;
  }

  const estadoPrefs = document.querySelector("#estado-prefs");
  if (estadoPrefs) {
    const etiquetaOrden = ETIQUETAS_ORDEN[preferencias.orden] || preferencias.orden;
    estadoPrefs.textContent = `Tema ${preferencias.tema} activo · Catálogo ordenado por ${etiquetaOrden}.`;
  }

  // Sincronizar con el catálogo interactivo (eventos.js)
  document.dispatchEvent(new CustomEvent("preferencias:cambiadas", { detail: preferencias }));
}

// Aplicar de inmediato para evitar destellos y reaplicar cuando el DOM esté listo
aplicarPreferencias();
document.addEventListener("DOMContentLoaded", aplicarPreferencias);

// ── 4. GUARDAR AL CAMBIAR ───────────────────────────────────────────────
function iniciarControlesPreferencias() {
  document.querySelector("#tema-toggle")?.addEventListener("click", () => {
    preferencias.tema = preferencias.tema === "oscuro" ? "claro" : "oscuro";
    guardarPreferencias(preferencias);
    aplicarPreferencias();
  });

  document.querySelector("#orden")?.addEventListener("change", (event) => {
    preferencias.orden = event.target.value;
    guardarPreferencias(preferencias);
    aplicarPreferencias();
  });

  document.querySelector("#olvidar")?.addEventListener("click", () => {
    localStorage.removeItem(CLAVE);
    preferencias = { ...PREFERENCIAS_POR_DEFECTO };
    guardarPreferencias(preferencias);
    aplicarPreferencias();
    const estadoPrefs = document.querySelector("#estado-prefs");
    if (estadoPrefs) {
      estadoPrefs.textContent = "Preferencias restablecidas a los valores por defecto.";
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarControlesPreferencias);
} else {
  iniciarControlesPreferencias();
}

// ── 5. LO QUE NUNCA VA EN localStorage ──────────────────────────────────
// Nunca guardar contraseñas, tokens de sesión sensibles, números de tarjeta
// ni datos personales privados (CI, dirección particular o teléfono del cliente),
// ya que cualquier script en la página puede leer localStorage.

// ── 6. GEOLOCATION Y DISTANCIA EN VIVO ──────────────────────────────────
// Coordenadas exactas de Angelica Boutique obtenidas de Google Maps:
// Enlace Maps: https://maps.app.goo.gl/zS3h2XczvwezXcsA6
const LOCAL = {
  lat: -16.5331297,
  lng: -68.1867331,
  nombre: "Angelica Boutique",
  direccion: "Av. Principal 145, La Paz",
  mapsUrl: "https://maps.app.goo.gl/zS3h2XczvwezXcsA6"
};

/**
 * Fórmula de Haversine: Calcula la distancia ortodrómica sobre la esfera terrestre
 * @param {number} lat1 Latitud punto 1
 * @param {number} lng1 Longitud punto 1
 * @param {number} lat2 Latitud punto 2
 * @param {number} lng2 Longitud punto 2
 * @returns {number} Distancia en kilómetros
 */
function distanciaKm(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radio medio de la Tierra en kilómetros
  const aRad = (g) => (g * Math.PI) / 180;
  const dLat = aRad(lat2 - lat1);
  const dLng = aRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(aRad(lat1)) * Math.cos(aRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Estima el tiempo de viaje considerando el tráfico y geografía paceña
 * @param {number} km Distancia en km
 * @param {number} velocidadKmh Velocidad estimada en km/h
 * @returns {string} Tiempo formateado legible
 */
function estimarTiempo(km, velocidadKmh) {
  const minutosTotales = Math.round((km / velocidadKmh) * 60);
  if (minutosTotales < 1) return "Menos de 1 min";
  if (minutosTotales < 60) return `~${minutosTotales} min`;
  const horas = Math.floor(minutosTotales / 60);
  const mins = minutosTotales % 60;
  return mins > 0 ? `~${horas} h ${mins} min` : `~${horas} h`;
}

// Configuración de eventos de Geolocalización
function iniciarGeolocalizacion() {
  const $btnUbicarme = document.querySelector("#ubicarme");
  const $ubic = document.querySelector("#estado-ubicacion");
  const $btnRuta = document.querySelector("#ver-ruta");
  const $panelDistancia = document.querySelector("#panel-distancia");
  const $distanciaKm = document.querySelector("#distancia-km");
  const $distanciaUnidad = document.querySelector("#distancia-unidad");
  const $distanciaTitulo = document.querySelector("#distancia-titulo");
  const $distanciaDescripcion = document.querySelector("#distancia-descripcion");
  const $tiempoCaminando = document.querySelector("#tiempo-caminando");
  const $tiempoAuto = document.querySelector("#tiempo-auto");
  const $precisionGps = document.querySelector("#precision-gps");
  const $coordUsuario = document.querySelector("#coord-usuario");

  if (!$btnUbicarme) return;

  $btnUbicarme.addEventListener("click", () => {
    if (!$ubic) return;

    if (!navigator.geolocation) {
      $ubic.textContent = "❌ Tu navegador o dispositivo no cuenta con soporte para la API de Geolocalización.";
      $ubic.className = "error";
      return;
    }

    $ubic.textContent = "🛰️ Solicitando permiso y obteniendo coordenadas GPS en tiempo real...";
    $ubic.className = "cargando";
    $btnUbicarme.disabled = true;
    $btnUbicarme.classList.add("btn-cargando");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        $btnUbicarme.disabled = false;
        $btnUbicarme.classList.remove("btn-cargando");

        const { latitude, longitude, accuracy } = position.coords;
        const km = distanciaKm(latitude, longitude, LOCAL.lat, LOCAL.lng);

        if ($panelDistancia) {
          $panelDistancia.style.display = "block";
        }

        if (km < 1) {
          const metros = Math.round(km * 1000);
          if ($distanciaKm) $distanciaKm.textContent = metros;
          if ($distanciaUnidad) $distanciaUnidad.textContent = "metros";
          if ($distanciaTitulo) $distanciaTitulo.textContent = "¡Estás muy cerca de la tienda!";
          if ($distanciaDescripcion) {
            $distanciaDescripcion.textContent = `Te encuentras a solo unas cuadras de ${LOCAL.nombre}. ¡Visítanos para probarte la ropa en nuestros vestidores!`;
          }
        } else {
          if ($distanciaKm) $distanciaKm.textContent = km.toFixed(2);
          if ($distanciaUnidad) $distanciaUnidad.textContent = "km";
          if ($distanciaTitulo) $distanciaTitulo.textContent = `A ${km.toFixed(1)} km de distancia`;
          if ($distanciaDescripcion) {
            $distanciaDescripcion.textContent = `Calculado desde tu posición actual en línea recta hasta ${LOCAL.nombre} (${LOCAL.direccion}).`;
          }
        }

        if ($tiempoCaminando) $tiempoCaminando.textContent = estimarTiempo(km, 4.5);
        if ($tiempoAuto) $tiempoAuto.textContent = estimarTiempo(km, 22);
        if ($precisionGps) $precisionGps.textContent = `±${Math.round(accuracy)} m`;
        if ($coordUsuario) $coordUsuario.textContent = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

        if ($btnRuta) {
          $btnRuta.href = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${LOCAL.lat},${LOCAL.lng}&travelmode=driving`;
          $btnRuta.style.display = "inline-flex";
        }

        $ubic.innerHTML = `✅ <strong>¡Ubicación calculada con éxito!</strong> Distancia actual: <strong>${km < 1 ? Math.round(km * 1000) + ' m' : km.toFixed(2) + ' km'}</strong> hacia nuestra boutique.`;
        $ubic.className = "ok";
      },
      (error) => {
        $btnUbicarme.disabled = false;
        $btnUbicarme.classList.remove("btn-cargando");

        const mensajes = {
          [error.PERMISSION_DENIED]:
            "⚠️ Permiso denegado: Por favor habilita el permiso de ubicación en tu navegador para calcular la distancia automáticamente.",
          [error.POSITION_UNAVAILABLE]:
            "⚠️ Ubicación no disponible: No pudimos recibir señal GPS. Comprueba tu conexión a internet o intenta al aire libre.",
          [error.TIMEOUT]:
            "⚠️ Tiempo de espera agotado: La solicitud tardó demasiado en responder. Por favor presiona el botón nuevamente.",
        };

        $ubic.textContent = mensajes[error.code] || "⚠️ Ocurrió un inconveniente al consultar tu ubicación.";
        $ubic.className = "error";
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 30000,
      }
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarGeolocalizacion);
} else {
  iniciarGeolocalizacion();
}
