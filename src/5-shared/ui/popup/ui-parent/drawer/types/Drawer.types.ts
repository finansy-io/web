import {ReactElement, ReactNode} from 'react';

export type DrawerProps = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	leftTitle?: ReactNode;
	title?: ReactNode;
	rightTitle?: ReactNode;
	children?: ReactNode;
	actionButtonNode?: ReactNode;

	direction?: 'left' | 'bottom';
	statusDismissible?: boolean;
	statusProgress?: number;
	statusIcon?: ReactElement;
};
