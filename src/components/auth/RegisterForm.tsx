import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import BeatLoader from 'react-spinners/BeatLoader';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { login } from 'store/auth/auth-slice';
import { useAppDispatch } from 'hooks/redux-hooks';

import Container from 'components/layout/Container';
import s from './RegisterForm.module.scss';

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
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

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

  const toggleEye = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  return (
    <section className={s.section}>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, touched }) => {
            return (
              <Form name="RegisterForm" className={s.form}>
                <div className={s.fieldsWrapper}>
                  <label htmlFor="email" className={s.label}>
                    Email <span>*</span>
                  </label>
                  <Field
                    className={s.field}
                    id="email"
                    name="email"
                    type="text"
                    placeholder="your@email.com"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={s.validationError}
                  />
                </div>

                <div className={s.fieldsWrapper}>
                  <label htmlFor="password" className={s.label}>
                    Password <span>*</span>
                  </label>
                  <Field
                    className={s.field}
                    id="password"
                    name="password"
                    type={isVisiblePassword ? 'text' : 'password'}
                    placeholder="enter your password"
                    autoComplete="off"
                  />
                  {isVisiblePassword ? (
                    <TbEyeOff className={s.eye} onClick={toggleEye} size={18} />
                  ) : (
                    <TbEye className={s.eye} onClick={toggleEye} size={18} />
                  )}

                  <ErrorMessage
                    name="password"
                    component="div"
                    className={s.validationError}
                  />
                </div>

                <div className={s.fieldsWrapper}>
                  <label htmlFor="repeatPassword" className={s.label}>
                    Password confirmation <span>*</span>
                  </label>
                  <Field
                    className={s.field}
                    id="repeatPassword"
                    name="repeatPassword"
                    type="password"
                    placeholder="confirm your password"
                    autoComplete="off"
                  />

                  <ErrorMessage
                    name="repeatPassword"
                    component="div"
                    className={s.validationError}
                  />
                </div>

                <button
                  type="submit"
                  disabled={(!touched.email && !touched.password) || !isValid}
                  className={s.submitBtn}
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
                <div className={s.formFooter}>
                  <p>Are you already registered?</p>
                  <Link to="/login" className={s.formFooter__link}>
                    Login
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </section>
  );
};

export default RegisterForm;
