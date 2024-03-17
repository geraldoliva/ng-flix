import { Movie, MoviesDto } from './movie';

export type TvShow = {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
};

export type TvShowDto = {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
};

export function mapToMoviesDto(tvShowDto: TvShowDto): MoviesDto {
  return {
    ...tvShowDto,
    results: mapToMovies(tvShowDto.results),
  };
}

export function mapToMovies(tvShows: TvShow[]): Movie[] {
  return tvShows.map((tvShow: TvShow) => {
    return {
      ...tvShow,
      title: tvShow.name,
      original_title: tvShow.original_name,
    };
  });
}

export function mapToMovie(tvShow: TvShow): Movie {
  return {
    ...tvShow,
    title: tvShow.name,
    original_title: tvShow.original_name,
  };
}
