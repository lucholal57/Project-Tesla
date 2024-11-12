import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tesla-client-new';// Asegúrate de que esta función esté evaluando correctamente el estado de la aplicación
  shouldShowSidebar(): boolean {
    // Lógica para ocultar el sidebar en el login
    return !window.location.pathname.includes('/login');
  }
}
