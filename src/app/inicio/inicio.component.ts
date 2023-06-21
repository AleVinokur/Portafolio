import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: '../app.component.html',
  styleUrls: ['./inicio.component.css', '../app.component.css']
})
export class InicioComponent {

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
