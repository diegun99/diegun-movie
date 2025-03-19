import { inject, Injectable, signal } from '@angular/core';
import { Movie, MovieResponse } from './models/movie.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MoviesService {

    /// crear signals 
// para asignar signal se llama el signal y luego entre <> se coloca el tipo que quiere almacenar y entre parentesis se inicializa
movies = signal<Movie[]>([])
trendingMovies = signal<Movie[]>([])
selectedMovie = signal<Movie | null>(null)

// crear propiedades privadas para el contexto de este fichero
private readonly apiKey = '19a735cf759a205784acb027f722d718'
private readonly apiUrl = 'https://api.themoviedb.org/3'
// private readonly _searchTerm = signal<string>('')

private readonly _http = inject(HttpClient)

constructor(){
    this._getMovies()/// cada vez que el servicio inicie su ejecucion
    //se ejecuta el constructor y llama el método que setea el signa
    // y cuando el signal cambia, afectara a todos sus dependientes
}


getMovieById(id: number) : Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`)
}

private _getMovies() :void{//  aqui obtiene las peliculas y se las asigna a la variable signal movies, para sea usado en cualquier parte
    this._http.get<MovieResponse>(
        `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`
    ).pipe(
        tap(response => this.movies.set(response.results))/// en la signal de movies se setea el results
    )
    .subscribe()

}
    

}