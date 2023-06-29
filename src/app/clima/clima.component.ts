import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent {
  temperatura: number = 0;
  descripcion: string = '';
  icono: string = '';
  constructor(private http: HttpClient) {
    this.obtenerCoordenadas('Ciudad Ejemplo');
  }

  obtenerCoordenadas(ciudad: string) {
    const apiKey = '3ec9901109468390854cde8c05855aa8';
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=1&appid=${apiKey}`;

    this.http.get<any[]>(url).subscribe((data) => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        this.obtenerClimaActual(lat, lon);
      }
    }, (error) => {
      console.error(error);
    });
  }

  obtenerClimaActual(lat: number, lon: number) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=TU_API_KEY`;

    this.http.get<any>(url).subscribe((data) => {
      this.temperatura = data.main.temp;
      this.descripcion = data.weather[0].description;
      this.icono = data.weather[0].icon;
    }, (error) => {
      console.error(error);
    });
  }
}
