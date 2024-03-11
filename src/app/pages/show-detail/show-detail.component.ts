import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../../types/movie';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';
import { TabViewModule } from 'primeng/tabview';
import { IMAGE_SIZES } from '../../constants/image-sizes';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [CommonModule, SliderComponent, TabViewModule],
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.scss',
})
export class ShowDetailComponent implements OnInit {
  showId = '';
  show: Movie | null = null;
  imageSizes = IMAGE_SIZES;

  constructor(
    private router: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    // this.showId = this.router.snapshot.params['id']
    this.router.params.subscribe((params) => {
      this.showId = params['id'];
    });

    this.moviesService.getMovieById(this.showId).subscribe((data) => {
      this.show = data;
    });
  }
}
