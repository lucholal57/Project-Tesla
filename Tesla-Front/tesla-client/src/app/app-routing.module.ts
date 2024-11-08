import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProductoComponent } from './component/producto/producto.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { ListarCategoriaComponent } from './component/listarCategoria/listarCategoria.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cargar-productos', component: ProductoComponent },
  { path: 'cargar-categorias', component: CategoriaComponent },
  { path: 'listar-categorias', component: ListarCategoriaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
