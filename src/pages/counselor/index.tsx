import React, {useEffect, useState} from 'react';
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Button, Card, Form, Input, Layout, theme} from "antd";

import {BrowserRouter, Navigate, Outlet, useNavigate, useOutletContext} from 'react-router-dom';
import HomeHeader from "../../components/header/header";
import HomeFooter from "../../components/footer/footer";
import CounselorMenu from "../../components/counselor/menu/menu";
import Sider from "antd/es/layout/Sider";
import {MyConversation} from "../../components/counselor/test-IM/components/MyConversation/MyConversation";
import {store} from "../../store";
import {ChatSDK} from "tim-js-sdk/tim-js-friendship";
import {TUIKit} from "@tencentcloud/chat-uikit-react";
import {loginTim, logoutTim, TimContextType} from "../../util/tim";


function CounselorIndex() {
  const [collapsed, setCollapsed] = useState(false);

  const [tim, setTim] = useState<ChatSDK | null>(null);

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
            <CounselorMenu/>
            <MyConversation/>
            {/*<Button onClick={()=> console.log("current_conversation", store.getState().conversationContext.currentConversation)}>print current conversation</Button>*/}
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


export default CounselorIndex;