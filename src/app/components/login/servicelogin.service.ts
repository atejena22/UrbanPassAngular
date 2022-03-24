import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IResponse } from 'src/Interface/IResponse';
import { usuarioLogin } from 'src/Interface/usuarioLogin';

const httOption={
  headers: new  HttpHeaders({
    'Context-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ServiceloginService {

//  private url = 'http://192.168.100.10/v1/Home/login';
public useri : Observable<usuarioLogin>

private usuarioSubject!: BehaviorSubject<usuarioLogin>;


private url = 'http://192.168.100.10/api/User/login';


public get usuarioData(): usuarioLogin{
  return this.usuarioSubject.value;
}

  constructor(private http:HttpClient,private router:Router) { 

    this.usuarioSubject=
    new BehaviorSubject<usuarioLogin>(JSON.parse(localStorage.getItem('usuario')!));
    this.useri=this.usuarioSubject.asObservable();

  }

  login(usuario:any):Observable<IResponse>{
    return this.http.post<IResponse>(this.url,usuario,httOption).pipe(
      map(res=>{
        if(res.exito === 1){
            const usuario : usuarioLogin = res.data;
            console.log(usuario);
            localStorage.setItem('usuario',JSON.stringify(usuario));
            this.usuarioSubject.next(usuario);
        }
        return res;

      })
    );
  }


  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null!);  
  }


HaveAcces(){
  /*var loggintoken= localStorage.getItem('usuario')||'';
  var _extractedtoken=loggintoken.split('.')[1];
  var _atobdata=atob(_extractedtoken);
  var _finaldata=JSON.parse(_atobdata);*/
 // this.nomusu=JSON.parse(localStorage.getItem('usuario')!);

  var _finaldata=JSON.parse(localStorage.getItem('usuario')!);
  if(_finaldata.roleID===1){
    console.log("Tienes acceso de Super admin");
    return true;
  }else if(_finaldata.roleID===2){
    console.log("Tienes acceso de Admin");
    return true;
  }else if(_finaldata.roleID===3){
    console.log("Tienes acces de User");
    return false;
  }
  else if(_finaldata.roleID===4){
    console.log("Tienes acces de Advanced User");
    return false;
  }else if(_finaldata.roleID===5){
    console.log("Tienes acces de Report User");
    return true;
  }
//pagenotfound
  //this.router.navigate(['paginanotfound']);
  //alert("tu no tienes acceso");
  //console.log("no tienes acceso");
return false
}


}



