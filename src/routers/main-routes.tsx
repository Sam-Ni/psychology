import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Route, Link, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";

import LoginIndex from "../pages/login/login-index";
import Index from "../pages/home";
import Content2 from "../components/content/example/Content2";

import {isLogin} from "../util/common_function";
import UserHome from "../pages/home/userhome/user-home";

/*
主路由
 */
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ isLogin() ? <Navigate to='/home' /> : <Navigate to='/login' /> } />
      <Route path="/login" element={ <LoginIndex />}/>
      <Route path="/home" element={ <Index />}>
        <Route index Component={UserHome}/>
        <Route path="1" Component={UserHome}/>
        <Route path="2" Component={Content2}/>
      </Route>
    </Routes>
  );
};

export default MainRoutes;