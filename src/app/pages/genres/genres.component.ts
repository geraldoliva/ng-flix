import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Genre, Movie } from '../../../types/movie';
import { CommonModule } from '@angular/common';
import { ShowItemComponent } from '../../components/show-item/show-item.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, ShowItemComponent, RouterModule, PaginatorModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  shows: Movie[] = [];
  totalResults: number = 0;
  genreId = '';
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.genreId = this.route.snapshot.params['genreId'];
    this.route.params.subscribe((params) => {
      this.genreId = params['genreId'];
      this.getPagedShows();
    });

    this.moviesService.getMovieGenres().subscribe((data) => {
      this.genres = data;
    });
  }

  getPagedShows(page: number = 1) {
    if (this.genreId) {
      this.moviesService
        .getMoviesByGenre(this.genreId + '', page)
        .subscribe((data) => {
          this.totalResults = data.total_results > 100 ? 100 : data.total_results;
          this.shows = data.results;
        });
    }
     else {
      this.moviesService.getMoviesByType('popular').subscribe((data) => {
        this.shows = data;
      });
    }
  }

  pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;

    this.getPagedShows(pageNumber);
  }
}
