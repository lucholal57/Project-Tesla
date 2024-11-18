import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../entidad/categoria';
import { Producto } from '../../entidad/producto';
import { ProductoService } from '../../servicio/producto.service';
import { CategoriaService } from '../../servicio/categoria.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlert2Service } from '../../servicio/sweetAlert2.service';
import Swal from 'sweetalert2';
import { NotificacionStockService } from '../../servicio/notificacionStock.service';


@Component({
  selector: 'app-productoBajoStock',
  templateUrl: './productoBajoStock.component.html',
  styleUrls: ['./productoBajoStock.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class ProductoBajoStockComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  showModal: boolean = false;
  editForm: FormGroup;

  //Paginado
  productosPorPagina: any[] = [];  // Productos que se mostrarán en la página actual
  paginaActual: number = 1;
  registrosPorPagina: number = 7;
  productosOriginales: Producto[] = []; // Productos que se mostrarán

  //Filtros
  nombre = '';
  descripcion = '';
  categoria = '';

  constructor(private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private sweetAlertService: SweetAlert2Service,
    private notificacionStockService: NotificacionStockService
  ) {
    // Inicializamos el formulario reactivo con validaciones
    this.editForm = this.formBuilder.group({
      id: [null],  // Agregar el campo id
      nombre: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      descripcion: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      categoria: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getProductos();  // Llamar al servicio para obtener los productos al inicializar el componente
    this.getCategorias();  // Llamar al servicio para obtener las categorías
  }

  // Método para obtener los productos desde el servicio
  getProductos(): void {
    this.productoService.obtenerProductosBajoStock().subscribe({
      next: (response) => {
        this.productos = response;  // Asignar los productos obtenidos
        this.productosOriginales = [...this.productos];
        this.actualizarPagina();
      },
      error: (error) => {
        console.error('Error al obtener los productos', error);  // Manejo de errores
      }
    });
  }

  // Método para obtener las categorías desde el servicio
  getCategorias(): void {
    this.categoriaService.getCategoria().subscribe({
      next: (response) => {
        this.categorias = response;  // Asignar las categorías obtenidas
      },
      error: (error) => {
        console.error('Error al obtener las categorías', error);  // Manejo de errores
      }
    });
  }

  editarProducto(producto: any): void {
    console.log('Producto original antes de editar:', producto);

    // Asegúrate de que el objeto de categoría tiene la estructura correcta
    if (producto.categoria && typeof producto.categoria === 'object') {
      console.log('Categoria original:', producto.categoria);
      // Asignamos los valores al formulario
      this.editForm.patchValue({
        id: producto.id,
        nombre: producto.nombre,
        codigo: producto.codigo,
        descripcion: producto.descripcion,
        stock: producto.stock,
        precio: producto.precio,
        categoria: producto.categoria.id  // Asignar solo el id de la categoría
      });
    }

    // Mostrar el modal de edición
    this.showModal = true;
  }


  // Método para cerrar el modal
  cerrarModal(): void {
    this.showModal = false;
    this.editForm.reset();  // Limpiar el formulario
  }

  guardarProducto(): void {
    if (this.editForm.valid) {
      const producto = this.editForm.value;
      console.log('Producto antes de enviar:', producto);

      // Asegúrate de que 'categoria' sea un objeto con 'id'
      if (producto.categoria) {
        producto.categoria = { id: producto.categoria };
      }

      // Mostrar el mensaje de confirmación antes de guardar
      this.sweetAlertService.showConfirmMessage('¿Estás seguro?', '¿Quieres guardar los cambios realizados en este producto?')
        .then((result) => {
          if (result.isConfirmed) {
            // Si el producto tiene un id, enviamos PUT, si no, POST
            if (producto.id) {
              this.productoService.putProducto(producto).subscribe(response => {
                console.log('Producto actualizado correctamente', response);
                this.getProductos();
                this.cerrarModal();
                this.notificacionStockService.checkStockBajo();
              });
            } else {
              this.productoService.postProducto(producto).subscribe(response => {
                console.log('Producto creado correctamente', response);
                this.getProductos();
                this.cerrarModal();
                this.notificacionStockService.checkStockBajo();
              });
            }
          } else {
            // Si el usuario cancela, no hacemos nada
            console.log('Se canceló la acción');
          }
        });
    } else {
      console.log('Formulario no válido');
    }
  }



  eliminarProducto(id: number): void {
    // Mostrar mensaje de confirmación antes de eliminar
    this.sweetAlertService.showConfirmMessage('¿Estás seguro?', '¿Quieres eliminar este producto?')
      .then((result) => {
        if (result.isConfirmed) {
          // Si el usuario confirma, proceder con la eliminación
          this.productoService.deleteProducto(id).subscribe({
            next: () => {
              this.getProductos();  // Recargar lista de productos después de eliminar
              Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');  // Mensaje de éxito
            },
            error: (error: HttpErrorResponse) => {
              console.error('Error al eliminar el producto', error);
              Swal.fire('Error', 'Hubo un problema al eliminar el producto', 'error');  // Mensaje de error
            }
          });
        } else {
          // Si el usuario cancela, no hacer nada
          console.log('Se canceló la eliminación');
        }
      });
  }



  // Función para actualizar los productos que se deben mostrar en la página actual
  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.productosPorPagina = this.productos.slice(inicio, fin);  // Filtrar productos para la página actual
  }

  // Cambiar la página
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.actualizarPagina();
  }

  // Verificar si hay una página siguiente
  tienePaginaSiguiente(): boolean {
    return this.paginaActual < Math.ceil(this.productos.length / this.registrosPorPagina);
  }

  // Verificar si hay una página anterior
  tienePaginaAnterior(): boolean {
    return this.paginaActual > 1;
  }

  resetearFiltro(): void {
    this.nombre = ''; // Limpiar filtro de nombre
    this.descripcion = ''; // Limpiar filtro de descripción
    this.categoria = ''; // Limpiar filtro de categoría
    this.productos = [...this.productosOriginales]; // Restaurar todos los productos
    this.actualizarPagina(); // Actualizar la página después de resetear
  }

  // Filtrar productos por nombre
  filtrarPorNombre(): void {
    if (this.nombre) {
      this.sweetAlertService.showLoadingMessage().then(() => {
        // Filtrar productos donde el nombre contiene el texto ingresado
        this.productos = this.productosOriginales.filter((producto) =>
          producto.nombre.toLowerCase().includes(this.nombre.toLowerCase())
        );

        // Actualizar la página después de filtrar
        this.actualizarPagina();
      }).catch((error) => {
        console.error("Error al mostrar el mensaje de carga:", error);
      });
    } else {
      // Si no hay filtro de nombre, restauramos todos los productos
      this.productos = [...this.productosOriginales];

      // Actualizar la página después de restaurar todos los productos
      this.actualizarPagina();
    }
  }

  // Filtrar productos por descripción
  filtrarPorDescripcion(): void {
    if (this.descripcion) {
      this.sweetAlertService.showLoadingMessage().then(() => {
        // Filtrar productos donde la descripción contiene el texto ingresado
        this.productos = this.productosOriginales.filter((producto) =>
          producto.descripcion.toLowerCase().includes(this.descripcion.toLowerCase())
        );

        // Actualizar la página después de filtrar
        this.actualizarPagina();
      }).catch((error) => {
        console.error("Error al mostrar el mensaje de carga:", error);
      });
    } else {
      // Si no hay filtro de descripción, restauramos todos los productos
      this.productos = [...this.productosOriginales];

      // Actualizar la página después de restaurar todos los productos
      this.actualizarPagina();
    }
  }

  // Filtrar productos por categoría
  filtrarPorCategoria(): void {
    if (this.categoria) {
      this.sweetAlertService.showLoadingMessage().then(() => {
        // Filtrar productos donde la categoría coincide con la seleccionada
        this.productos = this.productosOriginales.filter((producto) =>
          producto.categoria.categoria.toLowerCase().includes(this.categoria.toLowerCase())
        );

        // Actualizar la página después de filtrar
        this.actualizarPagina();
      }).catch((error) => {
        console.error("Error al mostrar el mensaje de carga:", error);
      });
    } else {
      // Si no hay filtro de categoría, restauramos todos los productos
      this.productos = [...this.productosOriginales];

      // Actualizar la página después de restaurar todos los productos
      this.actualizarPagina();
    }
  }

}
