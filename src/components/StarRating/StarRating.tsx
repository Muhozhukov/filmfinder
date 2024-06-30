import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import filledStar from '../../assets/star_filled.svg';
import emptyStar from '../../assets/star_empty.svg';
import grayStar from '../../assets/star_hover.svg';
import style from './StarRating.module.css';
import { RootState } from '../../store/store';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const { isLogin } = useSelector((state: RootState) => state.user);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    onRatingChange(index);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((index) => {
      let starIcon = emptyStar;
      if (hoverRating !== null) {
        starIcon = hoverRating >= index ? filledStar : grayStar;
      } else if (rating >= index) {
        starIcon = filledStar;
      }

      return (
        <div key={index} className={style.starRating}>
          {isLogin ? (
            <img
              className={style.star}
              src={starIcon}
              alt="рейтинг"
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            />
          ) : (
            <img className={style.star} src={starIcon} alt="рейтинг" key={index} />
          )}
          <p className={style.ratingNumber}>{index}</p>
        </div>
      );
    });
  };

  return <div className={style.wrapper}>{renderStars()}</div>;
};

export default StarRating;
