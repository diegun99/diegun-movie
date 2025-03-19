import { Component, effect, inject } from '@angular/core';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.component.html'
})
export class MoviesComponent {
private readonly _movieService = inject(MoviesService) /// inyectar read only los servicios y privados

readonly movies = this._movieService.movies;// se crea una propiedad writeblesignal
constructor(){
 effect(/// ejecuta una funcion segun cambia el signal
  ()=>{
console.log(this.movies())
  }
 )
}

}
