import { Component, OnInit } from '@angular/core';
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
  imports: [RouterModule, CommonModule,FormsModule]
})
export class LoginComponent implements OnInit {
  public get authService(): AuthService {
    return this._authService;
  }
  public set authService(value: AuthService) {
    this._authService = value;
  }

  showSidebar = false; // O usar una condición más compleja

  usuario: Usuario = { username: '', password: '' };  // Usa la entidad

  constructor(private _authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.showSidebar = false;
  }

  onSubmit() {
    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        if (response) {
          alert(`Bienvenido a Usuario: ${response.username}`);
          console.log('Redirigiendo a la página de productos...');
          this.router.navigate(['cargar-productos']);
        } else {
          alert('Usuario o contraseña incorrectos');
          this.reset();
        }
      },
      error: (error) => {
        console.error('Error en la autenticación', error);
        alert('Error al intentar iniciar sesión');
        this.reset();
      }
    });
  }

  reset(){
    this.usuario.username='';
    this.usuario.password='';
  }

}
