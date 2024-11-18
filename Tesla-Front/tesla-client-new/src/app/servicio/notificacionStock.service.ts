import { Injectable } from '@angular/core';
import { ProductoService } from './producto.service';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../entidad/producto';

@Injectable({
  providedIn: 'root'
})
export class NotificacionStockService {

  private stockBajoSubject = new BehaviorSubject<number>(0);  // Contador de productos bajo stock
  stockBajo$ = this.stockBajoSubject.asObservable();

  constructor(private productoService: ProductoService) {}

  // Método para actualizar el contador de productos bajo stock
  checkStockBajo(): void {
    this.productoService.obtenerProductosBajoStock().subscribe((productos: Producto[]) => {
      const cantidadBajoStock = productos.length;
      this.stockBajoSubject.next(cantidadBajoStock);  // Actualizar el contador
    });
  }

}
