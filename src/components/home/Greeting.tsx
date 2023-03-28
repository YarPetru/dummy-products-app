import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'components/layout';
import s from './Greeting.module.scss';

const Greeting: React.FC = () => {
  return (
    <section className={s.section}>
      <Container>
        <h1 className={s.heading}>
          Wellcome to the <em>Sheepfish products</em>
        </h1>
        <h2 className={s.description}>
          This app allows you to view a list of{' '}
          <Link to="/products"> available products</Link>, as well as add your{' '}
          <Link to="/form">own product</Link>. Links to these pages will be
          available after <Link to="/login">authorization</Link>
        </h2>
      </Container>
    </section>
  );
};

export default Greeting;
