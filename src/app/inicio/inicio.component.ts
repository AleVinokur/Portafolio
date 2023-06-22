import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';


@Component({
  selector: 'app-inicio',
  templateUrl: '../app.component.html',
  styleUrls: ['./inicio.component.css', '../app.component.css']
})
export class InicioComponent {

  ngOnInit() {
    const typed = new Typed('.typed', {
      strings: ['Texto de ejemplo', 'Otro texto de ejemplo'],
      typeSpeed: 10, // Velocidad de escritura (en milisegundos)
      backSpeed: 20, // Velocidad de retroceso (en milisegundos)
      loop: false // Repetir la animación o detenerla después de escribir una vez
    });
  }
  

  persona = {
    nombre: "Alejandro Vinokur",
    edad: 25,
    lugar: "Ciudad Autonoma de Buenos Aires, Buenos Aires, Argentina",
    redesSociales: {
      linkeding: "https://www.linkedin.com/in/alejandro-vinokur-758596165/",
      github: "https://github.com/AleVinokur",
    }
  }
}