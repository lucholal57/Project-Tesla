import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../entidad/usuario';
import { AuthService } from '../../servicio/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  // Hacer este componente standalone
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup; // Definimos el formulario reactivo

  showSidebar = false; // O usar una condición más compleja


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    // Inicializamos el formulario con validaciones
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.showSidebar = false;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.value;  // Obtener valores del formulario

      this.authService.login(usuario).subscribe({
        next: (response) => {
          if (response) {
            alert(`Bienvenido, ${response.username}`);
            this.router.navigate(['cargar-productos']);
          } else {
            alert('Usuario o contraseña incorrectos');
            this.loginForm.reset(); // Reiniciar formulario
          }
        },
        error: (error) => {
          console.error('Error en la autenticación', error);
          alert('Error al intentar iniciar sesión');
          this.loginForm.reset(); // Reiniciar formulario en caso de error
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

}
