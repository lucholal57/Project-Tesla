import { Categoria } from "./categoria";

export interface Producto {
  id:number;
  nombre: string;
  codigo: string
  descripcion: string;
  stock: number;
  precio: number;
  precioCosto : number;
  categoria: Categoria;
}
