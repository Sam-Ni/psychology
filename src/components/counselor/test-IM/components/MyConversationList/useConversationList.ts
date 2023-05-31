import {useEffect, useState} from "react";
import TIM, {ChatSDK, Conversation} from "tim-js-sdk";

export function useConversationList(
  tim: ChatSDK,
) {
  const [conversationList, setConversationList] = useState<Array<Conversation>>([]);
  const queryConversation = async () => {
    const res = await tim?.getConversationList();
    if (res?.code === 0) {
      let resConversationList = [];
      resConversationList = res.data.conversationList.filter(
        (item) => item.type !== TIM.TYPES.CONV_SYSTEM,
      );
      setConversationList(resConversationList);
    }
  }
  useEffect(()=> {
    queryConversation();
  }, [tim]);
  return {
    conversationList,
    setConversationList,
  };
}

