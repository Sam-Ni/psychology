import React, { MutableRefObject, PropsWithChildren } from 'react';
import { UnknowPorps } from '../../context/ComponentContext.js';

interface PluginConfigProps {
    plugins?: Array<React.ReactElement>;
    showNumber?: number;
    MoreIcon?: React.ReactElement;
    isEmojiPicker?: boolean;
    isImagePicker?: boolean;
    isVideoPicker?: boolean;
    isFilePicker?: boolean;
}
interface TUIMessageInputBasicProps {
    disabled?: boolean;
    focus?: boolean;
    textareaRef?: MutableRefObject<HTMLTextAreaElement | undefined>;
    isTransmitter?: boolean;
    className?: string;
    pluginConfig?: PluginConfigProps;
}
interface TUIMessageInputProps extends TUIMessageInputBasicProps {
    TUIMessageInput?: React.ComponentType;
    InputPlugins?: React.ComponentType<UnknowPorps>;
    InputQuote?: React.ComponentType<UnknowPorps>;
}
declare function UnMemoizedTUIMessageInput<T extends TUIMessageInputProps>(props: PropsWithChildren<T>): React.ReactElement;
declare const TUIMessageInput: typeof UnMemoizedTUIMessageInput;

export { PluginConfigProps, TUIMessageInput, TUIMessageInputBasicProps, TUIMessageInputProps };
