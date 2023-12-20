import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { Car,Motorcycle,Scooter,Booking } from '../interfaces';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  customData: any;
  showVehiculosComponent = false;
  showReservaActivaComponent = false;
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
    this.menu='home';
  }
  showVehiculos() {
    this.showHistorialComponent = false;
    this.showPerfilComponent = false;
    this.showReservaActivaComponent = false;
    this.showVehiculosComponent = true;
  }
  showHistorial() {
    this.showVehiculosComponent = false;
    this.showPerfilComponent = false;
    this.showReservaActivaComponent = false;
    this.showHistorialComponent = true;
  }
  showReservaActiva(){
    this.showVehiculosComponent = false;
    this.showHistorialComponent = false;
    this.showPerfilComponent = false;
    this.showReservaActivaComponent = true;
  }
  showPerfil(){
    this.showVehiculosComponent = false;
    this.showReservaActivaComponent = false;
    this.showHistorialComponent = false;
    this.showPerfilComponent = true;
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

  changeMenu(opcion: string) {
    this.menu = opcion;
    if (opcion == 'reserva_activa') {
      this.showReservaActiva();
    }else if(opcion == 'perfil'){
      this.showPerfil();
    }

}
  back(){
   this.menu='home';
  }

    getNameUser(email:string){
      const userName= email.split('@');
      return userName[0];
    }

    logout(){
      swal.fire({
        title: 'Cerrar Sesión',
        text: '¿Está seguro de que quiere cerrar sesión?',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor:'#79ed83',
        showCancelButton:true,
        cancelButtonColor:'#fa5050',
        cancelButtonText:'Cancelar'
      }).then((result)=>{
        if(result.isConfirmed){
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }})


    }

}

