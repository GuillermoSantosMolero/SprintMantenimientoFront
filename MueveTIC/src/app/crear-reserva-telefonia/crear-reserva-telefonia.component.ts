import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { TelefoniaService } from '../telefonia.service';

@Component({
  selector: 'app-crear-reserva-telefonia',
  templateUrl: './crear-reserva-telefonia.component.html',
  styleUrls: ['../register/register.component.css']
})
export class CrearReservaTelefoniaComponent {
  matricula = '';
  email = '';

  constructor(private router: Router,private telefoniaService : TelefoniaService, private http:HttpClient){

  }
  reservar(){
    let info = {
      "licensePlate": this.matricula,
      "email": this.email
    }
    this.telefoniaService.reservar(info).subscribe({
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
      title: 'Reserva correcta!',
      text: 'Se ha registrado la reserva correctamente',
      confirmButtonText: 'Aceptar'
    });
  }
}
