import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/app.routes'; // Ajusta la ruta si está dentro de la carpeta app
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), // Importar el módulo de HTTP
    importProvidersFrom(BrowserAnimationsModule), // Asegúrate de no duplicarlo
    provideRouter(routes), // Definir las rutas
  ],
})
  .catch((err) => console.error(err));
