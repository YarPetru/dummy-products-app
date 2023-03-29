import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import BeatLoader from 'react-spinners/BeatLoader';

import { INewProduct } from 'types/types';
import { Container } from 'components/layout';
import { useAppDispatch } from 'hooks/redux-hooks';
import { addProduct } from 'store/products';

import s from './AddProductForm.module.scss';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is a required field'),
  author: yup.string().required('Author is a required field'),
  year: yup
    .number()
    .max(
      new Date().getFullYear(),
      'Year must be current year or less than current year'
    )
    .required('Year is a required field'),
  rating: yup
    .number()
    .min(1, 'The rating can only be a value from 1 to 10')
    .max(10, 'The rating can only be a value from 1 to 10')
    .required('Year is a required field'),
});

const initialValues: INewProduct = {
  title: '',
  author: '',
  year: '',
  rating: '',
};

const AddProductForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleSubmit = (values: INewProduct, actions: any) => {
    setIsFetching(true);
    dispatch(addProduct(values));
    setIsFetching(false);
    actions.resetForm();
  };
  return (
    <section className={s.section}>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, touched }) => {
            return (
              <Form name="Add New Product Form" className={s.form}>
                <h2>Add product</h2>
                <div className={s.fieldsWrapper}>
                  <label htmlFor="title" className={s.label}>
                    Title <span>*</span>
                  </label>
                  <Field
                    className={s.field}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter a title"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className={s.validationError}
                  />
                </div>

                <div className={s.fieldsWrapper}>
                  <label htmlFor="author" className={s.label}>
                    Author <span>*</span>
                  </label>
                  <Field
                    className={s.field}
                    id="author"
                    name="author"
                    type="text"
                    placeholder="Enter the author's name"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="author"
                    component="div"
                    className={s.validationError}
                  />
                </div>

                <div className={s.fieldsWrapper}>
                  <label htmlFor="year" className={s.label}>
                    Year <span>*</span>
                  </label>
                  <Field
                    className={s.field}
                    id="year"
                    name="year"
                    type="text"
                    placeholder="Enter the year of publication"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="year"
                    component="div"
                    className={s.validationError}
                  />
                </div>

                <div className={s.fieldsWrapper}>
                  <label htmlFor="rating" className={s.label}>
                    Rating <span>*</span>
                  </label>
                  <Field
                    className={s.field}
                    id="rating"
                    name="rating"
                    type="text"
                    placeholder="Rating from 1 to 10"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="rating"
                    component="div"
                    className={s.validationError}
                  />
                </div>

                <button
                  type="submit"
                  disabled={
                    (!touched.title &&
                      !touched.author &&
                      !touched.year &&
                      !touched.rating) ||
                    !isValid
                  }
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
                    'Add new product'
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

export default AddProductForm;
