import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, GenresEnglish } from '../utils/constants';

export type Actor = {
  name: string;
  photo: string; // base64 img
};

export type FullMovieInfo = {
  id: string;
  title: string;
  description: string;
  release_year: number;
  poster: string; // base64 img
  genre: string;
  rating: string; // float
  total_rates_count: string; // int
  actors: Actor[];
};

export type ShortMovieInfo = Omit<FullMovieInfo, 'actors' | 'total_rates_count'>;

export type TRateMovie = {
  movieId: string;
  user_rate: number;
};
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getFilmById: builder.query<FullMovieInfo, string>({
      query: (id) => `movie/${id}`,
    }),
    getSearchFilms: builder.query<
      { search_result: ShortMovieInfo[]; total_pages: number },
      {
        title?: string;
        genre?: GenresEnglish;
        release_year?: string;
        sort_by?: string;
        order?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({ title, genre, release_year, sort_by = 'rating', order = 'desc', page = 1, limit = 5 }) => {
        const params = new URLSearchParams();
        if (title) params.append('title', title);
        if (genre) params.append('genre', genre);
        if (release_year) params.append('release_year', release_year);
        params.append('sort_by', sort_by);
        params.append('order', order);
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        return `search?${params.toString()}`;
      },
    }),
    rateMovie: builder.mutation<{ token: 'string' }, { jwt: string; data: TRateMovie }>({
      query: ({ jwt, data }) => ({
        url: 'rateMovie',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: data,
      }),
    }),
  }),
});

export const { useGetFilmByIdQuery, useGetSearchFilmsQuery, useRateMovieMutation } = moviesApi;
