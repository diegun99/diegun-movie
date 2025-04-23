import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone : true,
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {

  // aqui se aplican las input signal , mas eficientes al parecer
  movie = input.required<Movie>();
  imageError = false;


  getImageUrl() :string{
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return this.imageError ? 'placeholder.svg' : `${baseUrl}/${this.movie().poster_path}`
  }
  setImageError(value: boolean) : void{
    this.imageError = value
    
  }
}
