import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../../types/movie';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';
import { TabViewModule } from 'primeng/tabview';
import { IMAGE_SIZES } from '../../constants/image-sizes';
import { Video } from '../../../types/video';
import { VideoEmbedComponent } from '../../components/video-embed/video-embed.component';
import { Image } from '../../../types/image';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { Actor } from '../../../types/credits';
import { BannerComponent } from '../../components/banner/banner.component';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovie, mapToMovies } from '../../../types/tvshow';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [
    CommonModule,
    SliderComponent,
    TabViewModule,
    VideoEmbedComponent,
    ImageModule,
    CarouselModule,
    BannerComponent,
  ],
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.scss',
})
export class ShowDetailComponent implements OnInit {
  showId = '';
  showType: 'tv' | 'movie' = 'movie';

  show: Movie | null = null;
  showVideos: Video[] = [];
  showImages: Image[] = [];
  showCast: Actor[] = [];
  similarMovies: Movie[] = [];

  imageSizes = IMAGE_SIZES;

  constructor(
    private router: ActivatedRoute,
    private moviesService: MoviesService, private tvService: TvshowsService
  ) {}

  ngOnInit(): void {
    // this.showId = this.router.snapshot.params['id']
    this.router.params.subscribe((params) => {
      this.showId = params['id'];
    });

    this.showType = this.router.snapshot.params['type']

    if (this.showType === 'movie') {
      this.moviesService.getMovieById(this.showId).subscribe((data) => {
        this.show = data;
      });

      this.moviesService.getMovieVideos(this.showId).subscribe((data) => {
        console.log(data);
        this.showVideos = data;
      });

      this.moviesService.getMovieImages(this.showId).subscribe((data) => {
        console.log(data);
        this.showImages = data.slice(0, 12);
      });

      this.moviesService.getMovieCast(this.showId).subscribe((data) => {
        this.showCast = data;
      });

      this.moviesService.getSimilarMovies(this.showId).subscribe((data) => {
        this.similarMovies = data;
      });
    }

    if (this.showType === 'tv') {
      this.tvService.getTvShowById(this.showId).subscribe((data) => {
        this.show = mapToMovie(data)
      });

      this.tvService.getTvShowVideos(this.showId).subscribe((data) => {
        console.log(data);
        this.showVideos = data;
      });

      this.tvService.getTvShowImages(this.showId).subscribe((data) => {
        console.log(data);
        this.showImages = data.slice(0, 12);
      });

      this.tvService.getTvShowCast(this.showId).subscribe((data) => {
        this.showCast = data;
      });

      this.tvService.getSimilarTvShows(this.showId).subscribe((data) => {
        this.similarMovies = mapToMovies(data);
      });
    }

    
  }
}
