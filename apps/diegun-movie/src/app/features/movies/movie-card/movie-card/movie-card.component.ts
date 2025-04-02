import { Component, input } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone : true,
  imports: [JsonPipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {

  // aqui se aplican las input signal , mas eficientes al parecer
  movie = input.required<Movie>();
}
