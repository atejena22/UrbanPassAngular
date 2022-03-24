import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NotificacionService } from '../../service/notificacion.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
 /* template: `
    <ul>
      <li *ngFor="let item of collection | paginate: { itemsPerPage: 10, currentPage: p }"> ... </li>
    </ul>

    <pagination-controls (pageChange)="p = $event"></pagination-controls>
    `*/
})
export class ActividadesComponent implements OnInit {

  constructor(private _notificacionService:NotificacionService) { }


  ngOnInit(): void {
    this.objetoLogueado= JSON.parse(localStorage.getItem('usuario')!);
    this.listarActividad();
  }

  listActividad :any 
  datoUsuario!: any;
  objetoLogueado: any

  listarActividad(){
   // this.datoUsuario = JSON.parse(localStorage.getItem('objetocompleto')!);
  //  this._notificacionService.getNotificacion(this.datoUsuario.houses.houseList[0].urbanizationID).subscribe(venta =>{
    /*this._notificacionService.getNotificacion(1).subscribe(venta =>{

    //  console.log(venta);
       this.listActividad=venta;
     })*/

    if(this.objetoLogueado.roleID===1){/*ADMIN General VE TODO*/
      this._notificacionService.getNotifiGeneral().subscribe(notificaGeneral =>{
        this.listActividad=notificaGeneral;
      });
  }
  else if(this.objetoLogueado.roleID===2){/*Admin de Urbanizacion*/
    this._notificacionService.getNotificacion(this.objetoLogueado.urbanizationId).subscribe(notificacion =>{
       this.listActividad=notificacion;
     });
  }

  }





}
