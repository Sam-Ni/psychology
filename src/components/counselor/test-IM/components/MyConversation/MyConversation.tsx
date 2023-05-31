import {TUIConversation, TUIConversationList} from "@tencentcloud/chat-uikit-react";
import React from "react";
import {MyConversationList} from "../MyConversationList/MyConversationList";
import {MyConversationPreviewContent} from "../ConversationPreview/MyConversationPreviewContent";

export function MyConversation() {
  console.log('MyConversation', 'Hello');
  return (
    <TUIConversationList Preview={MyConversationPreviewContent}/>
  )
}