import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import BeatLoader from 'react-spinners/BeatLoader';

import { deleteProduct } from 'store/products';
import { useAppDispatch } from 'hooks/redux-hooks';
import { Container } from 'components/layout';

import s from './DeleteProductForm.module.scss';

const initialValues: { id: string } = {
  id: '',
};

const validationSchema = yup.object().shape({
  id: yup.number().required('Enter ID to delete the product'),
});

const DeleteProductForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleSubmit = (values: { id: string }, actions: any) => {
    setIsFetching(true);
    dispatch(deleteProduct(values.id));
    setIsFetching(false);
    actions.resetForm();
  };
  return (
    <section id='delete-form' className={s.section}>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => {
            return (
              <Form name="Add New Product Form" className={s.form}>
                <h2>Delete product</h2>

                <div className={s.fieldsWrapper}>
                  <label htmlFor="id" className={s.label}>
                    ID <span>*</span>
                  </label>
                  <Field
                    className={s.field}
                    id="id"
                    name="id"
                    type="text"
                    placeholder="Enter the id"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="id"
                    component="div"
                    className={s.validationError}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className={s.submitBtn}
                >
                  {isFetching ? (
                    <BeatLoader
                      cssOverride={{
                        textAlign: 'center',
                      }}
                      color="#D4DFFF"
                      size="6px"
                    />
                  ) : (
                    'Delete'
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </section>
  );
};

export default DeleteProductForm;
