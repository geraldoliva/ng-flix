import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgIf, JsonPipe],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements OnInit{
  movies: any = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getPopularMovies();
  }

  getPopularMovies() {
    this.moviesService.getPopularMovies().subscribe((data) => {
      this.movies = Array.from(data.results);
    });
  }
}
