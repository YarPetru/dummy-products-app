import React, { useEffect, useState } from 'react';
import { Container } from 'components/layout';
import { TbArrowsSort, TbFilterOff, TbFilter } from 'react-icons/tb';
import s from './ProductsTable.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { fetchProducts, getProducts } from 'store/products';
import { ErrorMessage, Skeleton } from 'components/common';
import { IProduct } from 'types/types';

interface IBtnClick {
  (columnName: string): void;
}

interface IProductsTable {
  products: IProduct[];
  onSortBtnClick: IBtnClick;
  onFilterBtnClick: IBtnClick;
  // isFilterActive: boolean
}

const headerTitles = [
  'id',
  'title',
  'description',
  'price',
  'images',
  'rating',
  'stock',
  'category',
];

const ProductsTable: React.FC<IProductsTable> = ({
  products,
  onSortBtnClick,
  onFilterBtnClick,
  // isFilterActive
}) => {
  const { isLoading, error } = useAppSelector(getProducts);

  // видалити
  const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  // -------------

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const tableHeaderContent = headerTitles.map(item => {
    return (
      <th scope="col" className={s.table__cell} key={item}>
        <div className={s.cellContentWrapper}>
          <span>{item.toUpperCase()}</span>
          <div className={s.buttonsWrapper}>
            <button type="button" onClick={() => onSortBtnClick(item)}>
              <TbArrowsSort color="current" />
            </button>
            <button type="button" onClick={() => onFilterBtnClick(item)}>
              {/* {!isFilterOn && filteredColumn === item ? ( */}
              <TbFilterOff color="current" />
              {/* ) : ( */}
              {/* <TbFilter color="current" /> */}
              {/* )} */}
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
          {/* {product.images}CAROUSEL? */}
          {/* {product.images.map(img => {
            return <img src={img} alt={`${product.title}`} width="100" />;
          })} */}
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
    <section>
      <Container>{renderedContent}</Container>
    </section>
  );
};

export default ProductsTable;

//
{
  /* <>
  <th scope="col" className={s.table__cell}>
    <div className={s.cellContentWrapper}>
      <span>ID</span>
      <div className={s.buttonsWrapper}>
        <button type="button" onClick={() => handleSortBtnClick('ID')}>
          <TbArrowsSort color="current" />
        </button>
        <button type="button" onClick={() => handleFilterBtnClick('ID')}>

          {!isFilterOn && filteredColumn === 'ID' ? (
            <TbFilterOff color="current" />
          ) : (
            <TbFilter color="current" />
          )}
        </button>
      </div>
    </div>
  </th>
  <th scope="col" className={s.table__cell}>
    <div className={s.cellContentWrapper}>
      <span>Title</span>
      <div className={s.buttonsWrapper}>
        <button type="button" onClick={handleSortBtnClick}>
          <TbArrowsSort color="current" />
        </button>
        <button type="button" onClick={() => handleFilterBtnClick('Title')}>

          {!isFilterOn ? (
            <TbFilterOff color="current" />
          ) : (
            <TbFilter color="current" />
          )}
        </button>
      </div>
    </div>
  </th>
  <th scope="col" className={s.table__cell}>
    <div className={s.cellContentWrapper}>
      <span>Description</span>
      <div className={s.buttonsWrapper}>
        <button type="button" onClick={handleSortBtnClick}>
          <TbArrowsSort color="current" />
        </button>
        <button
          type="button"
          onClick={() => handleFilterBtnClick('Description')}
        >

          {!isFilterOn ? (
            <TbFilterOff color="current" />
          ) : (
            <TbFilter color="current" />
          )}
        </button>
      </div>
    </div>
  </th>
  <th scope="col" className={s.table__cell}>
    <div className={s.cellContentWrapper}>
      <span>Price</span>
      <div className={s.buttonsWrapper}>
        <button type="button" onClick={handleSortBtnClick}>
          <TbArrowsSort color="current" />
        </button>
        <button type="button" onClick={() => handleFilterBtnClick('Price')}>

          {!isFilterOn ? (
            <TbFilterOff color="current" />
          ) : (
            <TbFilter color="current" />
          )}
        </button>
      </div>
    </div>
  </th>
  <th scope="col" className={s.table__cell}>
    <div className={s.cellContentWrapper}>
      <span>Photo</span>
      <div className={s.buttonsWrapper}>
        <button type="button" onClick={handleSortBtnClick}>
          <TbArrowsSort color="current" />
        </button>
        <button type="button" onClick={() => handleFilterBtnClick('Photo')}>

          {!isFilterOn ? (
            <TbFilterOff color="current" />
          ) : (
            <TbFilter color="current" />
          )}
        </button>
      </div>
    </div>
  </th>
  <th scope="col" className={s.table__cell}>
    <div className={s.cellContentWrapper}>
      <span>Rating</span>
      <div className={s.buttonsWrapper}>
        <button type="button" onClick={handleSortBtnClick}>
          <TbArrowsSort color="current" />
        </button>
        <button type="button" onClick={() => handleFilterBtnClick('Rating')}>

          {!isFilterOn ? (
            <TbFilterOff color="current" />
          ) : (
            <TbFilter color="current" />
          )}
        </button>
      </div>
    </div>
  </th>
  <th scope="col" className={s.table__cell}>
    <div className={s.cellContentWrapper}>
      <span>Stock</span>
      <div className={s.buttonsWrapper}>
        <button type="button" onClick={handleSortBtnClick}>
          <TbArrowsSort color="current" />
        </button>
        <button type="button" onClick={() => handleFilterBtnClick('Stock')}>

          {!isFilterOn ? (
            <TbFilterOff color="current" />
          ) : (
            <TbFilter color="current" />
          )}
        </button>
      </div>
    </div>
  </th>
  <th scope="col" className={s.table__cell}>
    <div className={s.cellContentWrapper}>
      <span>Category</span>
      <div className={s.buttonsWrapper}>
        <button type="button" onClick={handleSortBtnClick}>
          <TbArrowsSort color="current" />
        </button>
        <button type="button" onClick={() => handleFilterBtnClick('Category')}>

          {!isFilterOn ? (
            <TbFilterOff color="current" />
          ) : (
            <TbFilter color="current" />
          )}
        </button>
      </div>
    </div>
  </th>
</>; */
}
