import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Route, Link, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";

import LoginIndex from "../pages/login/login-index";
import CounselorIndex from "../pages/counselor";
import SupervisorIndex from "../pages/supervisor";
import Content2 from "../components/content/example/Content2";

import {isLogin} from "../util/common_function";
import CounselorHome from "../pages/counselor/home/counselor-home";
import SupervisorHome from "../pages/supervisor/home/supervisor-home";

/*
主路由
 */
const MainRoutes = () => {
  return (
    <Routes>
      // need to judge auth
      <Route path="/" element={ isLogin() ? <Navigate to='/counselor' /> : <Navigate to='login' /> } />
      <Route path="/login" Component={LoginIndex}/>
      <Route path="/counselor" Component={CounselorIndex}>
        <Route index Component={CounselorHome}/>
        <Route path="home" Component={CounselorHome}/>
        <Route path="2" Component={Content2}/>
      </Route>
      <Route path="/supervisor" Component={SupervisorIndex}>
        <Route index Component={SupervisorHome}/>
        <Route path="home" Component={SupervisorHome}/>
        <Route path="2" Component={Content2}/>
      </Route>
      <Route path="/supervisor" Component={CounselorIndex}>
        <Route index Component={CounselorHome}/>
        <Route path="home" Component={CounselorHome}/>
        <Route path="2" Component={Content2}/>
      </Route>

    </Routes>
  );
};

export default MainRoutes;