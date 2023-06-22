import React from 'react';

interface PopupProps {
    className?: string;
    show?: boolean;
    close?: (e: any) => void;
    root?: any;
    handleVisible?: (isVisible: any) => void;
}
declare function Popup<T extends PopupProps>(props: React.PropsWithChildren<T>): React.ReactElement;

export { Popup };
