import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import Button from '../Button/Button';
import LoginModal from '../LoginModal/LoginModal';
import { RootState } from '../../store/store';
import { TLoginRequest } from '../../api/userApi';
import userIcon from '../../assets/userIcon.svg';

type THeader = {
  handleLogin: (data: TLoginRequest) => void;
  handleLogout: () => void;
};
const Header: React.FC<THeader> = ({ handleLogin, handleLogout }) => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Link className={styles.header__link} to="/">
          Фильмопоиск
        </Link>
        <div className="header__buttons-container">
          {!isLogin ? (
            <Button primary onClick={() => setModalIsVisible(true)}>
              Войти
            </Button>
          ) : (
            <div className={styles.userWrapper}>
              <img src={userIcon} alt="пользователь" />
              <Button onClick={handleLogout}>Выйти</Button>
            </div>
          )}
        </div>
      </header>
      {modalIsVisible && <LoginModal onSubmit={(data) => handleLogin(data)} onClose={() => setModalIsVisible(false)} />}
    </>
  );
};

export default Header;
