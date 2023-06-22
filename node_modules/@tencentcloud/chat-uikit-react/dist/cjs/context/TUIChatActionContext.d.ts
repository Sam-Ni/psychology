import React, { PropsWithChildren } from 'react';
import { Message } from 'tim-js-sdk';
import { CreateTextMessageProps, CreateFaceMessageProps, CreateUploadMessageProps, CreateForwardMessageProps, CreateCustomMessageProps, CreateTextAtMessageProps, CreateLocationMessageProps, CreateMergerMessageProps } from '../components/TUIChat/hooks/useCreateMessage.js';
import { OperateMessageParams } from '../components/TUIChat/hooks/useHandleMessage.js';

interface TUIChatActionContextValue {
    sendMessage?: (message: Message, options?: any) => Promise<void>;
    removeMessage?: (message: Message) => void;
    updateMessage?: (messages: Array<Message>) => void;
    createTextMessage?: (options: CreateTextMessageProps) => Message;
    createFaceMessage?: (options: CreateFaceMessageProps) => Message;
    createImageMessage?: (options: CreateUploadMessageProps) => Message;
    createVideoMessage?: (options: CreateUploadMessageProps) => Message;
    createFileMessage?: (options: CreateUploadMessageProps) => Message;
    createForwardMessage?: (options: CreateForwardMessageProps) => Message;
    createCustomMessage?: (options: CreateCustomMessageProps) => Message;
    createAudioMessage?: (options: CreateUploadMessageProps) => Message;
    createTextAtMessage?: (options: CreateTextAtMessageProps) => Message;
    createLocationMessage?: (options: CreateLocationMessageProps) => Message;
    createMergerMessage?: (options: CreateMergerMessageProps) => Message;
    editLocalmessage?: (message: Message) => void;
    operateMessage?: (data?: OperateMessageParams) => void;
    loadMore?: () => Promise<void>;
    revokeMessage?: (message: Message) => Promise<Message>;
    setAudioSource?: (source: HTMLAudioElement | null) => void;
    setVideoSource?: (source: HTMLVideoElement | null) => void;
    setHighlightedMessageId?: (highlightedMessageId: string) => void;
    updataUploadPenddingMessageList?: (message?: Message) => void;
}
declare const TUIChatActionContext: React.Context<TUIChatActionContextValue>;
declare function TUIChatActionProvider({ children, value, }: PropsWithChildren<{
    value: TUIChatActionContextValue;
}>): React.ReactElement;
declare const useTUIChatActionContext: (componentName?: string) => TUIChatActionContextValue;

export { TUIChatActionContext, TUIChatActionContextValue, TUIChatActionProvider, useTUIChatActionContext };
