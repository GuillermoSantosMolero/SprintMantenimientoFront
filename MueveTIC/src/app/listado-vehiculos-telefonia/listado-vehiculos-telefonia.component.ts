import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TelefoniaService } from '../telefonia.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-listado-vehiculos-telefonia',
  templateUrl: './listado-vehiculos-telefonia.component.html',
  styleUrl: '../admin/admin.component.css'
})
export class ListadoVehiculosTelefoniaComponent {
  vehiculoEstado:any[]=[];
  constructor(private router: Router,private telefoniaService : TelefoniaService, private http:HttpClient) {
    this.showVehiculos();
  }
  showVehiculos(){
    this.telefoniaService.consultAllVehicles().subscribe(
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
