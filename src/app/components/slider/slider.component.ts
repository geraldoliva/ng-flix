import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() slides: Movie[] = [];
  @Input() isHeader = false;

  slideIndex = 0;

  imagesBaseUrl = imageBaseUrl;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    if (!this.isHeader) {
      this.changeSlide();
    }
  }

  changeSlide() {
    // this.getMoviesByType();
    setInterval(() => {
      this.slideIndex += 1;
      if (this.slideIndex > 10) {
        this.slideIndex = 0;
      }
    }, 5000);
  }

  // getMoviesByType() {
  //   this.moviesService.getMoviesByType('popular').subscribe((data) => {
  //     this.movies = data;
  //   });
  // }
}
