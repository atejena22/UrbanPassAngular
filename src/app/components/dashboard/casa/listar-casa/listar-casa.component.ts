import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CrudUsuarioComponent } from '../../usuario/crud-usuario/crud-usuario.component';
import { CasaService } from '../casa.service';
import { CrudCasaComponent } from '../crud-casa/crud-casa.component';

@Component({
  selector: 'app-listar-casa',
  templateUrl: './listar-casa.component.html',
  styleUrls: ['./listar-casa.component.css']
})
export class ListarCasaComponent implements OnInit {

  displayedColumns: string[] = ['houseId', /*'urbanizationId'*/'urbanization1',/*'userId'*/'userName','mz','villa','phoneNumber','notes','fullAddress','accion'];
datasource:any

@ViewChild(MatPaginator) paginator!: MatPaginator;

listFactura:any []=[];
objetoLogueado: any

  constructor(private _casaService:CasaService,
              public dialog : MatDialog,
              private router:Router) { }

  ngOnInit(): void {
    this.objetoLogueado= JSON.parse(localStorage.getItem('usuario')!);
      if(this.objetoLogueado.roleID==5){
      this.router.navigate(['dashboard/pagenotfound']);
      }
    this.get();
  }

  get(){
    if(this.objetoLogueado.roleID==1){
      this._casaService.get().subscribe(venta =>{
        console.log(venta);
        this.listFactura=venta;
        this.datasource=new MatTableDataSource(this.listFactura);
        this.datasource.paginator=this.paginator;
      });
    }
    else if(this.objetoLogueado.roleID==2){
      this._casaService.getHouse(this.objetoLogueado.urbanizationId).subscribe(venta =>{
        console.log(venta);
        this.listFactura=venta;
        this.datasource=new MatTableDataSource(this.listFactura);
        this.datasource.paginator=this.paginator;
      });
    }
    
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }


    openDialogRegistrarDomicilio() {
      const dialogo=this.dialog.open(CrudCasaComponent,{
        width:'100%',
      })
      dialogo.afterClosed().subscribe(result => {
        this.get();
      });  
    }



    editarHouse(element:any){
      const dialogo=this.dialog.open(CrudCasaComponent,{
        width:'100%',
         data:element
      })
      dialogo.afterClosed().subscribe(result => {
        this.get();
      });  
    }





    openDialogRegistrarUsuario(){
      const dialogo=this.dialog.open(CrudUsuarioComponent,{
        width:'100%',
      })
      dialogo.afterClosed().subscribe(result => {
        this.get();
      });  
    }






    

}
