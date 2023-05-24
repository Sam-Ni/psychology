import React, { useState } from 'react';
import {
  DesktopOutlined,
  HomeOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Menu} from "antd";
import { useNavigate, useLocation } from "react-router-dom";


function CounselorMenu(){
  const navigate = useNavigate();

  return(
    <Menu defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key='1' icon={<HomeOutlined />} onClick={() => navigate('1')} >
        首页
      </Menu.Item>
      <Menu.Item key='2' icon={<DesktopOutlined />} onClick={() => navigate('2')} >
        Option 2
      </Menu.Item>
    </Menu>
  )
}

export default CounselorMenu;