import {MyChat} from "../../../../counselor/test-IM/components/MyChat/MyChat";
import {useContext, useEffect, useState} from "react";
import {Conversation} from "tim-js-sdk";
import {Button} from "antd";
import {store} from "../../../../../store";
import {addGroup} from "../../../../../store/actions/supervisor";
import {useTim} from "../../../../../util/tim";

// This is a fake function!!
const getGroupConversationID = ()=>{
  return 'GROUP@TGS#2Y2M4MYM6';
}

export function ChatWithCoun() {
  const [conversation, setConversation] = useState<Conversation>();
  const { tim } = useTim();
  const state = store.getState();
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    const supervisor = store.getState().supervisor;
    const convContext = store.getState().conversationContext;

    if (!convContext.currentConversation) {
      return;
    }

    const res = supervisor.groupMap.get(convContext.currentConversation?.conversationID);
    if (!res) {
      const groupConvID = getGroupConversationID();
      tim?.getConversationList()
        .then(res=> {
          const conv = res.data.conversationList.find(item=>item.conversationID === groupConvID);
          setConversation(conv);
          store.dispatch(addGroup(convContext.currentConversation?.conversationID, conv));
        })
    } else {
      setConversation(res);
    }
  }, [state.conversationContext.currentConversation])

  return (
    <div style={{display: "flex"}}>
      <MyChat />
      <MyChat
        conversation={conversation}
        onlyMessageList={true}
      />
    </div>
  )
}