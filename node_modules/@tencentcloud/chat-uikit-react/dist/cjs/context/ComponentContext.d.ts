import React, { PropsWithChildren } from 'react';
import { EmptyStateIndicatorProps } from '../components/EmptyStateIndicator/EmptyStateIndicator.js';
import { TUIMessageProps } from '../components/TUIMessage/TUIMessage.js';
import { MessageContextProps } from '../components/TUIMessage/MessageContext.js';
import { TUIChatHeaderDefaultProps } from '../components/TUIChatHeader/TUIChatHeaderDefault.js';

interface UnknowPorps {
    [propsName: string]: any;
}
interface ComponentContextValue {
    TUIMessage?: React.ComponentType<TUIMessageProps | UnknowPorps>;
    TUIChatHeader?: React.ComponentType<TUIChatHeaderDefaultProps>;
    EmptyStateIndicator?: React.ComponentType<EmptyStateIndicatorProps>;
    TUIMessageInput?: React.ComponentType<UnknowPorps>;
    MessageContext?: React.ComponentType<MessageContextProps>;
    InputPlugins?: React.ComponentType<UnknowPorps>;
    MessagePlugins?: React.ComponentType<UnknowPorps>;
    InputQuote?: React.ComponentType<UnknowPorps>;
}
declare const ComponentContext: React.Context<ComponentContextValue>;
declare function ComponentProvider({ children, value, }: PropsWithChildren<{
    value: ComponentContextValue;
}>): JSX.Element;
declare function useComponentContext(componentName?: string): ComponentContextValue;

export { ComponentContext, ComponentContextValue, ComponentProvider, UnknowPorps, useComponentContext };
