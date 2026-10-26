// ── 1. COERCIÓN ─────────────────────────────────────────────────────────
console.log("5" + 3);  // "53" (concatenación)
console.log("5" - 3);  // 2 (coerción numérica)
console.log(Number("5") + 3); // 8

// ── 2. VALORES FALSY ────────────────────────────────────────────────────
console.log(Boolean(0), Boolean(""), Boolean("0"), Boolean([]));

// ── 3. CONTROL DE FLUJO ─────────────────────────────────────────────────
let stockPrendas = 15;

if (stockPrendas > 0) {
  console.log("Hay stock disponible en tienda");
} else {
  console.log("Prenda agotada");
}

const estado = stockPrendas > 0 ? "Disponible" : "Agotado";
console.log("Estado de stock:", estado);

const preciosPrendas = [28.0, 35.0, 60.0];
for (const precio of preciosPrendas) {
  console.log("Precio unitario:", precio);
}

// ── 4. FUNCIONES: tres formas de sintaxis ────────────────────────────────
function totalDeclarada(precio, cantidad) {
  return precio * cantidad;
}

const totalExpresion = function (precio, cantidad) {
  return precio * cantidad;
};

const calcularTotal = (precio, cantidad) => precio * cantidad;

console.log(
  "Total función declarada:", totalDeclarada(28, 3),
  "| Por expresión:", totalExpresion(28, 3),
  "| Arrow function:", calcularTotal(28, 3)
);

// ── 5. FUNCIONES FLECHA (ARROW) ─────────────────────────────────────────
const doblePrenda = (n) => n * 2;

const aplicarDescuento = (total, porcentaje) => {
  const descuento = total * (porcentaje / 100);
  return total - descuento;
};

// Impuesto en compras comerciales (13% IVA en Bolivia)
const conImpuesto = (monto, tasa = 13) => monto * (1 + tasa / 100);

console.log("Precio con 20% desc en Bs 100:", aplicarDescuento(100, 20));
console.log("Precio final con IVA:", conImpuesto(100).toFixed(2));

// ── 6. FUNCIONES DE ORDEN SUPERIOR ──────────────────────────────────────
const operacionPedido = calcularTotal;
console.log("Cálculo con variable de función:", operacionPedido(30, 4));

function aplicarATodos(lista, fn) {
  const salida = [];
  for (const elemento of lista) {
    salida.push(fn(elemento));
  }
  return salida;
}

console.log("Precios duplicados:", aplicarATodos(preciosPrendas, doblePrenda));
console.log("Precios con formato moneda:", aplicarATodos(preciosPrendas, p => `Bs ${p.toFixed(2)}`));

// ── 7. SCOPE Y CLOSURES (CONTADORES DE TIENDA) ──────────────────────────
function crearContadorVentas(nombreProducto) {
  let cuenta = 0;
  return () => {
    cuenta = cuenta + 1;
    return `${cuenta} unidad(es) vendida(s) de ${nombreProducto}`;
  };
}

const ventaChompas = crearContadorVentas("Chompas de lana");
console.log(ventaChompas());
console.log(ventaChompas());
console.log(ventaChompas());

const ventaPijamas = crearContadorVentas("Pijamas de 2 piezas");
console.log(ventaPijamas());
