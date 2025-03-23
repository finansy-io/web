import type {PopupProps} from '../types/Popup.types.ts';
import {Drawer} from '../ui/Drawer.tsx';

export function LeftPopup(props: PopupProps) {
	return <Drawer {...props} direction='left' />;
}
