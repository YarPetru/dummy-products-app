import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/redux-hooks';

import { ProductsTable, SearchPanel } from 'components/products';
import { useFilteredData } from 'hooks/use-filtered-data';
import { DeleteProductForm } from 'components/product-forms';
import { fetchProducts } from 'store/products';

const ProductPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [isSortOrderDESC, setIsSortOrderDESC] = useState<boolean | undefined>(
    undefined
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
      <DeleteProductForm />
    </>
  );
};

export default ProductPage;
