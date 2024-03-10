import { Component, Input } from '@angular/core';
import { Movie } from '../../../types/movie';
import { CommonModule } from '@angular/common';
import { imageBaseUrl } from '../../constants/image-sizes';

@Component({
  selector: 'app-show-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.scss'
})
export class ShowItemComponent {
  @Input() showItem: Movie | null = null

  imageBaseUrl = imageBaseUrl
}
