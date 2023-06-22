import React, { PropsWithChildren } from 'react';

interface TUIProfileProps {
    className?: string;
    TUIProfile?: React.ComponentType<any>;
}
declare function UnMemoizedTUIProfile<T extends TUIProfileProps>(props: PropsWithChildren<T>): React.ReactElement;
declare const TUIProfile: typeof UnMemoizedTUIProfile;

export { TUIProfile };
