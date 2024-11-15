import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../servicio/categoria.service';
import { Categoria } from '../../entidad/categoria';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Service } from '../../servicio/sweetAlert2.service';

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
    private categoriaService: CategoriaService,
    private sweetAlertService: SweetAlert2Service
  ) {
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
          this.sweetAlertService.showSuccessMessage("Categoria Agregado Correctamente",1500);
          this.categoryForm.reset(); // Limpiar formulario
        },
        error: (error) => {
          console.error('Error al agregar categoría', error);
          this.sweetAlertService.showErrorMessage("Problemas para cargar Categoria", "reintente");
        }
      });
    } 
  }

}
