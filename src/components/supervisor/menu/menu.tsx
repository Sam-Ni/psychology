import {useNavigate} from "react-router-dom";
import {Menu} from "antd";
import {BarsOutlined, DesktopOutlined, HomeOutlined} from "@ant-design/icons";
import React from "react";

function SupervisorMenu(){
  const navigate = useNavigate();

  return(
    <Menu defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key='1' icon={<HomeOutlined />} onClick={() => navigate('/supervisor')} >
        首页
      </Menu.Item>
      <Menu.Item key='2' icon={<BarsOutlined />} onClick={() => navigate('record')} >
        咨询记录
      </Menu.Item>
    </Menu>
  )
}

export default SupervisorMenu;
