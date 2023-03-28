import React, { useState } from 'react';
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
  // const [value, setValue] = useState<string>('');

  return (
    <section>
      <Container>
        <form name="search-form" className={s.form}>
          <input
            type="text"
            placeholder="Search by categories or products"
            className={s.form__input}
            value={searchValue}
            onChange={handleInputChange}
            // onClick={handleInputClick}
          />
          <div className={s.iconWrapper}>
            <TbSearch />
          </div>
        </form>
        {/* <div>SearchPanel</div> */}
      </Container>
    </section>
  );
};

export default SearchPanel;
