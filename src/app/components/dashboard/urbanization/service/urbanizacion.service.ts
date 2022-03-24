import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUrbanization } from 'src/Interface/IUrbanization';

@Injectable({
  providedIn: 'root'
})
export class UrbanizacionService {

  private url='http://192.168.100.10/api/Urbanization';

  constructor(private http:HttpClient) { }

  getUrbanization(id: number):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`);
  }

  get ():Observable<any> {
    return this.http.get<any>(this.url);
  }

  add(urbanization:IUrbanization):Observable<any>{
    return this.http.post(this.url,urbanization);
  }

  actualizarUrbanization(urbanization:IUrbanization):Observable<any>{
    return this.http.put(this.url,urbanization);
  }





}
