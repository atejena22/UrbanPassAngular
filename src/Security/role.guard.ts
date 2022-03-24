import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ServiceloginService } from "src/app/components/login/servicelogin.service";





@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate{
    
constructor(private service:ServiceloginService,private route:Router){

}

canActivate() {
    if(this.service.HaveAcces())
    return true;
    else{
            //alert("tu no tienes acceso");
            //this.route.navigate(['']);
            this.route.navigate(['dashboard/pagenotfound']);
            return false;
    }

}


}