import React from 'react';
import { LoginForm } from 'components/auth';

const LoginPage: React.FC = () => {
  return (
    <>
      <h6 className="text-white text-center font-normal mt-10">
        To access all features please log in <br />
        👇👨‍💻
      </h6>
      <LoginForm />
    </>
  );
};

export default LoginPage;
