import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from 'chart.js'
import { BaseChartDirective } from 'ng2-charts';
import { Subject } from 'rxjs';
import { NotificacionService } from './service/notificacion.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private _route:Router, private _serviceNotification:NotificacionService) { }
  objetoLogueado:any;

  ngOnInit(): void {
    this.objetoLogueado= JSON.parse(localStorage.getItem('usuario')!);
    if(this.objetoLogueado.roleID==5){
    this._route.navigate(['dashboard/garita']);
    }
  }
 
  
 /* getTotalUsuario(){
    if (this.objetoLogueado.roleID == 2) {
    this._serviceNotification.getTotalUsuario(this.objetoLogueado.urbanizationId).subscribe(usuario =>{
      console.log(usuario);
    });
  }


  }*/









 /* spinnerEnabled = false;
  keys!: string[];
  dataSheet = new Subject();
  @ViewChild('inputFile') inputFile!: ElementRef;
  isExcelFile!: boolean;

  onChange(evt:any) {
    let data:any, header;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook *
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet *
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data *
        data = XLSX.utils.sheet_to_json(ws);
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        this.dataSheet.next(data)
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }*/

  

}