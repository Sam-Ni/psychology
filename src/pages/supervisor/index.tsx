import React, {useEffect, useState} from 'react';
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Button, Card, Form, Input, Layout, theme} from "antd";

import {BrowserRouter, Outlet} from 'react-router-dom';
import HomeHeader from "../../components/header/header";
import HomeFooter from "../../components/footer/footer";
import CounselorMenu from "../../components/counselor/menu/menu";
import Sider from "antd/es/layout/Sider";
import {
  SupervisorConversation
} from "../../components/supervisor/IM/component/SupervisorConversation/SupervisorConversation";
import {ChatSDK} from "tim-js-sdk/tim-js-friendship";
import {store} from "../../store";
import {TUIKit} from "@tencentcloud/chat-uikit-react";
import {loginTim, logoutTim} from "../../util/tim";
import SupervisorMenu from "../../components/supervisor/menu/menu";


function SupervisorIndex() {
  const [collapsed, setCollapsed] = useState(false);

  const [tim, setTim] = useState<ChatSDK>();

  const hasLogin = store.getState().login.hasLogin;

  useEffect(() => {
    const userID = store.getState().login.imid;
    loginTim(userID, setTim).then(r => console.log('loginTim', r));
    return () => logoutTim(setTim);
  }, [hasLogin])

  return (
    <Layout className="layout">

      <HomeHeader/>

      <TUIKit tim={tim}>
          <Layout>
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <SupervisorMenu/>
              <SupervisorConversation/>
            </Sider>
            <Layout>
              <Content style={{padding: "0 20px"}}>
                <Outlet context={{ tim }}></Outlet>
              </Content>
              <HomeFooter/>
            </Layout>
          </Layout>
      </TUIKit>


    </Layout>
  );
}

export default SupervisorIndex;