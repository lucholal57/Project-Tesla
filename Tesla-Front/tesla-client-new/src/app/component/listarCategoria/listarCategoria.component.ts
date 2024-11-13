import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../servicio/categoria.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


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

  constructor(private categoriaService: CategoriaService,
    private formBuilder: FormBuilder) {
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
      const categoriaEditada = this.editForm.value;  // Obtener valores del formulario reactivo

      this.categoriaService.putCategoria(categoriaEditada).subscribe({
        next: () => {
          this.getCategoria();  // Actualizar lista de categorías
          this.cerrarModal();   // Cerrar modal
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al guardar la categoría', error);
        }
      });
    }
  }

  // Método para eliminar una categoría
  eliminarCategoria(id: number): void {
    this.categoriaService.deleteCategoria(id).subscribe({
      next: () => {
        this.getCategoria();  // Recargar lista de categorías después de eliminar
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al eliminar la categoría', error);
      }
    });
  }

}

