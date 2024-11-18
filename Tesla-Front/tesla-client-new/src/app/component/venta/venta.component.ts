import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SweetAlert2Service } from '../../servicio/sweetAlert2.service';
import { ProductoService } from '../../servicio/producto.service';
import { VentaService } from '../../servicio/venta.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Venta } from '../../entidad/venta';
import { Producto } from '../../entidad/producto';
import { NotificacionStockService } from '../../servicio/notificacionStock.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgxPaginationModule]
})
export class VentaComponent implements OnInit {
  ventaForm: FormGroup;
  p: number = 1; // Página inicial
  productosSeleccionados: any[] = []; // Lista de productos seleccionados para la venta
  total: number = 0; // Total acumulado de la venta
  productoNoDisponible: boolean = false; // Indicador para mostrar si no hay stock disponible
  itemsPorPagina: number = 3; // Número de productos por página
  ventas: any[] = []; // Lista de ventas

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private sweetAlertService: SweetAlert2Service,
    private notificacionStockService: NotificacionStockService
  ) {
    this.ventaForm = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      descripcion: ['', Validators.required],
      metodoPago: ['', Validators.required],
      interes: [0],  // Validación predeterminada para valores positivos
    });
  }



  // Paginación de productos
  get productosPaginados() {
    const inicio = (this.p - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.productosSeleccionados.slice(inicio, fin);
  }

  // Cambiar de página
  cambiarPagina(pagina: number): void {
    const totalPaginas = Math.ceil(this.productosSeleccionados.length / this.itemsPorPagina);
    if (pagina >= 1 && pagina <= totalPaginas) {
      this.p = pagina;
    }
  }

  ngOnInit(): void { }

  verificarStock(event: any): void {
    const codigo = this.ventaForm.get('codigo')?.value;

    if (this.ventaForm.get('codigo')?.valid && codigo) {
      this.productoService.getProductoPorCodigo(codigo).subscribe({
        next: (producto) => {
          console.log('Producto recibido:', producto);

          if (producto) {
            // Verificar si el producto ya está en el carrito
            const productoExistente = this.productosSeleccionados.find(p => p.id === producto.id);

            if (productoExistente) {
              // Verificar si la cantidad total de ese producto en el carrito + la cantidad que intentas agregar no excede el stock
              const cantidadTotal = productoExistente.cantidad + 1;

              if (cantidadTotal <= producto.stock) {
                // Si no excede el stock, aumentar la cantidad en el carrito
                productoExistente.cantidad = cantidadTotal;
                this.productoNoDisponible = false;  // Producto disponible
                this.calcularTotal();  // Recalcular el total después de actualizar
              } else {
                // Si no hay stock suficiente, mostrar mensaje de error
                this.productoNoDisponible = true;
                console.log("Error: No hay suficiente stock para agregar.");
                this.sweetAlertService.showErrorMessage(
                  'No hay suficiente stock del producto: ' + producto.nombre,
                  'Disponible: ' + producto.stock
                );
              }
            } else {
              // Si el producto no está en el carrito, agregarlo con la cantidad disponible
              const cantidadAAgregar = Math.min(producto.stock, 1);
              if (cantidadAAgregar > 0) {
                producto.cantidad = cantidadAAgregar;  // Inicializar la cantidad a 1 o la cantidad máxima
                this.productoNoDisponible = false;  // Producto disponible
                this.agregarProductoAlCarrito(producto);
              } else {
                // Si no hay stock disponible, mostrar mensaje de error
                this.productoNoDisponible = true;
                console.log("Error: Producto fuera de stock.");
                this.sweetAlertService.showErrorMessage('Producto fuera de stock', 'No hay stock disponible.');
              }
            }
          } else {
            // Producto no encontrado, mostrar mensaje de error
            this.productoNoDisponible = true;
            console.log("Error: Producto no encontrado.");
            this.sweetAlertService.showErrorMessage('Producto no encontrado', 'El código ingresado no corresponde a un producto.');
          }

          this.resetearInputCodigo();
          this.quitarValidadoresCodigo();
        },
        error: (err) => {
          // Error en la llamada a la API
          console.error('Error al buscar producto:', err);
          this.productoNoDisponible = true;
          this.sweetAlertService.showErrorMessage('Error al verificar el producto', 'Hubo un error al obtener los datos del producto.');
          this.resetearInputCodigo();
          this.quitarValidadoresCodigo();
        },
      });
    } else {
      // Código no válido, mostrar mensaje de error
      this.productoNoDisponible = true;
      console.log("Error: Código inválido.");
      this.sweetAlertService.showErrorMessage('Código inválido', 'El código ingresado no es válido.');
    }
  }

  // Eliminar validadores del campo código
  quitarValidadoresCodigo(): void {
    const codigoControl = this.ventaForm.get('codigo');
    codigoControl?.clearValidators();  // Eliminar cualquier validador
    codigoControl?.updateValueAndValidity(); // Actualizar la validez del campo
  }

  agregarProductoAlCarrito(producto: Producto): void {
    this.productosSeleccionados.push(producto);
    this.calcularTotal();  // Recalcular el total después de agregar un producto
  }

  calcularTotal(): void {
    let subtotal = this.productosSeleccionados.reduce(
      (acc, producto) => acc + (producto.precio * producto.cantidad),
      0
    );

    // Obtener el valor de interés (porcentaje)
    const interes = this.ventaForm.get('interes')?.value || 0;

    // Calcular el total con el interés
    const totalConInteres = subtotal + (subtotal * interes / 100);
    this.total = totalConInteres;

    console.log('Total actualizado con interés:', this.total);  // Para depurar
  }

  // Realizar la venta
  onSubmit(): void {
    console.log('Formulario válido:', this.ventaForm.valid);
    console.log('Formulario valores:', this.ventaForm.value);

    // Verificar que el formulario es válido y que hay productos seleccionados
    if (this.ventaForm.valid && this.productosSeleccionados.length > 0) {
      this.quitarValidadoresCodigo(); // Eliminar validación de código para permitir la venta

      // Crear objeto de la venta con la fecha completa (incluyendo hora y minutos)
      const nuevaVenta: Venta = {
        fecha: new Date().toISOString(), // Usar el formato ISO completo (fecha + hora + minutos)
        descripcion: this.ventaForm.value.descripcion, // Descripción de la venta
        detalles: this.productosSeleccionados.map((p) => ({
          cantidad: p.cantidad, // La cantidad de cada producto
          productoId: p.id, // El ID del producto
          producto: p.producto, // El producto
        })),
        metodoPago: this.ventaForm.value.metodoPago, // Método de pago
        total: this.ventaForm.value.total, // Total
      };

      // Registrar la venta en el backend
      this.ventaService.createVenta(nuevaVenta).subscribe({
        next: () => {
          // Mostrar mensaje de éxito
          this.sweetAlertService.showSuccessMessage('Venta registrada con éxito', 1500);

          // Obtener las ventas actualizadas desde el backend para mostrar en la UI
          this.ventaService.getVentas().subscribe(ventas => {
            this.ventas = ventas;  // Actualizar la lista de ventas
          });

          // Limpiar el formulario y los productos seleccionados
          this.resetearFormulario();
          this.notificacionStockService.checkStockBajo();
        },
        error: () => {
          // Mostrar mensaje de error
          this.sweetAlertService.showErrorMessage('Error al registrar la venta', 'Intente nuevamente');
        },
      });
    }
  }


  // Reiniciar el formulario
  resetearFormulario(): void {
    this.ventaForm.reset();
    this.productosSeleccionados = [];
    this.total = 0;
    this.productoNoDisponible = false;
  }

  // Resetear el campo de código
  resetearInputCodigo(): void {
    const codigoControl = this.ventaForm.get('codigo');
    codigoControl?.reset(); // Limpiar el campo
    this.quitarValidadoresCodigo(); // Eliminar validadores para evitar validación futura
  }

}
