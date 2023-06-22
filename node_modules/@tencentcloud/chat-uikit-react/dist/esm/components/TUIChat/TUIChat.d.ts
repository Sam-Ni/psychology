import React, { PropsWithChildren } from 'react';
import { Conversation, Message } from 'tim-js-sdk';
import { UnknowPorps } from '../../context/ComponentContext.js';
import { TUIChatHeaderDefaultProps } from '../TUIChatHeader/TUIChatHeaderDefault.js';
import { TUIMessageProps } from '../TUIMessage/TUIMessage.js';
import { MessageContextProps } from '../TUIMessage/MessageContext.js';
import { MessageListProps } from '../TUIMessageList/TUIMessageList.js';
import { TUIMessageInputBasicProps } from '../TUIMessageInput/TUIMessageInput.js';

interface TUIChatProps {
    className?: string;
    conversation?: Conversation;
    EmptyPlaceholder?: React.ReactElement;
    TUIMessage?: React.ComponentType<TUIMessageProps | UnknowPorps>;
    TUIChatHeader?: React.ComponentType<TUIChatHeaderDefaultProps>;
    MessageContext?: React.ComponentType<MessageContextProps>;
    TUIMessageInput?: React.ComponentType<UnknowPorps>;
    InputPlugins?: React.ComponentType<UnknowPorps>;
    InputQuote?: React.ComponentType<UnknowPorps>;
    MessagePlugins?: React.ComponentType<UnknowPorps>;
    onMessageRecevied?: (updateMessage: (event?: Array<Message>) => void, event: any) => void;
    sendMessage?: (message: Message, options?: any) => Promise<Message>;
    revokeMessage?: (message: Message) => Promise<Message>;
    messageConfig?: TUIMessageProps;
    cloudCustomData?: string;
    TUIMessageInputConfig?: TUIMessageInputBasicProps;
    TUIMessageListConfig?: MessageListProps;
    [propName: string]: any;
}
declare function UnMemoizedTUIChat<T extends TUIChatProps>(props: PropsWithChildren<T>): React.ReactElement;
declare const TUIChat: typeof UnMemoizedTUIChat;

export { TUIChat };
