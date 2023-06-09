import {MyChat} from "../MyChat/MyChat";
import {useContext, useState} from "react";
import TIM, {Conversation} from "tim-js-sdk";
import {UserContext} from "../../../../../Init";

function getSupervisorId() {
  return 'xxxx';
}
export function ChatWithDudao() {
  const {tim} = useContext(UserContext);
  const supervisorId = getSupervisorId();
  const [conversation, setConversation] = useState<Conversation>();
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
          .then(con=>
            setConversation(
              con.data.conversationList.find(
                item=>item.conversationID === 'C2C' + supervisorId )))
      })
  }
  return (
    <>
      <MyChat />
      <MyChat conversation={conversation}/>
    </>
  )
}