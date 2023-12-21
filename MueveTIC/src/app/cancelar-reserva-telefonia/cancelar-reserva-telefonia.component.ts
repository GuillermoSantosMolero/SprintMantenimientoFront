import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { TelefoniaService } from '../telefonia.service';

@Component({
  selector: 'app-cancelar-reserva-telefonia',
  templateUrl: './cancelar-reserva-telefonia.component.html',
  styleUrls: ['../register/register.component.css']
})
export class CancelarReservaTelefoniaComponent {
  matricula = '';

  constructor(private router: Router,private telefoniaService : TelefoniaService, private http:HttpClient){

  }
  cancelar(){
    let info= {
      licensePlate: this.matricula
    }
    this.telefoniaService.cancelar(info).subscribe({
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
      title: 'Cancelación correcta!',
      text: 'Se ha cancelado la reserva correctamente',
      confirmButtonText: 'Aceptar'
    });
  }
}
