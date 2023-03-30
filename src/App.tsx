import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from 'react-spinners/BeatLoader';

import { useAppDispatch } from 'hooks/redux-hooks';
import { login } from 'store/auth/auth-slice';
import { PublicRoute, PrivateRoute } from 'components/routes';
import { Layout } from 'components/layout';

const HomePage = lazy(() => import('pages/HomePage'));
const ProductPage = lazy(() => import('pages/ProductPage'));
const FormPage = lazy(() => import('pages/FormPage'));

const LoginPage = lazy(() => import('pages/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [firstRenderEnded, setFirstRenderEnded] = useState<boolean>(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('auth-full-data')!);
    if (data) {
      dispatch(login({ id: data.user.uid, email: data.user.email }));
    }
    setFirstRenderEnded(true);
  }, [dispatch]);

  return (
    <>
      {firstRenderEnded && (
        <>
          <Suspense
            fallback={
              <BeatLoader
                cssOverride={{ textAlign: 'center', marginTop: '64px' }}
                color="#158FFF"
                size="16px"
                margin="8px"
              />
            }
          >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <HomePage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <PrivateRoute>
                      <ProductPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/form"
                  element={
                    <PrivateRoute>
                      <FormPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute restricted>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute restricted>
                      <RegisterPage />
                    </PublicRoute>
                  }
                />
              </Route>
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
          <ToastContainer
            theme="light"
            position="top-center"
            autoClose={5000}
          />
        </>
      )}
    </>
  );
};

export default App;
