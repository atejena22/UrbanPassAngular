import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHouse } from 'src/Interface/IHouse';

@Injectable({
  providedIn: 'root'
})
export class CasaService {
  private url='http://192.168.100.10/api/House';
  private urlUrban='http://192.168.100.10/api/House/urban';
  private urlUser='http://192.168.100.10/api/House/user';
  private urlUserUrban='http://192.168.100.10/api/House/UserUrban';

  
//userName

  constructor(private http:HttpClient) { }

  getUser():Observable<any>{
    return this.http.get<any>(this.urlUser);
  }

  getUserUrban(id:Number):Observable<any>{
    return this.http.get<any>(`${this.urlUserUrban}/${id}`);
  }

  getUrban():Observable<any>{
    return this.http.get<any>(this.urlUrban);
  }

  getHouse(id: number):Observable<any>{/*LISTAR TODAS LAS CASAS DE UNA URBANIZACION*/
    return this.http.get<any>(`${this.url}/${id}`);
  }

  get ():Observable<any> {/*PARA ADMIN*/
    return this.http.get<any>(this.url);
  }

  postDomicilio(house:IHouse):Observable<any>{
    return this.http.post<any>(this.url,house);
  }

  put(house:IHouse):Observable<any>{
    return this.http.put<any>(this.url,house);
  }










  private urlGarita='http://192.168.100.10/api/garita';
  getGarita(id: number):Observable<any>{
  return this.http.get<any>(`${this.urlGarita}/${id}`);
}
  getGaritaGeneral():Observable<any>{
  return this.http.get<any>(this.urlGarita);
}




}
