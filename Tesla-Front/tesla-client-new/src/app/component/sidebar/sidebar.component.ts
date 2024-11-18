import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../servicio/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificacionStockService } from '../../servicio/notificacionStock.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgxPaginationModule,FormsModule]

})
export class SidebarComponent implements OnInit {

  stockBajoCount: number = 0;

  constructor(private notificacionStockService: NotificacionStockService) {}

  ngOnInit() {
    // Verificar el stock bajo al iniciar
    this.notificacionStockService.checkStockBajo();

    // Suscribirse a los cambios en el contador de productos bajo stock
    this.notificacionStockService.stockBajo$.subscribe((count) => {
      this.stockBajoCount = count;
    });
  }

}
