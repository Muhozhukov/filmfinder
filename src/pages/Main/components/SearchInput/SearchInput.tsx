import React, { useState } from 'react';
import style from './SearchInput.module.css';
import searchIcon from '../../../../assets/searchIcon.svg';

type TSearchInput = {
  placeholder: string;
  onChange: (valeue: string) => void;
};

const SearchInput: React.FC<TSearchInput> = ({ placeholder, onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (val: string) => {
    setValue(val);
    onChange(val);
  };

  return (
    <div className={style.wrapper}>
      <input className={style.input} value={value} placeholder={placeholder} onChange={(e) => handleChange(e.target.value)} />
      <img className={style.img} src={searchIcon} alt="Поиск" />
    </div>
  );
};

export default SearchInput;
