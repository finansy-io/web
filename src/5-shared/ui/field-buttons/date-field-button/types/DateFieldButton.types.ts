import {ReactNode} from 'react';

export type DateFieldButtonProps = {
	value: Date | null;
	minDate?: Date;
	onChange: (value: Date | null) => void;
	children: ReactNode;
	title: ReactNode;
	withReset?: boolean;
	isTextButtonOnGrey?: boolean;
};
