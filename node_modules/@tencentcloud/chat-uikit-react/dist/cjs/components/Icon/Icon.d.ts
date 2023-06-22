import React from 'react';
import { IconTypes } from './type.js';

declare const changeTypeToIconClassName: (type: IconTypes) => string;
interface IconProps {
    type?: IconTypes;
    height?: number;
    width?: number;
    onClick?: (event: React.BaseSyntheticEvent) => void;
    className?: string;
}
declare function Icon(props: React.PropsWithChildren<IconProps>): JSX.Element;

export { Icon, IconProps, changeTypeToIconClassName };
