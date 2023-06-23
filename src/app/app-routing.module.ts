import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ConocimientosComponent } from './conocimientos/conocimientos.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'conocimientos', component: ConocimientosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
