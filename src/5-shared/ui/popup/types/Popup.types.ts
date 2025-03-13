import {ReactNode} from 'react';

export type DrawerProps = {
	title?: ReactNode;
	children: ReactNode;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onClose?: () => void;
};
