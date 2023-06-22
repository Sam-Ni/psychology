import React from 'react';
import { Profile } from 'tim-js-sdk';
import { ProfileParams } from './hooks/useMyProfile.js';

interface TUIProfileDefaultProps {
    userInfo?: Profile;
    update?: (option: ProfileParams) => void;
    className?: string;
}
declare function TUIProfileDefault(props: TUIProfileDefaultProps): React.ReactElement;

export { TUIProfileDefault, TUIProfileDefaultProps };
