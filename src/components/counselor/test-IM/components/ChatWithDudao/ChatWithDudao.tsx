import {MyChat} from "../MyChat/MyChat";
import {useContext, useEffect, useState} from "react";
import TIM, {Conversation} from "tim-js-sdk";
import {UserContext} from "../../../../../Init";
import {AskSupervisor} from "../AskSupervisor/AskSupervisor";
import {store} from "../../../../../store";
import {addAskingDudao} from "../../../../../store/actions/counselor";

// This is a fake function!!!
function getSupervisorId() {
  return 'xxxx';
}
export function ChatWithDudao() {
  const {tim} = useContext(UserContext);
  const [conversation, setConversation] = useState<Conversation>();
  const [inConsult, setInConsult] = useState(false);

  useEffect(()=>{
    const convContext = store.getState().conversationContext;
    const counselor = store.getState().counselor;
    const askDudaoList = counselor.askDudaoList;
    const currentConv = convContext.currentConversation;
    const convID = currentConv?.conversationID;
    setInConsult(askDudaoList.has(convID));
    setConversation(askDudaoList.get(convID));
  }, [store.getState().conversationContext.currentConversation]);

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

  const onClick = ()=> {
    const supervisorId = sendMessage();
    const B2C = "C2C" + supervisorId;
    const B2A = store.getState().conversationContext.currentConversation.conversationID;
    tim?.getConversationList()
      .then(res=>{
        const conv2Dudao = res.data.conversationList.find(item=>item.conversationID === B2C);
        console.log('B2C', conv2Dudao);
        setConversation(conv2Dudao);
        store.dispatch(addAskingDudao(B2A, conv2Dudao));
        setInConsult(true);
      })
  }

  return (
    <>
      <AskSupervisor onClick={onClick}/>
      <div style={{display: "flex"}}>
        <MyChat />
        {inConsult && <MyChat conversation={conversation}/>}
      </div>
    </>
  )
}