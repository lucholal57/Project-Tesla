import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Venta } from '../../entidad/venta';
import { VentaService } from '../../servicio/venta.service';
import { SweetAlert2Service } from '../../servicio/sweetAlert2.service';

@Component({
  selector: 'app-listarVenta',
  templateUrl: './listarVenta.component.html',
  styleUrls: ['./listarVenta.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgxPaginationModule,FormsModule]
})
export class ListarVentaComponent implements OnInit {
  ventas: Venta[] = [];
  ventasOriginales: Venta[] = [];  // Almacenamos las ventas originales
  ventasPorPagina: any[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 7;

  // Lista de productos (puedes obtener esto del backend si es necesario)
  productos: any[] = [];

  // Filtro de fecha
  fecha: string = '';

  // Filtro de descripción
  descripcion: string = '';

  metodoPago = '';

  constructor(private ventaService: VentaService,  private sweetAlertService: SweetAlert2Service) { }

  ngOnInit() {
    this.getVentas();  // Llamamos al servicio para obtener las ventas
  }

  getVentas(): void {
    this.ventaService.getVentas().subscribe({
      next: (response) => {
        this.ventas = response.reverse();  // Asignamos las ventas obtenidas
        this.ventasOriginales = [...this.ventas];  // Guardamos las ventas originales
        this.actualizarPagina();
      },
      error: (error) => {
        console.error('Error al obtener las ventas', error);  // Manejo de errores
      }
    });
  }

  actualizarPagina(): void {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.ventasPorPagina = this.ventas.slice(inicio, fin);  // Filtramos las ventas para la página actual
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarPagina();
  }

  tienePaginaSiguiente(): boolean {
    return this.paginaActual < Math.ceil(this.ventas.length / this.registrosPorPagina);
  }

  tienePaginaAnterior(): boolean {
    return this.paginaActual > 1;
  }

  verDetallesVenta(id: number): void {
    // Aquí puedes implementar la lógica para mostrar los detalles de la venta
    console.log('Ver detalles de la venta con ID:', id);
  }

  eliminarVenta(id: number): void {
    // Lógica para eliminar la venta
    this.ventaService.eliminarVenta(id).subscribe({
      next: () => {
        this.getVentas();  // Recargar lista de ventas después de eliminar
      },
      error: (error) => {
        console.error('Error al eliminar la venta', error);
      }
    });
  }

  // Función para obtener el nombre del producto por su ID
  obtenerNombreProducto(productoId: number): string {
    const producto = this.productos.find(p => p.id === productoId);
    return producto ? producto.nombre : 'Producto no encontrado';
  }

 // Filtrar ventas por fecha
filtrarPorFecha(): void {
  if (this.fecha) {
    // Mostrar el mensaje de carga
    this.sweetAlertService.showLoadingMessage().then(() => {
      // Convertir la fecha seleccionada a objeto Date
      const fechaSeleccionada = new Date(this.fecha);

      // Asegurarse de que la fecha seleccionada esté en medianoche
      fechaSeleccionada.setHours(0, 0, 0, 0);

      // Sumar un día a la fecha seleccionada para corregir el desfase
      fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1);

      this.ventas = this.ventasOriginales.filter((venta) => {
        // Convertir la fecha de la venta a objeto Date
        const fechaVenta = new Date(venta.fecha);

        // Asegurarse de que la fecha de la venta también esté en medianoche
        fechaVenta.setHours(0, 0, 0, 0);

        // Comparar solo día, mes y año
        return fechaVenta.getTime() === fechaSeleccionada.getTime();
      });

      // Actualizar la página después de filtrar
      this.actualizarPagina();
    }).catch((error) => {
      console.error("Error al mostrar el mensaje de carga:", error);
    });
  } else {
    // Si no hay filtro de fecha, restauramos todas las ventas
    this.ventas = [...this.ventasOriginales];

    // Actualizar la página después de restaurar todas las ventas
    this.actualizarPagina();
  }
}
  resetearFiltro(): void {
    this.fecha = '';  // Limpiar filtro de fecha
    this.descripcion = '';  // Limpiar filtro de descripción
    this.ventas = [...this.ventasOriginales];  // Restaurar todas las ventas
    this.metodoPago = '';
    this.actualizarPagina();  // Actualizar la página después de resetear
  }

 // Filtrar ventas por descripción// Filtrar ventas por descripción
filtrarPorDescripcion(): void {
  if (this.descripcion) {
    this.sweetAlertService.showLoadingMessage().then(() => {
      // Filtrar ventas donde la descripción de la venta contiene el texto ingresado
      this.ventas = this.ventasOriginales.filter((venta) =>
        venta.descripcion.toLowerCase().includes(this.descripcion.toLowerCase())
      );

      // Actualizar la página después de filtrar
      this.actualizarPagina();
    }).catch((error) => {
      console.error("Error al mostrar el mensaje de carga:", error);
    });
  } else {
    // Si no hay filtro de descripción, restauramos todas las ventas
    this.ventas = [...this.ventasOriginales];

    // Actualizar la página después de restaurar todas las ventas
    this.actualizarPagina();
  }
}


filtrarPorMetodoPago(): void {
  if (this.metodoPago) {
    this.sweetAlertService.showLoadingMessage().then(() => {
      // Filtrar ventas donde la descripción de la venta contiene el texto ingresado
      this.ventas = this.ventasOriginales.filter((venta) =>
        venta.metodoPago.toLowerCase().includes(this.metodoPago.toLowerCase())
      );

      // Actualizar la página después de filtrar
      this.actualizarPagina();
    }).catch((error) => {
      console.error("Error al mostrar el mensaje de carga:", error);
    });
  } else {
    // Si no hay filtro de descripción, restauramos todas las ventas
    this.ventas = [...this.ventasOriginales];

    // Actualizar la página después de restaurar todas las ventas
    this.actualizarPagina();
  }
}




}
