import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';

import { store } from './store';
import App from './App';
import './index.scss';
import './firebase';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IconContext.Provider value={{ size: '24px' }}>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </IconContext.Provider>
    </Provider>
  </React.StrictMode>
);
