import React from 'react';
import { NavLink } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'store/auth';
import { logout } from 'store/auth/auth-slice';

import { useAppDispatch } from 'hooks/redux-hooks';
import logo from 'images/sheepfish-logo.png';
import s from './Navigation.module.scss';

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const handleLogout = () => {
    const auth = getAuth();
    console.log('logout');
    dispatch(logout());
    signOut(auth);
    toast.success(`You have successfully logged out. See you later 👋`, {
      toastId: nanoid(),
    });

    localStorage.removeItem('auth-full-data');
  };

  return (
    <nav className={s.navigation}>
      <div className={`${s.linksWrapper} ${s.linksWrapper__left}`}>
        <img src={logo} alt="sheepfish logo" width="56px" height="56px" />
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${s.navigation__link} ${s.activeLink}`
              : s.navigation__link
          }
        >
          Home
        </NavLink>
      </div>
      <div className={`${s.linksWrapper} ${s.linksWrapper__center}`}>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? `${s.navigation__link} ${s.activeLink}`
              : s.navigation__link
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/form"
          className={({ isActive }) =>
            isActive
              ? `${s.navigation__link} ${s.activeLink}`
              : s.navigation__link
          }
        >
          Form
        </NavLink>
      </div>

      <div className={`${s.linksWrapper} ${s.linksWrapper__right}`}>
        {isLoggedIn ? (
          <button type="button" onClick={handleLogout} className={s.logoutBtn}>
            Log out
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? `${s.navigation__link} ${s.activeLink}`
                  : s.navigation__link
              }
            >
              Log in
            </NavLink>
            <NavLink className={s.registerLink} to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
