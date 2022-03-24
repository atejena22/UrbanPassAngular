import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CrudCasaComponent } from '../../casa/crud-casa/crud-casa.component';
import { CrudUsuarioComponent } from '../crud-usuario/crud-usuario.component';
import { PopupResetPassswordComponent } from '../popup-reset-passsword/popup-reset-passsword.component';
import { UploadService } from '../service/upload.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css'],
})
export class ListarUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['userId','image','roleName','email','userName','firstName',
    'lastName','active','activeFrom','activeTo','lastLogin','accion',
  ];

  datasource: any;
  sImage="http://192.168.100.10/images/";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isChecked: boolean[] = [];

  listUsuario: any[] = [];

  form!: FormGroup;
  objetoLogueado: any;

  uploadImportarExcel!: boolean;

  isTrue!: boolean;

  constructor(private _usuarioService: UsuarioService,public dialog: MatDialog,private fb: FormBuilder,
              private router: Router,private _upload: UploadService,private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      active: [''],
    });
  }


  ngOnInit(): void {
    this.objetoLogueado = JSON.parse(localStorage.getItem('usuario')!);
    if (this.objetoLogueado.roleID == 5) {
      this.router.navigate(['dashboard/pagenotfound']);
    }
    this.get();
  }


  get() {
    if (this.objetoLogueado.roleID == 1) {
      this._usuarioService.getUsuario().subscribe((urban) => {
        console.log(urban);
        this.listUsuario = urban.data;
        this.datasource = new MatTableDataSource(this.listUsuario);
        this.datasource.paginator = this.paginator;
      });
    } else if (this.objetoLogueado.roleID == 2) {
      this._usuarioService.getUsuarioActual(this.objetoLogueado.urbanizationId).subscribe((urban) => {
          console.log(urban);
          this.listUsuario = urban.data;
          this.datasource = new MatTableDataSource(this.listUsuario);
          this.datasource.paginator = this.paginator;
        });
    }
   
  }



  putDesactivarUsuario() {
    this._usuarioService.putUsuario(this.form.value).subscribe((user) => {
    });
  }


  onChange(element: any) {
    // ESTE ES EL QUE ACTIVA O DESACTIVA DEL USUARIO DESDE EL ONN-OFF
    if (element.active === true) {
      this.isTrue = true;
    } else {
      this.isTrue = false;
    }
    const usu2: any = {
      userId: element.userId,
      active: this.isTrue,
    };
    this._usuarioService.putUsuario(usu2).subscribe((user) => {});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  setEditar(element: any) {
    const dialogo = this.dialog.open(CrudUsuarioComponent, {
      width: '100%',
      data: element,
    });
    dialogo.afterClosed().subscribe((result) => {
      this.get();
    });
  }

  openDialogRegistrarUsuario() {
    const dialogo = this.dialog.open(CrudUsuarioComponent, {
      width: '100%',
    });
    dialogo.afterClosed().subscribe((result) => { this.get();});
  }

  openVisibleExcel(){
    if(this.uploadImportarExcel){
      this.uploadImportarExcel=false;
    }else{
      this.uploadImportarExcel=true
    }
  }


  @ViewChild('fileInput') fileInput:any;
  uploadFile(){
    let formData = new FormData();  
    console.log(formData);
    formData.append('upload', this.fileInput.nativeElement.files[0])  
    console.log(formData);
    console.log(this.fileInput.nativeElement.files[0]);
    this._upload.postUploadExcel(formData).subscribe(result => {  
      console.log(result);
      this.snackBar.open('Se ha Importado con éxito su archivo de Excel', '', { duration: 2500 });
    });
    this.get();
    this.uploadImportarExcel=false;
  }




  ResetPassword(usuario : any){
    const dialogo=this.dialog.open(PopupResetPassswordComponent,{
      width:'500px',
    })
    dialogo.afterClosed().subscribe(s=>{
      if(s){
        this._usuarioService.resetPassword(usuario).subscribe(usuario=>{
          if(usuario.exito===1)
          {
            this.snackBar.open('La contraseña se reseteado con éxito','', { duration: 3500 });
          }
          else{
            this.snackBar.open(usuario.mensaje,'', { duration: 3500 });    
          } 
        })
      }
    })
  }






}
