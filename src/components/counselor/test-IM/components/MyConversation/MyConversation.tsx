import {MyConversationPreviewContent, TUIConversation, TUIConversationList} from "@tencentcloud/chat-uikit-react";
import React from "react";
import {MyConversationList} from "../MyConversationList/MyConversationList";
import {useNavigate} from "react-router-dom";
import {store} from "../../../../../store";
import {setCurrentConversation} from "../../../../../store/actions/conversationContext";

export function MyConversation() {
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/counselor/chat/');
  }
  return (
    <div onClick={onClick}>
      <TUIConversationList
        showSelf={false}
        showSearch={false}
        Preview={MyConversationPreviewContent}
        setCurrentConversation={(conversation)=>store.dispatch(setCurrentConversation(conversation))}
      />
    </div>
  )
}