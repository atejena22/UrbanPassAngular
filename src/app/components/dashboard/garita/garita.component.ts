import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CasaService } from '../casa/casa.service';
//import pdfMake from "node_modules/pdfmake/build/pdfmake.js";
//import pdfFonts from "node_modules/pdfmake/build/vfs_fonts.js";
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { jsPDF } from "jspdf";


import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


import { Moment } from 'moment';
import * as moment from 'moment';
import { ExcelService } from 'src/app/excel.service';
//import { Workbook } from 'exceljs';
import { ChangeDetectorRef } from '@angular/core';

//import * as fs from 'file-saver';

@Component({
  selector: 'app-garita',
  templateUrl: './garita.component.html',
  styleUrls: ['./garita.component.css']
})
export class GaritaComponent implements OnInit {

  displayedColumns: string[] = ['mz', 'villa','restaurant', /*'firstName',*/ 'lastName', /*'phoneNumber',*/ 'accessFrom', 'accessTo'];
​​​
  
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listFactura: any[] = [];
  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);
  fecha = this.hoy.toLocaleTimeString();
  hola!: boolean
  objetoLogueado: any

  constructor(private _casaService: CasaService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer, private excelService: ExcelService,
    private ref: ChangeDetectorRef) {

      

  }


  ngOnInit(): void {
    this.objetoLogueado= JSON.parse(localStorage.getItem('usuario')!);
    this.get();
    
    this.ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 2000);
  

    
  
  }

  get() {
    if(this.objetoLogueado.roleID==1){
      this._casaService.getGaritaGeneral().subscribe(venta =>{
        console.log(venta);
        this.listFactura=venta.data;
        this.datasource=new MatTableDataSource(this.listFactura);
        this.datasource.paginator=this.paginator;
      });
    }
    else if(this.objetoLogueado.roleID==2 || this.objetoLogueado.roleID==5){
      this._casaService.getGarita(this.objetoLogueado.urbanizationId).subscribe(venta =>{
        console.log(venta);
        this.listFactura=venta.data;
        this.datasource=new MatTableDataSource(this.listFactura);
        this.datasource.paginator=this.paginator;
      });
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }



  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }




  downloadExcel() {

    this.excelService.exportAsExcelFile(this.listFactura, 'ReporteIngreso');

  }




  exportarpdf() {
    moment.locale("es");
    const hoy = Date.now();
    const fechaActual = ("Guayaquil, " + moment(hoy).format("D MMMM YYYY"))
    const doc = new jsPDF();
    const DATA = document.getElementById('htmlData');
    var imgData = 'https://res.cloudinary.com/guayaquil19980/image/upload/v1646850434/urbanizaciones/urban_yjckni.png'
    doc.addImage(imgData, 4, 4, 20, 20);
    doc.text(fechaActual, 132, 10);
    doc.text("Reporte de Ingresos", 80, 20);

    html2canvas(DATA!).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 30;//posicion de arriba a abajo de la imagen
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      doc.save("ReportesIngreso.pdf");

    })

    
  }






















  



}



