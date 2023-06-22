import { PropsWithChildren } from 'react';

interface EmptyStateIndicatorProps {
    /** List Type: conversation | message */
    listType?: 'conversation' | 'message' | 'chat';
}
declare function UnMemoizedEmptyStateIndicator<T extends EmptyStateIndicatorProps>(props: PropsWithChildren<T>): JSX.Element;
declare const EmptyStateIndicator: typeof UnMemoizedEmptyStateIndicator;

export { EmptyStateIndicator, EmptyStateIndicatorProps };
