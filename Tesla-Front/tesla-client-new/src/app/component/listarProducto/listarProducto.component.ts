import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../entidad/categoria';
import { Producto } from '../../entidad/producto';
import { ProductoService } from '../../servicio/producto.service';
import { CategoriaService } from '../../servicio/categoria.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listarProducto',
  templateUrl: './listarProducto.component.html',
  styleUrls: ['./listarProducto.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class ListarProductoComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  showModal: boolean = false;
  editForm: FormGroup;

  constructor( private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder) {
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
    this.productoService.getProducto().subscribe({
      next: (response) => {
        this.productos = response;  // Asignar los productos obtenidos
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

      // Verificar que la categoría está correctamente estructurada
      if (producto.categoria && typeof producto.categoria === 'number') {
        producto.categoria = { id: producto.categoria };  // Convertir a objeto con solo el id
      }

      // Si el producto tiene un id, enviamos PUT, si no, POST
      if (producto.id) {
        this.productoService.putProducto(producto).subscribe(response => {
          console.log('Producto actualizado correctamente', response);
          this.getProductos();
          this.cerrarModal();
        });
      } else {
        this.productoService.postProducto(producto).subscribe(response => {
          console.log('Producto creado correctamente', response);
          this.getProductos();
          this.cerrarModal();
        });
      }
    }
  }




  // Método para eliminar un producto
  eliminarProducto(id: number): void {
    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        this.getProductos();  // Recargar lista de productos después de eliminar
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al eliminar el producto', error);
      }
    });
  }

}
