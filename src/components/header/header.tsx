import React from 'react';
import {Content, Footer, Header} from "antd/es/layout/layout";
import "./header.css"
import {Avatar, Dropdown, Menu} from "antd";
import {UserOutlined, LogoutOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

function HomeHeader() {
  const navigate = useNavigate();

  //下拉菜单
  const menu = (
    <Menu theme="dark">
      <Menu.Item icon={<LogoutOutlined />} onClick={() => navigate("/login")}>
        登出
      </Menu.Item>
    </Menu>
  );


  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <div className="title">心理健康测试平台</div>
      <div className="user-div">

        <div className="avatar-container">
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Avatar size={50} icon={<UserOutlined />} />
          </Dropdown>
        </div>
        <div className="welcome-text">欢迎你，xx</div>

      </div>
    </Header>
  );
}

export default HomeHeader;