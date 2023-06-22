import React, { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
    className?: string;
    customClassName?: string;
    placeholder?: string;
    clearable?: boolean;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    value?: InputHTMLAttributes<HTMLInputElement>['value'];
    border?: '' | 'bottom';
    disabled?: boolean;
    maxLength?: number;
}
interface InputRef {
    focus: (options?: object) => void;
    blur: () => void;
    input: HTMLInputElement | null;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>>;

export { Input, InputProps, InputRef };
