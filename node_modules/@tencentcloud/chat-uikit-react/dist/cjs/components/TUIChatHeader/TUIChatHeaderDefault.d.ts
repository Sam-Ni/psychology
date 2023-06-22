import React from 'react';
import { Conversation } from 'tim-js-sdk';

interface TUIChatHeaderDefaultProps {
    title?: string;
    avatar?: React.ReactElement | string;
    isOnline?: boolean;
    conversation?: Conversation;
    pluginComponentList?: Array<React.ComponentType>;
}
interface TUIChatHeaderBasicProps extends TUIChatHeaderDefaultProps {
    isLive?: boolean;
    opateIcon?: React.ReactElement | string;
}
declare function TUIChatHeaderDefault(props: TUIChatHeaderBasicProps): React.ReactElement;

export { TUIChatHeaderBasicProps, TUIChatHeaderDefault, TUIChatHeaderDefaultProps };
