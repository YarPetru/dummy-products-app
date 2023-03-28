import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
// import Footer from './Footer';
// import { useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  // const { pathname } = useLocation();

  // const isFooterNeeded =
  //   !pathname.includes('login') && !pathname.includes('register');

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* {isFooterNeeded && <Footer />} */}
    </div>
  );
};

export default Layout;
