import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {createRoot} from "react-dom/client";

import "./index.css"

import MainRoutes from "./routers/main-routes";
import SampleChat from "./components/counselor/test-IM/test-IM";
import reportWebVitals from "./reportWebVitals";
import {Init} from "./Init";

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Init />
  </BrowserRouter>,
)

reportWebVitals()
// ReactDOM.render(
//   <BrowserRouter>
//     <MainRoutes />
//   </BrowserRouter>,
//   document.getElementById('root')
// );
