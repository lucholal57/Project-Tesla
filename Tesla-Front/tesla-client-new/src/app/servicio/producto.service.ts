import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../entidad/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //private apiUrl = 'http://localhost:8085/api/';
  private apiUrl = 'https://project-tesla-render.onrender.com/api/';

constructor(private http: HttpClient) { }

getProducto():Observable<any> {
  return this.http.get<any>(this.apiUrl + 'producto/listar');
}

postProducto(producto:Producto):Observable<any> {
  return this.http.post<any>(this.apiUrl + 'producto/crea',producto);
}

putProducto(producto:Producto):Observable<any> {
  return this.http.put<any>(this.apiUrl + 'producto/actualizar',producto);
}

deleteProducto(id:number):Observable<any>{
  return this.http.delete<any>(`${this.apiUrl}producto/eliminar/${id}`, { responseType: 'text' as 'json' });
}

getProductoPorCodigo(codigo: string): Observable<any> {
  return this.http.get(`${this.apiUrl}producto/codigo/${codigo}`);
}

obtenerProductosBajoStock(): Observable<any> {
  return this.http.get(this.apiUrl + 'producto/stock-bajo');
}

}
