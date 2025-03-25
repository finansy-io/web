import {ReactNode, ReactElement} from 'react';

export type DrawerProps = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	leftTitle?: ReactNode;
	title?: ReactNode;
	rightTitle?: ReactNode;
	children?: ReactNode;

	direction?: 'left' | 'bottom';
	statusDismissible?: boolean;
	statusProgress?: number;
	statusIcon?: ReactElement;
};

export type PopupProps = Pick<
	DrawerProps,
	'isOpen' | 'setIsOpen' | 'leftTitle' | 'title' | 'rightTitle' | 'children'
> & {
	children: ReactNode;
};
