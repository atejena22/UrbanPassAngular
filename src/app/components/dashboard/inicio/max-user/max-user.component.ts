import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../service/notificacion.service';

@Component({
  selector: 'app-max-user',
  templateUrl: './max-user.component.html',
  styleUrls: ['./max-user.component.css']
})
export class MaxUserComponent implements OnInit {

  objetoLogueado: any;
  lstMaxUser: any[]=[];
  sImage="http://192.168.100.10/images/";


  constructor(private _service:NotificacionService) { }

  ngOnInit(): void {
    this.objetoLogueado = JSON.parse(localStorage.getItem('usuario')!);
    this.getMaxUser();
  }


  getMaxUser(){
    if(this.objetoLogueado.roleID == 1){
      this._service.getAccesUserMaxAdmin().subscribe(acces=>{
        console.log(acces);
        this.lstMaxUser=acces.data;
      });
    }
    else if(this.objetoLogueado.roleID == 2) {
      this._service.getAccesUserMax(this.objetoLogueado.urbanizationId).subscribe(acces=>{
        console.log(acces);
        this.lstMaxUser=acces.data;
      });
    }
    

  }



}
