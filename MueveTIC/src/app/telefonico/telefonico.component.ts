import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-telefonico',
  templateUrl: './telefonico.component.html',
  styleUrl: './telefonico.component.css'
})
export class TelefonicoComponent {
  showListaReservasUsuariosTelefoniaComponent = false;
  showCrearReservaComponent = true;
  menu: string = '';
  email: string = sessionStorage.getItem('email') ?? '';

  constructor(private router: Router,private userService : UserService, private http:HttpClient, private AdminService: AdminService){
    this.menu='home';
  }
  mostrarListaReservasUsuariosTelefoniaComponent(){
    this.showListaReservasUsuariosTelefoniaComponent = true;
    this.showCrearReservaComponent = false;
  }
  mostrarCrearReservaComponent(){
    this.showCrearReservaComponent = true;
    this.showListaReservasUsuariosTelefoniaComponent = false;
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
