import { useState } from 'react';
import arrowIcon from '../../assets/button.svg';
import style from './Pagination.module.css';

type TPagination = {
  onChange: (value: number) => void;
  maxPages: number;
};

const Pagination: React.FC<TPagination> = ({ onChange, maxPages }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const handleChangePageNumber = (value: number) => {
    setPageNumber(pageNumber + value);
    onChange(pageNumber);
  };

  return (
    <div className={style.paginationWrapper}>
      <button className={style.arrowButton} type="button" onClick={() => handleChangePageNumber(-1)} disabled={pageNumber === 1}>
        <img className={`${style.arrowImg} ${style.arrowImg_left} ${pageNumber === 1 && style.arrowImg_disabled}`} src={arrowIcon} alt="Предыдущая страница" />
      </button>
      <p>{pageNumber}</p>
      <button className={style.arrowButton} type="button" onClick={() => handleChangePageNumber(+1)} disabled={maxPages === pageNumber}>
        <img className={`${style.arrowImg} ${maxPages === pageNumber && style.arrowImg_disabled}`} src={arrowIcon} alt="Следующая страница" />
      </button>
    </div>
  );
};

export default Pagination;
