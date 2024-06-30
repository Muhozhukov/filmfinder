import style from './Input.module.css';

type TInput = {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
};

const Input: React.FC<TInput> = ({ label, name, placeholder, required }) => {
  return (
    <div className={style.wrapper}>
      <label className={style.label} htmlFor={label}>
        {label} {required && <p className={style.requiredMark}>&nbsp;*</p>}
      </label>
      <input className={style.input} name={name} id={label} placeholder={placeholder} />
    </div>
  );
};

export default Input;
