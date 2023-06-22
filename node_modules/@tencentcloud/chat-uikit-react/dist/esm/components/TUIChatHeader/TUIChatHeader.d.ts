import React, { PropsWithChildren } from 'react';
import { Conversation } from 'tim-js-sdk';
import { TUIChatHeaderDefaultProps } from './TUIChatHeaderDefault.js';

interface TUIChatHeaderProps {
    title?: string;
    TUIChatHeader?: React.ComponentType<TUIChatHeaderDefaultProps>;
    conversation?: Conversation;
    avatar?: React.ReactElement | string;
    headerOpateIcon?: React.ReactElement | string;
}
declare function UnMemoizedTUIChatHeader<T extends TUIChatHeaderProps>(props: PropsWithChildren<T>): React.ReactElement;
declare const TUIChatHeader: typeof UnMemoizedTUIChatHeader;

export { TUIChatHeader };
