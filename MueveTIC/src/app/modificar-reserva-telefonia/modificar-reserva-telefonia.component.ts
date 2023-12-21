import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { TelefoniaService } from '../telefonia.service';

@Component({
  selector: 'app-modificar-reserva-telefonia',
  templateUrl: './modificar-reserva-telefonia.component.html',
  styleUrls: ['../register/register.component.css','../user/user.component.css']
})
export class ModificarReservaTelefoniaComponent {
  matricula = '';
  puntuacion: number = 0;
  comentario = ''
  puntuacionReservaActiva: number = 0;
  constructor(private router: Router,private telefoniaService : TelefoniaService, private http:HttpClient){

  }
  modificar(){
    let info = {
      "licensePlate": this.matricula,
      "date": new Date().toISOString().slice(0, 10),
      "rating":this.puntuacion,
      "comment":this.comentario
    }
    this.telefoniaService.modificarReserva(info).subscribe({
      next: (response: any) => {
        this.showSuccessMessage();
      },
      error: (error: any) => {
        this.showErrorMessage(error.error.message);

    }
    });
  }
  private showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }

  private showSuccessMessage() {
    Swal.fire({
      icon: 'success',
      title: 'Reserva modificada!',
      text: 'Se ha modificado la reserva correctamente',
      confirmButtonText: 'Aceptar'
    });
  }
  obtenerClaseEstrella(index: number) {
    if (this.puntuacion == null) {
      return {};
    }
    return {
      'star-activa': index < this.puntuacion,
      'star-unfilled': index >= this.puntuacion,
    };
  }
}
