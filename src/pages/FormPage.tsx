import React from 'react';
import { AddProductForm, DeleteProductForm } from 'components/product-forms';

const FormPage: React.FC = () => {
  return (
    <>
      <AddProductForm />
      <DeleteProductForm />
    </>
  );
};

export default FormPage;
