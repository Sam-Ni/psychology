import {
  ConversationPreviewUIComponentProps
} from "@tencentcloud/chat-uikit-react/src/components/ConversationPreview/ConversationPreview";
import React, {useRef} from "react";
import './styles/index.scss'
import {useNavigate} from "react-router-dom";

export function MyConversationPreviewContent<T extends ConversationPreviewUIComponentProps>(
  props: T,
) {
  const {
    conversation,
    displayMessage,
    displayTitle,
    unread,
    active,
    setActiveConversation,
  } = props;

  const navigate = useNavigate();
  const conversationPreviewButton = useRef<HTMLButtonElement | null>(null);
  const onSelectConversation = () => {
    if (setActiveConversation) {
      setActiveConversation(conversation);
    }
    if (conversationPreviewButton?.current) {
      conversationPreviewButton.current.blur();
    }
    navigate('/counselor/chat')
    console.log('I am in select')
  };
  return (
    <button
      type="button"
      aria-selected={active}
      role="option"
      className={`conversation-preview-container`}
      onClick={onSelectConversation}
      ref={conversationPreviewButton}
    >
      <div className="content">
        <div className="title">
          {displayTitle}
        </div>
        {/*<div className="message">*/}
        {/*  {displayMessage}*/}
        {/*</div>*/}
      </div>
      <div className="external">
        {unread ? (<div className="unread">{unread <= 99 ? unread : '99+'}</div>) : (<div className="unread" />)}
      </div>
    </button>
  );
}