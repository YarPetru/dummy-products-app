## To start immediately

### add file ".env.local" to the root project directory

Then, in the project directory, you should run:

### `yarn install`

Installs all the dependencies

### `yarn start`

Runs the app in the development mode. Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Main project stack

### [React](https://reactjs.org/) with [Typescript](https://www.typescriptlang.org/)

using create-react-app

### [React-Redux](https://react-redux.js.org/)

as a state manager

### [React-router-dom](https://reactrouter.com/en/main) latest version

for navigation. Using protected routes pattern. Only authorized user can visit
all pages and get course details and lessons

### [FireBase](https://firebase.google.com/)

for authorization. Email authorization is added, you should to create an account
on Register page and use it for further auth in Login page to get access to all
pages of the APP. For test authorization wo registration you can use test
credential to LogIn:

- email: test@test.com
- pass: test@test.com

## Additional libraries

#### [Formik](https://formik.org/) with [yup](https://www.npmjs.com/package/yup) validation

#### [Axios](https://axios-http.com/docs/intro) for queries

#### [React Spinners](https://www.npmjs.com/package/react-spinners)

#### [React Toastify](https://www.npmjs.com/package/react-toastify) both for better UX

#### [React icons](https://www.npmjs.com/package/react-icons) package Tabler Icons as in the project design

#### and others (see the package.json file)

## Briefly about the App

The main functionality of the application works as expected.

The application allows you to work with data after authorization. After
authorization, your credantials are added to the local storage, so if you
refresh the page, you will not be unexpectedly unlogged. But, of course, you can
log out and the local storage will be cleared.

The Products page implements a table with the products list, product search by
name or category, sorting by each column, and product deletion. Most part for
the filter by data in column is implemented - selections with correct data are
already added to the panel. Loading state of the table realized using Skeleton
for better UX.

On the Form page you can add your own product, as far as the mock allows. So you
get a notification with the Title of the added product.
