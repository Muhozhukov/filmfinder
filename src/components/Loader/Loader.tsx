import loaderImg from '../../assets/Loader.svg';
import style from './Loader.module.css';

const Loader = () => {
  return <img className={style.img} src={loaderImg} alt="Загрузка" />;
};

export default Loader;
