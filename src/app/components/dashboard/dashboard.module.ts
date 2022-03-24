import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CrudUrbanizacionComponent } from './urbanization/crud-urbanizacion/crud-urbanizacion.component';
import { ConsultarUrbanizacionComponent } from './urbanization/consultar-urbanizacion/consultar-urbanizacion.component';
import { ListarCasaComponent } from './casa/listar-casa/listar-casa.component';
import { CrudCasaComponent } from './casa/crud-casa/crud-casa.component';
import { CrudUsuarioComponent } from './usuario/crud-usuario/crud-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { BarchartComponent } from './inicio/barchart/barchart.component';
import { NotificacionesComponent } from './inicio/notificaciones/notificaciones.component';
import { ActividadesComponent } from './inicio/notificaciones/actividades/actividades.component';
import { CrudNotificationComponent } from './inicio/crud-notification/crud-notification.component';
import { GaritaComponent } from './garita/garita.component';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DonaChartComponent } from './inicio/dona-chart/dona-chart.component';
import { MaxUserComponent } from './inicio/max-user/max-user.component';
import { PopupResetPassswordComponent } from './usuario/popup-reset-passsword/popup-reset-passsword.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    CrudUrbanizacionComponent,
    ConsultarUrbanizacionComponent,
    ListarCasaComponent,
    CrudCasaComponent,
    CrudUsuarioComponent,
    ListarUsuarioComponent,
    BarchartComponent,
    NotificacionesComponent,
    ActividadesComponent,
    CrudNotificationComponent,
    GaritaComponent,
    DonaChartComponent,
    MaxUserComponent,
    PopupResetPassswordComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxDropzoneModule,
    NgxMatSelectSearchModule
  ]
})
export class DashboardModule { }
