import {ReactNode} from 'react';
import {DrawerProps} from '@shared/ui/popup/ui-parent/drawer/types/Drawer.types.ts';

export type PopupProps = Pick<
	DrawerProps,
	'isOpen' | 'setIsOpen' | 'leftTitle' | 'title' | 'rightTitle' | 'children' | 'actionButtonNode'
> & {
	children: ReactNode;
};
