import {ReactNode} from 'react';

export type TextFieldEditButtonProps = {
	children: ReactNode;
	entityName: string;
	maxLength?: number;
	initialValue: string;
	handleUpdate: (value: string) => void;
	isLoading?: boolean;
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
};
