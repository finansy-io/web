import {ReactNode} from 'react';
import {StatusTextKey} from '@shared/ui';

export type DeleteItemProps = {
	confirmationTitle: string;
	confirmationDescription: string;
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
	actionButtonText?: string;
	handleDelete: () => void;
	children: ReactNode;
	statusTextKey: StatusTextKey;
};
