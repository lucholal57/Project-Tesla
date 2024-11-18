import { CommonModule, DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VentaService } from '../../servicio/venta.service';
import { Venta } from '../../entidad/venta';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, NgxChartsModule, FormsModule],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  ventas: Venta[] = [];
  gananciasPorMes: { name: string; value: number }[] = [];
  totalesPorMetodoPago: { name: string; value: number }[] = []; // Array para los totales por método de pago
  productosMasVendidos: { name: string; value: number }[] = [];
  colorScheme = 'cool';
  selectedChart: number = 1; // Variable para el gráfico seleccionado
  // Variables para el tamaño de la ventana
  windowWidth: number = window.innerWidth;
  windowHeight: number = window.innerHeight;

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(private ventaService: VentaService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getVentas();
  }

  getVentas(): void {
    this.ventaService.getVentas().subscribe({
      next: (response) => {
        console.log('Ventas obtenidas:', response); // Log para verificar las ventas obtenidas
        this.ventas = response;
        this.calcularGananciasPorMes();
        this.calcularTotalesPorMetodoPago();  // Agregar esta llamada aquí
        this.calcularProductosMasVendidos();
      },
      error: (error) => {
        console.error('Error al obtener las ventas', error);
      }
    });
  }

  

  // Cambiar el gráfico que se va a mostrar
  selectChart(chartNumber: number): void {
    this.selectedChart = chartNumber;
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.windowHeight = event.target.innerHeight;
  }



  calcularGananciasPorMes(): void {
    const ganancias: Record<string, number> = {};
    const mesesAbreviados = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

    this.ventas.forEach((venta) => {
      const fechaVenta = new Date(venta.fecha);

      if (isNaN(fechaVenta.getTime())) {
        console.error('Fecha inválida:', venta.fecha);
        return;
      }

      // Obtenemos el año y el índice del mes (0 para enero, 11 para diciembre)
      const year = fechaVenta.getFullYear();
      const monthIndex = fechaVenta.getMonth(); // Devuelve el mes en base 0 (0 = enero)

      if (monthIndex < 0 || monthIndex > 11) return; // Validación de rango de meses

      const mesAbreviado = mesesAbreviados[monthIndex]; // Convertimos a formato abreviado
      const mesAnio = `${year}-${mesAbreviado}`;

      // Acumular ganancias por mes
      if (!ganancias[mesAnio]) {
        ganancias[mesAnio] = 0;
      }
      ganancias[mesAnio] += venta.total;
    });

    // Convertir el objeto en un array para el gráfico y ordenarlo por mes y año
    this.gananciasPorMes = Object.keys(ganancias)
      .map((mes) => ({
        name: mes, // Ejemplo: "2024-ENE"
        value: ganancias[mes],
      }))
      .sort((a, b) => {
        // Extraer año y mes de cada nombre (formato "2024-ENE")
        const [yearA, mesA] = a.name.split('-');
        const [yearB, mesB] = b.name.split('-');
        const indexMesA = mesesAbreviados.indexOf(mesA);
        const indexMesB = mesesAbreviados.indexOf(mesB);

        // Comparar primero por año, luego por mes
        if (yearA !== yearB) {
          return parseInt(yearA) - parseInt(yearB); // Ordenar por año
        }
        return indexMesA - indexMesB; // Ordenar por mes
      });
  }


  calcularTotalesPorMetodoPago(): void {
    const totales: Record<string, number> = {};

    this.ventas.forEach((venta) => {
      const metodoPago = venta.metodoPago;

      if (!totales[metodoPago]) {
        totales[metodoPago] = 0;
      }
      totales[metodoPago] += venta.total;
    });

    // Convertir el objeto en un array para el gráfico
    this.totalesPorMetodoPago = Object.keys(totales)
      .map((metodo) => ({
        name: metodo, // Ejemplo: "DEBITO"
        value: totales[metodo],
      }));

    // Verifica el resultado con un log
    console.log('Totales por método de pago:', this.totalesPorMetodoPago);
  }

  calcularProductosMasVendidos(): void {
    const productosVendidos: Record<string, number> = {};

    this.ventas.forEach((venta) => {
      venta.detalles.forEach((detalle) => {
        const producto = detalle.producto;
        const cantidad = detalle.cantidad;

        // Acumulamos las cantidades de cada producto
        if (!productosVendidos[producto.nombre]) {
          productosVendidos[producto.nombre] = 0;
        }
        productosVendidos[producto.nombre] += cantidad;
      });
    });

    // Convertimos el objeto a un array y lo ordenamos por cantidad
    this.productosMasVendidos = Object.keys(productosVendidos)
    .map((nombre) => {
      const cantidad = productosVendidos[nombre];
      return {
        name: nombre,
        value: cantidad != null ? cantidad : 0 // Asegúrate de que no sea undefined o null
      };
    })
    .sort((a, b) => b.value - a.value);
      // Verifica el resultado con un log
    console.log('Totales por método de pago:', this.productosMasVendidos);
  }



}
