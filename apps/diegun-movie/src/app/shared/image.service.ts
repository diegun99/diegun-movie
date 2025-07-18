import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({providedIn: 'root'})
export class ImageService {

    private readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    private readonly DEFAULT_POSTER_PATH = '/assets/20231111_214434.jpg';
 
    private readonly BACKDROP_PATH = '/assets/20231111_214434.jpg';

      getImageUrl(posterPath : string | null, type : 'poster' | 'backdrop' = 'poster') :string{ /// se puede añadir un parametro tipo que reciba dos tipos de poster y tambien se puede asignar uno por defecto
    if(!posterPath){ // si no tenemos el poster asignamos segun el type las variables 
     return type ==='poster' ? this.DEFAULT_POSTER_PATH : this.BACKDROP_PATH;
    }
        return `${this.IMAGE_BASE_URL}${posterPath}`
  }

}