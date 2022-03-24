import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import {NgxChartsModule} from '@swimlane/ngx-charts'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtInterceptor } from 'src/Security/jwt.interceptor';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
//import { RoleDirectiveComponent } from './components/role-directive/role-directive.component';
//import { NgxPaginationModule } from 'ngx-pagination';
//import pdfMake from "pdfmake/build/pdfmake";
//import pdfFonts from "pdfmake/build/vfs_fonts";
//pdfMake.vfs = pdfFonts.pdfMake.vfs;


import { NgxDropzoneModule } from 'ngx-dropzone';
//import { DonaChartComponent } from './components/dashboard/inicio/dona-chart/dona-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,
    //DonaChartComponent,
    
   // RoleDirectiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
  //  NgxChartsModule,
    NgChartsModule,
    
    NgxPaginationModule,

    NgxDropzoneModule,
    
    
    ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
