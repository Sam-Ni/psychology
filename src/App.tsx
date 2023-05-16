import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Input} from "antd";
import { Form } from 'antd';
import axios from 'axios';
import { TUIKit } from '@tencentcloud/chat-uikit-react';
import LoginIndex from "./pages/login/login-index";

function App() {
  return (
      <LoginIndex></LoginIndex>
  );
}

export default App;
