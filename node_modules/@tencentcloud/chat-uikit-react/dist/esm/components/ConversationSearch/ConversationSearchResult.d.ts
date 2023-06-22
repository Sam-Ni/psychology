import React from 'react';
import { Conversation } from 'tim-js-sdk';
import { ConversationPreviewUIComponentProps } from '../ConversationPreview/ConversationPreview.js';

interface ConversationSearchResultProps {
    result: Array<Conversation>;
    searchValue?: string;
    Preview?: React.ComponentType<ConversationPreviewUIComponentProps>;
}
declare function ConversationSearchResult(props: ConversationSearchResultProps): React.ReactElement;

export { ConversationSearchResult, ConversationSearchResultProps };
