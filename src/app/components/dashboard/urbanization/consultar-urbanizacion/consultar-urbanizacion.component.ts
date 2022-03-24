import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Urban } from 'src/Interface/Iurban';
import { CrudUrbanizacionComponent } from '../crud-urbanizacion/crud-urbanizacion.component';
import { UrbanizacionService } from '../service/urbanizacion.service';
//import { UrbanizationComponent } from '../urbanization.component';

@Component({
  selector: 'app-consultar-urbanizacion',
  templateUrl: './consultar-urbanizacion.component.html',
  styleUrls: ['./consultar-urbanizacion.component.css']
})
export class ConsultarUrbanizacionComponent implements OnInit {

  displayedColumns: string[] = ['UrbanizationId', 'urbanization1','ContactNumber',
  'ContactEmail','ContactName','ActiveFrom','ActiveTo','Ruc','City','Country','Image','accion'];
  
  datasource:any
  objetoLogueado: any
  sImage="http://192.168.100.10/images/";


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  listUrban:Urban []=[];
  mostrar!:boolean

  constructor(private _urbanizacionService:UrbanizacionService,
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
      this.mostrar=true;
      this._urbanizacionService.get().subscribe(urban =>{
        this.listUrban=urban.data;
      });
    }else if(this.objetoLogueado.roleID==2){
      this._urbanizacionService.getUrbanization(this.objetoLogueado.urbanizationId).subscribe(urban =>{
        this.mostrar=false;
        this.listUrban[0]=urban.data;
      });
    }

    


  }


 /* applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }*/


  openDialogRegistrarUrbanizacion(){
    const dialogo=this.dialog.open(CrudUrbanizacionComponent,{
      width:'100%',
    })
    dialogo.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    // this.animal = result;
    });  

  }
  

  setEditar(element : any){
    const dialogo=this.dialog.open(CrudUrbanizacionComponent,{
      width:'100%',
     data:element
    })
    dialogo.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.get();
     // this.animal = result;
    });
  }



}
