import {MyConversationPreviewContent, TUIConversation, TUIConversationList} from "@tencentcloud/chat-uikit-react";
import React from "react";
import {MyConversationList} from "../MyConversationList/MyConversationList";

export function MyConversation() {
  console.log('MyConversation', 'Hello');
  return (
    <div>
      <TUIConversationList
        showSelf={false}
        showSearch={false}
        Preview={MyConversationPreviewContent}
      />
    </div>
  )
}