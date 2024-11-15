import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../servicio/categoria.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlert2Service } from '../../servicio/sweetAlert2.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listarCategoria',
  templateUrl: './listarCategoria.component.html',
  styleUrls: ['./listarCategoria.component.css'],
  standalone: true,  // Hacer este componente standalone
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class ListarCategoriaComponent implements OnInit {

  categorias: any[] = [];
  showModal: boolean = false;
  editForm: FormGroup;  // Formulario reactivo para edición

  //Paginado
  categoriasPorPagina: any[] = [];  // Productos que se mostrarán en la página actual
  paginaActual: number = 1;
  registrosPorPagina: number = 7;

  constructor(private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private sweetAlertService: SweetAlert2Service
  ) {
    // Inicializamos el formulario reactivo con validaciones
    this.editForm = this.formBuilder.group({
      id: [null],  // Agregar el campo id
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCategoria();  // Llamar al servicio para obtener las categorías al inicializar el componente
  }

  // Método para obtener las categorías desde el servicio
  getCategoria(): void {
    this.categoriaService.getCategoria().subscribe({
      next: (response) => {
        this.categorias = response;  // Asignar las categorías obtenidas
        this.actualizarPagina();

      },
      error: (error) => {
        console.error('Error al obtener las categorías', error);  // Manejo de errores
      }
    });
  }

  // Método para abrir el modal de edición y cargar los datos de la categoría
  editarCategoria(categoria: any): void {
    this.editForm.patchValue({
      id:categoria.id,
      categoria: categoria.categoria,
      descripcion: categoria.descripcion
    });  // Cargar datos de la categoría en el formulario
    this.showModal = true;
  }

  // Método para cerrar el modal
  cerrarModal(): void {
    this.showModal = false;
    this.editForm.reset();  // Limpiar el formulario
  }

  // Guardar los cambios realizados en la categoría
  // Método para guardar los cambios de la categoría editada
  guardarCategoria(): void {
    if (this.editForm.valid) {
      if (this.editForm.valid) {
        const categoriaEditada = this.editForm.value;  // Obtener valores del formulario reactivo

        // Mostrar el mensaje de confirmación antes de guardar los cambios
        this.sweetAlertService.showConfirmMessage('¿Estás seguro?', '¿Quieres guardar los cambios realizados en esta categoría?')
          .then((result) => {
            if (result.isConfirmed) {
              // El usuario confirmó, proceder a guardar la categoría
              this.categoriaService.putCategoria(categoriaEditada).subscribe({
                next: () => {
                  this.getCategoria();  // Actualizar lista de categorías
                  this.cerrarModal();   // Cerrar modal
                },
                error: (error: HttpErrorResponse) => {
                  console.error('Error al guardar la categoría', error);
                }
              });
            } else {
              // El usuario canceló, no hacer nada
              console.log('Se canceló la acción');
            }
          });
      } else {
        console.log('Formulario no válido');
      }
  }
}

eliminarCategoria(id: number): void {
  this.sweetAlertService.showConfirmMessage('¿Estás seguro?', '¿Deseas eliminar esta categoría?').then((result) => {
    if (result.isConfirmed) {
      // Llamar al servicio para eliminar la categoría si se confirma
      this.categoriaService.deleteCategoria(id).subscribe({
        next: () => {
          this.getCategoria();  // Recargar lista de categorías después de eliminar
          Swal.fire('Eliminado', 'La categoría ha sido eliminada', 'success');  // Mostrar mensaje de éxito
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al eliminar la categoría', error);
          Swal.fire('Error', 'No se pudo eliminar la categoría', 'error');  // Mensaje de error en caso de fallo
        }
      });
    }
  });
}


  // Función para actualizar los productos que se deben mostrar en la página actual
  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
  const fin = inicio + this.registrosPorPagina;
  this.categoriasPorPagina = this.categorias.slice(inicio, fin);  // Filtrar productos para la página actual
  }

  // Cambiar la página
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.actualizarPagina();
  }

  // Verificar si hay una página siguiente
  tienePaginaSiguiente(): boolean {
    return this.paginaActual < Math.ceil(this.categorias.length / this.registrosPorPagina);
  }

  // Verificar si hay una página anterior
  tienePaginaAnterior(): boolean {
    return this.paginaActual > 1;
  }

}

