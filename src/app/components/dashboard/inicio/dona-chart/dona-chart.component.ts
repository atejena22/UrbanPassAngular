import { Component, OnInit } from '@angular/core';
import { Background } from '@cloudinary/url-gen/qualifiers';
import { none } from '@cloudinary/url-gen/qualifiers/fontHinting';
import { ChartData, ChartType,Color } from 'chart.js';
import { NotificacionService } from '../service/notificacion.service';

@Component({
  selector: 'app-dona-chart',
  templateUrl: './dona-chart.component.html',
  styleUrls: ['./dona-chart.component.css']
})
export class DonaChartComponent implements OnInit {

  objetoLogueado: any;
  
  numeroUso!: number;
  numeroCasa!: number;
  numeroUsuario!: number;
  lsta :any[]=[];

  constructor(private _serviceNotification: NotificacionService) { }

  ngOnInit(): void {
    this.objetoLogueado = JSON.parse(localStorage.getItem('usuario')!);
    this.getTotalUsuario();
  }





  getTotalUsuario(){
    if (this.objetoLogueado.roleID === 1) {
      this._serviceNotification.getTotalDonaAdmin().subscribe(usuario =>{
        //this.lsta=usuario.data;
        this.doughnutChartData.datasets[0].data=usuario.data; console.log(this.doughnutChartData);
      });
      
    }else
    if (this.objetoLogueado.roleID === 2) {
    this._serviceNotification.getTotalDona(this.objetoLogueado.urbanizationId).subscribe(usuario =>{
      //console.log(usuario.data);
    });
  }
  
 // console.log(this.lsta);

  }


  public doughnutChartLabels: string[] = [ 'Total de Domicilios',  'Total de Usuarios' ,'Acceso Total'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [],
        backgroundColor: [ 
          'rgb(27, 20, 100 )',
          'rgb(51, 156, 233)',
          'rgb(230, 230, 230)'
        ], hoverBackgroundColor:[
          'rgb(27, 20, 100 )',
          'rgb(51, 156, 233)',
          'rgb(230, 230, 230)'
        ],hoverBorderColor:[
          'rgb(27, 20, 100 )',
          'rgb(51, 156, 233)',
          'rgb(230, 230, 230)'
        ]
      },
 
    ]
  };
  
  public doughnutChartType: ChartType = 'doughnut';




  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {}



}
