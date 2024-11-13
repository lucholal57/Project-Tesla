import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../servicio/categoria.service';
import { Categoria } from '../../entidad/categoria';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  standalone: true,  // Hacer este componente standalone
  imports: [RouterModule, CommonModule,ReactiveFormsModule]
})
export class CategoriaComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private categoriaService: CategoriaService) {
      // Inicializamos el formulario con validaciones
    this.categoryForm = this.formBuilder.group({
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const nuevaCategoria = this.categoryForm.value;  // Obtener valores del formulario

      this.categoriaService.postCategoria(nuevaCategoria).subscribe({
        next: (response) => {
          alert('Categoría agregada correctamente');
          this.categoryForm.reset(); // Limpiar formulario
        },
        error: (error) => {
          console.error('Error al agregar categoría', error);
          alert('Error al agregar la categoría');
        }
      });
    } else {
      alert('Por favor, completa todos los campos');
    }
  }

}
