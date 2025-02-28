import { inject, Injectable, signal } from '@angular/core';
import { Movie } from './models/movie.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class MoviesService {

    /// crear signals 
// para asignar signal se llama el signal y luego entre <> se coloca el tipo que quiere almacenar y entre parentesis se inicializa
movies = signal<Movie[]>([])
trendingMovies = signal<Movie[]>([])
selectedMovie = signal<Movie | null>(null)

// crear propiedades privadas para el contexto de este fichero
private readonly apiKey = environment.apiKey
private readonly apiUrl = environment.apiUrl
private readonly _searchTerm = signal<string>('')

private readonly _http = inject(HttpClient)

    
}