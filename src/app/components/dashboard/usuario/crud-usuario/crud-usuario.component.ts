import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { IUsuario } from 'src/Interface/IUsuario';
import { CasaService } from '../../casa/casa.service';
import { UploadService } from '../service/upload.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.css'],
  providers: [UploadService]
})

export class CrudUsuarioComponent implements OnInit {

  form: FormGroup;
  isTrue!: boolean;
  rolUrbanizationHabilitar!: boolean;
  objetoLogueado: any

  rol!: number
  urbaniza!: number

  sImage="http://192.168.100.10/images/";
  listRol: any[] = [''];
  listUrban: any[]=[''];

   fileName: any[]=[];
   files: File[] = [];

  //fileName: any;

  constructor(private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _uploadService: UploadService,
    @Inject(MAT_DIALOG_DATA) public element: any, private _HouseService: CasaService,
    private _snackBar: MatSnackBar,) {

    this.form = this.fb.group({
      userId: [''],
      roleID: [''],
      email: ['',[Validators.required,Validators.email]],
      userName: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      active: [''],
      activeFrom: ['',Validators.required],
      activeTo: ['',Validators.required],
      image:[''],
      urbanizationId:['']
    })
  }


  //#region Setear Datos
  setearDatos() {
    if (this.element != null) {
      if (this.element.active === true) {
        this.isTrue = true;
      } else {
        this.isTrue = false;
      }
      console.log(this.element);
      this.form.setValue({
        userId: this.element.userId,
        roleID: this.element.roleId,
        email: this.element.email,
        userName: this.element.userName,
        firstName: this.element.firstName,
        lastName: this.element.lastName,
        active: this.isTrue,
        activeFrom: this.element.activeFrom,
        activeTo: this.element.activeTo,
        image:this.element.image,
        urbanizationId:this.element.urbanizationId
      });
    }
  }
  //#endregion

  ngOnInit(): void {
    this.objetoLogueado = JSON.parse(localStorage.getItem('usuario')!);
    if (this.objetoLogueado.roleID === 1) {
      this.rolUrbanizationHabilitar = true;
      this.getRol();
      this.getUrbanizacion();
    }
    else if (this.objetoLogueado.roleID === 2) {
      this.rolUrbanizationHabilitar = false;
    }

    this.setearDatos();
  }



  getRol() {
    this._usuarioService.getrol().subscribe(Rol => {
      this.listRol = Rol.data;
    })
  }

  getUrbanizacion(){
   // if(this.objetoLogueado.roleID===1){
      this._HouseService.getUrban().subscribe(urban=>{
        this.listUrban=urban;
      });
   // }
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
 


  //#region Guardar y Editar Usuario
  saveSettings() {
        if (this.element === null) {
          if (this.form.get('active')?.value === true) {
            this.isTrue = true;
          } else {
            this.isTrue = false;
          }
    
          if(this.objetoLogueado.roleID===1){
               this.rol = parseInt(this.form.value.roleID);
               this.urbaniza=parseInt(this.form.value.urbanizationId);
          }else if(this.objetoLogueado.roleID===2){
               this.rol =3;
               this.urbaniza=this.objetoLogueado.urbanizationId;
          }
          
          let imagenn:string;
          if(this.fileName[0]==undefined){
            imagenn="";
          }else{
            imagenn=this.fileName[0].mensaje;
          }

          let persona: IUsuario;
          persona = {
            UserId: 0,
            RoleId: this.rol,//this.form.value.roleID,
            Email: this.form.value.email,
            UserName: this.form.value.userName,
            FirstName: this.form.value.firstName,
            LastName: this.form.value.lastName,
            lastLogin: this.form.value.lastLogin,
            Active: this.isTrue,
            activeFrom: this.form.value.activeFrom,
            activeTo: this.form.value.activeTo,
            image: imagenn//this.fileName[0].mensaje,
            // UserParentId:this.form.value.userParentID,
            ,urbanizationId: this.urbaniza
          }
          console.log(persona);
          this._usuarioService.generarNuevoUsuario(persona).subscribe(usuario => {
            this.form.reset();
            this._snackBar.open('El Usuario se ha Registrado con Éxito', '', { duration: 2500 });
          }, error => {
            this._snackBar.open('Error de Conexión', "", { duration: 2500 });
          }
          );
        }
        else
          if (this.element.userId > 0) {
            let persona: IUsuario;
            let imag ;
            if(this.fileName[0]==undefined){
              imag = this.form.value.image;
            }
            else{
              imag=this.fileName[0].mensaje;
            }
            persona = {
              UserId: this.form.value.userId,
              RoleId:parseInt(this.form.value.roleID),
              Email: this.form.value.email,
              UserName: this.form.value.userName,
              FirstName: this.form.value.firstName,
              LastName: this.form.value.lastName,
              lastLogin: this.form.value.lastLogin,
              Active: this.isTrue,
              activeFrom: this.form.value.activeFrom,
              activeTo: this.form.value.activeTo,
              image:imag// this.fileName[0].mensaje//this.form.value.image //this.fileName[0].mensaje,
             ,urbanizationId:parseInt(this.form.value.urbanizationId)
            }
            this._usuarioService.actualizarUsuarioCompleto(persona).subscribe(usuario => {
              console.log(usuario)
              this._snackBar.open('El Usuario se ha actualizado con Éxito', '', { duration: 2500 });
            }, error => {
              this._snackBar.open('Error de Conexión', "", { duration: 2500 });
              console.log(error);
            });
          }
    
  }
  //#endregion






}

