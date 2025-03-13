import {ReactNode, ReactElement} from 'react';

export type DrawerProps = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	title?: string;
	children: ReactNode;
	isDismissible?: boolean;
	progressSheet?: ReactElement;
};

export type PopupProps = Omit<DrawerProps, 'isDismissible' | 'progressSheet'>;
