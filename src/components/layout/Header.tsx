import React from 'react';
import Container from './Container';
import Navigation from './Navigation';
import s from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <Container>
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
