import React from 'react';
import { Message } from 'tim-js-sdk';

interface MessageContextProps {
    message?: Message;
}
declare function MessageContext(props: MessageContextProps): React.ReactElement;

export { MessageContext, MessageContextProps };
