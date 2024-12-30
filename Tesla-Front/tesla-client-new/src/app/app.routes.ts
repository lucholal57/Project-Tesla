// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProductoComponent } from './component/producto/producto.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { ListarCategoriaComponent } from './component/listarCategoria/listarCategoria.component';
import { ListarProductoComponent } from './component/listarProducto/listarProducto.component';
import { authGuard } from './auth/auth.guard';
import { VentaComponent } from './component/venta/venta.component';
import { ListarVentaComponent } from './component/listarVenta/listarVenta.component';
import { ProductoBajoStockComponent } from './component/productoBajoStock/productoBajoStock.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CierreCajaComponent } from './component/cierreCaja/cierreCaja.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cargar-productos', component: ProductoComponent, canActivate: [authGuard] },
  { path: 'cargar-categorias', component: CategoriaComponent, canActivate: [authGuard] },
  { path: 'listar-categorias', component: ListarCategoriaComponent, canActivate: [authGuard] },
  { path: 'listar-productos', component: ListarProductoComponent, canActivate: [authGuard] },
  { path: 'listar-productos/stock-bajo', component: ProductoBajoStockComponent, canActivate: [authGuard] },
  { path: 'venta', component: VentaComponent, canActivate: [authGuard] },
  { path: 'listar-venta', component: ListarVentaComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'cierre-caja', component: CierreCajaComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
