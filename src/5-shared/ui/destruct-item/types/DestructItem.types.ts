import {ReactNode} from 'react';
import {StatusTextKey} from '@shared/ui';

export type DestructItemProps = {
	onDestruct: () => void;
	children: ReactNode;
	confirmationTitle: string;
	confirmationDescription: string;
	destructButtonText?: string;
	statusTextKey: StatusTextKey;
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
};
