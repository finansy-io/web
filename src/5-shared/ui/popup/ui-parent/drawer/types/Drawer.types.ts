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
	statusProgress?: number;
	statusIcon?: ReactElement;
	isFullScreen?: boolean;
	isKeyboardActive?: boolean;
	onDrag?: () => void;
};
