import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-inicio',
  templateUrl: '../inicio/inicio.component.html',
  styleUrls: ['./inicio.component.css', '../app.component.css']
})
export class InicioComponent implements OnInit {
  ngOnInit() {
    const typed = new Typed('.typed', {
      stringsElement: '.typed-text',
      typeSpeed: 50,
      backSpeed: 20,
      loop: false
    });
  }
}
