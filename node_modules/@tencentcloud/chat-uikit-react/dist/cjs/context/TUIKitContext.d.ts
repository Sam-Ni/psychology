import React, { PropsWithChildren } from 'react';
import { ChatSDK, Conversation, Profile } from 'tim-js-sdk';

interface TUIKitContextValue {
    tim: ChatSDK;
    conversation?: Conversation;
    setActiveConversation: (conversation?: Conversation) => void;
    customClasses?: unknown;
    myProfile?: Profile;
    TUIManageShow?: boolean;
    setTUIManageShow?: React.Dispatch<React.SetStateAction<boolean>>;
    TUIProfileShow?: boolean;
    setTUIProfileShow?: React.Dispatch<React.SetStateAction<boolean>>;
}
declare const TUIKitContext: React.Context<TUIKitContextValue>;
declare function TUIKitProvider({ children, value }: PropsWithChildren<{
    value: TUIKitContextValue;
}>): React.ReactElement;
declare const useTUIKitContext: (componentName?: string) => TUIKitContextValue;

export { TUIKitContext, TUIKitContextValue, TUIKitProvider, useTUIKitContext };
