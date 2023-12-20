import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { Car,Motorcycle,Scooter,Booking } from '../interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrl: '../user/user.component.css'
})
export class HistorialComponent {
  customData: any;
  showVehiculosComponent = false;
  showHistorialComponent = false;
  showPerfilComponent = false;
  matricula: string | undefined ;
  modelo: string | undefined;
  estado: string | undefined;
  fecha: string | undefined;
  selectedDay: number | undefined;
  selectedMonth: number | undefined;
  selectedYear: number | undefined;
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: string[] = [
    '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11', '12'
  ];
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: 70 }, (_, i) => this.currentYear - i - 16);

  comentario: string | undefined;
  puntuacion: number = 0;
  nombre: string | undefined;
  apellidos : string | undefined;
  correo: string | undefined;
  movil: string | undefined;
  dni: string | undefined;
  carne: string | undefined;
  fechaNacimiento: string | undefined;
  fechaReserva: string | undefined;
  contrasena: string | undefined;
  contrasenaLeida: string | undefined;
  puntuacionReservaActiva: number = 0;
  mostrarFormValoracion: boolean = false;

  cars_list: Car[] = [];
  motorcycle_list:Motorcycle[]=[];
  scooters_list:Scooter[]=[];
  booking_list:Booking[]=[];
  ratingCar_list:any[]=[];
  ratingMoto_list:any[]=[];
  ratingScooter_list:any[]=[];
  count_active_booking: number = 0;


  filter: string = '';
  menu: string = '';
  email: string = sessionStorage.getItem('email') ?? '';

  constructor(private router: Router,private userService : UserService, private http:HttpClient, private AdminService: AdminService){
    this.updateLists();
    this.menu='home';
  }
  updateLists(){
    this.userService.getBookings(sessionStorage.getItem('email')).pipe(
      map(respuesta => {
        // Mapear la respuesta cambiando el número por una cadena
        return respuesta.map((booking: Booking) => {
          if (booking.state === 0) {
            booking.statechange = 'Cancelada';
          } else if (booking.state === 1) {
            booking.statechange = 'Activa';
          } else if (booking.state === 2) {
            booking.statechange = 'Histórica';
          }
          return booking;
        });
      })
    ).subscribe(mappedRespuesta => {
      // Asigna la respuesta mapeada a la lista
      this.booking_list = mappedRespuesta;
    });
  }
}
