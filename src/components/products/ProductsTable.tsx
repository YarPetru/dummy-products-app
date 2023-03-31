import React from 'react';
import { Container } from 'components/layout';
import { TbArrowsSort } from 'react-icons/tb';
import s from './ProductsTable.module.scss';
import { useAppSelector } from 'hooks/redux-hooks';
import { getProducts } from 'store/products';
import { ErrorMessage, Skeleton } from 'components/common';
import { IProduct, ITitles } from 'types/types';

interface IBtnClick {
  (columnName: string): void;
}

interface IProductsTable {
  products: IProduct[];
  columnsNames: ITitles;
  onSortBtnClick: IBtnClick;
}

const ProductsTable: React.FC<IProductsTable> = ({
  products,
  columnsNames,
  onSortBtnClick,
}) => {
  const { isLoading, error } = useAppSelector(getProducts);

  const tableHeaderContent = columnsNames.map(item => {
    return (
      <th scope="col" className={s.table__cell} key={item}>
        <div className={s.cellContentWrapper}>
          <span>{item.toUpperCase()}</span>
          <div className={s.buttonsWrapper}>
            <button type="button" onClick={() => onSortBtnClick(item)}>
              <TbArrowsSort color="current" />
            </button>
          </div>
        </div>
      </th>
    );
  });

  const renderedRows = products.map(product => {
    return (
      <tr className={s.table__row} key={product.id}>
        <td className={s.table__cell}>{product.id}</td>
        <td className={s.table__cell}>{product.title}</td>
        <td className={s.table__cell}>{product.description}</td>
        <td className={s.table__cell}>{product.price}</td>
        <td className={s.table__cell}>
          <img
            src={product.images[0]}
            alt={`${product.title}`}
            max-width="100%"
          />
        </td>
        <td className={s.table__cell}>{product.rating}</td>
        <td className={s.table__cell}>{product.stock}</td>
        <td className={s.table__cell}>{product.category}</td>
      </tr>
    );
  });

  let renderedContent: React.ReactNode;

  if (isLoading) {
    renderedContent = <Skeleton times={10} />;
  } else if (error) {
    renderedContent = <ErrorMessage message={error.message!} />;
  } else if (!!products && products.length !== 0) {
    renderedContent = (
      <table className={s.table}>
        <caption className={s.table__caption}>Available products</caption>
        <thead>
          <tr className={s.table__headerRow}>{tableHeaderContent}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    );
  } else if (products.length === 0) {
    renderedContent = (
      <h6>Sorry, there are no products for your query. Try another request</h6>
    );
  }

  return (
    <section className={s.section}>
      <Container>{renderedContent}</Container>
    </section>
  );
};

export default ProductsTable;
