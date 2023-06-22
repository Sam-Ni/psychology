import React, { ReactEventHandler } from 'react';
import { Message } from 'tim-js-sdk';
import { UnknowPorps } from '../../context/ComponentContext.js';
import { messageShowType } from '../../context/TUIMessageContext.js';
import { MessagePluginsProps } from './MessagePlugins.js';

interface TUIMessageBasicProps {
    className?: string;
    filter?: (data: Message) => void;
    isShowTime?: boolean;
    isShowRead?: boolean;
    plugin?: MessagePluginsProps;
    prefix?: React.ReactElement | string;
    suffix?: React.ReactElement | string;
    customName?: React.ReactElement;
    showAvatar?: messageShowType;
    showName?: messageShowType;
    customAvatar?: React.ReactElement;
    isShowProgress?: boolean;
    Progress?: React.ComponentType<{
        message: Message;
    }>;
}
interface TUIMessageProps extends TUIMessageBasicProps {
    message?: Message;
    className?: string;
    TUIMessage?: React.ComponentType;
    MessageContext?: React.ComponentType<UnknowPorps>;
    MessagePlugins?: React.ComponentType<UnknowPorps>;
    handleDelete?: ReactEventHandler;
    CustemElement?: React.ComponentType<{
        message: Message;
    }>;
    TextElement?: React.ComponentType<{
        message: Message;
    }>;
    ImageElement?: React.ComponentType<{
        message: Message;
    }>;
    VideoElement?: React.ComponentType<{
        message: Message;
    }>;
    AudioElement?: React.ComponentType<{
        message: Message;
    }>;
    FileElement?: React.ComponentType<{
        message: Message;
    }>;
    MergerElement?: React.ComponentType<{
        message: Message;
    }>;
    LocationElement?: React.ComponentType<{
        message: Message;
    }>;
    FaceElement?: React.ComponentType<{
        message: Message;
    }>;
}
declare function TUIMessage(props: TUIMessageProps): React.ReactElement;

export { TUIMessage, TUIMessageProps };
