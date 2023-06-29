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
  ubicacion: string = '';
  imagenClima: string = '';
  windSpeedValue: number = 0;
  windSpeedUnit: string = '';
  windDirection: string = '';


  constructor(private http: HttpClient) {
    this.obtenerCoordenadasActuales();
    this.dia = this.obtenerFechaActual();
    this.hora = this.obtenerHoraActual();
  }

  obtenerCoordenadas(ubicacion: string) {
    const apiKey = '3ec9901109468390854cde8c05855aa8';
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ubicacion}&limit=1&appid=${apiKey}`;

    this.http.get<any[]>(url).subscribe((data) => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        this.obtenerClimaActual(lat, lon);
        this.ubicacion = ubicacion;
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
      this.ubicacion = data.name + ', ' + data.sys.country;
      this.imagenClima = this.obtenerRutaImagen(this.descripcion);
      this.windSpeedValue = data.wind.speed.value;
      this.windSpeedUnit = data.wind.speed.unit;
      this.windDirection = data.wind.direction.value;
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

  obtenerRutaImagen(descripcion: string): string {
    const clima = descripcion.toLowerCase();
    let rutaImagen = '';

    if (clima.includes('soleado')) {
      rutaImagen = 'assets/wheater-img/sun.ico';
    } else if (clima.includes('nublado')) {
      rutaImagen = 'assets/wheater-img/cloudy-_1_.ico';
    } else if (clima.includes('nevando')) {
      rutaImagen = 'assets/wheater-img/snow.ico';
    } else {
      rutaImagen = 'assets/wheater-img/storm.ico';
    }

    return rutaImagen;
  }

  actualizarDatos() {
    this.obtenerCoordenadasActuales();
    this.dia = this.obtenerFechaActual();
    this.hora = this.obtenerHoraActual();
  }
}
