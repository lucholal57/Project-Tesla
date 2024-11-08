import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tesla-client';
  constructor(private router: Router) {}
  shouldShowSidebar(): boolean {
    return this.router.url !== '/login'; // Cambia '/login' por la ruta de tu página de login
  }
}
