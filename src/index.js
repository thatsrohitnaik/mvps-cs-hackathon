import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StoreContext } from './context/';
import Store from './store/';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const store = {
  store: new Store(),
};

root.render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </StrictMode>
);
