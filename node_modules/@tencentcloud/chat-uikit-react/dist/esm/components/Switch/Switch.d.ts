import React from 'react';

interface Props {
    checked: boolean;
    onChange: (e: React.ChangeEvent) => void;
    checkedColor?: string;
    className?: string;
}
declare function Switch(props: Props): JSX.Element;
declare namespace Switch {
    var defaultProps: {
        checkedColor: string;
    };
}

export { Switch };
