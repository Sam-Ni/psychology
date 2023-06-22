import tim_js_sdk__default, { Conversation, Message } from 'tim-js-sdk';

interface BasicCreateMessageProps {
    needReadReceipt?: boolean;
    priority?: tim_js_sdk__default.TYPES;
    onProgress?: (num: number) => void;
    cloudCustomData?: string;
    receiverList?: Array<string>;
}
interface CreateTextMessageProps extends BasicCreateMessageProps {
    payload: {
        text: string;
    };
}
interface CreateFaceMessageProps extends BasicCreateMessageProps {
    payload: {
        index: number;
        data: string;
    };
}
interface CreateUploadMessageProps extends BasicCreateMessageProps {
    payload: {
        file: HTMLInputElement | File;
    };
}
interface CreateForwardMessageProps extends BasicCreateMessageProps {
    conversation: Conversation;
    message: Message;
}
interface CreateCustomMessageProps extends BasicCreateMessageProps {
    payload: {
        data: string;
        description: string;
        extension: string;
    };
}
interface CreateTextAtMessageProps extends BasicCreateMessageProps {
    payload: {
        text: string;
        atUserList: Array<string>;
    };
}
interface CreateLocationMessageProps extends BasicCreateMessageProps {
    payload: {
        description: string;
        longitude: number;
        latitude: number;
    };
}
interface CreateMergerMessageProps extends BasicCreateMessageProps {
    payload: {
        messageList: Array<Message>;
        title: string;
        abstractList: string;
        compatibleText: string;
    };
}

export { BasicCreateMessageProps, CreateCustomMessageProps, CreateFaceMessageProps, CreateForwardMessageProps, CreateLocationMessageProps, CreateMergerMessageProps, CreateTextAtMessageProps, CreateTextMessageProps, CreateUploadMessageProps };
