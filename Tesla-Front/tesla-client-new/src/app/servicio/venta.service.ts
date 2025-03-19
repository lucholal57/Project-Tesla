import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../entidad/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  //private apiUrl = 'http://localhost:8085/api/';
  private apiUrl = 'https://project-tesla-render.onrender.com/api/';


constructor(private http: HttpClient) { }

createVenta(venta: Venta): Observable<any> {
  return this.http.post(this.apiUrl+'venta/crea', venta);
}

getVentas(): Observable<Venta[]> {
  return this.http.get<Venta[]>(this.apiUrl+'venta/listar');  // Obtener lista de ventas
}

eliminarVenta(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}venta/${id}`);  // Eliminar una venta
}

}

