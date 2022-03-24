import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/Interface/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 private urlUsuario ='http://192.168.100.10/api/User';
 private urlUsuarioPut ='http://192.168.100.10/api/User/activar';
 private urlUsuarioPutCompleto ='http://192.168.100.10/api/User/actualizarUsuario';
 private urlGenerarNuevoUsuario ='http://192.168.100.10/api/User/generarUsuario';

 private urlRol ='http://192.168.100.10/api/User/rol';

 private urlUpLoadService ='http://192.168.100.10/api/House/UploadFile';

 private urlResetPassword='http://192.168.100.10/api/User/resetPassword';

 
  constructor(private http:HttpClient) { }

  /*-uploadImage(vals:any): Observable<any>{
    let data= vals;
    return this.http.post(this.urlUpLoadService,data)
}*/

uploadImage(formData:any) {
  return this.http.post(this.urlUpLoadService, formData);
}

  
  getrol():Observable<any>{
    return this.http.get<any>(this.urlRol);
  }

  getUsuarioActual(id: number):Observable<any>{
    return this.http.get<any>(`${this.urlUsuario}/${id}`);
  }

  getUsuario():Observable<any>{
    return this.http.get<any>(this.urlUsuario);
  }

  generarNuevoUsuario(usuario:IUsuario):Observable<any>{
    return this.http.post(this.urlGenerarNuevoUsuario,usuario);
  }
  

  putUsuario(usuario: any):Observable<any>{
    return this.http.put<any>(this.urlUsuarioPut,usuario);
  }

  actualizarUsuarioCompleto(usuario: any):Observable<any>{
    return this.http.put<any>(this.urlUsuarioPutCompleto,usuario);
  }

  

  resetPassword(usuario: any):Observable<any>{
    return this.http.put<any>(this.urlResetPassword,usuario);
  }


}
