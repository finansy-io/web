import {ReactNode, ReactElement} from 'react';

export type DrawerProps = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	title?: ReactNode;
	children?: ReactNode;

	statusDismissible?: boolean;
	statusProgress?: number;
	statusIcon?: ReactElement;
};

export type PopupProps = Omit<DrawerProps, 'isDismissible' | 'progressSheet' | 'children'> & {children: ReactNode};
