import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../entidad/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private apiUrl = 'http://localhost:8081/api/';
  private apiUrl = 'https://project-tesla-render.onrender.com/api/';

constructor(private http: HttpClient, private router: Router) { }

login(usuario: Usuario): Observable<any> {
  return this.http.post<any>(this.apiUrl + 'usuario/login', usuario, {
    headers: {
      'Content-Type': 'application/json',  // Asegura que se está enviando JSON
      'Access-Control-Allow-Origin': '*'  // Añadir este encabezado si es necesario para que el navegador lo acepte
    }
  }).pipe(
    tap(response => {
      if (response) {
        if (response.token) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('authToken', response.token);  // Guarda el token para futuras solicitudes
        }
      }
    })
  );
}

isAuthenticated(): boolean {
  return localStorage.getItem('isAuthenticated') === 'true';
}

logout(): void {
  localStorage.removeItem('isAuthenticated');
  this.router.navigate(['/login']).then(() => {
    window.location.reload();  // Forzar recarga para asegurar que el guard se reevalúe
  });
}

}
