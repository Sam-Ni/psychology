import {MyConversationPreviewContent, TUIConversationList} from "@tencentcloud/chat-uikit-react";
import {store} from "../../../../../store";
import {setCurrentConversation} from "../../../../../store/actions/conversationContext";
import {useNavigate} from "react-router-dom";

export function SupervisorConversation() {
  const navigate = useNavigate()
  const onClick = () => {
    // navigate('/supervisor/chat/' + store.getState().conversationContext.currentConversation.conversationID);
    // navigate('/supervisor/chat');
    navigate('/supervisor/chat/');
  }
  return (
    <div onClick={onClick}>
      <TUIConversationList
        showSelf={false}
        showSearch={false}
        Preview={MyConversationPreviewContent}
        setCurrentConversation={(conversation)=>store.dispatch(setCurrentConversation(conversation))}
        onlyC2CConversation={true}
      />
    </div>
  )
}