import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { Movie } from '../../../types/movie';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovies } from '../../../types/tvshow';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, BannerComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  popularTvShows: Movie[] = [];
  popularMovies: Movie[] = [];
  

  constructor(
    private moviesService: MoviesService,
    private tvShowsService: TvshowsService
  ) {}

  getMoviesByType(type: string, count = 12) {
    this.moviesService.getMoviesByType(type, count).subscribe((data) => {
      if (type === 'upcoming') {
        this.upcomingMovies = data;
      } else if (type === 'top_rated') {
        this.topRatedMovies = data;
      } else if (type === 'popular') {
        this.popularMovies = data
      }
    });
  }

  getTvShowsByType(type: string) {
    this.tvShowsService.getTvShowsByType(type, 12).subscribe((data) => {
      this.popularTvShows = (mapToMovies(data));
    });
  }

  ngOnInit(): void {
    this.getMoviesByType('popular');
    this.getMoviesByType('upcoming');
    this.getMoviesByType('top_rated');
    this.getTvShowsByType('popular');
    
  }
}
