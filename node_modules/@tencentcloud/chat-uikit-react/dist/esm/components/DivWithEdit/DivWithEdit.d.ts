import { PropsWithChildren } from 'react';

interface DivWithEditProps {
    name?: string;
    value?: string;
    confirm?: (data?: any) => void;
    className?: string;
    classEditName?: string;
    type?: string;
    isEdit?: boolean;
    toggle?: (name: string) => void;
    close?: () => void;
}
declare function DivWithEdit<T extends DivWithEditProps>(props: PropsWithChildren<T>): JSX.Element;

export { DivWithEdit };
