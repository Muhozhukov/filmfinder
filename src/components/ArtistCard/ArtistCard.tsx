import style from './ArtistCard.module.css';
import { Actor } from '../../api/moviesApi';

const ArtistCard: React.FC<{ actor: Actor }> = ({ actor }) => {
  return (
    <div className={style.artistCard}>
      <img className={style.photo} src={actor.photo} alt="Актер" />
      <p className={style.name}>{actor.name}</p>
    </div>
  );
};

export default ArtistCard;
