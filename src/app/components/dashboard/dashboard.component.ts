import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceloginService } from '../login/servicelogin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  panelOpenState = false;

  isExpanded: boolean=false;
  expan: boolean=false;
  expanPersona: boolean=false;
  expanVenta: boolean=false;
  expanroles: boolean=false;
  
  showFiller = false;

  objetoLogueado : any 
  nombre : any 
  apellido:any
  email : any
  image : any
  sImage="http://192.168.100.10/images/";

  // nombreUsuario:any

    constructor(private _login:ServiceloginService,
      private _route:Router) { }
  
    ngOnInit(): void {
     // this.nombre=JSON.parse(localStorage.getItem('firstName')!);
     // this.apellido=JSON.parse(localStorage.getItem('lastName')!);
     /*this.objetoLogueado= JSON.parse(localStorage.getItem('usuario')!);
     if(this.objetoLogueado.roleID==5){
     this._route.navigate(['dashboard/garita']);
     }*/
     
     this.objetoLogueado= JSON.parse(localStorage.getItem('usuario')!);
      this.nombre=this.objetoLogueado.firstName;
      this.apellido=this.objetoLogueado.lastName;
      this.image=this.objetoLogueado.image;
      this.email=this.objetoLogueado.email;
    }
  
   /* logout(){
      //this._login.logout();
      localStorage.clear();
      this._route.navigate(['login'])
  
    }*/
    
  logout(){
    this._login.logout();
    this._route.navigate(['/login'])

  }


}
