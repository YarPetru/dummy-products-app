import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/redux-hooks';

import { ProductsTable, SearchPanel } from 'components/products';
import { useFilteredData } from 'hooks/use-filtered-data';
import { DeleteProductForm } from 'components/product-forms';
import { fetchProducts } from 'store/products';
import { IColumnTitles, columnsTitles } from 'types/types';

const ProductPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [isSortOrderDESC, setIsSortOrderDESC] = useState<boolean | undefined>(
    undefined
  );
  const [currentFilterColumn, setCurrentFilterColumn] = useState<
    IColumnTitles | ''
  >('');
  const [currentFilterValue, setCurrentFilterValue] = useState<string>('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useFilteredData(
    searchValue,
    sortBy,
    isSortOrderDESC,
    currentFilterColumn,
    currentFilterValue
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleSortBtnClick = (columnName: string) => {
    setSortBy(columnName);

    if (sortBy === columnName) {
      setIsSortOrderDESC(prev => !prev);
    } else if (columnName === 'id' && isSortOrderDESC === undefined) {
      setIsSortOrderDESC(true);
    } else {
      setIsSortOrderDESC(false);
    }
  };

  const filterValues = filteredProducts?.map(product => {
    if (currentFilterColumn !== '') {
      return String(product[currentFilterColumn]);
    } else {
      return '';
    }
  });

  const uniqueFilterValues = filterValues?.filter(
    (value, idx, arr) => value !== '' && arr.indexOf(value) === idx
  );

  const handleColSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setCurrentFilterColumn(e.currentTarget.value as IColumnTitles | '');
    setCurrentFilterValue('');
  };

  const handleFilterValueSelectChange = (
    e: React.FormEvent<HTMLSelectElement>
  ) => {
    setCurrentFilterValue(e.currentTarget.value);
  };

  return (
    <>
      <SearchPanel
        searchValue={searchValue}
        filterColumnsNames={columnsTitles}
        filterColumnValues={uniqueFilterValues}
        handleInputChange={handleInputChange}
        onColumnSelectChange={handleColSelectChange}
        onFilterValueSelectChange={handleFilterValueSelectChange}
      />
      {!!filteredProducts && (
        <ProductsTable
          products={filteredProducts}
          columnsNames={columnsTitles}
          onSortBtnClick={handleSortBtnClick}
        />
      )}
      <DeleteProductForm />
    </>
  );
};

export default ProductPage;
