import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TelefoniaService } from '../telefonia.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-lista-reservas-usuarios-telefonia',
  templateUrl: './lista-reservas-usuarios-telefonia.component.html',
  styleUrl: '../admin/admin.component.css'
})
export class ListaReservasUsuariosTelefoniaComponent {
  vehiculoEstado:any[]=[];
  constructor(private router: Router,private telefoniaService : TelefoniaService, private http:HttpClient) {
    this.showBookings();
  }
  showBookings(){
    this.telefoniaService.consultBookings().subscribe(
      respuesta=>{
        this.vehiculoEstado=respuesta;
      }
    )
  }
  activar(idReserva: any){

  }
  cancelar(info: any){
    console.log(info);
    
  }
  finalizar(idReserva: any){
    
  }
}
