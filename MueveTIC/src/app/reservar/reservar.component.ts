import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { Car,Motorcycle,Scooter,Booking } from '../interfaces';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['../user/user.component.css']
})
export class ReservarComponent {

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

    /*Sacar la media de la lista*/
    getMean(model:string,rating_list: any[]):number{
      this.puntuacion =0;
      for(let rating of rating_list){
        if(rating.model == model){
          this.puntuacion = rating.mean;
        }
      }
      return this.puntuacion;

}

  fillStars(index: number, model: string, rating_list:any[]) {
    this.getMean(model,rating_list)
    if (this.puntuacion == null) {
      return {};
    }
  
    return {
      'star-activa': index < this.puntuacion,
      'star-unfilled': index >= this.puntuacion,
    };
  }

  makeBooking(index:number, model:string, licensePlate:string){
    swal.fire({
      title: 'Reservar Vehículo',
      text: '¿Está seguro de que quiere reservar el vehículo: ' + model + ' con matrícula: ' + licensePlate + '.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor:'#79ed83',
      showCancelButton:true,
      cancelButtonColor:'#fa5050',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        let info = {
          email: sessionStorage.getItem('email'),
          licensePlate: licensePlate,
        };

        /*PETICIÓN RESERVA*/
        this.userService.createBooking(info).subscribe({
          next: (respuesta: any) => {
            swal.fire({
              title: 'Reserva Realizada',
              text: 'Reserva Realizada para el vehículo: ' + model + ' con matrícula: ' + licensePlate + '.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then((result)=>{
              if(result.isConfirmed){
                this.count_active_booking=1;
                this.obtenerReservaActiva();
                }});
                /*La cargas por si acaso no le diera a aceptar en la alerta*/
                this.count_active_booking=1;
                this.obtenerReservaActiva();

          },

          error: (error) => {
            swal.fire({
              title: 'Error',
              text: error.error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });

      }})
    }
  })

}

obtenerReservaActiva(){
  this.userService.consultUserBooking().subscribe({
    next: (response) => {
      this.matricula = response.vehicle.licensePlate;
      this.modelo = response.vehicle.model;
      this.estado = "Activa"
      this.fechaReserva = response.date;
      if (this.matricula == undefined){
        swal.fire('Información', 'Actualmente no tiene ninguna reserva activa. Reserva primero uno de nuestros vehículos', 'info');
      }
    },
    error: (error) => {
      swal.fire('Error', error, 'error');
    },
  });
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
