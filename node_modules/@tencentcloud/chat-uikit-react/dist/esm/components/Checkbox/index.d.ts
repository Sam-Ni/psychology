import React from 'react';

interface onChangeParams {
    checked?: boolean;
    value?: any;
}
interface SelectProps {
    checked?: boolean;
    className?: string;
    onChange?: (data?: onChangeParams) => void;
    value?: any;
    id?: string;
}
declare function Checkbox<T extends SelectProps>(props: React.PropsWithChildren<T>): JSX.Element;

export { Checkbox };
