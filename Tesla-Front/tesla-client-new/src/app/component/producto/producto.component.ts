import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../entidad/producto';
import { CategoriaService } from '../../servicio/categoria.service';
import { Categoria } from '../../entidad/categoria';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../servicio/producto.service';
import { SweetAlert2Service } from '../../servicio/sweetAlert2.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  standalone: true,  // Hacer este componente standalone
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class ProductoComponent implements OnInit {

  productoForm: FormGroup;  // Definir el FormGroup
  categorias: Categoria[] = [];


  constructor(private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private sweetAlertService: SweetAlert2Service
  ) {
    // Inicializar el formulario reactivo con validaciones
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      codigo: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]*$/)] // Valida solo números
      ],
      descripcion: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      categoria: [null, Validators.required] // Asigna null inicialmente, pero debe ser un objeto de categoria más tarde
    });
  }

  ngOnInit() {
    this.getCategoria();

  }
  onSubmit() {
    if (this.productoForm.valid) {
      const nuevoProducto = this.productoForm.value;  // Obtener valores del formulario
      console.log(nuevoProducto);
      this.productoService.postProducto(nuevoProducto).subscribe({
        next: (response) => {
          this.sweetAlertService.showSuccessMessage("Producto Agregado Correctamente",1500);
          this.productoForm.reset();
        },
        error: (error) => {
          console.error("Error al agregar producto", error);
        }
      });
    } else {
      this.sweetAlertService.showErrorMessage("Problemas para cargar producto", "reintente");
    }
  }

  // Método para obtener categorías
  getCategoria(): void {
    this.categoriaService.getCategoria().subscribe({
      next: (response: Categoria[]) => {
        if (response && response.length > 0) {
          this.categorias = response;  // Asignamos las categorías a la variable
        } else {
          console.error('No se encontraton categorias' );
        }
      },
      error: (error) => {
        console.error('Error al obtener categorías', error);
      }
    });
  }

}
