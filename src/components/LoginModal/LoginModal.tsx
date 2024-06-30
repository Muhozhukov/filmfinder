import { createPortal } from 'react-dom';
import React, { useRef } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import style from './LoginModal.module.css';
import closeIcon from '../../assets/close.svg';
import { TLoginRequest } from '../../api/userApi';

type TModal = {
  onSubmit: (data: TLoginRequest) => void;
  onClose: () => void;
};

const LoginModal: React.FC<TModal> = ({ onSubmit, onClose }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    onSubmit({ username, password });
    onClose();
  };

  const component = (
    <div className={style.layout}>
      <div className={style.wrapper}>
        <div className={style.headWrapper}>
          <h4 className={style.title}>Авторизация</h4>
          <button className={style.closeBtn} type="button" onClick={onClose}>
            <img className={style.closeImg} src={closeIcon} alt="Закрыть окно" />
          </button>
        </div>
        <form className={style.form} ref={formRef} onSubmit={handleSubmit}>
          <div className={style.inputWrapper}>
            <Input placeholder="Введите логин" required label="Логин" name="username" />
            <Input placeholder="Введите пароль" required label="Пароль" name="password" />
          </div>
          <div className={style.buttonContainer}>
            <Button primary type="submit">
              Войти
            </Button>
            <Button onClick={onClose}>Отменить</Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(component, document.body);
};

export default LoginModal;
