import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CargarScriptsService } from './cargar-scripts.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { SmoothScrollDirective } from './inicio/smooth-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SmoothScrollDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CargarScriptsService],
  bootstrap: [AppComponent]

})
export class AppModule { }
