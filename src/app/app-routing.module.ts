import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NavbarComponent } from '../../src/app/components/navbar/navbar.component';
import { PaisComponent } from '../app/components/lista/pais/pais.component';
import { MonedaComponent } from '../app/components/lista/moneda/moneda.component';
import { GeneroComponent } from '../app/components/lista/genero/genero.component';
import { ProfesionComponent } from 'app/components/lista/profesion/profesion.component';
import { EstadoCivilComponent } from 'app/components/lista/estado-civil/estado-civil.component';
import { EstadoComponent } from 'app/components/lista/estado/estado.component';
import { ClientePrivadoComponent } from 'app/components/clientes/cliente-privado/cliente-privado.component';
import { ClientePublicoComponent } from 'app/components/clientes/cliente-publico/cliente-publico.component';
import { ImageUserComponent } from './components/sidebar/image-user/image-user.component';
import { SoniatPublicoComponent } from './components/ChatBot-Soniat/soniat-publico/soniat-publico.component';
import { SoniatComponent } from './components/ChatBot-Soniat/soniat/soniat.component';
import { RolComponent } from './components/usuario/rol/rol.component';
import { AimlTablaComponent } from './components/aiml/aiml-tabla/aiml-tabla.component';
import { AimlIfTablaComponent } from './components/aiml/aiml-if-tabla/aiml-if-tabla.component';
import { GuardService as guard } from './guards/guard.service';
import { TabladosComponent } from 'app/components/historial/tablados/tablados.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'soniat', component: SoniatComponent },
  { path: 'pais', component: PaisComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'moneda', component: MonedaComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'genero', component: GeneroComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'profesion', component: ProfesionComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'estadocivil', component: EstadoCivilComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'estado', component: EstadoComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'imagen', component: ImageUserComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'clienteprivate', component: ClientePrivadoComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'clientepublic', component: ClientePublicoComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'soniatpublic', component: SoniatPublicoComponent },
  { path: 'home', component: HomeComponent },
  {path: 'tabla', component: TabladosComponent },
  { path: 'aiml-table', component: AimlTablaComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'aiml-if', component: AimlIfTablaComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'rol', component: RolComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }],
  },
  { path: 'navbar', component: NavbarComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
