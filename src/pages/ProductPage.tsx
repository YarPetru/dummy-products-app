import React, { useState } from 'react';
import { ProductsTable, SearchPanel } from 'components/products';
import { useFilteredData } from 'hooks/use-filtered-data';

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

    if (sortBy === columnName) {
      setIsSortOrderDESC(prev => !prev);
    } else if (columnName === 'id' && isSortOrderDESC === undefined) {
      setIsSortOrderDESC(true);
    } else {
      setIsSortOrderDESC(false);
    }
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
        />
      )}
    </>
  );
};

export default ProductPage;
