import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../entidad/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //private apiUrl = 'http://localhost:8085/api/';
  private apiUrl = 'https://project-tesla-render.onrender.com/api/';

constructor(private http: HttpClient, private router: Router) { }

login(usuario: Usuario): Observable<any> {
  return this.http.post<any>(this.apiUrl + 'usuario/login', usuario).pipe(
    tap(response => {
      // Suponiendo que el backend devuelve un token o algún valor
      if (response) {
        // Guarda un valor que indique que el usuario está autenticado
        localStorage.setItem('isAuthenticated', 'true');
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
