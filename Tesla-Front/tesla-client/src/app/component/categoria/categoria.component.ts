import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../servicio/categoria.service';
import { Categoria } from '../../entidad/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoria: Categoria = { id: 0, categoria: '', descripcion: '' };  // No enviar id en la creación

  constructor(private categoriaService:CategoriaService) { }

  ngOnInit() {
  }

  onSubmitCategoria(): void {
    if (this.categoria.categoria && this.categoria.descripcion) {
      this.categoriaService.postCategoria(this.categoria).subscribe({
        next: (response) => {
          alert('Categoría agregada correctamente');
          this.categoria = { id: 0 ,categoria: '', descripcion: '' }; // Limpiar formulario
        },
        error: (error) => {
          console.error('Error al agregar categoría', error);
          alert('Error al agregar la categoría');
        },
      });
    } else {
      alert('Por favor, completa todos los campos');
    }
  }

}
