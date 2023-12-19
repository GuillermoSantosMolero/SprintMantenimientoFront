import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { Car,Motorcycle,Scooter,Booking } from '../interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reservas-activas',
  templateUrl: './reservas-activas.component.html',
  styleUrl: '../user/user.component.css'
})
export class ReservasActivasComponent {
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
  maxCharacters: number = 50;
  tooltipText: string = '';
  updateTooltip(): void {
    const remaining = this.remainingCharacters;
    this.tooltipText =
      remaining >= 0
        ? `Caracteres restantes: ${remaining}`
        : `Excedido por ${Math.abs(remaining)} caracteres (Max ${this.maxCharacters})`;
  }

  get remainingCharacters(): number {
    return this.maxCharacters - (this.comentario?.length ?? 0);
  }


  saveReserva(){
    if (this.matricula == null) {
      swal.fire('Error', 'No hay ninguna reserva activa. Reserva primero uno de nuestros vehículos', 'error');
      this.menu = 'reservar';
      return;
    }
    swal.fire({
      title: '¿Estás seguro?',
      text: 'Va a finalizar la reserva. Para finalizar el procedimiento, debe dejar una puntuación al servicio y opcionalmente un comentario.Al guardar valoración,la reserva se dará por finalizada',
      icon: 'warning',
      confirmButtonColor:'#79ed83',
      showCancelButton:true,
      cancelButtonColor:'#fa5050',
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar',
    })
    .then((result) => {
      if(result.isConfirmed){
        this.puntuacionReservaActiva=0;
        this.puntuacion=0;
        this.mostrarFormValoracion = true;
      }
    });

  }

  anularReserva() {
    if (this.matricula == null) {
      swal.fire('Error', 'No hay ninguna reserva activa. Reserva primero uno de nuestros vehículos', 'error');
      this.menu = 'reservar';
      return;
    }

    swal.fire({
      title: '¿Estás seguro?',
      text: 'Va a anular la reserva. Esta acción no se puede deshacer',
      icon: 'warning',
      confirmButtonColor: '#79ed83',
      showCancelButton: true,
      cancelButtonColor: '#fa5050',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.userService.cancelUserBooking().subscribe({
          next: () => {
            swal.fire('Reserva anulada', 'Reserva anulada con éxito', 'success');
            this.resetReservaActiva();
            this.menu = 'home';
            this.count_active_booking=0;
          },
          error: (error) => {
            swal.fire('Error', error.error, 'error');
          },
        });
      }
    });
  }
  
  back(){
    this.menu='home';
   }

  resetReservaActiva() {
    this.matricula = undefined;
    this.modelo = undefined;
    this.estado = undefined;
    this.fechaReserva = undefined;
    this.comentario = undefined;
    this.puntuacionReservaActiva=0;
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

  confirmReserva(){
    if (this.puntuacionReservaActiva == 0) {
      swal.fire('Error', 'Debe puntuar el servicio', 'error');
      return;
    }
    if (this.comentario == null){
      this.comentario = ' ';
    }
    if (this.comentario.length > 50) {
      swal.fire('Error', 'El comentario no puede exceder los 50 caracteres', 'error');
      return;
    }
    let info = {
      email: sessionStorage.getItem('email'),
      rating: this.puntuacionReservaActiva,
      comment: this.comentario,
    };
    this.userService.confirmReserva(info).subscribe({
      next: () => {
        swal.fire('Reserva finalizada', 'Reserva finalizada con éxito', 'success');
        this.menu = 'home';
        this.count_active_booking=0;
        this.resetReservaActiva();
        this.mostrarFormValoracion = false;
      },
      error: (error) => {
        swal.fire('Error', error.error, 'error');
      },
      },
    );
  }

  updateLists(){
    this.userService.getCars().subscribe(
      respuesta=>{
        this.cars_list=respuesta;
      }
    )
    this.userService.getMotorcycles().subscribe(
      respuesta=>{
        this.motorcycle_list=respuesta;
      }
    )
  
    this.userService.getScooters().subscribe(
      respuesta=>{
        this.scooters_list=respuesta;
      }
    )
    this.userService.getBookings(sessionStorage.getItem('email')).pipe(
      map(respuesta => {
        // Mapear la respuesta cambiando el número por una cadena
        return respuesta.map((booking: Booking) => {
          if (booking.state === 0) {
            booking.statechange = 'Cancelada';
            console.log("adios")
          } else if (booking.state === 1) {
            console.log("hola")
            booking.statechange = 'Activa';
          } else if (booking.state === 2) {
            console.log("yepa")
            booking.statechange = 'Histórica';
          }
          return booking;
        });
      })
    ).subscribe(mappedRespuesta => {
      // Asigna la respuesta mapeada a la lista
      this.booking_list = mappedRespuesta;
    });
  
  
    this.userService.consultRatingCar().subscribe(
      respuesta=>{
        this.ratingCar_list=respuesta;
      }
    )
    this.userService.consultRatingMotorcycle().subscribe(
      respuesta=>{
        this.ratingMoto_list=respuesta;
      }
    )
    this.userService.consultRatingScooter().subscribe(
      respuesta=>{
        this.ratingScooter_list=respuesta;
      }
    )
  }
}
