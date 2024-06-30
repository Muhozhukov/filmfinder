import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './FilmCard.module.css';
import StarRating from '../../../../components/StarRating/StarRating';
import { ShortMovieInfo, TRateMovie } from '../../../../api/moviesApi';
import { RootState } from '../../../../store/store';

type TFilmCard = {
  movie: ShortMovieInfo;
  handleRateMovie: (data: TRateMovie) => void;
};
const FilmCard: React.FC<TFilmCard> = ({ movie, handleRateMovie }) => {
  const { isLogin } = useSelector((state: RootState) => state.user);
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
      <div className={style.film}>
        <img className={style.img} src={movie.poster} alt={movie.title} />
        <div className={style.info}>
          <Link className={style.link} to={`/film/${movie.id}`}>
            <h4 className={style.title}>{movie.title}</h4>
          </Link>
          <div className={style.description}>
            <div className={style.description__wrapper}>
              <div className={style.description__subtitle}>
                <p className={style.subtitle}>Жанр</p>
              </div>
              <div className={style.description__subinfo}>
                <p className={style.subinfo}>{movie.genre}</p>
              </div>
            </div>
            <div className={style.description__wrapper}>
              <div className={style.description__subtitle}>
                <p className={style.subtitle}>Год выпуска</p>
              </div>
              <div className={style.description__subinfo}>
                <p className={style.subinfo}>{movie.release_year}</p>
              </div>
            </div>
            <div className={style.description__wrapper}>
              <div className={style.description__subtitle}>
                <p className={style.subtitle}>Описание</p>
              </div>
              <div className={style.description__subinfo}>
                <p className={style.subinfo}>{movie.description}</p>
              </div>
            </div>
            <div />
          </div>
        </div>
      </div>
      {isLogin && <StarRating rating={rating} onRatingChange={handleRatingChange} />}
    </div>
  );
};

export default FilmCard;
