import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/Security/role.guard';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { CrudCasaComponent } from './casa/crud-casa/crud-casa.component';
import { ListarCasaComponent } from './casa/listar-casa/listar-casa.component';
import { DashboardComponent } from './dashboard.component';
import { GaritaComponent } from './garita/garita.component';
import { InicioComponent } from './inicio/inicio.component';
import { ActividadesComponent } from './inicio/notificaciones/actividades/actividades.component';
import { NotificacionesComponent } from './inicio/notificaciones/notificaciones.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConsultarUrbanizacionComponent } from './urbanization/consultar-urbanizacion/consultar-urbanizacion.component';
import { CrudUrbanizacionComponent } from './urbanization/crud-urbanizacion/crud-urbanizacion.component';
import { CrudUsuarioComponent } from './usuario/crud-usuario/crud-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';

const routes: Routes = [{path:'',component:DashboardComponent,children:[
  {path:'', component:InicioComponent},
  {path:'consultarusuario', component:ListarUsuarioComponent,canActivate:[RoleGuard]},
  {path:'consultarcasa', component:ListarCasaComponent,canActivate:[RoleGuard]},
  {path:'consultarurbanizacion', component:ConsultarUrbanizacionComponent,canActivate:[RoleGuard]},
  {path:'notificaciones',component:NotificacionesComponent,canActivate:[RoleGuard]},
  //{path:'actividades',component:ActividadesComponent,canActivate:[RoleGuard]},/*no se navega ahi */
  {path:'nabvar', component:NavbarComponent},
  {path:'garita',component:GaritaComponent},
  {path:'pagenotfound',component:PagenotfoundComponent},


]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
