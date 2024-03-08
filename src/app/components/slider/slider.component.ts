import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../../types/movie';
import { imageBaseUrl } from '../../constants/image-sizes';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  movies: Movie[] = [];

  slideIndex = 0;

  imagesBaseUrl = imageBaseUrl

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.changeSlide();
  }

  changeSlide() {
    this.getPopularMovies();
    setInterval(() => {
      this.slideIndex += 1;
      if (this.slideIndex > 10) {
        this.slideIndex = 0;
      }
    }, 5000);
  }

  getPopularMovies() {
    this.moviesService.getPopularMovies().subscribe((data) => {
      this.movies = data.results;
    });
  }
}
