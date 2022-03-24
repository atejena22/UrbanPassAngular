import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceloginService } from "src/app/components/login/servicelogin.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private loginservice:ServiceloginService){}

    intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
       const usuario= this.loginservice.usuarioData;

       if(usuario){
        request=request.clone({
            setHeaders:{
                Authorization: `Bearer ${usuario.token}` 
            }
        });
       }
       return next.handle(request);


    }







}