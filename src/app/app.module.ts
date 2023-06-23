import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CargarScriptsService } from './cargar-scripts.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ConocimientosComponent } from './conocimientos/conocimientos.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ConocimientosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CargarScriptsService],
  bootstrap: [AppComponent]

})
export class AppModule { }
