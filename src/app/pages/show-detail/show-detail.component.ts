import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../../types/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.scss',
})
export class ShowDetailComponent implements OnInit {
  showId = '';
  show: Movie | null= null
  constructor(private router: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    // this.showId = this.router.snapshot.params['id']
    this.router.params.subscribe((params) => {
      this.showId = params['id']
    });

    this.moviesService.getMovieById(this.showId).subscribe(data => {
      console.log(data)
      this.show = data
    })
    
  }
}
