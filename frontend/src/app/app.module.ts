import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SensoresComponent } from './pages/sensores/sensores.component';
import { RegisterComponent } from './auth/register/register.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    SensoresComponent,
    RegisterComponent,
    InformacionComponent,
    UsuariosComponent,
    ActualizarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
