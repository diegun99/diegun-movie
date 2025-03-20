import { Component, computed, effect, HostListener, inject } from '@angular/core';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.component.html'
})
export class MoviesComponent {
  isLoading = computed(()=>this._movieService.isLoading);// computed permite crear una signal a traves de otra signal
  hasMorePages = computed(()=>this._movieService.hasMorepages);
private readonly _movieService = inject(MoviesService) /// inyectar read only los servicios y privados
readonly movies = this._movieService.movies;// se crea una propiedad writeblesignal
// para el buscador se usará rxresource que es una nueva api experimental de angular 19
// paginacion infinita
// este decorador va a decorarrr un metodo
@HostListener('window:scroll ')  // con este decorador se controla la paginacion y le pasamos el evento que queremos escuchar
onScroll() : void {
  if(this.isLoading() || !this.hasMorePages()){
    return
  }
  // se onbtienen unas propiedades que se deben declarar en el servicio para revisar si se esta cargando o hay mas paginas
const scrollPosition = window.innerHeight + window.scrollY; // el innerheight nos da la altura visible de lo que contiene la ventana, scollY devuelve la cantidad de pixeles que el documento haya recorrido desde su desplazamiento , la suma nos da la cantidad de pixeles recorridos de la parte superior hasta la parte inferior
const scrollthreshold = document.documentElement.scrollHeight;
if(scrollPosition >= scrollthreshold){///  el usuario hay llegado al final de la pagina
  effect(
    ()=>{
      this.movies()
    }
  )
}
}
// constructor(){
//  effect(/// ejecuta una funcion segun cambia el signal
//   ()=>{
// console.log(this.movies())
//   }
//  )
// }

}
