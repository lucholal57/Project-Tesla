// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProductoComponent } from './component/producto/producto.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { ListarCategoriaComponent } from './component/listarCategoria/listarCategoria.component';
import { ListarProductoComponent } from './component/listarProducto/listarProducto.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cargar-productos', component: ProductoComponent, canActivate: [authGuard] },
  { path: 'cargar-categorias', component: CategoriaComponent, canActivate: [authGuard] },
  { path: 'listar-categorias', component: ListarCategoriaComponent, canActivate: [authGuard] },
  { path: 'listar-productos', component: ListarProductoComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
