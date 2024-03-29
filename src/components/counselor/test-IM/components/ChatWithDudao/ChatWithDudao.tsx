import {MyChat} from "../MyChat/MyChat";
import {useContext, useEffect, useState} from "react";
import TIM, {Conversation} from "tim-js-sdk";
import {AskSupervisor} from "../AskSupervisor/AskSupervisor";
import {store} from "../../../../../store";
import {addAskingDudao} from "../../../../../store/actions/counselor";
import {useTim} from "../../../../../util/tim";

// This is a fake function!!!
function getSupervisorId() {
  return 'xxxx';
}
export function ChatWithDudao() {
  const { tim } = useTim();
  const [conversation, setConversation] = useState<Conversation>();
  const [inConsult, setInConsult] = useState(false);
  const state = store.getState();

  useEffect(()=>{
    const convContext = store.getState().conversationContext;
    const counselor = store.getState().counselor;
    const askDudaoList = counselor.askDudaoList;
    const currentConv = convContext.currentConversation;
    const convID = currentConv?.conversationID;
    setInConsult(askDudaoList.has(convID));
    setConversation(askDudaoList.get(convID));
  }, [state.conversationContext.currentConversation]);

  const sendMessage = ()=> {
    const supervisorId = getSupervisorId();
    const message = tim?.createTextAtMessage({
      to: supervisorId,
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        text: '求助开始',
      },
    });
    tim?.sendMessage(message)
      .then(mes=>{
      })
    return supervisorId;
  }

  const onClick = (supervisorId: string)=> {
    const B2C = "C2C" + supervisorId;
    const B2A = store.getState().conversationContext.currentConversation.conversationID;
    tim?.getConversationList()
      .then(res=>{
        console.log('B2C', res.data.conversationList);
        console.log('B2C', B2C);
        const conv2Dudao = res.data.conversationList.find(item=>item.conversationID === B2C);
        console.log('B2C', conv2Dudao);
        setConversation(conv2Dudao);
        store.dispatch(addAskingDudao(B2A, conv2Dudao));
        setInConsult(true);
    })
  }

  return (
    <>
      <div style={{display: "flex"}}>
        <AskSupervisor requestAskDudao={onClick} inConsult={inConsult}/>
        <MyChat />
        {inConsult && <MyChat conversation={conversation}/>}
      </div>
    </>
  )
}