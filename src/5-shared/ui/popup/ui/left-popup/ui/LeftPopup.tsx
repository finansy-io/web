import type {PopupProps} from '../../popup/types/Popup.types.ts';
import {Drawer} from '@shared/ui/popup/ui-parent/drawer/ui/Drawer.tsx';

export function LeftPopup(props: PopupProps) {
	return <Drawer {...props} direction='left' />;
}
