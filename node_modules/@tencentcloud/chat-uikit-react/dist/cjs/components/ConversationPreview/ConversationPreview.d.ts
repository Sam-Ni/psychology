import React from 'react';
import { Conversation } from 'tim-js-sdk';
import { TUIKitContextValue } from '../../context/TUIKitContext.js';
import { AvatarProps } from '../Avatar/Avatar.js';

interface ConversationPreviewUIComponentProps extends ConversationPreviewProps {
    /** If the component's Conversation is the active (selected) Conversation */
    active?: boolean;
    /** Image of Conversation to display */
    displayImage?: string;
    /** Title of Conversation to display */
    displayTitle?: string | React.ReactElement;
    /** Message of Conversation to display */
    displayMessage?: string | React.ReactElement;
    /** Time of Conversation to display */
    displayTime?: string;
    /** Number of unread Messages */
    unread?: number;
}
interface ConversationPreviewProps {
    conversation: Conversation;
    activeConversation?: Conversation;
    Preview?: React.ComponentType<ConversationPreviewUIComponentProps>;
    Avatar?: React.ComponentType<AvatarProps>;
    setActiveConversation?: TUIKitContextValue['setActiveConversation'];
    searchValue?: string;
    conversationUpdateCount?: number;
}
declare function ConversationPreview<T extends ConversationPreviewProps>(props: T): React.ReactElement;

export { ConversationPreview, ConversationPreviewProps, ConversationPreviewUIComponentProps };
