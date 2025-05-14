import { Component, input } from '@angular/core';
import { Movie } from '../../../features/movies/models/movie.interface';

@Component({
  selector: 'app-hero',
  standalone : true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  movie = input.required<Movie>()

}
