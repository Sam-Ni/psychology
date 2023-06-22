import tim_js_sdk__default from 'tim-js-sdk';

interface CreateGroupConversationParams {
    name: string;
    type?: tim_js_sdk__default.TYPES;
    groupID?: string;
    introduction?: string;
    notification?: string;
    avatar?: string;
    maxMemberNum?: number;
    joinOption?: string;
    memberList?: Array<object>;
    groupCustomField?: Array<object>;
    isSupportTopic?: boolean;
}
declare const useConversation: (tim: any) => {
    createConversation: (conversationID: string) => Promise<any>;
    pinConversation: (options: {
        conversationID: string;
        isPinned: boolean;
    }) => any;
    deleteConversation: (conversationID: string) => any;
};

export { CreateGroupConversationParams, useConversation };
