import { useAppSelector } from './redux-hooks';
import { getProducts } from 'store/products';
import { IProduct } from 'types/types';
import { byField } from 'helpers/sort-by-field';

import { IColumnTitles } from 'types/types';

export const useFilteredData = (
  searchValue: string,
  sortBy: string = 'id',
  desc: boolean | undefined,
  currentFilterColumn: IColumnTitles | '',
  currentFilterValue: string
) => {
  const { data: products } = useAppSelector(getProducts);

  if (!!products) {
    const finalProductslist = products.filter((product: IProduct) => {
      if (!searchValue && !currentFilterValue) {
        return products;
      } else if (searchValue && !currentFilterValue) {
        return (
          product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.category.toLowerCase().includes(searchValue.toLowerCase())
        );
      } else if (!searchValue && currentFilterValue) {
        if (currentFilterColumn !== '') {
          return product[currentFilterColumn]
            .toString()
            .toLowerCase()
            .includes(currentFilterValue.toLowerCase());
        } else return false;
      } else if (searchValue && currentFilterValue) {
        return (
          currentFilterColumn !== '' &&
          (product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            product.category
              .toLowerCase()
              .includes(searchValue.toLowerCase())) &&
          product[currentFilterColumn]
            .toString()
            .toLowerCase()
            .includes(currentFilterValue.toLowerCase())
        );
      } else return false;
    });
    if (desc === undefined) {
      return finalProductslist;
    } else {
      return finalProductslist.sort(byField(sortBy, desc));
    }
  }
};
