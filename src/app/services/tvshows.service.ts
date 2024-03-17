import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TvShow, TvShowDto } from '../../types/tvshow';
import { VideoDto } from '../../types/video';
import { ImageDto } from '../../types/image';
import { CreditsDto } from '../../types/credits';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'ff43b9aef50a16f95690beccb5f8df07';

  constructor(private http: HttpClient) {}

  getTvShowsByType(type: string, count = 20) {
    return this.http
      .get<TvShowDto>(`${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)));
  }

  getTvShowById(id: string) {
    return this.http.get<TvShow>(
      `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`
    );
  }

  getTvShowVideos(id: string) {
    return this.http
      .get<VideoDto>(`${this.apiUrl}/tv/${id}/videos?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results));
  }

  getTvShowImages(id: string) {
    return this.http
      .get<ImageDto>(`${this.apiUrl}/tv/${id}/images?api_key=${this.apiKey}`)
      .pipe(map((data) => data.backdrops));
  }

  getTvShowCast(id: string) {
    return this.http
      .get<CreditsDto>(`${this.apiUrl}/tv/${id}/credits?api_key=${this.apiKey}`)
      .pipe(map((data) => data.cast));
  }

  getSimilarTvShows(id: string) {
    return this.http
      .get<TvShowDto>(`${this.apiUrl}/tv/${id}/similar?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, 12)));
  }

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? 'search/tv' : 'tv/popular';
    return this.http.get<TvShowDto>(
      `${this.apiUrl}/${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`
    );
    // .pipe(map((data) => data.results));
  }
}
