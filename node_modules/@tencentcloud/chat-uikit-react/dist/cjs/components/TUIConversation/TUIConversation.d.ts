import React, { PropsWithChildren } from 'react';
import { Conversation } from 'tim-js-sdk';

interface TUIConversationProps {
    createConversation?: (conversationID: string) => Promise<any>;
    deleteConversation?: (conversationID: string) => Promise<any>;
    filterConversation?: (conversationList: Array<Conversation>) => Array<Conversation>;
}
declare function UnMemoizedTUIConversation<T extends TUIConversationProps>(props: PropsWithChildren<T>): React.ReactElement;
declare const TUIConversation: typeof UnMemoizedTUIConversation;

export { TUIConversation, UnMemoizedTUIConversation };
