import React from 'react';
import { Conversation } from 'tim-js-sdk';

interface ConversationListContainerProps {
    error?: Error | null;
    loading?: boolean;
    setConversationList?: React.Dispatch<React.SetStateAction<Array<Conversation>>>;
}

export { ConversationListContainerProps };
