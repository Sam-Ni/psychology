import React from 'react';

interface ToastProps {
    type?: 'info' | 'warn' | 'error';
    text?: string;
    time?: number;
    className?: string;
}
declare function Toast<T extends ToastProps>(props: React.PropsWithChildren<T>): void;

export { Toast };
