import { Component, Input } from '@angular/core';
import { Movie } from '../../../types/movie';
import { CommonModule } from '@angular/common';
import { imageBaseUrl } from '../../constants/image-sizes';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.scss',
})
export class ShowItemComponent {
  @Input() showItem: Movie | null = null;
  @Input() showType: 'tv' | 'movie' = 'movie'

  imageBaseUrl = imageBaseUrl;

  // Below code needed to reload route on param change
  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
