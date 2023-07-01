import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IconImages, iconImages } from './icon-images';
import { interval } from 'rxjs';

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
  iconImages: IconImages = iconImages;
  busqueda: string = '';

  constructor(private http: HttpClient) {
    this.obtenerCoordenadasActuales();
    this.dia = this.obtenerFechaActual();
    this.obtenerHoraLocal();
  }

  obtenerCoordenadas(ubicacion: string) {
    if (ubicacion.toLowerCase() === 'mi ubicacion') {
      this.obtenerCoordenadasActuales();
    } else {
      const apiKey = '3ec9901109468390854cde8c05855aa8';
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ubicacion}&limit=1&appid=${apiKey}`;

      this.http.get<any[]>(url).subscribe(
        (data) => {
          if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            this.obtenerClimaActual(lat, lon);
            this.ubicacion = ubicacion;
          } else {
            console.log('No se encontró la ubicación');
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  obtenerClimaActual(lat: number, lon: number) {
    const apiKey = '3ec9901109468390854cde8c05855aa8';
    const lang = 'es'; // Código de idioma deseado (por ejemplo, 'es' para español)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}`;

    this.http.get<any>(url).subscribe(
      (data) => {
        console.log(data);
        this.temperatura = +(data.main.temp - 273.15).toFixed(2);
        this.descripcion = this.capitalizarDescripcion(data.weather[0].description);
        this.ubicacion = data.name + ', ' + data.sys.country;
        this.imagenClima = this.obtenerRutaImagen(this.descripcion);
        this.windSpeedValue = data.wind.speed;
        this.windSpeedUnit = this.obtenerUnidadVelocidad(data.wind.speed);
        this.windDirection = this.obtenerDireccionViento(data.wind.deg);
        this.imagenClima = this.obtenerRutaImagen(data.weather[0].icon);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buscar() {
    if (this.busqueda.trim() !== '') {
      this.obtenerCoordenadas(this.busqueda);
    }
  }

  capitalizarDescripcion(descripcion: string): string {
    const palabras = descripcion.split(' ');
    const palabrasCapitalizadas = palabras.map((palabra) => {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    });

    return palabrasCapitalizadas.join(' ');
  }

  obtenerRutaImagen(descripcion: string): string {
    const clima = descripcion.toLowerCase();
    let rutaImagen = '';

    for (const iconCode in this.iconImages) {
      if (clima.includes(iconCode)) {
        rutaImagen = '../../assets/wheater-img/' + this.iconImages[iconCode];
        break;
      }
    }

    return rutaImagen;
  }

  obtenerUnidadVelocidad(speed: number): string {
    if (speed >= 0 && speed < 0.3) {
      return 'm/s';
    } else {
      return 'km/h';
    }
  }

  obtenerDireccionViento(deg: number): string {
    const direccion = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    const direccionViento = direccion[index];

    return `${direccionViento} ${this.obtenerSimboloBrujula(index)}`;
  }

  obtenerSimboloBrujula(index: number): string {
    const simbolos = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
    return simbolos[index];
  }

  obtenerCoordenadasActuales() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          this.obtenerClimaActual(lat, lon);
        },
        (error) => {
          console.error(error);
          this.obtenerClimaActual(-34.61315, -58.37723);
        }
      );
    } else {
      console.error('La geolocalización no es compatible con este navegador.');
      this.obtenerClimaActual(-34.61315, -58.37723);
    }
  }

  obtenerFechaActual(): string {
    const fecha = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return fecha.toLocaleDateString('es-ES', options);
  }

  obtenerHoraLocal(): void {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };

    interval(1000).subscribe(() => {
      const fecha = new Date();
      this.hora = fecha.toLocaleTimeString('es-ES', options);
    });
  }


  actualizarDatos() {
    this.obtenerCoordenadasActuales();
    this.dia = this.obtenerFechaActual();
    this.obtenerHoraLocal();
  }
}
