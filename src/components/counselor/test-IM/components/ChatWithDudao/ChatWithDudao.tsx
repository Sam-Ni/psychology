import {MyChat} from "../MyChat/MyChat";
import {useContext, useEffect, useState} from "react";
import TIM, {Conversation} from "tim-js-sdk";
import {UserContext} from "../../../../../Init";
import {AskSupervisor} from "../AskSupervisor/AskSupervisor";
import {useNavigate} from "react-router-dom";
import {store} from "../../../../../store";
import {setDatasets} from "react-chartjs-2/dist/utils";
import {addAskingDudao} from "../../../../../store/actions/conversationContext";
import useForceUpdate from "antd/es/_util/hooks/useForceUpdate";

function getSupervisorId() {
  return 'xxxx';
}
export function ChatWithDudao() {
  const {tim} = useContext(UserContext);
  const supervisorId = getSupervisorId();
  const [conversation, setConversation] = useState<Conversation>();
  console.log('chat_with', 'in UI');
  const sendMessage = ()=> {
    const message = tim?.createTextAtMessage({
      to: supervisorId,
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        text: '求助开始',
      },
    });
    tim?.sendMessage(message)
      .then(mes=>{
        tim?.getConversationList()
          .then(con=> {
            setConversation(
              con.data.conversationList.find(
                item=>item.conversationID === 'C2C' + supervisorId ));
            console.log('chat_with_Dudao', 'success');
          })
      })
  }

  const navigate = useNavigate();

  // useEffect(()=> {
  //   navigate('chat/'+store.getState().conversationContext.currentConversation.conversationID);
  // })
  const [inConsult, setInConsult] = useState(false);
  const onClick = ()=> {
    sendMessage();
    const ConvID = store.getState().conversationContext.currentConversation.conversationID;
    store.dispatch(addAskingDudao(ConvID));
    setInConsult(true);
  }

  useEffect(()=>{
    setInConsult(store.getState().conversationContext.askDudaoList.has(
      store.getState().conversationContext.currentConversation?.conversationID
    ));
  })


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