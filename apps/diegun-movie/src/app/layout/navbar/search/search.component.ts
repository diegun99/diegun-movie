import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { MoviesService } from '../../../features/movies/movies.service';
import { Movie } from '../../../features/movies/models/movie.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone : true,
  imports: [DatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchQuery = signal<string>('');
  private readonly _router = inject(Router)
  private readonly _moviesService = inject(MoviesService)

  filteredMovies = rxResource({
    // request : ()=> this.searchQuery(),// otra manera de hacer lo mismo 
     request : this.searchQuery,// una opcion es pasarle a signal// cuando esta signal cambie, hará la busqueda del loader
    loader:()=>this._moviesService.searchMovie(this.searchQuery())  // propiedad loader obligatoria
  })  /// feature de angular nueva, experimental

  movies = linkedSignal(()=>this.filteredMovies.value()?.results ?? ([] as Movie[] ))
  // movies = computed(()=>this.filteredMovies.value()?.results ?? ([] as Movie[] )) // cada vez que las peliculas filtradas cambien, asigne el valor, el as sirver para castear

  onSearchInput(event : Event){//// el valor del input se puede obtener usando los metodos nativos mediados mediante angular
    const input = event.target as HTMLInputElement
    this.searchQuery.set(input.value)
  }

  goToDetails(movieId : string): void{
    this._router.navigate(['/movies',movieId])
    this.clearQuery();
  }

  private clearQuery() : void{
    this.searchQuery.set('')
  }

}
