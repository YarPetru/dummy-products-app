import React from 'react';
import { Container } from 'components/layout';
import s from './SearchPanel.module.scss';
import { TbSearch, TbArrowBigDownLinesFilled } from 'react-icons/tb';
import { IColumnTitles, ITitles } from 'types/types';

interface IChange {
  (e: React.ChangeEvent<HTMLInputElement>): void;
}

interface ISelectChange {
  (e: React.FormEvent<HTMLSelectElement>): void;
}

interface ISearchPanel {
  searchValue: string;
  filterColumnsNames: ITitles;
  filterColumnValues?: string[];
  handleInputChange: IChange;
  onColumnSelectChange: ISelectChange;
  onFilterValueSelectChange: ISelectChange;
}

const SearchPanel: React.FC<ISearchPanel> = ({
  searchValue,
  filterColumnsNames,
  filterColumnValues,
  handleInputChange,
  onColumnSelectChange,
  onFilterValueSelectChange,
}) => {
  return (
    <section className={s.section}>
      <Container>
        <div className={s.panelWrapper}>
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
          <div className={s.filtersWrapper}>
            <label className={s.filterLabel}>
              Choose a filter:
              <select
                name="column-names"
                id="column-names"
                defaultValue=""
                onChange={onColumnSelectChange}
              >
                <option value="">filters off</option>
                {filterColumnsNames?.map((col: IColumnTitles) => {
                  return (
                    <option value={col} key={col}>
                      {col}
                    </option>
                  );
                })}
              </select>
              <select
                name="column-values"
                id="column-values"
                onChange={onFilterValueSelectChange}
              >
                {filterColumnValues?.map(value => {
                  return (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div className={s.anchorWrapper}>
            <a href="#delete-form" className={s.anchor}>
              Go to delete
              <TbArrowBigDownLinesFilled color="#158fff" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SearchPanel;
