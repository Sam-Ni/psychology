import {MyChat} from "../../../../counselor/test-IM/components/MyChat/MyChat";
import {useContext, useEffect, useState} from "react";
import {Conversation} from "tim-js-sdk";
import {Button} from "antd";
import {store} from "../../../../../store";
import {addGroup} from "../../../../../store/actions/supervisor";
import {useTim} from "../../../../../util/tim";
import {getGroupConversationID, sendMessageFromDudao} from "../../../../../api/supervisor";

// This is a fake function!!
// const getGroupConversationID = ()=>{
//   return 'GROUP@TGS#2Y2M4MYM6';
// }

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
      const B2A = convContext.currentConversation.conversationID;
      const counselorID = B2A.substring('C2C'.length);
      const myIMid = store.getState().login.imid;
      getGroupConversationID(counselorID, myIMid)
        .then(r => {
          const groupID = r.data.visitorName;
          console.log('getGroupConversationId', groupID);
          console.log('getGroupConversationId', myIMid);
          const convID = 'GROUP' +  groupID;
          // tim?.getConversationList()
          //   .then(res=> {
          //     console.log('getConversationList', res.data.conversationList);
          //   })
          sendMessageFromDudao(groupID, myIMid)
            .then(r => {
              console.log('sendMessageFromDudao');
              tim?.getConversationList()
                .then(res => {
                  const conv = res.data.conversationList.find(item=>item.conversationID === convID );
                  console.log('super', res.data.conversationList);
                  setConversation(conv);
                  store.dispatch(addGroup(convContext.currentConversation?.conversationID, conv));
                })
            })
            .catch(e => {
            tim?.getConversationList()
              .then(res => {
                const conv = res.data.conversationList.find(item=>item.conversationID === convID );
                console.log('super', res.data.conversationList);
                setConversation(conv);
                store.dispatch(addGroup(convContext.currentConversation?.conversationID, conv));
              })
          })
        });
      // tim?.getConversationList()
      //   .then(res=> {
      //     console.log('super', res.data.conversationList);
      //     const conv = res.data.conversationList.find(item=>item.conversationID.includes(counselorID) );
      //     setConversation(conv);
      //     store.dispatch(addGroup(convContext.currentConversation?.conversationID, conv));
      //   })
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