import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilmCard from './components/FilmCard/FilmCard';
import SearchInput from './components/SearchInput/SearchInput';
import Select from '../../components/Select/Select';
import styles from './Main.module.css';
import { ShortMovieInfo, TRateMovie, useGetSearchFilmsQuery, useRateMovieMutation } from '../../api/moviesApi';
import Loader from '../../components/Loader/Loader';
import { debounce } from '../../utils/debounce';
import { GENRES_MAP, YEARS } from '../../utils/constants';
import Pagination from '../../components/Pagination/Pagination';

const Main = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  type TSearchParams = {
    title: string;
    genre: string;
    release_year: string;
    sort_by: string;
    order: string;
    page: number;
    limit: number;
  };

  const initialSearchParams: TSearchParams = {
    title: urlSearchParams.get('title') || '',
    genre: urlSearchParams.get('genre') || '',
    release_year: urlSearchParams.get('release_year') || '',
    sort_by: urlSearchParams.get('sort_by') || 'rating',
    order: urlSearchParams.get('order') || 'desc',
    page: Number(urlSearchParams.get('page')) || 1,
    limit: Number(urlSearchParams.get('limit')) || 10,
  };

  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [debouncedSearchParams, setDebouncedSearchParams] = useState<TSearchParams>(searchParams);

  const { data: movies, isLoading } = useGetSearchFilmsQuery(debouncedSearchParams);
  const [rateMovie] = useRateMovieMutation();
  const debouncedSetSearchParams = useMemo(() => debounce(setDebouncedSearchParams, 300), []);

  const handleSetSearchParams = (name: string, value: string) => {
    const page = name === 'page' ? +value : 1;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
      page,
    }));
  };

  const handleRateMovie = async (data: TRateMovie) => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        return;
      }
      await rateMovie({ jwt, data }).unwrap();
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  useEffect(() => {
    debouncedSetSearchParams(searchParams);
  }, [searchParams, debouncedSetSearchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    (Object.keys(debouncedSearchParams) as (keyof TSearchParams)[]).forEach((key) => {
      const value = debouncedSearchParams[key];
      if (value !== undefined && value !== '') {
        params.set(key, value.toString());
      }
    });
    setUrlSearchParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchParams]);

  return (
    <main className={styles.main}>
      <div className={styles.filter}>
        <h5 className={styles.filter__name}>Фильтр</h5>
        <Select
          label="Жанр"
          placeholder="Выберите жанр"
          activeValue={{
            label: GENRES_MAP[searchParams.genre],
            value: searchParams.genre,
          }}
          options={Object.entries(GENRES_MAP).map(([key, value]) => {
            return {
              label: value,
              value: key,
            };
          })}
          onChange={(searchValue) => handleSetSearchParams('genre', searchValue.value)}
        />
        <Select
          label="Год выпуска"
          placeholder="Выберите год"
          activeValue={{
            label: YEARS[searchParams.release_year],
            value: searchParams.release_year,
          }}
          options={Object.entries(YEARS).map(([key, value]) => {
            const k = key === '0' ? '' : key;
            return {
              label: value,
              value: k,
            };
          })}
          onChange={(searchValue) => handleSetSearchParams('release_year', searchValue.value)}
        />
      </div>
      <div className={styles.mainSection}>
        <div>
          <SearchInput placeholder="Название фильма" onChange={(searchValue) => handleSetSearchParams('title', searchValue)} />
        </div>
        {isLoading ? (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        ) : (
          <div className={styles.filmSection}>
            {!movies || !(movies.search_result.length > 0) ? (
              <div className={styles.notFoundWrapper}>
                <h4 className={styles.notFountTitle}>Фильмы не найдены</h4>
                <p className={styles.notFoundText}>Измените запрос и попробуйте снова</p>
              </div>
            ) : (
              movies.search_result.map((movie: ShortMovieInfo) => <FilmCard key={movie.id} movie={movie} handleRateMovie={handleRateMovie} />)
            )}
            {movies && movies.total_pages > 1 && (
              <Pagination maxPages={movies.total_pages} onChange={(searchValue: number) => handleSetSearchParams('page', searchValue.toString())} />
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;
