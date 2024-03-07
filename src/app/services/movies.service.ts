import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getPopularMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/popular?api_key=ff43b9aef50a16f95690beccb5f8df07'
    );
  }
}
