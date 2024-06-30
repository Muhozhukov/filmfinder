import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';
import arrowIcon from '../../assets/arrowIcon.svg';

interface FilterOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  placeholder: string;
  options: FilterOption[];
  onChange: (selectedValues: FilterOption) => void;
  activeValue?: FilterOption | undefined;
}

const Select: React.FC<CustomSelectProps> = ({ label, placeholder, options, onChange, activeValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<FilterOption>({
    label: '',
    value: '0',
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLabelClick = () => {
    setIsOpen(true);
  };

  const handleCheckboxChange = (option: FilterOption) => {
    setSelectedValue(option);
    onChange(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (activeValue) {
      setSelectedValue(activeValue);
    }
  }, [activeValue]);
  return (
    <div ref={containerRef} className={styles.select}>
      <div className={styles.wrapper}>
        <label className={styles.select__label} htmlFor={label} onClick={handleLabelClick}>
          {label}
        </label>
        <input
          type="text"
          className={styles.select__input}
          readOnly
          placeholder={placeholder}
          id={label}
          value={selectedValue?.label}
          onClick={handleInputClick}
        />
        <img className={`${styles.img} ${isOpen && styles.img_opened}`} src={arrowIcon} alt="Выберите вариант" />
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <div className={styles.dropdown__item} key={option.value} onClick={() => handleCheckboxChange(option)}>
              <label className={styles.dropdown__label} htmlFor={option.value}>
                {option.label}
              </label>
              <input
                type="radio"
                className={styles.dropdown__checkbox}
                id={option.value}
                value={option.label}
                checked={selectedValue?.value === option.value}
                onChange={() => handleCheckboxChange(option)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
