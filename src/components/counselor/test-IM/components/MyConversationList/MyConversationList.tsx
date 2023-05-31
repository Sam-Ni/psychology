import React, {useContext, useEffect, useState} from "react";
import {ConversationPreview} from "@tencentcloud/chat-uikit-react";
import {
  ConversationListContainer
} from "@tencentcloud/chat-uikit-react/src/components/ConversationPreview/ConversationListContainer";
import {useTUIKitContext} from "@tencentcloud/chat-uikit-react/src/context";
import {useTUIConversationContext} from "@tencentcloud/chat-uikit-react/src/context/TUIConversationContext";
import {Conversation} from "tim-js-sdk";
import {
  useConversationUpdate
} from "@tencentcloud/chat-uikit-react/src/components/TUIConversationList/hooks/useConversationUpdate";
import useConversationList from '@tencentcloud/chat-uikit-react/src/components/TUIConversationList/hooks/useConversationList';


export function MyConversationList(props) {
  const {
    Preview,
    Container = ConversationListContainer,
    onConversationListUpdated,
    filterConversation: propsFilterConversation,
  } = props;
  const {
    tim, customClasses, conversation, setActiveConversation, setTUIProfileShow,
  } = useTUIKitContext('TUIConversationList');
  // const { tim } = useContext(UserContext);
  const {
    filterConversation: contextFilterConversation,
  } = useTUIConversationContext('TUIConversationList');
  const filterConversation = propsFilterConversation || contextFilterConversation;
  const [conversationUpdateCount, setConversationUpdateCount] = useState(0);
  const forceUpdate = () => setConversationUpdateCount((count) => count + 1);

  const activeConversationHandler = (
    conversationList: Array<Conversation>,
    setConversationList: React.Dispatch<React.SetStateAction<Array<Conversation>>>,
  ) => {
    if (!conversationList.length) {
      return;
    }
    setActiveConversation(conversation);
  };
  const {
    conversationList,
    setConversationList,
  } = useConversationList(tim, activeConversationHandler, filterConversation);
  useConversationUpdate(
    setConversationList,
    onConversationListUpdated,
    forceUpdate,
    filterConversation,
  );

  // const { conversationList, setConversationList} = useConversationList(tim);
  return (
    <div className={'tui-conversation'} >
      <ConversationListContainer setConversationList={setConversationList}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {conversationList.length === 0
          ? (
            <div className="no-result">
              {/*<Icon className="no-result-icon" type={IconTypes.EFFORT} width={42} height={42} />*/}
              <div className="no-result-message">No conversation</div>
            </div>
          )
          : conversationList.map((item) => {
            const previewProps = {
              activeConversation: conversation,
              conversation: item,
              setActiveConversation,
              Preview,
              conversationUpdateCount,
            };
            return (
              <ConversationPreview key={item.conversationID} {...previewProps} />
            );
          })}
          </ConversationListContainer>
    </div>
  )
}
