import React, { RefObject, MutableRefObject, PropsWithChildren } from 'react';
import { Conversation, Message } from 'tim-js-sdk';
import { OperateMessageParams } from '../components/TUIChat/hooks/useHandleMessage.js';
import { TUIMessageProps } from '../components/TUIMessage/TUIMessage.js';
import { TUIMessageInputBasicProps } from '../components/TUIMessageInput/TUIMessageInput.js';
import { MessageListProps } from '../components/TUIMessageList/TUIMessageList.js';

interface TUIChatStateContextValue {
    conversation?: Conversation;
    messageList?: Array<Message>;
    nextReqMessageID?: string;
    isCompleted?: boolean;
    init?: boolean;
    highlightedMessageId?: string;
    lastMessageID?: string;
    isSameLastMessageID?: boolean;
    messageListRef?: RefObject<HTMLDivElement>;
    textareaRef?: MutableRefObject<HTMLTextAreaElement | undefined>;
    operateData?: OperateMessageParams;
    noMore?: boolean;
    messageConfig?: TUIMessageProps;
    cloudCustomData?: string;
    TUIMessageInputConfig?: TUIMessageInputBasicProps;
    audioSource?: HTMLAudioElement;
    vidoeSource?: HTMLVideoElement;
    TUIMessageListConfig?: MessageListProps;
    uploadPenddingMessageList?: Array<Message>;
}
declare const TUIChatStateContext: React.Context<TUIChatStateContextValue>;
declare function TUIChatStateContextProvider({ children, value }: PropsWithChildren<{
    value: TUIChatStateContextValue;
}>): React.ReactElement;
declare function useTUIChatStateContext(componentName?: string): TUIChatStateContextValue;

export { TUIChatStateContext, TUIChatStateContextProvider, TUIChatStateContextValue, useTUIChatStateContext };
