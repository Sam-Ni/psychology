import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Route, Link, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";

import LoginIndex from "../pages/login/login-index";
import CounselorIndex from "../pages/counselor";
import SupervisorIndex from "../pages/supervisor";
import Content2 from "../components/content/example/Content2";

import {getRole, isLogin} from "../util/common";
import CounselorHome from "../pages/counselor/home/counselor-home";
import SupervisorHome from "../pages/supervisor/home/supervisor-home";
import AdminIndex from "../pages/admin";
import AdminHome from "../pages/admin/home/admin-home";
import SampleChat from "../components/counselor/test-IM/test-IM";
import CounselRecord from "../pages/counselor/record/counsel-record";
import CounselorManagement from "../pages/admin/counselor-management/counselor-management";
import {MyChat} from "../components/counselor/test-IM/components/MyChat/MyChat";
import SupervisorManagement from "../pages/admin/supervisor-management/supervisor-management";
import ArrangementTable from "../pages/admin/arrangement-table/arrangement-table";
import {ConsultMain} from "../components/counselor/test-IM/components/ConsultMain/ConsultMain";
import {ChatWithDudao} from "../components/counselor/test-IM/components/ChatWithDudao/ChatWithDudao";
import {ChatWithCoun} from "../components/supervisor/IM/component/ChatWithCoun/ChatWithCoun";
import VisitorManagement from "../pages/admin/visitor-management/visitor-management";

/*
主路由
 */
const MainRoutes = () => {
  return (
    <Routes>
      // need to judge auth
      <Route path="/" element={ isLogin() ? <Navigate to={'/'+getRole()} /> : <Navigate to='login'/> } />
      <Route path="/login" Component={LoginIndex}/>
      <Route path="/counselor" Component={CounselorIndex}>
        <Route index Component={CounselorHome}/>
        {/*<Route path="home" Component={CounselorHome}/>*/}
        <Route path="record" Component={CounselRecord}/>
        <Route path="2" Component={SampleChat}/>
        {/*<Route path={'chat'} Component={ConsultMain} />*/}
        <Route path={'chat'} Component={ChatWithDudao}/>
      </Route>
      <Route path="/supervisor" Component={SupervisorIndex}>
        <Route index Component={SupervisorHome}/>
        <Route path="home" Component={SupervisorHome}/>
        <Route path="2" Component={Content2}/>
        <Route path={'chat'} Component={ChatWithCoun} />
      </Route>
      <Route path="/admin" Component={AdminIndex}>
        <Route index Component={AdminHome}/>
        <Route path="record" Component={CounselRecord}/>
        <Route path="arrangement-table" Component={ArrangementTable}/>
        <Route path="counselor-management" Component={CounselorManagement}/>
        <Route path="supervisor-management" Component={SupervisorManagement}/>
        <Route path="visitor-management" Component={VisitorManagement}/>
      </Route>


    </Routes>
  );
};

export default MainRoutes;