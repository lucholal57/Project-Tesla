import { Producto } from "./producto";

export interface Venta {

  fecha: string; // Fecha en formato ISO
  descripcion: string; // Descripción de la venta
  detalles: ProductoVenta[]; // Lista de productos con su cantidad
  metodoPago: string; // Método de pago utilizado
  total: number; // Total

}

// Entidad auxiliar para productos dentro de una venta
export interface ProductoVenta {
  cantidad: number;  // Cantidad del producto vendido
  productoId: number;// ID del producto
  producto: Producto
}
