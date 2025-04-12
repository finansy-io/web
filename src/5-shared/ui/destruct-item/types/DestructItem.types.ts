import {ReactNode} from 'react';
import {StatusTextKey} from '@shared/ui';
import {onStatusPopupDismiss} from '@shared/ui/popup/ui/status-popup/types/StatusPopup.types.ts';

export type DestructItemProps = {
	onDestruct: () => void;
	onStatusPopupDismiss: onStatusPopupDismiss;
	children: ReactNode;
	confirmationTitle: string;
	confirmationDescription: string;
	destructButtonText?: string;
	statusTextKey: StatusTextKey;
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
};
