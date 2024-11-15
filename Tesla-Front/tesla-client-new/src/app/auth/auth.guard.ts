import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../servicio/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('Usuario autenticado, accediendo a la ruta');
    return true;
  } else {
    console.log('Usuario no autenticado, redirigiendo al login');
    router.navigate(['/login']);
    return false;
  }
};
