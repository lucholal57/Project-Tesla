import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../entidad/usuario';
import { AuthService } from '../../servicio/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = { username: '', password: '' };  // Usa la entidad

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
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
