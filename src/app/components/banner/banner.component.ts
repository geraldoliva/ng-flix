import { Component, Input} from '@angular/core';
import { ShowItemComponent } from '../show-item/show-item.component';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../types/movie';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [ShowItemComponent, CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() title: string = '';
  @Input() movies: Movie[] = [];
  @Input() showType: 'tv' | 'movie' = 'movie';

  constructor() {}

  // ngOnInit(): void {
  //   this.showsType = this.router.snapshot.params['type'];
  //   if (this.showsType === 'tv') {
  //     this.title = 'Similar TV Shows';
  //   }
  // }
}
