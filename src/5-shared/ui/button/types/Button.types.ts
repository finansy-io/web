import {ReactElement, ReactNode} from 'react';
import {NavigateFunction} from 'react-router-dom';

export interface ButtonConfig extends CommonButtonSettings {
	name: string;
}

export interface CommonButtonSettings {
	icon?: ReactElement;
	type: 'primary' | 'secondary' | 'text' | 'circle' | 'icon';
	onClick: ({navigate}: {navigate: NavigateFunction}) => void;
	className?: string;
}
export interface ButtonProps extends CommonButtonSettings {
	children?: ReactNode;
	disabled?: boolean;
	isLoading?: boolean;
	isPending?: boolean;
	disabledPrimaryButtonEnterClick?: boolean;
	secondaryWithPrimaryStyles?: boolean;
	primaryButtonSpinnerClassName?: string;
	isTextButtonOnGrey?: boolean;
}
