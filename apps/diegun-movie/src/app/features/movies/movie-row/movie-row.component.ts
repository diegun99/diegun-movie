import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Movie } from '../models/movie.interface';
import { ImageService } from '../../../shared/image.service';


@Component({
  selector: 'app-movie-row',
  standalone : true,
  imports: [],
  templateUrl: './movie-row.component.html',
  styleUrl: './movie-row.component.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MovieRowComponent {

  title = input<string>('Trending'); /// los nuevos inputs puede ser o no ser requeridos
  movies = input.required<Movie[]>()


  private readonly _imageService = inject(ImageService)

  getImageUrl(posterPath : string): string {
    return this._imageService.getImageUrl(posterPath)
      

}
}