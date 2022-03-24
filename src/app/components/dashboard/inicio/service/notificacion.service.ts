import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INotification } from 'src/Interface/INotification';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private url='http://192.168.100.10/api/Notification'
  private urlBuscarNotification='http://192.168.100.10/api/Notification'

  constructor(private http:HttpClient) { }

  getNotificacion(id: number):Observable<any>{
    return this.http.get<any>(`${this.urlBuscarNotification}/${id}`);
  }

  getNotifiGeneral():Observable<any>{/*ADMIN*/
    return this.http.get<any>(this.url);
  }

  postNotificacion(notificacion:INotification):Observable<any>{
    return this.http.post<any>(this.url,notificacion);
  }

  putNotificacion(notificacion:INotification):Observable<any>{
    return this.http.put<any>(this.url,notificacion);
  }
  



  private urlDonaChart='http://192.168.100.10/api/garita';
  private totaldona='/totaldona';
  private totaldonaAdmin='/totaldonaAdmin';


  getTotalDona(id: number):Observable<any>{// PARA ROL
    return this.http.get<any>(this.urlDonaChart+this.totaldona);
  }

  getTotalDonaAdmin():Observable<any>{// PARA Admin general
    return this.http.get<any>(this.urlDonaChart+this.totaldonaAdmin);
  }

  



  private urlMasAccesUser='http://192.168.100.10/api/garita/masAccesUser'; 
  getAccesUserMax(id:any):Observable<any>{
    return this.http.get<any>(this.urlMasAccesUser);
  }


  private urlmasAccesUserAdmin='http://192.168.100.10/api/garita/masAccesUserAdmin'; 
  getAccesUserMaxAdmin():Observable<any>{
    return this.http.get<any>(this.urlmasAccesUserAdmin);
  }



}
