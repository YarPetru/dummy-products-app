import React, { useEffect, useState } from 'react';
import {
  NewProductForm,
  ProductsTable,
  SearchPanel,
} from 'components/products';
import { useFilteredData } from 'hooks/use-filtered-data';
// import { byField } from 'helpers/sort-by-field';

const ProductPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [isSortOrderDESC, setIsSortOrderDESC] = useState<boolean | undefined>(
    undefined
  );

  const filteredProducts = useFilteredData(
    searchValue,
    sortBy,
    isSortOrderDESC
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleSortBtnClick = (columnName: string) => {
    setSortBy(columnName);
    console.log('sortBy', sortBy);
    console.log('isSortOrderDESC', isSortOrderDESC);

    if (sortBy === columnName) {
      setIsSortOrderDESC(prev => !prev);
    } else if (columnName === 'id' && isSortOrderDESC === undefined) {
      setIsSortOrderDESC(true);
    } else {
      setIsSortOrderDESC(false);
    }
  };

  // filtering
  const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [filteredColumn, setFilteredColumn] = useState<string>('');

  const handleFilterBtnClick = (columnName: string) => {
    // setFilteredColumn(columnName);
    // setIsFilterOn(!isFilterOn);
    if (filteredColumn === columnName) {
      setFilteredColumn('');
      setIsFilterOn(false);
    } else {
      setFilteredColumn(columnName);
      setIsFilterOn(true);
    }
    // console.log(filteredColumn);
  };

  return (
    <>
      <SearchPanel
        searchValue={searchValue}
        handleInputChange={handleInputChange}
      />
      {!!filteredProducts && (
        <ProductsTable
          products={filteredProducts}
          onSortBtnClick={handleSortBtnClick}
          onFilterBtnClick={handleFilterBtnClick}
        />
      )}
      <NewProductForm />
    </>
  );
};

export default ProductPage;
