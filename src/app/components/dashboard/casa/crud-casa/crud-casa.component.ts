import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { IHouse } from 'src/Interface/IHouse';
import { UrbanizacionService } from '../../urbanization/service/urbanizacion.service';
import { CrudUsuarioComponent } from '../../usuario/crud-usuario/crud-usuario.component';
import { CasaService } from '../casa.service';

@Component({
  selector: 'app-crud-casa',
  templateUrl: './crud-casa.component.html',
  styleUrls: ['./crud-casa.component.css']
})
export class CrudCasaComponent implements OnInit {
  form: FormGroup;
  objetoLogueado:any;
  UrbanHabilitar!:boolean;
  listUrban:any[]=[''];
  listUser:any[]=[];

 // protected banks: Bank[] = BAN/KS;

  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();

  @ViewChild('singleSelect') singleSelect!: MatSelect;
  //protected _onDestroy = new Subject<void>();

  public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);


  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder,
    private _HouseService: CasaService, public dialog : MatDialog,
    @Inject(MAT_DIALOG_DATA) public element: any,
    private _snackBar: MatSnackBar,) {
    this.form = this.fb.group({
      houseId: [''],
      urbanizationId: [''],
      userId: [''],
      mz: [''],
      villa: [''],
      phoneNumber: [''],
      notes: [''],
      fullAddress: [''],
    })
  }


  ngOnInit(): void {
    this.objetoLogueado= JSON.parse(localStorage.getItem('usuario')!);
    if(this.objetoLogueado.roleID===1){
      this.UrbanHabilitar=true;
      this.getUrbanizacionUser();
    }
    else if(this.objetoLogueado.roleID===2){
      this.UrbanHabilitar=false;
      this.getUrbanizacionUser()
    }

    this.setearDatos();


    this.bankCtrl.setValue(this.listUser);
    // load the initial bank list
    this.filteredBanks.next(this.listUser.slice());
    this.bankFilterCtrl.valueChanges
      .subscribe(() => {
        this.filterBanks();
      });
  }


  
  getUrbanizacionUser(){
    if(this.objetoLogueado.roleID===1){
      this._HouseService.getUrban().subscribe(urban=>{
        this.listUrban=urban;
      });
      this._HouseService.getUser().subscribe(user=>{
        this.listUser=user;
      });
    }else if(this.objetoLogueado.roleID===2){
      this._HouseService.getUserUrban(this.objetoLogueado.urbanizationId).subscribe(user=>{
        this.listUser=user.data;
      });
    }
      
      
  }


  protected filterBanks() {
    if (!this.listUser) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.listUser.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.listUser.filter(listUser => listUser.userName.toLowerCase().indexOf(search) > -1)
    );
  }






  //#region Setear Datos
  setearDatos() {
    if (this.element != null) {
      console.log(this.element);
      this.form.setValue({
        houseId: this.element.houseId,
        urbanizationId: this.element.urbanizationId,
        userId: this.element.userId,
        mz: this.element.mz,
        villa: this.element.villa,
        phoneNumber: this.element.phoneNumber,
        notes: this.element.notes,
        fullAddress: this.element.fullAddress,
      });
    }
  }
  //#endregion



  saveSettings() {
    this.objetoLogueado= JSON.parse(localStorage.getItem('usuario')!);

    if (this.element === null) {
      let house: IHouse;
      house = {
        houseId: 0,
        urbanizationId: this.objetoLogueado.urbanizationId, //this.form.value.urbanizationId,
        userId: this.form.value.userId,
        mz: this.form.value.mz,
        villa: this.form.value.villa,
        phoneNumber: this.form.value.phoneNumber,
        notes: this.form.value.notes,
        fullAddress: this.form.value.fullAddress,
      }
      console.log(house);
      this._HouseService.postDomicilio(house).subscribe(house => {
        console.log(house);
        this.form.reset();
        this._snackBar.open('El Domicilio se ha Registrado con Éxito', '', { duration: 2500 });
      }, error => {
        this._snackBar.open('Error de Conexión', "", { duration: 2500 });
        console.log(error);
      }
      );
    }
    else
      if (this.element != null) {
        let house: IHouse;
        house = {
        houseId: this.form.value.houseId,
        urbanizationId: this.form.value.urbanizationId,
        userId: this.form.value.userId,
        mz: this.form.value.mz,
        villa: this.form.value.villa,
        phoneNumber: this.form.value.phoneNumber,
        notes: this.form.value.notes,
        fullAddress: this.form.value.fullAddress,
      }
        this._HouseService.put(house).subscribe(house => {
          console.log(house)
          this._snackBar.open('El Domicilio se ha actualizado con Éxito', '', { duration: 2500 });
        }, error => {
          this._snackBar.open('Error de Conexión', "", { duration: 2500 });
          console.log(error);
        });
      }
  }





  openDialogRegistrarUsuario(){
    const dialogo=this.dialog.open(CrudUsuarioComponent,{
      width:'50%',
    })
    dialogo.afterClosed().subscribe(result => {
      this.getUrbanizacionUser();
    });  
  }


  

}

