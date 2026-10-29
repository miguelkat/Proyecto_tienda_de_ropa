// ── 1. OBJETO LITERAL ───────────────────────────────────────────────────
// Datos base de una prenda de muestra en Angelica Boutique
const prendaDestacada = {
  id: 1,
  nombre: "Chompa de lana tejida",
  precio: 28.0,
  categoria: "lana",
  stock: 15,
  disponible: true,
  talla: "M / L",
  material: "Lana acrílica suave",
  imagen: "imagenes/chompa-lana.jpg",
  descripcion: "Ropa nueva de lana abrigada con finos acabados para el clima de La Paz."
};

console.log("Prenda destacada:", prendaDestacada.nombre);

const propiedad = "precio";
console.log("Precio por propiedad dinámica:", prendaDestacada[propiedad]);

prendaDestacada.stock = 14;
prendaDestacada.envioGratis = false;
delete prendaDestacada.envioGratis;

// ── 2. DESTRUCTURING ────────────────────────────────────────────────────
const { nombre, precio, categoria } = prendaDestacada;
console.log(`${nombre} cuesta Bs ${precio} (Categoría: ${categoria})`);

const prendaConDescuento = { ...prendaDestacada, precio: 25.0, nombre: "Chompa en liquidación" };
console.log("Copia con nuevo precio:", prendaConDescuento);

// ── 3. ARREGLO DE OBJETOS: CATÁLOGO OFICIAL CON IMÁGENES ────────────────
const productos = [
  {
    id: 1,
    nombre: "Chompa de lana tejida",
    precio: 28.0,
    categoria: "lana",
    stock: 15,
    disponible: true,
    talla: "M / L",
    colores: ["Azul", "Café", "Vino"],
    imagen: "imagenes/chompa-lana.jpg",
    descripcion: "Ropa nueva de lana abrigada, confección de primera mano."
  },
  {
    id: 2,
    nombre: "Pantalón de lana",
    precio: 35.0,
    categoria: "lana",
    stock: 18,
    disponible: true,
    talla: "S, M, L, XL",
    colores: ["Azul", "Negro", "Café", "Plomo"],
    imagen: "imagenes/pantalon-lana.jpg",
    descripcion: "Pantalón tejido de lana térmico. Tallas: S, M, L, XL. Colores: Azul, Negro, Café y Plomo."
  },
  {
    id: 3,
    nombre: "Pijama conjunto 2 piezas",
    precio: 60.0,
    categoria: "pijamas",
    stock: 12,
    disponible: true,
    talla: "Estándar / M",
    colores: ["Rosa", "Azul Pastel"],
    imagen: "imagenes/pijama-conjunto.jpg",
    descripcion: "Conjunto de 2 piezas (blusa y pantalón) en suave algodón."
  },
  {
    id: 4,
    nombre: "Pijama térmica afelpada",
    precio: 65.0,
    categoria: "pijamas",
    stock: 6,
    disponible: true,
    talla: "M / L",
    colores: ["Gris", "Azul Noche"],
    imagen: "imagenes/pijama-termica.jpg",
    descripcion: "Pijama abrigada para noche, tela polar hipoalergénica."
  },
  {
    id: 5,
    nombre: "Polera de algodón Blanca",
    precio: 30.0,
    categoria: "poleras",
    stock: 20,
    disponible: true,
    talla: "M",
    colores: ["Blanco"],
    imagen: "imagenes/polera-blanca.jpg",
    descripcion: "Polera 100% algodón peinado, suave y fresca. Talla M, color Blanco puro."
  },
  {
    id: 6,
    nombre: "Polera de algodón Kaki",
    precio: 30.0,
    categoria: "poleras",
    stock: 25,
    disponible: true,
    talla: "M, L",
    colores: ["Kaki"],
    imagen: "imagenes/polera-kaki.jpg",
    descripcion: "Polera 100% algodón resistente y fresca. Tallas M y L, color Kaki / Beige."
  },
  {
    id: 7,
    nombre: "Pantalón de lana (Edición Especial)",
    precio: 40.0,
    categoria: "lana",
    stock: 0,
    disponible: false,
    talla: "M / L",
    colores: ["Plomo Oscuro"],
    imagen: "imagenes/pantalon-lana.jpg",
    descripcion: "Pantalón de lana en reposición de stock. Disponible la próxima semana."
  },
  {
    id: 8,
    nombre: "Pijama camisón liviano",
    precio: 45.0,
    categoria: "pijamas",
    stock: 10,
    disponible: true,
    talla: "M",
    colores: ["Perla", "Lavanda"],
    imagen: "imagenes/pijama-conjunto.jpg",
    descripcion: "Pijama fresca estilo camisón de seda sintética transpirable."
  }
];

// ── 4. LOS MÉTODOS QUE IMPORTAN ─────────────────────────────────────────
productos.forEach(p => console.log(`- ${p.nombre}: Bs ${p.precio}`));

const nombresPrendas = productos.map(p => p.nombre);
console.log("Nombres de prendas:", nombresPrendas);

const disponibles = productos.filter(p => p.disponible);
console.log(`${disponibles.length} de ${productos.length} prendas disponibles`);

const masCara = productos.find(p => p.precio >= 60);
console.log("Prenda premium encontrada:", masCara);

console.log("¿Incluye 'Polera de algodón Blanca'?:", nombresPrendas.includes("Polera de algodón Blanca"));
console.log("¿Hay prendas agotadas?:", productos.some(p => p.stock === 0));
console.log("¿Todas tienen precio válido mayor a 0?:", productos.every(p => p.precio > 0));

const porPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log("Ordenadas por precio ascendente:", porPrecio.map(p => `${p.nombre} (Bs ${p.precio})`));

const valorInventario = productos.reduce((acumulador, p) => acumulador + p.precio * p.stock, 0);
console.log("Valor total del inventario: Bs", valorInventario.toFixed(2));

// ── 5. ENCADENAR MÉTODOS ────────────────────────────────────────────────
const nombresLanaDisponibles = productos
  .filter(p => p.categoria === "lana" && p.disponible)
  .map(p => p.nombre);
console.log("Prendas de lana disponibles:", nombresLanaDisponibles);

const totalLanaEnStock = productos
  .filter(p => p.categoria === "lana" && p.disponible)
  .reduce((total, p) => total + p.precio * p.stock, 0);
console.log("Total valor lana en stock: Bs", totalLanaEnStock.toFixed(2));

const porCategoria = productos.reduce((grupos, p) => {
  if (!grupos[p.categoria]) grupos[p.categoria] = [];
  grupos[p.categoria].push(p.nombre);
  return grupos;
}, {});
console.log("Prendas agrupadas por categoría:", porCategoria);

// ── 6. CLASES ───────────────────────────────────────────────────────────
class Producto {
  constructor(nombre, precio, stock, categoria = "general", imagen = "", talla = "", colores = []) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
    this.imagen = imagen;
    this.talla = talla;
    this.colores = colores;
  }

  estaDisponible() {
    return this.stock > 0;
  }

  valorEnStock() {
    return this.precio * this.stock;
  }
}

const muestraPolera = new Producto("Polera de algodón Kaki", 30.0, 25, "poleras", "imagenes/polera-kaki.jpg", "M, L", ["Kaki"]);
console.log(muestraPolera.nombre, "¿Disponible?:", muestraPolera.estaDisponible(), "Valor:", muestraPolera.valorEnStock());

class ProductoConDescuento extends Producto {
  constructor(nombre, precio, stock, categoria, descuentoPorcentaje, imagen = "", talla = "", colores = []) {
    super(nombre, precio, stock, categoria, imagen, talla, colores);
    this.descuentoPorcentaje = descuentoPorcentaje;
  }

  precioFinal() {
    return this.precio * (1 - this.descuentoPorcentaje / 100);
  }
}

const promocionPrimavera = new ProductoConDescuento("2x1 en pantalones de lana", 56.0, 10, "lana", 20, "imagenes/pantalon-lana.jpg", "S, M, L, XL", ["Azul", "Negro", "Café", "Plomo"]);
console.log(
  `Promoción: ${promocionPrimavera.nombre} | Precio oferta: Bs ${promocionPrimavera.precioFinal().toFixed(2)} | Stock: ${promocionPrimavera.stock}`
);
