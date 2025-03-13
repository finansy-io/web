import {type PopupProps} from '../types/Popup.types.ts';
import {Drawer} from './Drawer.tsx';

export function Popup(props: PopupProps) {
	return <Drawer {...props} />;
}
