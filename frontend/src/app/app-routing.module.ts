import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SensoresComponent } from './pages/sensores/sensores.component';
import { RegisterComponent } from './auth/register/register.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component:DashboardComponent },
  { path: 'iniciar-sesion', component:LoginComponent },
  { path: 'sensores', component:SensoresComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'info', component:InformacionComponent },
  { path: 'usuarios', component:UsuariosComponent },
  { path: 'actualizar-datos', component:ActualizarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
