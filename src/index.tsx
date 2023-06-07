import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {createRoot} from "react-dom/client";

import "./index.css"

import MainRoutes from "./routers/main-routes";
import reportWebVitals from "./reportWebVitals";
import {Init} from "./Init";
import { Provider } from 'react-redux'
import {store,persisStore} from './store'
import {PersistGate} from 'redux-persist/integration/react'

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persisStore}>
      <BrowserRouter>
        <Init />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);

reportWebVitals();



// ReactDOM.render(
//
//   document.getElementById('root')
// );
