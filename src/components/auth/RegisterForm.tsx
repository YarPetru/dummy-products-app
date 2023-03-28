import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import BeatLoader from 'react-spinners/BeatLoader';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';

import classNames from 'classnames';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { login } from 'store/auth/auth-slice';
import { useAppDispatch } from 'hooks/redux-hooks';

import Container from 'components/layout/Container';

// import { useAuthState, useFetchingUserState } from 'store/store';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .matches(/^[a-zA-Z0-9]/, 'Email must start with letter or number')
    .matches(
      /^([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{2,})+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'The Email field can only contain Latin letters, numbers and signs, and at least 2 charachters before "@"'
    )
    .required('Email is a required field'),
  password: yup
    .string()
    .matches(/^[a-zA-Z0-9]/, 'Password must start with letter or number')
    .matches(
      /^([a-zA-Z0-9@.!#$%&’*+/=?^_`{|}~-])*$/,
      'Password must not contain spaces'
    )
    .min(6, 'Password is too short - should be 6 chars minimum')
    .max(30, 'Password must contain no more than 30 characters')
    .required('Password is a required field'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is a required field'),
});

const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

const RegisterForm: React.FC = () => {
  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSubmit = (values: any, actions: any) => {
    setIsFetchingUser(true);
    const email = values?.email?.toLowerCase();
    const password = values?.password;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        if (userCredentials.user.email) {
          dispatch(
            login({
              id: userCredentials.user.uid,
              email: userCredentials.user.email,
            })
          );
          toast.success(
            `Hello 🤗. You have successfully registered as ${userCredentials.user.email}`,
            {
              toastId: nanoid(),
            }
          );
          localStorage.setItem(
            'auth-full-data',
            JSON.stringify(userCredentials)
          );
          setIsFetchingUser(false);
          actions.resetForm();
        }
      })
      .catch(error => {
        const errorMessage = error.message;
        toast.warn(`Auth Error. Try again please. ${errorMessage}`, {
          toastId: nanoid(),
        });
        setIsFetchingUser(false);
      });
  };

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const toggleEye = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const openEyeClasses = classNames(
    'absolute right-2 top-10 text-grey-dark transition-all',
    {
      'opacity-0': isVisiblePassword,
    }
  );

  const closeEyeClasses = classNames(
    'absolute right-2 top-10 text-grey-dark transition-all',
    {
      'opacity-0': !isVisiblePassword,
    }
  );

  return (
    <>
      <div className="gradient gradient-container"></div>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, touched }) => {
            return (
              <Form
                name="LoginForm"
                className="relative flex flex-col justify-center text-white w-96"
              >
                <div className="relative flex flex-col mb-5">
                  <label htmlFor="email" className="mb-2">
                    Email <span className="text-yellow-accent">*</span>
                  </label>
                  <Field
                    className="px-3 py-2 font-medium text-black outline-none rounded"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="your@email.com"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-yellow-accent"
                  />
                </div>

                <div className="relative flex flex-col mb-5">
                  <label htmlFor="password" className="mb-2">
                    Password <span className="text-yellow-accent">*</span>
                  </label>
                  <Field
                    className="relative px-3 py-2 font-medium text-black outline-none rounded"
                    id="password"
                    name="password"
                    type={isVisiblePassword ? 'text' : 'password'}
                    placeholder="enter your password"
                    autoComplete="off"
                  />
                  <TbEyeOff className={closeEyeClasses} onClick={toggleEye} />
                  <TbEye className={openEyeClasses} onClick={toggleEye} />

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-yellow-accent"
                  />
                </div>

                <div className="relative flex flex-col mb-5">
                  <label htmlFor="repeatPassword" className="mb-2">
                    Password confirmation{' '}
                    <span className="text-yellow-accent">*</span>
                  </label>
                  <Field
                    className="relative px-3 py-2 font-medium text-black outline-none rounded"
                    id="repeatPassword"
                    name="repeatPassword"
                    type="password"
                    placeholder="confirm your password"
                    autoComplete="off"
                  />

                  <ErrorMessage
                    name="repeatPassword"
                    component="div"
                    className="text-sm text-yellow-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={(!touched.email && !touched.password) || !isValid}
                  className=" font-normal text-yellow-light border border-yellow-light rounded px-4 py-6px overflow-hidden hover:text-black  transition-all duration-600 relative z-50 
                  disabled:after:hidden disabled:border-white-15 disabled:text-white-15
                  after:h-0  after:w-full after:absolute after:left-0 after:top-1/2 after:-z-10 after:bg-yellow-light active:after:bg-yellow-accent 
                  hover:after:content-[''] hover:after:w-full hover:after:left-0 hover:after:top-0 hover:after:block hover:after:h-full  after:transition-all after:duration-600"
                >
                  {isFetchingUser ? (
                    <BeatLoader
                      cssOverride={{
                        textAlign: 'center',
                      }}
                      color="#D4DFFF"
                      size="6px"
                    />
                  ) : (
                    'SignUp'
                  )}
                </button>
                <div className="flex justify-between mt-5">
                  <p>Are you already registered?</p>
                  <Link
                    className="text-yellow-light font-semibold hover:underline transition-all"
                    to="/login"
                  >
                    Login
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
};

export default RegisterForm;
