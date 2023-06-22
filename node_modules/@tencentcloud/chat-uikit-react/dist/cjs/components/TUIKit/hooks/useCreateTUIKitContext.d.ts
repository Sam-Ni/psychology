import * as tim_js_sdk from 'tim-js-sdk';
import React from 'react';
import { TUIKitContextValue } from '../../../context/TUIKitContext.js';

declare const useCreateTUIKitContext: (value: TUIKitContextValue) => {
    tim: tim_js_sdk.ChatSDK;
    conversation: tim_js_sdk.Conversation;
    customClasses: unknown;
    setActiveConversation: (conversation?: tim_js_sdk.Conversation) => void;
    myProfile: tim_js_sdk.Profile;
    TUIManageShow: boolean;
    setTUIManageShow: React.Dispatch<React.SetStateAction<boolean>>;
    TUIProfileShow: boolean;
    setTUIProfileShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export { useCreateTUIKitContext };
