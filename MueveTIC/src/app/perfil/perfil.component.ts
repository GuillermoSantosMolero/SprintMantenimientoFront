import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { Car,Motorcycle,Scooter,Booking } from '../interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: '../user/user.component.css'
})
export class PerfilComponent {
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
    // this.updateLists();
    this.menu='home';
  }

  back(){
    this.menu='home';
   }
   deleteAccount(){
     let info = {
       email: sessionStorage.getItem('email'),
     };
     this.userService.deleteUser(info).subscribe({
       next: () => {
         swal.fire('Cuenta eliminada', 'Cuenta eliminada con éxito', 'success');
         this.router.navigate(['/login']);
       },
       error: (error) => {
         swal.fire('Error', error.error, 'error');
       },
   }
   );
   }
   updatePerfil() {
    if (!this.validateDNI(this.dni)) {
      swal.fire('Error', 'El DNI no tiene el formato correcto.Debe constar de 9 caracteres, siendo 8 números y una letra final', 'error');
      return;
    }

    if (!this.validatePhoneNumber(this.movil)) {
      swal.fire('Error', 'El número de teléfono no tiene el formato correcto. Deben ser 9 números', 'error');
      return;
    }
    if (!this.validateName(this.nombre)) {
      swal.fire('Error', 'El nombre no puede contener números', 'error');
      return;
    }

    if (!this.validateName(this.apellidos)) {
      swal.fire('Error', 'Los apellidos no pueden contener números', 'error');
      return;
    }

    if (!this.validatePassword(this.contrasena)) {
      swal.fire('Error', 'La contraseña no cumple con los requisitos.Debe tener una longitud de al menos 8 caracteres, 1 mayúscula, 1 número, una minúscula y un símbolo', 'error');
      return;
    }
    if (!this.validateBothLastNames(this.apellidos)) {
      swal.fire('Error', 'Por favor, introduce ambos apellidos', 'error');
      return;
    }
    if (this.contrasena !== this.contrasenaLeida) {
      let info = {
        email: this.correo,
        name: this.nombre,
        surname: this.apellidos,
        numberPhone: this.movil,
        dni: this.dni,
        carnet: this.carne,
        birthDate: `${this.selectedYear}-${String(this.selectedMonth)?.toString().padStart(2, '0')}-${String(this.selectedDay)?.toString().padStart(2, '0')}`,
        password: this.contrasena,
      };
      this.userService.updatePerfil(info).subscribe({
        next: () => {
          swal.fire('Perfil actualizado', 'Perfil actualizado con éxito', 'success');
        },
        error: (error) => {
          swal.fire('Error', error.error, 'error');
        },
      });
    } else {
      let info = {
        email: this.correo,
        name: this.nombre,
        surname: this.apellidos,
        numberPhone: this.movil,
        dni: this.dni,
        carnet: this.carne,
        birthDate: `${this.selectedYear}-${String(this.selectedMonth)?.toString().padStart(2, '0')}-${String(this.selectedDay)?.toString().padStart(2, '0')}`,
      };
      this.userService.updatePerfil(info).subscribe({
        next: () => {
          swal.fire('Perfil actualizado', 'Perfil actualizado con éxito', 'success');
        },
        error: (error) => {
          swal.fire('Error', error.error, 'error');
        },
      });
    }
  }

  validatePassword(password: string | undefined): boolean {
   return !(
      password &&
      (password.length < 8 || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password))
    );
  }


  validateDNI(dni: string | undefined): boolean {
    // Validar que el DNI tenga 8 números y 1 letra al final
    const regex = /^\d{8}[a-zA-Z]$/;
    return regex.test(dni ?? '');
  }

  validatePhoneNumber(phoneNumber: string | undefined): boolean {
    // Validar que el número de teléfono tenga 9 números
    const regex = /^\d{9}$/;
    return regex.test(phoneNumber ?? '');
  }
  validateName(name: string | undefined): boolean {
    // Permitir letras, espacios y tildes en el nombre
    const regex = /^[a-zA-Z\s\u00C0-\u00FF']+$/;
    return regex.test(name ?? '');
  }

  validateBothLastNames(apellidos: string | undefined): boolean {
    if (!apellidos) {
      return false;
    }

    const nombres = apellidos.trim().split(/\s+/); // Dividir por espacios

    return nombres.length >= 2;
  }
}
