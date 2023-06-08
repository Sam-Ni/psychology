import React, {useEffect} from 'react';
import {Content, Footer, Header} from "antd/es/layout/layout";
import "./header.css"
import {Avatar, Dropdown, Menu} from "antd";
import {UserOutlined, LogoutOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

import {clearLoginMsg} from "../../store/actions/login";
import {store} from "../../store";
import {logout} from "../../api/login";
import {getUser} from "../../util/common";

function HomeHeader() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLogin()) {
  //     navigate('/login');
  //   }
  // })
  const onLogoutClick = () => {
    // localStorage.removeItem('user');
    logout().then(r => {
      if(r)
        navigate('/login');
    });
    //
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
      <div className="title">心慰——心理健康平台</div>
      <div className="user-div">

        <div className="avatar-container">
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Avatar size={50} icon={<UserOutlined />} />
          </Dropdown>
        </div>
        <div className="welcome-text">欢迎你，{getUser()}</div>

      </div>
    </Header>
  );
}

export default HomeHeader;