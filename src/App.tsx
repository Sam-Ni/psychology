import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from "antd";
import axios from 'axios';
import { TUIKit } from '@tencentcloud/chat-uikit-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button type={'primary'}>Button</Button>
      </header>
    </div>
  );
}

export default App;
