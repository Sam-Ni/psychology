import React from 'react';
import {Content, Footer, Header} from "antd/es/layout/layout";
import "./header.css"

function HomeHeader() {
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <div className="title">心理健康测试平台</div>
      <div className="user-div">
        <div className="welcome-text">欢迎你，xx</div>
      </div>
    </Header>
  );
}

export default HomeHeader;