import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';

import { store, persistor } from './store';
import App from './App';
import './index.scss';
import './firebase';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <IconContext.Provider value={{ size: '24px' }}>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </IconContext.Provider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
