import React, {useContext, useState} from 'react';
import {
  DesktopOutlined,
  HomeOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Menu} from "antd";
import { useNavigate, useLocation } from "react-router-dom";

import {UserContext} from "../../../Init";
// import {useConversationList} from "../test-IM/components/MyConversationList/useConversationList";
import {MyConversationList} from "../test-IM/components/MyConversationList/MyConversationList";
import {MyConversationPreview} from "../test-IM/components/ConversationPreview/MyConversationPreview";
import {
  ConversationPreview,
  ConversationPreviewContent,
  TUIConversation,
  TUIConversationList
} from "@tencentcloud/chat-uikit-react";
import {MyConversationPreviewContent} from "../test-IM/components/ConversationPreview/MyConversationPreviewContent";
import {useConversationList} from "../test-IM/components/MyConversationList/useConversationList";
// import useConversationList
//   from "@tencentcloud/chat-uikit-react/src/components/TUIConversationList/hooks/useConversationList";
// import {useConversationList} from "../test-IM/components/MyConversationList/useConversationList";


function CounselorMenu(){
  const navigate = useNavigate();
  const {tim} = useContext(UserContext)

  const { conversationList, setConversationList} = useConversationList(tim);
  return(
    <Menu defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key='1' icon={<HomeOutlined />} onClick={() => navigate('/counselor')} >
        首页
      </Menu.Item>
      <Menu.Item key='2' icon={<DesktopOutlined />} onClick={() => navigate('2')} >
        会话
      </Menu.Item>
      <Menu.Item >会话列表</Menu.Item>
      {/*<Menu.Item onClick={()=>navigate('chat')}>*/}
      {/*  <TUIConversationList Preview={MyConversationPreviewContent}/>*/}
      {/*</Menu.Item>*/}
      {conversationList.map(item=> {
        return (
          <Menu.Item onClick={()=>navigate('chat')}>
            <ConversationPreview conversation={item} Preview={MyConversationPreviewContent} />
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default CounselorMenu;