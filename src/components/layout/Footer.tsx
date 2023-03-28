import React from 'react';
import Navigation from './Navigation';
import Container from './Container';

const Footer: React.FC = () => {
  return (
    <footer className="gradient-b text-white pt-14 pb-8 font-bold">
      <Container>
        <Navigation />
        <p className="text-xs text-grey-medium font-normal mt-112px">
          &copy; learningPlatform, 2023
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
