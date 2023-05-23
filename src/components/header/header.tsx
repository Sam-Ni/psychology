import React, {useEffect} from 'react';
import {Content, Footer, Header} from "antd/es/layout/layout";
import "./header.css"
import {Avatar, Dropdown, Menu} from "antd";
import {UserOutlined, LogoutOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {isLogin} from "../../util/common_function";

function HomeHeader() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLogin()) {
  //     navigate('/login');
  //   }
  // })
  const onLogoutClick = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }
  //下拉菜单
  const menu = (
    <Menu theme="dark">
      <Menu.Item icon={<LogoutOutlined />} onClick={onLogoutClick}>
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