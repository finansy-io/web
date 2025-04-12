import {ReactNode} from 'react';

export type FieldPopupProps<V> = {
	isEdit: boolean;
	entityName: string;
	popupProps: {isOpen: boolean; setIsOpen: (isOpen: boolean) => void};
	isChanged: boolean;
	setValue: (value: V) => void;
	initialValue: V;
	handleUpdate: (value: V) => void;
	value: V;
	isPending: boolean;
	isKeyboardActive: boolean;
	children: ReactNode;
};
