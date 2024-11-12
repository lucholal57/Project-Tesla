import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../entidad/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8085/api/'; 

constructor(private http: HttpClient) { }

login(usuario: Usuario): Observable<any> {
  return this.http.post<any>(this.apiUrl + 'usuario/login', usuario);
}

}
