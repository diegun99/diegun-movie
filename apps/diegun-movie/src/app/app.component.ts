import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './layout/hero/hero.component';
import { MoviesService } from './features/movies/movies.service';
import { NavbarComponent } from './layout/navbar/navbar.component';




@Component({
  imports: [RouterOutlet,HeroComponent,NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  private readonly _movieService = inject(MoviesService) /// inyectar read only los servicios y privados
  // readonly movieSelected = this._movieService.selectedMovie;
  heroMovie = computed(()=> this._movieService.selectedMovie())

  showButton = false;

  constructor(){
    window.addEventListener('scroll',// escucha el scroll, y si es mayor a cien 
      ()=>{
        this.showButton = window.scrollY > 100;// si es mayor a cien, devolvera true , si no, devolvera false
      }
    )
  }

  goTop(){
    window.scrollTo(// envia al top con suavidad
      {top : 0,behavior : 'smooth'}
    )
  }
}
