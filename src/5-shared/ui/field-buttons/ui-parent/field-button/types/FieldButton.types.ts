import {ReactNode} from 'react';

export type FieldButtonProps = {
	children: ReactNode;
	openPopup: () => void;
	isLoading?: boolean;
	isEdit?: boolean;
	isTextButtonOnGrey?: boolean;
};
