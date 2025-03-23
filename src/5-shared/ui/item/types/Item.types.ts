import {ReactElement, ReactNode} from 'react';
import {NavigateFunction} from 'react-router-dom';

export type ItemProps = {
	image?: ReactElement;
	imageIcon?: ReactElement | boolean;

	name: ReactNode;
	description?: ReactNode;
	rightName?: ReactNode;
	rightDescription?: ReactNode;

	leftNode?: ReactNode;
	rightNode?: ReactNode;

	onClick?: ({navigate}: {navigate: NavigateFunction}) => void;

	className?: string | boolean;

	isNameText?: boolean;
	isSingle?: boolean;
	isChecked?: boolean;
};
