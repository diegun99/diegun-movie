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

//propiedades para las paginas
currentPage = signal<number>(1);
hasMorepages = signal<boolean>(true);
isLoading = signal<boolean>(true);


// crear propiedades privadas para el contexto de este fichero
private readonly apiKey = '19a735cf759a205784acb027f722d718'
private readonly apiUrl = 'https://api.themoviedb.org/3'
// private readonly _searchTerm = signal<string>('')

private readonly _http = inject(HttpClient)

constructor(){
    this.getMovies()/// cada vez que el servicio inicie su ejecucion
    //se ejecuta el constructor y llama el método que setea el signa
    // y cuando el signal cambia, afectara a todos sus dependientes
    this.getTrending()
}


getMovieById(id: number) : Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`)
}


// privado por ahora para probar, pero puede que toque hacerlo publico segun sea el caso
getMovies() :void{//  aqui obtiene las peliculas y se las asigna a la variable signal movies, para sea usado en cualquier parte
    this._http.get<MovieResponse>(
        `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`
    ).pipe(
        tap(response =>{
            // eslint-disable-next-line no-debugger
debugger
            const currentMovies = this.movies();
            this.movies.set([...currentMovies,...response.results])/// se concatena las pelis actuales, mas el resultado
            this.hasMorepages.set(response.page < response.total_pages)
            this.currentPage.update((currentPage)=>currentPage +1);
            this.isLoading.set(false)
        }
        )/// en la signal de movies se setea el results
    )
    .subscribe()

}

getTrending() :void{//  aqui obtiene las peliculas y se las asigna a la variable signal movies, para sea usado en cualquier parte
    this._http.get<MovieResponse>(
        `${this.apiUrl}/trending/movie/day?api_key=${this.apiKey}`
    ).pipe(
        tap((movies: MovieResponse) =>{
            /// eslint-disable-next-line no-debugger
            this.trendingMovies.set(movies.results)

        },
        tap(
            ()=> this.setRandomMovie()
        )
        )/// en la signal de movies se setea el results
    )
    .subscribe()

}


setRandomMovie(){
    const trendingLength = this.trendingMovies().length;
    const randomIndex = this._getRandomInt(0,trendingLength);
   const randomMovie = this.trendingMovies()[randomIndex];
   this.selectedMovie.set(randomMovie);
}
///generar numero aleatorio para que escoja una de las pelis al azar
private _getRandomInt(min=0, max=50): number {
    return Math.floor(Math.random() * (max-min)) + min;
}
    

}