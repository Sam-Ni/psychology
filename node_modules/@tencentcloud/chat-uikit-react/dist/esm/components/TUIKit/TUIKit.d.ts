import React, { PropsWithChildren } from 'react';
import { ChatSDK, Conversation } from 'tim-js-sdk';

interface ChatProps {
    tim?: ChatSDK | null;
    customClasses?: unknown;
    activeConversation?: Conversation;
}
declare function TUIKit<T extends ChatProps>(props: PropsWithChildren<T>): React.ReactElement;

export { ChatProps, TUIKit };
