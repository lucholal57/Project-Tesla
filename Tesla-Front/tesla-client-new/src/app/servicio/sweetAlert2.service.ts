import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlert2Service {

constructor() { }

 // Modificar el método para devolver una promesa
 showSuccessMessage(message: string, timer: number = 1500): Promise<void> {
  return Swal.fire({
    position: 'center',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: timer
  }).then(() => {
    // Se resuelve la promesa una vez que el mensaje se ha mostrado completamente
  });
}

showErrorMessage(title: string, text: string) {
  Swal.fire({
    icon: 'error',
    title: title,
    text: text
  });
}

showInfoMessage(title: string, text: string) {
  Swal.fire({
    icon: 'info',
    title: title,
    text: text
  });
}

showWarningMessage(title: string, text: string) {
  Swal.fire({
    icon: 'warning',
    title: title,
    text: text
  });
}

showConfirmMessage(title: string, text: string) {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  });
}

}
