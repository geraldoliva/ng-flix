import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MoviesDto } from '../../../types/movie';
import { CommonModule } from '@angular/common';
import { ShowItemComponent } from '../../components/show-item/show-item.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ActivatedRoute } from '@angular/router';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMoviesDto } from '../../../types/tvshow';

@Component({
  selector: 'app-shows-list',
  standalone: true,
  imports: [
    CommonModule,
    ShowItemComponent,
    InputTextModule,
    FormsModule,
    PaginatorModule,
  ],
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.scss',
})
export class ShowsListComponent implements OnInit {
  showsList: MoviesDto | null = null;
  searchValue = '';
  showType: 'tv' | 'movie' = 'movie';
  constructor(
    private movieService: MoviesService,
    private tvShowService: TvshowsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.showType = this.router.snapshot.params['type'];
    this.getPagedShows(1);
  }

  getPagedShows(page: number, searchKeyword?: string) {
    if (this.showType === 'movie') {
      this.movieService.searchMovies(page, searchKeyword).subscribe((data) => {
        this.showsList = data;
      });
    } else if (this.showType === 'tv') {
      this.tvShowService
        .searchTvShows(page, searchKeyword)
        .subscribe((data) => {
          this.showsList = mapToMoviesDto(data);
        });
    }
  }

  searchChanged() {
    this.getPagedShows(1, this.searchValue);
  }

  pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;

    this.getPagedShows(pageNumber, this.searchValue);
  }
}
