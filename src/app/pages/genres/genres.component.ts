import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Genre, Movie } from '../../../types/movie';
import { CommonModule } from '@angular/common';
import { ShowItemComponent } from '../../components/show-item/show-item.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, ShowItemComponent, RouterModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  shows: Movie[] = [];
  genreId = '';
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.genreId = this.route.snapshot.params['genreId'];
    this.route.params.subscribe(params => {
      this.genreId = params['genreId']
      this.moviesService
        .getMoviesByGenre(this.genreId + '')
        .subscribe((data) => {
          this.shows = data;
        });
    })

    // this.moviesService.getMoviesByGenre(this.genreId + '').subscribe((data) => {
    //   this.shows = data;
    // });

    this.moviesService.getMovieGenres().subscribe((data) => {
      this.genres = data;
    });
  }


}
