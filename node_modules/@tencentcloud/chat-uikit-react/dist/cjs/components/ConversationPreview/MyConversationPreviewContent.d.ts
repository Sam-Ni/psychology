import React from 'react';
import { ConversationPreviewUIComponentProps } from './ConversationPreview.js';

interface MyConversationPreviewUIComponentProps extends ConversationPreviewUIComponentProps {
    setCurrentConversation?: (Conversation: any) => void;
}
declare function unMemoMyConversationPreviewContent<T extends MyConversationPreviewUIComponentProps>(props: T): React.ReactElement;
declare const MyConversationPreviewContent: typeof unMemoMyConversationPreviewContent;

export { MyConversationPreviewContent, unMemoMyConversationPreviewContent };
