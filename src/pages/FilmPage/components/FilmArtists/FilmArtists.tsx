import React, { useEffect, useRef, useState } from 'react';
import style from './FilmArtists.module.css';
import ArtistCard from '../../../../components/ArtistCard/ArtistCard';
import buttonImg from '../../../../assets/button.svg';
import { Actor } from '../../../../api/moviesApi';

const FilmArtists: React.FC<{ actors: Actor[] }> = ({ actors }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const handleScroll = () => checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className={style.wrapper}>
      <h4 className={style.title}>Актёры</h4>
      <div className={style.artists} ref={scrollContainerRef}>
        {canScrollLeft && (
          <button className={style.button} type="button" onClick={scrollLeft}>
            <img className={`${style.btnImg} ${style.btnImg_left}`} src={buttonImg} alt="Скролл влево" />
          </button>
        )}
        {actors.map((actor) => (
          <ArtistCard actor={actor} />
        ))}
        {canScrollRight && (
          <button className={`${style.button} ${style.button_right}`} type="button" onClick={scrollRight}>
            <img className={style.btnImg} src={buttonImg} alt="Скролл вправо" />
          </button>
        )}
      </div>
    </section>
  );
};

export default FilmArtists;
