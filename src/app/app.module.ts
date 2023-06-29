import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CargarScriptsService } from './cargar-scripts.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { SmoothScrollDirective } from './inicio/smooth-scroll.directive';
import { ConocimientosComponent } from './conocimientos/conocimientos.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ClimaComponent } from './clima/clima.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SmoothScrollDirective,
    ConocimientosComponent,
    ProyectosComponent,
    ClimaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CargarScriptsService],
  bootstrap: [AppComponent]

})
export class AppModule { }
