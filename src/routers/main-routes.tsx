import React from "react";
import ReactDOM from "react-dom";
import {Route, Link, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";

import LoginIndex from "../pages/login/login-index";
import Index from "../pages/home";
import Content1 from "../components/content/example/content1";
import Content2 from "../components/content/example/Content2";

import {isLogin} from "../util/common_function";
import UserHome from "../pages/home/userhome/user-home";

/*
主路由
 */
const MainRoutes = () => {
  return (
    <Routes>
      // need to judge auth
      <Route path="/" element={ isLogin() ? <Navigate to='/home' /> : <Navigate to='login' /> } />
      <Route path="/login" Component={LoginIndex}/>
      <Route path="/home" Component={Index}>
        <Route index Component={UserHome}/>
        <Route path="1" Component={UserHome}/>
        <Route path="2" Component={Content2}/>
      </Route>
    </Routes>
  );
};

export default MainRoutes;