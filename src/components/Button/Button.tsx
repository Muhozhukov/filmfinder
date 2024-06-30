import React from 'react';
import styles from './Button.module.css';

type TButton = {
  children: string;
  type?: 'button' | 'submit' | 'reset';
  primary?: boolean | undefined;
  onClick?: (data: unknown) => void;
};

const Button: React.FC<TButton> = ({ children, type = 'button', primary = false, onClick }) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`${styles.button} ${primary ? styles.button_primary : styles.button_secondary}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
