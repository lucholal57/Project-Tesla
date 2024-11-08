import { Component, OnInit } from '@angular/core';
import { Producto } from '../../entidad/producto';
import { CategoriaService } from '../../servicio/categoria.service';
import { Categoria } from '../../entidad/categoria';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: Producto = {
    nombre: '',
    descripcion: '',
    stock: 0, // Inicializa como número
    precioUnitario: 0, // Inicializa como número
    categoria: '' // Inicializa como número
  };

  categorias: Categoria[] = [];


  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.getCategoria();

  }
  onSubmit() {
    this.producto = { nombre: '', descripcion: '', stock: 0, precioUnitario: 0, categoria: '' }; // Reinicia el formulario
  }

  // Método para obtener categorías
  getCategoria(): void {
    this.categoriaService.getCategoria().subscribe({
      next: (response: Categoria[]) => {
        if (response && response.length > 0) {
          this.categorias = response;  // Asignamos las categorías a la variable
        } else {
          alert('No se encontraron categorías');
        }
      },
      error: (error) => {
        console.error('Error al obtener categorías', error);
        alert('Error al intentar obtener las categorías');
      }
    });
  }

}
