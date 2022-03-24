import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INotification } from 'src/Interface/INotification';
import { CasaService } from '../../casa/casa.service';
import { NotificacionService } from '../service/notificacion.service';

@Component({
  selector: 'app-crud-notification',
  templateUrl: './crud-notification.component.html',
  styleUrls: ['./crud-notification.component.css']
})
export class CrudNotificationComponent implements OnInit {


  form!: FormGroup;
  datoUsuario!: any;
  objetoLogueado: any;
  listUrban:any[]=[''];
  UrbanHabilitar!:boolean;

  constructor(private _notificacionService:NotificacionService,private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public element: any, private _HouseService: CasaService,
    private _snackBar: MatSnackBar,) { 
    this.form=this.fb.group({
      id:[''],
      titulo:[''],
      fechaEstablecida:[''],
      notas:[''],
      urbanizationId:[''],
      tiempo:['']
   })

  }

  ngOnInit(): void {
    this.objetoLogueado= JSON.parse(localStorage.getItem('usuario')!);
    if(this.objetoLogueado.roleID===1){
      this.UrbanHabilitar=true;
      this.getUrban();
    }
    else if(this.objetoLogueado.roleID===2){
      this.UrbanHabilitar=false;
      this.getUrban()
    }

    this.setearDatos();
  }


  setearDatos() {
    if (this.element != null) {
      console.log(this.element);
      this.form.setValue({
        id: this.element.id,
        titulo: this.element.titulo,
        fechaEstablecida: this.element.fechaEstablecida,
        notas: this.element.notas,
        urbanizationId: this.element.urbanizationId,
        tiempo:this.element.tiempo
      });
    }
  }

  guardarNotificacion(){
    let urbaniza;
    //this.objetoLogueado= JSON.parse(localStorage.getItem('usuario')!);
    if(this.objetoLogueado.roleID===1){
      urbaniza=this.form.value.urbanizationId;
    }else{
      urbaniza=this.objetoLogueado.urbanizationId;
    }


    if (this.element === null) {
      let notificacion: INotification;
      notificacion = {
        id: 0,
        titulo: this.form.value.titulo,
        fechaEstablecida: this.form.value.fechaEstablecida,
        notas: this.form.value.notas,
        urbanizationId: urbaniza, //this.objetoLogueado.urbanizationId,
        tiempo:this.form.value.tiempo,
      }
      this._notificacionService.postNotificacion(notificacion).subscribe(notificacion => {
        this.form.reset();
        this._snackBar.open('La Notificación se ha Registrado con Éxito', '', { duration: 2500 });
      }, error => {
        this._snackBar.open('Error de Conexión'+error, "", { duration: 2500 });
      }
      );
    }
    else
      if (this.element != null) {
        let notificacion: INotification;
        notificacion = {
          id: this.form.value.id,
          titulo: this.form.value.titulo,
          fechaEstablecida: this.form.value.fechaEstablecida,
          notas: this.form.value.notas,
          urbanizationId: this.form.value.urbanizationId,
          tiempo:this.form.value.tiempo,
      }
        this._notificacionService.putNotificacion(notificacion).subscribe(notificacion => {
          this._snackBar.open('La Notificación se ha actualizado con Éxito', '', { duration: 2500 });
        }, error => {
          this._snackBar.open('Error de Conexión'+error, "", { duration: 2500 });
        });
      }

  }






  getUrban(){
    this._HouseService.getUrban().subscribe(urban=>{
      console.log(urban);
      this.listUrban=urban;
    });
}



}
