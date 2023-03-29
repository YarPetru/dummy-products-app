import React from 'react';
import { Container } from 'components/layout';
import s from './SearchPanel.module.scss';
import { TbSearch } from 'react-icons/tb';

interface IChange {
  (e: React.ChangeEvent<HTMLInputElement>): void;
}

interface ISearchPanel {
  searchValue: string;
  handleInputChange: IChange;
}

const SearchPanel: React.FC<ISearchPanel> = ({
  searchValue,
  handleInputChange,
}) => {
  return (
    <section className={s.section}>
      <Container>
        <form name="search-form" className={s.form}>
          <input
            type="text"
            placeholder="Search by categories or products"
            className={s.form__input}
            value={searchValue}
            onChange={handleInputChange}
          />
          <div className={s.iconWrapper}>
            <TbSearch />
          </div>
        </form>
      </Container>
    </section>
  );
};

export default SearchPanel;
