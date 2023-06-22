import React from 'react';
import { Conversation } from 'tim-js-sdk';
import { ConversationPreviewUIComponentProps } from '../ConversationPreview/ConversationPreview.js';
import { ConversationListContainerProps } from '../ConversationPreview/ConversationListContainer.js';

interface Props {
    filters?: object;
    sort?: object;
    options?: object;
    Preview?: React.ComponentType<ConversationPreviewUIComponentProps>;
    Container?: React.ComponentType<ConversationListContainerProps>;
    onConversationListUpdated?: (setConversationList: React.Dispatch<React.SetStateAction<Array<Conversation>>>, event: () => void) => void;
    filterConversation?: (conversationList: Array<Conversation>) => Array<Conversation>;
    showSelf?: boolean;
    showSearch?: boolean;
    onlyGroupConversation?: boolean;
    onlyC2CConversation?: boolean;
    setCurrentConversation?: (Conversation: any) => void;
}
declare function UnMemoTUIConversationList<T extends Props>(props: T): React.ReactElement;
declare const TUIConversationList: React.MemoExoticComponent<typeof UnMemoTUIConversationList>;

export { TUIConversationList, UnMemoTUIConversationList };
