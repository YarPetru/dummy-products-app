import React from 'react';
import s from './ErrorMessage.module.scss';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className={s.errorWrapper}>
      <h6 className={s.errorText}>
        Oops. Something went wrong with fetching data.
        <br /> Try again please.
        <br /> Error: <strong>{message}</strong>
      </h6>
    </div>
  );
};

export default ErrorMessage;
