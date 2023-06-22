import React, { PropsWithChildren } from 'react';
import tim_js_sdk__default from 'tim-js-sdk';
import { PluginsProps } from '../Plugins/index.js';

declare enum PluginsNameEnum {
    quote = "quote",
    forward = "forward",
    copy = "copy",
    delete = "delete",
    resend = "resend",
    revoke = "revoke"
}
type MessagePluginConfigProps = {
    [propsName in PluginsNameEnum]?: {
        isShow?: boolean;
        relateMessageType?: tim_js_sdk__default.TYPES[];
    };
};
interface MessagePluginsProps extends PluginsProps {
    config?: MessagePluginConfigProps;
}
declare function MessagePlugins<T extends MessagePluginsProps>(props: PropsWithChildren<T>): React.ReactElement;

export { MessagePluginConfigProps, MessagePlugins, MessagePluginsProps };
