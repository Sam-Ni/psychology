import React from 'react';

interface PluginsProps {
    plugins?: Array<any>;
    showNumber?: number;
    MoreIcon?: any;
    className?: string;
    customClass?: string;
    root?: any;
    handleVisible?: (isVisible: any) => void;
    showMore?: boolean;
}
declare const Plugins: React.ForwardRefExoticComponent<PluginsProps & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;

export { Plugins, PluginsProps };
