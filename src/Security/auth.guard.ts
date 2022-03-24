import { Injectable } from "@angular/core";
import { Router,CanActivate,ActivatedRouteSnapshot } from "@angular/router";
import { ServiceloginService } from "src/app/components/login/servicelogin.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{


    constructor(private route:Router,
                private loginservice:ServiceloginService){


    }

      canActivate(route: ActivatedRouteSnapshot){
        const usuario= this.loginservice.usuarioData;
        if(usuario){
         return true;
        }
        this.route.navigate(['/login']);
        return false;
    }


}