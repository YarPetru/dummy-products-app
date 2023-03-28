import { IProduct } from 'types/types';

export function byField(field: string, desc: boolean) {
  if (desc)
    return (a: IProduct, b: IProduct) =>
      a[field as keyof IProduct] > b[field as keyof IProduct] ? -1 : 1;
  else
    return (a: IProduct, b: IProduct) =>
      a[field as keyof IProduct] > b[field as keyof IProduct] ? 1 : -1;
}
