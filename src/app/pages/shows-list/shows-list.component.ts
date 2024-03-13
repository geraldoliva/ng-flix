import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../../types/movie';
import { CommonModule } from '@angular/common';
import { ShowItemComponent } from '../../components/show-item/show-item.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

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
  showsList: Movie[] = [];
  searchValue = '';
  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.getPagedShows(1);
  }

  getPagedShows(page: number, searchKeyword?: string) {
    this.movieService.searchMovies(page, searchKeyword).subscribe((data) => {
      this.showsList = data;
    });
  }

  searchChanged() {
    this.getPagedShows(1, this.searchValue);
  }

  pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;

    this.getPagedShows(pageNumber, this.searchValue);
  }
}
