import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../servicio/categoria.service';
import { HttpErrorResponse } from '@angular/common/http';  // Importa HttpErrorResponse
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-listarCategoria',
  templateUrl: './listarCategoria.component.html',
  styleUrls: ['./listarCategoria.component.css'],
  standalone: true,  // Hacer este componente standalone
  imports: [RouterModule, CommonModule,FormsModule]
})
export class ListarCategoriaComponent implements OnInit {

  categorias: any[] = [];  // Array para almacenar las categorías
  showModal: boolean = false;
  categoriaEditada: any = { categoria: '', descripcion: '' };

  constructor(private categoriaService: CategoriaService) { }

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

  editarCategoria(categoria: any): void {
    this.categoriaEditada = { ...categoria };  // Clonar el objeto de la categoría seleccionada
    this.showModal = true;
  }

  // Cerrar el modal
  cerrarModal(): void {
    this.showModal = false;
    this.categoriaEditada = { categoria: '', descripcion: '' };  // Limpiar los campos
  }

  // Guardar los cambios realizados en la categoría
  guardarCategoria(): void {
    this.categoriaService.putCategoria(this.categoriaEditada).subscribe(() => {
      this.getCategoria();  // Recargar las categorías después de guardar
      this.cerrarModal();  // Cerrar el modal
    });

  }

  eliminarCategoria(id:number): void {
    alert('ID de la categoría a eliminar: ' + id);
    this.categoriaService.deleteCategoria(id).subscribe(() => {
      this.getCategoria();  // Recargar las categorías después de eliminar
    });
  }

  }

