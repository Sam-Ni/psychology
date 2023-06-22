import React from 'react';

interface PopupProps {
    className?: string;
    onClick?: (e?: any) => void;
}
declare function Model<T extends PopupProps>(props: React.PropsWithChildren<T>): React.ReactElement;

export { Model };
