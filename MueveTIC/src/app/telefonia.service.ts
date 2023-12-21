import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiBaseUrl } from './config';
@Injectable({
  providedIn: 'root'
})
export class TelefoniaService {

  constructor(private httpClient : HttpClient) { }

  consultBookings() : Observable<any>{
    
    return this.httpClient.get<any>(`${apiBaseUrl}/bookings/consultAllBookings`);
  
  }

  reservar(info:any){
    return this.httpClient.post<any>(`${apiBaseUrl}/operator/createBooking`,info)
   }
  cancelarReserva(email:any){
    
  }
}
