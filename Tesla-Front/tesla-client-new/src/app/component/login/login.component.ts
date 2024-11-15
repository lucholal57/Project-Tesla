import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../entidad/usuario';
import { AuthService } from '../../servicio/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Service } from '../../servicio/sweetAlert2.service';


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
    private router: Router,
    private sweetAlertService: SweetAlert2Service) {
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
      const usuario = this.loginForm.value;

      this.authService.login(usuario).subscribe({
        next: (response) => {
          if (response) {
            // Guardar el estado de autenticación
            localStorage.setItem('isAuthenticated', 'true');

            this.sweetAlertService.showSuccessMessage("Bienvenido " + response.username, 1500).then(() => {
              // Redirigir a la página de productos
              this.router.navigate(['cargar-productos']);
            });
          } else {
            this.loginForm.reset(); // Reiniciar formulario
          }
        },
        error: (error) => {
          console.error('Error en la autenticación', error);
          this.sweetAlertService.showErrorMessage("Error en la autenticación", "Vuelva a intentarlo");
          this.loginForm.reset(); // Reiniciar formulario
        }
      });
    }
  }


}
