import {type PopupProps} from '../types/Popup.types.ts';
import {Drawer} from '@shared/ui/popup/ui-parent/drawer/ui/Drawer.tsx';

export function Popup(props: PopupProps) {
	return <Drawer {...props} />;
}
