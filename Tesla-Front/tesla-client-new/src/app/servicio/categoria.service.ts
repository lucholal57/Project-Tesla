import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../entidad/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8085/api/';

constructor(private http: HttpClient) { }

getCategoria():Observable<any> {
  return this.http.get<any>(this.apiUrl + 'categoria/listar');
}

postCategoria(categoria:Categoria):Observable<any> {
  return this.http.post<any>(this.apiUrl + 'categoria/crea',categoria);
}

putCategoria(categoria:Categoria):Observable<any> {
  return this.http.put<any>(this.apiUrl + 'categoria/actualizar',categoria);
}

deleteCategoria(id:number):Observable<any>{
  return this.http.delete<any>(`${this.apiUrl}categoria/eliminar/${id}`, { responseType: 'text' as 'json' });
}

}
