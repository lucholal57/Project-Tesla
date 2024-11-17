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


showLoadingMessage() {
  let timerInterval: any; // Declara timerInterval correctamente
  return Swal.fire({
    title: "Auto close alert!",
    html: "I will close in <b></b> milliseconds.",
    timer: 700,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup()?.querySelector("b"); // Usamos ? para evitar el null check
      if (timer) { // Verifica que `timer` no sea null
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      }
    },
    willClose: () => {
      clearInterval(timerInterval); // Asegúrate de limpiar el intervalo
    }
  }).then((result) => {
    // Read more about handling dismissals below
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
}

}
