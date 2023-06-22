import React from 'react';
import { ChatSDK, Conversation, Profile } from 'tim-js-sdk';

interface UseChatParams {
    tim: ChatSDK;
    activeConversation?: Conversation;
}
declare const useTUIKit: ({ tim, activeConversation: paramsActiveConversation }: UseChatParams) => {
    conversation: Conversation;
    setActiveConversation: (activeConversation?: Conversation) => void;
    myProfile: Profile;
    TUIManageShow: boolean;
    setTUIManageShow: React.Dispatch<React.SetStateAction<boolean>>;
    TUIProfileShow: boolean;
    setTUIProfileShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export { UseChatParams, useTUIKit };
