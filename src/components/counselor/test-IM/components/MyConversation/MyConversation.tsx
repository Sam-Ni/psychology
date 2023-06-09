import {MyConversationPreviewContent, TUIConversation, TUIConversationList} from "@tencentcloud/chat-uikit-react";
import React from "react";
import {MyConversationList} from "../MyConversationList/MyConversationList";
import {useNavigate} from "react-router-dom";

export function MyConversation() {
  console.log('MyConversation', 'Hello');
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/counselor/chat');
  }
  return (
    <div onClick={onClick}>
      <TUIConversationList
        showSelf={false}
        showSearch={false}
        Preview={MyConversationPreviewContent}
      />
    </div>
  )
}