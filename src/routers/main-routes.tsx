import React from "react";
import ReactDOM from "react-dom";
import {Route, Link, BrowserRouter as Router, Routes} from "react-router-dom";

import LoginIndex from "../pages/login/login-index";
import Index from "../pages/home";
import Content1 from "../components/content/example/content1";
import Content2 from "../components/content/example/Content2";

/*
主路由
 */
const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/login" Component={LoginIndex} />
        <Route path="/home" Component={Index}>
          <Route index Component={Content1} />
          <Route path="1" Component={Content1} />
          <Route path="2" Component={Content2} />
        </Route>
    </Routes>
  );
};

export default MainRoutes;