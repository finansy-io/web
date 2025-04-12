import {ReactElement, ReactNode} from 'react';
import {NavigateFunction} from 'react-router-dom';

export type CommonButtonSettings = {
	icon?: ReactElement;
	type: 'primary' | 'secondary' | 'text' | 'circle' | 'icon';
	onClick: ({navigate}: {navigate: NavigateFunction}) => void;
	className?: string;
};

export type ButtonConfig = CommonButtonSettings & {
	name: string;
};

export type ButtonProps = CommonButtonSettings & {
	children?: ReactNode;
	disabled?: boolean;
	isLoading?: boolean;
	isPending?: boolean;
	disabledPrimaryButtonEnterClick?: boolean;
	secondaryWithPrimaryStyles?: boolean;
	primaryButtonSpinnerClassName?: string;
	isTextButtonOnGrey?: boolean;
};
