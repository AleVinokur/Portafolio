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
  dia: string = '';
  hora: string = '';
  ciudad: string = '';

  constructor(private http: HttpClient) {
    this.obtenerCoordenadasActuales();
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
    const apiKey = '3ec9901109468390854cde8c05855aa8';
    const lang = 'es'; // Desired language code (e.g., 'es' for Spanish)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}`;

    this.http.get<any>(url).subscribe((data) => {
      this.temperatura = +(data.main.temp - 273.15).toFixed(2);
      this.descripcion = data.weather[0].description;
    }, (error) => {
      console.error(error);
    });
  }

  obtenerCoordenadasActuales() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.obtenerClimaActual(lat, lon);
      }, (error) => {
        console.error(error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  obtenerFechaActual(): string {
    const fecha = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', options);
  }

  obtenerHoraActual(): string {
    const fecha = new Date();
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    return fecha.toLocaleTimeString('es-ES', options);
  }

}
