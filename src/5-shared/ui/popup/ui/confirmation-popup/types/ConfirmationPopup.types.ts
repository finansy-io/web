import {PopupProps} from '@shared/ui/popup/ui/popup/types/Popup.types.ts';

export type ConfirmationPopupProps = Pick<PopupProps, 'isOpen' | 'setIsOpen' | 'title'> & {
	description: string;
	onActionClick: () => void;
	isActionPending: boolean;
	actionButtonText?: string;
	close: () => void;
};
