import React, { useEffect, useState } from 'react';
import style from './FilmInfo.module.css';
import StarRating from '../../../../components/StarRating/StarRating';
import { FullMovieInfo, TRateMovie } from '../../../../api/moviesApi';

type TFilmInfo = {
  movie: FullMovieInfo;
  handleRateMovie: (data: TRateMovie) => void;
};
const FilmInfo: React.FC<TFilmInfo> = ({ movie, handleRateMovie }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    handleRateMovie({ movieId: movie.id, user_rate: newRating });
  };

  useEffect(() => {
    if (movie.rating) {
      setRating(Math.round(+movie.rating));
    }
  }, [movie]);

  return (
    <div className={style.wrapper}>
      <img className={style.poster} src={movie.poster} alt="постер" />
      <div className={style.info}>
        <div className={style.infoHead}>
          <h2 className={style.title}>{movie.title}</h2>
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
        </div>
        <div className={style.description}>
          <div className={style.description__wrapper}>
            <div className={style.description__subtitle}>
              <p className={style.subtitle}>Жанр:</p>
            </div>
            <div className={style.description__subinfo}>
              <p className={style.subinfo}>{movie.genre}</p>
            </div>
          </div>
          <div className={style.description__wrapper}>
            <div className={style.description__subtitle}>
              <p className={style.subtitle}>Год выпуска:</p>
            </div>
            <div className={style.description__subinfo}>
              <p className={style.subinfo}>{movie.release_year}</p>
            </div>
          </div>
          <div className={style.description__wrapper}>
            <div className={style.description__subtitle}>
              <p className={style.subtitle}>Рейтинг:</p>
            </div>
            <div className={style.description__subinfo}>
              <p className={style.subinfo}>{movie.rating}</p>
            </div>
          </div>
          <p className={style.subtitle}>Описание</p>
          <p className={style.filmDescription}>{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;
