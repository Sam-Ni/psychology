import React, { useState } from 'react';
import {
  DesktopOutlined,
  HomeOutlined,
  BarsOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Menu} from "antd";
import { useNavigate, useLocation } from "react-router-dom";


function AdminMenu(){
  const navigate = useNavigate();

  return(
    <Menu defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key='1' icon={<HomeOutlined />} onClick={() => navigate('/admin')} >
        首页
      </Menu.Item>
      <Menu.Item key='2' icon={<BarsOutlined />} onClick={() => navigate('record')} >
        咨询记录
      </Menu.Item>
      <Menu.Item key='3' icon={<UserOutlined />} onClick={() => navigate('counselor-management')} >
        咨询师管理
      </Menu.Item>
    </Menu>
  )
}

export default AdminMenu;