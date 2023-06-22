import React from 'react';
import { Message } from 'tim-js-sdk';
import { InfiniteScrollProps } from '../InfiniteScrollPaginator/InfiniteScroll.js';

interface MessageListProps extends InfiniteScrollProps {
    className?: string;
    messageList?: Array<Message>;
    highlightedMessageId?: string;
    intervalsTimer?: number;
}
declare function TUIMessageList(props: MessageListProps): React.ReactElement;

export { MessageListProps, TUIMessageList };
