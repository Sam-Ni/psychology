import React, {useState} from 'react';
import {Content, } from "antd/es/layout/layout";
import {Layout, } from "antd";

import {Outlet} from 'react-router-dom';
import HomeHeader from "../../components/header/header";
import HomeFooter from "../../components/footer/footer";
import CounselorMenu from "../../components/counselor/menu/menu";
import Sider from "antd/es/layout/Sider";
import {TUIConversation, TUIConversationList} from "@tencentcloud/chat-uikit-react";
import {MyConversation} from "../../components/counselor/test-IM/components/MyConversation/MyConversation";

function AdminIndex() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="layout">

      <HomeHeader/>

      <Layout>
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <CounselorMenu/>
        </Sider>
        <Layout>
          <Content style={{padding: "0 20px"}}>
            <Outlet></Outlet>
          </Content>
          <HomeFooter/>
        </Layout>
      </Layout>


    </Layout>
  );
}

export default AdminIndex;
