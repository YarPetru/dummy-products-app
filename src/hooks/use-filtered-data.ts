import { useAppSelector } from './redux-hooks';
import { getProducts } from 'store/products';
import { IProduct } from 'types/types';
import { byField } from 'helpers/sort-by-field';

export const useFilteredData = (
  currentFilter: string,
  sortBy: string = 'id',
  desc: boolean | undefined
) => {
  const { data: products } = useAppSelector(getProducts);

  if (!!products) {
    const finalProductslist = products.filter((product: IProduct) => {
      if (!currentFilter) return products;
      else
        return (
          product.title.toLowerCase().includes(currentFilter.toLowerCase()) ||
          product.category.toLowerCase().includes(currentFilter.toLowerCase())
        );
    });
    if (desc === undefined) {
      return finalProductslist;
    } else {
      return finalProductslist.sort(byField(sortBy, desc));
    }
  }
};
