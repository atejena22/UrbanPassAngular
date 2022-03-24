import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IUrbanization } from 'src/Interface/IUrbanization';
import { IUsuario } from 'src/Interface/IUsuario';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { UrbanizacionService } from '../service/urbanizacion.service';

@Component({
  selector: 'app-crud-urbanizacion',
  templateUrl: './crud-urbanizacion.component.html',
  styleUrls: ['./crud-urbanizacion.component.css']
})
export class CrudUrbanizacionComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading!: boolean;
  private unsubscribe: Subscription[] = [];

  form: FormGroup;
  isTrue!: boolean;

  fileName: any[]=[];
  files: File[] = [];


  constructor(private cdr: ChangeDetectorRef,private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public element: any, private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private _urbanizacionService: UrbanizacionService) {
    this.form=this.fb.group({
      urbanizationId:[''],
      urbanization:[''],
      contactNumber:[''],
      contactEmail:[''],
      contactName:[''],
      active:[''],
      activeDesde:[''],
      activeHasta:[''],
      ruc:[''],
      city:[''],
      country:[''],
      Image:[''],
      
     })

  }





  ngOnInit(): void {
    this.setearDatos();
  }



  setearDatos() {
    if (this.element != null) {
      if (this.element.active === true) {
        this.isTrue = true;
      } else {
        this.isTrue = false;
      }
      console.log(this.element);
      this.form.setValue({
        urbanizationId:this.element.urbanizationId,
        urbanization: this.element.urbanization1,
        contactNumber: this.element.contactNumber,
        contactEmail: this.element.contactEmail,
        contactName: this.element.contactName,
        active:this.isTrue,
        activeDesde: this.element.activeFrom,
        activeHasta: this.element.activeTo,
        ruc: this.element.ruc,
        city: this.element.city,
        country: this.element.country,
        Image:this.element.image
      });
    }
  }




  saveSettings() {
  if (this.element === null) {
    if (this.form.get('active')?.value === true) {
      this.isTrue = true;
    } else {
      this.isTrue = false;
    }
    let imagenn:string;
    if(this.fileName[0]==undefined){
      imagenn="";
    }else{
      imagenn=this.fileName[0].mensaje;
    }
    let urbanizacion: IUrbanization;
    urbanizacion = {
      urbanizationId:0,
      urbanization1:this.form.value.urbanization,
      contactNumber: this.form.value.contactNumber,
      contactEmail: this.form.value.contactEmail,
      contactName:  this.form.value.contactName,
      active:this.isTrue,
      activeFrom: this.form.value.activeDesde,
      activeTo: this.form.value.activeHasta,
      ruc: this.form.value.ruc,
      city:this.form.value.city,
      country: this.form.value.country,
      image:imagenn   
    }
    console.log(urbanizacion);
    this._urbanizacionService.add(urbanizacion).subscribe(urbanizacion => {
      this.form.reset();
      this._snackBar.open('La Urbanización Usuario se ha Registrado con Éxito', '', { duration: 2500 });
    }, error => {
      this._snackBar.open('Error de Conexión', "", { duration: 2500 });
      console.log(error);
    }
    );
  }
  else
    if (this.element != null) {
      if (this.form.get('active')?.value === true) {
        this.isTrue = true;
      } else {
        this.isTrue = false;
      }
     
      let urbanizacion: IUrbanization;
      let imag ;
      if(this.fileName[0]==undefined){
        imag = this.form.value.Image;
      }
      else{
        imag=this.fileName[0].mensaje;
      }
      urbanizacion = {
      urbanizationId:this.form.value.urbanizationId,
      urbanization1:this.form.value.urbanization,
      contactNumber: this.form.value.contactNumber,
      contactEmail: this.form.value.contactEmail,
      contactName:  this.form.value.contactName,
      active:this.isTrue,
      activeFrom: this.form.value.activeDesde,
      activeTo: this.form.value.activeHasta,
      ruc: this.form.value.ruc,
      city:this.form.value.city,
      country: this.form.value.country,
      image:imag
    }
      this._urbanizacionService.actualizarUrbanization(urbanizacion).subscribe(urbanizacion => {
        if(urbanizacion.exito==1){
          this._snackBar.open(urbanizacion.mensaje, '', { duration: 2500 });
        }else{
          this._snackBar.open(urbanizacion.mensaje, '', { duration: 2500 });
        }
        
      }, error => {
        this._snackBar.open(error, '', { duration: 2500 });
      });
    }


}

onSelect(event: any) {
  this.files.push(...event.addedFiles);
  const data = new FormData();
  data.append('', this.files[0]);
  this._usuarioService.uploadImage(data).subscribe(response => {
    this.fileName[0]=response;
  });
}

onRemove(event: any) {
  this.files.splice(this.files.indexOf(event), 1);
}



}
  

