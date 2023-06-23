import { Component } from '@angular/core';

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: ['./conocimientos.component.css']
})
export class ConocimientosComponent {
  conocimientos: string[];

  constructor() {
    this.conocimientos = ['Angular.JS', 'PHP', 'Python','SQL', 'Windows/Linux Server', 'Redes', 'Hardware'];
  }
}
