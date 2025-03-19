import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Venta } from '../../entidad/venta';

@Component({
  selector: 'app-cierreCaja',
  templateUrl: './cierreCaja.component.html',
  styleUrls: ['./cierreCaja.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgxPaginationModule,FormsModule]
})
export class CierreCajaComponent implements OnInit {

  ventas: Venta[] = [];
  ventasOriginales: Venta[] = [];  // Almacenamos las ventas originales
  ventasPorPagina: any[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 7;
  constructor() { }

  ngOnInit() {
  }


  actualizarPagina(): void {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.ventasPorPagina = this.ventas.slice(inicio, fin);  // Filtramos las ventas para la página actual
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarPagina();
  }

  tienePaginaSiguiente(): boolean {
    return this.paginaActual < Math.ceil(this.ventas.length / this.registrosPorPagina);
  }

  tienePaginaAnterior(): boolean {
    return this.paginaActual > 1;
  }

}
