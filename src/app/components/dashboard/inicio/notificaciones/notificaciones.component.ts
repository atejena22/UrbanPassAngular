import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
//import { parse } from 'path';
import { CrudNotificationComponent } from '../crud-notification/crud-notification.component';
import { NotificacionService } from '../service/notificacion.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  objetoLogueado:any;
  
  constructor(private _notificacionService:NotificacionService,
    public dialog : MatDialog,
    private router:Router) {
    
  }

  ngOnInit(): void {
    this.objetoLogueado= JSON.parse(localStorage.getItem('usuario')!);
      if(this.objetoLogueado.roleID==5){
      this.router.navigate(['dashboard/pagenotfound']);
      }
    this.listarNotificacion();
  }

  displayedColumns: string[] = ['id', 'titulo','fechaEstablecida','tiempo','notas','accion'];
  datasource:any
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  listNotificacion:any []=[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }


  listarNotificacion(){
    if(this.objetoLogueado.roleID==1){/*ADMIN General VE TODO*/
        this._notificacionService.getNotifiGeneral().subscribe(notificaGeneral =>{ console.log(notificaGeneral);
          this.listNotificacion=notificaGeneral;
          this.datasource=new MatTableDataSource(this.listNotificacion);
           this.datasource.paginator=this.paginator;
        });
    }
    else if(this.objetoLogueado.roleID===2){/*Admin de Urbanizacion*/
      this._notificacionService.getNotificacion(this.objetoLogueado.urbanizationId).subscribe(notificacion =>{
         this.listNotificacion=notificacion;
         this.datasource=new MatTableDataSource(this.listNotificacion);
         this.datasource.paginator=this.paginator;
       });
    }

    

  }


  openDialogRegistrarNotificacion() {
    const dialogo=this.dialog.open(CrudNotificationComponent,{
      width:'100%',
    })
    dialogo.afterClosed().subscribe(result => {
    this.listarNotificacion();
    });  
  }


  EditarNotificacion(element : any) {
    const dialogo=this.dialog.open(CrudNotificationComponent,{
      width:'100%',data:element
    })
    dialogo.afterClosed().subscribe(result => {
      this.listarNotificacion();
    });  

  }





}
