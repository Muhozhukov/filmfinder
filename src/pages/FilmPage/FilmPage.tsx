import { useParams } from 'react-router-dom';
import FilmArtists from './components/FilmArtists/FilmArtists';
import FilmInfo from './components/FilmInfo/FilmInfo';
import style from './FilmPage.module.css';
import { TRateMovie, useGetFilmByIdQuery, useRateMovieMutation } from '../../api/moviesApi';
import Loader from '../../components/Loader/Loader';

const FilmPage = () => {
  const params = useParams();

  const { data: movie, isLoading } = useGetFilmByIdQuery(params.filmId!);
  const [rateMovie] = useRateMovieMutation();

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

  return (
    <div>
      <main className={style.wrapper}>
        {isLoading ? (
          <div className={style.loaderWrapper}>
            <Loader />
          </div>
        ) : (
          <>
            <FilmInfo handleRateMovie={handleRateMovie} movie={movie!} />
            <FilmArtists actors={movie!.actors} />
          </>
        )}
      </main>
    </div>
  );
};

export default FilmPage;
