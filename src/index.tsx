import React from 'react';
      import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import "./index.css"
import {createRoot} from "react-dom/client";
import MainRoutes from "./routers/main-routes";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <MainRoutes />
  </BrowserRouter>,
);

reportWebVitals();



// ReactDOM.render(
//
//   document.getElementById('root')
// );
