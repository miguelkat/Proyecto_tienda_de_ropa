// ── 1. PRENDA DESTACADA DE LA TIENDA ────────────────────────────────────
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

// ── 2. CATÁLOGO OFICIAL DE PRENDAS CON IMÁGENES ─────────────────────────
const productos = [
  {
    id: 1,
    nombre: "Chompa de lana tejida",
    precio: 28.0,
    categoria: "lana",
    stock: 15,
    disponible: true,
    imagen: "imagenes/chompa-lana.jpg",
    descripcion: "Ropa nueva de lana abrigada, confección de primera mano."
  },
  {
    id: 2,
    nombre: "Pantalón tejido de lana",
    precio: 35.0,
    categoria: "lana",
    stock: 8,
    disponible: true,
    imagen: "imagenes/pantalon-lana.jpg",
    descripcion: "Pantalón abrigado de tejido de lana suave, ideal para temporada de frío."
  },
  {
    id: 3,
    nombre: "Pijama conjunto 2 piezas",
    precio: 60.0,
    categoria: "pijamas",
    stock: 12,
    disponible: true,
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
    imagen: "imagenes/pijama-conjunto.jpg",
    descripcion: "Pijama abrigada para noche, tela polar hipoalergénica."
  },
  {
    id: 5,
    nombre: "Polera diseño primavera",
    precio: 30.0,
    categoria: "poleras",
    stock: 25,
    disponible: true,
    imagen: "imagenes/polera-estampada.jpg",
    descripcion: "Poleras de diferentes diseños y modelos modernos de temporada."
  },
  {
    id: 6,
    nombre: "Polera básica algodón",
    precio: 25.0,
    categoria: "poleras",
    stock: 30,
    disponible: true,
    imagen: "imagenes/polera-estampada.jpg",
    descripcion: "Polera de corte unisex, 100% algodón fresco y resistente."
  },
  {
    id: 7,
    nombre: "Buso térmico de lana",
    precio: 40.0,
    categoria: "lana",
    stock: 10,
    disponible: true,
    imagen: "imagenes/buso-lana.jpg",
    descripcion: "Buso de lana abrigada y resistente, perfecto para el frío andino."
  },
  {
    id: 8,
    nombre: "Pijama camisón liviano",
    precio: 45.0,
    categoria: "pijamas",
    stock: 10,
    disponible: true,
    imagen: "imagenes/pijama-conjunto.jpg",
    descripcion: "Pijama fresca estilo camisón de seda sintética transpirable."
  }
];

// ── 3. CLASES ES6 PARA EL MODELO DE DATOS ───────────────────────────────
class Producto {
  constructor(nombre, precio, stock, categoria = "general", imagen = "") {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
    this.imagen = imagen;
  }

  estaDisponible() {
    return this.stock > 0;
  }

  valorEnStock() {
    return this.precio * this.stock;
  }
}

class ProductoConDescuento extends Producto {
  constructor(nombre, precio, stock, categoria, descuentoPorcentaje, imagen = "") {
    super(nombre, precio, stock, categoria, imagen);
    this.descuentoPorcentaje = descuentoPorcentaje;
  }

  precioFinal() {
    return this.precio * (1 - this.descuentoPorcentaje / 100);
  }
}

// ── 4. MÉTODOS DE BÚSQUEDA Y CONSULTA ────────────────────────────────────
function obtenerProductoPorNombre(nombre) {
  if (!nombre) return null;
  const busqueda = nombre.trim().toLowerCase();
  return productos.find(p => p.nombre.toLowerCase() === busqueda) ||
         productos.find(p => p.nombre.toLowerCase().includes(busqueda));
}

// Exponer en el ámbito global
window.prendaDestacada = prendaDestacada;
window.productos = productos;
window.Producto = Producto;
window.ProductoConDescuento = ProductoConDescuento;
window.obtenerProductoPorNombre = obtenerProductoPorNombre;
