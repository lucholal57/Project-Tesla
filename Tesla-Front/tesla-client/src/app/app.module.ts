import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { ProductoComponent } from './component/producto/producto.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { ListarCategoriaComponent } from './component/listarCategoria/listarCategoria.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductoComponent,
    SidebarComponent,
    CategoriaComponent,
    ListarCategoriaComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
