import React, { useRef, useState } from 'react';
import {ConversationPreviewProps, ConversationPreviewUIComponentProps} from './ConversationPreview';
import { Avatar as DefaultAvatar } from '../Avatar/index';
import './styles/index.scss';
import { Icon, IconTypes } from '../Icon';
import { Plugins } from '../Plugins';
import { useConversation } from '../../hooks';
import { useTUIKitContext } from '../../context';
import {Conversation} from "tim-js-sdk";

interface MyConversationPreviewUIComponentProps extends ConversationPreviewUIComponentProps {
  setCurrentConversation? : (Conversation)=>void;
}

export function unMemoMyConversationPreviewContent<T extends MyConversationPreviewUIComponentProps>(
  props: T,
):React.ReactElement {
  const {
    conversation,
    Avatar = DefaultAvatar,
    displayImage,
    displayTitle,
    displayMessage,
    displayTime,
    unread,
    active,
    setActiveConversation,
    setCurrentConversation,
  } = props;

  const conversationPreviewButton = useRef<HTMLButtonElement | null>(null);
  const activeClass = active ? 'conversation-preview-content--active' : '';
  const unreadClass = unread && unread >= 1 ? 'conversation-preview-content--unread' : '';
  const pinClass = conversation.isPinned ? 'conversation-preview-content--pin' : '';
  const [isHover, setIsHover] = useState(false);
  const onSelectConversation = () => {
    if (setActiveConversation) {
      setActiveConversation(conversation);
    }
    if (conversationPreviewButton?.current) {
      conversationPreviewButton.current.blur();
    }
    if (setCurrentConversation) {
      setCurrentConversation(conversation);
    }
  };
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const { tim, conversation: activeConversation } = useTUIKitContext('ConversationPreviewContent');
  const { pinConversation, deleteConversation } = useConversation(tim);
  const moreHandle = (type: string) => {
    const { conversationID, isPinned } = conversation;
    switch (type) {
      case 'pin':
        pinConversation({ conversationID, isPinned: !isPinned });
        break;
      case 'delete':
        deleteConversation(conversationID);
        if (conversation === activeConversation) {
          setActiveConversation(null);
        }
        break;
      default:
    }
  };
  return (
    <button
      type="button"
      aria-selected={active}
      role="option"
      className={`conversation-preview-container ${activeClass} ${unreadClass} ${pinClass}`}
      onClick={onSelectConversation}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={conversationPreviewButton}
    >
      <div className="avatar">
        <Avatar image={displayImage} name={displayTitle} size={40} />
      </div>
      <div className="content">
        <div className="title">
          {displayTitle}
        </div>
        {/*<div className="message">*/}
        {/*  {displayMessage}*/}
        {/*</div>*/}
      </div>
      <div className={"unread"}>
        {unread ? (<div className="unread">{unread <= 99 ? unread : '99+'}</div>) : (<div className="unread" />)}
      </div>
      {/*<div className="external">*/}
      {/*  {unread ? (<div className="unread">{unread <= 99 ? unread : '99+'}</div>) : (<div className="unread" />)}*/}
        {/*{!isHover*/}
        {/*  ? (*/}
        {/*    <div className="time">*/}
        {/*      {displayTime}*/}
        {/*    </div>*/}
        {/*  )*/}
        {/*  : (*/}
        {/*    <div className={`${isHover ? 'more--hover' : 'more'}`}>*/}
        {/*      <Plugins*/}
        {/*        customClass="more-handle-box"*/}
        {/*        plugins={[*/}
        {/*          <div*/}
        {/*            role="presentation"*/}
        {/*            className="more-handle-item"*/}
        {/*            onClick={(e) => {*/}
        {/*              e.stopPropagation();*/}
        {/*              moreHandle('pin');*/}
        {/*            }}*/}
        {/*          >*/}
        {/*            {!conversation.isPinned ? 'Pin' : 'Cancel Pin'}*/}
        {/*          </div>,*/}
        {/*          <div*/}
        {/*            className="more-handle-item"*/}
        {/*            style={{ color: '#FF584C' }}*/}
        {/*            onClick={(e) => {*/}
        {/*              e.stopPropagation();*/}
        {/*              moreHandle('delete');*/}
        {/*            }}*/}
        {/*            role="presentation"*/}
        {/*          >*/}
        {/*            Delete*/}
        {/*          </div>,*/}
        {/*        ]}*/}
        {/*        showNumber={0}*/}
        {/*        MoreIcon={(*/}
        {/*          <Icon*/}
        {/*            className="icon-more"*/}
        {/*            width={16}*/}
        {/*            height={16}*/}
        {/*            type={IconTypes.MORE}*/}
        {/*          />*/}
        {/*        )}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  )}*/}
      {/*</div>*/}
    </button>
  );
}

export const MyConversationPreviewContent = React.memo(unMemoMyConversationPreviewContent) as
  typeof unMemoMyConversationPreviewContent;
